---
title: git stash und git tag
exercises:
  - id: 4-1-e1
    question: Was speichert git stash?
    options:
      - Uncommittete Änderungen (staged und unstaged bei getrackten Dateien)
      - Bereits committete Historie
      - Den gesamten Inhalt des Remote-Repositorys
    correct: 0
    explanation: stash legt die uncommitteten Änderungen im Arbeitsverzeichnis beiseite und bringt das Arbeitsverzeichnis in einen sauberen Zustand — später holen Sie sie mit pop zurück.
    anchor: "#git-stash-anderungen-wegpacken"
  - id: 4-1-e2
    question: Was ist der Unterschied zwischen tag und branch?
    options:
      - branch bewegt sich mit neuen Commits, tag zeigt fest auf einen Commit
      - tag bewegt sich mit neuen Commits, branch ist fest
      - Beide sind völlig identisch
    correct: 0
    explanation: tag ist ein Name, der an einem Commit festgemacht ist — egal was danach committet wird, er bewegt sich nicht. Ideal zum Markieren von Versionsnummern.
    anchor: "#git-tag-versionen-markieren"
  - id: 4-1-e3
    question: Packen Sie im untenstehenden Übungsbereich die aktuellen uncommitteten Änderungen weg.
    type: task
    scenario: stash
    goal: Führen Sie git stash aus, damit das Arbeitsverzeichnis wieder sauber ist.
    checks:
      - type: statusClean
    explanation: Nach dem stash ist das Arbeitsverzeichnis sauber; die Änderungen liegen in der stash-Liste (stash@{0}).
    anchor: "#git-stash-anderungen-wegpacken"
  - id: 4-1-e4
    question: Holen Sie sich im untenstehenden Übungsbereich die gestashten Änderungen zurück.
    type: task
    scenario: stash
    goal: Führen Sie git stash pop aus, damit die Änderungen an hello.txt wieder im Arbeitsverzeichnis liegen.
    checks:
      - type: workdirModified
        path: hello.txt
    explanation: pop legt die Änderungen von stash@{0} zurück ins Arbeitsverzeichnis und löscht diesen stash-Eintrag.
    anchor: "#git-stash-list-und-git-stash-pop"
  - id: 4-1-e5
    question: Versehen Sie den aktuellen Commit im untenstehenden Übungsbereich mit einem Tag.
    type: task
    scenario: tag
    goal: Führen Sie git tag v1.0 aus und prüfen Sie dann mit git tag, dass der Tag existiert.
    checks:
      - type: tagExists
        name: v1.0
    explanation: Der Tag ist auf dem aktuellen HEAD festgenagelt; egal wie viele Commits danach kommen, er bewegt sich nicht.
    anchor: "#git-tag-versionen-markieren"
---

# git stash und git tag

## Lektionsziele

- Mit git stash uncommittete Änderungen vorübergehend beiseitelegen
- Mit git stash list / pop Stashes verwalten
- Mit git tag Versionen markieren

## git stash: Änderungen wegpacken

```bash
git stash          # alle uncommitteten Änderungen beiseitelegen
git stash list     # stash-Liste anzeigen
git stash pop      # den letzten Eintrag wiederherstellen
```

Im Alltag passiert es ständig: Sie sind mitten in der Arbeit, müssen aber schnell den Branch wechseln — und der Wechsel wird abgelehnt, solange es uncommittete Änderungen gibt. **stash** ist die „Zwischenablage für Änderungen": Sie legen die Änderungen ab, das Arbeitsverzeichnis wird sauber, und später holen Sie sie jederzeit zurück.

```
$ git stash
Saved working directory and index state WIP on main: 3b216f4 chore: add notes
$ git status
nothing to commit, working tree clean
```

## git stash list und git stash pop

```
$ git stash list
stash@{0}: WIP on main: 3b216f4 chore: add notes
```

`git stash pop` legt die Änderungen des neuesten Eintrags zurück ins Arbeitsverzeichnis und löscht diesen Eintrag (Ausgabe `Dropped stash@{0}`). Achtung: stash speichert nur Dateien, die **bereits von git verfolgt** werden; neu angelegte untracked Dateien werden nicht gestasht.

## git tag: Versionen markieren

```bash
git tag v1.0                # leichtgewichtiger Tag: aktuellen Commit benennen
git tag -a v1.0 -m "Hinweis"  # annotierter Tag: mit Beschreibung
git tag                     # alle Tags auflisten
```

Für eine Veröffentlichung brauchen Sie einen Namen, der **dauerhaft auf diesen Commit zeigt** — das ist **tag**: eine Markierung, die an einem Commit festgenagelt ist. Anders als ein branch bewegt sich ein tag nicht mit neuen Commits mit. Später kommen Sie jederzeit mit `git switch <tag>` zu dieser Version zurück (HEAD befindet sich dann im detached-Zustand; dazu mehr in diesem Kapitel).
**Zu einem Tag wechseln und detached HEAD**: Mit `git switch <tag>` zeigt HEAD auf den Commit des Tags — aber dann hängt HEAD an keiner Branche mehr; das ist der detached HEAD (abgetrennter HEAD). Committen Sie in diesem Zustand, gehört der neue Commit zu keiner Branche und kann unauffindbar sein, sobald Sie wieder wechseln. Zum Ansehen ist das also kein Problem; wollen Sie committen, legen Sie zuerst mit `git switch -c <neuer Branchname>` eine neue Branche an.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="stash" />

<LessonProgress />
