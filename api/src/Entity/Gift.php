<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\ClaimGiftInviteAction;
use App\Controller\CreateGiftInviteAction;
use App\Controller\GiftWorkflowOrder;
use App\Repository\GiftRepository;
use App\Repository\PlanningRepository;
use DateTimeInterface;
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
    collectionOperations: [
    'get',
    'post',
    'claim_gift_invite' => [
        'method' => 'GET',
        'path' => 'gifts/claim',
        'security' => "is_granted('ROLE_USER')",
        'controller' => ClaimGiftInviteAction::class,
        'pagination_enabled' => false,
        'openapi_context' => [
            'summary' => 'Claim a gift using an Invite token',
            'description' => 'Claim a gift using an Invite token',
            'parameters' => ['token' => ['name' => 'token', 'type' => 'string', 'in' => 'query']],
            'responses' => [
                '200' => [
                    'content' => [
                        'application/json+ld' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Gift.jsonld-gift_read',
                            ],
                        ],
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Gift-gift_read',
                            ],
                        ],
                    ]
                ]
            ]
        ]
    ],
],
    itemOperations: [
    'get' => ['security' => "is_granted('ROLE_USER') and (object.getOwner() == user or object.getReceivers().contains(user))"],
    'put' => ['security' => "is_granted('ROLE_USER') and object.getOwner() == user"],
    'delete' => ['security' => "is_granted('ROLE_USER') and object.getOwner() == user"],
    'post_new_invite' => [
        'method' => 'POST',
        'security' => "is_granted('ROLE_USER') and object.getOwner() == user",
        'path' => 'gifts/{id}/invites',
        'controller' => CreateGiftInviteAction::class,
        'normalization_context' => ['groups' => ['gift_invite_read']],
        'openapi_context' => [
            'summary' => 'Create a GiftInvite inside a Gift',
            'description' => 'Create an invite and add it to the gift found from the {id}',
            'requestBody' => ['content' => [
                'application/json' => [
                    'schema' => [
                        '$ref' => '#/components/schemas/GiftInvite-gift_invite_write',
                    ]
                ]
            ]],
            'responses' => [
                '201' => [
                    'description' => 'The Gift Invite created',
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/GiftInvite-gift_invite_read',
                            ],
                        ],
                        'application/json+ld' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/GiftInvite.jsonld-gift_invite_read',
                            ],
                        ],
                    ],
                ],
            ]
        ]
    ],
    'gift_order' => [
        'method' => 'GET',
        'security' => "is_granted('ROLE_ADMIN') or object.getOwner() == user",
        'path' => 'gifts/{id}/order',
        'controller' => GiftWorkflowOrder::class,
    ],
],
    denormalizationContext: ['groups' => ['gift_write']],
    normalizationContext: ['groups' => ['gift_read']],
    security: "is_granted('ROLE_USER')",
)]
#[ApiFilter(filterClass: SearchFilter::class, properties: [
    'owner' => 'exact',
    'receivers' => 'exact',
    'state' => 'exact',
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
    private ?DateTimeInterface $startAt;

    /**
     * @ORM\Column(type="integer")
     */
    #[Positive]
    #[NotNull]
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
    private ?DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private ?DateTimeInterface $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     * @ORM\JoinTable(name="gift_receiver_users")
     */
    #[Groups(['gift_read'])]
    private Collection $receivers;

    /**
     * @ORM\OneToMany(targetEntity=GiftInvite::class, mappedBy="gift", orphanRemoval=true)
     */
    #[Groups(['gift_read'])]
    private Collection $invites;

    /**
     * @ORM\Column(type="string", length=100, options={"default": "draft"})
     */
    #[Groups(['gift_read'])]
    private ?string $state;

    #[Groups(['gift_read'])]
    public function getActualMedia(): ?MediaObject
    {
        /** @var Planning|bool|null $actualPlanning */
        $actualPlanning = $this->getPlannings()->matching(
            PlanningRepository::createActualMediaCriteria()
        )->current();
        if (false === $actualPlanning || null === $actualPlanning) {
            return null;
        }

        return $actualPlanning->getMedia();
    }

    public function __construct()
    {
        $this->plannings = new ArrayCollection();
        $this->receivers = new ArrayCollection();
        $this->invites = new ArrayCollection();
        $this->state = 'draft';
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

    public function getStartAt(): ?DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeInterface $updatedAt): self
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

    /**
     * @return Collection|GiftInvite[]
     */
    public function getInvites(): Collection
    {
        return $this->invites;
    }

    public function addInvite(GiftInvite $invite): self
    {
        if (!$this->invites->contains($invite)) {
            $this->invites[] = $invite;
            $invite->setGift($this);
        }

        return $this;
    }

    public function removeInvite(GiftInvite $invite): self
    {
        if ($this->invites->removeElement($invite)) {
            // set the owning side to null (unless already changed)
            if ($invite->getGift() === $this) {
                $invite->setGift(null);
            }
        }

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }
}
