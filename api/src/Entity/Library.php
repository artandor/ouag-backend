<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Controller\CreateMediaObjectAction;
use App\Repository\LibraryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LibraryRepository::class)
 */
#[UniqueEntity(fields: ['owner', 'name'], message: 'This library already exists on your account.', errorPath: 'name',)]
#[ApiResource(
    collectionOperations: [
    'get',
    'post',
],
    itemOperations: [
    'get' => ['security' => "is_granted('ROLE_USER') and (object.getOwner() == user
        or object.getSharedWith().contains(user))"],
    'put' => ['security' => "is_granted('ROLE_USER') and object.getOwner() == user"],
    'delete' => ['security' => "is_granted('ROLE_USER') and object.getOwner() == user"],
    'postMedia' => [
        'method' => 'POST',
        'controller' => CreateMediaObjectAction::class,
        'path' => '/libraries/{id}/media_objects',
        'deserialize' => false,
        'validation_groups' => ["Default", "media_object_create"],
        'normalization_context' => ['groups' => ['media_object_read']],
        'security' => "is_granted('ROLE_USER') and (object.getOwner() == user
        or object.getSharedWith().contains(user))",
        'openapi_context' => [
            'summary' => 'Create a media inside a library',
            'description' => 'Create a media object and add it to the library found from the {id}',
            'requestBody' => ['content' => [
                'multipart/form-data' => [
                    'schema' => [
                        '$ref' => '#/components/schemas/MediaObject.jsonld-media_object_create',
                    ]
                ]
            ]],
            'responses' => [
                '201' => [
                    'description' => 'The media object created',
                    'content' => [
                        'application/json+ld' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/MediaObject.jsonld-media_object_read',
                            ],
                        ],
                    ],
                ],
            ]
        ]
    ]
],
    denormalizationContext: ['groups' => ['library_write']],
    normalizationContext: ['groups' => ['library_read']],
    security: "is_granted('ROLE_USER')",
)]
class Library
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['library_write', 'library_read'])]
    private string $name;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $createdAt;

    /**
     * Injected by Listener/LibraryInjectOwnerSubscriber.php
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="libraries")
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups(['library_read'])]
    private User $owner;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     * @ORM\JoinTable(name="library_shared_with_users")
     */
    #[Groups(['library_write', 'library_read'])]
    private Collection $sharedWith;

    /**
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="library", orphanRemoval=true)
     */
    #[ApiSubresource(maxDepth: 1)]
    private Collection $mediaObjects;

    public function __construct()
    {
        $this->sharedWith = new ArrayCollection();
        $this->mediaObjects = new ArrayCollection();
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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getSharedWith(): Collection
    {
        return $this->sharedWith;
    }

    public function addSharedWith(User $sharedWith): self
    {
        if (!$this->sharedWith->contains($sharedWith)) {
            $this->sharedWith[] = $sharedWith;
        }

        return $this;
    }

    public function removeSharedWith(User $sharedWith): self
    {
        $this->sharedWith->removeElement($sharedWith);

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
            $mediaObject->setLibrary($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            if ($mediaObject->getLibrary() === $this) {
                $mediaObject->setLibrary(null);
            }
        }

        return $this;
    }
}
