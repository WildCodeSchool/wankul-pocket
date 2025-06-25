"use client";

import { TradeModel } from "@/model/TradeModel";
import { deleteOne } from "@/service/TradeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
}

export const TradeDeclineButton = ({ trade }: ProposedTradeProps) => {
  const router = useRouter();
  const handleDecline = async () => {
    await deleteOne(trade.to_user_email, trade.id);
    router.refresh();
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
