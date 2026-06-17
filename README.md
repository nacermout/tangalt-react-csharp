# Tangalt UI — React 18 + TypeScript

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel)

Frontend React/TypeScript pour Tangalt — magazine littéraire bilingue (FR / Tamazight).
Consomme l'API ASP.NET Core. Déployé sur Vercel.

## 🌐 Démo live

- **Site** : https://tangalt-react-csharp.vercel.app
- **API Backend** : https://tangalt-dotnet-rebuild-production.up.railway.app

## 🛠 Stack

| Couche        | Technologie              |
|---------------|--------------------------|
| Framework     | React 18                 |
| Langage       | TypeScript 5             |
| Build tool    | Vite                     |
| Styles        | Tailwind CSS             |
| HTTP          | Axios                    |
| Routing       | React Router v6          |
| Déploiement   | Vercel                   |

## 📁 Structure

```
src/
├── components/
│   ├── Header.tsx       # Navigation + toggle FR/TIZ + dark mode
│   ├── ArticleCard.tsx  # Carte article (titre, extrait, auteur)
│   └── ArticleDetail.tsx# Page article complète
├── pages/
│   ├── Home.tsx         # Listing articles
│   ├── Admin.tsx        # Dashboard CRUD (protégé JWT)
│   └── Login.tsx        # Authentification
├── services/
│   └── api.ts           # Instance Axios + appels API
├── types/
│   └── index.ts         # Interfaces TypeScript (Article, Author...)
└── App.tsx              # Routes + contexte auth
```

## ✨ Fonctionnalités

- **Listing articles** avec badges par catégorie
- **Toggle FR / Tamazight** — bascule la langue d'affichage
- **Dark / Light mode** — persisté en localStorage
- **Admin CRUD** — créer, modifier, supprimer des articles
- **Auth JWT** — login, token stocké, routes protégées
- **Responsive** — mobile first, Tailwind CSS
- **Bilingue** — contenu FR + Tamazight (transcription latine)

## 🚀 Lancer en local

```bash
# Prérequis : Node.js 18+
git clone https://github.com/nacermout/tangalt-react-csharp.git
cd tangalt-react-csharp

npm install

# Créer .env.local
echo "VITE_API_URL=http://localhost:8080" > .env.local

npm run dev
# App sur http://localhost:5173
```

## 🔗 Repos liés

- Backend API : [tangalt-dotnet-rebuild](https://github.com/nacermout/tangalt-dotnet-rebuild)

---
Nacer M. · 2026 · nacermout/tangalt-react-csharp