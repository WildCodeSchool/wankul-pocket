import { getOne } from "@/lib/getCard";
import { getCards } from "@/lib/getCards";
import { CardsModel } from "@/model/CardsModel";

export async function getall() {
  return getCards();
}

export async function getOneById(id: number): Promise<CardsModel> {
  return getOne(id);
}
