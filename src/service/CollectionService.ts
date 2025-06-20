import { getOne } from "@/lib/collection/getCollection";
import { CardsModel } from "@/model/CardsModel";
import { db } from "@/lib/db";
import { addToCollection } from "@/lib/openBooster/addToCollection";

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

export async function addCardsToCollection(
  emailId: string,
  cards: CardsModel[]
): Promise<void> {
  const cardIds = cards.map((card) => card.id);
  await addToCollection(emailId, cardIds);
}
