---
title: git fetch und git pull
exercises:
  - id: 3-4-e1
    question: Was macht git fetch?
    options:
      - Neue Remote-Commits herunterladen und den Tracking-Branch aktualisieren, ohne das Arbeitsverzeichnis anzufassen
      - Herunterladen und direkt in den aktuellen Branch integrieren
      - Lokale Commits zum Remote senden
    correct: 0
    explanation: fetch aktualisiert nur die „Spiegelung des Remotes" (origin/main); Ihr Branch und das Arbeitsverzeichnis bleiben unverändert — so sehen Sie gefahrlos nach, was es Neues gibt.
    anchor: "#git-fetch-nur-ansehen-nichts-verandern"
  - id: 3-4-e2
    question: Wie hängen git pull und git fetch zusammen?
    options:
      - pull = fetch + merge (die neuen Remote-Commits in den aktuellen Branch integrieren)
      - pull = fetch + push
      - Beide sind völlig identisch
    correct: 0
    explanation: pull führt zuerst fetch aus, um die Spiegelung zu aktualisieren, und integriert origin/main dann per merge (oder Fast-forward) in den aktuellen Branch.
    anchor: "#git-pull-fetch-merge"
  - id: 3-4-e3
    question: Rufen Sie im untenstehenden Übungsbereich die neuen Commits des Remotes ab.
    type: task
    scenario: pull-ff
    goal: Führen Sie auf main git pull aus, um die neuen Remote-Commits per Fast-forward zu integrieren.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: origin/main
      - type: statusClean
    explanation: "Wenn lokal keine neuen Commits vorliegen, ist pull ein Fast-forward: Die neu hinzugekommenen Dateien erscheinen direkt im Arbeitsverzeichnis, die Historie bleibt eine gerade Linie."
    anchor: "#git-pull-fetch-merge"
---

# git fetch und git pull

## Lektionsziele

- Mit git fetch Remote-Updates herunterladen, ohne das Arbeitsverzeichnis zu verändern
- Verstehen, dass pull = fetch + merge ist
- Mit git log origin/main den Stand des Remotes beobachten

## git fetch: nur ansehen, nichts verändern

```bash
git fetch            # alle neuen Commits von origin herunterladen
git fetch origin     # gleichwertige Schreibweise
```

fetch lädt die **neuen Commit-Objekte** des Remotes herunter und aktualisiert den Tracking-Branch `origin/main` — aber **Ihr Branch und Ihr Arbeitsverzeichnis bleiben unberührt**:

```
From /origin
   b095b2..3f4a11  main -> origin/main
```

Nach dem fetch können Sie gefahrlos „nachsehen" und jederzeit prüfen, wie groß der Abstand zwischen Remote und lokalem Stand ist:

```bash
git log origin/main --oneline   # was auf der anderen Seite liegt
git log main..origin/main       # Commits, die das Remote hat, lokal aber fehlen
```

## git pull = fetch + merge

```bash
git pull             # gleichwertig zu git fetch + git merge origin/main
```

pull ist die Zusammenfassung beider Schritte: erst fetch (Spiegelung aktualisieren), dann `origin/main` in den aktuellen Branch integrieren.

- **Lokal gibt es keine neuen Commits**: Fast-forward-Merge, das Arbeitsverzeichnis wird direkt aktualisiert, die Historie bleibt eine Linie
- **Lokal gibt es ebenfalls neue Commits**: Es entsteht ein Merge-Commit, die Geschichten beider Branches werden zusammengeführt
- **Beide Seiten haben dieselbe Stelle geändert**: Konflikt — der Lösungsablauf ist derselbe wie in Kapitel 2 (editieren → add → commit)

## Wann welcher Befehl

| Situation | Befehl |
| --- | --- |
| Nur sehen wollen, was es Neues gibt | `git fetch` |
| Die neuen Remote-Commits direkt bekommen | `git pull` |
| Push wird abgelehnt | erst `git pull`, dann `git push` |

**Goldene Regel**: Vor dem push erst pullen — wer zuerst die Remote-Updates integriert und dann die eigenen sendet, bekommt keinen non-fast-forward-Reject.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="pull" />

<LessonProgress />
