<?php

namespace App\Tests;

use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class PlanningTest extends CustomApiTestCase
{
    use RefreshDatabaseTrait;

    public function testCreatePlanning(): void
    {

    }

    public function testDeleteAPlannedMediaShouldDeleteLinkedPlanningMedia(): void
    {

    }

    public function testUpdateMediaOfPlanning(): void
    {

    }

    public function testDeletePlanning(): void
    {
        // If we use mediaAmount as a base to generate planning, we shouldn't be able to delete plannings.
    }
}
