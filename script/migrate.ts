import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE \`${MYSQL_DB_NAME}\`;

CREATE TABLE IF NOT EXISTS profil_picture (
id INT PRIMARY KEY AUTO_INCREMENT,
image_path VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at DATE NOT NULL,
  bananas INT NOT NULL DEFAULT 10,
  profil_picture_id INT NOT NULL,
  profil_id VARCHAR(19) NOT NULL UNIQUE,
  FOREIGN KEY (profil_picture_id) REFERENCES profil_picture(id)
);

CREATE TABLE IF NOT EXISTS booster(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
  season INT NOT NULL,
  set_name VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS card (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    card_number INT NOT NULL,
    clan VARCHAR(50) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    drop_rate DECIMAL(4, 2) NOT NULL,
    official_rate DECIMAL(4, 2) NOT NULL,
    is_holo BOOLEAN DEFAULT FALSE,
    quote TEXT, 
    booster_id INT NOT NULL,
    FOREIGN KEY (booster_id) REFERENCES booster(id)
);

CREATE TABLE IF NOT EXISTS is_friend(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_profil_id VARCHAR(19) NOT NULL,
  friend_profil_id VARCHAR(19) NOT NULL,
  status BOOLEAN DEFAULT NULL, 
  acceptance BOOLEAN DEFAULT NULL,
  FOREIGN KEY (user_profil_id) REFERENCES user(profil_id),
  FOREIGN KEY (friend_profil_id) REFERENCES user(profil_id)
);

CREATE TABLE IF NOT EXISTS collection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (card_id) REFERENCES card(id),
    UNIQUE KEY unique_user_card (user_id, card_id)
);

CREATE TABLE IF NOT EXISTS quest(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  mission VARCHAR(255) NOT NULL,
  reward INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  goal_target INT,
  goal_quantity INT,
  quest_type ENUM('standard', 'daily', 'weekly', 'monthly', 'event', 'limited') NOT NULL DEFAULT 'standard'
);

CREATE TABLE IF NOT EXISTS completed_quests(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quest_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (quest_id) REFERENCES quest(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS exchange (
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_user_id INT NOT NULL,
    to_user_id INT NOT NULL,
    offered_card_id INT NOT NULL,
    requested_card_id INT NOT NULL,
    status BOOLEAN DEFAULT NULL, 
    acceptance BOOLEAN DEFAULT NULL,     
    FOREIGN KEY (from_user_id) REFERENCES user(id),
    FOREIGN KEY (to_user_id) REFERENCES user(id),
    FOREIGN KEY (offered_card_id) REFERENCES card(id),
    FOREIGN KEY (requested_card_id) REFERENCES card(id)
);
`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
