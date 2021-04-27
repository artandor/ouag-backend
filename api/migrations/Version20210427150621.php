<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210427150621 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add Animation Entity to associate later to gifts.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE animation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE animation (id INT NOT NULL, name VARCHAR(255) NOT NULL, lottie_link VARCHAR(255) NOT NULL, enabled BOOLEAN NOT NULL, PRIMARY KEY(id))');
    }

    public function postUp(Schema $schema): void
    {
        parent::postUp($schema);
        $this->connection->insert('animation', ['id' => 1, 'name' => 'Firework', 'lottie_link' => 'https://lottiefiles.com/3287-fireworks', 'enabled' => true]);
        $this->connection->insert('animation', ['id' => 2, 'name' => 'Confettis', 'lottie_link' => 'https://lottiefiles.com/32585-fireworks-display', 'enabled' => true]);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE animation_id_seq CASCADE');
        $this->addSql('DROP TABLE animation');
    }
}
