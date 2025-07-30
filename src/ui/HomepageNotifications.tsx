"use client";

import { getAllRequests } from "@/service/FriendsService";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useUserContext } from "@/context/UserContext";
import {
  getUserQuestsStats,
  getAllQuestsByUserId,
  isQuestCompleted as serviceIsQuestCompleted,
} from "@/service/QuestService";
import styles from "./HomepageNotifications.module.css";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { QuestModel } from "@/model/QuestModel";
import Link from "next/link";

export function HomepageNotifications() {
  const { user } = useUserContext();
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);
  const [progress, setProgress] = useState<QuestProgressModel | null>(null);
  const [quests, setQuests] = useState<QuestModel[]>([]);

  const refreshFriendRequests = useCallback(async () => {
    if (!user?.profil_id) return;

    try {
      const requests = await getAllRequests(user.profil_id);
      setFriendRequestsCount(Array.isArray(requests) ? requests.length : 0);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des demandes d'amis :",
        error
      );
      setFriendRequestsCount(0);
    }
  }, [user]);

  const fetchAll = useCallback(async () => {
    if (!user) {
      setProgress(null);
      setQuests([]);
      return;
    }
    try {
      const [progressRes, questsRes] = await Promise.all([
        getUserQuestsStats(user.email),
        getAllQuestsByUserId(user),
      ]);
      setProgress(progressRes);
      setQuests(questsRes);
    } catch (err) {
      console.error("Erreur lors de la récupération des quêtes :", err);
      setProgress(null);
      setQuests([]);
    }
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

  console.log("Completeable Quests:", completeableQuests);

  useEffect(() => {
    fetchAll();
    refreshFriendRequests();
  }, [user]);

  return (
    <div
      className={
        friendRequestsCount > 0 || completeableQuests.length > 0
          ? styles.container
          : `${styles.container} ${styles.none}`
      }
    >
      <div className={styles.notifications}>
        {friendRequestsCount > 0 && (
          <Link
            href="/amis"
            className={styles.notificationLink}
            style={{ flex: 1 }}
          >
            <div className={styles.notificationBubble}>
              <p>
                <span className={styles.notificationBubbleFriends}>
                  {friendRequestsCount}
                </span>{" "}
                demande(s) d&apos;amis
              </p>
            </div>
          </Link>
        )}
        {completeableQuests.length > 0 && friendRequestsCount > 0 && (
          <div className={styles.notificationSeparator}> | </div>
        )}
        {completeableQuests.length > 0 && (
          <Link
            href="/objectifs"
            className={styles.notificationLink}
            style={{ flex: 1 }}
          >
            <div className={styles.notificationBubble}>
              <p>
                Quêtes à valider :{" "}
                <span className={styles.notificationBubbleQuests}>
                  {completeableQuests.length}
                </span>
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
