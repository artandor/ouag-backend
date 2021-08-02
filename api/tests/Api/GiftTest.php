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

    public function testCreateAutomaticGift(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'activeuser@example.com',
            'password' => 'seCrEt',
        ]));

        $client->request('POST', '/gifts', [
            'json' => [
                'name' => 'Test Automatic Filling',
                'startAt' => '16-05-2021',
                'recurrence' => 2,
                'mediaAmount' => 15,
                'fillingMethod' => 'automatic',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'name' => 'Test Automatic Filling',
            'startAt' => '2021-05-16T00:00:00+00:00',
            'recurrence' => 2,
            'mediaAmount' => 15,
            'fillingMethod' => 'automatic',
        ]);

        // Asserts that plannings were generated on Gift creation
        /** @var Gift $gift */
        $gift = static::$container->get('doctrine')->getRepository(Gift::class)
            ->findOneBy(['name' => 'Test Automatic Filling']);
        $this->assertEquals(15, $gift->getPlannings()->count());

        // Asserts that plannings are filled with MediaObjects from user libraries, then their MediaObject is null when there are no more available MediaObjects
        $firstEmptyPlanning = $gift->getPlannings()->get(10);
        $lastFilledPlanning = $gift->getPlannings()->get(9);
        $firstFilledPlanning = $gift->getPlannings()->get(1);

        if ($lastFilledPlanning instanceof Planning) {
            $this->assertNotNull($lastFilledPlanning->getMedia());
            if ($firstFilledPlanning instanceof Planning) {
                $this->assertNotEquals($firstFilledPlanning->getMedia(), $lastFilledPlanning->getMedia());
            }
        }
        if ($firstEmptyPlanning instanceof Planning) {
            $this->assertNull($firstEmptyPlanning->getMedia());
        }
    }

    public function testGetAllGiftsImConcernedWith(): void
    {
        $client = self::createClientWithCredentials();

        $client->request('GET', '/gifts');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Gift',
            '@id' => '/gifts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 28,
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
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Gift',
            '@id' => '/gifts',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 13,
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
        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        self::createClientWithCredentials()->request('PUT', $iri . '/order', ['json' => []]);

        $this->assertResponseIsSuccessful();

        /** @var Gift $gift */
        $gift = static::$container->get('doctrine')->getRepository(Gift::class)
            ->findOneBy(['name' => 'Super gift']);

        /** @var Planning $planning */
        $planning = static::$container->get('doctrine')->getRepository(Planning::class)
            ->findOneBy(['gift' => $gift->getId(), 'position' => 0]);
        $this->assertNotNull($planning->getPlannedAt());
    }

    public function testOrderGiftSwitchesStateToOrdered()
    {
        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift']);
        $response = self::createClientWithCredentials()->request('PUT', $iri . '/order', ['json' => []]);

        $this->assertResponseIsSuccessful();
        $json = $response->toArray();
        $this->assertEquals(Gift::STATE_ORDERED, $json['state']);
    }

    public function testPublishingGiftSwitchesStateToPublishedAndSendsInvites()
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(Gift::class, ['name' => 'Super gift ordered']);
        $response = $client->request('PUT', $iri . '/publish', ['json' => []]);

        $this->assertResponseIsSuccessful();
        $json = $response->toArray();
        $this->assertEquals(Gift::STATE_PUBLISHED, $json['state']);

        $this->assertQueuedEmailCount(10);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, '123987');
        $this->assertEmailHtmlBodyContains($email, 'Enjoy your gift ! And don\'t forget to say thank you to');
    }
}
