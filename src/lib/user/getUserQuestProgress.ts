import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import type { UserModel } from "@/model/UserModel";

export async function getUserQuestsProgress(
  user: UserModel
): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.QUESTS_PROGRESS(user.email), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(userMessages.error);
  return res.json();
}
