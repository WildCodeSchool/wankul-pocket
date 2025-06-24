"use client";

import { useState } from "react";
import { refuseFriendRequest } from "@/service/FriendsService";
import styles from "./Unfriend.module.css";

interface UnfriendProps {
  userId: number;
}

export default function Unfriend({ userId }: UnfriendProps) {
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function handleConfirmUnfriend() {
    try {
      await refuseFriendRequest(userId);
      setDeleted(true);
      setTimeout(() => {
        setShowModal(false);
        setDeleted(false);
      }, 2000);
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
      <button onClick={handleButtonClick} className={styles.unfriendButton}>
        <img src="/unfriend.png" alt="Unfriend" />
      </button>
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              {deleted ? (
                <p>utilisateur supprimé</p>
              ) : (
                <>
                  <p>Confirmer la suppression</p>
                  <button onClick={handleConfirmUnfriend}>Oui</button>
                  <button onClick={handleCancel}>Non</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
