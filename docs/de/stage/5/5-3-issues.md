---
title: 5-3 Issues und Zusammenarbeit
exercises:
  - id: 5-3-e1
    question: Wofür wird ein GitHub-Issue typischerweise genutzt?
    options:
      - bugs melden, Feature-Vorschläge machen, konkrete Aufgaben diskutieren
      - Code-Backups speichern
      - Logs zu Commits schreiben
    correct: 0
    explanation: Ein issue ist ein Diskussionsthread zu einem konkreten Problem — mit verantwortlicher Person, labels, milestone und verknüpftem PR.
    anchor: "#was-ist-ein-issue"
  - id: 5-3-e2
    question: Wie schließt man ein issue automatisch, wenn der PR gemergt wird?
    options:
      - In der PR-Beschreibung oder der Commit-Nachricht "fixes #12" schreiben
      - Die PR-Nummer in einem Kommentar des issues erwähnen
      - Issues lassen sich nur von Hand schließen
    correct: 0
    explanation: GitHub erkennt die Schlüsselwörter closes, fixes und resolves gefolgt von einer issue-Nummer und schließt das issue beim Merge des PR automatisch.
    anchor: "#issue-mit-pr-schließen"
  - id: 5-3-e3
    question: Wozu dienen label und milestone?
    options:
      - label kategorisiert issues (z. B. bug, feature), milestone ordnet eine Gruppe von issues einem Versionsziel zu
      - label ist eine Berechtigungsmarkierung, milestone eine Zeitleiste
      - Beides dient dazu, dem Repository einen Stern zu geben
    correct: 0
    explanation: labels erleichtern das Filtern und Kategorisieren; milestones zeigen, „was bis zu dieser Version fertig sein soll" — sie entsprechen häufig einem Release.
    anchor: "#labels-und-milestones"
---

# Issues und Zusammenarbeit

## Lektionsziele

- Verstehen, was ein issue ist und wie man eins erstellt
- Aufgaben mit label und milestone organisieren
- PR und issue über „fixes #Nummer" verknüpfen

## Was ist ein issue

Ein issue ist ein Diskussionsthread im Repository: bugs melden, Feature-Vorschläge machen, konkrete Aufgaben besprechen. Jedes issue hat eine Nummer (z. B. #12), Titel, Beschreibung und Kommentare — zusätzlich lassen sich verantwortliche Personen zuweisen, labels vergeben und es in ein milestone einordnen.

## Ein issue erstellen

Auf der Repository-Seite: Issues → New issue. Eine gute Beschreibung enthält: worum es geht, wie man das Problem reproduziert und welches Verhalten erwartet wird. Viele Repositories bieten issue-Templates (bug report / feature request) — das Ausfüllen nach Vorlage erhöht die Bearbeitungsgeschwindigkeit deutlich.

## labels und milestones

- **label (Tag)**: kategorisiert issues, z. B. bug, enhancement, good first issue. Das Filtern nach labels ist das wichtigste Werkzeug, mit dem Maintainers ihre Arbeit ordnen.
- **milestone (Meilenstein)**: ordnet eine Gruppe von issues demselben Versionsziel zu, z. B. v1.2.0. Ein milestone zeigt den Fortschritt (x/y issues erledigt).

## Issue mit PR schließen

Schreiben Sie in die PR-Beschreibung (oder die Nachricht des zugehörigen Commits):

```
fixes #12
```

GitHub verknüpft den PR mit issue 12; wird der PR gemergt, schließt sich das issue automatisch. Synonyme Schlüsselwörter sind closes und resolves. So bleibt in der Historie nachvollziehbar, welche Änderung welches Problem gelöst hat.

## Ein Blick auf den Kollaborationsfluss

```
bug gefunden → issue eröffnen (#12) → Maintainer vergibt label + milestone
  → Contributor erstellt Branch und behebt den bug → PR-Beschreibung: "fixes #12"
  → Merge → issue automatisch geschlossen, milestone +1
```

## Übungen zum Mitmachen

- Eröffnen Sie in Ihrem eigenen Repository ein issue und erstellen Sie label und milestone
- Beheben Sie einen bug, reichen Sie einen PR ein und verknüpfen Sie ihn in der Beschreibung mit dem issue
- Beobachten Sie, ob sich das issue nach dem Merge automatisch schließt

## Übungen

<Exercise />

<LessonProgress />
