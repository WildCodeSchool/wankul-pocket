"use client";

import { TradeModel } from "@/model/TradeModel";
import { editOne } from "@/service/TradeService";
import Image from "next/image";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeclined: React.Dispatch<React.SetStateAction<boolean>>;
  setHideContent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeclinedContent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RefusedTradeModel {
  id: number;
  status: boolean;
  acceptance: boolean;
}

export const TradeDeclineButton = ({
  trade,
  setIsClicked,
  setIsDeclined,
  setHideContent,
  setShowDeclinedContent,
}: ProposedTradeProps) => {
  const handleDecline = async () => {
    try {
      const { id: tradeId, to_user_email } = trade;
      const refusedTrade: RefusedTradeModel = {
        id: tradeId,
        status: false,
        acceptance: false,
      };
      await editOne(to_user_email, refusedTrade);
      setHideContent(true);
      setTimeout(() => {
        setIsDeclined(true);
        setShowDeclinedContent(true);
        setIsClicked(true);
      }, 400);
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
