<?php


namespace App\Controller;


use App\Entity\Gift;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\Workflow\WorkflowInterface;

final class GiftWorkflowPublish
{
    public function __construct(private WorkflowInterface $giftPublishingStateMachine)
    {
    }

    public function __invoke(Gift $data): Gift
    {
        if (!$this->giftPublishingStateMachine->can($data, 'publish')) {
            throw new PreconditionFailedHttpException('Cannot publish gift with its current state ' . $data->getState());
        }
        $this->giftPublishingStateMachine->apply($data, 'publish');
        return $data;
    }
}
