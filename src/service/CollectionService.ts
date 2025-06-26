import { getOne } from "@/lib/collection/getUserCollection";
import { CardsModel } from "@/model/CardsModel";
import { db } from "@/lib/db";
import { addToCollection } from "@/lib/openBooster/addToCollection";

export async function getCollection(user_id: number): Promise<CardsModel[]> {
  return getOne(user_id);
}

export async function addCardsToCollection(
  emailId: string,
  cards: CardsModel[]
): Promise<void> {
  const cardIds = cards.map((card) => card.id);
  await addToCollection(emailId, cardIds);
}
