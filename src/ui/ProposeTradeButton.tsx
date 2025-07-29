import { CardsModel } from "@/model/CardsModel";
import { newTradeModel } from "@/model/NewTradeModel";
import { NormalizedFriendModel } from "@/model/NormalizedFriendModel";
import { addOne } from "@/service/TradeService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const newTrade: newTradeModel = {
    from_user_id: selectedFriend?.user1_id,
    to_user_id: selectedFriend?.user2_id,
    offered_card_id: myCard?.id,
    requested_card_id: friendCard?.id,
    status: true,
    acceptance: null,
  };
  async function handleClick() {
    setIsLoading(true);
    if (myCard !== null && friendCard !== null) {
      try {
        await addOne(friendEmail, newTrade);
        router.refresh();
      } catch (error: unknown) {
        console.error("Erreur pendant l'échange :", error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Une erreur inattendue s'est produite.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setErrorMessage("Sélectionne un ami et deux cartes de même rareté.");
    }
  }
  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={!(myCard && friendCard)}
      >
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          "Proposer"
        )}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
