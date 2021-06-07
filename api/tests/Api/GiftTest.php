<?php

namespace App\Tests\Api;

use App\Entity\Gift;
use App\Entity\MediaObject;
use App\Entity\Planning;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class GiftTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

    public function testCreateGift(): void
    {
        $client = self::createClientWithCredentials();

        $client->request('POST', '/gifts', [
            'json' => [
                'name' => 'Birthday moma',
                'startAt' => '16-05-2021',
                'recurrence' => 2,
                'mediaAmount' => 10,
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Gift::class);
        $this->assertJsonContains([
            'name' => 'Birthday moma',
            'startAt' => '2021-05-16T00:00:00+00:00',
            'recurrence' => 2,
            'mediaAmount' => 10,
        ]);

        // Asserts that plannings were generated on Gift creation
        /** @var Gift $gift */
        $gift = static::$container->get('doctrine')->getRepository(Gift::class)
            ->findOneBy(['name' => 'Birthday moma']);

        $this->assertEquals(10, $gift->getPlannings()->count());
    }

    public function testGetAllGiftsImConcernedWith(): void
    {
        $client = self::createClientWithCredentials();

        $client->request('GET', '/gifts');

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceCollectionJsonSchema(Gift::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Gift',
            '@id' => '/gifts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 26,
        ]);
    }

    public function testGetAllGiftsICreated(): void
    {
        $client = self::createClientWithCredentials();
        $user = static::$container->get('doctrine')->getRepository(User::class)
            ->findOneBy(['email' => 'user@example.com']);

        $client->request('GET', '/gifts', [
            'extra' => [
                'parameters' => [
                    'owner' => $user->getId(),
                ]
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceCollectionJsonSchema(Gift::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Gift',
            '@id' => '/gifts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 11,
        ]);
    }

    public function testGetAllGiftsOfferedToMe(): void
    {
        $client = self::createClientWithCredentials();
        $user = static::$container->get('doctrine')->getRepository(User::class)
            ->findOneBy(['email' => 'user@example.com']);

        $client->request('GET', '/gifts', [
            'extra' => [
                'parameters' => [
                    'receivers' => $user->getId(),
                ]
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceCollectionJsonSchema(Gift::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Gift',
            '@id' => '/gifts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 15,
        ]);
    }

    public function testUpdateIncreaseGiftMediaAmountWithoutRemovingPreviousPlannings(): void
    {
        $client = self::createClientWithCredentials();

        /** @var Gift $gift */
        $gift = static::$container->get('doctrine')->getRepository(Gift::class)
            ->findOneBy(['name' => 'Super gift']);

        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);

        $plannings = $client->request('GET', $giftIri . '/plannings');

        $this->assertResponseIsSuccessful();
        $json = $plannings->toArray();

        $planningIri = $json['hydra:member'][0]['@id'];

        $client->request('PUT', $planningIri, [
            'json' => [
                'media' => $this->findIriBy(MediaObject::class, ['title' => 'owned media']),
            ]
        ]);

        $client->request('PUT', $giftIri, [
            'json' => [
                'mediaAmount' => 40,
            ]
        ]);

        $this->assertResponseIsSuccessful();

        // Asserts that plannings were generated on Gift update
        $this->assertEquals(40, $gift->getPlannings()->count());

        //Assert that previously updated plannings are not reset
        $client->request('GET', $planningIri);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'media' => $this->findIriBy(MediaObject::class, ['title' => 'owned media']),
        ]);
    }

    public function testUpdateDecreaseGiftMediaAmount(): void
    {
        $client = self::createClientWithCredentials();

        /** @var Gift $gift */
        $gift = static::$container->get('doctrine')->getRepository(Gift::class)
            ->findOneBy(['name' => 'Super gift']);

        $giftIri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);

        $plannings = $client->request('GET', $giftIri . '/plannings');

        $json = $plannings->toArray();

        $planningIri = $json['hydra:member'][0]['@id'];

        $client->request('PUT', $planningIri, [
            'json' => [
                'media' => $this->findIriBy(MediaObject::class, ['title' => 'owned media']),
            ]
        ]);

        $client->request('PUT', $giftIri, [
            'json' => [
                'mediaAmount' => 10,
            ]
        ]);

        $this->assertResponseIsSuccessful();

        // Asserts that plannings were removed on Gift update
        $this->assertEquals(10, $gift->getPlannings()->count());

        /** @var Planning $latestPlanning */
        $latestPlanning = static::$container->get('doctrine')->getRepository(Planning::class)
            ->findOneBy(['gift' => $gift->getId()], ['position' => 'DESC']);
        $this->assertEquals(9, $latestPlanning->getPosition());

        //Assert that previously updated plannings are not reset
        $client->request('GET', $planningIri);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'media' => $this->findIriBy(MediaObject::class, ['title' => 'owned media']),
        ]);
    }

    public function testDeleteGift(): void
    {
        // Should delete gifts and all linked plannings
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $client->request('DELETE', $iri);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Gift::class)
                ->findOneBy(['name' => 'Super gift'])
        );
    }

    public function testGiftPermissions(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift not owned']);

        $client->request('GET', $iri);
        $this->assertResponseStatusCodeSame(403);

        $client->request('PUT', $iri, [
            'json' => [
                'name' => 'I am almighty and update smthing i don\'t own'
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);

        $client->request('DELETE', $iri);
        $this->assertResponseStatusCodeSame(403);

    }


    public function testOrderGiftGeneratePlannedAtData()
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $response = $client->request('GET', $iri . '/order');

        $this->assertResponseIsSuccessful();
        $json = $response->toArray();

        $planningsResponse = $client->request('GET', $json['@id'] . '/plannings');
        $this->assertResponseIsSuccessful();
        $item = $planningsResponse->toArray()['hydra:member'][0];
        dump($item);
        $this->assertNotNull($item['plannedAt']);
    }

    public function testOrderGiftSwitchesStateToPublished()
    {
        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $response = self::createClientWithCredentials()->request('GET', $iri . '/order');

        $this->assertResponseIsSuccessful();
        $json = $response->toArray();
        $this->assertEquals('published', $json['state']);
    }
}
