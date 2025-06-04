"use client"

import { useState } from "react"
import styles from "./InfoForm.module.css"
import { InfoModel } from "@/model/InfoModel"

export default function InfoForm({ info }: { info: InfoModel }) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const handleUpdate = async (title: string, content: string) => {
    const info: InfoModel = new InfoModel(id, title, content)
    await updateOne(info)
    redirect("/infos")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || title.length > 100) return
    setLoading(true)
    await onSubmit(title, content)
    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Titre :
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
      </label>
      <label>
        Contenu :
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "⏳ En cours..." : submitLabel}
      </button>
    </form>
  )
}
