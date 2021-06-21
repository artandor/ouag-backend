<?php
declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model;
use ApiPlatform\Core\OpenApi\OpenApi;
use ArrayObject;

final class JwtDecorator implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    /**
     * @param array<string> $context
     */
    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas['Token'] = new ArrayObject([
            'type' => 'object',
            'properties' => [
                'token' => [
                    'type' => 'string',
                    'readOnly' => true,
                ],
                'refresh_token' => [
                    'type' => 'string',
                    'readOnly' => true,
                ],
            ],
        ]);
        $schemas['Credentials'] = new ArrayObject([
            'type' => 'object',
            'properties' => [
                'email' => [
                    'type' => 'string',
                    'example' => 'user@example.com',
                ],
                'password' => [
                    'type' => 'string',
                    'example' => 'seCrEt',
                ],
            ],
        ]);

        $pathItem = new Model\PathItem(
            ref: 'JWT Token',
            post: new Model\Operation(
            operationId: 'postCredentialsItem',
            tags: ['Token'],
            responses: [
            '200' => [
                'description' => 'Get JWT token',
                'content' => [
                    'application/json' => [
                        'schema' => [
                            '$ref' => '#/components/schemas/Token',
                        ],
                    ],
                ],
            ],
        ],
            summary: 'Get JWT token to login.',
            requestBody: new Model\RequestBody(
            description: 'Generate new JWT Token',
            content: new ArrayObject([
            'application/json' => [
                'schema' => [
                    '$ref' => '#/components/schemas/Credentials',
                ],
            ],
        ]),
        ),
        ),
        );
        $openApi->getPaths()->addPath('/authentication_token', $pathItem);

        $schemas['TokenRefresh'] = new ArrayObject([
            'type' => 'object',
            'properties' => [
                'refresh_token' => [
                    'type' => 'string',
                    'example' => 'ad1a8018bf8bdf117e7b1b08d0b235edc2115257bf29efd13408a0ca9fc0b62daa148640f528c055d09017cdd76cc4159c88544b889d56f8b0b4edd9f8c15b0b',
                ],
            ],
        ]);

        $pathItem = new Model\PathItem(
            ref: 'JWT Token',
            post: new Model\Operation(
            operationId: 'postRefreshTokenItem',
            tags: ['Token'],
            responses: [
            '200' => [
                'description' => 'Get JWT token from refresh_token',
                'content' => [
                    'application/json' => [
                        'schema' => [
                            '$ref' => '#/components/schemas/Token',
                        ],
                    ],
                ],
            ],
        ],
            summary: 'Request a new JWT Token from a refresh token.',
            requestBody: new Model\RequestBody(
            description: 'Request a new JWT Token from a refresh token (without user credentials).',
            content: new ArrayObject([
            'application/json' => [
                'schema' => [
                    '$ref' => '#/components/schemas/TokenRefresh',
                ],
            ],
        ]),
        ),
        ),
        );
        $openApi->getPaths()->addPath('/authentication_token/refresh', $pathItem);

        return $openApi;
    }
}
