"use client";

import { TradeModel } from "@/model/TradeModel";
import { editOne } from "@/service/TradeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
}

interface RefusedTradeModel {
  id: number;
  status: boolean;
  acceptance: boolean;
}

export const TradeDeclineButton = ({ trade }: ProposedTradeProps) => {
  const router = useRouter();
  const handleDecline = async () => {
    const { id: tradeId, to_user_email } = trade;
    const refusedTrade: RefusedTradeModel = {
      id: tradeId,
      status: false,
      acceptance: false,
    };
    await editOne(to_user_email, refusedTrade);
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
