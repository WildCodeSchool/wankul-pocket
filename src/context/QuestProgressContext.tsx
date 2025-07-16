"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { QuestModel } from "@/model/QuestModel";
import {
  getUserQuestsStats,
  getAllQuestsByUserId,
  isQuestCompleted as serviceIsQuestCompleted,
} from "@/service/QuestService";
import { useUserContext } from "./UserContext";

type QuestProgressContextType = {
  progress: QuestProgressModel | null;
  quests: QuestModel[];
  completeableQuests: QuestModel[];
  completeableQuestsCount: number;
  error: string | null;
  refreshProgress: () => void;
};

const QuestProgressContext = createContext<QuestProgressContextType | null>(
  null
);

export const useQuestProgressContext = () => {
  const context = useContext(QuestProgressContext);
  if (!context)
    throw new Error(
      "useQuestProgressContext must be used within a QuestProgressProvider"
    );
  return context;
};

export function QuestProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<QuestProgressModel | null>(null);
  const [quests, setQuests] = useState<QuestModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserContext();

  const fetchAll = async () => {
    if (!user?.email) return;
    setError(null);
    try {
      const [progressRes, questsRes] = await Promise.all([
        getUserQuestsStats(user.email),
        getAllQuestsByUserId(user),
      ]);
      setProgress(progressRes);
      setQuests(questsRes);
    } catch (err) {
      setError("Erreur lors du fetch");
      setProgress(null);
      setQuests([]);
    }
  };

  const refreshProgress = () => fetchAll();

  useEffect(() => {
    fetchAll();
  }, [user]);

  const completeableQuests = useMemo(
    () =>
      quests.filter(
        (quest) =>
          !quest.user_id_completed &&
          progress &&
          user &&
          serviceIsQuestCompleted(
            quest,
            new QuestProgressModel(
              user.id,
              progress.bananas,
              progress.friends,
              progress.trades,
              Array.isArray(progress.collection) ? progress.collection : []
            )
          )
      ),
    [quests, progress, user]
  );

  const contextValue = {
    progress,
    quests,
    completeableQuests,
    completeableQuestsCount: completeableQuests.length,
    error,
    refreshProgress,
  };

  return (
    <QuestProgressContext.Provider value={contextValue}>
      {children}
    </QuestProgressContext.Provider>
  );
}
