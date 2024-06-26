<?php


namespace App\Controller;


use App\Entity\Library;
use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\Security\Core\Security;

final class CreateMediaObjectAction
{
    public function __construct(private Security $security)
    {
    }

    public function __invoke(Library $data, Request $request): MediaObject
    {
        if (!$this->security->getUser()) {
            throw new UnauthorizedHttpException('', 'You need to be logged in.');
        }
        /** @var UploadedFile $file */
        $file = $request->files->get('file');
        $textContent = $request->request->get('content');
        if ($file == null && $textContent == null) {
            throw new UnprocessableEntityHttpException('Either "file" or "content is required."');
        } elseif ($file != null && $textContent != null) {
            throw new UnprocessableEntityHttpException('Only one of "file" or "content is supported."');
        }

        $mediaObject = new MediaObject();
        $mediaObject->setTitle($request->request->get('title'));
        $mediaObject->setComment($request->request->get('comment'));
        $mediaObject->setLibrary($data);
        $mediaObject->setNsfw($request->request->get('nsfw', 'false') === 'true');

        if ($file != null) {
            $mediaObject->file = $file;
            $mediaObject->setSize(strval($file->getSize()));
            $mediaObject->setType($file->getMimeType());
        } else {
            $mediaObject->setContent($textContent);
            if (filter_var($textContent, FILTER_VALIDATE_URL) === false) {
                $mediaObject->setType('text/plain');
            } else {
                $mediaObject->setType('text/link');
            }
        }
        return $mediaObject;
    }
}
