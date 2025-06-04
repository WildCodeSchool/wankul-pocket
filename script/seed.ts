import "dotenv/config"
import mysql from "mysql2/promise"

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env

const seedData = [
  {
    title: "Partial Prerendering",
    content:
      "Next.js 15 introduit le rendu partiel côté serveur pour une expérience utilisateur ultra fluide.",
  },
  {
    title: "React 19 intégré",
    content:
      "Next.js 15 exploite React 19 pour des performances boostées avec le streaming SSR natif.",
  },
  {
    title: "App Router standard",
    content:
      "L'ancien Pages Router est maintenant remplacé par App Router dans toutes les nouvelles apps Next.js.",
  },
  {
    title: "Layouts imbriqués",
    content:
      "Chaque répertoire peut contenir son propre layout, favorisant un design modulaire et cohérent.",
  },
  {
    title: "Templates dynamiques",
    content:
      "Utilisez les fichiers `template.tsx` pour définir des structures alternatives à vos layouts classiques.",
  },
  {
    title: "Middleware puissant",
    content:
      "Appliquez des middlewares pour gérer l'authentification, les redirections ou le tracking sans affecter le rendu.",
  },
  {
    title: "Composants Server & Client",
    content:
      "Next.js 15 sépare proprement les composants Client et Server pour optimiser le rendu et la sécurité.",
  },
  {
    title: "Optimisation des images",
    content:
      "Le composant <Image /> optimise automatiquement le format, la taille et le lazy loading des visuels.",
  },
  {
    title: "API routes encore utiles",
    content:
      "Même avec App Router, les routes API sont toujours là pour gérer les petits besoins backend.",
  },
  {
    title: "TypeScript par défaut",
    content:
      "Next.js initialise automatiquement votre projet avec TypeScript et ESLint configurés.",
  },
]

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    })

    await db.query("DELETE FROM info")

    for (const { title, content } of seedData) {
      await db.query("INSERT INTO info (title, content) VALUES (?, ?)", [
        title,
        content,
      ])
    }

    await db.end()
    console.log("🌱 Database seeded successfully")
  } catch (err) {
    console.error("❌ Error during seeding:", err)
  }
}

seed()
