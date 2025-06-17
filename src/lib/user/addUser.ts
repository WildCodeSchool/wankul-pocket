import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addUser(user: {
  username: string;
  email: string;
  created_at: Date;
  bananas: number;
  profil_picture_id: number;
  profil_id: number;
}) {
  const res = await fetch(apiRoutes.USERS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error(userMessages.addFail);
  return res.json();
}
