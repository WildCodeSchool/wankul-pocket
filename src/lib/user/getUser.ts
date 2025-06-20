import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { UserModel } from "@/model/UserModel";

export async function getOne(email: string): Promise<UserModel> {
  const res = await fetch(`${apiRoutes.USERS}/${email}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(userMessages.notFound || "Utilisateur non trouvé");
  }

  if (!res.ok) {
    throw new Error(userMessages.error);
  }

  return res.json();
}
