interface UpdateUsernamePayload {
  email: string;
  username: string;
}

export async function updateUsername({
  email,
  username,
}: UpdateUsernamePayload): Promise<void> {
  const res = await fetch("/api/profil", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message =
      data.error || "Erreur lors de la mise à jour du nom d'utilisateur";
    throw new Error(message);
  }
}
