import { notFound } from "next/navigation";
import type { BoosterModel } from "@/model/BoosterModel";
import { getOneById } from "@/service/BoosterService";
import { infoMessages } from "@/data/responseMessages";
import styles from "./boosterId.module.css";

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
    console.error(infoMessages.errorDetail, err);
    return notFound();
  }

  return (
    <main className={styles.container}>
      <h2>Booster selectionné : {booster.name}</h2>
      <article className={styles.card}>
        <img
          src={booster.image}
          alt={booster.name}
          className={styles.boosterImage}
        />
        <p>Coût : 10 bananes</p>
      </article>
    </main>
  );
}
