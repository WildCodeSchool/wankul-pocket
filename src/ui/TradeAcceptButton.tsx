"use client";

import { TradeModel } from "@/model/TradeModel";
import Image from "next/image";
import styles from "./TradeButton.module.css";

interface ProposedTradeProps {
  trade: TradeModel;
}

export const TradeAcceptButton = ({ trade }: ProposedTradeProps) => {
  const handleAccept = () => {};
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
