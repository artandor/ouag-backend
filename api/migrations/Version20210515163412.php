<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210515163412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE gift_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE planning_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE planning_media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE gift (id INT NOT NULL, default_animation_id INT DEFAULT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, start_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, recurrence INT NOT NULL, media_amount INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A47C990D1A8E81D4 ON gift (default_animation_id)');
        $this->addSql('CREATE INDEX IDX_A47C990D7E3C61F9 ON gift (owner_id)');
        $this->addSql('CREATE TABLE gift_user (gift_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(gift_id, user_id))');
        $this->addSql('CREATE INDEX IDX_7FEE241497A95A83 ON gift_user (gift_id)');
        $this->addSql('CREATE INDEX IDX_7FEE2414A76ED395 ON gift_user (user_id)');
        $this->addSql('CREATE TABLE planning (id INT NOT NULL, gift_id INT NOT NULL, position INT NOT NULL, planned_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D499BFF697A95A83 ON planning (gift_id)');
        $this->addSql('CREATE INDEX date_planned_idx ON planning (planned_at)');
        $this->addSql('CREATE UNIQUE INDEX id_position ON planning (gift_id, position)');
        $this->addSql('CREATE TABLE planning_media_object (id INT NOT NULL, media_id INT DEFAULT NULL, planning_id INT NOT NULL, animation_id INT DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_62EF3A2EA9FDD75 ON planning_media_object (media_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_62EF3A23D865311 ON planning_media_object (planning_id)');
        $this->addSql('CREATE INDEX IDX_62EF3A23858647E ON planning_media_object (animation_id)');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D1A8E81D4 FOREIGN KEY (default_animation_id) REFERENCES animation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift_user ADD CONSTRAINT FK_7FEE241497A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift_user ADD CONSTRAINT FK_7FEE2414A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning ADD CONSTRAINT FK_D499BFF697A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning_media_object ADD CONSTRAINT FK_62EF3A2EA9FDD75 FOREIGN KEY (media_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning_media_object ADD CONSTRAINT FK_62EF3A23D865311 FOREIGN KEY (planning_id) REFERENCES planning (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning_media_object ADD CONSTRAINT FK_62EF3A23858647E FOREIGN KEY (animation_id) REFERENCES animation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE gift_user DROP CONSTRAINT FK_7FEE241497A95A83');
        $this->addSql('ALTER TABLE planning DROP CONSTRAINT FK_D499BFF697A95A83');
        $this->addSql('ALTER TABLE planning_media_object DROP CONSTRAINT FK_62EF3A23D865311');
        $this->addSql('DROP SEQUENCE gift_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE planning_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE planning_media_object_id_seq CASCADE');
        $this->addSql('DROP TABLE gift');
        $this->addSql('DROP TABLE gift_user');
        $this->addSql('DROP TABLE planning');
        $this->addSql('DROP TABLE planning_media_object');
    }
}
