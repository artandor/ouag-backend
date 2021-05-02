<?php

namespace App\Tests;

use App\Entity\Library;
use App\Entity\User;
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

        $client->request('POST', '/libraries', [
            'json' => [
                'name' => 'My super library'
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'name' => 'My super library',
            'sharedWith' => [],
        ]);
        $this->assertMatchesResourceItemJsonSchema(Library::class);
    }

    public function testUpdateLibrary(): void
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(Library::class, ['name' => 'First Lib']);

        $response = $client->request('PUT', $iri, [
            'json' => [
                'name' => 'My super library is updated'
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'name' => 'My super library is updated',
            'sharedWith' => [],
        ]);
        $this->assertMatchesResourceItemJsonSchema(Library::class);
    }

    public function testUpdateLibraryIDontOwn(): void
    {
        $client = self::createClientWithCredentials();
        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2 shared with 1']);

        $client->request('PUT', $iri, [
            'json' => [
                'name' => 'Shared Lib is updated'
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testDeleteLibrary(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'First Lib']);
        $client->request('DELETE', $iri);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Library::class)
                ->findOneBy(['name' => 'First Lib'])
        );
    }

    public function testDeleteLibraryIDontOwn(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2 shared with 1']);
        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(403);
    }

    public function testGetSharedLibrary(): void
    {
        $client = self::createClientWithCredentials();

        $user1iri = $this->findIriBy(User::class, ['email' => 'user@example.com']);

        $iri = $this->findIriBy(Library::class, ['name' => 'sharedLib']);
        $client->request('GET', $iri);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Library::class);
        $this->assertJsonContains([
            'name' => 'sharedLib',
            'sharedWith' => [
                $user1iri
            ],
        ]);
    }
}
