---
title: git revert et git cherry-pick
exercises:
  - id: 4-3-e1
    question: Comment git revert annule-t-il un commit ?
    options:
      - En créant un nouveau commit inversé, l'historique continue d'avancer
      - En supprimant directement ce commit
      - En reculant le pointeur de branche
    correct: 0
    explanation: "revert ne réécrit pas l'historique : il neutralise les modifications du commit cible par un nouveau commit inversé, adapté aux commits déjà poussés."
    anchor: "#git-revert-annuler-un-commit"
  - id: 4-3-e2
    question: À quoi sert git cherry-pick ?
    options:
      - Copier un commit d'une branche vers la branche courante
      - Fusionner deux branches
      - Choisir des fichiers à comparer
    correct: 0
    explanation: "cherry-pick applique les modifications d'un commit donné à la branche courante et crée un nouveau commit — idéal pour ne récupérer qu'un commit précis de quelqu'un."
    anchor: "#git-cherry-pick-copier-un-commit"
  - id: 4-3-e3
    question: Dans la zone d'entraînement ci-dessous, annule le mauvais commit.
    type: task
    scenario: revert
    goal: "Utilise git revert pour annuler le dernier mauvais commit (fix: break hello), afin que hello.txt retrouve son contenu correct."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert génère un nouveau commit "Revert \"fix: break hello\"" : hello.txt redevient correct.'
    anchor: "#git-revert-annuler-un-commit"
  - id: 4-3-e4
    question: Dans la zone d'entraînement ci-dessous, copie le commit de la branche feature vers main.
    type: task
    scenario: cherry-pick
    goal: "Sur la branche main, exécute git cherry-pick <le commit de feature> pour apporter la fonctionnalité de feature.txt sur main."
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "Après cherry-pick, la branche feature reste intacte et main possède en plus un commit au contenu identique."
    anchor: "#git-cherry-pick-copier-un-commit"
---

# git revert et git cherry-pick

## Objectifs de la leçon

- annuler un commit existant avec git revert
- copier un commit avec git cherry-pick
- comprendre que les deux ne réécrivent pas l'historique

## git revert : annuler un commit

```bash
git revert <commit>
```

revert ne « supprime » pas le commit : il **crée un nouveau commit inversé** — les modifications du commit cible sont appliquées à l'envers, et l'historique continue normalement d'avancer :

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

Pourquoi pas reset ? Parce que **revert ne réécrit pas l'historique** — si d'autres ont déjà clone ou pull votre commit, le supprimer avec reset rendrait toutes les copies incohérentes ; revert ne fait que « ajouter un commit de compensation », sans danger pour personne. Donc : **erreur locale non poussée → reset, erreur déjà poussée → revert**.

## git cherry-pick : copier un commit

```bash
git cherry-pick <commit>   # copie ce commit sur la branche courante
```

cherry-pick applique les modifications **d'un commit précis** à la branche courante, en créant un nouveau commit (même contenu, hash différent). Cas typique : quelqu'un a corrigé un bug sur la branche feature, et vous voulez récupérer cette correction directement sur main, sans fusionner toute la branche feature.

```
o  A ---- B (main) ---- B' (fix cherry-pické)
     \
      C (fix sur feature)
```

## Différence entre revert et cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Direction | annuler (application inverse) | copier (application directe) |
| Quand | un commit contient une erreur à effacer | un commit est bon et à transposer ailleurs |
| Résultat | un nouveau commit neutralise l'ancien | un nouveau commit réplique l'ancien |

Les deux ne réécrivent pas l'historique existant, et les deux s'arrêtent en cas de conflit, en attendant votre résolution.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="revert" />

<LessonProgress />
