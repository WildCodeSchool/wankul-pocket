import { getOne } from "@/lib/collection/getUserCollection";
import { db } from "@/lib/db";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { CardsModel } from "@/model/CardsModel";

export async function getCollection(email: string): Promise<CardsModel[]> {
  return getOne(email);
}

export async function addCardsToCollection(
  emailId: string,
  cards: CardsModel[]
): Promise<void> {
  const cardIds = cards.map((card) => card.id);
  await addToCollection(emailId, cardIds);
}
