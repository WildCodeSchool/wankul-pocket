import { CardsModel } from "@/model/CardsModel";
import { newTradeModel } from "@/model/NewTradeModel";
import { addOne } from "@/service/TradeService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NormalizedFriendModel } from "./NewTrade";
import styles from "./ProposeTradeButton.module.css";

interface TradeBtnProps {
  selectedFriend: NormalizedFriendModel | null;
  myCard: CardsModel | null;
  friendCard: CardsModel | null;
}

export default function ProposeTradeButton({
  selectedFriend,
  myCard,
  friendCard,
}: TradeBtnProps) {
  const router = useRouter();
  const friendEmail: string | undefined = selectedFriend?.user2_email;
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const newTrade: newTradeModel = {
    from_user_id: selectedFriend?.user1_id,
    to_user_id: selectedFriend?.user2_id,
    offered_card_id: myCard?.id,
    requested_card_id: friendCard?.id,
    status: true,
    acceptance: null,
  };
  async function handleClick() {
    if (myCard !== null && friendCard !== null) {
      await addOne(friendEmail, newTrade);
      router.refresh();
    } else {
      setErrorMessage(true);
    }
  }
  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={!(myCard && friendCard)}
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
