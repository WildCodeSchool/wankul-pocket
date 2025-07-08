import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { QuestProgressModel } from "@/model/QuestProgressModel";

export async function getUserQuestsProgress(
  email: string
): Promise<QuestProgressModel> {
  const res = await fetch(apiRoutes.QUESTS_PROGRESS(email), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(userMessages.error);

  const data = await res.json();

  return new QuestProgressModel(
    data.user_id,
    data.bananas,
    data.friends_count,
    data.trades_count,
    data.collection
  );
}
