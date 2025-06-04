import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "@/data/ROUTES"

export async function deleteInfo(id: number) {
  const res = await fetch(`${apiRoutes.INFOS}?id=${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error(infoMessages.deleteFail)
  return { response: res.json(), status: 200 }
}
