"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./GoogleDeconnexion.module.css";
export default function GoogleDeconnexion() {
  const { data: session } = useSession();

  return (
    <div className={styles.button}>
      {session && <button onClick={() => signOut()}>Déconnecter</button>}
    </div>
  );
}
