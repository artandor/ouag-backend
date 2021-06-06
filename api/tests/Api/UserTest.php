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
        $iri = $this->findIriBy(User::class, ['email' => 'second.user@example.com']);

        self::createClient()->request('DELETE', $iri);
        $this->assertResponseStatusCodeSame(405);

        self::createClientWithCredentials($this->getToken([
            'email' => 'admin@example.com',
            'password' => 'seCrEt',
        ]))->request('DELETE', $iri);
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

    public function testCreatingUserSendsEmail(): void
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
        $this->assertEmailHtmlBodyContains($email, 'Welcome');
    }

    public function testUserWithNoPreferredLanguageGetEnglishEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myrandomuser@example.com',
                'displayName' => 'mockito',
                'plainPassword' => '$3CR3T',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'Once your account is activated, you\'ll be able to enjoy the features OUAG has to offer.');
    }

    public function testUserWithFrenchPreferredLanguageGetFrenchEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myfrenchuser@example.com',
                'displayName' => 'michel',
                'plainPassword' => '$3CR3T',
                'preferredLanguage' => 'fr',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'Une fois votre compte activé, vous pourrez profitez des fonctionnalités que OUAG a à vous offrir.');
    }

    public function testUserWithEnglishPreferredLanguageGetEnglishEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myenglishuser@example.com',
                'displayName' => 'mickael',
                'plainPassword' => '$3CR3T',
                'preferredLanguage' => 'en',
            ],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'Once your account is activated, you\'ll be able to enjoy the features OUAG has to offer.');

    }

    public function testUserWithOtherPreferredLanguageGetEnglishEmail(): void
    {
        $client = self::createClient();
        $client->request('POST', '/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'myenglishuser@example.com',
                'displayName' => 'mickael',
                'plainPassword' => '$3CR3T',
                'preferredLanguage' => 'yolo',
            ],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertQueuedEmailCount(1);
        $email = $this->getMailerMessage(0);
        $this->assertEmailHtmlBodyContains($email, 'Once your account is activated, you\'ll be able to enjoy the features OUAG has to offer.');

    }
}
