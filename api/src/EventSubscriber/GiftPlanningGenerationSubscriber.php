<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Gift;
use App\Entity\Planning;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class GiftPlanningGenerationSubscriber implements EventSubscriberInterface
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['generatePlanning', EventPriorities::POST_WRITE]
        ];
    }

    public function generatePlanning(ViewEvent $event): void
    {
        $gift = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$gift instanceof Gift || Request::METHOD_POST !== $method) {
            return;
        }

        $this->em->transactional(function ($em) use ($gift) {
            for ($i = 0; $i < $gift->getMediaAmount(); $i++) {
                $planning = new Planning();
                $planning->setGift($gift);
                $planning->setPosition($i);
                $em->persist($planning);
            }
        });
    }
}
