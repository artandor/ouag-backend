<?php
declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Controller\GetCurrentUserController;
use App\Controller\UserVerifyController;
use App\Repository\UserRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
#[ApiResource(
    collectionOperations: [
        'get' => ['security' => "is_granted('ROLE_ADMIN')"],
        'post' => [
            'denormalization_context' => ['groups' => ['user_write']],
        ],
        'userVerify' => [
            'method' => 'GET',
            'path' => '/users/verify',
            'controller' => UserVerifyController::class,
        ],
        'getCurrentUser' => [
            'method' => 'GET',
            'path' => '/users/me',
            'security' => "is_granted('ROLE_USER')",
            'controller' => GetCurrentUserController::class,
            'pagination_enabled' => false,
            'openapi_context' => [
                'summary' => 'Obtain data of the currently logged in user.',
                'description' => 'Retrieve the currently logged in user.',
                'parameters' => [],
                'responses' => [
                    '200' => [
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/User-user_read',
                                ],
                            ],
                            'application/json+ld' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/User.jsonld-user_read',
                                ],
                            ],
                        ]
                    ]
                ]
            ]
        ],
    ],
    itemOperations: [
        'get' => ['security' => "is_granted('ROLE_ADMIN')"],
        'put' => [
            'security' => "is_granted('ROLE_ADMIN') || (is_granted('ROLE_USER') && object == user)",
            'denormalization_context' => ['groups' => ['user_edit']],
        ],
    ],
    normalizationContext: ['groups' => ['user_read']],
)]
#[UniqueEntity('email')]
#[UniqueEntity('displayName')]
#[ApiFilter(OrderFilter::class, properties: ['createdAt' => 'DESC', 'updatedAt'])]
#[ApiFilter(BooleanFilter::class, properties: ['active'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['user_read'])]
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    #[Groups(['user_read', 'user_write', 'user_edit'])]
    #[Email]
    private ?string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['user_read', 'user_write', 'user_edit', 'gift_read', 'planning_read'])]
    #[NotBlank]
    private ?string $displayName;

    /**
     * @ORM\Column(type="json")
     * @var array<string> $roles
     */
    private array $roles = [];

    #[Groups(['user_write'])]
    #[Length(min: 6, max: 255)]
    protected ?string $plainPassword = null;

    /**
     * @ORM\Column(type="string")
     */
    private string $password;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    #[Groups(['user_read'])]
    private ?DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    #[Groups(['user_read'])]
    private ?DateTimeInterface $updatedAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['user_write'])]
    private ?string $firebaseDeviceToken;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['user_read', 'user_write', 'user_edit'])]
    private ?string $preferredLanguage;

    /**
     * @ORM\Column(type="boolean", options={"default": TRUE})
     */
    #[Groups(['user_read', 'user_edit'])]
    private bool $active;

    /**
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="owner", orphanRemoval=true)
     */
    private Collection $mediaObjects;

    /**
     * @ORM\OneToMany(targetEntity=Library::class, mappedBy="owner", orphanRemoval=true)
     */
    private Collection $libraries;

    /**
     * @ORM\OneToMany(targetEntity=PushSubscription::class, mappedBy="subscribedUser", orphanRemoval=true)
     */
    private Collection $pushSubscriptions;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    #[Groups(['user_read'])]
    private ?DateTimeInterface $acceptedTosAt;

    /**
     * @ORM\Column(type="boolean", options={"default": FALSE})
     */
    #[Groups(['user_read', 'user_edit'])]
    private bool $banned = false;

    public function __construct()
    {
        $this->active = false;
        $this->mediaObjects = new ArrayCollection();
        $this->libraries = new ArrayCollection();
        $this->pushSubscriptions = new ArrayCollection();
        $this->acceptedTosAt = new DateTime();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param array<string> $roles
     */
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * @param string|null $plainPassword
     */
    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string)$this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
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

    public function getFirebaseDeviceToken(): ?string
    {
        return $this->firebaseDeviceToken;
    }

    public function setFirebaseDeviceToken(?string $firebaseDeviceToken): self
    {
        $this->firebaseDeviceToken = $firebaseDeviceToken;

        return $this;
    }

    public function getPreferredLanguage(): ?string
    {
        return $this->preferredLanguage;
    }

    public function setPreferredLanguage(?string $preferredLanguage): self
    {
        $this->preferredLanguage = $preferredLanguage;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getMediaObjects(): Collection
    {
        return $this->mediaObjects;
    }

    public function addMediaObject(MediaObject $mediaObject): self
    {
        if (!$this->mediaObjects->contains($mediaObject)) {
            $this->mediaObjects[] = $mediaObject;
            $mediaObject->setOwner($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            // set the owning side to null (unless already changed)
            if ($mediaObject->getOwner() === $this) {
                $mediaObject->setOwner(null);
            }
        }

        return $this;
    }

    public function getLibraries(): Collection
    {
        return $this->libraries;
    }

    public function addLibrary(Library $library): self
    {
        if (!$this->libraries->contains($library)) {
            $this->libraries[] = $library;
            $library->setOwner($this);
        }

        return $this;
    }

    public function removeLibrary(Library $library): self
    {
        if ($this->libraries->removeElement($library)) {
            // set the owning side to null (unless already changed)
            if ($library->getOwner() === $this) {
                $library->setOwner(null);
            }
        }

        return $this;
    }

    public function getDisplayName(): ?string
    {
        return $this->displayName;
    }

    public function setDisplayName(string $displayName): self
    {
        $this->displayName = $displayName;

        return $this;
    }

    /**
     * @return Collection|PushSubscription[]
     */
    public function getPushSubscriptions(): Collection
    {
        return $this->pushSubscriptions;
    }

    public function addPushSubscription(PushSubscription $pushSubscription): self
    {
        if (!$this->pushSubscriptions->contains($pushSubscription)) {
            $this->pushSubscriptions[] = $pushSubscription;
            $pushSubscription->setSubscribedUser($this);
        }

        return $this;
    }

    public function removePushSubscription(PushSubscription $pushSubscription): self
    {
        if ($this->pushSubscriptions->removeElement($pushSubscription)) {
            // set the owning side to null (unless already changed)
            if ($pushSubscription->getSubscribedUser() === $this) {
                $pushSubscription->setSubscribedUser(null);
            }
        }

        return $this;
    }

    public function getAcceptedTosAt(): ?\DateTimeInterface
    {
        return $this->acceptedTosAt;
    }

    public function setAcceptedTosAt(?\DateTimeInterface $acceptedTosAt): self
    {
        $this->acceptedTosAt = $acceptedTosAt;

        return $this;
    }

    public function isBanned(): ?bool
    {
        return $this->banned;
    }

    public function ban(): self
    {
        $this->banned = true;

        return $this;
    }

    public function unBan(): self
    {
        $this->banned = false;

        return $this;
    }

    public function setBanned(bool $banned): self
    {
        $this->banned = $banned;

        return $this;
    }
}
