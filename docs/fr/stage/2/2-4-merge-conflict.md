---
title: Résoudre un conflit de fusion
exercises:
  - id: 2-4-e1
    question: Quand un conflit (conflict) se produit-il ?
    options:
      - Quand les deux côtés modifient le même endroit du même fichier
      - Quand les deux côtés modifient des fichiers différents
      - Dès que l'on exécute git merge
    correct: 0
    explanation: Si les modifications touchent des endroits différents, git fusionne automatiquement ; ce n'est que lorsque les deux côtés modifient le même endroit, et que git ne peut pas décider lequel garder, que vous devez trancher à la main.
    anchor: "#comment-un-conflit-apparait"
  - id: 2-4-e2
    question: Que contient la zone entre les marqueurs de conflit <<<<<<< HEAD et ======= ?
    options:
      - La modification de ce côté-ci, la branche courante (HEAD)
      - La modification de la branche adverse
      - Le contenu complet du fichier
    correct: 0
    explanation: Dans le fichier en conflit, ce qui se trouve entre <<<<<<< HEAD et ======= est la version « de votre côté », et ce qui se trouve entre ======= et >>>>>>> est la version « de l'autre côté ».
    anchor: "#les-marqueurs-de-conflit"
  - id: 2-4-e3
    question: Dans la zone d'entraînement ci-dessous, provoque un conflit puis résous-le.
    type: task
    scenario: conflict
    goal: "Exécute git merge feature pour déclencher le conflit ; remplace le contenu de hello.txt par \"hello resolved\" et supprime les marqueurs de conflit ; fais git add hello.txt ; puis git commit pour terminer la fusion."
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: "L'essence de la résolution d'un conflit, c'est « prendre vous-même la décision que git ne peut pas prendre » : éditer le fichier, supprimer les marqueurs, add, commit — et le merge commit est né."
    anchor: "#le-deroulement-de-resolution-d-un-conflit"
  - id: 2-4-e4
    question: Après avoir résolu le conflit (après le add), quelle commande termine la fusion ?
    options:
      - git commit (committe le résultat, ce qui crée le merge commit)
      - git stash
      - git reset
    correct: 0
    explanation: Une fois le conflit résolu et ajouté, git est encore en cours de fusion (MERGE_HEAD existe) ; à ce moment, git commit génère le merge commit avec le contenu actuel et met fin à la fusion.
    anchor: "#le-deroulement-de-resolution-d-un-conflit"
---

# Résoudre un conflit de fusion

## Objectifs de la leçon

- comprendre d'où viennent les conflits
- lire les marqueurs de conflit
- maîtriser le déroulement standard de résolution : éditer → add → commit

## Comment un conflit apparaît

Lors d'une fusion, git doit composer les changements des deux côtés en une seule version. Si les deux côtés modifient des **endroits différents**, git fusionne automatiquement ; mais si **les deux côtés ont modifié le même endroit du même fichier**, git ne peut pas décider lequel garder — il place alors les deux versions dans le fichier et vous laisse trancher.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

La sortie vous indique clairement quel fichier est concerné :

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Les marqueurs de conflit

Chaque bloc en conflit du fichier porte trois marqueurs :

| Marqueur | Signification |
| --- | --- |
| `<<<<<<< HEAD` | ce qui suit est votre version (la branche courante) |
| `=======` | ligne de séparation |
| `>>>>>>> feature` | ce qui suit est la version de la branche adverse (feature), le nom du marqueur est celui de la branche adverse |

**Votre tâche** : décider quelle version garder au final (ou en écrire une nouvelle), puis supprimer les trois marqueurs.

## Le déroulement de résolution d'un conflit

Le déroulement standard tient en quatre étapes :

```bash
git merge feature          # 1. déclencher le conflit
# éditer le fichier en conflit : choisir le contenu, supprimer les marqueurs
git add hello.txt          # 2. dire à git que ce fichier est résolu
git commit -m "merge: resolve"   # 3. terminer la fusion, créer le merge commit
```

Pendant ce temps, `git status` vous rappelle que vous êtes en cours de fusion : avec des fichiers non résolus, il affiche `You have unmerged paths` ; une fois tout ajouté, il affiche `All conflicts fixed but you are still merging` — il ne reste alors qu'à committer.

**Point essentiel** : un conflit n'est pas une erreur, c'est git qui vous passe la décision. Le résultat reste un merge commit tout à fait normal, et l'historique enregistre la fusion comme d'habitude.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="conflict" />

<LessonProgress />
