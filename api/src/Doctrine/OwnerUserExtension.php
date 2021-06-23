<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Gift;
use App\Entity\Library;
use App\Entity\MediaObject;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

final class OwnerUserExtension implements QueryCollectionExtensionInterface
{
    public function __construct(private Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        /** @var User $user */
        $user = $this->security->getUser();
        if ((
                Library::class !== $resourceClass &&
                MediaObject::class !== $resourceClass &&
                Gift::class !== $resourceClass)
            || $this->security->isGranted('ROLE_ADMIN') || null == $user) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.owner = :current_user', $rootAlias));
        $queryBuilder->setParameter('current_user', $user->getId());
        if (Library::class === $resourceClass) {
            $queryBuilder->orWhere(sprintf(':current_user MEMBER OF %s.sharedWith', $rootAlias));
        }
        if (Gift::class === $resourceClass) {
            $queryBuilder->orWhere(sprintf(':current_user MEMBER OF %s.receivers', $rootAlias));
        }
    }
}
