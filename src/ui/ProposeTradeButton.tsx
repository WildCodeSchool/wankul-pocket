import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import { addOne } from "@/service/TradeService";
import styles from "./ProposeTradeButton.module.css";

interface TradeBtnProps {
  selectedFriend: FriendsModel | null;
  myCard: CardsModel | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
  friendCard: CardsModel | null;
  setFriendCard: React.Dispatch<React.SetStateAction<CardsModel | null>>;
  setSelectedFriend: React.Dispatch<React.SetStateAction<CardsModel | null>>;
}

interface newTradeModel {
  from_user_id: number | undefined;
  to_user_id: number | undefined;
  offered_card_id: number | undefined;
  requested_card_id: number | undefined;
  status: true;
  acceptance: null;
}

export default function ProposeTradeButton({
  selectedFriend,
  myCard,
  setMyCard,
  friendCard,
  setFriendCard,
  setSelectedFriend,
}: TradeBtnProps) {
  const friendEmail: string | undefined = selectedFriend?.friend_email;
  const newTrade: newTradeModel = {
    from_user_id: selectedFriend?.user_id,
    to_user_id: selectedFriend?.friend_id,
    offered_card_id: myCard?.id,
    requested_card_id: friendCard?.id,
    status: true,
    acceptance: null,
  };
  const handleClick = () => {
    addOne(friendEmail, newTrade);
    setMyCard(null);
    setFriendCard(null);
    setSelectedFriend(null);
  };
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
