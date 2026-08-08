# Stufe 3 — Remote-Zusammenarbeit

Der Prinzipfaden dieser Stufe: **zwei Repositorys und Tracking-Branches**. Ein remote ist die Adresse eines anderen Repositorys; clone kopiert es, fetch aktualisiert die „Spiegelung des Remotes" (origin/main), push sendet die lokalen Commits dorthin, pull = fetch + merge.

## Lektionen

- 3-1 [git remote: Remote-Repositories verwalten](/de/stage/3/3-1-remote): Was ein remote ist, hinzufügen und ansehen
- 3-2 [git clone klont ein Repository](/de/stage/3/3-2-clone): In einem Schritt kopieren, origin und Tracking-Branch
- 3-3 [git push überträgt Commits](/de/stage/3/3-3-push): Lokale Commits senden, Non-fast-forward wird abgelehnt
- 3-4 [git fetch und git pull](/de/stage/3/3-4-fetch-pull): fetch sieht nur nach, pull = fetch + merge

## Neue Befehle dieser Stufe

| Befehl | Wirkung |
| --- | --- |
| `git remote add <name> <url>` | Die Adresse eines Remote-Repositorys registrieren |
| `git remote -v` | Namen und Adressen aller Remotes anzeigen |
| `git clone <url> [<dir>]` | Ein Remote-Repository vollständig lokal kopieren |
| `git push` | Die Commits des aktuellen Branches zum Remote übertragen |
| `git fetch` | Neue Remote-Commits herunterladen und den Tracking-Branch aktualisieren |
| `git pull` | fetch + merge: Remote-Updates abrufen und integrieren |
| `git log origin/main` | Die Historie ansehen, auf die der Remote-Branch aktuell zeigt |
| `cd <dir>` | Im Übungsbereich das Verzeichnis wechseln (nach dem Klonen ins neue Repository) |

<StageProgress stage="3" />
