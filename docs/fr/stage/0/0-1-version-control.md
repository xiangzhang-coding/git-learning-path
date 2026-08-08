---
title: Pourquoi le contrôle de version ?
exercises:
  - id: 0-1-e1
    question: Quel est le plus gros problème de la gestion de versions par copies de fichiers avec dates ?
    options:
      - Les fichiers occupent trop d'espace disque
      - L'historique n'est pas consultable — impossible de revenir fiablement à un état passé
      - Les noms de fichiers sont trop longs
    correct: 1
    explanation: Le défaut fondamental n'est ni l'espace ni les noms, mais une histoire non consultable — vous ne pouvez pas revenir à une version passée ni savoir quelle copie est la plus récente.
    anchor: "#qu-est-ce-que-le-contrôle-de-version"
  - id: 0-1-e2
    question: Laquelle n'est PAS une capacité de base d'un système de contrôle de version (VCS) ?
    options:
      - Enregistrer chaque modification sous forme de snapshot
      - Revenir à n'importe quelle version historique
      - Corriger automatiquement les bugs du code
    correct: 2
    explanation: Un VCS enregistre, compare, annule et facilite la collaboration — il ne corrige pas le code. C'est le travail de celle ou celui qui écrit le code.
    anchor: "#qu-est-ce-que-le-contrôle-de-version"
  - id: 0-1-e3
    question: Quelle est la différence clé entre le contrôle centralisé (ex. SVN) et distribué (ex. Git) ?
    options:
      - Le centralisé exige le réseau pour committer ; le distribué committe en local
      - Le distribué ne supporte pas la collaboration
      - Il n'y a pas de vraie différence
    correct: 0
    explanation: "En centralisé, chaque commit doit partir vers un serveur central — hors ligne, plus de commit. En distribué, chaque clone est un dépôt complet : on committe en local, même hors ligne."
    anchor: "#centralisé-vs-distribué"
  - id: 0-1-e4
    question: Que stocke chaque commit dans Git ?
    options:
      - Seulement la différence avec le commit précédent
      - Un snapshot complet de tout le projet
      - Uniquement les chemins des fichiers modifiés
    correct: 1
    explanation: Un commit Git stocke un snapshot complet (avec compression et déduplication), pas seulement un diff — c'est pourquoi on parle de versionnement « par snapshots ».
    anchor: "#centralisé-vs-distribué"
---

# Pourquoi le contrôle de version ?

## Objectifs de la leçon

- Comprendre ce que résout un système de contrôle de version (VCS)
- Comparer contrôle centralisé et distribué
- Savoir à quel type Git appartient

## Le calvaire sans contrôle de version

Imaginez un projet en cours : à mi-chemin, vous réalisez que l'approche ne fonctionne pas et vous voulez revenir à l'état d'hier après-midi — où est ce fichier ? Peut-être dans `final_v2_sauvegarde`, peut-être déjà écrasé. La collaboration est pire : deux personnes éditent le même fichier, celui qui enregistre en dernier gagne, et le travail de l'autre disparaît silencieusement.

Ces trois problèmes — **enregistrer, revenir, collaborer** — sont exactement ce que Git résout.

## Qu'est-ce que le contrôle de version

Un système de contrôle de version (VCS) enregistre chaque modification et conserve un **snapshot** complet du projet à chaque instant, ce qui permet de :

- consulter n'importe quelle version historique
- comparer les différences entre deux états quelconques
- revenir à n'importe quel état passé

Ce n'est pas un outil de sauvegarde : la sauvegarde ne garde que la copie la plus récente, alors qu'un VCS conserve toute l'historique, et chaque version est reconstructible.

## Centralisé vs distribué

- **Centralisé (ex. SVN)** : un dépôt central unique ; tout le monde en fait le checkout et chaque commit doit transiter par le réseau. Si le serveur tombe, plus personne ne committe.
- **Distribué (ex. Git)** : chaque clone est une copie complète du dépôt central. Les commits se font en local, même hors ligne ; vous les poussez ensuite vers les autres.

Comme chaque commit Git stocke un snapshot complet plutôt qu'un diff, toute l'historique est entièrement reconstructible depuis n'importe quel clone — c'est précisément ce qui rend le « distribué » possible.

## Animation : remonter la chronologie

Déplacez le curseur ou cliquez un point : le contenu des fichiers change à chaque version — « remonter le temps » est exactement ce que le contrôle de version vous offre.

<TimelineRewind />

## Exercices

<Exercise />

## Bac à sable

Cette leçon n'utilise aucune commande ; le bac à sable arrive à l'étape 1.

<LessonProgress />
