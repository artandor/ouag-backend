<?php

namespace App\Tests;

use App\Entity\Animation;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class AnimationTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

    public function testGetAllAnimations(): void
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
        $this->assertMatchesResourceCollectionJsonSchema(Animation::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
    }

    public function testGetAllEnabledAnimations(): void
    {
        $client = self::createClientWithCredentials();

        $response = $client->request('GET', '/animations', ['extra' => ['parameters' => ['enabled' => 'true']]]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Animation',
            '@id' => '/animations',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 49,
            'hydra:view' => [
                '@id' => '/animations?enabled=true&page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/animations?enabled=true&page=1',
                'hydra:next' => '/animations?enabled=true&page=2',
                'hydra:last' => '/animations?enabled=true&page=2',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(Animation::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
        $this->assertTrue($item['enabled']);
    }

    public function testGetAllDisabledAnimations(): void
    {
        $client = self::createClientWithCredentials();

        $response = $client->request('GET', '/animations', ['extra' => ['parameters' => ['enabled' => 'false']]]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/Animation',
            '@id' => '/animations',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 51,
            'hydra:view' => [
                '@id' => '/animations?enabled=false&page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/animations?enabled=false&page=1',
                'hydra:next' => '/animations?enabled=false&page=2',
                'hydra:last' => '/animations?enabled=false&page=2',
            ],
        ]);
        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(Animation::class);

        $item = $response->toArray()['hydra:member'][0];
        $this->assertNotNull($item['name']);
        $this->assertFalse($item['enabled']);
    }

    public function testGetOneAnimation(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('GET', $iri);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Animation::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            'name' => 'Fireworks',
            'lottieLink' => 'https://lottiefiles.com/3287-fireworks'
        ]);
    }

    public function testCreateAnimationAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $client->request('POST', '/animations', [
            'json' => [
                'name' => 'superAnim',
                'lottieLink' => 'https://lottiefiles.com/59444-ufo-error-page-404',
                'enabled' => false,
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'admin@example.com',
            'password' => 'seCrEt',
        ]));

        $client->request('POST', '/animations', [
            'json' => [
                'name' => 'super animation',
                'lottieLink' => 'https://lottiefiles.com/59444-ufo-error-page-404',
                'enabled' => false,
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Animation::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            'name' => 'super animation',
            'lottieLink' => 'https://lottiefiles.com/59444-ufo-error-page-404',
            'enabled' => false,
        ]);
    }

    public function testUpdateAnimationAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('PUT', $iri, [
            'json' => ['enabled' => false,]
        ]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUpdateAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'admin@example.com',
            'password' => 'seCrEt',
        ]));

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('PUT', $iri, [
            'json' => ['enabled' => false,]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'name' => 'Fireworks',
            'enabled' => false,
        ]);
    }

    public function testDeleteAnimationAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('DELETE', $iri);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testDeleteAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'admin@example.com',
            'password' => 'seCrEt',
        ]));

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('DELETE', $iri);
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Animation::class)->findOneBy(['name' => 'Fireworks'])
        );
    }
}
