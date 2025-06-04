"use client"

import styles from "./Info.module.css"
import Loader from "./Loader"
import { useTransition } from "react"
import { InfoModel } from "@/model/InfoModel"
import Link from "next/link"
import { appRoutes } from "@/data/ROUTES"

export default function Info({
  info,
  deleteInformation,
}: {
  info: InfoModel
  deleteInformation: (id: number) => void
}) {
  const [loading, startTransition] = useTransition()

  const handleDelete = async () => {
    if (confirm("Supprimer cette info ?")) {
      startTransition(async () => {
        deleteInformation(info.id)
      })
    }
  }

  return (
    <article className={styles.card}>
      <Link href={appRoutes.INFOS_ID(info.id)}>
        <h2 className={styles.title}>{info.title}</h2>
        <p className={styles.content}>{info.content}</p>
      </Link>
      <button
        disabled={loading}
        className={styles.deleteButton}
        onClick={handleDelete}
      >
        {loading ? <Loader /> : "🗑 Supprimer"}
      </button>
      <Link className={styles.editLink} href={appRoutes.INFOS_EDIT(info.id)}>
        ✏️ Éditer
      </Link>
    </article>
  )
}
