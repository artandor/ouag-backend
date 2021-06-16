<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreatePlanningFromRandomLibrariesController;
use App\Repository\PlanningRepository;
use DateTimeInterface;
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
    collectionOperations: [
],
    itemOperations: [
    'get' => ['security' => "is_granted('ROLE_USER') and object.getGift().getOwner() == user"],
    'put' => ['security' => "is_granted('ROLE_USER') and object.getGift().getOwner() == user"],
    'patch' => ['security' => "is_granted('ROLE_USER') and object.getGift().getOwner() == user"],
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
    private ?DateTimeInterface $plannedAt;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(onDelete="SET NULL")
     */
    #[Groups(['planning_write', 'planning_read'])]
    private ?MediaObject $media = null;

    /**
     * @ORM\ManyToOne(targetEntity=Animation::class)
     */
    #[Groups(['planning_write', 'planning_read'])]
    private ?Animation $animation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['planning_write', 'planning_read'])]
    private ?string $comment;

    /**
     * @ORM\ManyToOne(targetEntity=Gift::class, inversedBy="plannings")
     * @ORM\JoinColumn(nullable=false)
     */
    private ?Gift $gift;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private DateTimeInterface $updatedAt;

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

    public function getPlannedAt(): ?DateTimeInterface
    {
        return $this->plannedAt;
    }

    public function setPlannedAt(?DateTimeInterface $plannedAt): self
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

    public function getCreatedAt(): DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getMedia(): ?MediaObject
    {
        return $this->media;
    }

    public function setMedia(?MediaObject $media): self
    {
        $this->media = $media;

        return $this;
    }

    public function getAnimation(): ?Animation
    {
        return $this->animation ?? $this->gift->getDefaultAnimation();
    }

    public function setAnimation(?Animation $animation): self
    {
        $this->animation = $animation;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }
}
