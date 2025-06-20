"use client";

import { getOne } from "@/lib/collection/getUserCollection";
import { CardsModel } from "@/model/CardsModel";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

type CollectionContextType = {
  collection: CardsModel[];
  setCollection: React.Dispatch<React.SetStateAction<CardsModel[]>>;
};

const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  setCollection: () => {},
});

export const useCollectionContext = () => useContext(CollectionContext);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  const [collection, setCollection] = useState<CardsModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCollection = async () => {
      if (!user?.email) {
        router.push("/landingpage");
        return;
      }

      try {
        const data = await getOne(user.email);
        if (Array.isArray(data)) {
          setCollection(data);
        } else {
          throw new Error("Format de données invalide");
        }
      } catch (err) {
        console.error("Erreur fetch collection context :", err);
        setCollection([]);
      }
    };

    fetchCollection();
  }, [user?.email]);

  return (
    <CollectionContext value={{ collection, setCollection }}>
      {children}
    </CollectionContext>
  );
}
