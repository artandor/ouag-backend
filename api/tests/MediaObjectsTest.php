<?php

namespace App\Tests;

use App\Entity\MediaObject;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class MediaObjectsTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testGetAllMediaObjects(): void
    {
        $client = self::createClientWithCredentials();

        $response = $client->request('GET', '/animations');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Animation',
            '@id' => '/animations',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
            'hydra:view' => [
                '@id' => '/animations?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/animations?page=1',
                'hydra:next' => '/animations?page=2',
                'hydra:last' => '/animations?page=4',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(MediaObject::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
    }

}
