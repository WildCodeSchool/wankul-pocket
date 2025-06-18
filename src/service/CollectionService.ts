import { getOne } from "@/lib/collection/getCollection";
import { CardsModel } from "@/model/CardsModel";

export async function getCollection(user_id: number): Promise<CardsModel[]> {
  return getOne(user_id);
}
