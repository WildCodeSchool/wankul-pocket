"use client";

import { CardsModel } from "@/model/CardsModel";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

type CollectionContextType = {
  collection: CardsModel[] | [];
  loading: boolean;
  refreshCollection: () => Promise<void>;
};

const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  loading: true,
  refreshCollection: async () => {},
});

export const useCollectionContext = () => useContext(CollectionContext);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  const [collection, setCollection] = useState<CardsModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.email}/collections`);
      const data: CardsModel[] = await res.json();
      setCollection(data);
    } catch (err) {
      console.error("Erreur fetch collection context :", err);
      setCollection([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [user?.email]);

  return (
    <CollectionContext.Provider
      value={{ collection, loading, refreshCollection: fetchCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
