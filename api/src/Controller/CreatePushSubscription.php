<?php

namespace App\Controller;

use App\Entity\PushSubscription;
use App\Entity\User;
use App\Repository\PushSubscriptionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Routing\Annotation\Route;


#[Route(path: '/notifications-subscribe', name: 'create_push_subscription', methods: ['POST'])]
class CreatePushSubscription extends AbstractController
{
    public function __construct(private PushSubscriptionRepository $subscriptionRepository, private EntityManagerInterface $em)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user instanceof User) {
            throw new UnauthorizedHttpException('', 'You must be authenticated.');
        }

        $subData = $request->toArray();
        $sub = $this->subscriptionRepository->findOneBy(['endpoint' => $subData['endpoint']]);

        if (!$sub) {
            $sub = new PushSubscription();
            $sub->setEndpoint($subData['endpoint']);
            $sub->setSubscribedUser($user);
        }

        $sub->setAuthToken($subData['keys']['auth']);
        $sub->setPublicKey($subData['keys']['p256dh']);

        $this->em->persist($sub);
        $this->em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
