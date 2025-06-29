import { CardsModel } from "@/model/CardsModel";
import { FriendsModel } from "@/model/FriendsModel";
import { addOne } from "@/service/TradeService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ProposeTradeButton.module.css";

interface TradeBtnProps {
  selectedFriend: FriendsModel | null;
  myCard: CardsModel | null;
  friendCard: CardsModel | null;
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
  friendCard,
}: TradeBtnProps) {
  const router = useRouter();
  const friendEmail: string | undefined = selectedFriend?.friend_email;
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const newTrade: newTradeModel = {
    from_user_id: selectedFriend?.user_id,
    to_user_id: selectedFriend?.friend_id,
    offered_card_id: myCard?.id,
    requested_card_id: friendCard?.id,
    status: true,
    acceptance: null,
  };
  const handleClick = () => {
    if (myCard !== null && friendCard !== null) {
      addOne(friendEmail, newTrade);
      router.refresh();
    } else {
      setErrorMessage(true);
      console.log("Error message :", errorMessage);
    }
  };
  console.log("Mycard :", myCard);
  console.log("FriendCard :", friendCard);
  console.log("Error message :", errorMessage);
  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={!myCard && !friendCard}
      >
        Proposer
      </button>
      {errorMessage && (
        <p>
          Sélectionne un ami et deux cartes de même rareté afin de proposer un
          échange.
        </p>
      )}
    </>
  );
}
