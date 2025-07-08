import { userMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { UserModel } from "@/model/UserModel";

export async function addBananas(user: UserModel): Promise<UserModel> {
  const response = await fetch(apiRoutes.ADD_BANANAS(user.email), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      email: user.email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(userMessages.addBananasFail + errorData.message);
  }

  const updatedUser = await response.json();
  return updatedUser;
}
