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

    /**
     * @throws FilesystemException
     */
    public function __invoke(RemoveMediaObjectImageMessage $message)
    {
        $filename = $message->getFilename();

        $this->mediaStorage->delete($filename);
    }
}
