<?php


namespace App\Controller;


use App\Entity\User;
use Symfony\Component\Security\Core\Security;

class GetCurrentUserController
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function __invoke(): User
    {
        /** @var User $user */
        $user = $this->security->getUser();
        return $user;
    }
}
