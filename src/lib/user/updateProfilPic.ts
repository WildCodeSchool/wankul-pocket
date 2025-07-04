import { apiRoutes } from "@/data/ROUTES";
import { userMessages } from "@/data/responseMessages";

interface UpdateProfilPicture {
  profil_picture_id: number | null;
  email: string | undefined;
}

export async function updateProfilPicture(
  UpdateProfilPicture: UpdateProfilPicture
): Promise<{ message: string }> {
  const userMail = UpdateProfilPicture.email;
  const res = await fetch(`${apiRoutes.USERS}/${userMail}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(UpdateProfilPicture),
  });

  if (res.status === 404) {
    throw new Error(userMessages.notFound || "Image non trouvée");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || userMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
