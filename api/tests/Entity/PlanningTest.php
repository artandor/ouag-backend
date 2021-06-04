<?php

namespace App\Tests\Entity;

use App\Entity\Gift;
use App\Entity\Planning;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class PlanningTest extends KernelTestCase
{
    /**
     * @dataProvider giftPlanningProviderPositionTwo
     * @param Gift $gift
     * @param Planning $planning
     */
    public function testCalculatePlannedAtPositionZeroEqualsToDateStart(Gift $gift, Planning $planning)
    {
        $planning->setPosition(0);
        $this->assertEquals($gift->getStartAt()->format('d/m/y'), $planning->calculatePlannedAt()->format('d/m/y'));
    }

    /**
     * @dataProvider giftPlanningProviderPositionTwo
     */
    public function testCalculatePlannedAtPositionTwoIsCorrect(Gift $gift, Planning $planning)
    {
        $planning->setPosition(2);
        $this->assertEquals('06/06/21', $planning->calculatePlannedAt()->format('d/m/y'));
    }

    /**
     * @dataProvider giftPlanningProviderPositionTwo
     */
    public function testCalculatePlannedAtPositionTwoAndRecurrenceFourIsCorrect(Gift $gift, Planning $planning)
    {
        $planning->setPosition(2);
        $gift->setRecurrence(4);
        $this->assertEquals('12/06/21', $planning->calculatePlannedAt()->format('d/m/y'));
    }

    public function giftPlanningProviderPositionTwo(): array
    {
        $date = new DateTime();
        $date->setDate('2021', '06', '04');

        $gift = new Gift();
        $gift->setStartAt($date);
        $gift->setRecurrence(1);

        $planning = new Planning();
        $planning->setGift($gift);
        return [
            'recurrence_1' => [$gift, $planning],
        ];
    }
}
