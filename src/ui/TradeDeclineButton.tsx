"use client";

import { TradeModel } from "@/model/TradeModel";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";
import { editOne } from "@/service/TradeService";
import Image from "next/image";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
  dispatch: React.Dispatch<{ type: "DECLINE" }>;
}

export const TradeDeclineButton = ({ trade, dispatch }: ProposedTradeProps) => {
  const handleDecline = async () => {
    try {
      const { id: tradeId, to_user_email } = trade;
      const refusedTrade: UpdatedTradeModel = {
        id: tradeId,
        status: true,
        acceptance: false,
        from_user_id: trade.from_user_id,
        to_user_id: trade.to_user_id,
      };
      await editOne(to_user_email, refusedTrade);
      dispatch({ type: "DECLINE" });
    } catch (error) {
      console.error("Erreur lors du refus de l'échange :", error);
    }
  };

  return (
    <button type="submit" className={styles.button} onClick={handleDecline}>
      <Image
        src={"/refuse.png"}
        alt="Refuser l'échange"
        height={50}
        width={50}
      />
    </button>
  );
};
