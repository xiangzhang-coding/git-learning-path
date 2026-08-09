# Kapitel 5 — GitHub-Ökosystem

Der Prinzipfaden dieses Kapitels: **die Kollaborationsschleife rund um GitHub**. fork erstellt Ihre Kopie, upstream verbindet den Original-Autor; der PR ist die Tür, durch die Commits in den main gelangen, das issue trägt die Diskussion, das release veröffentlicht Versionen, Actions und Pages automatisieren Tests und Deployment. Dieses Kapitel üben Sie auf echtem GitHub — zu jedem Konzept gibt es eine Aufgabe zum Mitmachen.

## Praxis-Checkliste

Schließen Sie die folgenden Übungen auf echtem GitHub ab und haken Sie Ihren Fortschritt ab:

<Checklist :tasks="[
  { text: 'forken Sie ein von Ihnen häufig genutztes Open-Source-Repository', link: '/de/stage/5/5-1-fork-upstream' },
  { text: 'klonen Sie Ihren eigenen fork, fügen Sie upstream hinzu und synchronisieren Sie einmal', link: '/de/stage/5/5-1-fork-upstream' },
  { text: 'pushen Sie einen Feature-Branch und eröffnen Sie einen echten PR', link: '/de/stage/5/5-2-pull-request' },
  { text: 'erleben Sie eine review-Diskussion in einem PR', link: '/de/stage/5/5-2-pull-request' },
  { text: 'eröffnen Sie ein issue und erstellen Sie label und milestone', link: '/de/stage/5/5-3-issues' },
  { text: 'reichen Sie einen PR ein, der ein issue verknüpft (fixes #Nummer)', link: '/de/stage/5/5-3-issues' },
  { text: 'setzen Sie das tag v0.1.0 und erstellen Sie das erste Release', link: '/de/stage/5/5-4-releases' },
  { text: 'veröffentlichen Sie eine Patch-Version und schreiben Sie eine dreiteilige Beschreibung', link: '/de/stage/5/5-4-releases' },
  { text: 'schreiben Sie ein workflow, das statische Seiten auf Pages deployed', link: '/de/stage/5/5-5-actions-pages' },
  { text: 'bauen Sie absichtlich einen Fehler in den Build-Schritt ein und beobachten Sie das Fehlerprotokoll in Actions', link: '/de/stage/5/5-5-actions-pages' }
]" />

## Lektionen

- 5-1 [fork und upstream synchronisieren](/de/stage/5/5-1-fork-upstream): fork erstellt eine Kopie, upstream empfängt Upstream-Updates
- 5-2 [Pull-Request-Workflow](/de/stage/5/5-2-pull-request): PR eröffnen, review-Diskussion, drei Merge-Methoden
- 5-3 [Issues und Zusammenarbeit](/de/stage/5/5-3-issues): issue-Diskussionen, labels und milestones, PR schließt issues automatisch
- 5-4 [Releases und Versionierung](/de/stage/5/5-4-releases): semantische Versionierung, tag pushen, Releases veröffentlichen
- 5-5 [GitHub Actions und Pages](/de/stage/5/5-5-actions-pages): workflow-Automatisierung, Pages-Deployment

## Kernfunktionen dieses Kapitels

| Funktion | Wirkung |
| --- | --- |
| fork | Ein Repository auf GitHub in Ihr Konto kopieren |
| pull request | Anfrage, Branch-Commits in das Ziel-Repository zu mergen |
| issue | Diskussion und Verfolgung von bugs, Features, Aufgaben |
| milestone | Eine Gruppe von issues einem Versionsziel zuordnen |
| release | Formelle Veröffentlichung auf Basis eines tag (mit Anmerkungen und Artefakten) |
| GitHub Actions | Ereignisgesteuerte CI/CD-Automatisierung |
| GitHub Pages | Kostenloses statisches Site-Hosting (dieses Projekt nutzt es) |

<StageProgress stage="5" />
