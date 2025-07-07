import { getAll } from "@/service/QuestService";
import DisplayQuests from "@/ui/DisplayQuests";

export default async function Quests() {
  const quests = await getAll();

  return (
    <div>
      <DisplayQuests quests={quests} />
    </div>
  );
}
