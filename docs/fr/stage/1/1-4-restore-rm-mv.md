---
title: git restore, git rm et git mv
exercises:
  - id: 1-4-e1
    question: Quel est l'effet de git restore hello.txt ?
    options:
      - Restaure hello.txt à la version de HEAD, en abandonnant les modifications du working tree
      - Supprime hello.txt
      - Ajoute hello.txt à la zone de staging
    correct: 0
    explanation: "git restore restaure le fichier à sa version du dépôt (par défaut, depuis HEAD), en abandonnant les modifications du working tree. À noter : seuls les fichiers tracked sont restaurés, les fichiers untracked ne sont pas touchés."
    anchor: "#git-restore-annule-les-modifications"
  - id: 1-4-e2
    question: Dans la zone d'entraînement ci-dessous, restaure hello.txt avec git restore.
    type: task
    scenario: local
    goal: hello.txt a été modifié n'importe comment ; utilise git restore hello.txt pour le restaurer.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: Après la restauration, hello.txt retrouve son contenu « hello world », le working tree est propre et git status affiche nothing to commit.
    anchor: "#git-restore-annule-les-modifications"
  - id: 1-4-e3
    question: Dans la zone d'entraînement ci-dessous, supprime notes.txt (tout en le conservant dans l'historique).
    type: task
    scenario: local
    goal: Utilise git rm notes.txt pour supprimer le fichier et mettre la suppression en staging.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: "git rm fait deux choses à la fois : supprime le fichier du working tree et met la suppression en staging. Après le commit, le fichier disparaît de la dernière version, mais reste retrouvable dans l'historique."
    anchor: "#git-rm-supprime-des-fichiers"
  - id: 1-4-e4
    question: Dans la zone d'entraînement ci-dessous, renomme notes.txt en diary.txt.
    type: task
    scenario: local
    goal: Utilise git mv notes.txt diary.txt pour renommer le fichier et mettre le changement en staging.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: "git mv est une commande combinée « déplacement + staging » : après le renommage, git status affiche la suppression de l'ancien nom et l'ajout du nouveau."
    anchor: "#git-mv-deplace-des-fichiers"
---

# git restore, git rm et git mv

## Objectifs de la leçon

- abandonner les modifications du working tree avec git restore
- supprimer des fichiers avec git rm
- déplacer ou renommer des fichiers avec git mv

## git restore annule les modifications

Tu as tout cassé ? Tu veux revenir à l'état du dernier commit :

```bash
git restore <nom-de-fichier>
```

`git restore` restaure le fichier à sa version de HEAD, **en abandonnant les modifications du working tree**. Attention : il n'agit que sur les fichiers tracked — un nouveau fichier que git ne connaît pas encore, restore ne peut rien y faire.

## git rm supprime des fichiers

```bash
git rm <nom-de-fichier>
```

Une seule commande, deux effets : suppression du fichier dans le working tree + enregistrement de la suppression dans la zone de staging. Après le commit, le fichier disparaît de la dernière version, mais l'historique reste — on peut le retrouver à tout moment.

## git mv déplace des fichiers

```bash
git mv ancien-nom nouveau-nom
```

Déplace (renomme) le fichier et met le changement en staging. git ne « mémorise » pas le renommage en tant que tel — il le détecte par comparaison de contenu : un ancien fichier disparu + un nouveau fichier au contenu identique = un renommage. C'est pourquoi, après un mv, status affiche deleted + new file.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="local" />

<LessonProgress />
