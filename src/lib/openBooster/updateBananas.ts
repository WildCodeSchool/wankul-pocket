import { db } from "@/lib/db";

export async function updateUserBananas(userId: number, bananasCost: number) {
  return db.query(`UPDATE user SET bananas = bananas - ? WHERE id = ?`, [
    bananasCost,
    userId,
  ]);
}
