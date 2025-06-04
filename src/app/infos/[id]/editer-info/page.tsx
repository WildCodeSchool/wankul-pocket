// app/infos/[id]/editer-info/page.tsx
import { notFound } from "next/navigation"
import styles from "./EditInfoPage.module.css"
import { InfoModel } from "@/model/InfoModel"
import { getOneById } from "@/service/InfoService"
import EditInfoForm from "@/ui/EditInfoForm"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditInfoPage({ params }: PageProps) {
  const idNum = parseInt(params.id, 10)
  if (isNaN(idNum)) {
    return notFound()
  }

  let info: InfoModel
  try {
    info = await getOneById(idNum)
  } catch {
    return notFound()
  }

  return (
    <main className={styles.container}>
      <h1>Modifier l&#39;information #{info.id}</h1>
      <EditInfoForm initialData={info} />
    </main>
  )
}
