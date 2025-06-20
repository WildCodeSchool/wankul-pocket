import BoosterSelection from "@/ui/BoosterSelection";
import { getBoosters } from "@/lib/getBoosters";
import styles from "./boosterSelection.module.css";

const boosters = await getBoosters();

export default async function BoosterPage() {
  return (
    <div className={styles.container}>
      <BoosterSelection boosters={boosters} />
    </div>
  );
}
