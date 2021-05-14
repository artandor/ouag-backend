<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

abstract class CustomApiTestCase extends ApiTestCase
{
    private string $token;
    private Client $clientWithCredentials;

    use RefreshDatabaseTrait;

    public function setUp(): void
    {
        self::bootKernel();
    }

    protected function createClientWithCredentials($token = null, $body = []): Client
    {
        $token = $token ?: $this->getToken($body);

        return static::createClient([], ['headers' => ['authorization' => 'Bearer ' . $token]]);
    }

    /**
     * Use other credentials if needed.
     */
    protected function getToken($body = []): string
    {
        $response = static::createClient()->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => $body ?: [
                'email' => 'user@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $this->assertResponseIsSuccessful();
        $data = json_decode($response->getContent());

        return $data->token;
    }
}
