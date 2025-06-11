"use client";

import { signOut, useSession } from "next-auth/react";

export default function GoogleDeconnexion() {
  const { data: session } = useSession();

  return (
    <div>
      {session && <button onClick={() => signOut()}>Se déconnecter</button>}
    </div>
  );
}
