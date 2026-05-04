# INOV Consulting — Web app

Next.js dashboard (authentification, profil, conversations, calendrier, etc.) branchée sur l’API backend INOV.

## Prérequis

- **Node.js** 20 ou supérieur (recommandé pour Next.js 16)
- **npm**, **pnpm**, **yarn**, ou **bun** (le dépôt contient `package-lock.json` et `bun.lock`)

## Démarrage rapide

### 1. Installer les dépendances

Depuis la racine du projet :

```bash
npm install
```

Ou avec Bun :

```bash
bun install
```

### 2. Variables d’environnement

L’application utilise **NextAuth** avec une stratégie JWT. Vous devez définir un secret :

1. Copiez le fichier d’exemple :

   ```bash
   cp .env.example .env.local
   ```

2. Éditez `.env.local` et renseignez **`AUTH_SECRET`** avec une chaîne aléatoire longue (par exemple générée via `openssl rand -base64 32`).

Sans `AUTH_SECRET`, la connexion et les sessions peuvent échouer.

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).

La page de connexion est sur [http://localhost:3000/login](http://localhost:3000/login) (voir `auth.ts` pour la configuration NextAuth).

### 4. Build et production en local

```bash
npm run build
npm run start
```

Le serveur de production écoute par défaut sur le port **3000**.

## Scripts npm

| Script      | Description                          |
| ----------- | ------------------------------------ |
| `npm run dev`   | Serveur de développement (hot reload) |
| `npm run build` | Build de production Next.js          |
| `npm run start` | Lance le build après `build`         |
| `npm run lint`  | ESLint                                 |

## API backend

L’URL de base de l’API est définie dans `lib/api-client.ts` (`API_BASE_URL`). Adaptez-la si vous pointez vers un autre environnement.

## Plus d’infos

- [Documentation Next.js](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
