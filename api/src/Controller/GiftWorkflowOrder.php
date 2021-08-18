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

        Stripe::setApiKey($_ENV['STRIPE_API_KEY']);

        try {
            $checkoutSession = Session::create([
                'customer_email' => $data->getOwner()->getEmail(),
                'payment_method_types' => [
                    'card',
                ],
                'line_items' => [
                    [
                        'price' => $_SERVER['APP_ENV'] == 'prod' ? 'price_1JPSZ2AiM7b1xbOcea0UHuSj' : 'price_1JP68KAiM7b1xbOcw0deBFmT',
                        'quantity' => $data->getMediaAmount() * count($data->getInvites()),
                        /* Add this when TVA kicks in
                        'tax_rates' => $_SERVER['APP_ENV'] == 'prod' ?
                            ['txr_1JPTPFAiM7b1xbOcew6c4qrB']
                            : ['txr_1JPRhiAiM7b1xbOcBbibHmLZ']
                        */
                    ]
                ],
                'mode' => 'payment',
                'success_url' => $_ENV['FRONT_DOMAIN'] . '/checkout/success',
                'cancel_url' => $_ENV['FRONT_DOMAIN'] . '/checkout/failure',
                'allow_promotion_codes' => true,
                'metadata' => [
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
