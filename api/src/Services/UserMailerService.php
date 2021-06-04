<?php


namespace App\Services;


use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

class UserMailerService
{
    public function __construct(private VerifyEmailHelperInterface $helper, private MailerInterface $mailer)
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
            ->subject('Please confirm your account')
            ->htmlTemplate('emails/signup.html.twig')
            ->context([
                'locale' => $user->getPreferredLanguage(),
                'username' => $user->getDisplayName(),
                'signedUrl' => $signatureComponents->getSignedUrl(),
            ]);

        $this->mailer->send($email);
    }
}
