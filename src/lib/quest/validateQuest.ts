import { UserModel } from "@/model/UserModel";
import { QuestModel } from "@/model/QuestModel";
import { apiRoutes } from "@/data/ROUTES";

export async function validateQuest(user: UserModel, quest: QuestModel) {
  const response = await fetch(apiRoutes.ADD_COMPLETED_QUEST(user.email), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      quest_id: quest.id,
      reward: quest.reward,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
}
