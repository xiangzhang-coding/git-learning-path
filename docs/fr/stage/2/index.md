# Chapitre 2 — Les branches et la fusion

Le fil de principe de ce chapitre : **graphe de commits et HEAD**. Une branche n'est qu'un pointeur vers un commit ; HEAD marque votre position actuelle ; toutes les opérations de branche (switch, merge, conflict) reviennent à déplacer des pointeurs sur le graphe de commits, ou à refermer une divergence.

## Cours

- 2-1 [git branch et git switch](/fr/stage/2/2-1-branch-switch) : la branche est un pointeur, HEAD est la position actuelle
- 2-2 [Travailler sur une branche](/fr/stage/2/2-2-branch-workflow) : les commits ne tombent que sur la branche courante, l'historique diverge en DAG
- 2-3 [git merge : fusionner les branches](/fr/stage/2/2-3-merge) : la fusion fast-forward et le merge commit
- 2-4 [Résoudre un conflit de fusion](/fr/stage/2/2-4-merge-conflict) : les marqueurs de conflit et le déroulement de résolution

## Nouvelles commandes de ce chapitre

| Commande | Rôle |
| --- | --- |
| `git branch` | liste les branches, la branche courante porte une `*` |
| `git branch <nom>` | crée une branche (sans y basculer) |
| `git switch <nom>` | bascule vers une branche existante |
| `git switch -c <nom>` | crée une branche et bascule dessus |
| `git merge <branche>` | fusionne la branche cible dans la branche courante |

<StageProgress stage="2" />
