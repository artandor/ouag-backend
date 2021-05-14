<?php


namespace App\EventSubscriber;


use App\Entity\MediaObject;
use App\Message\RemoveMediaObjectImageMessage;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Vich\UploaderBundle\Event\Event;
use Vich\UploaderBundle\Event\Events;

/**
 * Source : https://github.com/dustin10/VichUploaderBundle/blob/master/docs/events/howto/remove_files_asynchronously.md
 */
class RemoveFileEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private MessageBusInterface $messageBus)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::PRE_REMOVE => ['onPreRemove'],
        ];
    }

    public function onPreRemove(Event $event): void
    {
        $mapping = $event->getMapping();
        $mappingName = $mapping->getMappingName();

        if ('media_object' === $mappingName) {
            $this->dispatch($event);
        }
    }

    private function dispatch(Event $event): void
    {
        $messageClass = RemoveMediaObjectImageMessage::class;
        $event->cancel();

        /** @var MediaObject $media */
        $media = $event->getObject();
        if (null == $media->getSize()) {
            return;
        }

        $filename = $media->getLibrary()->getId() . DIRECTORY_SEPARATOR . $media->getContent();

        $message = new $messageClass($filename);
        $this->messageBus->dispatch($message);
    }
}
