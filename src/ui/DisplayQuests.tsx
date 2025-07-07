"use client";

import styles from "./DisplayQuest.module.css";
import { QuestModel } from "@/model/QuestModel";
import Image from "next/image";

export default function DisplayQuests({ quests }: { quests: QuestModel[] }) {
  const questsByCategory = quests
    .filter((quest) => !quest.user_id_completed)
    .reduce((acc, quest) => {
      const category = quest.category;

      if (!acc[category] || quest.reward < acc[category].reward) {
        acc[category] = quest;
      }

      return acc;
    }, {} as Record<string, QuestModel>);

  const filteredQuests = Object.values(questsByCategory).sort(
    (a, b) => a.reward - b.reward
  );

  return (
    <div className={styles.questContainer}>
      <h1 className={styles.title}>Quêtes</h1>
      <ul className={styles.questList}>
        {filteredQuests.map((quest: QuestModel) => (
          <li key={quest.id} className={styles.questCard}>
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
              <h2 className={styles.questTitle}>{quest.name}</h2>

              <p className={styles.questDescription}>{quest.mission}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
