<?php

namespace App\Tests;

use App\Entity\Library;
use App\Entity\MediaObject;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LibraryMediaTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

    public function testGetAllMediasOfALibraryIOwn(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'First Lib']);
        $response = $client->request('GET', $iri . '/media_objects');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/MediaObject',
            '@id' => $iri . '/media_objects',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 11,
        ]);
        $this->assertCount(11, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(MediaObject::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['title']);
    }

    public function testGetAllMediasOfALibrarySharedToMe(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2 shared with 1']);
        $response = $client->request('GET', $iri . '/media_objects');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/MediaObject',
            '@id' => $iri . '/media_objects',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 50,
            'hydra:view' => [
                '@id' => $iri . '/media_objects?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => $iri . '/media_objects?page=1',
                'hydra:next' => $iri . '/media_objects?page=2',
                'hydra:last' => $iri . '/media_objects?page=2',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(MediaObject::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['title']);

    }

    public function testGetAllMediasOfALibraryIDontOwn(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2']);
        $response = $client->request('GET', $iri . '/media_objects');

        $this->assertJsonContains([
            'hydra:totalItems' => 0,
        ]);
        $this->assertCount(0, $response->toArray()['hydra:member']);
    }

    public function testCreateAMediaImageInALibraryIOwn(): void
    {
        $file = new UploadedFile('fixtures/files/image.png', 'image.png');
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'First Lib']);
        $client->request('POST', $iri . '/media_objects', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'title' => 'Mon fichier uploaded'
                ],
                'files' => [
                    'file' => $file
                ]
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(MediaObject::class);
        $this->assertJsonContains([
            'title' => 'Mon fichier uploaded',
        ]);
    }

    public function testCreateAMediaInALibraryShared(): void
    {
        $file = new UploadedFile('fixtures/files/image.png', 'image.png');
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2 shared with 1']);
        $client->request('POST', $iri . '/media_objects', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'title' => 'Mon fichier uploaded in shared'
                ],
                'files' => [
                    'file' => $file
                ]
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(MediaObject::class);
        $this->assertJsonContains([
            'title' => 'Mon fichier uploaded in shared',
        ]);
    }

    public function testCreateAMediaInALibraryIDoNotOwn(): void
    {
        $file = new UploadedFile('fixtures/files/image.png', 'image.png');
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Library::class, ['name' => 'Lib of user 2']);
        $client->request('POST', $iri . '/media_objects', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'title' => 'Mon fichier uploaded in shared'
                ],
                'files' => [
                    'file' => $file
                ]
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);
    }
}
