<?php

namespace App\Tests\Api;

use App\Entity\Gift;
use App\Entity\GiftInvite;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class GiftInviteTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

    public function testCreateInviteForGift()
    {
        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $this->createClientWithCredentials()->request('POST', $giftIri . '/invites', ['json' => [
            'email' => 'marco-polo@example.com',
            'creatorNickname' => 'Rosa',
            'receiverNickname' => 'Marco',
            'comment' => 'Salute',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'marco-polo@example.com',
            'creatorNickname' => 'Rosa',
            'receiverNickname' => 'Marco',
            'comment' => 'Salute',
        ]);
        $this->assertMatchesResourceItemJsonSchema(GiftInvite::class);
    }

    public function testCreateInviteForGiftIDontOwn()
    {
        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift not owned']);
        $this->createClientWithCredentials()->request('POST', $giftIri . '/invites', ['json' => [
            'email' => 'marco-polo@example.com',
            'creatorNickname' => 'Rosa',
            'receiverNickname' => 'Marco',
            'comment' => 'Salute',
        ]]);

        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateInviteWithoutGift()
    {
        $this->createClientWithCredentials()->request('POST', '/gift_invites', ['json' => [
            'email' => 'marco-polo@example.com',
            'creatorNickname' => 'Rosa',
            'receiverNickname' => 'Marco',
            'comment' => 'Salute',
        ]]);

        $this->assertResponseStatusCodeSame(404);
    }

    public function testUpdateInvite()
    {
        $iri = $this->findIriBy(GiftInvite::class, ['receiverNickname' => 'Marcoleptic']);
        self::createClientWithCredentials()->request('PUT', $iri, ['json' => [
            'email' => 'marco-polochon@example.com',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'marco-polochon@example.com',
            'receiverNickname' => 'Marcoleptic',
        ]);
        $this->assertMatchesResourceItemJsonSchema(GiftInvite::class);
    }

    public function testGetAllInvitesFromGiftIOwn()
    {
        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $response = $this->createClientWithCredentials()->request('GET', $giftIri);

        $this->assertResponseIsSuccessful();
        $this->assertCount(11, $response->toArray()['invites']);
    }

    public function testGetInvitesFromGiftIDontOwn()
    {
        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift not owned']);
        $this->createClientWithCredentials()->request('GET', $giftIri);

        $this->assertResponseStatusCodeSame(403);
    }

    public function testRemoveInviteFromGiftIOwn()
    {
        $iri = $this->findIriBy(GiftInvite::class, ['receiverNickname' => 'Marcoleptic']);
        self::createClientWithCredentials()->request('DELETE', $iri,);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
    }

    public function testClaimGiftFromInviteWithGoodEmailAndTokenAddsInvitedToReceivers()
    {
        self::createClientWithCredentials()->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '123456']],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'receivers' => [['@id' => $this->findIriBy(User::class, ['email' => 'user@example.com']), 'displayName' => "awtandow"]]
        ]);
    }

    public function testClaimGiftFromInviteWithGoodEmailAndTokenSendNonFrenchCreatorAnEnglishEmail()
    {
        self::createClientWithCredentials()->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '123456']],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'We\'re sure your gift is perfect, but just in case,');
    }

    public function testClaimGiftFromInviteWithGoodEmailAndTokenSendFrenchCreatorAnFrenchEmail()
    {
        self::createClientWithCredentials($this->getToken([
            'email' => 'activeuser@example.com',
            'password' => 'seCrEt',
        ]))->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => "987654"]],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'Nous sommes persuadés que votre cadeau est parfait,');
    }

    public function testClaimGiftFromInviteWithGoodEmailAndTokenSendEnglishCreatorAnEnglishEmail()
    {
        self::createClientWithCredentials($this->getToken([
            'email' => 'activeuser_en@example.com',
            'password' => 'seCrEt',
        ]))->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => "123789"]],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'We\'re sure your gift is perfect, but just in case,');
    }

    public function testClaimGiftFromInviteWithBadEmail()
    {
        self::createClientWithCredentials($this->getToken([
            'email' => 'second.user@example.com',
            'password' => 'Second.!seCrEt',
        ]))->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '123456']],
        ]);

        $this->assertResponseStatusCodeSame(404);
    }

    public function testClaimGiftFromInviteWithBadToken()
    {
        self::createClientWithCredentials()->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '123458']],
        ]);

        $this->assertResponseStatusCodeSame(404);
    }

    public function testClaimGiftFromInviteNotPublished()
    {
        self::createClientWithCredentials()->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '123469']],
        ]);
        $this->assertResponseStatusCodeSame(409);
    }

    public function testClaimGiftFromInviteAlreadyClaimed()
    {
        self::createClientWithCredentials()->request('GET', '/gifts/claim', [
            'extra' => ['parameters' => ['token' => '147852']],
        ]);
        $this->assertResponseStatusCodeSame(409);
    }
}
