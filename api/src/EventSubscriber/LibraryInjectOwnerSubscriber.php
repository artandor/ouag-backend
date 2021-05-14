<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Library;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

final class LibraryInjectOwnerSubscriber implements EventSubscriberInterface
{
    public function __construct(private Security $security)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['injectLibraryOwner', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function injectLibraryOwner(ViewEvent $event): void
    {
        $library = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$library instanceof Library || Request::METHOD_POST !== $method) {
            return;
        }

        /** @var User $user */
        $user = $this->security->getUser();
        $library->setOwner($user);
    }
}
