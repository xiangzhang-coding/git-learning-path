---
title: "git fetch et git pull"
exercises:
  - id: 3-4-e1
    question: Que fait git fetch ?
    options:
      - Télécharge les nouveaux commits du remote, met à jour le tracking branch, mais ne touche pas au working tree
      - Télécharge et fusionne directement dans la branche courante
      - Envoie les commits locaux vers le remote
    correct: 0
    explanation: "fetch ne met à jour que « l'image du remote » (origin/main) ; votre branche et votre working tree restent intacts — vous pouvez regarder ce qu'il y a côté distant sans risque."
    anchor: "#git-fetch-regarder-sans-toucher"
  - id: 3-4-e2
    question: Quel est le rapport entre git pull et git fetch ?
    options:
      - "pull = fetch + merge (fusionner les nouveaux commits du remote dans la branche courante)"
      - pull = fetch + push
      - Les deux sont strictement identiques
    correct: 0
    explanation: "pull commence par fetch pour mettre à jour l'image, puis fusionne (ou avance en fast-forward) origin/main dans la branche courante."
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: Dans la zone d'entraînement ci-dessous, récupère les nouveaux commits du remote.
    type: task
    scenario: pull-ff
    goal: "Sur la branche main, exécute git pull pour fusionner en fast-forward les nouveaux commits du remote."
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "Quand le local n'a pas de nouveau commit, pull fait un fast-forward : les nouveaux fichiers du remote apparaissent directement dans le working tree, et l'historique reste une ligne droite."
    anchor: "#git-pull-fetch-merge"
---

# git fetch et git pull

## Objectifs de la leçon

- télécharger les mises à jour du remote avec git fetch, sans toucher au working tree
- comprendre que pull = fetch + merge
- observer l'état du remote avec git log origin/main

## git fetch : regarder sans toucher

```bash
git fetch            # télécharge tous les nouveaux commits d'origin
git fetch origin     # écriture équivalente
```

fetch télécharge **les nouveaux objets de commits** du remote et met à jour le tracking branch `origin/main` — mais **ne touche ni à votre branche, ni au working tree** :

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

Après le fetch, vous pouvez « regarder » l'état du remote en toute sécurité, et voir à tout moment l'écart entre le remote et le local :

```bash
git log origin/main --oneline   # ce qu'il y a côté distant
git log main..origin/main       # les commits que le remote a et que le local n'a pas
```

<RemoteFlow />

## git pull = fetch + merge

```bash
git pull             # équivaut à git fetch + git merge origin/main
```

pull est la combinaison des deux opérations : d'abord fetch (mettre à jour l'image), puis fusionner `origin/main` dans la branche courante.

- **Le local n'a pas de nouveau commit** : fusion en fast-forward, le working tree est mis à jour directement, l'historique reste une ligne droite
- **Le local a aussi de nouveaux commits** : un merge commit est créé, l'historique des deux branches est réuni
- **Les deux côtés ont modifié le même endroit** : conflit — le déroulement de résolution est exactement celui du chapitre 2 (éditer → add → commit)

## Quand utiliser quoi

| Situation | Commande |
| --- | --- |
| juste regarder ce que le remote a de nouveau | `git fetch` |
| récupérer directement les nouveaux commits du remote | `git pull` |
| impossible de pousser (refus) | d'abord `git pull`, puis `git push` |

**Règle d'or** : pull avant de push — fusionnez d'abord les mises à jour du remote, puis poussez les vôtres, et le refus non-fast-forward ne vous arrivera plus.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="pull" />

<LessonProgress />
