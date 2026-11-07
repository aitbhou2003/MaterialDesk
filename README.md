# MaterialDesk — Analyse d'activité avec agrégations MongoDB

Ce projet implémente les pipelines d'agrégation MongoDB pour le centre de prêt **MaterialDesk**, permettant de mesurer les prêts, comparer la rentabilité des catégories, identifier les villes les plus actives, suivre le budget de maintenance et analyser l'évolution temporelle.

---

## 🛠️ 1. Prérequis et Installation

- **Node.js** (v18+)
- **Docker & Docker Compose** (pour l'instance MongoDB locale)

### Cloner et installer les dépendances

```bash
npm install
```

---

## 🐳 2. Démarrage de la Base de Données

Démarrez le conteneur MongoDB avec Docker Compose :

```bash
docker compose up -d
```

> La configuration de connexion est définie dans le fichier `.env` :
> `MONGO_URI=mongodb://materialdesk_admin:ChangeThisLocalPassword123@127.0.0.1:27017/pl_aggregations?authSource=admin`

---

## 🌱 3. Exécution du Seeder (Fixtures)

Pour réinitialiser et charger les 4 collections de données (`members`, `equipments`, `loans`, `maintenance`) :

### Option A : Directement via le conteneur Docker (recommandé si `mongosh` n'est pas installé sur l'hôte)

```bash
docker exec -i materialdesk_mongodb mongosh "mongodb://materialdesk_admin:ChangeThisLocalPassword123@127.0.0.1:27017/pl_aggregations?authSource=admin" < seed.mongosh.js
```

### Option B : Via la commande npm (si `mongosh` est installé localement)

```bash
npm run seed
```

### Vérification des volumes attendus :
- `members` : **4** documents
- `equipments` : **6** documents
- `loans` : **14** documents
- `maintenance` : **8** documents

---

## 📊 4. Exécution des Agrégations

Le runner `run-aggregate.mjs` permet d'exécuter n'importe quel pipeline d'agrégation et d'afficher le résultat sous forme de tableau formaté.

Syntaxe générale :
```bash
node run-aggregate.mjs <nom_collection> <chemin_vers_pipeline>
```

### Exercice 1 — Membres générant le plus de recettes
Classement des membres d'après les prêts rendus et les recettes historiques.
```bash
node run-aggregate.mjs loans exercices/exercice-1.pipeline.mjs
```

### Exercice 2 — Matériel le plus utilisé et le plus rentable
Analyse par catégorie de matériel exploitable (archivés exclus) avec durée moyenne et recettes.
```bash
node run-aggregate.mjs loans exercices/exercice-2.pipeline.mjs
```

### Exercice 3 — Villes ayant les membres les plus actifs
Recettes et prêts rendus admissibles (matériel non archivé et membres actifs uniquement), groupés par ville.
```bash
node run-aggregate.mjs loans exercices/exercice-3.pipeline.mjs
```

### Exercice 4 — Répartition du budget de maintenance
Dépenses d'interventions terminées (`DONE`) par catégorie de matériel exploitable.
```bash
node run-aggregate.mjs maintenance exercices/exercice-4.pipeline.mjs
```
*(Attention : cette agrégation s'exécute sur la collection `maintenance`)*

### Exercice 5 — Évolution de l'activité par mois (Mars et Avril 2026)
Recettes et prêts rendus groupés par mois (`YYYY-MM`) et par catégorie, triés par période croissante.
```bash
node run-aggregate.mjs loans exercices/exercice-5.pipeline.mjs
```

---

## 🚀 5. Lancer l'API Express (Optionnel)

Pour démarrer le serveur Express :

```bash
npm start
```
Le serveur sera accessible sur [http://localhost:3000](http://localhost:3000).
