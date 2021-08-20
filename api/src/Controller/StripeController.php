<?php

namespace App\Controller;

use App\Repository\GiftRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Workflow\WorkflowInterface;
use UnexpectedValueException;


class StripeController extends AbstractController
{
    public function __construct(private WorkflowInterface $giftPublishingStateMachine, private EntityManagerInterface $em,
                                private GiftRepository    $giftRepository, private LoggerInterface $logger)
    {
    }

    /**
     * @Route("/stripe/webhook", methods={"POST"})
     */
    public function webhook(Request $request,): JsonResponse
    {
        try {
            $endpoint_secret = $_ENV['STRIPE_WEBHOOK_SECRET'];
            $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
            try {
                $event = Webhook::constructEvent($request->getContent(), $sig_header, $endpoint_secret);
            } catch (UnexpectedValueException $e) {
                throw new BadRequestHttpException('Invalid payload in Stripe event');
            } catch (SignatureVerificationException $e) {
                throw new BadRequestHttpException('Invalid signature from Stripe event');
            }

            $eventData = $event->data->toArray();
            if ($_SERVER['APP_ENV'] === 'prod' && $eventData['object']['livemode'] == 'false') {
                $this->logger->critical("App is in env " . $_SERVER['APP_ENV'] . " but received livemode " . $eventData['object']['livemode'] . " from stripe.");
                throw new ConflictHttpException('The API is in production mode while Stripe is in test mode.');
            }

            switch ($event->type) {
                // Events where gift was paid and should be published
                case 'checkout.session.completed':
                    $session = $eventData['object'];
                    $gift = $this->getGiftFromEvent($event, $this->giftRepository);
                    if (!$this->giftPublishingStateMachine->can($gift, 'checkout')) {
                        $this->logger->error("Could not checkout gift " . $gift->getId() . " due to incorrect initial state " . $gift->getState());
                        break;
                    }
                    $this->giftPublishingStateMachine->apply($gift, 'checkout');


                    if ($session['payment_status'] === 'paid') {
                        if (!$this->giftPublishingStateMachine->can($gift, 'publish')) {
                            $this->logger->error("Could not publish gift " . $gift->getId() . " due to incorrect initial state " . $gift->getState());
                            $this->em->flush();
                            break;
                        }
                        $this->giftPublishingStateMachine->apply($gift, 'publish');
                    }
                    $this->em->flush();
                    break;
                case 'checkout.session.async_payment_succeeded':
                    $gift = $this->getGiftFromEvent($event, $this->giftRepository);
                    if (!$this->giftPublishingStateMachine->can($gift, 'publish')) {
                        $this->logger->error("Could not publish gift " . $gift->getId() . " due to incorrect initial state " . $gift->getState());
                        break;
                    }
                    $this->giftPublishingStateMachine->apply($gift, 'publish');
                    $this->em->flush();
                    break;
                case 'checkout.session.async_payment_failed':
                    $gift = $this->getGiftFromEvent($event, $this->giftRepository);
                    if (!$this->giftPublishingStateMachine->can($gift, 'cancel')) {
                        $this->logger->error("Could not cancel gift " . $gift->getId() . " due to incorrect initial state" . $gift->getState());
                        break;
                    }
                    $this->giftPublishingStateMachine->apply($gift, 'cancel');
                    $this->em->flush();
                    // TODO : Send an email to tell the customer his order failed.
                    break;
            }
        } catch (UnexpectedValueException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }
        return new JsonResponse("ok", Response::HTTP_OK);
    }

    private function getGiftFromEvent($event, GiftRepository $giftRepository)
    {
        $giftId = $event->data->object->metadata->gift_id;
        return $giftRepository->findOneBy(['id' => $giftId]);
    }
}
