<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AuthenticationTest extends ApiTestCase
{
    use ReloadDatabaseTrait;

    public function testLogin(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T');

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
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
            'email' => 'test@example.com'
        ]);
    }

    public function testLoginWithWrongPassword(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T');

        $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
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

        $this->createUser('test@example.com', '$3CR3T');

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
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

    public function testCreateUser(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'myuser@example.com'
        ]);

        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            "@context" => "/contexts/ConstraintViolationList",
            "hydra:description" => "email: This value is already used.",
        ]);
    }

    public function testCreateUserInvalidEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'invalidemail',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            "@context" => "/contexts/ConstraintViolationList",
            "hydra:description" => "email: This value is not a valid email address.",
        ]);
    }

    public function testDeleteUser(): void
    {
        $client = self::createClient();

        $user = $this->createUser('test@example.com', '$3CR3T');

        $client->request('DELETE', '/users/' . $user->getId());
        $this->assertResponseStatusCodeSame(405);

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $token = $response->toArray()['token'];
        $client->request('DELETE', '/users/' . $user->getId(), ['auth_bearer' => $token]);
        $this->assertResponseStatusCodeSame(405);

    }

    public function testUserAccessListOfUserAsUser(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T');

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $token = $response->toArray()['token'];
        // User is not admin and shouldn't be able to use this route
        $client->request('GET', '/users', ['auth_bearer' => $token]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUserAccessListOfUserAsAdmin(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T', ['ROLE_ADMIN']);

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $token = $response->toArray()['token'];
        // User is not admin and shouldn't be able to use this route
        $client->request('GET', '/users', ['auth_bearer' => $token]);
        $this->assertResponseStatusCodeSame(200);
    }

    public function testUserAccessAnotherUserAsUser(): void
    {
        $client = self::createClient();

        $user1 = new User();
        $user1->setEmail('user1@example.com');
        $user1->setPlainPassword('$3CR3T');

        $user2 = new User();
        $user2->setEmail('user2@example.com');
        $user2->setPlainPassword('$3CR3T');

        $manager = self::$container->get('doctrine')->getManager();
        $manager->persist($user1);
        $manager->persist($user2);
        $manager->flush();

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user1@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $token = $response->toArray()['token'];
        // User is not admin and shouldn't be able to use this route
        $client->request('GET', '/users/' . $user2->getId(), ['auth_bearer' => $token]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testGetMe(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T');

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $json = $response->toArray();
        $client->request('GET', '/users/me', ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'test@example.com'
        ]);

        $user2 = $this->createUser('testUser2@example.com', '$3CR3T2');

        // retrieve a token
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

    public function testUpdateMyself(): void
    {
        $client = self::createClient();

        $this->createUser('test@example.com', '$3CR3T');

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);
        $json = $response->toArray();
        $response = $client->request('GET', '/users/me', ['auth_bearer' => $json['token']]);

        $id = $response->toArray()['id'];
        $this->assertNotNull($id);

        $client->request('PUT', '/users/' . $id, [
            'auth_bearer' => $json['token'],
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'monkeyTest@example.com'
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'id' => $id,
            'email' => 'monkeyTest@example.com'
        ]);
    }

    private function createUser(string $username, string $password, array $roles = []): User
    {
        $user = new User();
        $user->setEmail($username);
        $user->setPlainPassword($password);
        $user->setRoles($roles);

        $manager = self::$container->get('doctrine')->getManager();
        $manager->persist($user);
        $manager->flush();
        return $user;
    }

    public function testCreateUserHelper(): void
    {
        self::createClient();
        $user = $this->createUser('test@mail.fr', '$ecret');
        $this->assertEquals('test@mail.fr', $user->getEmail());
    }
}
