import { db } from "@/lib/db";

export async function addCardToCollection(userId: number, cardId: number) {
  return db.query(
    `INSERT INTO collection (user_id, card_id, quantity)
     VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
    [userId, cardId]
  );
}
