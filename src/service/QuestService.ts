import { getAllQuests } from "@/lib/quest/getQuests";

export async function getAll() {
  return getAllQuests();
}
