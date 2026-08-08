---
title: Das Drei-Bereiche-Modell
exercises:
  - id: 0-2-e1
    question: In welchem Bereich liegen die Dateien, die Sie gerade bearbeiten?
    options:
      - Working tree
      - Staging area
      - Repository
    correct: 0
    explanation: Der Working tree ist der Ort, an dem Sie Dateien bearbeiten; die Staging area ist die Liste vorbereiteter Änderungen; das Repository speichert die committete Historie.
    anchor: "#die-drei-bereiche"
  - id: 0-2-e2
    question: Was bewegt git add?
    options:
      - Änderungen vom Working tree in die Staging area
      - Änderungen von der Staging area ins Repository
      - Änderungen vom Repository in den Working tree
    correct: 0
    explanation: git add registriert Änderungen des Working tree in der Staging area; git commit schreibt die Historie (Staging area → Repository).
    anchor: "#die-drei-bereiche"
  - id: 0-2-e3
    question: Was bewegt git commit?
    options:
      - Working tree → Staging area
      - Staging area → Repository
      - Es verwirft die Änderungen
    correct: 1
    explanation: commit bündelt die gestagten Änderungen zu einem Commit und speichert sie im Repository (das .git-Verzeichnis) — ein Snapshot in der Historie.
    anchor: "#die-drei-bereiche"
  - id: 0-2-e4
    question: Was ist der größte Nutzen der Staging area?
    options:
      - Sie macht das Committen mühsamer
      - Sie erlaubt getrennte Commits, die Historie bleibt sauber
      - Sie behebt Fehler automatisch
    correct: 1
    explanation: Haben Sie zwei unabhängige Funktionen geändert, adden und committen Sie zuerst die erste, dann die zweite — jeder Commit bleibt lesbar und rückgängig machbar.
    anchor: "#warum-ein-weiterer-bereich"
---

# Das Drei-Bereiche-Modell

## Lektionsziele

- Working tree, Staging area und Repository kennenlernen
- Verstehen, was git add und git commit bewegen
- Wissen, was git status anzeigt

## Die drei Bereiche

Git teilt ein Repository in drei Bereiche:

- **Working tree**: die Dateien, die Sie bearbeiten — hier wirkt Ihr Editor
- **Staging area (auch index)**: die Liste der Änderungen, die Sie für den nächsten Commit ausgewählt haben
- **Repository (das `.git`-Verzeichnis)**: committete Historie-Snapshots

`git status` zeigt genau die Unterschiede zwischen diesen Bereichen: Dateien geändert, aber nicht geaddet; geaddet, aber nicht committet.

## Warum ein weiterer Bereich?

Die Staging area ermöglicht **Commits in Stücken**: Haben Sie zwei unabhängige Funktionen auf einmal geändert, adden und committen Sie zuerst die erste und dann die zweite — jede Commit-Historie bleibt sauber, lesbar und rückgängig machbar. Ohne sie wird aus einer Bearbeitungssitzung ein einziger Sammel-Commit („irgendwas geändert").

## Animation: die drei Bereiche

Klicken Sie die Buttons und beobachten Sie, wie die Datei zwischen den Bereichen wandert: Bearbeiten geschieht im Working tree, `git add` registriert sie in der Staging area, und nur `git commit` schreibt Historie.

<ThreeAreas />

## Übungen

<Exercise />

<LessonProgress />
