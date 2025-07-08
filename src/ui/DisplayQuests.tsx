"use client";

import { useState } from "react";
import styles from "./DisplayQuest.module.css";
import { QuestModel } from "@/model/QuestModel";
import { useQuestProgressContext } from "@/context/QuestProgressContext";
import { useUserContext } from "@/context/UserContext";
import { QuestValidator } from "@/service/QuestValidator";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { questValidation } from "@/service/QuestService";
import Image from "next/image";

export default function DisplayQuests({ quests }: { quests: QuestModel[] }) {
  const { progress, refreshProgress } = useQuestProgressContext();
  const { user, updateUserBananas } = useUserContext();
  const [validatingQuests, setValidatingQuests] = useState<Set<number>>(
    new Set()
  );

  const isQuestCompleted = (quest: QuestModel): boolean => {
    if (!progress || !user) return false;

    const questProgress = new QuestProgressModel(
      user.id,
      progress.bananas,
      progress.friends,
      progress.trades,
      progress.collection || []
    );

    return QuestValidator.validateQuest(quest, questProgress);
  };

  const validateQuest = async (quest: QuestModel) => {
    if (!user || validatingQuests.has(quest.id)) return;

    setValidatingQuests((prev) => new Set(prev).add(quest.id));

    try {
      const response = await questValidation(user, quest);
      if (response.ok) {
        const data = await response.json();
        updateUserBananas(user.bananas + data.reward_added);
        refreshProgress();
      } else {
        const errorData = await response.json();
        console.error(
          "Erreur lors de la création de quest completion:",
          errorData.error
        );
      }
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
    } finally {
      setValidatingQuests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(quest.id);
        return newSet;
      });
    }
  };

  const questsByCategory = quests
    .filter((quest) => !quest.user_id_completed)
    .reduce((acc, quest) => {
      const category = quest.category;
      const isCompleted = isQuestCompleted(quest);

      if (!acc[category] || quest.reward < acc[category].quest.reward) {
        acc[category] = { quest, isCompleted };
      }

      return acc;
    }, {} as Record<string, { quest: QuestModel; isCompleted: boolean }>);

  const filteredQuests = Object.values(questsByCategory).sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) return -1;
    if (!a.isCompleted && b.isCompleted) return 1;
    return a.quest.reward - b.quest.reward;
  });

  return (
    <div className={styles.questContainer}>
      <h1 className={styles.title}>Quêtes</h1>
      <ul className={styles.questList}>
        {filteredQuests.map((questData) => (
          <li
            key={questData.quest.id}
            className={`${styles.questCard} ${
              questData.isCompleted ? styles.questCompleted : ""
            }`}
            onClick={() =>
              questData.isCompleted && validateQuest(questData.quest)
            }
            style={{
              cursor: questData.isCompleted ? "pointer" : "default",
            }}
          >
            <div className={styles.rewardContainer}>
              <Image
                src="/banana.png"
                alt="Récompense"
                width={16}
                height={16}
              />
              <p className={styles.questReward}>+{questData.quest.reward}</p>
            </div>
            <div className={styles.content}>
              <h2 className={styles.questTitle}>
                {questData.quest.name}
                {questData.isCompleted}
                {validatingQuests.has(questData.quest.id) && " 🔄"}
              </h2>
              <p className={styles.questDescription}>
                {questData.quest.mission}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
