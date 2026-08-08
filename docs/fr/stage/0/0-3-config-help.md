---
title: config et help
exercises:
  - id: 0-3-e1
    question: Quelle est la portée de git config --global user.name ?
    options:
      - Uniquement le dépôt courant
      - Tous les dépôts de l'utilisateur courant
      - Tous les utilisateurs de la machine
    correct: 1
    explanation: --global écrit dans ~/.gitconfig et s'applique à tous les dépôts de l'utilisateur courant ; sans l'option, il ne s'applique qu'au dépôt courant (local).
    anchor: "#configuration-avant-le-premier-commit"
  - id: 0-3-e2
    question: Lequel des trois niveaux de configuration a la plus haute priorité ?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: "Plus le niveau est spécifique, plus la priorité est haute : local > global > system. local n'appartient qu'au dépôt courant."
    anchor: "#trois-niveaux-de-configuration"
  - id: 0-3-e3
    question: Quelle commande affiche rapidement le résumé d'utilisation de git commit ?
    options:
      - git commit -h
      - git help commit
      - Les deux fonctionnent
    correct: 2
    explanation: -h affiche le résumé d'utilisation et git help ouvre le manuel complet — les deux sont officiels, choisissez selon vos besoins.
    anchor: "#quand-vous-rencontrez-une-commande-inconnue"
  - id: 0-3-e4
    question: Qu'affiche git config --list ?
    options:
      - Toute la configuration en vigueur
      - Seulement la configuration utilisateur
      - La liste des fichiers du dépôt
    correct: 0
    explanation: --list affiche la configuration effective (le résultat fusionné de local > global > system) — le premier réflexe pour diagnostiquer un problème de configuration.
    anchor: "#configuration-avant-le-premier-commit"
---

# config et help

## Objectifs de la leçon

- Définir user.name et user.email
- Comprendre les niveaux system / global / local
- Utiliser help pour retrouver l'usage des commandes

## Configuration avant le premier commit

Git doit savoir qui a écrit chaque commit — configurez donc une fois :

```bash
git config --global user.name "Votre nom"
git config --global user.email "vous@example.com"
```

`--global` s'applique à tous les dépôts. `git config --list` affiche toute la configuration en vigueur, `git config user.name` une seule entrée.

## Trois niveaux de configuration

La configuration a trois niveaux — **plus c'est spécifique, plus c'est prioritaire** :

| Niveau | Portée | Emplacement |
| --- | --- | --- |
| system | tous les utilisateurs de la machine | `/etc/gitconfig` |
| global | tous les dépôts de l'utilisateur | `~/.gitconfig` |
| local | le dépôt courant | `.git/config` |

La valeur effective se résout dans l'ordre local → global → system.

## Quand vous rencontrez une commande inconnue

- `git help <commande>` : ouvre le manuel complet
- `git <commande> -h` : résumé d'utilisation rapide
- `git help --all` : liste toutes les commandes

Oublier une commande n'est pas grave — savoir la chercher suffit.

## Exercices

<Exercise />

<LessonProgress />
