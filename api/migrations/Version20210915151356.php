<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210915151356 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add push notifications and their subscriptions';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE push_subscription_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE push_subscription (id INT NOT NULL, subscribed_user_id INT NOT NULL, endpoint TEXT NOT NULL, public_key TEXT NOT NULL, auth_token TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_562830F36A3D54E9 ON push_subscription (subscribed_user_id)');
        $this->addSql('COMMENT ON COLUMN push_subscription.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE push_subscription ADD CONSTRAINT FK_562830F36A3D54E9 FOREIGN KEY (subscribed_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP SEQUENCE push_subscription_id_seq CASCADE');
        $this->addSql('DROP TABLE push_subscription');
    }
}
