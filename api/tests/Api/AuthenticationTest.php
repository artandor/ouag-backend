<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Library;
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

    public function testCreateUser(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'displayName' => 'michel',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'myuser@example.com',
            'displayName' => 'michel',
        ]);
        $this->assertNotNull(static::$container->get('doctrine')->getRepository(Library::class)
            ->findOneBy(['name' => 'michel']));

        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'displayName' => 'michel2',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            "@context" => "/contexts/ConstraintViolationList",
            "hydra:description" => "email: This value is already used.",
        ]);
    }

    public function testCreateUserSendsEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'displayName' => 'michel',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHeaderSame($email, 'To', 'myuser@example.com');
        $this->assertEmailHtmlBodyContains($email, 'href="http');
        $this->assertEmailHtmlBodyContains($email, 'id=');
    }

    public function testCreateUserWithUsernameAlreadyTaken(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser2@example.com',
                'displayName' => 'awtandow',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
    }

    public function testCreateUserInvalidEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'invalidemail',
                'displayName' => '123soleim',
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

        $iri = $this->findIriBy(User::class, ['email' => 'second.user@example.com']);

        $client->request('DELETE', $iri);
        $this->assertResponseStatusCodeSame(405);

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'admin@example.com',
                'password' => 'seCrEt',
            ],
        ]);

        $token = $response->toArray()['token'];
        $client->request('DELETE', $iri, ['auth_bearer' => $token]);
        $this->assertResponseStatusCodeSame(405);

    }

    public function testUserAccessListOfUserAsUser(): void
    {
        $client = self::createClient();

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'password' => 'seCrEt',
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

        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'admin@example.com',
                'password' => 'seCrEt',
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
        $user1->setDisplayName('Marcel1');

        $user2 = new User();
        $user2->setEmail('user2@example.com');
        $user2->setPlainPassword('$3CR3T');
        $user2->setDisplayName('Marcel2');


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
