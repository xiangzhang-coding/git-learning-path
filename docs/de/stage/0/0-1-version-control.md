---
title: Warum Versionskontrolle?
exercises:
  - id: 0-1-e1
    question: Was ist das größte Problem beim Verwalten von Versionen durch Datei-Kopien mit Datumszusatz?
    options:
      - Die Dateien belegen zu viel Speicherplatz
      - Die Historie ist nicht zurückverfolgbar — man kann nicht zuverlässig zurückwechseln
      - Die Dateinamen sind zu lang
    correct: 1
    explanation: Der Kernfehler ist weder Platz noch Namen, sondern die nicht abrufbare Historie — Sie können nicht sicher zu einem früheren Stand zurückkehren oder wissen, welche Datei die neueste ist.
    anchor: "#was-ist-versionskontrolle"
  - id: 0-1-e2
    question: Welches gehört NICHT zu den Kernfähigkeiten eines Versionskontrollsystems (VCS)?
    options:
      - Jede Änderung als Snapshot aufzeichnen
      - Zu jeder historischen Version zurückkehren
      - Code-Bugs automatisch beheben
    correct: 2
    explanation: Ein VCS zeichnet auf, vergleicht, macht rückgängig und unterstützt Zusammenarbeit — es repariert keinen Code. Das ist die Aufgabe der Entwicklerin.
    anchor: "#was-ist-versionskontrolle"
  - id: 0-1-e3
    question: Was ist der entscheidende Unterschied zwischen zentraler (z. B. SVN) und verteilter (z. B. Git) Versionskontrolle?
    options:
      - Zentral benötigt Netzwerk zum Committen; verteilt committet lokal
      - Verteilte Systeme unterstützen keine Zusammenarbeit
      - Es gibt keinen wesentlichen Unterschied
    correct: 0
    explanation: Bei zentralen Systemen muss jeder Commit an einen zentralen Server gesendet werden — offline ist kein Commit möglich. Bei verteilten Systemen ist jeder Klon ein vollständiges Repository, man committet lokal und offline.
    anchor: "#zentral-vs-verteilt"
  - id: 0-1-e4
    question: Was speichert ein einzelner commit in Git?
    options:
      - Nur den Unterschied zum vorherigen Commit
      - Einen vollständigen Snapshot des gesamten Projekts
      - Nur die Pfade der geänderten Dateien
    correct: 1
    explanation: Ein Git-commit speichert einen vollständigen Snapshot (mit Kompression und Deduplizierung), nicht nur einen Diff — deshalb heißt Git „snapshot-basiert".
    anchor: "#zentral-vs-verteilt"
---

# Warum Versionskontrolle?

## Lektionsziele

- Verstehen, welche Probleme ein Versionskontrollsystem (VCS) löst
- Zentrale und verteilte Versionskontrolle vergleichen
- Wissen, zu welcher Art Git gehört

## Die Qual ohne Versionskontrolle

Stellen Sie sich vor, Sie arbeiten an einem Projekt: Nach der Hälfte merken Sie, dass der Ansatz nicht funktioniert, und möchten zum Stand von gestern Nachmittag zurück — wo ist diese Datei? Vielleicht in `final_v2_Backup`, vielleicht schon überschrieben. Zusammenarbeit ist schlimmer: Zwei Personen bearbeiten dieselbe Datei, wer zuletzt speichert, gewinnt, und die Änderungen der anderen verschwinden lautlos.

Diese drei Probleme — **aufzeichnen, zurückkehren, zusammenarbeiten** — löst Git.

## Was ist Versionskontrolle

Ein Versionskontrollsystem (VCS) zeichnet jede Änderung auf und speichert einen vollständigen **Snapshot** des Projekts zu jedem Zeitpunkt. Damit können Sie:

- jeden historischen Stand ansehen
- die Unterschiede zwischen zwei beliebigen Ständen vergleichen
- zu jedem früheren Stand zurückkehren

Es ist kein Backup-Tool: Backups behalten nur die neueste Kopie, ein VCS bewahrt die ganze Historie, und jede Version ist rekonstruierbar.

## Zentral vs. verteilt

- **Zentral (z. B. SVN)**: ein zentrales Repository; alle checken von dort aus, jeder Commit muss über das Netz gesendet werden. Fällt der Server aus, kann niemand committen.
- **Verteilt (z. B. Git)**: jeder Klon ist eine vollständige Kopie des zentralen Repositorys. Commits entstehen lokal und offline; später pushen Sie sie an andere.

Weil jeder Git-commit einen vollständigen Snapshot statt eines Diffs speichert, ist die gesamte Historie aus jedem Klon vollständig rekonstruierbar — genau das macht „verteilt" überhaupt möglich.

## Animation: die Zeitleiste zurückspulen

Ziehen Sie den Regler oder klicken Sie einen Punkt: Die Dateien ändern sich mit jeder Version — „in die Vergangenheit gehen" ist genau das, was Versionskontrolle Ihnen gibt.

<TimelineRewind />

## Übungen

<Exercise />

## Übungsbereich

Diese Lektion nutzt keine Befehle; der Übungsbereich kommt in Stufe 1.

<LessonProgress />
