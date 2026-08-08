---
title: config und help
exercises:
  - id: 0-3-e1
    question: Welchen Geltungsbereich hat git config --global user.name?
    options:
      - Nur das aktuelle Repository
      - Alle Repositories des aktuellen Benutzers
      - Alle Benutzer auf dieser Maschine
    correct: 1
    explanation: --global schreibt in ~/.gitconfig und gilt für alle Repositories des aktuellen Benutzers; ohne den Schalter gilt es nur für das aktuelle Repository (local).
    anchor: "#konfiguration-vor-dem-ersten-commit"
  - id: 0-3-e2
    question: Welche der drei Konfigurationsebenen hat die höchste Priorität?
    options:
      - system
      - global
      - local
    correct: 2
    explanation: "Je spezifischer die Ebene, desto höher die Priorität: local > global > system. local gehört nur zum aktuellen Repository."
    anchor: "#drei-konfigurationsebenen"
  - id: 0-3-e3
    question: Wie sehen Sie schnell eine Nutzungsübersicht von git commit?
    options:
      - git commit -h
      - git help commit
      - Beides funktioniert
    correct: 2
    explanation: -h zeigt die Nutzungsübersicht, git help öffnet das vollständige Handbuch — beides ist offiziell, nehmen Sie, was Sie brauchen.
    anchor: "#wenn-sie-einen-unbekannten-befehl-treffen"
  - id: 0-3-e4
    question: Was gibt git config --list aus?
    options:
      - Alle wirksamen Einstellungen
      - Nur die Benutzereinstellungen
      - Eine Dateiliste des Repositorys
    correct: 0
    explanation: --list gibt die wirksame Gesamtkonfiguration aus (das Ergebnis aus local > global > system) — der erste Schritt bei Konfigurationsproblemen.
    anchor: "#konfiguration-vor-dem-ersten-commit"
---

# config und help

## Lektionsziele

- user.name und user.email setzen
- Die Ebenen system / global / local verstehen
- Mit help Befehle nachschlagen

## Konfiguration vor dem ersten Commit

Git muss für jeden Commit den Autor kennen — also einmalig konfigurieren:

```bash
git config --global user.name "Ihr Name"
git config --global user.email "sie@example.com"
```

`--global` gilt für alle Repositories. `git config --list` zeigt alle wirksamen Einstellungen, `git config user.name` eine einzelne.

## Drei Konfigurationsebenen

Die Konfiguration hat drei Ebenen — **je spezifischer, desto höher die Priorität**:

| Ebene | Geltung | Gespeichert in |
| --- | --- | --- |
| system | alle Benutzer der Maschine | `/etc/gitconfig` |
| global | alle Repositories des Benutzers | `~/.gitconfig` |
| local | das aktuelle Repository | `.git/config` |

Der wirksame Wert ergibt sich in der Reihenfolge local → global → system.

## Wenn Sie einen unbekannten Befehl treffen

- `git help <Befehl>`: öffnet das vollständige Handbuch
- `git <Befehl> -h`: kurze Nutzungsübersicht
- `git help --all`: listet alle Befehle

Einen Befehl zu vergessen ist kein Problem — zu wissen, wie man nachschlägt, genügt.

## Übungen

<Exercise />

<LessonProgress />
