---
title: git restore, git rm und git mv
exercises:
  - id: 1-4-e1
    question: Was bewirkt git restore hello.txt?
    options:
      - hello.txt auf die HEAD-Version zurücksetzen und die Working-tree-Änderungen verwerfen
      - hello.txt löschen
      - hello.txt in die Staging area legen
    correct: 0
    explanation: git restore setzt die Datei auf die Version im Repository zurück (standardmäßig aus HEAD) und verwirft damit die Änderungen im Working tree. Wiederhergestellt werden nur getrackte Dateien — untrackte Dateien bleiben unberührt.
    anchor: "#git-restore-verwirft-anderungen"
  - id: 1-4-e2
    question: Stellen Sie im untenstehenden Übungsbereich hello.txt mit git restore wieder her.
    type: task
    scenario: local
    goal: hello.txt wurde verändert; stellen Sie sie mit git restore hello.txt wieder her.
    checks:
      - type: fileCommitted
        path: hello.txt
        contentContains: hello world
      - type: statusClean
    explanation: Nach dem Wiederherstellen enthält hello.txt wieder „hello world“, der Working tree ist sauber, und git status zeigt nothing to commit.
    anchor: "#git-restore-verwirft-anderungen"
  - id: 1-4-e3
    question: Löschen Sie im untenstehenden Übungsbereich notes.txt (sie bleibt in der Versionshistorie erhalten).
    type: task
    scenario: local
    goal: Löschen Sie die Datei mit git rm notes.txt und stagen Sie die Löschung.
    checks:
      - type: fileDeleted
        path: notes.txt
    explanation: git rm erledigt zwei Dinge zugleich — die Datei im Working tree löschen und die Löschung stagen. Nach dem Commit verschwindet die Datei aus der neuesten Version, bleibt aber in der Historie auffindbar.
    anchor: "#git-rm-loscht-dateien"
  - id: 1-4-e4
    question: Benennen Sie im untenstehenden Übungsbereich notes.txt in diary.txt um.
    type: task
    scenario: local
    goal: Führen Sie die Umbenennung mit git mv notes.txt diary.txt durch und stagen Sie sie.
    checks:
      - type: fileRenamed
        from: notes.txt
        to: diary.txt
    explanation: git mv ist die Kombination aus „verschieben + stagen“; nach der Umbenennung zeigt git status die Löschung des alten und das Hinzufügen des neuen Namens.
    anchor: "#git-mv-verschiebt-dateien"
---

# git restore, git rm und git mv

## Lektionsziele

- Mit git restore Working-tree-Änderungen verwerfen
- Mit git rm Dateien löschen
- Mit git mv Dateien verschieben oder umbenennen

## git restore verwirft Änderungen

Kaputtgeändert? Zurück zum Stand des letzten Commits:

```bash
git restore <Dateiname>
```

`git restore` setzt die Datei auf die Version aus HEAD zurück und **verwirft die Änderungen im Working tree**. Beachten Sie: Er wirkt nur auf getrackte Dateien — neue Dateien kennt git noch nicht, auf sie hat restore keinen Zugriff.

## git rm löscht Dateien

```bash
git rm <Dateiname>
```

In einem Schritt zwei Dinge: die Datei im Working tree löschen und die Löschung in die Staging area eintragen. Nach dem Commit verschwindet die Datei aus der neuesten Version — die Historie behält sie, und Sie können sie jederzeit wiederfinden.

## git mv verschiebt Dateien

```bash
git mv AlterName NeuerName
```

Verschiebt (benennt um) die Datei und stagiert die Umbenennung. git „merkt“ sich eine Umbenennung nicht selbst — es erkennt sie über einen Inhaltsvergleich: alte Datei verschwunden + neue Datei mit gleichem Inhalt = Umbenennung. Deshalb zeigt status nach einem mv „deleted“ und „new file“ an.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="local" />

<LessonProgress />
