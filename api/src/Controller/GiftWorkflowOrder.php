<?php


namespace App\Controller;


use App\Entity\Gift;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\Workflow\WorkflowInterface;

final class GiftWorkflowOrder
{
    public function __construct(private WorkflowInterface $giftPublishingStateMachine)
    {
    }

    public function __invoke(Gift $data): Gift
    {
        if (!$this->giftPublishingStateMachine->can($data, 'checkout')) {
            throw new PreconditionFailedHttpException('Cannot checkout gift with its current state ' . $data->getState());
        }
        if ($data->getInvites()->count() <= 0) {
            throw new PreconditionFailedHttpException('Cannot checkout gift with no invites');
        }
        $this->giftPublishingStateMachine->apply($data, 'checkout');
        return $data;
    }
}
