import { boostersMessages } from "@/data/responseMessages";
import type { BoosterModel } from "@/model/BoosterModel";
import { getOneById } from "@/service/BoosterService";
import BackToBoosterSelection from "@/ui/BackToBoosterSelection";
import OpenBoosterButton from "@/ui/OpenBoosterButton";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./boosterId.module.css";

export default async function InfoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id || "", 10);
  if (isNaN(idNum)) {
    notFound();
  }

  let booster: BoosterModel;
  try {
    booster = await getOneById(idNum);
  } catch (err: unknown) {
    console.error(boostersMessages.errorDetail, err);
    return notFound();
  }

  return (
    <div className={styles.container}>
      <h2>Booster selectionné : {booster.name}</h2>
      <article className={styles.card}>
        <Image
          src={booster.image}
          alt={booster.name}
          className={styles.boosterImage}
          height={515}
          width={300}
        />
      </article>
      <OpenBoosterButton boosterId={booster.id} />
      <BackToBoosterSelection />
    </div>
  );
}
