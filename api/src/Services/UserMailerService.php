<?php


namespace App\Services;


use App\Entity\GiftInvite;
use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

class UserMailerService
{

    public function __construct(private VerifyEmailHelperInterface $helper, private MailerInterface $mailer, private TranslatorInterface $translator)
    {
    }

    public function sendValidationEmail(User $user): void
    {
        $signatureComponents = $this->helper->generateSignature(
            'api_users_userVerify_collection',
            strval($user->getId()),
            $user->getEmail(),
            ['id' => $user->getId()],
        );

        $parsedUrl = parse_url($signatureComponents->getSignedUrl());

        $verifyUrl = $_ENV['FRONT_DOMAIN'] . $parsedUrl['path'] . '?' . $parsedUrl['query'];

        $email = (new TemplatedEmail())
            ->from(Address::create('Once Upon A Gift <postmaster@once-upon-a-gift.com>'))
            ->to($user->getEmail())
            ->subject($this->translator->trans('Confirm your account', array(), null, $user->getPreferredLanguage()))
            ->htmlTemplate('emails/signup.html.twig')
            ->context([
                'locale' => $user->getPreferredLanguage(),
                'username' => $user->getDisplayName(),
                'signedUrl' => $verifyUrl,
            ]);
        $email->setHeaders($email->getHeaders()
            ->addTextHeader('X-Auto-Response-Suppress', 'OOF, DR, RN, NRN, AutoReply'));

        $this->mailer->send($email);
    }

    public function giftInviteClaimSendEmail(GiftInvite $invite): void
    {
        $gift = $invite->getGift();
        $sender = $gift->getOwner();
        $email = (new TemplatedEmail())
            ->from(Address::create('Once Upon A Gift <postmaster@once-upon-a-gift.com>'))
            ->to($sender->getEmail())
            ->subject($this->translator->trans('gift_receiver received your gift gift_name !', ['gift_name' => $gift->getName(), 'gift_receiver' => $invite->getEmail()], null, $sender->getPreferredLanguage()))
            ->htmlTemplate('emails/claimed_gift.html.twig')
            ->context([
                'locale' => $sender->getPreferredLanguage(),
                'username_sender' => $sender->getDisplayName(),
                'email_receiver' => $invite->getEmail(),
                'gift_name' => $gift->getName(),
            ]);
        $email->setHeaders($email->getHeaders()
            ->addTextHeader('X-Auto-Response-Suppress', 'OOF, DR, RN, NRN, AutoReply'));
        $this->mailer->send($email);
    }

    public function giftSendInvite(GiftInvite $invite): void
    {
        $gift = $invite->getGift();
        $sender = $gift->getOwner();
        $senderName = $invite->getCreatorNickname() ?? $gift->getOwner()->getDisplayName();
        $email = (new TemplatedEmail())
            ->from(new Address('postmaster@once-upon-a-gift.com', 'Once Upon A Gift'))
            ->to(new Address($invite->getEmail()))
            ->subject($senderName . $this->translator->trans('sent you a gift !!', null, 'messages', $sender->getPreferredLanguage()))
            ->htmlTemplate('emails/gift_invitation.html.twig')
            ->context([
                'gift' => $gift,
                'invite' => $invite,
                'locale' => $sender->getPreferredLanguage(),
                'creator_name' => $senderName,
            ]);
        $email->setHeaders($email->getHeaders()
            ->addTextHeader('X-Auto-Response-Suppress', 'OOF, DR, RN, NRN, AutoReply'));
        $this->mailer->send($email);
    }
}
