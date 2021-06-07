<?php


namespace App\EventSubscriber;


use App\Entity\Gift;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Workflow\Event\Event;

class GiftStateWorkflowSubscriber implements EventSubscriberInterface
{
    public function __construct(private LoggerInterface $logger, private EntityManagerInterface $em)
    {
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'workflow.gift_publishing.transition.order' => 'generateGiftPlanningPlannedAt',
        ];
    }

    public function generateGiftPlanningPlannedAt(Event $event): void
    {
        $gift = $event->getSubject();
        if (!$gift instanceof Gift) {
            return;
        }

        $this->logger->info('Gift ' . $gift->getId() . ' is transitioning to ordered state.');

        foreach ($gift->getPlannings() as $planning) {
            $planning->setPlannedAt($planning->calculatePlannedAt());
            $this->em->persist($planning);
        }
        $this->em->flush();
    }
}
