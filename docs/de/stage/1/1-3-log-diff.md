---
title: git log und git diff
exercises:
  - id: 1-3-e1
    question: Was zeigt git log --oneline?
    options:
      - "Pro Zeile einen Commit: kurzer Hash + Commit-Nachricht"
      - Den gesamten Inhalt der Dateien
      - Den Namen des aktuellen Branches
    correct: 0
    explanation: git log listet die Commit-Historie auf; --oneline verdichtet sie auf eine Zeile pro Commit (kurzer Hash + Nachricht) — die übliche Ansicht im Alltag.
    anchor: "#git-log-zeigt-die-historie"
  - id: 1-3-e2
    question: Was zeigt git diff?
    options:
      - Die inhaltlichen Unterschiede zwischen Working tree und Staging area
      - Die Unterschiede in der Commit-Historie
      - Die Codierungsunterschiede der Dateien
    correct: 0
    explanation: git diff vergleicht Working tree und Staging area (noch nicht gestagte Änderungen); git diff --staged vergleicht Staging area und HEAD (bereits gestagte Änderungen).
    anchor: "#git-diff-zeigt-anderungen"
  - id: 1-3-e3
    question: Ändern Sie im untenstehenden Übungsbereich src/a.js und committen Sie mit einer Nachricht, die "fix" enthält.
    type: task
    scenario: history
    goal: 'Ändern Sie const a = 2 in src/a.js zu const a = 3, stagen Sie die Änderung und committen Sie danach mit der Nachricht "fix: bump a".'
    checks:
      - type: hasCommit
        messageContains: fix
      - type: fileCommitted
        path: src/a.js
        contentContains: "const a = 3"
    explanation: Nach dem Commit umfasst die Historie 5 Commits; die erste Zeile von git log --oneline ist Ihr neuer Commit.
    anchor: "#git-log-zeigt-die-historie"
---

# git log und git diff

## Lektionsziele

- Mit git log die Commit-Historie ansehen
- Mit git diff die inhaltlichen Änderungen ansehen
- Kurzen Hash und Snapshot-Modell kennenlernen

## git log zeigt die Historie

```bash
git log              # vollständige Historie (mit Autor und Datum)
git log --oneline    # pro Commit eine Zeile: kurzer Hash + Nachricht
```

Der SHA-1-Hash jedes Commits ist seine Identität. `git log --oneline` zeigt die ersten 7 Zeichen — der kurze Hash genügt, um einen Commit eindeutig zu identifizieren.

## git diff zeigt Änderungen

```bash
git diff             # Working tree vs. Staging area (noch nicht gestagte Änderungen)
git diff --staged    # Staging area vs. HEAD (gestagt, aber noch nicht committet)
```

In der Ausgabe steht `-` für gelöschte Zeilen, `+` für neue Zeilen. Vor dem Commit mit diff zu prüfen, was man geändert hat, ist eine Standardgewohnheit.

## Das Snapshot-Modell

Jeder Commit speichert einen **vollständigen Snapshot** statt eines Diffs. git hasht den Inhalt mit SHA-1 — bei gleichem Inhalt ist der Hash gleich, daher kann der Hash selbst die Integrität prüfen und Speicher deduplizieren. Genau das macht „verteilt“ erst möglich: In jedem Klon ist die Historie vollständig rekonstruierbar.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="history" />

<LessonProgress />
