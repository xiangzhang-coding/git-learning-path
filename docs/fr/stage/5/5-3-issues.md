---
title: 5-3 Issues et collaboration
exercises:
  - id: 5-3-e1
    question: Quel est l'usage typique d'une issue GitHub ?
    options:
      - Signaler des bugs, proposer des fonctionnalités, discuter de tâches précises
      - Stocker des sauvegardes de code
      - Écrire les journaux des commits
    correct: 0
    explanation: "Une issue est un fil de discussion autour d'un problème précis : elle peut être assignée, étiquetée, placée dans une milestone et liée à un PR."
    anchor: "#qu-est-ce-qu-une-issue"
  - id: 5-3-e2
    question: Pour fermer automatiquement une issue à la fusion d'un PR, la bonne pratique est ?
    options:
      - 'Écrire "fixes #12" dans la description du PR ou dans le message du commit associé'
      - Mentionner le numéro du PR dans un commentaire de l'issue
      - On ne peut fermer une issue qu'à la main
    correct: 0
    explanation: GitHub reconnaît les mots-clés closes, fixes, resolves suivis du numéro d'issue ; à la fusion du PR, l'issue correspondante se ferme automatiquement.
    anchor: "#fermer-une-issue-avec-un-pr"
  - id: 5-3-e3
    question: Quels sont les rôles respectifs de label et milestone ?
    options:
      - label classe les issues (ex. bug, feature), milestone regroupe un ensemble d'issues vers un objectif de version
      - label est un marqueur de permission, milestone une ligne de temps
      - les deux servent à mettre des étoiles sur le dépôt
    correct: 0
    explanation: "Les labels facilitent le filtrage et le classement ; les milestones expriment « ce qu'il faut accomplir pour cette version » et correspondent souvent à une Release."
    anchor: "#labels-et-milestones"
---

# Issues et collaboration

## Objectifs de la leçon

- comprendre ce qu'est une issue et comment en ouvrir une
- organiser les tâches avec label et milestone
- associer un PR à une issue avec « fixes #numéro »

## Qu'est-ce qu'une issue ?

Une issue est un fil de discussion dans le dépôt : signaler un bug, proposer une fonctionnalité, discuter d'une tâche précise. Chaque issue a un numéro (ex. #12), un titre, une description et des commentaires ; on peut aussi lui assigner une personne, lui mettre des labels et la placer dans une milestone.

## Ouvrir une issue

Sur la page du dépôt : Issues → New issue. Une bonne description d'issue contient : quel est le problème, comment le reproduire, quel comportement est attendu. Beaucoup de dépôts fournissent des modèles d'issue (rapport de bug / demande de fonctionnalité) ; les remplir améliore nettement l'efficacité du traitement.

## Labels et milestones

- **label (étiquette)** : classe les issues, par exemple bug, enhancement, good first issue. Le filtrage par label est le principal moyen pour un mainteneur d'organiser son travail.
- **milestone (étape de version)** : regroupe un ensemble d'issues vers le même objectif de version, comme v1.2.0. La milestone affiche une progression (x/y issues terminées).

## Fermer une issue avec un PR

Dans la description du PR (ou dans le message du commit associé), écrivez :

```
fixes #12
```

GitHub associe alors le PR à l'issue 12 ; à la fusion du PR, l'issue se ferme automatiquement. Les mots-clés synonymes sont closes, resolves. Ainsi, « quelle modification a résolu quel problème » reste traçable dans l'historique.

## Un aperçu du flux de collaboration

```
bug détecté → ouvrir une issue (#12) → le mainteneur ajoute label + milestone
  → le contributeur crée une branche et corrige le bug → PR avec « fixes #12 » dans la description
  → fusion → l'issue se ferme automatiquement, milestone +1
```

## Exercices pratiques

- ouvrez une issue dans votre propre dépôt, créez un label et une milestone
- corrigez un bug et soumettez un PR en associant l'issue dans la description
- observez si l'issue se ferme automatiquement après la fusion

## Exercices

<Exercise />

<LessonProgress />
