"use client";

import { CardsModel } from "@/model/CardsModel";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

type CollectionContextType = {
  collection: CardsModel[] | null;
  loading: boolean;
};

const CollectionContext = createContext<CollectionContextType>({
  collection: null,
  loading: true,
});

export const useCollectionContext = () => useContext(CollectionContext);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  const [collection, setCollection] = useState<CardsModel[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/collections/${user.id}`);
        const data: CardsModel[] = await res.json();
        setCollection(data);
      } catch (err) {
        console.error("Erreur fetch collection context :", err);
        setCollection([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [user?.id]);

  return (
    <CollectionContext.Provider value={{ collection, loading }}>
      {children}
    </CollectionContext.Provider>
  );
}
