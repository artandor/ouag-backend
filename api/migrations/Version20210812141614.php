<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210812141614 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE gift_selected_libraries (gift_id INT NOT NULL, library_id INT NOT NULL, PRIMARY KEY(gift_id, library_id))');
        $this->addSql('CREATE INDEX IDX_E3DB4FEB97A95A83 ON gift_selected_libraries (gift_id)');
        $this->addSql('CREATE INDEX IDX_E3DB4FEBFE2541D7 ON gift_selected_libraries (library_id)');
        $this->addSql('ALTER TABLE gift_selected_libraries ADD CONSTRAINT FK_E3DB4FEB97A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift_selected_libraries ADD CONSTRAINT FK_E3DB4FEBFE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE gift_selected_libraries');
    }
}
