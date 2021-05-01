<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210501152015 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add libraries and media objects.';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE library_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE library (id INT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A18098BC7E3C61F9 ON library (owner_id)');
        $this->addSql('CREATE TABLE library_user (library_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(library_id, user_id))');
        $this->addSql('CREATE INDEX IDX_2B5C1C24FE2541D7 ON library_user (library_id)');
        $this->addSql('CREATE INDEX IDX_2B5C1C24A76ED395 ON library_user (user_id)');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, owner_id INT NOT NULL, library_id INT NOT NULL, title VARCHAR(255) DEFAULT NULL, nsfw BOOLEAN NOT NULL, comment VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL, size BIGINT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_14D431327E3C61F9 ON media_object (owner_id)');
        $this->addSql('CREATE INDEX IDX_14D43132FE2541D7 ON media_object (library_id)');
        $this->addSql('ALTER TABLE library ADD CONSTRAINT FK_A18098BC7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE library_user ADD CONSTRAINT FK_2B5C1C24FE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE library_user ADD CONSTRAINT FK_2B5C1C24A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D431327E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D43132FE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE library_user DROP CONSTRAINT FK_2B5C1C24FE2541D7');
        $this->addSql('ALTER TABLE media_object DROP CONSTRAINT FK_14D43132FE2541D7');
        $this->addSql('DROP SEQUENCE library_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP TABLE library');
        $this->addSql('DROP TABLE library_user');
        $this->addSql('DROP TABLE media_object');
    }
}
