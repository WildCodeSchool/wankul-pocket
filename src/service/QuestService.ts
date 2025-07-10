import { getUserQuestsProgress } from "@/lib/user/getUserQuestProgress";
import { getAllQuestsById } from "@/lib/quest/getAllQuestsById";
import { UserModel } from "@/model/UserModel";
import { QuestModel } from "@/model/QuestModel";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { validateQuest } from "@/lib/quest/validateQuest";
import { QuestValidator } from "@/utils/QuestValidator";

export async function getUserQuestsStats(email: string) {
  return getUserQuestsProgress(email);
}

export async function questValidation(user: UserModel, quest: QuestModel) {
  return validateQuest(user, quest);
}

export async function getAllQuestsByUserId(user: UserModel) {
  return getAllQuestsById(user);
}

export function isQuestCompleted(
  quest: QuestModel,
  questProgress: QuestProgressModel
) {
  return QuestValidator.validateQuest(quest, questProgress);
}
