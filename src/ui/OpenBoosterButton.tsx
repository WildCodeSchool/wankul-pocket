import styles from "./OpenBoosterButton.module.css";
import { useState } from "react";

interface OpenBoosterButtonProps {
  boosterId: number;
}

export default function OpenBoosterButton({
  boosterId,
}: OpenBoosterButtonProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpening = () => {
    setIsOpening(true);
  };

  return (
    <button className={styles.openBoosterButton} onClick={handleOpening}>
      Ouvrir
    </button>
  );
}
