# Glossaire

Les termes gardent toujours leur nom anglais ; ce tableau en donne une brève explication.

| Terme | Signification | Première apparition |
| --- | --- | --- |
| repository | Le dossier qui stocke l'historique et les métadonnées (contient `.git`) | 0-2 |
| working tree | La zone où vous éditez les fichiers | 0-2 |
| staging area | La liste des modifications préparées pour le prochain commit (aussi appelée index) | 0-2 |
| commit | Un enregistrement complet sous forme de snapshot | 0-1 |
| snapshot | L'état complet du projet à un instant donné | 0-1 |
| SHA-1 | Hachage de contenu ; l'identifiant unique d'un commit | Chapitre 1 |
| HEAD | Pointeur vers le dernier commit du branche courante | Chapitre 2 |
| branch | Un pointeur mobile vers un commit | Chapitre 2 |
| tag | Un nom fixé sur un commit précis | Chapitre 4 |
| remote | Une copie du dépôt hébergée ailleurs | Chapitre 3 |
| origin | Le nom de remote par défaut après un clone | Chapitre 3 |
| clone | Copier un dépôt distant sur sa machine | Chapitre 3 |
| fetch | Télécharger les commits distants sans fusionner | Chapitre 3 |
| push | Envoyer les commits locaux vers un remote | Chapitre 3 |
| pull | fetch + merge | Chapitre 3 |
| merge | Intégrer une autre branche dans la branche courante | Chapitre 2 |
| rebase | Replacer des commits sur une nouvelle base | Chapitre 4 |
| conflict | Des changements qui se chevauchent, à résoudre à la main | Chapitre 2 |
| stash | Mettre de côté temporairement des changements non committés | Chapitre 4 |
| checkout | Changer de branche ou restaurer des fichiers | Chapitre 2 |
| switch | Changer de branche (commande plus récente) | Chapitre 2 |
| restore | Restaurer un fichier à une version donnée | Chapitre 1 |
| reset | Déplacer HEAD et/ou la staging area et le working tree | Chapitre 4 |
| revert | Annuler un ancien commit avec un nouveau commit | Chapitre 4 |
| cherry-pick | Copier un commit précis sur la branche courante | Chapitre 4 |
| diff | Le changement entre deux états | Chapitre 1 |
| status | Vue d'ensemble des différences entre les trois zones | Chapitre 1 |
| log | La liste de l'historique des commits | Chapitre 1 |
| tracking branch | Une branche locale associée à une branche distante | Chapitre 3 |
| upstream | La branche distante suivie par une branche locale | Chapitre 3 |
| fast-forward | Une fusion qui avance simplement, sans divergence | Chapitre 2 |
| detached HEAD | HEAD qui ne pointe sur aucune branche | Chapitre 4 |
| reflog | L'enregistrement complet de tous les emplacements de HEAD | Chapitre 4 |
| DAG | Graphe orienté acyclique ; la topologie de l'historique | Chapitre 2 |
| fork | Copier le dépôt de quelqu'un d'autre dans son compte | Chapitre 5 |
| pull request | Demande de fusion de votre branche (PR) | Chapitre 5 |
| issue | Problème, fil de discussion du dépôt autour d'un bug/d'une fonctionnalité/d'une tâche | Chapitre 5 |
| label | Étiquette classant une issue (ex. bug, enhancement) | Chapitre 5 |
| milestone | Jalon de version, regroupe un ensemble d'issues vers le même objectif de version | Chapitre 5 |
| release | Publication officielle basée sur un tag, avec notes et artefacts | Chapitre 5 |
| workflow | Flux de travail, le processus automatisé de GitHub Actions | Chapitre 5 |
