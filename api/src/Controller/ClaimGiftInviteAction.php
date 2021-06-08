<?php


namespace App\Controller;


use App\Entity\Gift;
use App\Entity\GiftInvite;
use App\Entity\User;
use App\Services\UserMailerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Security;

final class ClaimGiftInviteAction
{
    public function __construct(private EntityManagerInterface $entityManager, private Security $security, private UserMailerService $userMailer)
    {
    }

    public function __invoke(Request $request): Gift
    {
        $token = $request->query->get('token');
        /**
         * @var User $user
         */
        $user = $this->security->getUser();

        $inviteRepo = $this->entityManager->getRepository(GiftInvite::class);

        $invite = $inviteRepo->findOneBy(["token" => $token, "email" => $user->getEmail()]);
        if (!$invite instanceof GiftInvite) {
            throw new NotFoundHttpException('Wrong code for invite or you are not logged in with the email that received the gift.');
        }

        // TODO : Add this part when workflows are released
        /*
        if ($invite->getGift()->getState() != "published" || $invite->getClaimed()) {
            throw new ConflictHttpException('This gift has already been claimed or hasn\'t been published yet.');
        }*/

        $invite->setClaimed(true);
        $invite->getGift()->addReceiver($user);
        $this->userMailer->giftInviteClaimSendEmail($invite);
        $this->entityManager->flush();

        return $invite->getGift();
    }

}
