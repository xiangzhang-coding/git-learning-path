---
title: "git remote : le dépôt distant"
exercises:
  - id: 3-1-e1
    question: Qu'est-ce qu'un remote ?
    options:
      - Un emplacement distant qui contient une copie du dépôt (un autre dépôt, généralement sur un serveur)
      - Un dossier local
      - Une commande interne de git pour compresser un dépôt
    correct: 0
    explanation: "remote, c'est l'emplacement de « l'autre dépôt ». git s'en sert pour pousser et tirer des commits ; origin est le nom de remote par défaut après un clone."
    anchor: "#qu-est-ce-qu-un-remote"
  - id: 3-1-e2
    question: Que montre git remote -v ?
    options:
      - Le nom et l'adresse de tous les remotes
      - La liste de toutes les branches
      - Tous les commits du remote
    correct: 0
    explanation: git remote -v liste le nom et l'adresse de chaque remote, ainsi que sa configuration pour fetch et push.
    anchor: "#git-remote-voir-et-ajouter"
  - id: 3-1-e3
    question: Dans la zone d'entraînement ci-dessous, ajoute un remote nommé origin.
    type: task
    scenario: remote
    goal: "Enregistre le remote avec git remote add origin /origin, puis vérifie avec git remote -v."
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: "remote add enregistre seulement l'adresse, il n'envoie aucune donnée. Ensuite, fetch, push et pull savent où aller."
    anchor: "#git-remote-voir-et-ajouter"
---

# git remote : le dépôt distant

## Objectifs de la leçon

- comprendre ce qu'est un remote : l'emplacement d'un autre dépôt
- enregistrer un remote avec git remote add
- consulter la configuration avec git remote -v

## Qu'est-ce qu'un remote ?

Jusqu'ici, tous vos commits se trouvent dans **un seul dépôt, sur votre machine**. Un vrai projet se travaille à plusieurs : chacun a son dépôt, et il existe un « dépôt partagé » qui sert de point d'échange — c'est le remote.

remote (dépôt distant) est essentiellement **l'adresse d'un autre dépôt git**. git n'a pas de « cloud » en lui-même : n'importe quelle machine (ou n'importe quel dossier) peut jouer le rôle de remote. Votre dépôt y fait référence par un nom, dont la valeur par défaut est **origin** (attribué automatiquement au clone).

Dans la zone d'entraînement de cette leçon, `/origin` est l'emplacement de ce dépôt distant — un dépôt en mémoire indépendant du `/repo` local. **Vous ne pouvez pas `cd` dans le dépôt distant** : il ne contient que l'historique, pas de copie de travail (comme un vrai dépôt nu ou un dépôt sur un serveur). Vous travaillez sur la copie locale et échangez des données avec lui via des commandes git.

## git remote : voir et ajouter

```bash
git remote                  # lister les noms de remotes
git remote -v               # lister les noms + les adresses (une ligne pour fetch, une pour push)
git remote add <nom> <adresse>   # enregistrer un nouveau remote
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` enregistre seulement l'adresse, **il n'envoie aucune donnée**. Il écrit la configuration dans `.git/config` :

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Retenir deux rôles

| Nom | Signification |
| --- | --- |
| branche locale | `refs/heads/main`, vos commits tombent ici |
| remote | l'adresse du dépôt distant, par exemple `/origin` |
| tracking branch | `refs/remotes/origin/main`, l'image locale qui enregistre « où pointe main côté distant » |

Le tracking branch est la clé des prochaines leçons (clone, fetch) : il vous permet de voir « à quoi ressemble le remote » même sans connexion.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="remote" />

<LessonProgress />
