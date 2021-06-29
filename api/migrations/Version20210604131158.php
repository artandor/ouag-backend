<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210604131158 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add state field to gift in order to implement workflows.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE gift ADD state VARCHAR(100) DEFAULT \'draft\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE gift DROP state');
    }
}
