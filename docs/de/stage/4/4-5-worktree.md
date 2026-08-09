---
title: git worktree mehrere Working Trees
exercises:
  - id: 4-5-e1
    question: Was ist ein git worktree?
    options:
      - Ein zusätzliches Arbeitsverzeichnis, das dieselben Objekte und refs des Repository teilt
      - Eine Kopie des Repository mit eigener Historie
      - Ein temporärer Branch für Experimente
    correct: 0
    explanation: git worktree add erstellt ein weiteres Arbeitsverzeichnis, das dasselbe Repository liest und schreibt (geteilte Objekte und refs), aber einen eigenen HEAD und ein eigenes index behält.
    anchor: "#ein-repository-ein-working-tree"
  - id: 4-5-e2
    question: Kann derselbe Branch gleichzeitig in zwei Worktrees ausgecheckt sein?
    options:
      - "Nein, git lehnt ab: ein Branch kann nur in einem Worktree ausgecheckt sein"
      - Ja, beide können daran arbeiten und später mergen
      - Nur, wenn der Branch noch nicht gepusht wurde
    correct: 0
    explanation: Jeder Branch kann in genau einem Worktree ausgecheckt sein — sonst würden zwei Worktrees ihre Commits für denselben Branch gegenseitig überschreiben.
    anchor: "#git-worktree-add-ein-zweiter-worktree"
  - id: 4-5-e3
    question: Was passiert, wenn Sie git worktree remove für einen Worktree mit uncommitteten Änderungen ausführen?
    options:
      - git lehnt ab und behält den Worktree, bis Sie die Änderungen behandeln
      - git löscht die Änderungen zusammen mit dem Worktree
      - git committed die Änderungen automatisch
    correct: 0
    explanation: Als Sicherheitsmaßnahme verweigert remove das Entfernen, solange Änderungen uncommittet sind — committen oder stashen Sie, oder nutzen Sie -f (force), falls Sie sie wirklich verwerfen wollen.
    anchor: "#git-worktree-remove-aufraumen"
---

# git worktree mehrere Working Trees

## Lektionsziele

- Mit git worktree zusätzliche Arbeitsverzeichnisse für dasselbe Repository erstellen
- Verstehen, dass alle Worktrees Objekte und refs teilen, aber eigene HEADs behalten
- Worktrees auflisten und aufräumen; wissen, warum Agents sie nutzen

## Ein Repository, ein Working Tree

Standardmäßig bedeutet ein Repository ein Arbeitsverzeichnis. Sie checken einen Branch aus, bearbeiten Dateien, committen — und wenn Sie einen anderen Branch brauchen, `git switch` und das ganze Verzeichnis ändert seinen Inhalt.

Dieses Wechseln hat einen Preis: laufende Arbeit auf dem aktuellen Branch muss zuerst committed oder gestasht werden, und beide Branches teilen sich dasselbe Verzeichnis, sodass Sie nie zwei Branches gleichzeitig sehen können.

`git worktree` durchbricht diese Eins-zu-eins-Regel. Ein **Worktree** ist ein zusätzliches Arbeitsverzeichnis, das an demselben Repository hängt:

```
your project/            <- main working tree (the original one)
├── .git/                <- shared: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- second worktree (added by git worktree add)
└── src/  (branch hotfix)   <- different branch, different directory
```

Alle Worktrees **teilen dieselbe Objektdatenbank und dieselben refs** — ein Commit, der in einem Worktree erstellt wurde, ist in allen sichtbar — aber jeder Worktree hat **einen eigenen HEAD und ein eigenes index**, sodass er auf einem anderen Branch sitzen kann, ohne die anderen zu stören.

## git worktree add: ein zweiter Worktree

```bash
git worktree add <path> <branch>
```

Erstellt ein neues Arbeitsverzeichnis unter `<path>` und checkt dort `<branch>` aus. Ein paar gängige Formen:

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

Nützliche Details:

- Existiert der Branch bereits, muss der Pfad leer sein — git überschreibt kein Verzeichnis, das Dateien enthält.
- Ein Branch kann in **nur einem Worktree** ausgecheckt sein. Der Versuch, denselben Branch in einem zweiten Worktree auszuchecken, schlägt fehl mit `fatal: '<branch>' is already checked out at ...`.
- Bei `git clone` ist der Klon ein vollständig separates Repository; ein Worktree ist **kein** Klon — er hat kein eigenes `.git`-Verzeichnis, sondern zeigt auf das des übergeordneten Repository.

## git worktree list: alle Worktrees anzeigen

```bash
git worktree list
```

Zeigt jeden Worktree an, der am Repository hängt, samt Pfad, ausgechecktem Branch und welcher der Haupt-Worktree ist:

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

Der Haupt-Worktree ist das Verzeichnis, in dem das Repository ursprünglich geklont oder erstellt wurde — er kann nicht entfernt werden.

## git worktree remove: aufräumen

```bash
git worktree remove <path>
```

Entfernt das Arbeitsverzeichnis und meldet den Worktree ab. Zwei Schutzmechanismen:

- Das Verzeichnis darf keine untracked oder modifizierten Dateien enthalten — sonst lehnt git ab und sagt Ihnen, zu committen, zu stashen oder `-f` zu verwenden.
- `git worktree remove -f <path>` löscht auch mit Änderungen und verwirft sie dabei.

Ein entfernter Worktree lässt den Branch (und seine Commits) unangetastet: Der Branch-Zeiger existiert weiterhin im Repository und kann später im Haupt-Worktree ausgecheckt werden.

## Warum Agents Worktrees lieben

KI-Coding-Agents (Claude Code, Cursor und Ähnliche) arbeiten häufig an mehreren Aufgaben gleichzeitig. Ohne Worktrees muss ein Agent beim Aufgabenwechsel committen oder stashen, Branches wechseln und die Änderungen später entwirren — und ein Fehler kann die Änderungen einer Aufgabe in den Commit eines anderen Branch mischen.

Mit `git worktree add` bekommt jede Aufgabe ihr **eigenes Verzeichnis und ihren eigenen Branch**, vollständig isoliert:

- Der Agent von Aufgabe A bearbeitet `../task-a` auf Branch `feature/login`
- Der Agent von Aufgabe B bearbeitet `../task-b` auf Branch `fix/typo`
- Beide Commits landen im selben Repository; keiner kann die Dateien des anderen anfassen

Wenn Sie das Ergebnis prüfen, ist jeder Branch eine saubere Einheit — und Sie haben trotzdem eine gemeinsame Historie zum Pushen. Diese Isolierung ist der Grund, warum Worktree-basierte Workflows in der agentengetriebenen Entwicklung zum Standard geworden sind.

## Wann Worktrees sinnvoll sind

Nutzen Sie sie, wenn:

- Sie gleichzeitig an zwei Branches arbeiten müssen (ein Hotfix, während die Feature-Arbeit weiterläuft)
- Sie in einem Worktree lange Tests oder einen Dev-Server laufen lassen und in einem anderen weiter editieren
- Agents oder Team-Tools parallele isolierte Aufgaben ausführen

Verzichten Sie darauf, wenn: jeweils nur eine Aufgabe ansteht — die zusätzlichen Verzeichnisse bringen dann mehr Buchhaltung als Nutzen.

## Übungen

<Exercise />

<LessonProgress />
