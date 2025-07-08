"use client";

import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { getAllRequests } from "@/service/FriendsService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AcceptFriendRequestButton } from "./AcceptFriendRequestButton";
import styles from "./PendingFriendRequest.module.css";
import { RefuseFriendRequestButton } from "./RefuseFriendRequestButton";

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
        <p>Loading...</p>
      ) : (
        Array.isArray(requests) &&
        requests.length > 0 && (
          <div className={styles.requestContainer}>
            <h2>Demande d&apos;ami en attente</h2>
            <ul className={styles.requestList}>
              {requests.map((request: FriendsModel) => (
                <li key={request.id} className={styles.requestItem}>
                  <Image
                    src={request.friend_image_path || "/profilpic/perso1.png"}
                    className={styles.friendImage}
                    alt="Profil"
                    height={50}
                    width={50}
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
