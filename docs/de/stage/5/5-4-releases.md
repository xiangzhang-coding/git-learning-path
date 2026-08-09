---
title: Releases und Versionierung
exercises:
  - id: 5-4-e1
    question: Was bedeutet jede Ziffer in der semantischen Version 2.4.1?
    options:
      - 2 ist die Hauptversion (Breaking changes), 4 die Nebenversion (neue Features), 1 der Patch (bug fixes)
      - 2 ist der Patch, 4 die Hauptversion, 1 die Nebenversion
      - Zwischen den drei Ziffern gibt es keinen Unterschied
    correct: 0
    explanation: 'MAJOR.MINOR.PATCH: Hauptversion bricht die Kompatibilität, Nebenversion fügt Features hinzu, Patch behebt bugs. Die Erhöhungsregeln machen die Kompatibilität an der Versionsnummer ablesbar.'
    anchor: "#semantische-versionierung"
  - id: 5-4-e2
    question: Wie pusht man einen annotierten tag auf das Remote?
    options:
      - Erst git tag -a v1.0.0 -m "v1.0.0", dann git push origin v1.0.0
      - git push bringt automatisch alle tags mit
      - Nach git tag ist kein push mehr nötig
    correct: 0
    explanation: Erst den tag erstellen, dann explizit pushen; git push überträgt tags standardmäßig nicht (außer mit git push --tags).
    anchor: "#tag-erstellen-und-pushen"
  - id: 5-4-e3
    question: Wie hängen GitHub Release und git tag zusammen?
    options:
      - Ein Release baut auf einem tag auf und bietet zusätzlich Release Notes und Artefakte
      - Ein Release hat nichts mit tags zu tun
      - Ein Release ist ein Branch
    correct: 0
    explanation: Aus einem vorhandenen tag wird ein Release erstellt; dazu kommen Beschreibungstext (release notes) und binäre Artefakte — so entsteht eine formelle Version.
    anchor: "#ein-release-erstellen"
---

# Releases und Versionierung

## Lektionsziele

- Die Regeln der semantischen Versionierung verstehen
- Einen tag erstellen und auf GitHub pushen
- Ein Release mit Anmerkungen und Artefakten erstellen

## Semantische Versionierung

Die Versionsnummer MAJOR.MINOR.PATCH (z. B. 2.4.1):

| Stelle | Wann wird erhöht |
| --- | --- |
| MAJOR Hauptversion | Breaking changes, nicht kompatibel zur alten Version |
| MINOR Nebenversion | Neues Feature, abwärtskompatibel |
| PATCH Patch | bug fixes, keine neuen Features |

Die Regel ist einfach: Eine erhöhte Hauptversion erklärt, „warum dein Programm plötzlich kaputt ist" — ein erhöhter Patch bedeutet „Upgrade ist unbedenklich".

## tag erstellen und pushen

Vor der Veröffentlichung erstellen Sie lokal einen tag (aus Kapitel 4 bekannt):

```bash
git tag -a v1.0.0 -m "v1.0.0: first release"
git push origin v1.0.0
```

Achtung: `git push` überträgt tags standardmäßig nicht — Sie müssen explizit `git push origin <tag>` ausführen (oder alle auf einmal: `git push --tags`).

## Ein Release erstellen

Auf GitHub: Repository-Seite → Releases → Draft a new release:

1. Einen tag auswählen (oder neu erstellen), z. B. v1.0.0
2. Titel und Release Notes schreiben
3. Optional binäre Artefakte anhängen (Installationspakete, Build-Ergebnisse)
4. Publish release klicken

Ein Release ist also ein „tag mit Anmerkungen": Nutzer laden hier Versionen herunter und sehen die Änderungen — statt in git log zu wühlen.

## release notes schreiben

Gute Release Notes gruppieren nach Leserschaft:

- **Neu** (Features): neue Funktionen, verlinkt auf PRs
- **Behoben** (Bug fixes): was repariert wurde, verlinkt auf issues
- **Breaking changes**: Hinweise zum Update

## Übungen zum Mitmachen

- Erstellen Sie für Ihr Projekt den tag v0.1.0 und pushen Sie ihn
- Erstellen Sie das erste Release mit einer dreiteiligen Beschreibung
- Veröffentlichen Sie einen Patch und beobachten Sie die Release-Liste

## Übungen

<Exercise />

<LessonProgress />
