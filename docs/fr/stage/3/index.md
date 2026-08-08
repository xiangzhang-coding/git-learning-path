# Étape 3 — La collaboration à distance

Le fil de principe de cette étape : **deux dépôts et le tracking branch**. remote est l'adresse d'un autre dépôt ; clone le copie, fetch met à jour « l'image distante » (origin/main), push envoie les commits locaux, pull = fetch + merge.

## Cours

- 3-1 [git remote : le dépôt distant](/fr/stage/3/3-1-remote) : ce qu'est un remote, l'ajouter et le consulter
- 3-2 [git clone : cloner un dépôt](/fr/stage/3/3-2-clone) : tout copier en une fois, origin et le tracking branch
- 3-3 [git push : envoyer des commits](/fr/stage/3/3-3-push) : envoyer les commits locaux, le refus non-fast-forward
- 3-4 [git fetch et git pull](/fr/stage/3/3-4-fetch-pull) : fetch regarde sans toucher, pull = fetch + merge

## Nouvelles commandes de cette étape

| Commande | Rôle |
| --- | --- |
| `git remote add <nom> <url>` | enregistrer l'adresse d'un remote |
| `git remote -v` | voir le nom et l'adresse de tous les remotes |
| `git clone <url> [<dir>]` | copier entièrement un dépôt distant en local |
| `git push` | envoyer au remote les commits où la branche courante est en avance |
| `git fetch` | télécharger les nouveaux commits du remote, mettre à jour le tracking branch |
| `git pull` | fetch + merge : récupérer et fusionner les mises à jour du remote |
| `git log origin/main` | voir l'historique sur lequel pointe la branche distante |
| `cd <dir>` | changer de dossier dans la zone d'entraînement (entrer dans le dépôt cloné) |

<StageProgress stage="3" />
