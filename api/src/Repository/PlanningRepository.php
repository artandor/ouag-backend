<?php

namespace App\Repository;

use App\Entity\Planning;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Planning|null find($id, $lockMode = null, $lockVersion = null)
 * @method Planning|null findOneBy(array $criteria, array $orderBy = null)
 * @method Planning[]    findAll()
 * @method Planning[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlanningRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Planning::class);
    }

    public static function createActualMediaCriteria(): Criteria
    {
        return Criteria::create()
            ->andWhere(Criteria::expr()->lte('plannedAt', new DateTimeImmutable()))
            ->andWhere(Criteria::expr()->neq('media', null))
            ->orderBy(['plannedAt' => 'DESC'])
            ->setMaxResults(1);
    }
}
