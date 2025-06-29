"use client";

import { TradeModel } from "@/model/TradeModel";
import { deleteOne } from "@/service/TradeService";
import { useRouter } from "next/navigation";
import styles from "./TradeCancelButton.module.css";

interface CancelTradeProps {
  trade: TradeModel;
}

export const TradeCancelButton = ({ trade }: CancelTradeProps) => {
  const router = useRouter();
  const handleCancel = async () => {
    const { id: tradeId, to_user_email } = trade;
    await deleteOne(to_user_email, tradeId);
    router.refresh();
  };
  return (
    <button type="submit" className={styles.button} onClick={handleCancel}>
      Annuler
    </button>
  );
};
