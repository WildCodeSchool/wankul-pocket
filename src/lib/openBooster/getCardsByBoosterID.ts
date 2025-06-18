import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";

export async function getCardsByBoosterId(
  boosterId: number
): Promise<CardsModel[]> {
  const [rows] = await db.query(`SELECT * FROM card WHERE booster_id = ?`, [
    boosterId,
  ]);
  return rows as CardsModel[];
}
