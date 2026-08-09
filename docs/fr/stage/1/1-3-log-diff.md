---
title: git log et git diff
exercises:
  - id: 1-3-e1
    question: Que montre git log --oneline ?
    options:
      - "Un commit par ligne : hash court + message de commit"
      - Le contenu complet des fichiers
      - Le nom de la branche courante
    correct: 0
    explanation: git log liste l'historique des commits ; --oneline le condense en une ligne par commit (hash court + message), c'est le mode de consultation le plus courant au quotidien.
    anchor: "#git-log-affiche-l-historique"
  - id: 1-3-e2
    question: Que montre git diff ?
    options:
      - Les différences de contenu entre le working tree et la zone de staging
      - Les différences dans l'historique des commits
      - Les différences d'encodage des fichiers
    correct: 0
    explanation: git diff compare le working tree à la zone de staging (modifications non staged) ; git diff --staged compare la zone de staging à HEAD (modifications staged).
    anchor: "#git-diff-affiche-les-modifications"
  - id: 1-3-e3
    question: Dans la zone d'entraînement ci-dessous, modifie src/a.js et committe avec un message contenant « fix ».
    type: task
    scenario: history
    goal: "Remplace const a = 2 par const a = 3 dans src/a.js, puis effectue git add et git commit avec le message \"fix: bump a\"."
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: Après le commit, l'historique passe à 5 commits ; la première ligne de git log --oneline est ton nouveau commit.
    anchor: "#git-log-affiche-l-historique"
  - id: 1-3-e4
    question: Que montre git show <commit> ?
    options:
      - "Les détails complets du commit : auteur, date, message, diff des modifications"
      - La liste de tous les fichiers du dépôt
      - Le graphe de commits de la branche courante
    correct: 0
    explanation: "git show déplie un commit : l'en-tête contient l'auteur et la date, en dessous le diff par rapport au commit parent — la façon standard de voir « ce que ce commit a vraiment changé »."
    anchor: "#git-show-inspecte-un-commit"
  - id: 1-3-e5
    question: À quoi sert git blame <fichier> ?
    options:
      - "Annote chaque ligne avec le commit et l'auteur qui l'ont modifiée en dernier"
      - Supprimer les lignes vides d'un fichier
      - Comparer les différences entre deux fichiers
    correct: 0
    explanation: "blame rend compte ligne par ligne : le préfixe de chaque ligne est « hash court du dernier commit l'ayant modifiée + auteur » — très utile pour savoir « qui a modifié cette ligne et pourquoi »."
    anchor: "#git-blame-retrace-l-origine-des-lignes"
---

# git log et git diff

## Objectifs de la leçon

- consulter l'historique des commits avec git log
- consulter le contenu des modifications avec git diff
- consulter le détail d'un commit précis avec git show
- retracer l'origine de chaque ligne avec git blame
- connaître le hash court et le modèle des snapshots

## git log affiche l'historique

```bash
git log              # historique complet (auteur, date)
git log --oneline    # un commit par ligne : hash court + message
```

Le hash SHA-1 de chaque commit est sa carte d'identité. `git log --oneline` affiche les 7 premiers caractères du hash (le hash court) — largement suffisant pour identifier un commit de façon unique.

## git diff affiche les modifications

```bash
git diff             # working tree vs zone de staging (modifications non staged)
git diff --staged    # zone de staging vs HEAD (modifications staged mais non commitées)
```

Dans la sortie, les lignes commençant par `-` ont été supprimées, celles commençant par `+` ont été ajoutées. Vérifier avec diff ce que l'on a changé avant de committer est une habitude standard.

## git show inspecte un commit

```bash
git show <commit>    # consulter le détail d'un commit
git show HEAD        # le commit le plus récent
```

`git show` déplie un commit : l'en-tête contient le hash du commit, l'auteur, la date et le message ; en dessous, le diff par rapport à son commit parent — ce qui répond exactement à « qu'est-ce que ce commit a réellement changé ». Combiné aux hash fournis par git log, vous pouvez remonter n'importe quelle modification.

## git blame retrace l'origine des lignes

```bash
git blame <fichier>   # annoter l'origine de chaque ligne
```

blame ajoute un préfixe à chaque ligne du fichier : **le hash court du dernier commit ayant modifié cette ligne + l'auteur**. Quand vous voulez savoir « qui a modifié cette ligne, par quel commit a-t-elle été introduite », blame répond en un coup d'œil — un point de départ courant pour traquer un bug en production.

## Le modèle des snapshots

Chaque commit enregistre un **instantané complet**, pas un diff. git hache le contenu avec SHA-1 : contenu identique, hash identique — le hash permet donc de vérifier l'intégrité et de dédupliquer le stockage. C'est aussi ce qui rend le « distribué » possible : l'historique de n'importe quel clone est complet et entièrement reconstruisible.

<SnapshotVisual />

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="history" />

<LessonProgress />
