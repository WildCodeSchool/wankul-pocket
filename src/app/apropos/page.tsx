import Image from "next/image";
import Link from "next/link";
import styles from "./AproposPage.module.css";

export default function Apropos() {
  return (
    <>
      <h1 className={styles.title}>A propos de Wankul Pocket</h1>
      <section className={styles.updateSection}>
        <h2>Dernières mises à jour</h2>
        <p>
          Depuis notre dernière mise à jour, les joueurs bénéficient des
          fonctionnalités suivantes :
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
          d’études. Nous ne tirons aucun bénéfice de cette application et ne
          sommes en aucun cas affiliés à Wankul.
        </p>
        <ul className={styles.avatars}>
          <li>
            <Image
              src={"/jordanCard.png"}
              alt={"Jordan"}
              height={209}
              width={150}
            />
            <div className={styles.linksContainer}>
              <Link
                href={"https://www.linkedin.com/in/jordan-pieton-005946121/"}
                target="blank"
              >
                <Image
                  src={"/linkedIn.png"}
                  alt="LinkedIn"
                  height={32}
                  width={32}
                />
              </Link>
              <Link href={"https://github.com/Jordan-182"} target="blank">
                <Image
                  src={"/github.png"}
                  alt="Github"
                  height={32}
                  width={32}
                />
              </Link>
            </div>
          </li>
          <li>
            <Image
              src={"/julesCard.png"}
              alt={"Jules"}
              height={209}
              width={150}
            />
            <div className={styles.linksContainer}>
              <Link
                href={"https://www.linkedin.com/in/jules-clauwaert/"}
                target="blank"
              >
                <Image
                  src={"/linkedIn.png"}
                  alt="LinkedIn"
                  height={32}
                  width={32}
                />
              </Link>
              <Link href={"https://github.com/Salvak613"} target="blank">
                <Image
                  src={"/github.png"}
                  alt="Github"
                  height={32}
                  width={32}
                />
              </Link>
            </div>
          </li>
          <li>
            <Image
              src={"/salahCard.png"}
              alt={"Salah"}
              height={209}
              width={150}
            />
            <div className={styles.linksContainer}>
              <Link
                href={
                  "https://www.linkedin.com/in/salahedine-imoussaine-78b7a21b9/"
                }
                target="blank"
              >
                <Image
                  src={"/linkedIn.png"}
                  alt="LinkedIn"
                  height={32}
                  width={32}
                />
              </Link>
              <Link href={"https://github.com/salah-hnt"} target="blank">
                <Image
                  src={"/github.png"}
                  alt="Github"
                  height={32}
                  width={32}
                />
              </Link>
            </div>
          </li>
        </ul>
      </section>
      <section className={styles.legalSection}>
        <h2>Mentions légales</h2>
        <p>
          Vous pouvez consulter les mentions légales de notre application sur{" "}
          <Link href={"/legal"}>
            <strong>cette page</strong>
          </Link>
          .
        </p>
      </section>
    </>
  );
}
