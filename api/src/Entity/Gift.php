<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\GiftRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Positive;

/**
 * @ORM\Entity(repositoryClass=GiftRepository::class)
 */
#[ApiResource(
    subresourceOperations: [
    'api_gifts_plannings_get_subresource' => [
        'security' => "is_granted('ROLE_USER') and object.getOwner() == user",
    ],
],
    denormalizationContext: ['groups' => ['gift_write']],
    normalizationContext: ['groups' => ['gift_read']],
    security: "is_granted('ROLE_USER')",
)]
#[ApiFilter(filterClass: SearchFilter::class, properties: [
    // 'state'
])]
class Gift
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[NotBlank]
    #[Groups(['gift_write', 'gift_read'])]
    private ?string $name;

    /**
     * @ORM\Column(type="datetime")
     */
    #[NotNull]
    #[Groups(['gift_write', 'gift_read'])]
    private ?\DateTimeInterface $startAt;

    /**
     * @ORM\Column(type="integer")
     */
    #[Positive]
    #[Groups(['gift_write', 'gift_read'])]
    private ?int $recurrence;

    /**
     * @ORM\Column(type="integer")
     */
    #[Positive]
    #[Groups(['gift_write', 'gift_read'])]
    private ?int $mediaAmount;


    /**
     * @ORM\OneToMany(targetEntity=Planning::class, mappedBy="gift", orphanRemoval=true)
     */
    #[ApiSubresource]
    private Collection $plannings;

    /**
     * @ORM\ManyToOne(targetEntity=Animation::class)
     * @ORM\JoinColumn()
     */
    #[Groups(['gift_write', 'gift_read'])]
    private ?Animation $defaultAnimation;

    /**
     * @Gedmo\Blameable(on="create")
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private ?User $owner;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="receivedGifts")
     */
    private Collection $receivers;


    #[Groups(['gift_read'])]
    public function getActualMedia(): ?MediaObject
    {
        /** @var Planning|bool|null $actualPlanning */
        $actualPlanning = $this->getPlannings()->matching(
            Planning::createActualMediaCriteria()
        )->current();
        if (false === $actualPlanning || null === $actualPlanning) {
            return null;
        }

        return $actualPlanning->getMediaConfig()->getMedia();
    }


    public function __construct()
    {
        $this->plannings = new ArrayCollection();
        $this->receivers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getRecurrence(): ?int
    {
        return $this->recurrence;
    }

    public function setRecurrence(int $recurrence): self
    {
        $this->recurrence = $recurrence;

        return $this;
    }

    public function getMediaAmount(): ?int
    {
        return $this->mediaAmount;
    }

    public function setMediaAmount(int $mediaAmount): self
    {
        $this->mediaAmount = $mediaAmount;

        return $this;
    }

    /**
     * @return Collection|Planning[]
     */
    public function getPlannings(): Collection
    {
        return $this->plannings;
    }

    public function addPlanning(Planning $planning): self
    {
        if (!$this->plannings->contains($planning)) {
            $this->plannings[] = $planning;
            $planning->setGift($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->plannings->removeElement($planning)) {
            // set the owning side to null (unless already changed)
            if ($planning->getGift() === $this) {
                $planning->setGift(null);
            }
        }

        return $this;
    }

    public function getDefaultAnimation(): ?Animation
    {
        return $this->defaultAnimation;
    }

    public function setDefaultAnimation(?Animation $defaultAnimation): self
    {
        $this->defaultAnimation = $defaultAnimation;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getReceivers(): Collection
    {
        return $this->receivers;
    }

    public function addReceiver(User $receiver): self
    {
        if (!$this->receivers->contains($receiver)) {
            $this->receivers[] = $receiver;
        }

        return $this;
    }

    public function removeReceiver(User $receiver): self
    {
        $this->receivers->removeElement($receiver);

        return $this;
    }
}
