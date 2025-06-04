import { notFound } from "next/navigation"
import { InfoModel } from "@/model/InfoModel"
import styles from "./InfoDetail.module.css"
import { getOneById } from "@/service/InfoService"
import { infoMessages } from "@/data/responseMessages"

interface PageParams {
  params: {
    id: string
  }
}

export default async function InfoDetailPage({ params }: PageParams) {
  const idNum = parseInt(params.id, 10)
  if (isNaN(idNum)) {
    notFound()
  }

  let info: InfoModel
  try {
    info = await getOneById(idNum)
  } catch (err: unknown) {
    console.error(infoMessages.errorDetail, err)
    return notFound()
  }

  return (
    <main className={styles.container}>
      <h1>Détails de l’information #{info.id}</h1>
      <article className={styles.card}>
        <h2>{info.title}</h2>
        <p>{info.content}</p>
      </article>
    </main>
  )
}
