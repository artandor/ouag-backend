<?php
declare(strict_types=1);

namespace App\EventSubscriber;


use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HashPasswordSubscriber implements EventSubscriber
{
    public function __construct(private UserPasswordEncoderInterface $passwordEncoder)
    {
    }

    /**
     * @return array<int, string>
     */
    public function getSubscribedEvents(): array
    {
        return ['prePersist', 'preUpdate'];
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();
        if (!$entity instanceof User) {
            return;
        }
        $this->encodePassword($entity);
    }

    /**
     * @param User $entity
     */
    private function encodePassword(User $entity): void
    {
        if (!$entity->getPlainPassword()) {
            return;
        }
        $encoded = $this->passwordEncoder->encodePassword(
            $entity,
            $entity->getPlainPassword()
        );
        $entity->setPassword($encoded);
    }

    public function preUpdate(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();
        if (!$entity instanceof User || $entity->getPlainPassword() !== null) {
            return;
        }
        $this->encodePassword($entity);
        // necessary to force the update to see the change
        $em = $args->getEntityManager();
        $meta = $em->getClassMetadata(User::class);
        $em->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $entity);
    }
}
