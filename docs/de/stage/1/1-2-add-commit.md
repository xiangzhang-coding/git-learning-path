---
title: git add und git commit
exercises:
  - id: 1-2-e1
    question: In welchen Bereich legt git add die Änderungen?
    options:
      - working tree
      - Staging area
      - Repository
    correct: 1
    explanation: git add trägt die Änderungen des Working tree in die Staging area ein — das bedeutet „diese Änderungen sollen committet werden“.
    anchor: "#git-add-stagt-anderungen"
  - id: 1-2-e2
    question: Wofür ist der Parameter -m von git commit?
    options:
      - Zwei Branches zusammenführen
      - Einen Text für diesen Commit schreiben
      - Den Autor des Commits ändern
    correct: 1
    explanation: -m liefert die Commit-Nachricht (commit message), die festhält, was dieser Commit getan hat. Gute Commit-Nachrichten sind für andere geschrieben — auch für Ihr zukünftiges Ich.
    anchor: "#git-commit-speichert-einen-snapshot"
  - id: 1-2-e3
    question: Stagen Sie im untenstehenden Übungsbereich die Datei todo.txt.
    type: task
    scenario: add-commit
    goal: Verwenden Sie git add todo.txt, um die Datei in die Staging area zu legen.
    checks:
      - type: fileStaged
        path: todo.txt
    explanation: Nach dem Stagen erscheint todo.txt in git status unter „Changes to be committed“.
    anchor: "#git-add-stagt-anderungen"
  - id: 1-2-e4
    question: Committen Sie im untenstehenden Übungsbereich todo.txt mit einer Commit-Nachricht, die "todo" enthält.
    type: task
    scenario: add-commit
    goal: 'Stagen Sie todo.txt mit git add todo.txt und committen Sie danach mit git commit -m "feat: add todo".'
    checks:
      - type: hasCommit
        messageContains: todo
      - type: fileCommitted
        path: todo.txt
    explanation: Nach dem Commit ist todo.txt Teil der Repository-Historie. Beachten Sie, dass die Änderungen an hello.txt weiterhin im Working tree liegen und nicht committet wurden — ein Commit verpackt nur den Inhalt der Staging area.
    anchor: "#git-commit-speichert-einen-snapshot"
---

# git add und git commit

## Lektionsziele

- Mit git add Änderungen in die Staging area legen
- Mit git commit einen Snapshot speichern
- Verstehen, dass ein Commit nur den Inhalt der Staging area übernimmt

## git add stagt Änderungen

```bash
git add <Dateiname>     # eine einzelne Datei stagen
git add .               # alle Änderungen im aktuellen Verzeichnis stagen
```

`git add` trägt die Änderungen des Working tree in die **Staging area** ein. Sie können gezielt auswählen: An drei Stellen geändert und nur eine davon gestagt — die Historie bleibt sauber.

## git commit speichert einen Snapshot

```bash
git commit -m "feat: add login page"
```

`git commit` verpackt den Inhalt der **Staging area** in einen Commit und schreibt ihn in die Repository-Historie. Jeder Commit:

- speichert einen vollständigen **Snapshot** aller Dateien des Projekts (keine Diffs)
- erzeugt mit dem SHA-1-Hash eine eindeutige ID (z. B. `4a2b9c1`)
- hält Autor, Zeitpunkt und Commit-Nachricht fest

**Die entscheidende Regel: Ein Commit enthält nur den Inhalt der Staging area.** Änderungen im Working tree, die nicht gestagt wurden, gehen nicht in diesen Commit ein.

## Wie schreibt man eine Commit-Nachricht

Sagen Sie in einem Satz klar, was getan wurde: Verb am Anfang, einheitliche Zeitform, höchstens 50 Zeichen. Zum Beispiel `fix: correct the login validation`.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="add-commit" />

<LessonProgress />
