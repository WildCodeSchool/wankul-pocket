"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./Add.module.css"
import { addOne } from "@/service/InfoService"
import { formMessages } from "@/data/formMessages"
import { infoMessages } from "@/data/responseMessages"

export default function AddInfoPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title")?.toString().trim() || ""
    const content = formData.get("content")?.toString().trim() || ""
    if (!title || !content) {
      setError(formMessages.requiredInput)
      return
    }
    if (title.length > 100) {
      setError(formMessages.titleTooLong)
      return
    }

    try {
      await addOne({ title, content })
      setSuccess(infoMessages.addSuccess)
      setTimeout(() => {
        router.push("/infos")
      }, 1500)
    } catch {
      setError(infoMessages.addFail)
    }
  }

  return (
    <section className={styles.container}>
      {success ? (
        <p className={styles.success}>
          {success} Vous allez être redirigés vers la page infos
        </p>
      ) : (
        <>
          <h1>Ajouter une information</h1>
          <form action={handleSubmit} className={styles.form}>
            <label htmlFor="title">
              Titre
              <input
                id="title"
                name="title"
                type="text"
                maxLength={100}
                required
              />
            </label>
            <label htmlFor="content">
              Contenu
              <textarea name="content" id="content" required />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Ajouter</button>
          </form>
        </>
      )}
    </section>
  )
}
