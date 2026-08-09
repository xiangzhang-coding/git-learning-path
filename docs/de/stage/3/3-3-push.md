---
title: git push überträgt Commits
exercises:
  - id: 3-3-e1
    question: Was sendet git push zum Remote?
    options:
      - Die Commits des aktuellen Branches, die das Remote noch nicht hat (zusammen mit ihrer Historie)
      - Alle Dateien im Arbeitsverzeichnis
      - Alle lokalen Branches
    correct: 0
    explanation: push sendet die Commits, mit denen der lokale Branch dem Remote voraus ist, und bringt den Remote-Branch auf denselben Stand.
    anchor: "#git-push-sendet-commits"
  - id: 3-3-e2
    question: Warum lehnt git einen non-fast-forward-Push ab?
    options:
      - Das Remote hat Commits, die lokal fehlen; ein direktes Überschreiben würde die Arbeit anderer verlieren lassen
      - Das Remote-Repository ist voll
      - Der lokale Branch-Name ist ungültig
    correct: 0
    explanation: Wenn das Remote dem lokalen Stand voraus ist, würde push die neuen Commits des Remotes überschreiben — git lehnt das ab und verlangt, zuerst zu pullen und zu mergen, dann zu pushen.
    anchor: "#non-fast-forward-push-wird-abgelehnt"
  - id: 3-3-e3
    question: Übertragen Sie im untenstehenden Übungsbereich Ihre lokalen Commits zum Remote.
    type: task
    scenario: push
    goal: Führen Sie auf main git push aus, um die lokalen, dem Remote vorausliegenden Commits zu übertragen.
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: Nach dem push erscheint in der Ausgabe To /origin und main -> main; das Remote-Repository zeigt jetzt auf denselben Commit wie lokal.
    anchor: "#git-push-sendet-commits"
---

# git push überträgt Commits

## Lektionsziele

- Mit git push lokale Commits zum Remote übertragen
- Verstehen, dass push nur den „vorausliegenden Teil" sendet
- Die Non-fast-forward-Regel verstehen

## git push sendet Commits

```bash
git push              # aktuellen Branch zu origin übertragen
git push origin main  # Remote und Branch explizit angeben
```

push sendet die **Commits des aktuellen Branches, die das Remote noch nicht hat**, und bringt den Remote-Branch danach auf denselben Stand wie den lokalen. Die Ausgabe sieht etwa so aus:

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` bedeutet: Der Remote-Branch ist von einem alten Commit auf einen neuen vorgerückt. Nach dem erfolgreichen push teilen Remote und lokal dieselbe Historie.

**Hinweis**: push sendet nur „vorausliegende Commits". Änderungen, die weder Remote noch lokal haben, und nicht committete lokale Änderungen werden nicht übertragen.

## Fast-forward-Update und Tracking-Branch

push bringt den Remote-Branch im Kern **per Fast-forward** auf den Stand des lokalen Branches (der Begriff Fast-forward stammt aus Kapitel 2, vom merge). Nach dem push rückt auch der lokale Tracking-Branch `origin/main` vor — er ist die Spiegelung „wo das Remote gerade steht" und stimmt jetzt wieder mit dem Remote überein.

**Upstream**: Nach dem erfolgreichen push entsteht eine Upstream-Beziehung zwischen lokalem und Remote-Branch — der Remote-Branch wird zum Upstream des lokalen Branches. Von da an wissen `git push` / `git pull` auch ohne Argumente, mit welchem Remote-Branch synchronisiert wird.

## Non-fast-forward-Push wird abgelehnt

Wenn **das Remote Commits hat, die lokal fehlen** (weil jemand anderes zuerst gepusht hat oder das Remote anderweitig aktualisiert wurde), würde ein direkter push diese Commits überschreiben — git lehnt ab:

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

Die Lösung ist der Hinweis: erst `git pull` ausführen, um die neuen Remote-Commits zu integrieren, dann erneut pushen.

## Übungen

<Exercise />

## Übungsbereich

<Playground scenario="push" />

<LessonProgress />
