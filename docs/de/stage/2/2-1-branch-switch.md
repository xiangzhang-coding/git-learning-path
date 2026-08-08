---
title: git branch und git switch
exercises:
  - id: 2-1-e1
    question: Was zeigt git branch an?
    options:
      - Eine Liste aller Branches, der aktuelle Branch ist mit * markiert
      - Eine Liste aller Commits
      - Nicht committete Änderungen
    correct: 0
    explanation: git branch listet die Branches im Repository und markiert den aktuell ausgecheckten Branch mit *.
    anchor: "#git-branch-anzeigen-und-erstellen"
  - id: 2-1-e2
    question: Was ist ein Branch im Kern?
    options:
      - Ein beweglicher Zeiger auf einen Commit
      - Eine vollständige Kopie des Codes
      - Ein eigener Ordner
    correct: 0
    explanation: Ein Branch ist nur ein Zeiger auf einen Commit. Das Erstellen eines Branch kopiert keine Dateien, daher ist er sehr leichtgewichtig.
    anchor: "#ein-branch-ist-ein-zeiger"
  - id: 2-1-e3
    question: Erstellen Sie im untenstehenden Übungsbereich den Branch feature und wechseln Sie zu ihm.
    type: task
    scenario: branching
    goal: Verwenden Sie git switch -c feature, um „Erstellen und Wechseln" in einem Schritt zu erledigen.
    checks:
      - type: branchExists
        name: feature
      - type: branchIs
        name: feature
    explanation: git switch -c feature entspricht den beiden Schritten „Branch feature erstellen + hineinwechseln". HEAD zeigt jetzt auf feature.
    anchor: "#git-switch-wechselt-den-branch"
  - id: 2-1-e4
    question: Wechseln Sie im untenstehenden Übungsbereich zurück zum Branch main.
    type: task
    scenario: branching
    goal: Verwenden Sie git switch main, um zu main zurückzukehren.
    checks:
      - type: branchIs
        name: main
    explanation: Beim Wechseln bewegen sich nur HEAD und der Inhalt des Working tree; die Commits bleiben in ihren jeweiligen Branches.
    anchor: "#git-switch-wechselt-den-branch"
---

# git branch und git switch

## Lektionsziele

- Mit git branch Branches anzeigen und erstellen
- Mit git switch zwischen Branches wechseln
- Verstehen, dass ein Branch ein Zeiger ist und HEAD auf die aktuelle Position zeigt

## Ein Branch ist ein Zeiger

Ein Branch ist im Kern ein **beweglicher Zeiger auf einen Commit**. Das Erstellen eines Branch kopiert keine Dateien, es fügt nur einen Namen hinzu, der auf den aktuellen Commit zeigt:

```bash
git branch feature
```

Dieser Befehl hält im Repository einen Namen `feature` fest, der auf den Commit zeigt, auf dem HEAD gerade steht. Wenn Sie danach auf `feature` committen, wandert der Zeiger `feature` mit.

**Kernkonzept: Ein Branch hat kein „eigenes Code-Stück"** — er ist nur eine Positionsmarkierung in der Historie. Derselbe Working tree zeigt beim Wechsel des Branch-Namens die Dateien des Snapshots, auf den der Branch-Zeiger zeigt.

## git branch anzeigen und erstellen

```bash
git branch        # listet alle Branches, der aktuelle trägt ein *
git branch <Name> # erstellt einen Branch (ohne zu wechseln)
```

Die Ausgabe sieht etwa so aus:

```
* main
  feature
```

Das Erstellen eines Branch hält nur einen Zeiger fest und **wechselt nicht hinüber**. Dafür verwenden Sie switch.

## git switch wechselt den Branch

```bash
git switch <Name>      # zu einem vorhandenen Branch wechseln
git switch -c <Name>   # erstellen und wechseln (am häufigsten verwendet)
```

- `git switch feature`: HEAD bewegt sich zu `feature`, die Dateien im Working tree werden durch den Snapshot dieses Branch ersetzt
- `git switch -c feature`: erstellt einen neuen Branch und wechselt sofort hinüber, entspricht `git branch feature` + `git switch feature`

**Ältere Schreibweise**: `git checkout <Name>` und `git checkout -b <Name>` sind die alten Befehle mit derselben Wirkung; `git switch` ist der neuere empfohlene Befehl — der Übungsbereich unterstützt beide. `git checkout` hat außerdem eine „Dateien wiederherstellen“-Verwendung, die heute von `git restore` übernommen wird (Stufe 1).

Wenn beim Wechseln noch nicht committete Änderungen im Working tree liegen, lehnt git ab und rät, zuerst zu committen oder zu stashen — denn nach dem Wechsel des Snapshots hätten die Änderungen keinen Platz mehr.

## HEAD zeigt auf die aktuelle Position

**HEAD** ist ein besonderer Zeiger, der festhält, auf welchem Branch und welchem Commit Sie gerade stehen. `On branch feature` am Anfang von `git status` ist die Antwort von HEAD. Einen Branch wechseln bedeutet, den Zeiger HEAD zu bewegen.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="branching" />

<LessonProgress />
