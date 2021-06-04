<?php

namespace App\Repository;

use App\Entity\GiftInvite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GiftInvite|null find($id, $lockMode = null, $lockVersion = null)
 * @method GiftInvite|null findOneBy(array $criteria, array $orderBy = null)
 * @method GiftInvite[]    findAll()
 * @method GiftInvite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GiftInviteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GiftInvite::class);
    }
}
