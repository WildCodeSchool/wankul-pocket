import { getOne } from "@/lib/collection/getCollection";
import { CardsModel } from "@/model/CardsModel";
import { db } from "@/lib/db";

export async function getCollection(user_id: number): Promise<CardsModel[]> {
  return getOne(user_id);
}

export async function addCardToCollection(
  userId: number,
  cardId: number
): Promise<void> {
  await db.query(
    `INSERT INTO collection (user_id, card_id, quantity)
     VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
    [userId, cardId]
  );
}
