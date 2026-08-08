---
title: "git clone : cloner un dépôt"
exercises:
  - id: 3-2-e1
    question: Que fait git clone ?
    options:
      - Copie entièrement le dépôt distant en local (historique + working tree) et configure origin automatiquement
      - Télécharge seulement le dernier commit
      - Envoie le dépôt local vers un remote
    correct: 0
    explanation: "clone copie tout l'historique, sort le working tree de la branche par défaut, nomme le remote origin automatiquement et crée le tracking branch."
    anchor: "#git-clone-tout-copier-d-un-coup"
  - id: 3-2-e2
    question: Après un clone, qu'est-ce qu'origin/main ?
    options:
      - "Un tracking branch : l'image locale qui enregistre « vers quel commit pointe main côté distant »"
      - Un dossier dans le dépôt distant
      - Une nouvelle branche locale sur laquelle on peut committer directement
    correct: 0
    explanation: "refs/remotes/origin/main est une image de suivi en lecture seule, qui enregistre la position de main côté distant au moment du clone ou du fetch."
    anchor: "#le-tracking-branch-origin-main"
  - id: 3-2-e3
    question: Dans la zone d'entraînement ci-dessous, clone le dépôt distant et entre dans le dossier cloné.
    type: task
    scenario: clone
    goal: "Exécute git clone /origin, puis cd origin pour entrer dans le dépôt cloné, et vérifie avec git status que vous êtes sur main."
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: "Après le clone, entre dans le nouveau dossier (cd) : vous êtes dans une copie complète de l'historique — le remote origin est déjà configuré."
    anchor: "#git-clone-tout-copier-d-un-coup"
---

# git clone : cloner un dépôt

## Objectifs de la leçon

- copier un dépôt distant en local avec git clone
- comprendre origin et le tracking branch origin/main
- comprendre qu'après un clone, il faut cd pour entrer dans le nouveau dossier

## git clone : tout copier d'un coup

```bash
git clone /origin          # crée un sous-dossier origin/ dans le dossier courant et y clone
git clone /origin mon-projet   # on peut aussi donner un nom de dossier
cd origin                  # entrer dans le dépôt cloné
```

`git clone <adresse>` fait quatre choses en une fois :

1. crée un nouveau dossier en local (par défaut, le dernier segment de l'adresse)
2. copie **tout l'historique** du remote
3. sort le working tree de la branche par défaut (généralement main)
4. nomme le remote **origin** automatiquement et crée le tracking branch

clone est l'entrée standard pour « rejoindre un projet existant » — pas besoin de `git init`, tout vient du remote.

## Le tracking branch origin/main

Au moment du clone, git enregistre, pour chaque branche distante, le commit sur lequel elle pointe, sous forme de **tracking branch** :

```
refs/remotes/origin/main   # image en lecture seule : la position actuelle de main côté distant
```

Il est différent d'une branche locale (`refs/heads/main`) : **vos commits ne le déplacent pas**, seuls `git fetch`, `git pull` et `git push` le mettent à jour. À tout moment, `git log origin/main` vous montre « à quoi ressemble le remote ».

## Copier vs se connecter

clone est une **copie** : le dépôt cloné est totalement indépendant, et sa seule attache avec le remote est l'adresse origin. Vos commits ne vont pas automatiquement chez le remote, et les nouveaux commits du remote n'apparaissent pas tout seuls — les trois prochaines leçons (fetch, push, pull) font le transport dans ces deux sens.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="clone" />

<LessonProgress />
