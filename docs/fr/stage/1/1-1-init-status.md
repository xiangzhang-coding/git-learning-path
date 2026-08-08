---
title: git init et git status
exercises:
  - id: 1-1-e1
    question: Que fait git init ?
    options:
      - Télécharge le code de quelqu'un d'autre
      - Crée le répertoire .git dans le répertoire courant et transforme ce répertoire en dépôt
      - Crée un nouveau fichier
    correct: 1
    explanation: git init initialise un dépôt git vide dans le répertoire courant (il crée le répertoire .git) ; le répertoire et ses sous-répertoires passent dès lors sous contrôle de version.
    anchor: "#git-init-cree-un-depot"
  - id: 1-1-e2
    question: Que t'indique git status ?
    options:
      - La branche courante et les différences entre les trois zones
      - Des métriques de performance sur les fichiers
      - L'état du serveur
    correct: 0
    explanation: "git status est l'une des commandes les plus utilisées : elle affiche la branche courante, les modifications staged, les modifications non staged et les fichiers non suivis."
    anchor: "#git-status-montre-l-etat"
  - id: 1-1-e3
    question: Que signifie qu'un fichier est suivi (tracked) par git ?
    options:
      - Il est dans le fichier .gitignore
      - Il apparaît dans l'historique ou dans la zone de staging de git, qui surveille en continu ses modifications
      - Il est verrouillé et ne peut plus être modifié
    correct: 1
    explanation: Les fichiers tracked sont ceux que git connaît (déjà commités ou présents dans la zone de staging) ; les fichiers untracked sont ceux qui viennent d'apparaître dans le working tree et que git n'a jamais vus.
    anchor: "#git-status-montre-l-etat"
  - id: 1-1-e4
    question: Dans la zone d'entraînement ci-dessous, initialise un dépôt.
    type: task
    scenario: init
    goal: Utilise git init pour transformer le répertoire courant en dépôt git, puis confirme avec git status.
    checks:
      - type: branchIs
        name: main
    explanation: Après l'initialisation, git status affiche On branch main. La zone d'entraînement a déjà préconfiguré user.name et user.email, tu peux donc committer directement.
    anchor: "#git-init-cree-un-depot"
---

# git init et git status

## Objectifs de la leçon

- créer un dépôt avec git init
- comprendre l'état du dépôt avec git status
- distinguer les fichiers tracked et untracked

## git init crée un dépôt

Le point de départ du contrôle de version : dire à git « ce répertoire est sous ta responsabilité ».

```bash
git init
```

Il crée le répertoire `.git` dans le répertoire courant : c'est là que vivent la base de données des objets, l'index, les références, etc. — c'est le dépôt lui-même. Les fichiers du working tree ne sont pas touchés ; à partir de cet instant, chacune de leurs évolutions peut être enregistrée.

## git status montre l'état

`git status` est la commande la plus utilisée : elle te résume d'un coup d'œil les différences entre les trois zones :

- sur quelle branche tu te trouves (On branch ...)
- les modifications staged (Changes to be committed)
- les modifications non staged (Changes not staged for commit)
- les fichiers non suivis (Untracked files)

À retenir : **git ne suit pas automatiquement les nouveaux fichiers**. Un fichier créé doit d'abord passer par `git add` pour entrer dans la zone de staging ; git ne le surveille qu'ensuite.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="init" />

<LessonProgress />
