# Chapitre 5 — Écosystème GitHub

Le fil conducteur de ce chapitre : **la boucle de collaboration autour de GitHub**. fork crée votre copie, upstream relie le dépôt de l'auteur ; le PR est la porte d'entrée des commits vers la branche principale, l'issue porte la discussion, la release publie les versions, Actions et Pages automatisent les tests et le déploiement. Ce chapitre s'entraîne sur le vrai GitHub — chaque concept s'accompagne d'une tâche pratique.

## Liste de pratique

Parcours l'enchaînement complet ci-dessous sur le vrai GitHub, en cochant pour suivre votre progression :

<Checklist :tasks="[
  { text: 'fork un dépôt open source que vous utilisez souvent', link: '/fr/stage/5/5-1-fork-upstream' },
  { text: 'Clone votre fork, ajoutez upstream, effectuez une synchronisation complète', link: '/fr/stage/5/5-1-fork-upstream' },
  { text: 'Poussez une branche de fonctionnalité et ouvrez un vrai PR', link: '/fr/stage/5/5-2-pull-request' },
  { text: 'Vivez une discussion de review dans un PR', link: '/fr/stage/5/5-2-pull-request' },
  { text: 'Ouvrez une issue, créez un label et un milestone', link: '/fr/stage/5/5-3-issues' },
  { text: 'Soumettez un PR lié à une issue (fixes #numéro)', link: '/fr/stage/5/5-3-issues' },
  { text: 'Créez le tag v0.1.0 et publiez le premier Release', link: '/fr/stage/5/5-4-releases' },
  { text: 'Publiez une version de correctif avec des notes en trois sections', link: '/fr/stage/5/5-4-releases' },
  { text: 'Écrivez un workflow qui déploie une page statique sur Pages', link: '/fr/stage/5/5-5-actions-pages' },
  { text: 'Cassez volontairement l\'étape de build et observez le journal d\'échec', link: '/fr/stage/5/5-5-actions-pages' }
]" />

## Cours

- 5-1 [fork et synchronisation upstream](/fr/stage/5/5-1-fork-upstream) : fork crée la copie, upstream reçoit les mises à jour de l'amont
- 5-2 [Flux de travail Pull Request](/fr/stage/5/5-2-pull-request) : ouvrir un PR, discuter en review, trois façons de fusionner
- 5-3 [Issues et collaboration](/fr/stage/5/5-3-issues) : discussion d'issue, label et milestone, fermeture automatique de l'issue par un PR
- 5-4 [Releases et versions](/fr/stage/5/5-4-releases) : version sémantique, push de tag, publication d'une Release
- 5-5 [GitHub Actions et Pages](/fr/stage/5/5-5-actions-pages) : automatisation des workflow, déploiement avec Pages

## Fonctionnalités clés du chapitre

| Fonctionnalité | Rôle |
| --- | --- |
| fork | Copier un dépôt GitHub dans votre compte |
| pull request | Demander la fusion des commits d'une branche dans le dépôt cible |
| issue | Discuter et suivre bugs, fonctionnalités, tâches |
| milestone | Regrouper un ensemble d'issues vers un objectif de version |
| release | Publication officielle basée sur un tag (avec notes et pièces jointes) |
| GitHub Actions | Automatisation CI/CD pilotée par événements |
| GitHub Pages | Hébergement gratuit de sites statiques (c'est le cas de ce projet) |

<StageProgress stage="5" />
