<?php

namespace App\Message;

final class RemoveMediaObjectImageMessage
{
    public function __construct(private string $filename)
    {
    }

    public function getFilename(): string
    {
        return $this->filename;
    }
}
