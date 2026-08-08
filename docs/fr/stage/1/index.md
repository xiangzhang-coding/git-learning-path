# Étape 1 — Les bases en local

Le fil de principe de cette étape : **snapshots et SHA**. Toutes les commandes de cette étape reviennent, au fond, à déplacer du contenu entre les trois zones.

<StageProgress
  :lessons="[
    { text: '1-1 git init et git status', path: '/fr/stage/1/1-1-init-status' },
    { text: '1-2 git add et git commit', path: '/fr/stage/1/1-2-add-commit' },
    { text: '1-3 git log et git diff', path: '/fr/stage/1/1-3-log-diff' },
    { text: '1-4 git restore, git rm et git mv', path: '/fr/stage/1/1-4-restore-rm-mv' }
  ]"
/>

- 1-1 : git init crée le dépôt, git status permet de lire l'état du dépôt
- 1-2 : git add met en staging, git commit enregistre un instantané
- 1-3 : git log consulte l'historique, git diff consulte les modifications
- 1-4 : git restore annule, git rm supprime, git mv déplace

La zone d'entraînement en fin de chaque leçon accepte directement les commandes ; les exercices vérifient automatiquement ton résultat.
