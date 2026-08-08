# Glossaire

Les termes gardent toujours leur nom anglais ; ce tableau en donne une brève explication.

| Terme | Signification | Première apparition |
| --- | --- | --- |
| repository | Le dossier qui stocke l'historique et les métadonnées (contient `.git`) | 0-2 |
| working tree | La zone où vous éditez les fichiers | 0-2 |
| staging area | La liste des modifications préparées pour le prochain commit (aussi appelée index) | 0-2 |
| commit | Un enregistrement complet sous forme de snapshot | 0-1 |
| snapshot | L'état complet du projet à un instant donné | 0-1 |
| SHA-1 | Hachage de contenu ; l'identifiant unique d'un commit | Étape 1 |
| HEAD | Pointeur vers le dernier commit du branche courante | Étape 2 |
| branch | Un pointeur mobile vers un commit | Étape 2 |
| tag | Un nom fixé sur un commit précis | Étape 4 |
| remote | Une copie du dépôt hébergée ailleurs | Étape 3 |
| origin | Le nom de remote par défaut après un clone | Étape 3 |
| clone | Copier un dépôt distant sur sa machine | Étape 3 |
| fetch | Télécharger les commits distants sans fusionner | Étape 3 |
| push | Envoyer les commits locaux vers un remote | Étape 3 |
| pull | fetch + merge | Étape 3 |
| merge | Intégrer une autre branche dans la branche courante | Étape 2 |
| rebase | Replacer des commits sur une nouvelle base | Étape 4 |
| conflict | Des changements qui se chevauchent, à résoudre à la main | Étape 2 |
| stash | Mettre de côté temporairement des changements non committés | Étape 4 |
| checkout | Changer de branche ou restaurer des fichiers | Étape 2 |
| switch | Changer de branche (commande plus récente) | Étape 2 |
| restore | Restaurer un fichier à une version donnée | Étape 1 |
| reset | Déplacer HEAD et/ou la staging area et le working tree | Étape 4 |
| revert | Annuler un ancien commit avec un nouveau commit | Étape 4 |
| cherry-pick | Copier un commit précis sur la branche courante | Étape 4 |
| diff | Le changement entre deux états | Étape 1 |
| status | Vue d'ensemble des différences entre les trois zones | Étape 1 |
| log | La liste de l'historique des commits | Étape 1 |
| tracking branch | Une branche locale associée à une branche distante | Étape 3 |
| upstream | La branche distante suivie par une branche locale | Étape 3 |
| fast-forward | Une fusion qui avance simplement, sans divergence | Étape 2 |
| detached HEAD | HEAD qui ne pointe sur aucune branche | Étape 4 |
| reflog | L'enregistrement complet de tous les emplacements de HEAD | Étape 4 |
| DAG | Graphe orienté acyclique ; la topologie de l'historique | Étape 2 |
| fork | Copier le dépôt de quelqu'un d'autre dans son compte | Étape 5 |
| pull request | Demande de fusion de votre branche (PR) | Étape 5 |
