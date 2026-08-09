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
  - id: 4-3-e5
    question: À quoi sert git bisect ?
    options:
      - "Localiser par recherche dichotomique le premier commit qui a introduit le bug"
      - Fusionner l'historique de deux branches
      - Annuler le dernier commit
    correct: 0
    explanation: "bisect marque les commits « bad » et « good », puis checkout régulièrement le point médian pour que vous confirmiez : par dichotomie, il identifie rapidement « à partir de quel commit les choses ont commencé à mal tourner »."
    anchor: "#git-bisect-localise-le-mauvais-commit"
  - id: 4-3-e6
    question: Dans la zone d'entraînement ci-dessous, utilise bisect pour localiser le commit qui a introduit le bug.
    type: task
    scenario: bisect
    goal: "Exécute git bisect start, git bisect bad, git bisect good HEAD~3 ; à chaque fois que git te place sur un commit intermédiaire, examine la fonction add de calc.js — si elle est correcte, fais git bisect good, si elle a un bug, fais git bisect bad, jusqu'à ce que le commit fautif soit identifié."
    checks:
      - type: bisectDone
    explanation: "bisect va localiser « fix: typo in add » — la fonction add commence à faillir à partir de ce commit ; une fois terminé, tu peux utiliser git bisect reset pour revenir à la branche d'origine."
    anchor: "#git-bisect-localise-le-mauvais-commit"
---

# git revert et git cherry-pick

## Objectifs de la leçon

- annuler un commit existant avec git revert
- copier un commit avec git cherry-pick
- localiser le mauvais commit par dichotomie avec git bisect
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

## git bisect localise le mauvais commit

```bash
git bisect start          # démarrer
git bisect bad            # le HEAD actuel est mauvais
git bisect good <commit>  # marquer un commit connu comme bon
# boucle : checkout au point médian → tester → git bisect good / git bisect bad
git bisect reset          # terminer, revenir à la branche d'origine
```

« Une fonctionnalité est cassée, mais on ne sait pas à partir de quel commit » — éplucher l'historique à la main est trop inefficace. bisect utilise la **dichotomie** : après avoir marqué un commit « bad » et un commit « good », git checkout automatiquement le commit situé à mi-chemin entre les deux ; vous le testez, vous dites good ou bad, et la plage se réduit de moitié. Quelques itérations suffisent pour verrouiller le premier commit qui a introduit le bug.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="revert" />

<LessonProgress />
