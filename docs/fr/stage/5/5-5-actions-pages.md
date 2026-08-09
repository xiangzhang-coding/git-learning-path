---
title: GitHub Actions et Pages
exercises:
  - id: 5-5-e1
    question: Où se trouve le fichier de workflow de GitHub Actions ?
    options:
      - Dans le répertoire .github/workflows/ du dépôt, au format YAML
      - Dans un fichier .yml situé n'importe où
      - À la racine uniquement, et il doit s'appeler main.yml
    correct: 0
    explanation: Le workflow s'écrit dans .github/workflows/*.yml et est déclenché par des événements (comme push, pull_request).
    anchor: "#le-fichier-workflow"
  - id: 5-5-e2
    question: Quelle est la relation entre job et step dans un workflow ?
    options:
      - job est une tâche (parallélisable, exécutée sur une machine), step est une action élémentaire du job
      - job est une action, step est une machine
      - les deux sont la même chose
    correct: 0
    explanation: "Un workflow est composé de jobs, un job de steps (chaque step exécute une commande ou réutilise une action) ; les jobs peuvent déclarer des dépendances entre eux."
    anchor: "#le-fichier-workflow"
  - id: 5-5-e3
    question: Le déploiement du site de ce cours (GitHub Pages) relève de quel scénario ?
    options:
      - Un push déclenche Actions pour construire le site et le publier sur Pages
      - Il faut acheter son propre serveur
      - Il faut uploader les fichiers à la main à chaque fois
    correct: 0
    explanation: Un commit déclenche Actions qui construit et déploie automatiquement sur Pages — c'est ainsi que le site de ce cours est déployé.
    anchor: "#deployer-github-pages"
---

# GitHub Actions et Pages

## Objectifs de la leçon

- comprendre ce qu'est Actions et comment des événements déclenchent des workflow
- lire la structure d'un fichier workflow
- découvrir le déploiement de GitHub Pages avec Actions

## Qu'est-ce que GitHub Actions ?

GitHub Actions est la CI/CD intégrée : des événements du dépôt (push, pull_request, planification, manuel) déclenchent des tâches automatisées — exécuter des tests, construire, publier, déployer. Le site de cours que vous êtes en train de lire est construit par Actions et déployé sur Pages.

## Le fichier workflow

Le workflow est défini dans un fichier YAML sous `.github/workflows/` (par exemple deploy.yml) :

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
```

Structure : `on` déclare les événements déclencheurs ; `jobs` définit les tâches (parallélisables, chacune sur une machine) ; `steps` sont les actions élémentaires d'une tâche (`run` exécute une commande, `uses` réutilise une action écrite par la communauté).

## Événements déclencheurs courants

- `push` : déclenché à chaque push (filtrable par branche)
- `pull_request` : quand un PR s'ouvre ou se met à jour
- `schedule` : déclenchement planifié (syntaxe cron)
- `workflow_dispatch` : déclenchement manuel par un clic

## Déployer GitHub Pages

Deux voies pour le déploiement Pages : activer Pages dans les réglages du dépôt et publier directement la branche, ou utiliser Actions pour publier les artefacts construits. La seconde est plus courante (on exécute d'abord les tests et le build, puis on publie les artefacts sur Pages) :

```
push ──▶ déclenchement du workflow ──▶ installation des dépendances → build → publication des artefacts sur Pages
```

L'état du déploiement, les journaux et les causes d'échec sont dans l'onglet Actions du dépôt. La petite coche verte (✓/✗) à côté des commits est l'entrée vers le résultat des vérifications.

## Exercices pratiques

- créez `.github/workflows/deploy.yml` dans un dépôt pour déployer une page statique
- cassez volontairement le build et observez le journal d'échec d'Actions
- ajoutez à votre dépôt d'entraînement un workflow qui exécute des tests

## Exercices

<Exercise />

<LessonProgress />
