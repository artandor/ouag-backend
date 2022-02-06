<?php

// src/EventSubscriber/ForgotPasswordEventSubscriber.php
namespace App\EventSubscriber;

use App\Entity\PasswordToken;
use App\Services\UserMailerService;
use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private UserMailerService $mailer, private EntityManagerInterface $em, private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            CreateTokenEvent::class => 'onCreateToken',
            UpdatePasswordEvent::class => 'onUpdatePassword',
        ];
    }

    public function onCreateToken(CreateTokenEvent $event)
    {
        /** @var PasswordToken $passwordToken */
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();

        $this->mailer->sendPasswordReset($user, $passwordToken);
    }

    public function onUpdatePassword(UpdatePasswordEvent $event)
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();
        $encoded = $this->passwordHasher->hashPassword($user, $event->getPassword());
        $user->setPassword($encoded);
        $this->em->flush();
    }
}
