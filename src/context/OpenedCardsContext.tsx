"use client";

import { createContext, useContext, useState } from "react";

export interface OpenedCard {
  id: number;
  name: string;
  drop_rate: number;
  image_path: string;
  rarity: string;
  quantity: number;
  isNew?: boolean;
}

const OpenedCardsContext = createContext<{
  openedCards: OpenedCard[];
  updateOpenedCards: (newCards: OpenedCard[]) => void;
}>({
  openedCards: [],
  updateOpenedCards: () => {},
});

export const useOpenedCards = () => {
  return useContext(OpenedCardsContext);
};

export const OpenedCardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openedCards, setOpenedCards] = useState<OpenedCard[]>([]);

  const updateOpenedCards = (newCards: OpenedCard[]) => {
    setOpenedCards(newCards);
  };

  return (
    <OpenedCardsContext value={{ openedCards, updateOpenedCards }}>
      {children}
    </OpenedCardsContext>
  );
};
