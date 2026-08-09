---
title: "git worktree : plusieurs working trees"
exercises:
  - id: 4-5-e1
    question: Qu'est-ce qu'un worktree ?
    options:
      - Un répertoire de travail supplémentaire qui partage les objets et les refs du même dépôt
      - Une copie du dépôt avec sa propre histoire
      - Une branche temporaire pour des expériences
    correct: 0
    explanation: "git worktree add crée un autre répertoire de travail qui lit et écrit dans le même dépôt (objets et refs partagés), mais conserve son propre HEAD et son propre index."
    anchor: "#un-depot-un-working-tree"
  - id: 4-5-e2
    question: Peut-on extraire la même branche dans deux worktrees à la fois ?
    options:
      - "Non, git refuse : une branche ne peut être extraite que dans un seul worktree"
      - Oui, les deux peuvent travailler dessus et fusionner plus tard
      - Seulement si la branche n'a pas encore été poussée
    correct: 0
    explanation: "chaque branche ne peut être extraite que dans exactement un worktree — sinon deux worktrees écraseraient les commits de l'autre pour la même branche."
    anchor: "#git-worktree-add-un-second-worktree"
  - id: 4-5-e3
    question: Que se passe-t-il si vous exécutez git worktree remove sur un worktree contenant des modifications non commitées ?
    options:
      - git refuse et conserve le worktree jusqu'à ce que vous gériez les modifications
      - git supprime les modifications en même temps que le worktree
      - git committe les modifications automatiquement
    correct: 0
    explanation: "par sécurité, remove refuse tant que des modifications ne sont pas commitées — committez, stashiez, ou passez -f (force) si vous voulez vraiment les abandonner."
    anchor: "#git-worktree-remove-nettoyer"
---

# git worktree : plusieurs working trees

## Objectifs de la leçon

- Créer des répertoires de travail supplémentaires pour le même dépôt avec git worktree
- Comprendre que tous les worktrees partagent les objets et les refs mais conservent des HEAD séparés
- Lister et nettoyer les worktrees ; comprendre pourquoi les agents les utilisent

## Un dépôt, un working tree

Par défaut, un dépôt signifie un répertoire de travail. Vous extrayez une branche, éditez des fichiers, committez — et quand vous avez besoin d'une autre branche, vous faites `git switch` et tout le répertoire change de contenu.

Ce changement a un coût : le travail en cours sur la branche courante doit d'abord être committé ou stashé, et les deux branches partagent le même répertoire, donc vous ne pouvez jamais voir deux branches à la fois.

`git worktree` brise cette règle du un pour un. Un **worktree** est un répertoire de travail supplémentaire rattaché au même dépôt :

```
your project/            <- main working tree (the original one)
├── .git/                <- shared: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- second worktree (added by git worktree add)
└── src/  (branch hotfix)   <- different branch, different directory
```

Tous les worktrees **partagent la même base d'objets et les mêmes refs** — un commit fait dans un worktree est visible dans tous les autres — mais chaque worktree a **son propre HEAD et son propre index**, si bien que chacun peut se trouver sur une branche différente sans déranger les autres.

## git worktree add : un second worktree

```bash
git worktree add <path> <branch>
```

Crée un nouveau répertoire de travail à `<path>` et y extrait `<branch>`. Quelques formes courantes :

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

Détails utiles :

- Si la branche existe déjà, le chemin doit être vide — git ne va pas écraser un répertoire qui contient des fichiers.
- Une branche ne peut être extraite que dans **un seul worktree**. Tenter d'extraire la même branche dans un second worktree échoue avec `fatal: '<branch>' is already checked out at ...`.
- Quand vous faites `git clone`, le clone est un dépôt séparé complet ; un worktree **n'est pas** un clone — il n'a pas de dossier `.git` propre, il pointe vers celui du dépôt parent.

## git worktree list : voir tous les worktrees

```bash
git worktree list
```

Affiche chaque worktree rattaché au dépôt, avec son chemin, la branche extraite, et lequel est le worktree principal :

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

Le worktree principal est le répertoire où le dépôt a été initialement cloné ou créé — il ne peut pas être supprimé.

## git worktree remove : nettoyer

```bash
git worktree remove <path>
```

Supprime le répertoire de travail et désenregistre le worktree. Deux garde-fous :

- Le répertoire ne doit contenir ni fichiers non suivis ni fichiers modifiés — sinon git refuse et vous demande de committer, de stasher ou d'utiliser `-f`.
- `git worktree remove -f <path>` supprime même avec des modifications, en les abandonnant.

Un worktree supprimé laisse la branche (et ses commits) tranquille : le pointeur de branche existe toujours dans le dépôt, prêt à être extrait plus tard dans le worktree principal.

## Pourquoi les agents adorent les worktrees

Les agents de codage IA (Claude Code, Cursor et autres) travaillent souvent sur plusieurs tâches à la fois. Sans worktrees, un agent qui change de tâche doit committer ou stasher, changer de branche, puis démêler les modifications plus tard — et une erreur peut mélanger les éditions d'une tâche dans le commit d'une autre branche.

Avec `git worktree add`, chaque tâche obtient **son propre répertoire et sa propre branche**, entièrement isolés :

- L'agent de la tâche A édite `../task-a` sur la branche `feature/login`
- L'agent de la tâche B édite `../task-b` sur la branche `fix/typo`
- Les deux commits atterrissent dans le même dépôt ; aucun ne peut toucher aux fichiers de l'autre

Quand vous révisez le résultat, chaque branche est une unité propre — et vous gardez une seule histoire partagée à pousser. Cette isolation explique pourquoi les workflows basés sur les worktrees sont devenus la norme du développement piloté par les agents.

## Quand utiliser les worktrees

Utilisez-les quand :

- Vous devez travailler sur deux branches en même temps (un hotfix pendant que le travail sur la fonctionnalité continue)
- Vous lancez de longs tests ou un serveur de dev dans un worktree tout en continuant à éditer dans un autre
- Des agents ou des outils d'équipe exécutent des tâches isolées en parallèle

Évitez-les quand : une seule tâche à la fois est la norme — les répertoires supplémentaires ajoutent de la paperasse sans bénéfice.

## Exercices

<Exercise />

<LessonProgress />
