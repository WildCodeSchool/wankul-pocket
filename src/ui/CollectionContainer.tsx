"use client";

import { useCollectionContext } from "@/context/CollectionContext";
import { CardsModel } from "@/model/CardsModel";
import Image from "next/image";
import styles from "./CollectionContainer.module.css";

export default function CollectionContainer() {
  const { collection } = useCollectionContext();
  return (
    <ul className={styles.container}>
      {collection?.map((card: CardsModel) => (
        <li key={card.id}>
          <Image
            src={card.image_path}
            alt={card.name}
            width={200}
            height={279}
          />
          <p>{card.name}</p>
        </li>
      ))}
    </ul>
  );
}
