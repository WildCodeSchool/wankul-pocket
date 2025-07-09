"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { getUserQuestsStats } from "@/service/QuestService";
import { useUserContext } from "./UserContext";

type QuestProgressContextType = {
  progress: QuestProgressModel | null;
  error: string | null;
  refreshProgress: () => void;
};

const QuestProgressContext = createContext<QuestProgressContextType | null>(
  null
);

export const useQuestProgressContext = () => {
  const context = useContext(QuestProgressContext);

  if (!context) {
    throw new Error(
      "useQuestProgressContext must be used within a QuestProgressProvider"
    );
  }
  return context;
};

export function QuestProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<QuestProgressModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserContext();

  const fetchProgress = async () => {
    if (!user?.email) {
      return;
    }

    setError(null);

    try {
      const res = await getUserQuestsStats(user.email);

      setProgress(res);
    } catch (err) {
      console.error("❌ Erreur lors du fetch:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setProgress(null);
    }
  };

  const refreshProgress = () => {
    fetchProgress();
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  const contextValue = { progress, error, refreshProgress };

  return (
    <QuestProgressContext value={contextValue}>{children}</QuestProgressContext>
  );
}
