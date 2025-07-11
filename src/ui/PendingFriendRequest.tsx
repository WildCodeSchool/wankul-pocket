"use client";

import { useUserContext } from "@/context/UserContext";
import { FriendsModel } from "@/model/FriendsModel";
import { getAllRequests } from "@/service/FriendsService";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { AcceptFriendRequestButton } from "./AcceptFriendRequestButton";
import styles from "./PendingFriendRequest.module.css";
import { RefuseFriendRequestButton } from "./RefuseFriendRequestButton";
import Loader from "@/ui/Loader";
import { publicRoutes } from "@/data/ROUTES";

export function PendingFriendRequest() {
  const [requests, setRequests] = useState<FriendsModel[]>([]);
  const [isPending, startTransition] = useTransition();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.profil_id) return;

    startTransition(async () => {
      try {
        const data = await getAllRequests(user.profil_id);
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests([]);
      }
    });
  }, [user]);

  const handleAccepted = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleRefused = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className={styles.container}>
      {isPending && <Loader />}
      {!isPending && Array.isArray(requests) && requests.length > 0 && (
        <div className={styles.requestContainer}>
          <h2>Demande d&apos;ami en attente</h2>
          <ul className={styles.requestList}>
            {requests.map((request: FriendsModel) => (
              <li key={request.id} className={styles.requestItem}>
                <Image
                  src={`${publicRoutes.PROFILS}/${request.friend_image_path}`}
                  className={styles.friendImage}
                  alt="Profil"
                  height={50}
                  width={50}
                />
                <span className={styles.requestText}>
                  {request.friend_username || request.user_profil_id} veut être
                  votre ami.
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
      )}
    </div>
  );
}
