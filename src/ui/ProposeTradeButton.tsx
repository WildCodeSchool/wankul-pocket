import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import styles from "./ProposeTradeButton.module.css";

type TradeBtnProps = {
  selectedFriend: FriendsModel | null;
  myCard: CardsModel | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
  friendCard: CardsModel | null;
  setFriendCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
};

export default function ProposeTradeButton({
  selectedFriend,
  myCard,
  setMyCard,
  friendCard,
  setFriendCard,
}: TradeBtnProps) {
  const handleClick = () => {};
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={!myCard && !friendCard}
    >
      Proposer
    </button>
  );
}
