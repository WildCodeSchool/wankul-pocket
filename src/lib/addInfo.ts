import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "@/data/ROUTES"

export async function addInfo(info: { title: string; content: string }) {
  const res = await fetch(apiRoutes.INFOS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })

  if (!res.ok) throw new Error(infoMessages.addFail)
  return res.json()
}
