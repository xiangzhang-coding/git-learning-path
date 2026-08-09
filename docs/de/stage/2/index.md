# Kapitel 2 — Branches und Merges

Der Prinzipfaden dieses Kapitels: **Commit-Graph und HEAD**. Ein Branch ist nur ein Zeiger auf einen Commit, HEAD markiert Ihre aktuelle Position; alle Branch-Operationen (switch, merge, conflict) bewegen Zeiger auf dem Commit-Graph oder führen Abzweigungen wieder zusammen.

## Lektionen

- 2-1 [git branch und git switch](/de/stage/2/2-1-branch-switch): Ein Branch ist ein Zeiger, HEAD ist die aktuelle Position
- 2-2 [Auf einem Branch arbeiten](/de/stage/2/2-2-branch-workflow): Commits landen nur auf dem aktuellen Branch, die Historie zweigt zu einem DAG ab
- 2-3 [git merge führt Branches zusammen](/de/stage/2/2-3-merge): Fast-forward-Merge und Merge-Commit
- 2-4 [Merge-Konflikte lösen](/de/stage/2/2-4-merge-conflict): Konfliktmarker und der Ablauf der Lösung

## Neue Befehle dieses Kapitels

| Befehl | Wirkung |
| --- | --- |
| `git branch` | Branch-Liste anzeigen, der aktuelle Branch trägt ein `*` |
| `git branch <Name>` | Branch erstellen (ohne zu wechseln) |
| `git switch <Name>` | Zu einem vorhandenen Branch wechseln |
| `git switch -c <Name>` | Branch erstellen und zu ihm wechseln |
| `git merge <Branch>` | Den Ziel-Branch in den aktuellen Branch integrieren |

<StageProgress stage="2" />
