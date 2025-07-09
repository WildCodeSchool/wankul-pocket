import { QuestModel } from "@/model/QuestModel";
import QuestCard from "./QuestCard";
import styles from "./DisplayQuest.module.css";

interface QuestListProps {
  filteredQuests: Array<{ quest: QuestModel; isCompleted: boolean }>;
  currentValidatingQuest: number | null;
  onQuestClick: (quest: QuestModel) => void;
}

export default function QuestList({
  filteredQuests,
  currentValidatingQuest,
  onQuestClick,
}: QuestListProps) {
  return (
    <ul className={styles.questList}>
      {filteredQuests.map((questData) => (
        <QuestCard
          key={questData.quest.id}
          quest={questData.quest}
          isCompleted={questData.isCompleted}
          isValidating={currentValidatingQuest === questData.quest.id}
          onClick={() => questData.isCompleted && onQuestClick(questData.quest)}
        />
      ))}
    </ul>
  );
}
