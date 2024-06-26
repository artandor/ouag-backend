<?php


namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use App\Services\UserMailerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\GoneHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

final class UserVerifyController
{
    public function __construct(private UserRepository $userRepository, private EntityManagerInterface $em
        , private VerifyEmailHelperInterface           $helper, private UserMailerService $userMailer)
    {
    }

    public function __invoke(Request $request): User
    {
        $id = $request->get('id');

        if (null === $id) {
            throw new BadRequestHttpException("An id must be provided");
        }

        $user = $this->userRepository->find($id);
        if (null === $user) {
            throw new GoneHttpException("The provided user couldn't be found");
        }
        try {
            $this->helper->validateEmailConfirmation($request->getUri(), strval($user->getId()), $user->getEmail());
        } catch (VerifyEmailExceptionInterface $e) {
            if ($request->get('expires') < time()) {
                $this->userMailer->sendValidationEmail($user);
            }
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
        $user->setActive(true);
        $this->em->flush();
        return $user;
    }
}
