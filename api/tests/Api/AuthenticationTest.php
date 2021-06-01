<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RecreateDatabaseTrait;

class AuthenticationTest extends ApiTestCase
{
    use RecreateDatabaseTrait;

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
        $client = self::createClient();

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $json = $response->toArray();
        $client->request('GET', '/users/me', ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'user@example.com',
            'displayName' => 'awtandow',
        ]);

        $user2 = self::createUser('testUser2@example.com', '$3CR3T2');

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'testUser2@example.com',
                'password' => '$3CR3T2',
            ],
        ]);

        $json = $response->toArray();
        $client->request('GET', '/users/me', ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'id' => $user2->getId(),
            'email' => 'testUser2@example.com',
        ]);
    }

    public static function createUser(string $username, string $password, array $roles = []): User
    {
        $user = new User();
        $user->setEmail($username);
        $user->setPlainPassword($password);
        $user->setRoles($roles);
        $user->setDisplayName($username);

        $manager = static::$container->get('doctrine')->getManager();
        $manager->persist($user);
        $manager->flush();
        return $user;
    }

    public function testCreateUserHelper(): void
    {
        self::createClient();
        $user = self::createUser('test@mail.fr', '$ecret');
        $this->assertEquals('test@mail.fr', $user->getEmail());
    }
}
