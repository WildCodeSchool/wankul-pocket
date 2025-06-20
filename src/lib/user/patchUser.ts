import { apiRoutes } from "@/data/ROUTES";
import { userMessages } from "@/data/responseMessages";
import { UserModel } from "@/model/UserModel";

export async function patchUser(user: UserModel): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.USERS, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status === 404) {
    throw new Error(userMessages.notFound || "Utilisateur non trouvé");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || userMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
