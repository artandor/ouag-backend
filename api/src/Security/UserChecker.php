<?php


namespace App\Security;


use App\Entity\User;
use App\Services\UserMailerService;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements \Symfony\Component\Security\Core\User\UserCheckerInterface
{
    public function __construct(private UserMailerService $userMailer)
    {
    }

    /**
     * @inheritDoc
     */
    public function checkPreAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->isActive()) {
            $this->userMailer->sendValidationEmail($user);
            // the message passed to this exception is meant to be displayed to the user
            throw new UnauthorizedHttpException('', 'Your user account needs to be activated. Use the link in the email sent to you to activate it');
        }
    }

    /**
     * @inheritDoc
     */
    public function checkPostAuth(UserInterface $user)
    {
        return;
    }
}
