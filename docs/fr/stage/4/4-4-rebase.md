---
title: "git rebase : rejouer les commits"
exercises:
  - id: 4-4-e1
    question: Que fait git rebase ?
    options:
      - Rejoue les commits de la branche courante postérieurs au point de divergence, à la suite du dernier commit de la branche cible
      - Fusionne deux branches en un seul commit
      - Supprime l'historique de la branche courante
    correct: 0
    explanation: "rebase rejoue un à un les commits postérieurs à la divergence, au sommet de la branche cible : l'historique passe d'une fourche à une ligne droite."
    anchor: "#git-rebase-rejouer-les-commits"
  - id: 4-4-e2
    question: Que deviennent les hashs des commits après un rebase ?
    options:
      - Les commits rejoués ont tous un nouveau hash (même contenu, nouvelle identité)
      - Ils restent identiques
      - Seul le premier change
    correct: 0
    explanation: "Le hash inclut le commit parent et l'horodatage ; rejouer produit des objets de commits entièrement nouveaux — d'où l'interdiction de rebase une branche déjà poussée."
    anchor: "#git-rebase-rejouer-les-commits"
  - id: 4-4-e3
    question: Dans la zone d'entraînement ci-dessous, rebase la branche feature sur main.
    type: task
    scenario: rebase
    goal: "Bascule sur feature, exécute git rebase main pour que les commits de feature se placent après ceux de main."
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: "Après rebase, le graphe est une ligne droite : les deux commits de main d'abord, ceux de feature ensuite, sans commit de merge."
    anchor: "#git-rebase-rejouer-les-commits"
  - id: 4-4-e4
    question: Dans la zone d'entraînement ci-dessous, déclenche un conflit de rebase puis abandonne.
    type: task
    scenario: rebase-conflict
    goal: "Bascule sur feature, exécute git rebase main pour déclencher un conflit, puis git rebase --abort pour revenir à l'état initial."
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: "Quand les deux côtés ont modifié le même endroit, conflit ; --abort restaure tout l'état d'avant le rebase."
    anchor: "#conflits-de-rebase-et-abort"
---

# git rebase : rejouer les commits

## Objectifs de la leçon

- rejouer les commits d'une branche sur une branche cible avec git rebase
- comprendre que rebase réécrit l'historique et produit de nouveaux hashs
- comprendre les conflits de rebase et --abort

## git rebase : rejouer les commits

```bash
git switch feature
git rebase main
```

rebase réapplique, à la suite du dernier commit de la branche cible, chacun des commits de la branche courante **postérieurs au point de divergence** :

```
avant rebase (fourche) :      après rebase (ligne droite) :
o  A                        o  A
|\                          o  B (main)
| o  B (main)               o  C' (feature, nouveau hash)
o |  C (feature)            o  D' (feature, nouveau hash)
 \|
  o  D (feature)
```

La sortie indique `Successfully rebased and updated refs/heads/feature.` Le graphe passe de « branche d'arbre » à « ligne droite » — c'est la valeur centrale de rebase : **un historique plus propre**.

**Important** : les commits rejoués ont tous un **nouveau hash** (même contenu, nouvelle identité). Autrement dit, rebase réécrit l'historique — donc ne rebasez jamais une branche déjà poussée et utilisée par d'autres.

## Choisir entre rebase et merge

| | merge | rebase |
| --- | --- | --- |
| Historique | conserve la fourche + commit de merge | linéaire, sans fourche |
| Hashs | inchangés | réécrits (nouveaux hashs) |
| Branche poussée | sûr | interdit |
| Quand | fusion de branches partagées | rangement d'une branche locale |

Le duo de workflow courant : en local, rebase pour aplatir l'historique en ligne droite ; après push, merge pour l'intégrer à la branche partagée.

## Conflits de rebase et --abort

Chaque commit rejoué par rebase peut provoquer un conflit (les deux côtés ont modifié le même endroit) ; git s'arrête alors :

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

Deux façons d'en sortir :

```bash
git rebase --continue   # le conflit est résolu (après add), le rejeu continue
git rebase --abort      # abandonne ce rebase, revient à l'état initial
```

Comme pour un conflit de merge : éditez le fichier, retirez les marqueurs, `git add`, puis `--continue`. Si vous ne voulez pas gérer le conflit, `--abort` : tout revient à l'état d'avant le rebase.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="rebase" />

<LessonProgress />
