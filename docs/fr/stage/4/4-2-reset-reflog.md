---
title: git reset et reflog
exercises:
  - id: 4-2-e1
    question: Que fait git reset --hard ?
    options:
      - Déplace HEAD, l'index et le working tree vers le commit cible, en écartant les commits et les modifications intermédiaires
      - Annule seulement le message du dernier commit
      - Pousse les modifications vers le remote
    correct: 0
    explanation: "--hard est un retour en arrière complet des trois : le pointeur de branche, la zone de staging et le working tree reviennent tous à l'état du commit cible — puissant mais dangereux."
    anchor: "#git-reset-deplacer-head"
  - id: 4-2-e2
    question: Peut-on retrouver les commits écartés par reset ?
    options:
      - Oui, en trouvant leur hash dans git reflog puis en faisant reset vers celui-ci
      - Non, ils sont perdus à jamais
      - Seulement en reclonant depuis le remote
    correct: 0
    explanation: "git ne supprime pas immédiatement les objets de commits ; reflog enregistre chaque déplacement de HEAD — retrouvez l'ancien hash et restaurez-le."
    anchor: "#git-reflog-retrouver-les-commits-perdus"
  - id: 4-2-e3
    question: Dans la zone d'entraînement ci-dessous, annule le dernier commit.
    type: task
    scenario: reset
    goal: "Exécute git reset --hard HEAD~1 pour annuler le dernier commit (avec ses modifications)."
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: "reset --hard HEAD~1 fait reculer la branche d'un pas : le working tree revient aussi à l'état précédent."
    anchor: "#git-reset-deplacer-head"
  - id: 4-2-e4
    question: Dans la zone d'entraînement ci-dessous, retrouve le commit écarté par reset grâce à reflog.
    type: task
    scenario: reset
    goal: "Utilise git reflog pour trouver le commit écarté tout à l'heure (message contenant \"break\"), puis restaure-le avec git reset --hard."
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: "reflog affiche l'historique complet de HEAD ; trouvez le hash du commit d'avant le reset, faites reset --hard dessus, et tout revient."
    anchor: "#git-reflog-retrouver-les-commits-perdus"
---

# git reset et reflog

## Objectifs de la leçon

- déplacer HEAD et l'état du dépôt avec git reset
- distinguer --hard / mixed / --soft
- retrouver les commits écartés par reset avec git reflog

## git reset : déplacer HEAD

```bash
git reset --hard <commit>   # HEAD, index et working tree reculent tous
git reset <commit>          # HEAD et index reculent, le working tree est conservé
git reset --soft <commit>   # bouge uniquement HEAD, index et working tree intacts
```

**reset, c'est « revenir en arrière »** : il déplace le pointeur de branche vers n'importe quel commit. Les trois modes diffèrent par « l'étendue de l'impact » :

| Mode | HEAD | Index (zone de staging) | Working tree |
| --- | --- | --- | --- |
| `--soft` | déplacé | conservé | conservé |
| par défaut (mixed) | déplacé | réinitialisé | conservé |
| `--hard` | déplacé | réinitialisé | réinitialisé |

`--hard` est le plus utilisé et le plus dangereux : tous les commits intermédiaires et les modifications non commitées disparaissent (le working tree est directement écrasé). Après un `--hard`, la sortie `HEAD is now at <hash court> <message>` vous indique où vous êtes.

## git reflog : retrouver les commits perdus

```bash
git reflog
```

**reflog (reference log) est l'enregistrement complet des déplacements de HEAD** — pas seulement l'historique de la branche courante, mais « tous les endroits où votre HEAD est passé » :

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

Les commits écartés par reset **ne sont pas supprimés** : aucune branche ne pointe simplement plus vers eux. Trouvez leur hash dans le reflog, et `git reset --hard <hash>` les restaure intégralement. C'est le « remède au regret » de git : tant que l'opération a eu lieu sur votre machine, presque tout se récupère.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="reset" />

<LessonProgress />
