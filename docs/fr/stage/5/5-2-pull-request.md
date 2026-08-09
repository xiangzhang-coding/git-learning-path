---
title: Flux de travail Pull Request
exercises:
  - id: 5-2-e1
    question: Qu'est-ce qu'une Pull Request (PR) ?
    options:
      - Une demande de fusion de vos commits, sur une branche, dans une autre branche du dépôt cible
      - Écraser le dépôt de quelqu'un d'autre dans votre environnement local
      - La fonction de chat de groupe de GitHub
    correct: 0
    explanation: "Le PR est une demande formelle « fusionnez mes commits », accompagnée de la comparaison de code, de la discussion et des résultats des vérifications automatiques."
    anchor: "#qu-est-ce-qu-une-pull-request"
  - id: 5-2-e2
    question: À propos des méthodes de fusion d'un PR, laquelle est correcte ?
    options:
      - Create a merge commit conserve la fourche et le commit de merge, Rebase and merge rend l'historique linéaire
      - Squash and merge conserve chaque commit d'origine
      - La méthode de fusion ne change rien à l'historique
    correct: 0
    explanation: "Les trois méthodes donnent des historiques différents : merge commit conserve la fourche, squash regroupe en un seul commit, rebase rejoue linéairement."
    anchor: "#fusionner-et-fermer"
  - id: 5-2-e3
    question: Après une demande de modification du mainteneur, comment mettre à jour un PR déjà ouvert ?
    options:
      - Continuer à committer sur la branche du PR et pousser, le PR se met à jour automatiquement
      - Créer un nouveau PR
      - Modifier le titre du PR suffit
    correct: 0
    explanation: "Le PR est une fenêtre sur la branche : dès qu'on pousse de nouveaux commits sur cette branche, la comparaison du PR se met à jour automatiquement."
    anchor: "#mettre-a-jour-la-branche-du-pr"
---

# Flux de travail Pull Request

## Objectifs de la leçon

- comprendre le rôle du PR dans la collaboration
- parcourir tout le flux « créer une branche → pousser → ouvrir un PR → discuter → fusionner »
- connaître les trois méthodes de fusion et la mise à jour de la branche du PR

## Qu'est-ce qu'une pull request ?

Une Pull Request (PR) est une demande formelle « fusionnez mes commits dans votre dépôt ». Vous n'avez pas le droit d'écrire directement dans le dépôt de quelqu'un d'autre, mais vous pouvez soumettre un PR, et le mainteneur décide après review de fusionner ou non :

```
branche de votre fork ──push──▶ votre fork
                                 │ ouvrir un PR
                                 ▼
              main du dépôt de l'auteur (en attente de review et de merge)
```

Le PR n'est pas qu'un commit : il contient la comparaison de code (diff), la discussion et les résultats des vérifications automatiques (CI) — c'est l'unité centrale de la collaboration open source.

## Ouvrir un PR

Prérequis : pousser la branche de travail vers votre fork :

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

De retour sur GitHub, le bouton Compare & pull request apparaît sur la page du dépôt. Choisissez la base (branche cible, par exemple main du dépôt de l'auteur) et le compare (votre branche), écrivez un titre et une description, puis créez le PR.

## Review et discussion

Le PR est un lieu de discussion : le mainteneur peut commenter des lignes de code précises (line comments), demander des modifications (request changes) ou approuver (approve). Chacun de vos nouveaux commits entre dans le fil de discussion ; une fois résolu, vous pouvez @mentionner l'autre partie pour une nouvelle review.

## Fusionner et fermer

Il existe trois méthodes de fusion, à l'historique différent :

| Méthode | Historique |
| --- | --- |
| Create a merge commit | conserve la fourche, crée un commit de merge |
| Squash and merge | regroupe tout en un seul commit |
| Rebase and merge | rejoue linéairement, sans commit de merge |

Après la fusion, GitHub suggère en général de supprimer la branche. Un PR peut aussi être simplement fermé (closed) sans fusion — par exemple quand l'approche est abandonnée.

## Mettre à jour la branche du PR

Quand le mainteneur demande des modifications, pas besoin de rouvrir un PR : continuez à committer sur la branche et poussez, le PR se met à jour automatiquement :

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## Exercices pratiques

- poussez une branche de fonctionnalité sur GitHub et soumettez un vrai PR au dépôt
- laissez un commentaire sur une ligne de code du PR, vivez le flux de discussion
- comparez les trois méthodes de fusion et les historiques différents qu'elles produisent

## Exercices

<Exercise />

<LessonProgress />
