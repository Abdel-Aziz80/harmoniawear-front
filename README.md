🛍️ HarmoniaWear — Projet e-commerce (TP DWWM)

Projet full-stack (React + Vite / Node.js + Express / PostgreSQL + Prisma).
Objectif : boutique (collections, fiche produit, panier, compte client, commandes).

🔌 Ports & URLs (défaut)
Service	URL / Port
Front (Vite)	http://localhost:**3000
**
API Backend	http://localhost:**4000
**
Prisma Studio	http://localhost:**5555
**
PostgreSQL (local)	localhost:**5000** 



✅ Prérequis

Node.js ≥ 18

PostgreSQL (local ou Docker)

Git

📦 Installation
git clone https://github.com/Abdel-Aziz80/harmoniawear-front.git
cd harmoniawear-front

1) Backend (API)
cd harmoniawear-backend
npm install


Créer harmoniawear-backend/.env (adapte USER/PASSWORD/PORT DB) :

# PostgreSQL local 
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/harmoniawear?schema=public"

# API
PORT=4000
JWT_SECRET="change_me_en_secret_long_et_unique"
FRONT_URL="http://localhost:3000"


Initialisation DB + client Prisma + seed :

npx prisma generate
npx prisma db push
npm run db:seed


Démarrer l’API (dev) :

npm run dev
# -> http://localhost:4000


Prisma Studio (optionnel) :

npx prisma studio --port 5555
# -> http://localhost:5555

2) Frontend (Vite + React)

Reviens à la racine du projet front :

cd ..
npm install


Créer .env (à la racine du front) :

VITE_API_URL=http://localhost:4000


Scripts (déjà configurés) — le port front est 3000 :

{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview"
  }
}


Lancer le front :

npm run dev
# -> http://localhost:3000

🧭 Structure (résumé)
harmoniawear-front/
├─ harmoniawear-backend/
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.js
│  ├─ src/
│  │  ├─ controllers/ (auth, product, user, order)
│  │  ├─ routes/ (authRoutes, productRoutes, userRoutes, orderRoutes)
│  │  └─ middlewares/ (requireAuth.js)
│  └─ server.js
├─ src/
│  ├─ components/ (layout, ui, common)
│  ├─ contexts/ (AuthContext.jsx, CartContext.jsx, ProductsContext.jsx)
│  ├─ pages/ (... Login, Register, Account, Cart, Checkout, ProductDetail,
│  │           Femme, Homme, Enfant, Collections, CGV, Confidentialite,
│  │           MentionsLegales, About, etc.)
│  ├─ services/ (api.js)
│  └─ utils/ (formatters.js, constants.js)
└─ README.md

🔐 Comptes de test (si seed)

Admin : admin@harmoniawear.com / admin123

Client : demo@harmoniawear.com / demo123


🛣️ Endpoints (rappel)

Auth :
POST /api/auth/register — inscription
POST /api/auth/login — connexion
GET /api/auth/me — profil courant (JWT)
POST /api/auth/forgot-password — demande reset
POST /api/auth/reset-password — reset via token

Produits :
GET /api/products — liste
GET /api/products/:id — détail

Commandes :
GET /api/orders — mes commandes (JWT)
POST /api/orders — créer une commande

Utilisateur :
PUT /api/users/me — MAJ profil

🧪 Démarrage rapide

cd harmoniawear-backend && npm i && npx prisma generate && npx prisma db push && npm run db:seed && npm run dev

cd .. && npm i && npm run dev

Front : http://localhost:3000
 — API : http://localhost:4000
 — Studio : http://localhost:5555

🆘 Dépannage

CORS : FRONT_URL dans le .env backend doit exactement matcher l’URL front (http + port).

DB refuse la connexion : vérifie DATABASE_URL (user, pass, port 5000/5432, base harmoniawear).

Front ne s’ouvre pas sur 3000 : port déjà occupé → change le script vite --port 3001 et mets FRONT_URL=http://localhost:3001 côté backend.

Prisma Client introuvable : npx prisma generate après toute modif schema.prisma.

Panier / Auth : vérifie que VITE_API_URL pointe bien sur http://localhost:4000 et que le JWT est présent en localStorage après login.