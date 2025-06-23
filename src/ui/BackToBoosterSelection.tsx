"use client";

import { useRouter } from "next/navigation";

export default function BackToBoosterSelection() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/booster")}>
      Retour à la sélection des boosters
    </button>
  );
}
