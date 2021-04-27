<?php
declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\GetCurrentUserController;
use App\Repository\UserRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
#[ApiResource(
    collectionOperations: [
    'get' => ['security' => "is_granted('ROLE_ADMIN')"],
    'post',
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
    'put' => ['security' => "is_granted('ROLE_USER') && object == user"],
],
    denormalizationContext: ['groups' => ['user_write']],
    normalizationContext: ['groups' => ['user_read']],
)]
#[UniqueEntity('email')]
class User implements UserInterface
{
    #[Groups(['user_write'])]
    #[Assert\Length(min: 6, max: 255)]
    protected ?string $plainPassword;
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
    #[Groups(['user_read', 'user_write'])]
    #[Assert\Email]
    private ?string $email;
    /**
     * @ORM\Column(type="json")
     */
    private array $roles = [];
    /**
     * @ORM\Column(type="string")
     */
    private string $password;

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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['user_write'])]
    private ?string $firebaseDeviceToken;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['user_write'])]
    private ?string $preferredLanguage;

    /**
     * @ORM\Column(type="boolean", options={"default": TRUE})
     */
    #[Groups(['user_read'])]
    private ?bool $active;

    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->setActive(true);
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
    public function eraseCredentials()
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

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }
}
