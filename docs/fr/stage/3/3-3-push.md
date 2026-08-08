---
title: "git push : envoyer des commits"
exercises:
  - id: 3-3-e1
    question: Qu'est-ce que git push envoie au remote ?
    options:
      - Les commits de la branche courante que le remote n'a pas encore (avec leur historique)
      - Tous les fichiers du working tree
      - Toutes les branches locales
    correct: 0
    explanation: "push envoie les commits où la branche locale est en avance sur le remote, et fait avancer la branche distante jusqu'au même point."
    anchor: "#ce-que-git-push-envoie"
  - id: 3-3-e2
    question: Pourquoi git refuse-t-il une poussée non-fast-forward ?
    options:
      - "Le remote a des commits que le local n'a pas : les écraser directement ferait perdre le travail des autres"
      - Le dépôt distant est plein
      - Le nom de la branche locale n'est pas valide
    correct: 0
    explanation: "Si le remote est en avance sur le local, push écraserait ses nouveaux commits — git refuse cet écrasement et demande d'abord de faire un pull pour fusionner, puis de pousser à nouveau."
    anchor: "#la-poussee-non-fast-forward-est-rejetee"
  - id: 3-3-e3
    question: Dans la zone d'entraînement ci-dessous, envoie tes commits locaux vers le remote.
    type: task
    scenario: push
    goal: "Sur la branche main, exécute git push pour envoyer au remote les commits où le local est en avance."
    checks:
      - type: branchIs
        name: main
      - type: pushedTo
    explanation: "Après le push, la sortie affiche To /origin et main -> main ; le dépôt distant pointe maintenant vers le même commit que le local."
    anchor: "#ce-que-git-push-envoie"
---

# git push : envoyer des commits

## Objectifs de la leçon

- envoyer des commits locaux vers le remote avec git push
- comprendre que push n'envoie que « la partie en avance »
- comprendre la règle de refus non-fast-forward

## Ce que git push envoie

```bash
git push              # pousse la branche courante vers origin
git push origin main  # précise le remote et la branche
```

push envoie au remote **les commits que la branche courante a et que le remote n'a pas**, puis fait avancer la branche distante jusqu'au même point que le local. La sortie ressemble à :

```
To /origin
   2a79a8e..b095b2  main -> main
```

`2a79a8e..b095b2` signifie que la branche distante est passée de l'ancien commit au nouveau. Une fois la poussée réussie, le remote et le local partagent la même histoire.

**À noter** : push n'envoie que « les commits en avance ». Ni les modifications que le local n'a pas non plus côté remote, ni les modifications locales non committées ne sont envoyées.

## La mise à jour fast-forward et le tracking branch

push fait essentiellement avancer la branche distante **en fast-forward** jusqu'à la branche locale (le fast-forward vient de l'étape 2, à propos de merge). Une fois la poussée réussie, le tracking branch local `origin/main` avance lui aussi — c'est l'image de « où se trouve le remote », et elle est maintenant alignée avec le remote.

## La poussée non-fast-forward est rejetée

Si **le remote a des commits que le local n'a pas** (par exemple quelqu'un a poussé avant vous, ou le remote a reçu d'autres mises à jour), pousser directement écraserait ces commits — git refuse :

```
 ! [rejected]        main -> main (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. 'git pull ...')
hint: before pushing again.
```

La solution est celle indiquée par le message : faites d'abord `git pull` pour fusionner les nouveaux commits du remote, puis poussez à nouveau.

## Exercices

<Exercise />

## Zone d'entraînement

<Playground scenario="push" />

<LessonProgress />
