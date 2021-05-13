<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Library;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class UserResourcesSubscriber implements EventSubscriberInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['createUserDefaultLibrary', EventPriorities::POST_WRITE],
            KernelEvents::REQUEST => ['extendResources', EventPriorities::POST_READ]
        ];
    }

    public function createUserDefaultLibrary(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $defaultLibrary = new Library();
        $defaultLibrary->setOwner($user);
        $defaultLibrary->setName($user->getDisplayName());

        $this->entityManager->persist($defaultLibrary);
        $this->entityManager->flush();
    }

    public function extendResources(RequestEvent $event): void
    {
        $request = $event->getRequest();
        $class = $request->attributes->get('_api_resource_class');

        if ($class === User::class) {
            $resources = [
                '/users/me'
            ];

            $request->attributes->set('_resources', $request->attributes->get('_resources', []) + (array)$resources);
        }
    }
}
