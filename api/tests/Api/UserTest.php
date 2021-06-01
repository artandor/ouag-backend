<?php


namespace App\Tests\Api;


use App\Entity\Library;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class UserTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

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

        // Assert that user has a library by default
        $this->assertNotNull(static::$container->get('doctrine')->getRepository(Library::class)
            ->findOneBy(['name' => 'michel']));
    }

    public function testCreateUserWithEmailAlreadyTaken()
    {
        self::createClient()->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'user@example.com',
                'displayName' => 'Martin',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            "@context" => "/contexts/ConstraintViolationList",
            "hydra:description" => "email: This value is already used.",
        ]);
    }

    public function testCreateUserWithDisplayNameAlreadyTaken()
    {
        self::createClient()->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myuser@example.com',
                'displayName' => 'awtandow',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            "@context" => "/contexts/ConstraintViolationList",
            "hydra:description" => "displayName: This value is already used.",
        ]);
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
        $client = self::createClientWithCredentials();

        // User is not admin and shouldn't be able to use this route
        $client->request('GET', '/users');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUserAccessListOfUserAsAdmin(): void
    {
        $client = self::createClientWithCredentials($this->getToken([
            'email' => 'admin@example.com',
            'password' => 'seCrEt',
        ]));

        // User is not admin and shouldn't be able to use this route
        $client->request('GET', '/users');
        $this->assertResponseStatusCodeSame(200);
    }

    public function testUserAccessAnotherUserAsUser(): void
    {
        $client = self::createClientWithCredentials();

        $user2iri = $this->findIriBy(User::class, ['email' => 'second.user@example.com']);
        // User is not admin and shouldn't be able to use this route
        $client->request('GET', $user2iri);
        $this->assertResponseStatusCodeSame(403);
    }


    public function testUpdateMyself(): void
    {
        $client = self::createClientWithCredentials();

        $userIri = $this->findIriBy(User::class, ['email' => 'user@example.com']);

        $client->request('PUT', $userIri, [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'monkeyTest@example.com'
            ]
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            'email' => 'monkeyTest@example.com'
        ]);
    }

}
