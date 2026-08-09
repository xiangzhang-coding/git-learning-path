---
title: git revert und git cherry-pick
exercises:
  - id: 4-3-e1
    question: Wie macht git revert einen Commit rückgängig?
    options:
      - Es entsteht ein neuer, umgekehrter Commit, die Historie läuft weiter
      - Der Commit wird direkt gelöscht
      - Der Branch-Zeiger wandert zurück
    correct: 0
    explanation: revert schreibt die Historie nicht um — es erzeugt einen neuen, umgekehrten Commit, der die Änderungen des Ziel-Commits ausgleicht. Geeignet für bereits gepushte Commits.
    anchor: "#git-revert-commits-ruckgangig-machen"
  - id: 4-3-e2
    question: Wofür verwendet man git cherry-pick?
    options:
      - Einen Commit von einem Branch auf den aktuellen Branch kopieren
      - Zwei Branches zusammenführen
      - Dateien zum Vergleichen auswählen
    correct: 0
    explanation: cherry-pick wendet die Änderungen eines bestimmten Commits auf den aktuellen Branch an und erzeugt einen neuen Commit — praktisch, wenn Sie nur genau diesen einen Commit übernehmen wollen.
    anchor: "#git-cherry-pick-commits-kopieren"
  - id: 4-3-e3
    question: Machen Sie im untenstehenden Übungsbereich den schlechten Commit rückgängig.
    type: task
    scenario: revert
    goal: "Machen Sie den letzten schlechten Commit (fix: break hello) mit git revert rückgängig, damit hello.txt wieder den richtigen Inhalt hat."
    checks:
      - type: hasCommit
        messageContains: Revert
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
    explanation: 'revert erzeugt einen neuen Commit "Revert \"fix: break hello\"", hello.txt erhält wieder den Inhalt von vor der Zerstörung.'
    anchor: "#git-revert-commits-ruckgangig-machen"
  - id: 4-3-e4
    question: Kopieren Sie im untenstehenden Übungsbereich den Commit des feature-Branches auf main.
    type: task
    scenario: cherry-pick
    goal: Führen Sie auf main git cherry-pick <Commit des feature-Branches> aus, um die Funktion von feature.txt auf main zu bringen.
    checks:
      - type: hasCommit
        messageContains: feature work
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: Nach dem cherry-pick bleibt der feature-Branch unverändert; auch auf main liegt nun ein inhaltlich identischer Commit.
    anchor: "#git-cherry-pick-commits-kopieren"
---

# git revert und git cherry-pick

## Lektionsziele

- Mit git revert vorhandene Commits rückgängig machen
- Mit git cherry-pick Commits kopieren
- Verstehen, dass beide die Historie nicht umschreiben

## git revert: Commits rückgängig machen

```bash
git revert <Commit>
```

revert löscht den Commit nicht, sondern **erzeugt einen neuen, umgekehrten Commit**: Die Änderungen des Ziel-Commits werden umgekehrt angewendet, die Historie läuft normal weiter:

```
o  A ---- B ---- C (fix: break hello) ---- D (Revert "fix: break hello")
```

Warum nicht reset? Weil **revert die Historie nicht umschreibt** — Commits, die andere bereits geklont oder gepullt haben, würden nach einem reset auf allen Kopien inkonsistent; revert fügt nur „einen ausgleichenden Commit" hinzu und ist damit für alle sicher. Faustregel: **Ungeschobene Fehler mit reset, bereits geschobene Fehler mit revert**.

## git cherry-pick: Commits kopieren

```bash
git cherry-pick <Commit>   # diesen Commit auf den aktuellen Branch kopieren
```

cherry-pick wendet die Änderungen **eines bestimmten Commits** auf den aktuellen Branch an und erzeugt einen neuen Commit (gleicher Inhalt, andere Hash). Typisches Szenario: Jemand hat auf dem feature-Branch einen Bug gefixt, und Sie wollen genau diesen Fix auf main übernehmen, ohne das ganze Feature zu mergen.

```
o  A ---- B (main) ---- B' (gecherrypickter Fix)
     \
      C (Fix auf feature)
```

## Unterschied zwischen revert und cherry-pick

| | revert | cherry-pick |
| --- | --- | --- |
| Richtung | rückgängig machen (umgekehrt anwenden) | kopieren (normal anwenden) |
| Einsatz | Commit enthält einen Fehler, der weg soll | Commit ist gut und soll auf einen anderen Branch |
| Ergebnis | ein neuer Commit gleicht den alten aus | ein neuer Commit ahmt den alten nach |

Beide schreiben die vorhandene Historie nicht um; bei Konflikten stoppen beide, bis Sie sie lösen.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="revert" />

<LessonProgress />
