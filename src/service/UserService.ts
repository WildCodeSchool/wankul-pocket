import { deleteUser } from "@/lib/user/deleteUser";
import { getOne } from "@/lib/user/getUser";
import { getUsers } from "@/lib/user/getUsers";
import { patchUser } from "@/lib/user/patchUser";
import { UserModel } from "@/model/UserModel";
import { db } from "@/lib/db";
import { updateProfilPicture } from "@/lib/user/updateProfilPic";

export async function getall() {
  return getUsers();
}

export async function getOneById(email: string): Promise<UserModel> {
  return getOne(email);
}

export async function deleteOne(id: number) {
  return deleteUser(id);
}

export async function editOne(user: UserModel): Promise<{ message: string }> {
  return patchUser(user);
}

export async function getUserIdByEmail(email: string): Promise<number | null> {
  const [rows] = await db.query(`SELECT id FROM user WHERE email = ?`, [email]);
  const result = rows as { id: number }[];
  if (!Array.isArray(result) || result.length === 0) {
    return null;
  }
  return result[0].id;
}

// EVERYTHING THAT'S RELATED TO USER BANANAS //

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
export async function updateUserProfilePicture({
  email,
  profil_picture_id,
}: {
  email: string;
  profil_picture_id: number;
}) {
  try {
    await updateProfilPicture({ email, profil_picture_id });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avatar :", error);
    throw new Error("Impossible de mettre à jour l'avatar de l'utilisateur.");
  }
}
