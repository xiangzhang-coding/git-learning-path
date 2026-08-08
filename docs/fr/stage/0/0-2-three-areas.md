---
title: Le modèle des trois zones
exercises:
  - id: 0-2-e1
    question: Dans quelle zone se trouvent les fichiers que vous éditez en ce moment ?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 0
    explanation: Le working tree est l'endroit où vous éditez les fichiers ; la staging area est la liste des modifications préparées ; le repository stocke l'historique committé.
    anchor: "#les-trois-zones"
  - id: 0-2-e2
    question: Que déplace git add ?
    options:
      - Les modifications du working tree vers la staging area
      - Les modifications de la staging area vers le repository
      - Les modifications du repository vers le working tree
    correct: 0
    explanation: git add enregistre les modifications du working tree dans la staging area ; c'est git commit qui écrit l'historique (staging area → repository).
    anchor: "#les-trois-zones"
  - id: 0-2-e3
    question: Que déplace git commit ?
    options:
      - Working tree → staging area
      - Staging area → repository
      - Il abandonne les modifications
    correct: 1
    explanation: commit regroupe les modifications en attente en un commit stocké dans le repository (le dossier .git) — un snapshot dans l'historique.
    anchor: "#les-trois-zones"
  - id: 0-2-e4
    question: Quel est le plus grand avantage de la staging area ?
    options:
      - Elle rend le commit plus laborieux
      - Elle permet de séparer les commits, l'historique reste propre
      - Elle corrige les erreurs automatiquement
    correct: 1
    explanation: Vous avez modifié deux fonctionnalités indépendantes ? Ajoutez et committez d'abord la première, puis la seconde — chaque commit reste lisible et annulable.
    anchor: "#pourquoi-une-zone-supplémentaire"
---

# Le modèle des trois zones

## Objectifs de la leçon

- Connaître le working tree, la staging area et le repository
- Comprendre ce que déplacent git add et git commit
- Savoir ce qu'affiche git status

## Les trois zones

Git divise un dépôt en trois zones :

- **Working tree** : les fichiers que vous éditez — c'est ce que modifie votre éditeur
- **Staging area (aussi appelée index)** : la liste des modifications choisies pour le prochain commit
- **Repository (le dossier `.git`)** : les snapshots de l'historique committé

`git status` montre exactement les différences entre ces zones : fichiers modifiés mais non ajoutés, ajoutés mais non committés.

## Pourquoi une zone supplémentaire ?

La staging area permet de **committer par morceaux** : vous avez modifié deux fonctionnalités sans rapport, ajoutez et committez d'abord la première, puis la seconde — chaque commit de l'historique reste propre, lisible et annulable. Sans elle, une session d'édition devient un seul commit fourre-tout (« encore des modifs »).

## Animation : les trois zones

Cliquez les boutons et regardez le fichier se déplacer entre les zones : l'édition se produit dans le working tree, `git add` l'enregistre dans la staging area, et seul `git commit` écrit l'historique.

<ThreeAreas />

## Exercices

<Exercise />

<LessonProgress />
