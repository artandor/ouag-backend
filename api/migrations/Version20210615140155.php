<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210615140155 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add new column filling_method to gift TABLE';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE gift ADD filling_method VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE gift DROP filling_method');
    }
}
