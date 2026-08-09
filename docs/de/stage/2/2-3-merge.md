---
title: git merge führt Branches zusammen
exercises:
  - id: 2-3-e1
    question: Wann findet ein fast-forward-Merge statt?
    options:
      - Der aktuelle Branch hat keine neuen Commits, die Commits des Ziel-Branch liegen alle dahinter
      - Immer
      - Wenn beide Branches neue Commits haben
    correct: 0
    explanation: Wenn main stehen bleibt und feature dahinter neue Commits anfügt, muss der Merge den Zeiger main nur direkt vorwärts bewegen; die Historie bleibt eine gerade Linie und es entsteht kein neuer Commit.
    anchor: "#fast-forward-merge"
  - id: 2-3-e2
    question: Was erzeugt git merge, wenn beide Branches neue Commits haben?
    options:
      - Einen Merge-Commit (mit zwei Eltern-Commits)
      - Zwei neue Commits
      - Einen Tag
    correct: 0
    explanation: Nach der Abzweigung muss git die Änderungen beider Seiten zusammenführen und erzeugt einen Merge-Commit mit zwei Eltern-Commits.
    anchor: "#merge-commit"
  - id: 2-3-e3
    question: Führen Sie im untenstehenden Übungsbereich feature in main zusammen (Fast-forward).
    type: task
    scenario: merge-ff
    goal: Führen Sie auf main git merge feature aus; nach dem Merge enthält der Working tree feature.txt.
    checks:
      - type: branchIs
        name: main
      - type: mergeDone
        branch: feature
      - type: noMergeCommit
      - type: fileCommitted
        path: feature.txt
        contentContains: feature work
    explanation: "In der Ausgabe steht Fast-forward: main hatte keine neuen Commits, der Zeiger rückt direkt zu feature vor und feature.txt erscheint im Working tree."
    anchor: "#fast-forward-merge"
  - id: 2-3-e4
    question: Führen Sie im untenstehenden Übungsbereich feature in main zusammen (beide Branches sind abgezweigt).
    type: task
    scenario: merge
    goal: Führen Sie auf main git merge feature aus, um einen normalen Merge durchzuführen.
    checks:
      - type: mergeDone
        branch: feature
      - type: mergeCommit
    explanation: Diesmal ist die Historie abgezweigt, der Merge erzeugt einen Merge-Commit. Im Commit-Graph des Übungsbereichs verbindet der Merge-Commit zwei Branches.
    anchor: "#merge-commit"
---

# git merge führt Branches zusammen

## Lektionsziele

- Mit git merge einen Branch in den aktuellen Branch integrieren
- Fast-forward-Merge und Merge-Commit unterscheiden
- Verstehen, dass ein Merge-Commit zwei Eltern-Commits hat

## Der Ablauf von git merge

```bash
git switch main     # zuerst zur Seite wechseln, die die Änderungen empfängt
git merge feature   # feature einbringen
```

`git merge <Branch>` integriert die Änderungen des Ziel-Branch in den **aktuellen Branch**. Es sucht zuerst den **gemeinsamen Vorfahren** beider Branches, berechnet dann die Unterschiede entlang der drei Pfade (gemeinsamer Vorfahre → aktueller Branch, gemeinsamer Vorfahre → Ziel-Branch) und fügt die Änderungen zu einer Fassung zusammen.

## Fast-forward-Merge

Wenn der aktuelle Branch keine neuen Commits hat und der Ziel-Branch nur „ein paar Schritte weitergegangen" ist:

```
o  A ← main steht hier
|
o  B ← feature
|
o  C ← feature committet noch einmal
```

`git merge feature` muss den Zeiger `main` nur **direkt vorwärts** zu C bewegen — das ist fast-forward. Die Ausgabe zeigt `Fast-forward`, **es entsteht kein neuer Commit**, die Historie bleibt eine gerade Linie.

<MergeVisual />

## Merge-Commit

Wenn beide Branches jeweils committet haben (die Historie abgezweigt ist), gibt es keinen Weg des „Zeiger-Vorwärtsbewegens" — git muss den Inhalt beider Seiten zu einem neuen Commit zusammenführen:

```
o  A
|\
| o  B (neuer Commit von main)
o |  C (neuer Commit von feature)
 \|
  o  M (Merge-Commit, zwei Eltern-Commits: B und C)
```

Das Besondere an diesem **Merge-Commit**: Er hat zwei Eltern-Commits (parent). Im Commit-Graph des Übungsbereichs verbindet der Merge-Commit beide Branches.

## Automatisches Zusammenführen

Solange beide Seiten unterschiedliche Stellen geändert haben, kann git die Änderungen automatisch zu einer Fassung zusammenführen, ohne dass Sie etwas tun müssen — die Ausgabe sieht etwa so aus:

```
Merge made by the 'ort' strategy.
 2 file(s) changed
```

Wenn beide Seiten dieselbe Stelle geändert haben, kommt das Thema der nächsten Lektion ins Spiel: der conflict.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="merge" />

<LessonProgress />
