"use client";

import { UpdatedCard } from "@/lib/collection/patchCollection";
import { deleteTrade } from "@/lib/trade/deleteTrade";
import { TradeModel } from "@/model/TradeModel";
// import { addCardToCollection } from "@/service/CollectionService";
import { editCollection } from "@/service/TradeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
}

export const TradeAcceptButton = ({ trade }: ProposedTradeProps) => {
  const router = useRouter();

  const handleAccept = async () => {
    try {
      const updatedCard: UpdatedCard = {
        id: Number(trade.offered_card_id),
        quantity: Math.max(trade.offered_card_quantity - 1, 0),
      };

      await editCollection(trade.from_user_email, updatedCard);
      // await addCardToCollection(trade.to_user_id, trade.offered_card_id); <- This line kills the app cause the function calls db in a client component
      await deleteTrade(trade.to_user_email, trade.id);
      router.refresh();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  return (
    <button type="submit" className={styles.button} onClick={handleAccept}>
      <Image
        src={"/accept.png"}
        alt="Accepter l'échange"
        height={50}
        width={50}
      />
    </button>
  );
};
