<?php


namespace App\Services;


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

    public function sendValidationEmail(User $user)
    {
        $signatureComponents = $this->helper->generateSignature(
            'api_users_userVerify_collection',
            $user->getId(),
            $user->getEmail(),
            ['id' => $user->getId()],
        );

        $email = (new TemplatedEmail())
            ->from(Address::create('Once Upon A Gift <postmaster@once-upon-a-gift.com>'))
            ->to($user->getEmail())
            ->subject($this->translator->trans('Confirm your account', array(), null, $user->getPreferredLanguage()))
            ->htmlTemplate('emails/signup.html.twig')
            ->context([
                'locale' => $user->getPreferredLanguage(),
                'username' => $user->getDisplayName(),
                'signedUrl' => $signatureComponents->getSignedUrl(),
            ]);

        $this->mailer->send($email);
    }
}
