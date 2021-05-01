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

        $response = $client->request('GET', '/media_objects');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/MediaObject',
            '@id' => '/media_objects',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 150,
            'hydra:view' => [
                '@id' => '/media_objects?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/media_objects?page=1',
                'hydra:next' => '/media_objects?page=2',
                'hydra:last' => '/media_objects?page=5',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(MediaObject::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['title']);
    }

}
