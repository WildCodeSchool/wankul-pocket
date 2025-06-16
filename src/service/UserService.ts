import { addUser } from "@/lib/user/addUser";
import { deleteUser } from "@/lib/user/deleteUser";
import { getOne } from "@/lib/user/getUser";
import { getUsers } from "@/lib/user/getUsers";
import { patchUser } from "@/lib/user/patchUser";
import { UserModel } from "@/model/UserModel";

export async function getall() {
  return getUsers();
}

export async function getOneById(email: string): Promise<UserModel> {
  return getOne(email);
}

export async function deleteOne(id: number) {
  return deleteUser(id);
}

export async function addOne(user: Omit<UserModel, "id">) {
  return addUser(user);
}

export async function editOne(user: UserModel): Promise<{ message: string }> {
  return patchUser(user);
}
