<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class UserResourcesSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['extendResources', EventPriorities::POST_READ]
        ];
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
