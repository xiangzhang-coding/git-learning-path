---
title: git branch et git switch
exercises:
  - id: 2-1-e1
    question: Qu'affiche git branch ?
    options:
      - La liste de toutes les branches, la branche courante marquée d'une *
      - La liste de tous les commits
      - Les modifications non commitées
    correct: 0
    explanation: git branch liste les branches du dépôt et marque d'une * celle sur laquelle vous vous trouvez actuellement.
    anchor: "#git-branch-consulter-et-creer-des-branches"
  - id: 2-1-e2
    question: Qu'est-ce qu'une branche, au fond ?
    options:
      - Un pointeur mobile vers un commit
      - Une copie complète du code
      - Un dossier indépendant
    correct: 0
    explanation: Une branche n'est qu'un pointeur vers un commit. Créer une branche ne copie aucun fichier, c'est donc très léger.
    anchor: "#la-branche-est-un-pointeur"
  - id: 2-1-e3
    question: Dans la zone d'entraînement ci-dessous, crée la branche feature et bascule dessus.
    type: task
    scenario: branching
    goal: Utilise git switch -c feature pour « créer et basculer » en une seule fois.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature équivaut à « créer la branche feature + basculer dessus ». HEAD pointe maintenant sur feature.
    anchor: "#git-switch-changer-de-branche"
  - id: 2-1-e4
    question: Dans la zone d'entraînement ci-dessous, reviens sur la branche main.
    type: task
    scenario: branching
    goal: Utilise git switch main pour revenir sur main.
    checks:
      - type: branchIs
        name: main
    explanation: Changer de branche ne fait que déplacer HEAD et le contenu du working tree ; les commits restent sur leurs branches respectives.
    anchor: "#git-switch-changer-de-branche"
---

# git branch et git switch

## Objectifs de la leçon

- consulter et créer des branches avec git branch
- changer de branche avec git switch
- comprendre qu'une branche est un pointeur, et que HEAD indique la position actuelle

## La branche est un pointeur

Une branche (branch) est au fond un **pointeur mobile vers un commit**. Créer une branche ne copie aucun fichier : cela ajoute juste un nom, qui pointe vers le commit courant :

```bash
git branch feature
```

Cette commande enregistre dans le dépôt un nom `feature` qui pointe vers le commit où se trouve HEAD. Ensuite, quand vous committez sur `feature`, le pointeur `feature` avance avec vous.

**Concept clé : une branche n'a pas de « code qui lui appartient »** — c'est seulement un repère de position dans l'historique. Pour un même working tree, changez de nom de branche, et les fichiers visibles sont l'instantané pointé par cette branche.

## git branch : consulter et créer des branches

```bash
git branch        # liste toutes les branches, la branche courante est marquée *
git branch <nom>  # crée une branche (sans y basculer)
```

La liste ressemble à :

```
* main
  feature
```

Créer une branche n'enregistre qu'un pointeur : cela **ne bascule pas** dessus. Pour y aller, utilisez switch.

## git switch : changer de branche

```bash
git switch <nom>     # bascule vers une branche existante
git switch -c <nom>  # crée et bascule (le plus courant)
```

- `git switch feature` : HEAD se déplace sur `feature`, les fichiers du working tree sont remplacés par l'instantané pointé par cette branche
- `git switch -c feature` : crée une nouvelle branche et bascule immédiatement dessus, équivaut à `git branch feature` + `git switch feature`

**Ancienne syntaxe** : `git checkout <nom>` et `git checkout -b <nom>` sont les anciennes commandes équivalentes ; `git switch` est la commande récente recommandée, et la zone de pratique supporte les deux. `git checkout` sert aussi à « restaurer des fichiers », rôle repris par `git restore` (chapitre 1).

Si le working tree contient des modifications non commitées au moment de basculer, git refuse et vous demande de committer ou de mettre de côté (stash) — car en changeant d'instantané, vos modifications n'auraient nulle part où aller.

## HEAD pointe vers la position actuelle

**HEAD** est un pointeur spécial qui marque « sur quelle branche, sur quel commit vous êtes en ce moment ». Le `On branch feature` en tête de `git status` est la réponse de HEAD. Changer de branche, c'est déplacer le pointeur HEAD.

<HeadVisual />

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="branching" />

<LessonProgress />
