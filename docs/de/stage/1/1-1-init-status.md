---
title: git init und git status
exercises:
  - id: 1-1-e1
    question: Was macht git init?
    options:
      - Lädt fremden Code herunter
      - Erstellt im aktuellen Verzeichnis den .git-Ordner und macht das Verzeichnis zum Repository
      - Erstellt eine neue Datei
    correct: 1
    explanation: git init initialisiert im aktuellen Verzeichnis ein leeres Git-Repository (es erstellt den .git-Ordner). Von da an stehen dieses Verzeichnis und seine Unterverzeichnisse unter Versionskontrolle.
    anchor: "#git-init-erstellt-ein-repository"
  - id: 1-1-e2
    question: Was zeigt Ihnen git status?
    options:
      - Den aktuellen Branch und die Unterschiede zwischen den drei Bereichen
      - Leistungskennzahlen der Dateien
      - Den Serverstatus
    correct: 0
    explanation: git status ist einer der am häufigsten verwendeten Befehle. Er zeigt den aktuellen Branch, bereits gestagte Änderungen, noch nicht gestagte Änderungen und untrackte Dateien.
    anchor: "#git-status-zeigt-den-zustand"
  - id: 1-1-e3
    question: Was bedeutet es, dass eine Datei von git getrackt (tracked) wird?
    options:
      - Sie steht in der .gitignore
      - Sie kommt in der Historie oder der Staging area von git vor, und git behält ihre Änderungen im Blick
      - Sie ist gesperrt und kann nicht geändert werden
    correct: 1
    explanation: Getrackte Dateien kennt git — sie wurden bereits committet oder liegen in der Staging area. Untrackte Dateien sind neue Dateien im Working tree, die git noch nie gesehen hat.
    anchor: "#git-status-zeigt-den-zustand"
  - id: 1-1-e4
    question: Initialisieren Sie im untenstehenden Übungsbereich ein Repository.
    type: task
    scenario: init
    goal: Verwenden Sie git init, um das aktuelle Verzeichnis in ein Git-Repository zu verwandeln, und bestätigen Sie das Ergebnis mit git status.
    checks:
      - type: branchIs
        name: main
    explanation: Nach der Initialisierung zeigt git status „On branch main“ an. Im Übungsbereich sind user.name/user.email bereits vorkonfiguriert, Sie können also direkt committen.
    anchor: "#git-init-erstellt-ein-repository"
---

# git init und git status

## Lektionsziele

- Mit git init ein Repository erstellen
- Mit git status den Zustand des Repositories verstehen
- Getrackte von untrackten Dateien unterscheiden

## git init erstellt ein Repository

Der Ausgangspunkt der Versionskontrolle: git mitteilen, dass dieses Verzeichnis unter seine Verwaltung fällt.

```bash
git init
```

Der Befehl erstellt im aktuellen Verzeichnis den `.git`-Ordner; darin liegen die Objektdatenbank, der Index und die Referenzen — das ist das Repository selbst. Die Dateien im Working tree bleiben unberührt; von diesem Moment an lässt sich jede ihrer Änderungen aufzeichnen.

## git status zeigt den Zustand

`git status` ist der am häufigsten verwendete Befehl; er fasst die Unterschiede zwischen den drei Bereichen für Sie zusammen:

- Auf welchem Branch Sie sich befinden (On branch ...)
- Bereits gestagte Änderungen (Changes to be committed)
- Noch nicht gestagte Änderungen (Changes not staged for commit)
- Untrackte Dateien (Untracked files)

Merken Sie sich eines: **git verfolgt neue Dateien nicht automatisch.** Neue Dateien müssen erst per `git add` in die Staging area gelangen, dann behält git sie im Blick.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="init" />

<LessonProgress />
