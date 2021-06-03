<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GiftInviteRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Email;

/**
 * @ORM\Entity(repositoryClass=GiftInviteRepository::class)
 */
#[ApiResource(
    collectionOperations: [
],
    itemOperations: [
    'get' => ['security' => "is_granted('ROLE_ADMIN') or object.getGift().getOwner() == user",],
    'put' => ['security' => "is_granted('ROLE_ADMIN') or object.getGift().getOwner() == user",],
    'delete' => ['security' => "is_granted('ROLE_ADMIN') or object.getGift().getOwner() == user",],
],
    denormalizationContext: ['groups' => ['gift_invite_write']],
    normalizationContext: ['groups' => ['gift_invite_read']]
)]
class GiftInvite
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
    #[Email]
    #[Groups(['gift_invite_write', 'gift_invite_read', 'gift_read'])]
    private ?string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private ?string $token;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['gift_invite_write', 'gift_invite_read', 'gift_read'])]
    private ?string $creatorNickname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['gift_invite_write', 'gift_invite_read', 'gift_read'])]
    private ?string $receiverNickname;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    #[Groups(['gift_invite_write', 'gift_invite_read', 'gift_read'])]
    private ?string $comment;

    /**
     * @ORM\Column(type="boolean")
     */
    #[Groups(['gift_invite_read', 'gift_read'])]
    private ?bool $claimed;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    #[Groups(['gift_invite_read'])]
    private ?DateTimeInterface $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private ?DateTimeInterface $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Gift::class, inversedBy="invites")
     * @ORM\JoinColumn(nullable=false)
     */
    private ?Gift $gift;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->token = mt_rand(100000, 999999);
        $this->claimed = false;
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

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getCreatorNickname(): ?string
    {
        return $this->creatorNickname;
    }

    public function setCreatorNickname(?string $creatorNickname): self
    {
        $this->creatorNickname = $creatorNickname;

        return $this;
    }

    public function getReceiverNickname(): ?string
    {
        return $this->receiverNickname;
    }

    public function setReceiverNickname(?string $receiverNickname): self
    {
        $this->receiverNickname = $receiverNickname;

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

    public function getClaimed(): ?bool
    {
        return $this->claimed;
    }

    public function setClaimed(bool $claimed): self
    {
        $this->claimed = $claimed;

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

    public function getGift(): ?Gift
    {
        return $this->gift;
    }

    public function setGift(?Gift $gift): self
    {
        $this->gift = $gift;

        return $this;
    }
}
