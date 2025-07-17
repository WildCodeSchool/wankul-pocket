import { apiRoutes } from "@/data/ROUTES";
import { collectionMessages } from "@/data/responseMessages";

export type UpdatedCard = {
  id: number;
  quantity: number;
  user_id?: number;
};

export async function patchCollection(
  email: string,
  updatedCard: UpdatedCard
): Promise<{ message: string }> {
  const res = await fetch(`${apiRoutes.USERS}/${email}/collections`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedCard),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg =
      (data as { error?: string }).error || collectionMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
