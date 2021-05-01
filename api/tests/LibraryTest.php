<?php

namespace App\Tests;

use App\Entity\Library;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class LibraryTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testGetAllLibrariesAsUser1(): void
    {
        $client = self::createClientWithCredentials();

        $response = $client->request('GET', '/libraries');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Library',
            '@id' => '/libraries',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 52,
            'hydra:view' => [
                '@id' => '/libraries?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/libraries?page=1',
                'hydra:next' => '/libraries?page=2',
                'hydra:last' => '/libraries?page=2',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(Library::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
    }

    public function testGetAllLibrariesAsUser2(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'second.user@example.com',
            'password' => 'Second.!seCrEt',
        ]));

        $response = $client->request('GET', '/libraries');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Library',
            '@id' => '/libraries',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 2,
        ]);
        $this->assertCount(2, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(Library::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
    }

    public function testCreateLibrary(): void
    {
        $client = self::createClientWithCredentials();

        $response = $client->request('POST', '/libraries');
    }

    public function testUpdateLibrary(): void
    {
        // TODO: implement test
    }

    public function testDeleteLibrary(): void
    {
        // TODO: implement test
    }

    public function testGetSharedLibrary(): void
    {
        // TODO: implement test
    }

    public function testUpdateNotOwnedLibrary(): void
    {
        // TODO: implement test
    }

    public function testUpdateSharedLibrary(): void
    {
        // TODO: implement test
    }
}
