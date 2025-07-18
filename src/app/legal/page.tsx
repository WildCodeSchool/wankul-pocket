import Link from "next/link";
import styles from "./LegalPage.module.css";

export default function Legal() {
  return (
    <>
      <h1 className={styles.title}>Mentions légales</h1>
      <section className={styles.section}>
        <h2>Éditeur de l’application</h2>
        <p>
          <strong>Nom de l&apos;application</strong> : Wankul Pocket <br />
          <strong>Équipe de développement</strong> : Projet réalisé par trois
          étudiants en développement web dans le cadre d’un projet personnel non
          commercial. <br />
          <strong>Responsable de la publication</strong> : L&apos;équipe Wankul
          Pocket <br />
          <strong> Statut</strong> : Projet personnel étudiant (non enregistré
          officiellement)
        </p>
      </section>
      <section className={styles.section}>
        <h2>Hébergement</h2>
        <h3>Hébergement de l’application :</h3>
        <p>
          Vercel Inc. <br /> 340 S Lemon Ave #4133 <br /> Walnut, CA 91789,
          États-Unis <br />
          <Link href={"https://vercel.com"} target="blank">
            https://vercel.com
          </Link>
        </p>
        <h3>Hébergement de la base de données :</h3>
        <p>
          Alwaysdata <br /> 91 rue du Faubourg Saint-Honoré <br /> 75008 Paris,
          France 91789
          <br />
          <Link href={"https://www.alwaysdata.com"} target="blank">
            https://www.alwaysdata.com
          </Link>
        </p>
      </section>
      <section className={styles.section}>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’univers utilisé dans l’application Wankul Pocket est une création
          originale de Wankil Studio (youtubeurs / créateurs des cartes Wankul).{" "}
          <br />
          Nous ne sommes pas affiliés à Wankil Studio et nous ne revendiquons
          aucun droit sur les visuels, les noms ou l’univers Wankul. <br /> Ce
          projet est une création étudiante réalisée à titre non commercial,
          dans un cadre pédagogique. <br />
          Le code de l’application (frontend et backend), ainsi que les
          mécaniques de jeu originales développées pour l’application, sont la
          propriété des développeurs de Wankul Pocket.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Données personnelles</h2>
        <p>
          L’application peut stocker certaines données personnelles
          (pseudonymes, statistiques de jeu, etc.) afin d’assurer le bon
          fonctionnement du jeu. <br /> Ces données sont conservées de manière
          sécurisée et ne sont jamais revendues ni partagées avec des tiers.{" "}
          <br />
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous pouvez demander à accéder, corriger ou supprimer vos
          données à tout moment en nous contactant depuis la page &quot;à
          propos&quot; de l&apos;application.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          L’application n’utilise que des cookies techniques nécessaires à son
          bon fonctionnement. Aucun cookie à but publicitaire ou de tracking
          tiers n’est utilisé.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Limitation de responsabilité</h2>
        <p>
          Ce projet est fourni &quot;en l&apos;état&quot;, sans garantie.
          L’équipe Wankul Pocket ne saurait être tenue responsable en cas de
          bug, perte de données, ou mauvais fonctionnement du service.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Contact</h2>
        <p>
          Les informations de contact des développeurs de l&apos;application
          sont disponibles dans la page &quot;à propos&quot; de
          l&apos;application.
        </p>
      </section>
      <div className={styles.linkContainer}>
        <Link href={"/apropos"} className={styles.backLink}>
          &larr; Retour
        </Link>
      </div>
    </>
  );
}
