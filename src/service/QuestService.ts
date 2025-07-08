import { getAllQuests } from "@/lib/quest/getQuests";
import { getUserQuestsProgress } from "@/lib/user/getUserQuestProgress";
import { UserModel } from "@/model/UserModel";
import { QuestModel } from "@/model/QuestModel";
import { validateQuest } from "@/lib/quest/validateQuest";

export async function getAll() {
  return getAllQuests();
}

export async function getUserQuestsStats(email: string) {
  return getUserQuestsProgress(email);
}

export async function questValidation(user: UserModel, quest: QuestModel) {
  return validateQuest(user, quest);
}
