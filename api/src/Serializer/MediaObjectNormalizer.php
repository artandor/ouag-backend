<?php
// api/src/Serializer/MediaObjectNormalizer.php

namespace App\Serializer;

use App\Entity\MediaObject;
use ArrayObject;
use AsyncAws\S3\Input\GetObjectRequest;
use AsyncAws\S3\S3Client;
use DateTimeImmutable;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

final class MediaObjectNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'MEDIA_OBJECT_NORMALIZER_ALREADY_CALLED';

    public function __construct(private StorageInterface $storage, private S3Client $s3Client)
    {
    }

    /**
     * @param mixed $object
     * @param string|null $format
     * @param array<string> $context
     * @return array[]|string|int|float|bool|ArrayObject|null
     * @throws ExceptionInterface
     */
    public function normalize($object, ?string $format = null, array $context = []): array|string|int|float|bool|ArrayObject|null
    {
        $context[self::ALREADY_CALLED] = true;

        if (null != $object->getSize()) {

            $commandContentUrl = new GetObjectRequest([
                'Bucket' => $_ENV['AWS_S3_BUCKET_NAME'],
                'Key' => 'media/' . $object->getLibrary()->getId() . '/' . $object->getContent(),
            ]);

            $object->setContent($this->s3Client->presign($commandContentUrl, new DateTimeImmutable('+20 minute')));
        }

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof MediaObject;
    }
}
