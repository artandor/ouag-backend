<?php

namespace App\Entity;

use App\Repository\PlanningMediaObjectRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PlanningMediaObjectRepository::class)
 */
class PlanningMediaObject
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     */
    #[Groups(['planning_write', 'planning_read'])]
    private ?MediaObject $media;

    /**
     * @ORM\OneToOne(targetEntity=Planning::class, inversedBy="mediaConfig", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private Planning $planning;

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

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPlanning(): Planning
    {
        return $this->planning;
    }

    public function setPlanning(Planning $planning): self
    {
        $this->planning = $planning;

        return $this;
    }

    public function getAnimation(): ?Animation
    {
        return $this->animation;
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
