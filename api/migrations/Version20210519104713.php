<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210519104713 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename relations to user with relevant names, add gifts and plannings.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE gift_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE planning_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE gift (id INT NOT NULL, default_animation_id INT DEFAULT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, start_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, recurrence INT NOT NULL, media_amount INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A47C990D1A8E81D4 ON gift (default_animation_id)');
        $this->addSql('CREATE INDEX IDX_A47C990D7E3C61F9 ON gift (owner_id)');
        $this->addSql('CREATE TABLE gift_receiver_users (gift_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(gift_id, user_id))');
        $this->addSql('CREATE INDEX IDX_E5B9B85B97A95A83 ON gift_receiver_users (gift_id)');
        $this->addSql('CREATE INDEX IDX_E5B9B85BA76ED395 ON gift_receiver_users (user_id)');
        $this->addSql('CREATE TABLE library_sharedWith_users (library_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(library_id, user_id))');
        $this->addSql('CREATE INDEX IDX_F3E7F440FE2541D7 ON library_sharedWith_users (library_id)');
        $this->addSql('CREATE INDEX IDX_F3E7F440A76ED395 ON library_sharedWith_users (user_id)');
        $this->addSql('CREATE TABLE planning (id INT NOT NULL, media_id INT DEFAULT NULL, animation_id INT DEFAULT NULL, gift_id INT NOT NULL, position INT NOT NULL, planned_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D499BFF6EA9FDD75 ON planning (media_id)');
        $this->addSql('CREATE INDEX IDX_D499BFF63858647E ON planning (animation_id)');
        $this->addSql('CREATE INDEX IDX_D499BFF697A95A83 ON planning (gift_id)');
        $this->addSql('CREATE INDEX date_planned_idx ON planning (planned_at)');
        $this->addSql('CREATE UNIQUE INDEX id_position ON planning (gift_id, position)');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D1A8E81D4 FOREIGN KEY (default_animation_id) REFERENCES animation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift_receiver_users ADD CONSTRAINT FK_E5B9B85B97A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE gift_receiver_users ADD CONSTRAINT FK_E5B9B85BA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE library_sharedWith_users ADD CONSTRAINT FK_F3E7F440FE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE library_sharedWith_users ADD CONSTRAINT FK_F3E7F440A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning ADD CONSTRAINT FK_D499BFF6EA9FDD75 FOREIGN KEY (media_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning ADD CONSTRAINT FK_D499BFF63858647E FOREIGN KEY (animation_id) REFERENCES animation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE planning ADD CONSTRAINT FK_D499BFF697A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE library_user');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE gift_receiver_users DROP CONSTRAINT FK_E5B9B85B97A95A83');
        $this->addSql('ALTER TABLE planning DROP CONSTRAINT FK_D499BFF697A95A83');
        $this->addSql('DROP SEQUENCE gift_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE planning_id_seq CASCADE');
        $this->addSql('CREATE TABLE library_user (library_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(library_id, user_id))');
        $this->addSql('CREATE INDEX idx_2b5c1c24a76ed395 ON library_user (user_id)');
        $this->addSql('CREATE INDEX idx_2b5c1c24fe2541d7 ON library_user (library_id)');
        $this->addSql('ALTER TABLE library_user ADD CONSTRAINT fk_2b5c1c24fe2541d7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE library_user ADD CONSTRAINT fk_2b5c1c24a76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE gift');
        $this->addSql('DROP TABLE gift_receiver_users');
        $this->addSql('DROP TABLE library_sharedWith_users');
        $this->addSql('DROP TABLE planning');
    }
}
