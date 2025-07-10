export const dynamic = "force-dynamic";

import { getBoosters } from "@/lib/getBoosters";
import BoosterSelection from "@/ui/BoosterSelection";

import { boostersMessages } from "@/data/responseMessages";
import { notFound } from "next/navigation";
import styles from "./boosterSelection.module.css";

export default async function BoosterPage() {
  let boosters;
  try {
    boosters = await getBoosters();
  } catch (err) {
    console.error(boostersMessages.error, err);
    notFound();
  }
  return (
    <div className={styles.container}>
      <BoosterSelection boosters={boosters} />
    </div>
  );
}
