<?php

namespace App\Tests\Api;

use App\Entity\Gift;
use App\Entity\GiftInvite;
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
        $this->assertMatchesResourceItemJsonSchema(Gift::class);
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

    public function testClaimGiftFromInviteWithGoodEmailAndToken()
    {
        self::createClientWithCredentials()->request('GET', '/gift_invites/claim', [
            'extra' => ['parameters' => ['token' => '123456']],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(GiftInvite::class);
    }

    public function testClaimGiftFromInviteWithBadEmail()
    {
        self::createClientWithCredentials($this->getToken([
            'email' => 'second.user@example.com',
            'password' => 'Second.!seCrEt',
        ]))->request('GET', '/gift_invites/claim', [
            'extra' => ['parameters' => ['token' => '123456']],
        ]);

        $this->assertResponseStatusCodeSame(404);
    }

    public function testClaimGiftFromInviteWithBadToken()
    {
        self::createClientWithCredentials()->request('GET', '/gift_invites/claim', [
            'extra' => ['parameters' => ['token' => '123458']],
        ]);

        $this->assertResponseStatusCodeSame(404);
    }
}
