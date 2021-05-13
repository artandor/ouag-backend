<?php

namespace App\Tests;

use App\Entity\MediaObject;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\Messenger\Transport\InMemoryTransport;

class MediaObjectTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

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
            'hydra:totalItems' => 102,
            'hydra:view' => [
                '@id' => '/media_objects?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/media_objects?page=1',
                'hydra:next' => '/media_objects?page=2',
                'hydra:last' => '/media_objects?page=4',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(MediaObject::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['title']);
    }

    public function testGetMediaObjectIOwn(): void
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(MediaObject::class, ['title' => 'owned media']);
        $client->request('GET', $iri);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(MediaObject::class);
        $this->assertJsonContains([
            'title' => 'owned media',
        ]);
    }

    public function testGetMediaObjectIDontOwn(): void
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(MediaObject::class, ['title' => 'not owned media']);
        $client->request('GET', $iri);

        $this->assertResponseStatusCodeSame(403);
    }

    public function testGetMediaObjectShared(): void
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(MediaObject::class, ['title' => 'sharedMedia']);
        $client->request('GET', $iri);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(MediaObject::class);
        $this->assertJsonContains([
            'title' => 'sharedMedia',
        ]);
    }

    public function testDeleteMediaObject(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(MediaObject::class, ['title' => 'owned media']);
        $client->request('DELETE', $iri);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(MediaObject::class)
                ->findOneBy(['title' => 'owned media'])
        );

        // Assert that deleting a library produce a message for each media deleted by cascade.
        /** @var InMemoryTransport $transport */
        $transport = self::$container->get('messenger.transport.async');
        $this->assertCount(1, $transport->get());
    }

}
