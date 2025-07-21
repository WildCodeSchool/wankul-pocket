"use client";

import { friendsMessages } from "@/data/responseMessages";
import { refuseFriendRequest } from "@/service/FriendsService";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Unfriend.module.css";
import { useFriendListContext } from "@/context/FriendListContext";

interface UnfriendProps {
  userId: number;
}

export default function Unfriend({ userId }: UnfriendProps) {
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { removeFriend } = useFriendListContext();

  async function handleConfirmUnfriend() {
    try {
      await refuseFriendRequest(userId);
      setDeleted(true);
      setTimeout(() => {
        setShowModal(false);
        setDeleted(false);
        removeFriend(userId);
      }, 1200);
    } catch (error) {
      console.error("Failed to unfriend user:", error);
      setShowModal(false);
    }
  }

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setDeleted(false);
  }

  return (
    <>
      <button
        onClick={handleButtonClick}
        type="button"
        className={styles.unfriendButton}
      >
        <Image
          src="/unfriend.png"
          alt="Unfriend"
          className={styles.icon}
          height={24}
          width={24}
        />
      </button>
      {showModal &&
        createPortal(
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <div className={styles["modal-content"]}>
                {deleted ? (
                  <p>{friendsMessages.deleted}</p>
                ) : (
                  <>
                    <p>Confirmer la suppression</p>
                    <button onClick={handleConfirmUnfriend} type="button">
                      Oui
                    </button>
                    <button onClick={handleCancel} type="button">
                      Non
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
