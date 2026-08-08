---
title: Merge-Konflikte lösen
exercises:
  - id: 2-4-e1
    question: Wann entsteht ein Konflikt (conflict)?
    options:
      - Wenn beide Seiten dieselbe Stelle derselben Datei geändert haben
      - Wenn beide Seiten verschiedene Dateien geändert haben
      - Immer, wenn git merge ausgeführt wird
    correct: 0
    explanation: Bei unterschiedlichen Stellen kann git automatisch zusammenführen; nur wenn beide Seiten dieselbe Stelle geändert haben und git nicht entscheiden kann, wessen Version bleibt, müssen Sie manuell entscheiden.
    anchor: "#wie-ein-konflikt-entsteht"
  - id: 2-4-e2
    question: Was steht zwischen den Konfliktmarkern <<<<<<< HEAD und =======?
    options:
      - Die Änderung des aktuellen Branch (HEAD) an dieser Stelle
      - Die Änderung des anderen Branch an dieser Stelle
      - Der vollständige Dateiinhalt
    correct: 0
    explanation: In der Konfliktdatei steht zwischen <<<<<<< HEAD und ======= die Version „Ihrer Seite", zwischen ======= und >>>>>>> die Version der „anderen Seite".
    anchor: "#konfliktmarker"
  - id: 2-4-e3
    question: Erzeugen Sie im untenstehenden Übungsbereich einen Konflikt und lösen Sie ihn.
    type: task
    scenario: conflict
    goal: 'Führen Sie git merge feature aus, um den Konflikt auszulösen; ändern Sie den Inhalt von hello.txt auf "hello resolved" und entfernen Sie die Konfliktmarker; führen Sie git add hello.txt aus; committen Sie danach mit git commit, um den Merge abzuschließen.'
    checks:
      - type: mergeCommit
      - type: fileCommitted
        path: hello.txt
        contentContains: hello resolved
      - type: mergeDone
    explanation: "Das Wesen der Konfliktlösung ist „Sie treffen die Entscheidung, die git nicht treffen kann\": Datei bearbeiten, Marker entfernen, add, commit — damit entsteht der Merge-Commit."
    anchor: "#der-ablauf-beim-losen-eines-konflikts"
  - id: 2-4-e4
    question: Welcher Befehl schließt den Merge ab, nachdem der Konflikt gelöst ist (nach dem add)?
    options:
      - git commit (das Lösungsergebnis committen, erzeugt den Merge-Commit)
      - git stash
      - git reset
    correct: 0
    explanation: Nach dem Lösen und add befindet sich git noch im Merge (MERGE_HEAD existiert); jetzt erzeugt git commit mit dem aktuellen Inhalt den Merge-Commit und beendet den Merge.
    anchor: "#der-ablauf-beim-losen-eines-konflikts"
---

# Merge-Konflikte lösen

## Lektionsziele

- Verstehen, warum Konflikte entstehen
- Konfliktmarker lesen
- Den Standardablauf der Konfliktlösung beherrschen: bearbeiten → add → commit

## Wie ein Konflikt entsteht

Beim Merge muss git die Änderungen beider Seiten zu einer Fassung zusammenführen. Wenn beide Seiten **unterschiedliche Stellen** geändert haben, kann git automatisch zusammenführen; wenn aber **beide Seiten dieselbe Stelle derselben Datei geändert haben**, kann git nicht entscheiden, wessen Version bleiben soll — es legt beide Versionen in die Datei und überlässt Ihnen die Entscheidung.

```
<<<<<<< HEAD
hello main
=======
hello feature
>>>>>>> feature
```

Die Ausgabe nennt Ihnen deutlich die betroffene Datei:

```
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Konfliktmarker

Jeder Konfliktblock in der Konfliktdatei hat drei Marker:

| Marker | Bedeutung |
| --- | --- |
| `<<<<<<< HEAD` | Darunter steht der Inhalt Ihrer Seite (aktueller Branch) |
| `=======` | Trennlinie |
| `>>>>>>> feature` | Darunter steht der Inhalt des anderen Branch (feature), der Marker trägt den Namen des anderen Branch |

**Ihre Aufgabe**: Entscheiden, welche Version am Ende bleiben soll (oder eine neue schreiben) und dann alle drei Marker entfernen.

## Der Ablauf beim Lösen eines Konflikts

Der Standardablauf in vier Schritten:

```bash
git merge feature          # 1. Konflikt auslösen
# Konfliktdatei bearbeiten: Inhalt wählen, Marker entfernen
git add hello.txt          # 2. git mitteilen, dass diese Datei gelöst ist
git commit -m "merge: resolve"   # 3. Merge abschließen, Merge-Commit erzeugen
```

Währenddessen erinnert Sie `git status` daran, dass Sie sich mitten in einem Merge befinden: Bei ungelösten Dateien erscheint `You have unmerged paths`, nach dem add aller Dateien `All conflicts fixed but you are still merging` — dann committen.

**Wichtig**: Ein Konflikt ist kein Fehler, sondern git übergibt Ihnen die Entscheidung. Nach der Lösung entsteht weiterhin ein ganz normaler Merge-Commit, und die Historie hält diesen Merge wie üblich fest.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="conflict" />

<LessonProgress />
