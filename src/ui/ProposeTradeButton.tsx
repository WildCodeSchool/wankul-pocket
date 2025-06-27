import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import { TradeModel } from "@/model/TradeModel";
import { addOne } from "@/service/TradeService";
import styles from "./ProposeTradeButton.module.css";

type TradeBtnProps = {
  selectedFriend: FriendsModel | null;
  myCard: CardsModel | null;
  friendCard: CardsModel | null;
};

export default function ProposeTradeButton({
  selectedFriend,
  myCard,
  friendCard,
}: TradeBtnProps) {
  const friendEmail: string = selectedFriend?.friend_email;
  const newTrade: TradeModel = {
    from_user_id: 2,
    to_user_id: 4,
    offered_card_id: myCard?.id,
    requested_card_id: friendCard?.id,
    status: true,
    acceptance: null,
  };
  const handleClick = () => {
    console.log(newTrade);
    addOne(friendEmail, newTrade);
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
