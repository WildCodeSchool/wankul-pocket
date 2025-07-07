"use client";

import { useEffect, useState } from "react";
import { getAllRequests } from "@/service/FriendsService";
import { FriendsModel } from "@/model/FriendsModel";
import { useUserContext } from "@/context/UserContext";
import styles from "./PendingFriendRequest.module.css";
import { AcceptFriendRequestButton } from "./AcceptFriendRequestButton";
import { RefuseFriendRequestButton } from "./RefuseFriendRequestButton";
import Loader from "@/ui/Loader";

export function PendingFriendRequest() {
  const [requests, setRequests] = useState<FriendsModel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.profil_id) return;
    getAllRequests(user.profil_id)
      .then((data) => {
        setRequests(data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleAccepted = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleRefused = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        Array.isArray(requests) &&
        requests.length > 0 && (
          <div className={styles.requestContainer}>
            <h2>Demande d'ami en attente</h2>
            <ul className={styles.requestList}>
              {requests.map((request: FriendsModel) => (
                <li key={request.id} className={styles.requestItem}>
                  <img
                    src={request.friend_image_path}
                    className={styles.friendImage}
                    alt="Profil"
                  />
                  <span className={styles.requestText}>
                    {request.friend_username || request.user_profil_id} veut
                    être votre ami.
                  </span>
                  <div className={styles.requestActions}>
                    <AcceptFriendRequestButton
                      friend={request}
                      onAccepted={() => handleAccepted(request.id)}
                    />
                    <RefuseFriendRequestButton
                      id={request.id}
                      onRefused={() => handleRefused(request.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
