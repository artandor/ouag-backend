<?php


namespace App\Controller;


use App\Entity\Gift;
use Symfony\Component\Workflow\WorkflowInterface;

final class GiftWorkflowOrder
{
    public function __construct(private WorkflowInterface $giftPublishingStateMachine)
    {
    }

    public function __invoke(Gift $data): Gift
    {
        $this->giftPublishingStateMachine->apply($data, 'order');
        // This is temporary, remove it when the payment flow is done.
        $this->giftPublishingStateMachine->apply($data, 'publish');
        return $data;
    }

}
