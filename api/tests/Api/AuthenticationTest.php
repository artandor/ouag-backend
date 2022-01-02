<?php

namespace App\Tests\Api;

use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AuthenticationTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testLogin(): void
    {
        $client = self::createClient();

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $json = $response->toArray();
        $this->assertResponseIsSuccessful();
        $this->assertArrayHasKey('token', $json);
        $this->assertArrayHasKey('refresh_token', $json);

        $client->request('GET', '/users/me');
        $this->assertResponseStatusCodeSame(401);

        $client->request('GET', '/users/me', ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'user@example.com',
            'displayName' => 'awtandow',
        ]);
    }

    public function testLoginWithWrongPassword(): void
    {
        $client = self::createClient();

        $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'password' => '$3CR3TA',
            ],
        ]);

        $this->assertResponseStatusCodeSame(401);
        $this->assertJsonContains([
            'message' => 'Invalid credentials.'
        ]);
    }

    public function testRefreshToken(): void
    {
        $client = self::createClient();

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $json = $response->toArray();
        $this->assertArrayHasKey('refresh_token', $json);

        $refreshToken = $json['refresh_token'];
        $response = $client->request('POST', '/authentication_token/refresh', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'refresh_token' => $refreshToken
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $json = $response->toArray();
        $this->assertArrayHasKey('token', $json);
        $this->assertEquals($refreshToken, $json['refresh_token']);
    }

    public function testGetMe(): void
    {
        $client = self::createClientWithCredentials();

        $client->request('GET', '/users/me');
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'user@example.com',
            'displayName' => 'awtandow',
        ]);

        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'second.user@example.com',
            'password' => 'Second.!seCrEt',
        ]));
        $client->request('GET', '/users/me');
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'second.user@example.com',
        ]);
    }

    public function testUserConnectWithInactiveAccount(): void
    {
        $client = self::createClient();
        $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'inactiveuser@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $this->assertQueuedEmailCount(1);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testUserConnectWithBannedAccount(): void
    {
        $client = self::createClient();
        $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'banneduser@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $this->assertQueuedEmailCount(0);
        $this->assertResponseStatusCodeSame(401);
    }
}
