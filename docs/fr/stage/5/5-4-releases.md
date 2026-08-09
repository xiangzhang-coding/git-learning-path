---
title: Releases et versions
exercises:
  - id: 5-4-e1
    question: Dans la version sémantique 2.4.1, que représente chaque chiffre ?
    options:
      - 2 est la version majeure (changements cassants), 4 la mineure (nouvelles fonctionnalités), 1 le correctif (bug fixes)
      - 2 est le correctif, 4 la majeure, 1 la mineure
      - les trois chiffres sont équivalents
    correct: 0
    explanation: "MAJOR.MINOR.PATCH : la majeure casse la compatibilité, la mineure ajoute des fonctionnalités, le correctif répare des bugs. Les règles d'incrément font du numéro de version un vecteur d'information de compatibilité."
    anchor: "#version-semantique"
  - id: 5-4-e2
    question: Pour pousser un tag annoté vers le remote, la bonne méthode est ?
    options:
      - d'abord git tag -a v1.0.0 -m "v1.0.0", puis git push origin v1.0.0
      - git push emporte automatiquement tous les tags
      - une fois le tag créé, il n'y a rien à pousser
    correct: 0
    explanation: On crée d'abord le tag, puis on le pousse explicitement ; git push ne pousse pas les tags par défaut (sauf avec git push --tags).
    anchor: "#creer-un-tag-et-le-pousser"
  - id: 5-4-e3
    question: Quelle est la relation entre une Release GitHub et un tag git ?
    options:
      - La Release repose sur un tag et apporte en plus des notes de version et des pièces jointes
      - La Release n'a aucun rapport avec les tags
      - Une Release est une branche
    correct: 0
    explanation: On crée une Release depuis un tag existant, en ajoutant le texte des notes (release notes) et les artefacts binaires, pour former une version officielle.
    anchor: "#creer-une-release"
---

# Releases et versions

## Objectifs de la leçon

- comprendre les règles de la version sémantique
- créer un tag et le pousser vers GitHub
- créer une Release avec notes et pièces jointes

## Version sémantique

Le numéro de version MAJOR.MINOR.PATCH (comme 2.4.1) :

| Position | Quand l'incrémenter |
| --- | --- |
| MAJOR majeure | changement cassant, incompatible avec les versions précédentes |
| MINOR mineure | nouvelle fonctionnalité, rétrocompatible |
| PATCH correctif | bug fixé, sans nouvelle fonctionnalité |

La règle est simple : une majeure qui monte explique « pourquoi votre programme a soudainement cassé », un correctif qui monte veut dire « vous pouvez mettre à jour en toute confiance ».

## Créer un tag et le pousser

Avant de publier, créez le tag en local (vu à l'étape 4) :

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

Notez que `git push` ne pousse pas les tags par défaut : il faut explicitement `git push origin <tag>` (ou tout d'un coup : `git push --tags`).

## Créer une Release

Sur GitHub, page du dépôt → Releases → Draft a new release :

1. choisissez (ou créez) le tag, par exemple v1.0.0
2. écrivez le titre et les notes de version (release notes)
3. vous pouvez joindre des artefacts binaires (installeurs, builds)
4. cliquez sur Publish release

Une Release est « un tag avec des notes » : c'est là que les utilisateurs téléchargent les versions et consultent les changements, sans fouiller dans le git log.

## Comment rédiger les release notes

De bonnes notes de version sont regroupées par public :

- **Nouveautés** (Features) : les nouvelles fonctionnalités, avec liens vers les PR
- **Corrections** (Bug fixes) : ce qui a été réparé, avec liens vers les issues
- **Changements cassants** (Breaking changes) : les points d'attention pour la mise à niveau

## Exercices pratiques

- créez le tag v0.1.0 de votre projet et poussez-le
- créez votre première Release avec des notes en trois sections
- publiez une version de correctif et observez la liste des Releases

## Exercices

<Exercise />

<LessonProgress />
