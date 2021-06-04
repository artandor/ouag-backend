<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210601145757 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add invites to gift.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE gift_invite_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE gift_invite (id INT NOT NULL, gift_id INT NOT NULL, email VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL, creator_nickname VARCHAR(255) DEFAULT NULL, receiver_nickname VARCHAR(255) DEFAULT NULL, comment TEXT DEFAULT NULL, claimed BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9B44528397A95A83 ON gift_invite (gift_id)');
        $this->addSql('ALTER TABLE gift_invite ADD CONSTRAINT FK_9B44528397A95A83 FOREIGN KEY (gift_id) REFERENCES gift (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP SEQUENCE gift_invite_id_seq CASCADE');
        $this->addSql('DROP TABLE gift_invite');
    }
}
