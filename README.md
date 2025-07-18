ICI ON TEST

# Scholar Next.js - Projet Pédagogique

Ce projet est une application développée avec **Next.js 15**. Il s'agit d'un support d'apprentissage pour comprendre l'utilisation des routes API, des composants Server & Client, de la base de données MySQL.

## Prérequis

- Node.js >= 18
- npm >= 9
- MySQL Server installé
- Connaissances de base en React, SQL, gestion de fichiers et terminal

## Installation & Utilisation

1. Cloner le projet
2. Copier le fichier `.env.sample` en `.env` et compléter les informations de connexion à la base de données
3. Lancer la migration et l'hydratation :
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## Merci et bon code !

Ce projet a été généré avec soin par [J_Maniak](https://www.twitch.tv/j_maniak) en collaboration avec ChatGPT.
