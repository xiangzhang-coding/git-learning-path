---
title: Auf einem Branch arbeiten
exercises:
  - id: 2-2-e1
    question: Sie committen auf dem Branch feature und wechseln zurück zu main — sehen Sie diesen Commit dort?
    options:
      - Nein, Commits landen nur auf dem aktuellen Branch
      - Ja, alle Branches teilen sich dieselbe Historie
      - Das hängt von der Commit-Nachricht ab
    correct: 0
    explanation: Jeder Commit landet auf dem Zeiger des aktuellen Branch. Commits auf feature bewegen nur feature; die Historie von main bleibt unberührt.
    anchor: "#commits-landen-nur-auf-dem-aktuellen-branch"
  - id: 2-2-e2
    question: Nachdem zwei Branches jeweils committet haben, welche Form hat der Commit-Graph?
    options:
      - Ein DAG (gerichteter azyklischer Graph), der vom gemeinsamen Vorfahren abzweigt
      - Immer eine gerade Linie
      - Nur die Aufzeichnung eines Branch
    correct: 0
    explanation: Wenn die Branches jeweils voranschreiten, zweigt die Historie von einem gemeinsamen Commit ab und bildet einen verzweigten Baum — in der Welt von git DAG genannt.
    anchor: "#abzweigung-und-commit-graph"
  - id: 2-2-e3
    question: Machen Sie im untenstehenden Übungsbereich einen Commit auf dem Branch feature.
    type: task
    scenario: branching
    goal: 'Erstellen Sie feature mit git switch -c feature, legen Sie feat.txt an (Inhalt beliebig) und committen Sie mit einer Commit-Nachricht, die "feat" enthält.'
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
      - type: hasCommit
        messageContains: feat
    explanation: "Nach dem Commit zweigt der Commit-Graph unten im Übungsbereich ab: der Zeiger feature ist ein Feld vorgerückt, main bleibt stehen."
    anchor: "#commits-landen-nur-auf-dem-aktuellen-branch"
  - id: 2-2-e4
    question: Wechseln Sie im untenstehenden Übungsbereich zurück zu main und halten Sie den Working tree sauber.
    type: task
    scenario: branching
    goal: Wechseln Sie mit git switch main zurück zu main, Status ist clean.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Nach dem Wechsel zurück zu main sind die Commits von feature in der Historie von main nicht sichtbar — der Branch-Zeiger existiert aber weiter, und Sie können jederzeit zurückschalten.
    anchor: "#commits-landen-nur-auf-dem-aktuellen-branch"
---

# Auf einem Branch arbeiten

## Lektionsziele

- Auf einem Branch committen und verstehen, dass Commits nur auf dem aktuellen Branch landen
- Die Abzweigung verstehen: Der Commit-Graph zweigt vom gemeinsamen Vorfahren ab
- Mit dem Commit-Graph im Übungsbereich die Branch-Struktur beobachten

## Commits landen nur auf dem aktuellen Branch

Nach dem Erstellen eines Branch landen **Commits nur auf dem aktuellen Branch**. Angenommen `main` steht auf Commit A, dann:

```bash
git switch -c feature
# Code ändern
git commit -m "feat: login page"
```

Dieser Commit bewegt nur `feature` vorwärts, `main` bleibt bei A stehen. Nach dem Wechsel zurück zu main sehen Sie diesen Commit nicht und auch die Datei nicht — der Working tree stellt den Snapshot von A wieder her.

**Genau darin liegt der Kernzweck eines Branch**: Auf feature frei experimentieren, während main stabil bleibt.

## Abzweigung und Commit-Graph

Wenn main und feature jeweils committen, zweigt die Historie vom gemeinsamen Vorfahren ab:

```
o  A (gemeinsamer Ausgangspunkt von main und feature)
|\
o |  B (neuer Commit von main)
| o  C (neuer Commit von feature)
```

Diese Struktur heißt **Commit-Graph (commit graph)**, technisch ein DAG (gerichteter azyklischer Graph) — jeder Commit hat höchstens zwei Eltern-Commits und es gibt keine Zyklen. Der Commit-Graph im Übungsbereich zeichnet ihn in Echtzeit: Der Branch-Name steht direkt an der Spitze des Branch.

## git log zeigt die Historie

```bash
git log --oneline
```

`git log` zeigt nur die Historie des **aktuellen Branch**. Auf feature zeigt es die Linie von feature; zurück auf main zeigt es die Linie von main. Um die Commits aller Branches zu sehen, ist der Commit-Graph im Übungsbereich am anschaulichsten.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="branching" />

<LessonProgress />
