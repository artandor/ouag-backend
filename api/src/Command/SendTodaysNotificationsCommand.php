<?php

namespace App\Command;

use App\Entity\PushSubscription;
use App\Repository\PlanningRepository;
use App\Repository\PushSubscriptionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class SendTodaysNotificationsCommand extends Command
{
    protected static $defaultName = 'app:send-todays-notifications';
    protected static string $defaultDescription = 'Retrieve medias that became available today and send push notifications to concerned devices.';

    public function __construct(private PlanningRepository $planningRepository, private PushSubscriptionRepository $pushSubscriptionRepository,
                                private EntityManagerInterface $em)
    {
        parent::__construct(self::$defaultName);
    }

    protected function configure(): void
    {
        $this
            ->setDescription(self::$defaultDescription);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        try {
            $webPush = new WebPush([
                'VAPID' => [
                    'subject' => 'mailto:support@once-upon-a-gift.com',
                    'publicKey' => $_ENV['VAPID_PUBLIC_KEY'],
                    'privateKey' => $_ENV['VAPID_PRIVATE_KEY'],
                ],
            ]);


        $planningsOfTheDay = $this->planningRepository->findPlanningsOfTheDayWithMedias();
        $notificationCount = 0;
        foreach ($planningsOfTheDay as $planning) {
            foreach ($planning->getGift()->getReceivers() as $receiver) {
                foreach ($receiver->getPushSubscriptions() as $target) {
                    $webPush->queueNotification(
                        Subscription::create([
                            'endpoint' => $target->getEndpoint(),
                            'publicKey' => $target->getPublicKey(),
                            'authToken' => $target->getAuthToken(),
                        ]),
                        json_encode([
                            'title' => "New media available in OUAG !",
                            'message' => "There's something new in " . $planning->getGift()->getName() . " ! See it now !",
                            'gift_id' => $planning->getGift()->getId()
                        ])
                    );
                }

                foreach ($webPush->flush() as $report) {
                    if ($report->isSuccess()) {
                        $notificationCount++;
                    } else {
                        $io->error("[x] {$report->getResponse()->getStatusCode()} HTTP Response received. Removing from subscribed browsers.");

                        $brokenSub = $this->pushSubscriptionRepository->findOneBy(['endpoint' => $report->getEndpoint()]);
                        $this->em->remove($brokenSub);
                        $this->em->flush();
                    }
                }
            }
        }

        $io->success(date("Y-m-d H:i:s") . ' Successfully sent ' . $notificationCount . ' notifications.');
        } catch (\ErrorException $e) {
            $io->error("An error occured while sending notifications : {$e->getMessage()}");
        }
        return Command::SUCCESS;
    }
}
