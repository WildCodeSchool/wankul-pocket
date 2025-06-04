import { apiRoutes } from "@/data/ROUTES"
import { infoMessages } from "@/data/responseMessages"
import { InfoModel } from "@/model/InfoModel"

export async function patchInfo(info: InfoModel): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.INFOS, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(info),
  })

  if (res.status === 404) {
    throw new Error(infoMessages.notFound || "Info non trouvée")
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const errMsg = (data as { error?: string }).error || infoMessages.error
    throw new Error(errMsg)
  }

  return res.json()
}
