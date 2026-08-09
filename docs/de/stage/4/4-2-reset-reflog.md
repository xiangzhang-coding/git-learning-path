---
title: git reset und reflog
exercises:
  - id: 4-2-e1
    question: Was macht git reset --hard?
    options:
      - HEAD, Index und Arbeitsverzeichnis alle zum Ziel-Commit verschieben und die Commits dazwischen samt Änderungen verwerfen
      - Nur die Nachricht des letzten Commits zurücknehmen
      - Änderungen zum Remote pushen
    correct: 0
    explanation: --hard setzt alle drei zurück — Branch-Zeiger, Staging-Bereich und Arbeitsverzeichnis kehren zum Zustand des Ziel-Commits zurück. Gefährlich, aber häufig benutzt.
    anchor: "#git-reset-head-verschieben"
  - id: 4-2-e2
    question: Kann man per reset verworfene Commits wiederherstellen?
    options:
      - Ja, per git reflog den Hash finden und mit reset zurücksetzen
      - Nein, sie sind für immer weg
      - Nur durch erneutes Clone vom Remote
    correct: 0
    explanation: git löscht Commit-Objekte nicht sofort; das reflog protokolliert jede Bewegung von HEAD — mit dem alten Hash stellen Sie alles wieder her.
    anchor: "#git-reflog-verlorene-commits-finden"
  - id: 4-2-e3
    question: Nehmen Sie im untenstehenden Übungsbereich den letzten Commit zurück.
    type: task
    scenario: reset
    goal: Führen Sie git reset --hard HEAD~1 aus, um den letzten Commit (samt seiner Änderungen) zu entfernen.
    checks:
      - type: headAt
        ref: HEAD~1
    explanation: reset --hard HEAD~1 lässt den Branch einen Schritt zurückgehen; auch das Arbeitsverzeichnis springt einen Schritt zurück.
    anchor: "#git-reset-head-verschieben"
  - id: 4-2-e4
    question: Finden Sie im untenstehenden Übungsbereich den per reset verworfenen Commit über das reflog wieder.
    type: task
    scenario: reset
    goal: Suchen Sie mit git reflog den eben per reset entfernten Commit (Nachricht enthält "break") und stellen Sie ihn mit git reset --hard wieder her.
    checks:
      - type: hasCommit
        messageContains: break hello
    explanation: Das reflog zeigt die komplette Geschichte von HEAD — mit dem Hash von vor dem reset stellt reset --hard den Zustand wieder her.
    anchor: "#git-reflog-verlorene-commits-finden"
---

# git reset und reflog

## Lektionsziele

- Mit git reset HEAD und den Arbeitszustand verschieben
- Den Unterschied zwischen --hard / mixed / --soft kennen
- Mit git reflog per reset verworfene Commits wiederfinden

## git reset: HEAD verschieben

```bash
git reset --hard <Commit>   # HEAD, Index und Arbeitsverzeichnis zurück
git reset <Commit>          # HEAD und Index zurück, Arbeitsverzeichnis bleibt
git reset --soft <Commit>   # nur HEAD, Index und Arbeitsverzeichnis bleiben
```

**reset bedeutet „zurückgehen"**: Der Branch-Zeiger wird auf einen beliebigen Commit gesetzt. Die drei Modi unterscheiden sich darin, wie weit die Wirkung reicht:

| Modus | HEAD | Index (Staging-Bereich) | Arbeitsverzeichnis |
| --- | --- | --- | --- |
| `--soft` | verschieben | bleibt | bleibt |
| Standard (mixed) | verschieben | zurücksetzen | bleibt |
| `--hard` | verschieben | zurücksetzen | zurücksetzen |

`--hard` ist der gebräuchlichste und zugleich gefährlichste Modus: Alle Commits dazwischen und uncommittete Änderungen verschwinden (das Arbeitsverzeichnis wird direkt überschrieben). Nach `--hard` sagt die Ausgabe `HEAD is now at <Kurz-Hash> <Nachricht>`, wo Sie jetzt stehen.

## git reflog: verlorene Commits finden

```bash
git reflog
```

**Das reflog (reference log) ist die vollständige Bewegungsaufzeichnung von HEAD** — nicht nur die Geschichte des aktuellen Branch, sondern „wo Ihr HEAD überall war":

```
3f4a11a HEAD@{0}: reset: moving to 3f4a11a
9b2c6d5 HEAD@{1}: commit: fix: break hello
```

Die per reset verworfenen Commits sind **nicht gelöscht**, es zeigt nur kein Branch mehr auf sie. Im reflog finden Sie ihren Hash und holen sie mit `git reset --hard <Hash>` vollständig zurück. Das ist Gits „Wiederherstellungs-Trick": Solange die Operation lokal stattfand, ist fast alles wiederherstellbar.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="reset" />

<LessonProgress />
