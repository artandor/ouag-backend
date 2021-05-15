<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PlanningRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotNull;

/**
 * @ORM\Entity(repositoryClass=PlanningRepository::class)
 * @ORM\Table(
 *     uniqueConstraints={
 *          @ORM\UniqueConstraint(name="id_position", columns={"gift_id", "position"})
 *     },
 *     indexes={
 *          @ORM\Index(name="date_planned_idx", columns={"planned_at"})
 *     }
 * )
 */
#[ApiResource(
    collectionOperations: [],
    itemOperations: [
    'put' => ['security' => "is_granted('ROLE_USER') and object.getGift().getCreator() == user"],
    'patch' => ['security' => "is_granted('ROLE_USER') and object.getGift().getCreator() == user"],
],
    denormalizationContext: ['groups' => ['planning_write']],
    normalizationContext: ['groups' => ['planning_read']],
    order: ['position' => 'ASC'],
    security: "is_granted('ROLE_USER')",
)]
#[UniqueEntity(fields: ['gift', 'position'], message: 'Position for given gift already exists in database.')]
class Planning
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="integer")
     */
    #[NotNull]
    #[Groups(['planning_write', 'planning_read'])]
    private ?int $position;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    #[Groups(['planning_read'])]
    private ?\DateTimeInterface $plannedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Gift::class, inversedBy="plannings")
     * @ORM\JoinColumn(nullable=false)
     */
    private ?Gift $gift;

    /**
     * @ORM\OneToOne(targetEntity=PlanningMediaObject::class, mappedBy="planning", cascade={"persist", "remove"})
     */
    #[Groups(['planning_write', 'planning_read'])]
    private ?PlanningMediaObject $mediaConfig;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $updatedAt;

    public static function createActualMediaCriteria(): Criteria
    {
        return Criteria::create()
            ->andWhere(Criteria::expr()->lte('plannedAt', new \DateTimeImmutable()))
            ->orderBy(['plannedAt' => 'DESC'])
            ->setMaxResults(1);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getPlannedAt(): ?\DateTimeInterface
    {
        return $this->plannedAt;
    }

    public function setPlannedAt(?\DateTimeInterface $plannedAt): self
    {
        $this->plannedAt = $plannedAt;

        return $this;
    }

    public function getGift(): ?Gift
    {
        return $this->gift;
    }

    public function setGift(?Gift $gift): self
    {
        $this->gift = $gift;

        return $this;
    }

    public function getMediaConfig(): ?PlanningMediaObject
    {
        return $this->mediaConfig;
    }

    public function setMediaConfig(PlanningMediaObject $mediaConfig): self
    {
        // set the owning side of the relation if necessary
        if ($mediaConfig->getPlanning() !== $this) {
            $mediaConfig->setPlanning($this);
        }

        $this->mediaConfig = $mediaConfig;

        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): \DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
