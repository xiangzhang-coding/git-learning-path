---
title: Travailler sur une branche
exercises:
  - id: 2-2-e1
    question: Après avoir committé sur la branche feature, le commit apparaît-il en revenant sur main ?
    options:
      - Non, les commits ne tombent que sur la branche courante
      - Oui, toutes les branches partagent le même historique
      - Cela dépend du message de commit
    correct: 0
    explanation: Chaque commit tombe sur le pointeur de la branche courante. Un commit sur feature n'avance que feature ; l'historique de main n'est pas affecté.
    anchor: "#les-commits-ne-tombent-que-sur-la-branche-courante"
  - id: 2-2-e2
    question: Quand les deux branches committent chacune, quelle forme prend le graphe de commits ?
    options:
      - Un DAG (graphe orienté acyclique) qui diverge à partir d'un ancêtre commun
      - Toujours une ligne droite
      - Seul l'historique d'une branche subsiste
    correct: 0
    explanation: Quand les branches avancent chacune de leur côté, l'historique diverge à partir d'un commit commun, formant un arbre qui se divise — dans le monde de git, on appelle cela un DAG.
    anchor: "#divergence-et-graphe-de-commits"
  - id: 2-2-e3
    question: Dans la zone d'entraînement ci-dessous, fais un commit sur la branche feature.
    type: task
    scenario: branching
    goal: "Crée la branche feature et bascule dessus, crée feat.txt (contenu libre), puis committe avec un message contenant \"feat\"."
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: "Après le commit, le graphe de commits sous la zone d'entraînement diverge : le pointeur feature avance d'un cran, main reste en place."
    anchor: "#les-commits-ne-tombent-que-sur-la-branche-courante"
  - id: 2-2-e4
    question: Dans la zone d'entraînement ci-dessous, reviens sur main et garde le working tree propre.
    type: task
    scenario: branching
    goal: Reviens sur main avec git switch main, l'état doit être clean.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Après être revenu sur main, le commit de feature est invisible dans l'historique de main, mais le pointeur de branche existe toujours — vous pouvez y revenir à tout moment.
    anchor: "#les-commits-ne-tombent-que-sur-la-branche-courante"
---

# Travailler sur une branche

## Objectifs de la leçon

- committer sur une branche et comprendre que les commits ne tombent que sur la branche courante
- comprendre la divergence : le graphe de commits diverge à partir d'un ancêtre commun
- observer la structure des branches avec le graphe de commits de la zone d'entraînement

## Les commits ne tombent que sur la branche courante

Une fois la branche créée, **les commits ne tombent que sur la branche courante**. Supposons que `main` est sur le commit A, puis :

```bash
git switch -c feature
# modifier le code
git commit -m "feat: login page"
```

Ce commit ne fait avancer que `feature` ; `main` reste sur A. Revenez sur main : vous ne verrez ni ce commit ni ce fichier — le working tree reprend l'instantané de A.

**C'est précisément l'usage central d'une branche** : expérimenter librement sur feature pendant que main reste stable.

## Divergence et graphe de commits

Quand main et feature committent chacune, l'historique diverge à partir de l'ancêtre commun :

```
o  A (le point de départ commun de main et feature)
|\
o |  B (le nouveau commit de main)
| o  C (le nouveau commit de feature)
```

Cette structure s'appelle le **graphe de commits (commit graph)** ; techniquement, c'est un DAG (graphe orienté acyclique) — chaque commit a au plus deux parents, et il n'y a pas de cycle. Le graphe de commits sous la zone d'entraînement le dessine en temps réel : le nom des branches est affiché directement à l'extrémité de chaque branche.

## git log pour observer l'historique

```bash
git log --oneline
```

`git log` n'affiche que l'historique de la **branche courante**. Basculez sur feature : il affiche la ligne de feature. Revenez sur main : il affiche la ligne de main. Pour voir les commits de toutes les branches, le graphe de la zone d'entraînement est le plus direct.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="branching" />

<LessonProgress />
