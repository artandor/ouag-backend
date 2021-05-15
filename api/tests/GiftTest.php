<?php

namespace App\Tests;

use App\Entity\Gift;
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
            'hydra:totalItems' => 20,
        ]);
    }

    public function testGetAllGiftsICreated(): void
    {

    }

    public function testGetAllGiftsOfferedToMe(): void
    {

    }

    public function testThatICannotSeeAGiftInDraftIfImReceiver(): void
    {

    }

    public function testUpdateIncreaseGiftMediaAmount(): void
    {
        // Assert that increasing the media amount add plannings without removing previously made plannings
    }

    public function testUpdateDecreaseGiftMediaAmount(): void
    {
        // Assert that decreasing the media amount remove latest positions
    }

    public function testDeleteGift(): void
    {
        // Should delete gifts and all linked plannings and PlanningMedia
    }

    public function testGiftPermissions(): void
    {
        // Cannot see unowned gift in collections
        // Cannot PUT, DELETE unowned gift
    }
}
