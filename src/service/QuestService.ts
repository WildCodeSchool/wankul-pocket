import { getAllQuests } from "@/lib/quest/getQuests";
import { getUserQuestsProgress } from "@/lib/user/getUserQuestProgress";
import { UserModel } from "@/model/UserModel";

export async function getAll() {
  return getAllQuests();
}

export async function getUserQuestsStats(email: string) {
  return getUserQuestsProgress(email);
}
