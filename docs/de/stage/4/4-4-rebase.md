---
title: "git rebase: Commits neu aufspielen"
exercises:
  - id: 4-4-e1
    question: Was macht git rebase?
    options:
      - Die Commits des aktuellen Branch ab dem Abzweigungspunkt hinter den neuesten Commit des Ziel-Branch legen
      - Beide Branches zu einem Commit zusammenführen
      - Die Historie des aktuellen Branch löschen
    correct: 0
    explanation: rebase „spielt" die Commits ab dem Abzweigungspunkt einzeln oben auf den Ziel-Branch — aus einer Verzweigung wird eine gerade Linie.
    anchor: "#git-rebase-commits-aufspielen"
  - id: 4-4-e2
    question: Was passiert mit den Commit-Hashes nach einem rebase?
    options:
      - Alle neu aufgespielten Commits haben neue Hashes (gleicher Inhalt, andere Identität)
      - Sie bleiben unverändert
      - Nur der erste ändert sich
    correct: 0
    explanation: Der Hash enthält den Parent-Commit und die Zeit — das Aufspielen erzeugt also komplett neue Commit-Objekte. Rebasen Sie deshalb keine bereits gepushten Branches.
    anchor: "#git-rebase-commits-aufspielen"
  - id: 4-4-e3
    question: Rebasen Sie im untenstehenden Übungsbereich den feature-Branch auf main.
    type: task
    scenario: rebase
    goal: Wechseln Sie auf feature, führen Sie git rebase main aus, damit die Commits von feature hinter main landen.
    checks:
      - type: mergeDone
        branch: main
      - type: noMergeCommit
      - type: hasCommit
        messageContains: feature work
    explanation: Nach dem rebase ist der Commit-Graph eine Linie — erst die Commits von main, dann die von feature, ohne Merge-Commit.
    anchor: "#git-rebase-commits-aufspielen"
  - id: 4-4-e4
    question: Brechen Sie im untenstehenden Übungsbereich den rebase nach einem Konflikt ab.
    type: task
    scenario: rebase-conflict
    goal: Wechseln Sie auf feature, führen Sie git rebase main aus, um einen Konflikt auszulösen, und setzen Sie dann mit git rebase --abort alles zurück.
    checks:
      - type: branchIs
        name: feature
      - type: statusClean
    explanation: Wenn beide Seiten dieselbe Stelle geändert haben, gibt es einen Konflikt; --abort stellt alles auf den Stand vor dem rebase zurück.
    anchor: "#rebase-konflikte-und-abbruch"
---

# git rebase: Commits neu aufspielen

## Lektionsziele

- Mit git rebase Branch-Commits auf einen Ziel-Branch aufspielen
- Verstehen, dass rebase die Historie umschreibt und neue Hashes erzeugt
- rebase-Konflikte und --abort verstehen

## git rebase: Commits aufspielen

```bash
git switch feature
git rebase main
```

rebase wendet jeden Commit des aktuellen Branch **ab dem Abzweigungspunkt** erneut hinter dem neuesten Commit des Ziel-Branch an:

```
vor dem rebase (Verzweigung):   nach dem rebase (gerade Linie):
o  A                            o  A
|\                              o  B (main)
| o  B (main)                   o  C' (feature, neuer Hash)
o |  C (feature)                o  D' (feature, neuer Hash)
 \|
  o  D (feature)
```

Die Ausgabe lautet `Successfully rebased and updated refs/heads/feature.`. Der Commit-Graph wird aus einem „Ast" eine „gerade Linie" — das ist der Kernwert von rebase: **sauberere Historie**.

**Wichtig**: Die neu aufgespielten Commits haben **neue Hashes** (gleicher Inhalt, andere Identität). rebase schreibt also die Historie um — rebasen Sie deshalb niemals Branches, die bereits gepusht wurden und andere verwenden.

## rebase oder merge

| | merge | rebase |
| --- | --- | --- |
| Historie | Verzweigung + Merge-Commit bleibt | linear, ohne Verzweigung |
| Hashes | unverändert | umgeschrieben (neue Hashes) |
| Bereits gepusht | sicher | verboten |
| Einsatz | gemeinsame Branches zusammenführen | eigene lokale Branches aufräumen |

Ein gängiges Workflow-Pattern: lokal mit rebase die Historie begradigen, nach dem Push per merge in den gemeinsamen Branch integrieren.

## rebase: Konflikte und Abbruch

Beim Aufspielen jedes Commits kann es zu Konflikten kommen (beide Seiten haben dieselbe Stelle geändert); dann stoppt git:

```
CONFLICT (content): Merge conflict in hello.txt
error: could not apply abc1234... feat: feature version
hint: Resolve all conflicts manually... 
```

Zwei Auswege:

```bash
git rebase --continue   # Konflikt gelöst (nach add) und weiter aufspielen
git rebase --abort      # diesen rebase aufgeben und den alten Zustand wiederherstellen
```

Wie bei merge-Konflikten: Dateien bearbeiten, Markierungen entfernen, `git add`, dann `--continue`. Und wer nicht weiterarbeiten will, nimmt `--abort` — alles ist wieder wie vor dem rebase.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="rebase" />

<LessonProgress />
