---
title: git clone klont ein Repository
exercises:
  - id: 3-2-e1
    question: Was macht git clone?
    options:
      - Das Remote-Repository vollständig lokal kopieren (Historie + Arbeitsverzeichnis) und origin automatisch einrichten
      - Nur den neuesten Commit herunterladen
      - Das lokale Repository zum Remote hochladen
    correct: 0
    explanation: clone kopiert die gesamte Historie, checked das Arbeitsverzeichnis des Standard-Branch aus, benennt das Remote automatisch origin und richtet den Tracking-Branch ein.
    anchor: "#git-clone-kopiert-in-einem-schritt"
  - id: 3-2-e2
    question: Was ist origin/main nach dem Klonen?
    options:
      - 'Ein Tracking-Branch: die lokale Spiegelung „auf welchen Commit main auf der anderen Seite zeigt"'
      - Ein Ordner im Remote-Repository
      - Ein neuer lokaler Branch, auf dem Sie direkt committen können
    correct: 0
    explanation: refs/remotes/origin/main ist eine nur lesbare Tracking-Spiegelung, die festhält, wo main beim Klonen oder fetchen stand.
    anchor: "#tracking-branch-origin-main"
  - id: 3-2-e3
    question: Klonen Sie im untenstehenden Übungsbereich das Remote-Repository und wechseln Sie in das geklonte Verzeichnis.
    type: task
    scenario: clone
    goal: Führen Sie git clone /origin aus, wechseln Sie dann mit cd origin in das geklonte Verzeichnis und prüfen Sie mit git status, dass Sie auf main sind.
    checks:
      - type: branchIs
        name: main
      - type: statusClean
    explanation: Nach dem Klonen wechseln Sie mit cd in das neue Verzeichnis — Sie stehen in einer vollständigen Kopie der Historie, das remote origin ist bereits eingerichtet.
    anchor: "#git-clone-kopiert-in-einem-schritt"
---

# git clone klont ein Repository

## Lektionsziele

- Mit git clone ein Remote-Repository lokal kopieren
- origin und den Tracking-Branch origin/main verstehen
- Verstehen, dass Sie nach dem Klonen mit cd in das neue Verzeichnis wechseln müssen

## git clone kopiert in einem Schritt

```bash
git clone /origin          # erstellt im aktuellen Verzeichnis den Unterordner origin/ und klont hinein
git clone /origin meinProjekt  # oder: einen Namen für das Verzeichnis angeben
cd origin                  # in das geklonte Repository wechseln
```

`git clone <Adresse>` erledigt vier Dinge in einem Schritt:

1. Ein neues Verzeichnis lokal anlegen (Standard: das letzte Segment der Adresse)
2. Die **gesamte Historie** des Remotes kopieren
3. Das Arbeitsverzeichnis des Standard-Branch (meist main) auschecken
4. Das Remote automatisch **origin** nennen und den Tracking-Branch einrichten

clone ist der Standard-Einstieg, um „einem bestehenden Projekt beizutreten" — Sie brauchen kein `git init`, alles kommt vom Remote.

## Tracking-Branch origin/main

Beim Klonen hält git fest, auf welche Commits die Branches des Remotes gerade zeigen, und speichert sie als **Tracking-Branch**:

```
refs/remotes/origin/main   # nur lesbare Spiegelung: wo main auf der anderen Seite gerade steht
```

Er ist nicht der lokale Branch (`refs/heads/main`): **Ihre Commits bewegen ihn nicht** — nur `git fetch` / `git pull` / `git push` aktualisieren ihn. Mit `git log origin/main` können Sie jederzeit sehen, „wie es auf der anderen Seite aussieht".

## Kopie statt Verbindung

clone ist eine **Kopie**: Das geklonte Repository ist völlig eigenständig, die einzige Verbindung zum Remote ist die Adresse origin. Ihre Commits wandern nicht automatisch zum Remote, und neue Remote-Commits erscheinen auch nicht automatisch bei Ihnen — fetch/push/pull, die in den nächsten drei Lektionen behandelt werden, sind der Transport in diese beiden Richtungen.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="clone" />

<LessonProgress />
