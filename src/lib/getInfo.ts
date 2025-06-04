import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "@/data/ROUTES"
import { InfoModel } from "@/model/InfoModel"

export async function getOne(id: number): Promise<InfoModel> {
  const res = await fetch(`${apiRoutes.INFOS}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (res.status === 404) {
    throw new Error(infoMessages.notFound || "Information non trouvée")
  }

  if (!res.ok) {
    throw new Error(infoMessages.error)
  }

  return res.json()
}
