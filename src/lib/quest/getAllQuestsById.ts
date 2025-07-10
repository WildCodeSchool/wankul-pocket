import { questMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { UserModel } from "@/model/UserModel";

export async function getAllQuestsById(user: UserModel) {
  const res = await fetch(`${apiRoutes.QUESTS_BY_ID(user.email)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(questMessages.error);
  return res.json();
}
