import { getOne } from "@/lib/collection/getUserCollection";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { CardsModel } from "@/model/CardsModel";
import { GetOneOption } from "@/model/GetOneOptionModel";

export async function getCollection(
  email: string,
  option: GetOneOption = {}
): Promise<CardsModel[]> {
  return getOne(email, option);
}

export async function addCardsToCollection(
  emailId: string,
  cards: CardsModel[]
): Promise<void> {
  const cardIds = cards.map((card) => card.id);
  await addToCollection(emailId, cardIds);
}
