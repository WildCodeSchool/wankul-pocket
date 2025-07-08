import Image from "next/image";
import styles from "./DisplayQuest.module.css";

interface RewardAnimationProps {
  questId: number;
  reward: number;
}

export default function RewardAnimation({
  questId,
  reward,
}: RewardAnimationProps) {
  return (
    <div key={questId} className={styles.rewardAnimation}>
      <Image src="/banana.png" alt="Récompense" width={20} height={20} />
      <span>+{reward}</span>
    </div>
  );
}
