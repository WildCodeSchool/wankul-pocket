import Image from "next/image";
import Loader from "@/ui/Loader";
import { QuestModel } from "@/model/QuestModel";
import styles from "./DisplayQuest.module.css";

interface QuestCardProps {
  quest: QuestModel;
  isCompleted: boolean;
  isValidating: boolean;
  onClick: () => void;
}

export default function QuestCard({
  quest,
  isCompleted,
  isValidating,
  onClick,
}: QuestCardProps) {
  return (
    <li
      className={`${styles.questCard} ${
        isCompleted ? styles.questCompleted : ""
      }`}
      onClick={onClick}
      style={{
        cursor: isCompleted ? "pointer" : "default",
      }}
    >
      <div className={styles.rewardContainer}>
        <Image src="/banana.png" alt="Récompense" width={16} height={16} />
        <p className={styles.questReward}>+{quest.reward}</p>
      </div>
      <div className={styles.content}>
        <h2 className={styles.questTitle}>
          {quest.name}
          {isValidating && (
            <span className={styles.loaderContainer}>
              <Loader />
            </span>
          )}
        </h2>
        <p className={styles.questDescription}>{quest.mission}</p>
      </div>
    </li>
  );
}
