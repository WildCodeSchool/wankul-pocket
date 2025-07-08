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
  loading: boolean;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserContext();

  const fetchProgress = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getUserQuestsStats(user.email);
      setProgress(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setProgress(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProgress = () => {
    fetchProgress();
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return (
    <QuestProgressContext value={{ progress, loading, error, refreshProgress }}>
      {children}
    </QuestProgressContext>
  );
}
