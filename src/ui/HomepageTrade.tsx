"use client";

import { TradeModel } from "@/model/TradeModel";
import Link from "next/link";
import styles from "./HomepageTrade.module.css";

interface Props {
  trade: TradeModel | null;
}

export default function HomepageTrade({ trade }: Props) {
  if (trade === null) {
    return (
      <Link href={`/echange`} className={styles.container}>
        <div className={styles.trade}>
          <h2 className={styles.title}>Echanges</h2>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/echange`} className={styles.container}>
      <div className={styles.trade}>
        <h2 className={styles.title}>Echanges</h2>
        <p>{trade?.from_username}</p>
      </div>
    </Link>
  );
}
