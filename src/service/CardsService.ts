import { getOne } from "@/lib/getCard";
import { getCards } from "@/lib/getCards";
import { CardsModel } from "@/model/CardsModel";
import { db } from "@/lib/db";

export async function getAll(): Promise<CardsModel[]> {
  return getCards();
}

export async function getOneById(id: number): Promise<CardsModel> {
  return getOne(id);
}

export async function getCardsByBoosterId(
  boosterId: number
): Promise<CardsModel[]> {
  const [rows] = await db.query(`SELECT * FROM card WHERE booster_id = ?`, [
    boosterId,
  ]);
  return rows as CardsModel[];
}
