"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { InfoModel } from "@/model/InfoModel"
import { formMessages } from "@/data/formMessages"
import { infoMessages } from "@/data/responseMessages"
import styles from "./Form.module.css"
import { editOne } from "@/service/InfoService"
import { appRoutes } from "@/data/ROUTES"

export default function EditInfoForm({
  initialData,
}: {
  initialData: InfoModel
}) {
  const router = useRouter()
  const [formState, setFormState] = useState<{
    title: string
    content: string
  }>({
    title: initialData.title,
    content: initialData.content,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const { title, content } = formState

    if (!title.trim() || !content.trim()) {
      setError(formMessages.requiredInput)
      return
    }
    if (title.trim().length > 100) {
      setError(formMessages.titleTooLong)
      return
    }

    try {
      await editOne({
        id: initialData.id,
        title: title.trim(),
        content: content.trim(),
      } as InfoModel)
      setSuccess(infoMessages.updateSuccess)
      setTimeout(() => {
        router.push(appRoutes.INFOS)
      }, 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : infoMessages.editFail)
    }
  }

  return (
    <section className={styles.container}>
      {success ? (
        <p className={styles.success}>{success}</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">
            Titre
            <input
              id="title"
              name="title"
              type="text"
              maxLength={100}
              value={formState.title}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="content">
            Contenu
            <textarea
              id="content"
              name="content"
              value={formState.content}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Mettre à jour</button>
        </form>
      )}
    </section>
  )
}
