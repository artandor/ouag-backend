<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;

abstract class CustomApiTestCase extends ApiTestCase
{
    public function setUp(): void
    {
        self::createClient();
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
