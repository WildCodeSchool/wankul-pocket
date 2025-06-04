import Infos from "@/ui/Infos"
import styles from "./InfoPage.module.css"
import { getall } from "@/service/InfoService"
import { appRoutes } from "@/data/ROUTES"

export default async function InformationsPage() {
  const infos = await getall()
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Next JS 15 : Fun Facts</h1>
      {/* add a button leading to appRoutes.INFOS_ADD the button is a + emoji */}
      <div className={styles.addButton}>
        <a href={appRoutes.INFOS_ADD} className={styles.addLink}>
          ➕ Ajouter une info
        </a>
      </div>
      <div>
        <Infos infos={infos} />
      </div>
    </section>
  )
}
