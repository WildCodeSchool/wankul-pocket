"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function GoogleConnexion() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>
          Connecte toi avec Google
        </button>
      ) : (
        <div>
          <p>Bien le bonjour, {session.user?.name}</p>
          <button onClick={() => signOut()}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}
