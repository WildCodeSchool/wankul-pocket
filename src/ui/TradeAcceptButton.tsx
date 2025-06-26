"use client";

import { UpdatedCard } from "@/lib/collection/patchCollection";
import { addToCollection } from "@/lib/openBooster/addToCollection";
import { deleteTrade } from "@/lib/trade/deleteTrade";
import { TradeModel } from "@/model/TradeModel";
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
      quantity: Math.max(offered_card_quantity - 1, 0),
    };

    const requestedCard: UpdatedCard = {
      id: Number(requested_card_id),
      quantity: Math.max(requested_card_quantity - 1, 0),
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
      await deleteTrade(to_user_email, tradeId);
      router.refresh();
    } catch (error: any | unknown) {
      console.error("Erreur pendant l'acceptation de l'échange :", error);
      if (error.response) {
        console.error("Réponse serveur :", error.response.data);
      } else if (error.request) {
        console.error("Aucune réponse reçue :", error.request);
      } else {
        console.error("Erreur inconnue :", error.message);
      }
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
