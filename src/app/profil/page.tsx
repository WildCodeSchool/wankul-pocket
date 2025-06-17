import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import styles from "./profil.module.css";
import ModificationAvatar from "@/ui/ModificationAvatar";

export default function Profil() {
  return (
    <div>
      <div className={styles.bubble}>
        <ModificationAvatar />
      </div>
      <p>Statistique</p>
      <div className={styles.bubble}>
        <GoogleDeconnexion />
      </div>
    </div>
  );
}
