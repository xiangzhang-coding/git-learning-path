---
title: "git merge : fusionner les branches"
exercises:
  - id: 2-3-e1
    question: Quand se produit une fusion fast-forward ?
    options:
      - Quand la branche courante n'a pas de nouveau commit et que les commits de la branche cible viennent tous après elle
      - À n'importe quel moment
      - Quand les deux branches ont de nouveaux commits
    correct: 0
    explanation: Si main reste en place et que feature ajoute des commits derrière lui, merge n'a qu'à déplacer le pointeur main directement ; l'historique reste une ligne droite, sans nouveau commit.
    anchor: "#la-fusion-fast-forward"
  - id: 2-3-e2
    question: Quand les deux branches ont de nouveaux commits, que produit git merge ?
    options:
      - Un merge commit (un commit de fusion, avec deux parents)
      - Deux nouveaux commits
      - Un tag
    correct: 0
    explanation: "Une fois l'historique divergé, git doit réunir les changements des deux côtés en un seul endroit : cela produit un merge commit à deux parents."
    anchor: "#le-merge-commit"
  - id: 2-3-e3
    question: Dans la zone d'entraînement ci-dessous, fusionne feature dans main (fusion fast-forward).
    type: task
    scenario: merge-ff
    goal: Exécute git merge feature sur main ; après la fusion, le working tree contient feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "La sortie affiche Fast-forward : main n'a pas de nouveau commit, le pointeur avance directement jusqu'à feature, et feature.txt apparaît dans le working tree."
    anchor: "#la-fusion-fast-forward"
  - id: 2-3-e4
    question: Dans la zone d'entraînement ci-dessous, fusionne feature dans main (les deux branches ont divergé).
    type: task
    scenario: merge
    goal: Exécute git merge feature sur main pour faire une fusion classique.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: Cette fois l'historique a divergé, merge produit un merge commit. Sur le graphe de la zone d'entraînement, le merge commit est relié aux deux branches.
    anchor: "#le-merge-commit"
---

# git merge : fusionner les branches

## Objectifs de la leçon

- fusionner une branche dans la branche courante avec git merge
- distinguer la fusion fast-forward du merge commit
- comprendre qu'un merge commit a deux parents

## Le déroulement de base de git merge

```bash
git switch main     # d'abord, revenir sur le côté qui reçoit
git merge feature   # intégrer feature
```

`git merge <branche>` intègre les changements de la branche cible dans la **branche courante**. Il cherche d'abord l'**ancêtre commun** des deux branches, calcule les différences sur trois chemins (ancêtre commun → branche courante, ancêtre commun → branche cible), puis fusionne les changements en une seule version.

## La fusion fast-forward

Si la branche courante n'a pas de nouveau commit et que la branche cible « est simplement allée un peu plus loin » :

```
o  A ← main s'arrête ici
|
o  B ← feature
|
o  C ← feature committe encore
```

`git merge feature` n'a qu'à **déplacer directement** le pointeur `main` jusqu'à C — c'est la fusion fast-forward. La sortie affiche `Fast-forward`, **aucun nouveau commit** n'est créé, et l'historique reste une ligne droite.

## Le merge commit

Si les deux branches ont committé chacune (historique divergé), il n'y a plus de chemin « avancer le pointeur » : git doit composer un nouveau commit avec le contenu des deux côtés :

```
o  A
|\
| o  B (le nouveau commit de main)
o |  C (le nouveau commit de feature)
 \|
  o  M (merge commit, deux parents : B et C)
```

Ce **merge commit** a ceci de particulier : il a deux parents (parent). Sur le graphe de la zone d'entraînement, le commit de fusion est relié aux deux branches à la fois.

## La fusion automatique

Tant que les deux côtés modifient des endroits différents, git fusionne automatiquement les deux changements en une seule version, sans rien vous demander — la sortie ressemble à :

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

Si les deux côtés modifient le même endroit, on entre dans le sujet de la prochaine leçon : le conflit.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="merge" />

<LessonProgress />
