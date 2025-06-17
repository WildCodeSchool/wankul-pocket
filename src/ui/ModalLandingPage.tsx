import { useState } from "react";
import styles from "./ModalLandingPage.module.css";

export default function ModalLandingPage() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} style={{ pointerEvents: "all" }}>
      <div className={styles.modal}>
        <h2>IMPORTANT</h2>
        <p>
          Cette application n’est pas officielle.
          <br />
          Nous sommes trois développeurs web en formation, et ce projet
          constitue notre travail de fin d’études.
          <br />
          Merci de faire preuve d’indulgence en cas de bugs ou de problèmes de
          performance.
          <br />
          Nous ne tirons aucun bénéfice de cette application et ne sommes en
          aucun cas affiliés à Wankul.
          <br />
          Tous les droits leur sont réservés.
        </p>
        <button onClick={handleClose} className={styles.closeButton}>
          Fermer
        </button>
      </div>
    </div>
  );
}
