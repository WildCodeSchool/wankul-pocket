import { questMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getAllQuests() {
  const res = await fetch(`${apiRoutes.QUESTS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(questMessages.error);
  return res.json();
}
