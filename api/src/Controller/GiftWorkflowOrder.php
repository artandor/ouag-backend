<?php


namespace App\Controller;


use App\Entity\Gift;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
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

        // TODO: Put this in env
        Stripe::setApiKey('sk_test_51HSrrZAiM7b1xbOcAtDviO2RuX6cCkQDTJqdalyuCGKrsqewkfoxmkFVefwoxQlPVAOmzj4K9MZinPClpcBUXhT400XDXYlJfD');

        try {
            // TODO : add the name of the gift to the invoice
            $checkoutSession = Session::create([
                'customer_email' => $data->getOwner()->getEmail(),
                'payment_method_types' => [
                    'card',
                ],
                // TODO : Add line for recipients
                'line_items' => [
                    [
                        'price' => 'price_1JP68KAiM7b1xbOcw0deBFmT',
                        'quantity' => $data->getMediaAmount(),
                    ]
                ],
                'mode' => 'payment',
                'success_url' => $_ENV['FRONT_DOMAIN'] . '/checkout/success',
                'cancel_url' => $_ENV['FRONT_DOMAIN'] . '/checkout/failure',
                'allow_promotion_codes' => true,
                'metadata' => [
                    'description' => $data->getName(),
                    'gift_id' => $data->getId(),
                ],
            ]);
        } catch (ApiErrorException $e) {
            throw new BadRequestException($e->getMessage());
        }
        $data->setCheckoutUrl($checkoutSession->url);
        return $data;
    }
}
