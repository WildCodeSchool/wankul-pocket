import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import path from "path";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const cardsPath = path.join(__dirname, "../src/data/wankulCards.json");
const cards = JSON.parse(fs.readFileSync(cardsPath, "utf-8"));

const boostersPath = path.join(__dirname, "../src/data/wankulBoosters.json");
const boosters = JSON.parse(fs.readFileSync(boostersPath, "utf-8"));

const questsPath = path.join(__dirname, "../src/data/wankulQuests.json");
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });
    await db.execute("SET FOREIGN_KEY_CHECKS = 0");
    await db.query("DELETE FROM card");
    await db.query("DELETE FROM booster");
    await db.query("DELETE FROM user");
    await db.query("DELETE FROM quest");
    await db.query("ALTER TABLE card AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE booster AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE user AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE quest AUTO_INCREMENT = 1");

    for (const { name, image, season, set_name } of boosters) {
      await db.query(
        "INSERT INTO booster (name, image, season, set_name) VALUES (?, ?, ?, ?)",
        [name, image, season, set_name]
      );
    }

    for (const {
      name,
      image_path,
      card_number,
      clan,
      rarity,
      drop_rate,
      official_rate,
      is_holo,
      quote,
      booster_id,
    } of cards) {
      await db.query(
        "INSERT INTO card (name, image_path, card_number, clan, rarity, drop_rate, official_rate, is_holo, quote, booster_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          image_path,
          card_number,
          clan,
          rarity,
          drop_rate,
          official_rate,
          is_holo,
          quote,
          booster_id,
        ]
      );
    }

    for (const {
      name,
      mission,
      reward,
      category,
      goal_target,
      goal_quantity,
      quest_type,
    } of quests) {
      await db.query(
        "INSERT INTO quest (name, mission, reward, category, goal_target, goal_quantity, quest_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          mission,
          reward,
          category,
          goal_target,
          goal_quantity,
          quest_type,
        ]
      );
    }

    await db.query("DELETE FROM profil_picture");
    await db.query("ALTER TABLE profil_picture AUTO_INCREMENT = 1");

    await db.query(`

  INSERT INTO profil_picture (image_path) VALUES
  ("perso1.png"),
  ("perso2.png"),
  ("perso3.png"),
  ("perso4.png"),   
  ("perso5.png"),
  ("perso6.png"),
  ("perso7.png"),
  ("perso8.png");
`);
    await db.execute("SET FOREIGN_KEY_CHECKS = 1");
    await db.end();
    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
