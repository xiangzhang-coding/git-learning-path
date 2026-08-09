# Chapitre 4 — Réparation et perfectionnement

Le fil de principe de ce chapitre : **refs et reflog**. reset déplace le pointeur de branche, revert/cherry-pick créent de nouveaux commits, rebase réécrit l'historique — et reflog enregistre chaque déplacement de HEAD, pour que tout « regret » reste récupérable.

## Cours

- 4-1 [git stash et git tag](/fr/stage/4/4-1-stash-tag) : ranger temporairement les modifications, épingler les versions
- 4-2 [git reset et reflog](/fr/stage/4/4-2-reset-reflog) : les trois modes de déplacement de HEAD, reflog pour retrouver les commits
- 4-3 [git revert et git cherry-pick](/fr/stage/4/4-3-revert-cherry-pick) : annuler en marche arrière et copier des commits
- 4-4 [git rebase : rejouer les commits](/fr/stage/4/4-4-rebase) : linéariser l'historique, conflits et abandon

## Nouvelles commandes de ce chapitre

| Commande | Rôle |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | ranger temporairement les modifications non commitées |
| `git tag <nom>` / `git tag -a <nom> -m <msg>` | épingler un marqueur de version sur un commit |
| `git reset [--hard\|--soft] <ref>` | déplacer HEAD (éventuellement avec l'index et le working tree) |
| `git reflog` | voir l'enregistrement complet des déplacements de HEAD |
| `git revert <ref>` | annuler un commit avec un nouveau commit inversé |
| `git cherry-pick <ref>` | copier un commit sur la branche courante |
| `git rebase <branche>` / `--continue` / `--abort` | rejouer les commits de la branche sur la branche cible |

<StageProgress stage="4" />
