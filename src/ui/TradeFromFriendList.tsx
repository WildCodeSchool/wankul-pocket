import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./TradeFromFriendList.module.css";

interface TradeButtonProps {
  friendId: string;
}

export default function TradeFromFriendList({ friendId }: TradeButtonProps) {
  const router = useRouter();

  const handleTradeClick = () => {
    router.push(`/echange?friendId=${friendId}`);
  };

  return (
    <button className={styles.tradeButton} onClick={handleTradeClick}>
      <Image
        src={"/tradeIcon.png"}
        alt="Trade Icon"
        className={styles.icon}
        width={24}
        height={24}
      />
    </button>
  );
}
