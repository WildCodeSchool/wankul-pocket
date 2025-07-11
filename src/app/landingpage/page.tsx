import { Wankul } from "@/data/wankulList";
import GoogleConnexion from "@/ui/GoogleConnexion";
import ModalLandingPage from "@/ui/ModalLandingPage";
import Image from "next/image";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bubble}>
        <h2>Bonjour Collectionneur !</h2>
        <p>
          Afin de profiter au mieux des différentes fonctionnalités du site, il
          est impératif de te connecter via ton compte google.
        </p>
      </div>
      <GoogleConnexion />
      <ModalLandingPage />
      <Image
        src={`${(() => {
          const keys = Object.keys(Wankul) as (keyof typeof Wankul)[];
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const images = Wankul[randomKey];
          return images[Math.floor(Math.random() * images.length)];
        })()}`}
        alt="Wankul aléatoire"
        className={styles.wankulImage}
        height={300}
        width={300}
      />
    </div>
  );
}
