<?php


namespace App\EventSubscriber;


use App\Entity\Gift;
use App\Entity\Planning;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\OnFlushEventArgs;

class GiftPlanningGenerationSubscriber implements EventSubscriber
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function getSubscribedEvents(): array
    {
        return [
            'postPersist',
            'onFlush',
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

    public function onFlush(OnFlushEventArgs $args)
    {
        $em = $args->getEntityManager();
        $uow = $em->getUnitOfWork();

        foreach ($uow->getScheduledEntityUpdates() as $entity) {
            if ($entity instanceof Gift) {
                // If the mediaAmount increased, we add more plannings to those existing
                if ($uow->getEntityChangeSet($entity)['mediaAmount'][0] < $uow->getEntityChangeSet($entity)['mediaAmount'][1]) {
                    for ($i = $uow->getEntityChangeSet($entity)['mediaAmount'][0]; $i < $uow->getEntityChangeSet($entity)['mediaAmount'][1]; $i++) {
                        $planning = new Planning();
                        $planning->setPosition($i);
                        $planning->setGift($entity);
                        $em->persist($planning);
                        $classMetadata = $em->getClassMetadata(Planning::class);
                        $uow->computeChangeSet($classMetadata, $planning);
                    }
                    // If the mediaAmount decreased, we delete the "latest" plannings
                } elseif ($uow->getEntityChangeSet($entity)['mediaAmount'][0] > $uow->getEntityChangeSet($entity)['mediaAmount'][1]) {
                    $plannings = $em->getRepository(Planning::class)->findBy(['gift' => $entity], ['position' => 'ASC']);
                    for ($i = $uow->getEntityChangeSet($entity)['mediaAmount'][0]; $uow->getEntityChangeSet($entity)['mediaAmount'][1] < $i; $i--) {
                        $em->remove($plannings[$i - 1]);
                    }
                    $classMetadata = $em->getClassMetadata(Gift::class);
                    $uow->computeChangeSet($classMetadata, $entity);
                }
            }
        }
    }
}
