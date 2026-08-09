# Kapitel 4 — Reparieren und Fortgeschrittenes

Der Prinzipfaden dieses Kapitels: **refs und reflog**. reset verschiebt Branch-Zeiger, revert/cherry-pick erzeugen neue Commits, rebase schreibt Historie um — und das reflog zeichnet jede Bewegung von HEAD auf, sodass sich jedes „Ups" zurückholen lässt.

## Lektionen

- 4-1 [git stash und git tag](/de/stage/4/4-1-stash-tag): Änderungen vorübergehend beiseitelegen, Versionen fest markieren
- 4-2 [git reset und reflog](/de/stage/4/4-2-reset-reflog): Die drei Modi, HEAD zu verschieben, Commits per reflog wiederfinden
- 4-3 [git revert und git cherry-pick](/de/stage/4/4-3-revert-cherry-pick): Rückgängig machen und Commits kopieren
- 4-4 [git rebase: Commits neu aufspielen](/de/stage/4/4-4-rebase): Historie linearisieren, Konflikte und Abbruch

## Neue Befehle dieses Kapitels

| Befehl | Wirkung |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | uncommittete Änderungen vorübergehend beiseitelegen |
| `git tag <name>` / `git tag -a <name> -m <msg>` | einen Commit dauerhaft markieren |
| `git reset [--hard\|--soft] <ref>` | HEAD verschieben (optional samt Index/Arbeitsverzeichnis) |
| `git reflog` | die komplette Bewegungsaufzeichnung von HEAD anzeigen |
| `git revert <ref>` | einen Commit mit einem umgekehrten neuen Commit zurücknehmen |
| `git cherry-pick <ref>` | einen Commit auf den aktuellen Branch kopieren |
| `git rebase <branch>` / `--continue` / `--abort` | Branch-Commits auf den Ziel-Branch aufspielen |

<StageProgress stage="4" />
