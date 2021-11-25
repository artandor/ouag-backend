<?php


namespace App\Controller;


use App\Entity\Gift;
use Psr\Log\LoggerInterface;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\PromotionCode;
use Stripe\Stripe;
use Stripe\StripeClient;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\Workflow\WorkflowInterface;

final class GiftWorkflowOrder
{
    public function __construct(private WorkflowInterface $giftPublishingStateMachine, private LoggerInterface $logger)
    {
    }

    public function __invoke(Gift $data, Request $request): Gift
    {
        // Check for a promotion code in order to handle a potential 0€ operation
        $promotionnalCodeToSearch = $request->toArray()['code'];
        $promoCode = null;
        if (strlen($promotionnalCodeToSearch) > 0) {
            $stripeClient = new StripeClient($_ENV['STRIPE_API_KEY']);
            $promoCodes = $stripeClient->promotionCodes->all(['code' => $promotionnalCodeToSearch, 'active' => true]);

            if (count($promoCodes['data']) > 0) {
                /** @var PromotionCode $promoCode */
                $promoCode = $promoCodes['data'][0];

                if ($promoCode->coupon->percent_off === 100.0) {
                    if (!$this->giftPublishingStateMachine->can($data, 'checkout')) {
                        $this->logger->error("Could not checkout gift " . $data->getId() . " due to incorrect initial state " . $data->getState());
                        $data->setCheckoutUrl($_ENV['FRONT_DOMAIN'] . Gift::CHECKOUT_FAILURE_URL);
                        return $data;
                    }
                    $this->giftPublishingStateMachine->apply($data, 'checkout');

                    if (!$this->giftPublishingStateMachine->can($data, 'publish')) {
                        $this->logger->error("Could not publish gift " . $data->getId() . " due to incorrect initial state " . $data->getState());
                        $data->setCheckoutUrl($_ENV['FRONT_DOMAIN'] . Gift::CHECKOUT_FAILURE_URL);
                        return $data;
                    }
                    $this->giftPublishingStateMachine->apply($data, 'publish');
                    $data->setCheckoutUrl($_ENV['FRONT_DOMAIN'] . Gift::CHECKOUT_SUCCESS_URL);
                    return $data;
                }
            } else {
                $this->logger->info('Couldn\'t find promotion code "' . $promotionnalCodeToSearch . '" in Stripe.');
            }
        }

        if (!$this->giftPublishingStateMachine->can($data, 'checkout')) {
            throw new PreconditionFailedHttpException('Cannot checkout gift with its current state ' . $data->getState());
        }
        if ($data->getInvites()->count() <= 0) {
            throw new PreconditionFailedHttpException('Cannot checkout gift with no invites');
        }

        Stripe::setApiKey($_ENV['STRIPE_API_KEY']);

        try {
            $sessionConfig = [
                'customer_email' => $data->getOwner()->getEmail(),
                'payment_method_types' => [
                    'card',
                ],
                'line_items' => [
                    [
                        'price' => $_SERVER['APP_ENV'] == 'prod' ? 'price_1JPSZ2AiM7b1xbOcea0UHuSj' : 'price_1JP68KAiM7b1xbOcw0deBFmT',
                        'quantity' => $data->getMediaAmount() * count($data->getInvites()),
                        /* Add this when TVA kicks in
                        'tax_rates' => $_SERVER['APP_ENV'] == 'prod' ?
                            ['txr_1JPTPFAiM7b1xbOcew6c4qrB']
                            : ['txr_1JPRhiAiM7b1xbOcBbibHmLZ']
                        */
                    ]
                ],
                'mode' => 'payment',
                'success_url' => $_ENV['FRONT_DOMAIN'] . Gift::CHECKOUT_SUCCESS_URL,
                'cancel_url' => $_ENV['FRONT_DOMAIN'] . Gift::CHECKOUT_FAILURE_URL,
                'metadata' => [
                    'gift_id' => $data->getId(),
                ],
            ];
            if ($promoCode) {
                $sessionConfig['discounts'] = [
                    [
                        'promotion_code' => $promoCode->id,
                    ]
                ];
            } else {
                $sessionConfig['allow_promotion_codes'] = true;
            }
            $checkoutSession = Session::create($sessionConfig);
        } catch (ApiErrorException $e) {
            throw new BadRequestException($e->getMessage());
        }
        $data->setCheckoutUrl($checkoutSession->url);
        return $data;
    }
}
