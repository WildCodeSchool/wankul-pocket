"use client";

import { UpdatedCard } from "@/lib/collection/patchCollection";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { TradeModel } from "@/model/TradeModel";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";
import { editCollection, editOne } from "@/service/TradeService";
import Image from "next/image";
import styles from "./TradeButton.module.css";
import { useQuestProgressContext } from "@/context/QuestProgressContext";

interface ProposedTradeProps {
  trade: TradeModel;
  dispatch: React.Dispatch<{ type: "ACCEPT" }>;
}

export const TradeAcceptButton = ({ trade, dispatch }: ProposedTradeProps) => {
  const { refreshProgress } = useQuestProgressContext();

  const handleAccept = async () => {
    const {
      from_user_email,
      to_user_email,
      offered_card_id,
      offered_card_quantity,
      requested_card_id,
      requested_card_quantity,
      id: tradeId,
    } = trade;

    const offeredCard: UpdatedCard = {
      id: Number(offered_card_id),
      quantity: offered_card_quantity - 1,
    };

    const requestedCard: UpdatedCard = {
      id: Number(requested_card_id),
      quantity: requested_card_quantity - 1,
    };

    const acceptedTrade: UpdatedTradeModel = {
      id: tradeId,
      status: true,
      acceptance: true,
    };

    try {
      await Promise.all([
        editCollection(from_user_email, offeredCard),
        editCollection(to_user_email, requestedCard),
      ]);
      await Promise.all([
        addToCollection(to_user_email, [offered_card_id]),
        addToCollection(from_user_email, [requested_card_id]),
      ]);
      await editOne(to_user_email, acceptedTrade);
      dispatch({ type: "ACCEPT" });
      refreshProgress();
    } catch (error) {
      console.error("Erreur lors de l'acceptation de l'échange :", error);
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
