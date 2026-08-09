---
title: Pull-Request-Workflow
exercises:
  - id: 5-2-e1
    question: Was ist ein Pull Request (PR)?
    options:
      - Die Anfrage, die Commits eines Branch in einen anderen Branch des Ziel-Repositorys zu mergen
      - Das Repository eines anderen direkt auf Ihren Rechner überschreiben
      - Eine Gruppenchat-Funktion von GitHub
    correct: 0
    explanation: Ein PR ist die formelle Anfrage „bitte merge meine Commits" — mit Code-Vergleich, Diskussion und Ergebnissen automatischer Checks.
    anchor: "#was-ist-ein-pull-request"
  - id: 5-2-e2
    question: Welche Aussage über die Merge-Methoden eines PR ist richtig?
    options:
      - Create a merge commit behält Verzweigung und Merge-Commit, Rebase and merge macht die Historie linear
      - Squash and merge behält jeden einzelnen Original-Commit
      - Die Merge-Methode hat keinen Einfluss auf die Historie
    correct: 0
    explanation: 'Die drei Methoden erzeugen unterschiedliche Historien: merge commit behält die Verzweigung, squash presst alles in einen Commit, rebase spielt linear neu auf.'
    anchor: "#merge-und-schließen"
  - id: 5-2-e3
    question: Wie aktualisiert man einen offenen PR, wenn der Maintainer Änderungen verlangt?
    options:
      - Weitere Commits auf den PR-Branch pushen — der PR aktualisiert sich automatisch
      - Einen neuen PR erstellen
      - Nur den PR-Titel ändern
    correct: 0
    explanation: 'Ein PR ist ein Fenster auf einen Branch: Sobald neue Commits auf diesen Branch gepusht werden, aktualisiert sich der Inhalt des PR von selbst.'
    anchor: "#pr-branch-aktualisieren"
---

# Pull-Request-Workflow

## Lektionsziele

- Die Rolle des PR in der Zusammenarbeit verstehen
- Den kompletten Ablauf durchspielen: „Branch erstellen → pushen → PR eröffnen → diskutieren → mergen"
- Die drei Merge-Methoden und das Aktualisieren des PR-Branch kennen

## Was ist ein pull request

Ein Pull Request (PR) ist die formelle Anfrage „bitte merge meine Commits in dein Repository". Sie haben keine Schreibrechte am Repository anderer, können aber einen PR einreichen — der Maintainer entscheidet nach dem review über den Merge:

```
Branch in Ihrem fork ──push──▶ Ihr fork
                                 │ PR eröffnen
                                 ▼
              main des Original-Repositorys (wartet auf review und merge)
```

Ein PR ist mehr als Commits: Er enthält den Code-Vergleich (diff), die Diskussion und die Ergebnisse automatischer Checks (CI) — er ist die zentrale Einheit der Open-Source-Zusammenarbeit.

## Einen PR erstellen

Voraussetzung: Pushen Sie Ihren Arbeits-Branch in Ihren fork:

```bash
git switch -c fix/login-bug
git commit -am "fix: login bug"
git push origin fix/login-bug
```

Zurück auf GitHub erscheint auf der Repository-Seite der Button Compare & pull request. Wählen Sie base (Ziel-Branch, z. B. main des Original-Repositorys) und compare (Ihren Branch), schreiben Sie Titel und Beschreibung und erstellen Sie den PR.

## review und Diskussion

Ein PR ist ein Ort der Diskussion: Maintainers können zu einzelnen Codezeilen Kommentare hinterlassen (line comments), Änderungen verlangen (request changes) oder den PR genehmigen (approve). Jeder neue Commit von Ihnen fließt in den Diskussionsstrang; nach dem Beheben können Sie die andere Seite per @ zur erneuten Prüfung einladen.

## Merge und schließen

Es gibt drei Merge-Methoden, jeweils mit unterschiedlicher Historie:

| Methode | Historie |
| --- | --- |
| Create a merge commit | behält die Verzweigung, erzeugt einen Merge-Commit |
| Squash and merge | presst alles in einen einzelnen Commit |
| Rebase and merge | spielt linear neu auf, ohne Merge-Commit |

Nach dem Merge empfiehlt GitHub üblicherweise, den Branch zu löschen. Ein PR kann auch direkt geschlossen (closed) werden, ohne Merge — etwa wenn die Idee verworfen wurde.

## PR-Branch aktualisieren

Wenn der Maintainer Änderungen verlangt, müssen Sie keinen neuen PR erstellen: Committen Sie einfach weiter auf dem Branch und pushen Sie — der PR aktualisiert sich automatisch:

```bash
git commit -am "fix: address review feedback"
git push origin fix/login-bug
```

## Übungen zum Mitmachen

- Pushen Sie einen Feature-Branch auf GitHub und reichen Sie einen echten PR ein
- Kommentieren Sie im PR eine einzelne Codezeile und erleben Sie die Diskussion
- Vergleichen Sie die unterschiedlichen Historien der drei Merge-Methoden

## Übungen

<Exercise />

<LessonProgress />
