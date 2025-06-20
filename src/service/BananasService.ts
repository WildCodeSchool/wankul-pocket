import { db } from "@/lib/db";

export async function getUserBananas(userId: number): Promise<number> {
  try {
    const result = await db.query(`SELECT bananas FROM user WHERE id = ?`, [
      userId,
    ]);
    const rows = Array.isArray(result[0]) ? result[0] : (result as any[]);

    if (rows.length === 0) {
      throw new Error("Utilisateur introuvable.");
    }

    return rows[0].bananas;
  } catch (error) {
    console.error("Erreur lors de la récupération des bananes :", error);
    throw new Error("Impossible de récupérer les bananes de l'utilisateur.");
  }
}

export async function checkBananas(
  userId: number,
  cost: number
): Promise<boolean> {
  try {
    const currentBananas = await getUserBananas(userId);

    if (currentBananas >= cost) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erreur lors de la vérification des bananes :", error);
    throw new Error("Impossible de vérifier les bananes de l'utilisateur.");
  }
}

export async function deductBananas(
  userId: number,
  cost: number
): Promise<void> {
  const hasEnoughBananas = await checkBananas(userId, cost);

  if (!hasEnoughBananas) {
    throw new Error("Pas assez de bananes pour effectuer cette action.");
  }

  try {
    await db.query(`UPDATE user SET bananas = bananas - ? WHERE id = ?`, [
      cost,
      userId,
    ]);
  } catch (error) {
    console.error("Erreur lors de la déduction des bananes :", error);
    throw new Error("Impossible de déduire les bananes de l'utilisateur.");
  }
}
