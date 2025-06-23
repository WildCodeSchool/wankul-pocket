"use client";

import { useState } from "react";

export default function FriendRequest() {
  const [profileID, setProfileID] = useState("");
  const [error, setError] = useState("");

  const profileIDRegex = /^[a-zA-Z0-9-]{19}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileID(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileIDRegex.test(profileID)) {
      setError(
        "Le profilID doit contenir exactement 19 caractères : lettres, chiffres ou tirets."
      );
      return;
    }
    setProfileID("");
  };

  return (
    <div>
      <h1>Friend Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={profileID}
          onChange={handleChange}
          placeholder="Entrer le profilID"
          maxLength={19}
          minLength={19}
          pattern="[a-zA-Z0-9-]{19}"
          required
        />
        <button type="submit">Envoyer demande d'ami</button>
      </form>
      {error}
    </div>
  );
}
