# GIB Menuiseries Demo

Base front premium statique pour GIB Menuiseries Services.

Objectif : montrer les produits et realisations, qualifier le besoin, proposer une simulation demonstrable et pousser vers une demande de devis, sans backend bloquant.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router en `HashRouter`
- Assets locaux absorbes depuis le site officiel GIB
- Fallbacks locaux par categorie
- Admin demo via `localStorage`
- Deploiement GitHub Pages par workflow GitHub Actions

## Modules livrés

- Home premium
- Galerie premium filtrable avec lightbox
- Fiches produits
- Simulation locale demonstrable
- Demande de devis locale
- Admin demo lisant `localStorage`

## Commandes

```bash
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## GitHub Pages

Le projet est prepare pour un repo project page GitHub Pages :

- base Vite : `/gib-menuiseries-demo/`
- routing : `HashRouter`
- workflow : `.github/workflows/deploy.yml`

URL attendue apres publication :

- `https://cvlad97.github.io/gib-menuiseries-demo/`

## Structure utile

```text
src/
  components/
  data/
  lib/
  pages/
  types/
public/
  fallbacks/
  media/gib/
.github/workflows/
```

## Donnees demo

Les leads devis et simulations sont stockes dans `localStorage`.

- leads : `gib-demo-leads`
- simulations : `gib-demo-simulations`

L ecran admin demo permet :

- lecture des leads devis
- lecture des simulations
- changement de statut
- ouverture d un WhatsApp pre-rempli vers le numero public GIB
- chargement d un petit jeu de donnees demo

## Limites actuelles

- pas de backend
- pas d ingestion Instagram active
- pas de CRM branche
- pas de vrai tunnel devis envoye cote serveur

## Suite logique

1. publier sur GitHub Pages
2. brancher un vrai stockage leads/simulations si necessaire
3. injecter une source Instagram controlee
4. ajouter un back-office reel si la demo devient tunnel de prod
