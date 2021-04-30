<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateMediaObjectAction;
use App\Repository\MediaObjectRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass=MediaObjectRepository::class)
 * @Vich\Uploadable()
 */
#[ApiResource(
    collectionOperations: [
    'get',
    'post' => [
        'controller' => CreateMediaObjectAction::class,
        'deserialize' => false,
        'security' => "is_granted('ROLE_USER')",
        'validation_groups' => ["Default", "media_object_create"],
        'normalization_context' => ['groups' => ['media_object_read']],
        'openapi_context' => [
            'requestBody' => ['content' => [
                'multipart/form-data' => [
                    'schema' => [
                        '$ref' => '#/components/schemas/MediaObject.jsonld-media_object_create',
                    ]
                ]
            ]]
        ]

    ]
],
    iri: "http://schema.org/MediaObject",
    itemOperations: [
    'get' => [
        'security' => "is_granted('ROLE_USER') and object.owner == user",
    ],
    'put' => ['denormalizationContext' => ['groups' => ['media_object_update']]]
],
    denormalizationContext: ['groups' => ['media_object_create']],
    normalizationContext: ['groups' => ['media_object_read']],
    security: "is_granted('ROLE_USER')"
)]
class MediaObject
{
    /**
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="content")
     */
    #[ApiProperty(openapiContext: ['description' => 'Use this property to add a file (gif, video, photo) as a media',
        'type' => 'string', 'format' => 'binary'])]
    #[Groups(['media_object_create'])]
    public $file;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['media_object_read', 'media_object_create', 'media_object_update'])]
    private ?string $title;
    /**
     * @ORM\Column(type="boolean")
     */
    #[Groups(['media_object_read', 'media_object_create', 'media_object_update'])]
    private bool $nsfw;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['media_object_read', 'media_object_create', 'media_object_update'])]
    private ?string $comment;
    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['media_object_read'])]
    private string $type;
    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['media_object_read', 'media_object_create'])]
    #[ApiProperty(openapiContext: ['description' => 'Use this property to add a string (link, text, ...) as a media'])]
    private string $content;
    /**
     * @ORM\Column(type="bigint", nullable=true)
     */
    #[Groups(['media_object_read'])]
    private ?string $size;

    /**
     * @Gedmo\Blameable(on="create")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="mediaObjects")
     * @ORM\JoinColumn(nullable=false)
     */
    private User $owner;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getNsfw(): ?bool
    {
        return $this->nsfw;
    }

    public function setNsfw(bool $nsfw): self
    {
        $this->nsfw = $nsfw;

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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(?string $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }
}
