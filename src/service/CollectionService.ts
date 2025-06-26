import { getOne } from "@/lib/collection/getUserCollection";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { CardsModel } from "@/model/CardsModel";

interface GetOneOptions {
  rarity?: string;
}

export async function getCollection(
  email: string,
  options: GetOneOptions = {}
): Promise<CardsModel[]> {
  return getOne(email, options);
}

export async function addCardsToCollection(
  emailId: string,
  cards: CardsModel[]
): Promise<void> {
  const cardIds = cards.map((card) => card.id);
  await addToCollection(emailId, cardIds);
}
