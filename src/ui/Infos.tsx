"use client"
import Info from "@/ui/Info"
import { InfoModel } from "@/model/InfoModel"
import styles from "./Infos.module.css"
import { useOptimistic, useState } from "react"
import { deleteOne } from "@/service/InfoService"
import { infoMessages } from "@/data/responseMessages"

export default function Infos({ infos }: { infos: InfoModel[] }) {
  const [informations, setInformations] = useState<InfoModel[]>(infos)
  const [optimisticInfos, setOptimisticInfos] =
    useOptimistic<InfoModel[]>(informations)
  const deleteInformation = async (id: number) => {
    try {
      setOptimisticInfos((prev) => prev.filter((info) => info.id !== id))
      const deletedInfo = await deleteOne(id)
      if (deletedInfo.status === 200)
        setInformations((prev) => prev.filter((info) => info.id !== id))
    } catch {
      alert(infoMessages.deleteFail)
    }
  }
  return (
    <ul className={styles.infoList}>
      {optimisticInfos.map((info: InfoModel) => (
        <li key={info.id}>
          <Info deleteInformation={deleteInformation} info={info} />
        </li>
      ))}
    </ul>
  )
}
