import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getUserQuestsProgress(email: string) {
  const res = await fetch(apiRoutes.QUESTS_PROGRESS(email), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(userMessages.error);
  return res.json();
}
