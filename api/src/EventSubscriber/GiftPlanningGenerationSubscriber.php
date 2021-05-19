<?php


namespace App\EventSubscriber;


use App\Entity\Gift;
use App\Entity\Planning;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;

class GiftPlanningGenerationSubscriber implements EventSubscriber
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function getSubscribedEvents(): array
    {
        return [
            //KernelEvents::VIEW => ['generatePlanning', EventPriorities::POST_WRITE],
            'postPersist'
        ];
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $gift = $args->getEntity();

        if (!$gift instanceof Gift) {
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
