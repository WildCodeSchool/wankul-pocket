import styles from "./AproposPage.module.css";

export default function Apropos() {
  return (
    <>
      <h1 className={styles.title}>A propos de Wankul Pocket</h1>
      <section className={styles.updateSection}>
        <h2>Dernières mises à jour</h2>
        <p>
          Depuis notre dernière mise à jour, les joueurs bénéficient des
          fonctionnailtés suivantes :
        </p>
        <ul>
          <li>
            - <strong>Amis</strong> : les joueurs peuvent s&apos;ajouter en amis
          </li>
          <li>
            - <strong>Echanges</strong> : les joueurs peuvent échanger des
            cartes avec leurs amis
          </li>
          <li>
            - <strong>Quêtes</strong> : les joueurs peuvent réaliser des quêtes
            pour remporter des bananes
          </li>
        </ul>
      </section>
      <section className={styles.teamSection}>
        <h2>L&apos;équipe</h2>
        <p>
          Cette application n’est pas officielle, nous sommes trois développeurs
          web en formation, et ce projet constitue notre travail de fin
          d’études.
        </p>
      </section>
    </>
  );
}
