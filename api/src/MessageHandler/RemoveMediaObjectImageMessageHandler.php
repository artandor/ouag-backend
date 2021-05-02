<?php

namespace App\MessageHandler;

use App\Message\RemoveMediaObjectImageMessage;
use League\Flysystem\FilesystemException;
use League\Flysystem\FilesystemOperator;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class RemoveMediaObjectImageMessageHandler implements MessageHandlerInterface
{
    public function __construct(private FilesystemOperator $mediaStorage)
    {
    }

    public function __invoke(RemoveMediaObjectImageMessage $message)
    {
        $filename = $message->getFilename();

        try {
            $this->mediaStorage->delete($filename);
        } catch (FilesystemException $e) {
            dump($e);
        }
    }
}
