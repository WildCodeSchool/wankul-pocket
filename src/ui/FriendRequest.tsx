"use client";

import styles from "./FriendRequest.module.css";

import { useUserContext } from "@/context/UserContext";
import { friendsMessages } from "@/data/responseMessages";
import { FriendPayload } from "@/model/FriendPayload";
import { FriendsModel } from "@/model/FriendsModel";
import { addOne } from "@/service/FriendsService";
import { useState } from "react";

export default function FriendRequest() {
  const [targetProfileID, setProfileID] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUserContext();

  const profileIDRegex = /^[a-zA-Z0-9-]{19}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileID(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    if (!profileIDRegex.test(targetProfileID)) {
      setError(
        "Le profilID doit contenir exactement 19 caractères : lettres, chiffres ou tirets."
      );
      return;
    }
    if (!user?.profil_id) {
      setError("Votre profil utilisateur est introuvable.");
      return;
    }
    if (targetProfileID === user.profil_id) {
      setError("Vous ne pouvez pas vous ajouter en ami.");
      return;
    }
    setProfileID("");

    try {
      const friend = new FriendsModel(
        0,
        user.profil_id,
        targetProfileID,
        true,
        false
      );
      const friendPayload: FriendPayload = {
        user_profil_id: friend.user_profil_id,
        friend_profil_id: friend.friend_profil_id,
        status: friend.status,
        acceptance: friend.acceptance,
      };
      const response = await addOne(friendPayload);
      if (response.error) {
        setError(response.error || friendsMessages.alreadyFriends);
        setSuccess("");
      } else {
        setSuccess(friendsMessages.addFriendSuccess);
        setError("");
      }
    } catch (err: unknown) {
      setError(friendsMessages.addFail);
      console.error("Erreur : ", err);
      setSuccess("");
    }
  };

  return (
    <div className={styles.friendRequestContainer}>
      <h2>Ajouter un ami</h2>

      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={targetProfileID}
          onChange={handleChange}
          placeholder="Entrer le Code Ami"
          maxLength={19}
          minLength={19}
          pattern="[a-zA-Z0-9-]{19}"
          required
          className={styles.inputField}
        />
        <button type="submit">Envoyer</button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
    </div>
  );
}
