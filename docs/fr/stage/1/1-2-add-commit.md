---
title: git add et git commit
exercises:
  - id: 1-2-e1
    question: Dans quelle zone git add place-t-il les modifications ?
    options:
      - working tree
      - staging area (zone de staging)
      - repository (dépôt)
    correct: 1
    explanation: "git add enregistre les modifications du working tree dans la zone de staging : « ces modifications sont prêtes à être commitées »."
    anchor: "#git-add-met-en-attente-les-modifications"
  - id: 1-2-e2
    question: À quoi sert le paramètre -m de git commit ?
    options:
      - Fusionner deux branches
      - Écrire un texte de description pour ce commit
      - Modifier l'auteur du commit
    correct: 1
    explanation: -m fournit le message de commit (commit message), qui décrit ce que fait ce commit. Un bon message s'adresse aux autres — y compris à ton futur toi.
    anchor: "#git-commit-enregistre-un-instantane"
  - id: 1-2-e3
    question: Dans la zone d'entraînement ci-dessous, mets todo.txt en staging.
    type: task
    scenario: add-commit
    goal: Utilise git add todo.txt pour ajouter le fichier à la zone de staging.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: Une fois staged, todo.txt apparaît sous Changes to be committed dans git status.
    anchor: "#git-add-met-en-attente-les-modifications"
  - id: 1-2-e4
    question: Dans la zone d'entraînement ci-dessous, committe todo.txt avec un message contenant « todo ».
    type: task
    scenario: add-commit
    goal: "Fais git add todo.txt puis git commit -m \"feat: add todo\" pour committer."
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: "Après le commit, todo.txt entre dans l'historique du dépôt. À noter : la modification de hello.txt reste dans le working tree, sans être commitée — un commit n'embarque que le contenu de la zone de staging."
    anchor: "#git-commit-enregistre-un-instantane"
---

# git add et git commit

## Objectifs de la leçon

- ajouter les modifications à la zone de staging avec git add
- enregistrer un instantané avec git commit
- comprendre qu'un commit ne contient que le contenu de la zone de staging

## git add met en attente les modifications

```bash
git add <nom-de-fichier>  # met un seul fichier en staging
git add .                 # met toutes les modifications du répertoire courant en staging
```

`git add` enregistre les modifications du working tree dans la **zone de staging (staging area)**. Tu peux staguer au choix : trois fonctionnalités modifiées, tu n'ajoutes que l'une d'elles au commit, et l'historique reste propre.

## git commit enregistre un instantané

```bash
git commit -m "feat: add login page"
```

`git commit` empaquette le contenu de la **zone de staging** en un commit et l'écrit dans l'historique du dépôt. Chaque commit :

- enregistre un **instantané (snapshot)** complet de tous les fichiers du projet (pas un diff)
- est identifié par un hash SHA-1 unique (ex. `4a2b9c1`)
- conserve l'auteur, la date et le message de commit

**Règle clé : un commit ne contient que le contenu de la zone de staging.** Les modifications faites dans le working tree sans `git add` n'entreront pas dans ce commit.

## Comment écrire un bon message de commit

En une phrase, dis clairement « ce qui a été fait » : commence par un verbe, garde un temps uniforme, et reste sous 50 caractères. Par exemple `fix: correct the login validation`.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="add-commit" />

<LessonProgress />
