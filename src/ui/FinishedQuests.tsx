import { QuestModel } from "@/model/QuestModel";
import styles from "@/ui/DisplayQuest.module.css";
import Image from "next/image";

export default function FinishedQuests({
  terminatedQuests,
}: {
  terminatedQuests: QuestModel[];
}) {
  return (
    <div className={styles.questContainer}>
      <ul className={styles.questList}>
        {terminatedQuests.map((quest) => (
          <li
            key={quest.id}
            className={`${styles.terminatedQuestCard} ${styles.questCard}`}
          >
            <div className={styles.rewardContainer}>
              <Image
                src="/banana.png"
                alt="Récompense"
                width={16}
                height={16}
              />
              <p className={styles.questReward}>+{quest.reward}</p>
            </div>
            <div className={styles.content}>
              <h2 className={styles.questTitle}>✓ {quest.name} </h2>
              <p className={styles.questDescription}>{quest.mission}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
