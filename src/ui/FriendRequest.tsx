"use client";

import { useState } from "react";
import { addOne } from "@/service/FriendsService";
import { friendsMessages } from "@/data/responseMessages";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function FriendRequest() {
  const [targetProfileID, setProfileID] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUserContext();
  const router = useRouter();

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
      const response = await addOne({
        user_profil_id: user.profil_id,
        friend_profil_id: targetProfileID,
        status: true,
        acceptance: false,
      });
      if (response.error) {
        setError(response.error || friendsMessages.alreadyFriends);
        setSuccess("");
      } else {
        setSuccess(friendsMessages.addFriendSuccess);
        setError("");
      }
    } catch (err: any) {
      setError(friendsMessages.addFail);
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Friend Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={targetProfileID}
          onChange={handleChange}
          placeholder="Entrer le profilID"
          maxLength={19}
          minLength={19}
          pattern="[a-zA-Z0-9-]{19}"
          required
        />
        <button type="submit">Envoyer demande d'ami</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </div>
  );
}
