<?php


namespace App\EventSubscriber;


use App\Entity\Gift;
use App\Services\UserMailerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Workflow\Event\Event;

class GiftStateWorkflowSubscriber implements EventSubscriberInterface
{
    public function __construct(private EntityManagerInterface $em, private UserMailerService $userMailer)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'workflow.gift_publishing.transition.checkout' => 'generateGiftPlanningPlannedAt',
            'workflow.gift_publishing.transition.publish' => 'sendGiftInvitesToReceivers',
        ];
    }

    public function generateGiftPlanningPlannedAt(Event $event): void
    {
        $gift = $event->getSubject();
        if (!$gift instanceof Gift) {
            return;
        }

        foreach ($gift->getPlannings() as $planning) {
            $planning->setPlannedAt($planning->calculatePlannedAt());
        }
        $this->em->flush();
    }

    public function sendGiftInvitesToReceivers(Event $event): void
    {
        $gift = $event->getSubject();
        if (!$gift instanceof Gift) {
            return;
        }

        foreach ($gift->getInvites() as $invite) {
            $this->userMailer->giftSendInvite($invite);
        }

    }
}
