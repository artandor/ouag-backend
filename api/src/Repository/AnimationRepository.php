<?php

namespace App\Repository;

use App\Entity\Animation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Animation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Animation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Animation[]    findAll()
 * @method Animation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnimationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Animation::class);
    }
}
