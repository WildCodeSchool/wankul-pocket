"use client";

import GoogleConnexion from "@/ui/GoogleConnexion";
import styles from "./LandingPage.module.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalLandingPage from "@/ui/ModalLandingPage";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/homepage");
  }

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
    </div>
  );
}
