import { deleteUser } from "@/lib/user/deleteUser";
import { getOne } from "@/lib/user/getUser";
import { getUsers } from "@/lib/user/getUsers";
import { patchUser } from "@/lib/user/patchUser";
import { UserModel } from "@/model/UserModel";
import { db } from "@/lib/db";

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

export async function updateUserBananas(
  userId: number,
  bananasCost: number
): Promise<void> {
  await db.query(`UPDATE user SET bananas = bananas - ? WHERE id = ?`, [
    bananasCost,
    userId,
  ]);
}

export async function getUserIdByEmail(email: string): Promise<number | null> {
  const [rows] = await db.query(`SELECT id FROM user WHERE email = ?`, [email]);
  const result = rows as { id: number }[];
  if (!Array.isArray(result) || result.length === 0) {
    return null;
  }
  return result[0].id;
}
