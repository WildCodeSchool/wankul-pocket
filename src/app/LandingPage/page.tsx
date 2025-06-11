"use client";
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
    </div>
  );
}
