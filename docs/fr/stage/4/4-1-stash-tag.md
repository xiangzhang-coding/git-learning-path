---
title: git stash et git tag
exercises:
  - id: 4-1-e1
    question: Que sauvegarde git stash ?
    options:
      - Les modifications non commitées (fichiers suivis, staged et unstaged)
      - L'historique déjà commité
      - Tout le contenu du dépôt distant
    correct: 0
    explanation: "stash met temporairement de côté les modifications non commitées du working tree, qui redevient propre — vous les récupérez ensuite avec pop."
    anchor: "#git-stash-mettre-les-modifications-de-cote"
  - id: 4-1-e2
    question: Quelle est la différence entre tag et branch ?
    options:
      - branch bouge avec les commits, tag pointe fixement sur un commit
      - tag bouge avec les commits, branch est fixe
      - Les deux sont strictement identiques
    correct: 0
    explanation: "tag est un nom épinglé sur un commit ; les commits suivants ne le déplacent jamais — parfait pour marquer les numéros de version."
    anchor: "#git-tag-marquer-les-versions"
  - id: 4-1-e3
    question: Dans la zone d'entraînement ci-dessous, mets de côté les modifications non commitées.
    type: task
    scenario: stash
    goal: "Exécute git stash pour que le working tree redevienne propre."
    checks:
      - type: statusClean
    explanation: "Après stash, le working tree est propre et les modifications sont conservées dans la liste des stash (stash@{0})."
    anchor: "#git-stash-mettre-les-modifications-de-cote"
  - id: 4-1-e4
    question: Dans la zone d'entraînement ci-dessous, récupère les modifications mises de côté.
    type: task
    scenario: stash
    goal: "Exécute git stash pop pour que les modifications de hello.txt reviennent dans le working tree."
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: "pop remet les modifications de stash@{0} dans le working tree et supprime cette entrée de stash."
    anchor: "#git-stash-list-et-git-stash-pop"
  - id: 4-1-e5
    question: Dans la zone d'entraînement ci-dessous, tag le commit courant.
    type: task
    scenario: tag
    goal: Exécute git tag v1.0, puis git tag pour vérifier que le tag existe.
    checks:
      - type: tagExists
        name: v1.0
    explanation: Le tag est épinglé sur le HEAD courant ; les commits suivants ne le déplacent jamais.
    anchor: "#git-tag-marquer-les-versions"
---

# git stash et git tag

## Objectifs de la leçon

- ranger temporairement les modifications non commitées avec git stash
- gérer les stash avec git stash list / pop
- marquer les versions avec git tag

## git stash : mettre les modifications de côté

```bash
git stash          # met de côté toutes les modifications non commitées
git stash list     # affiche la liste des stash
git stash pop      # récupère le stash le plus récent
```

En plein travail, le scénario classique : une modification à moitié finie, et soudain il faut changer de branche pour autre chose — mais le changement est refusé (modifications non commitées). **stash** est la « consigne temporaire » : les modifications sont rangées, le working tree redevient propre, et vous les récupérez à tout moment.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list et git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` remet les modifications du stash le plus récent dans le working tree, et supprime cette entrée (sortie `Dropped stash@{0}`). À noter : stash ne conserve que les fichiers **déjà suivis par git** ; un nouveau fichier untracked n'est pas rangé.

## git tag : marquer les versions

```bash
git tag v1.0               # tag léger : donne un nom au commit courant
git tag -a v1.0 -m "texte" # tag annoté : avec un message
git tag                    # liste tous les tags
```

Pour publier une version, il vous faut un nom qui « pointe toujours vers ce commit » — **tag** est précisément ce marqueur épinglé sur un commit. Contrairement à branch, tag ne bouge pas avec les nouveaux commits. Vous pouvez ensuite revenir à cette version à tout moment avec `git switch <tag>` (HEAD passe alors en état detached, nous le verrons plus loin dans ce chapitre).
**Passer sur un tag et le detached HEAD**: `git switch <tag>` fait pointer HEAD sur le commit du tag — mais HEAD n'est alors accroché à aucune branche, c'est le detached HEAD (tête détachée). Si tu commites dans cet état, le nouveau commit n'appartient à aucune branche et tu risques de ne plus le retrouver après avoir changé de branche. Regarder est donc sans risque ; pour commiter, crée d'abord une branche avec `git switch -c <nouveau nom de branche>`.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="stash" />

<LessonProgress />
