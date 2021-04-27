<?php

namespace App\Tests;

use App\Entity\Animation;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AnimationTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

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

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('POST', $iri);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('POST', $iri, [
            'json' => [
                'name' => 'superAnim',
                'lottieLink' => 'https://lottiefiles.com/59444-ufo-error-page-404',
                'enabled' => false,
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(Animation::class);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            'name' => 'superAnim',
            'lottieLink' => 'https://lottiefiles.com/59444-ufo-error-page-404',
            'enabled' => false,
        ]);
    }

    public function testUpdateAnimationAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('PUT', $iri);
    }

    public function testUpdateAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('PUT', $iri);
    }

    public function testDeleteAnimationAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('DELETE', $iri);
    }

    public function testDeleteAnimationAsAdmin(): void
    {
        $client = self::createClientWithCredentials();

        $iri = $this->findIriBy(Animation::class, ['name' => 'Fireworks']);
        $client->request('DELETE', $iri);
    }
}
