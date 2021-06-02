<?php


namespace App\Controller;


use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Gift;
use App\Entity\GiftInvite;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

final class CreateGiftInviteAction
{


    public function __construct(private SerializerInterface $serializer, private ValidatorInterface $validator, private EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(Request $request, Gift $data): GiftInvite
    {

        /** @var GiftInvite $newInvite */
        $newInvite = $this->serializer->deserialize($request->getContent(), GiftInvite::class, 'json', ['gift_invite_write']);
        $newInvite->setGift($data);
        $this->validator->validate($newInvite);
        $this->entityManager->persist($newInvite);
        $this->entityManager->flush();

        return $newInvite;
    }

}
