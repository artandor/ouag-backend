<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use App\Repository\AnimationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AnimationRepository::class)
 */
#[ApiResource(
    collectionOperations: [
    'get',
    'post' => ['security' => "is_granted('ROLE_ADMIN')"],
],
    itemOperations: [
    'get',
    'put' => ['security' => "is_granted('ROLE_ADMIN')"],
    'delete' => ['security' => "is_granted('ROLE_ADMIN')"],
],
    denormalizationContext: ['groups' => ['animation_write']],
    normalizationContext: ['groups' => ['animation_read']],
)]
#[ApiFilter(BooleanFilter::class, properties: ['enabled'])]
class Animation
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
    #[Groups(['animation_read', 'animation_write'])]
    private string $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['animation_read', 'animation_write', 'gift_read'])]
    private string $lottieLink;

    /**
     * @ORM\Column(type="boolean")
     */
    #[Groups(['animation_read', 'animation_write'])]
    private bool $enabled;

    public function __construct()
    {
        if (!isset($this->enabled)) {
            $this->enabled = true;
        }
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

    public function getLottieLink(): ?string
    {
        return $this->lottieLink;
    }

    public function setLottieLink(string $lottieLink): self
    {
        $this->lottieLink = $lottieLink;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }
}
