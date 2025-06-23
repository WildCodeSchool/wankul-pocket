import { notFound } from "next/navigation";
import type { BoosterModel } from "@/model/BoosterModel";
import { getOneById } from "@/service/BoosterService";
import { boostersMessages } from "@/data/responseMessages";
import styles from "./boosterId.module.css";
import OpenBoosterButton from "@/ui/OpenBoosterButton";
import BackToBoosterSelection from "@/ui/BackToBoosterSelection";

interface PageParams {
  params: {
    id: string;
  };
}

export default async function InfoDetailPage({ params }: PageParams) {
  const idNum = parseInt(params.id, 10);
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
        <img
          src={booster.image}
          alt={booster.name}
          className={styles.boosterImage}
        />
      </article>
      <OpenBoosterButton boosterId={booster.id} />
      <BackToBoosterSelection />
    </div>
  );
}
