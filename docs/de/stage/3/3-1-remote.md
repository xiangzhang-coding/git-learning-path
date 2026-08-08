---
title: "git remote: Remote-Repositories verwalten"
exercises:
  - id: 3-1-e1
    question: Was ist ein remote?
    options:
      - Eine entfernte Stelle, die eine Kopie des Repositorys enthält (ein anderes Repository, meist auf einem Server)
      - Ein lokaler Ordner
      - Ein eingebauter git-Befehl, der das Repository komprimiert
    correct: 0
    explanation: Ein remote ist die Adresse eines „anderen Repositorys". git verwendet sie, um Commits hoch- und herunterzuladen; origin ist der Standardname des Remotes nach dem Klonen.
    anchor: "#was-ist-ein-remote"
  - id: 3-1-e2
    question: Was zeigt git remote -v an?
    options:
      - Namen und Adressen aller Remotes
      - Die Liste aller Branches
      - Alle Commits des Remotes
    correct: 0
    explanation: git remote -v listet für jedes remote den Namen, die Adresse sowie die Konfiguration für fetch und push auf.
    anchor: "#git-remote-ansehen-und-hinzufugen"
  - id: 3-1-e3
    question: Fügen Sie im untenstehenden Übungsbereich ein Remote mit dem Namen origin hinzu.
    type: task
    scenario: remote
    goal: Registrieren Sie das Remote mit git remote add origin /origin und bestätigen Sie es mit git remote -v.
    checks:
      - type: configIs
        key: remote.origin.url
        value: /origin
    explanation: remote add registriert nur die Adresse und überträgt keine Daten. Danach wissen fetch/push/pull, wohin sie gehen müssen.
    anchor: "#git-remote-ansehen-und-hinzufugen"
---

# git remote: Remote-Repositories verwalten

## Lektionsziele

- Das Konzept eines remotes verstehen: die Adresse eines anderen Repositorys
- Mit git remote add ein Remote-Repository registrieren
- Mit git remote -v die Konfiguration ansehen

## Was ist ein remote

Bisher liegen alle Ihre Commits in **einem Repository auf Ihrem Rechner**. Echte Projekte brauchen Zusammenarbeit: Jede Person hat ein Repository, dazu kommt ein „geteiltes Repository" als Austauschpunkt — das ist das remote.

Ein remote ist im Kern **die Adresse eines anderen git-Repositorys**. git selbst hat keine „Cloud"; jede Maschine (oder jedes Verzeichnis) kann als remote dienen. Ihr Repository referenziert es über einen Namen, standardmäßig **origin** (nach dem Klonen automatisch vergeben).

Im Übungsbereich dieser Lektion ist `/origin` die Adresse des Remote-Repositorys — ein eigenständiges In-Memory-Repository, unabhängig vom lokalen `/repo`. **Sie können nicht per `cd` in das Remote wechseln**: Es enthält nur die Historie, keine Arbeitskopie (wie ein echtes Bare-Repository oder ein Repository auf einem Server). Sie arbeiten in der lokalen Kopie und tauschen Daten über git-Befehle mit ihm aus.

## git remote ansehen und hinzufügen

```bash
git remote            # Namen der Remotes auflisten
git remote -v         # Namen + Adressen auflisten (je eine Zeile für fetch/push)
git remote add <Name> <Adresse>   # Ein neues remote registrieren
```

```
$ git remote -v
origin  /origin  (fetch)
origin  /origin  (push)
```

`remote add` registriert nur die Adresse, **es überträgt keine Daten**. Die Konfiguration wird in `.git/config` geschrieben:

```
[remote "origin"]
	url = /origin
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Zwei Rollen im Blick behalten

| Name | Bedeutung |
| --- | --- |
| Lokaler Branch | `refs/heads/main`, hier landen Ihre Commits |
| remote | Die Adresse des Remote-Repositorys, z. B. `/origin` |
| Tracking-Branch | `refs/remotes/origin/main`, die lokale Spiegelung „worauf main auf der anderen Seite zeigt" |

Der Tracking-Branch ist der Schlüssel für die nächsten Schritte clone/fetch: Er zeigt Ihnen auch ohne Verbindung, „wie das Remote aussieht".

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="remote" />

<LessonProgress />
