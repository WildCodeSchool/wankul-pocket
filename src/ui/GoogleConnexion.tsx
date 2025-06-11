"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GoogleConnexion() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/homepage");
  }

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
