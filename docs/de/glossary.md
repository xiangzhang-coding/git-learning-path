# Glossar

Begriffe behalten immer ihren englischen Namen; diese Tabelle gibt eine kurze Erklärung.

| Begriff | Bedeutung | Erste Erwähnung |
| --- | --- | --- |
| repository | Das Verzeichnis, das Historie und Metadaten speichert (enthält `.git`) | 0-2 |
| working tree | Der Bereich, in dem Sie Dateien bearbeiten | 0-2 |
| staging area | Die Liste der für den nächsten Commit vorbereiteten Änderungen (auch index) | 0-2 |
| commit | Eine vollständige Snapshot-Aufzeichnung | 0-1 |
| snapshot | Der vollständige Zustand des Projekts zu einem Zeitpunkt | 0-1 |
| SHA-1 | Inhalts-Hash; der eindeutige Bezeichner eines Commits | Kapitel 1 |
| HEAD | Zeiger auf den neuesten Commit des aktuellen Branch | Kapitel 2 |
| branch | Ein beweglicher Zeiger auf einen Commit | Kapitel 2 |
| tag | Ein Name, der fest auf einen Commit zeigt | Kapitel 4 |
| remote | Eine andernorts gehostete Kopie des Repositorys | Kapitel 3 |
| origin | Der Standardname des Remotes nach dem Klonen | Kapitel 3 |
| clone | Ein Remote-Repository auf den eigenen Rechner kopieren | Kapitel 3 |
| fetch | Remote-Commits herunterladen, ohne zu mergen | Kapitel 3 |
| push | Lokale Commits zu einem Remote hochladen | Kapitel 3 |
| pull | fetch + merge | Kapitel 3 |
| merge | Einen anderen Branch in den aktuellen integrieren | Kapitel 2 |
| rebase | Commits auf eine neue Basis umhängen | Kapitel 4 |
| conflict | Überlappende Änderungen, die manuell gelöst werden müssen | Kapitel 2 |
| stash | Nicht committete Änderungen vorübergehend beiseitelegen | Kapitel 4 |
| checkout | Branches wechseln oder Dateien wiederherstellen | Kapitel 2 |
| switch | Branches wechseln (neuerer Befehl) | Kapitel 2 |
| restore | Eine Datei auf eine bestimmte Version zurücksetzen | Kapitel 1 |
| reset | HEAD und/oder Staging area und Working tree bewegen | Kapitel 4 |
| revert | Einen alten Commit mit einem neuen Commit rückgängig machen | Kapitel 4 |
| cherry-pick | Einen bestimmten Commit auf den aktuellen Branch kopieren | Kapitel 4 |
| diff | Die Änderung zwischen zwei Zuständen | Kapitel 1 |
| status | Übersicht der Unterschiede zwischen den drei Bereichen | Kapitel 1 |
| log | Die Liste der Commit-Historie | Kapitel 1 |
| tracking branch | Ein lokaler Branch, der einem Remote-Branch zugeordnet ist | Kapitel 3 |
| upstream | Der Remote-Branch, den ein lokaler Branch verfolgt | Kapitel 3 |
| fast-forward | Ein Merge, der ohne Abweichung einfach vorwärts läuft | Kapitel 2 |
| detached HEAD | HEAD, der auf keinen Branch zeigt | Kapitel 4 |
| reflog | Die vollständige Aufzeichnung, wo HEAD war | Kapitel 4 |
| DAG | Gerichteter azyklischer Graph; die Topologie der Commit-Historie | Kapitel 2 |
| fork | Das Repository eines anderen in das eigene Konto kopieren | Kapitel 5 |
| pull request | Anfrage, den eigenen Branch zu mergen (PR) | Kapitel 5 |
| issue | Diskussionsthread zu bug, Feature oder Aufgabe im Repository | Kapitel 5 |
| label | Kennzeichnung zur Kategorisierung von issues (z. B. bug, enhancement) | Kapitel 5 |
| milestone | Eine Gruppe von issues einem Versionsziel zuordnen | Kapitel 5 |
| release | Formelle Veröffentlichung auf Basis eines tag, mit Anmerkungen und Artefakten | Kapitel 5 |
| workflow | Automatisierter Ablauf in GitHub Actions | Kapitel 5 |
