# Glossar

Begriffe behalten immer ihren englischen Namen; diese Tabelle gibt eine kurze Erklärung.

| Begriff | Bedeutung | Erste Erwähnung |
| --- | --- | --- |
| repository | Das Verzeichnis, das Historie und Metadaten speichert (enthält `.git`) | 0-2 |
| working tree | Der Bereich, in dem Sie Dateien bearbeiten | 0-2 |
| staging area | Die Liste der für den nächsten Commit vorbereiteten Änderungen (auch index) | 0-2 |
| commit | Eine vollständige Snapshot-Aufzeichnung | 0-1 |
| snapshot | Der vollständige Zustand des Projekts zu einem Zeitpunkt | 0-1 |
| SHA-1 | Inhalts-Hash; der eindeutige Bezeichner eines Commits | Stufe 1 |
| HEAD | Zeiger auf den neuesten Commit des aktuellen Branch | Stufe 2 |
| branch | Ein beweglicher Zeiger auf einen Commit | Stufe 2 |
| tag | Ein Name, der fest auf einen Commit zeigt | Stufe 4 |
| remote | Eine andernorts gehostete Kopie des Repositorys | Stufe 3 |
| origin | Der Standardname des Remotes nach dem Klonen | Stufe 3 |
| clone | Ein Remote-Repository auf den eigenen Rechner kopieren | Stufe 3 |
| fetch | Remote-Commits herunterladen, ohne zu mergen | Stufe 3 |
| push | Lokale Commits zu einem Remote hochladen | Stufe 3 |
| pull | fetch + merge | Stufe 3 |
| merge | Einen anderen Branch in den aktuellen integrieren | Stufe 2 |
| rebase | Commits auf eine neue Basis umhängen | Stufe 4 |
| conflict | Überlappende Änderungen, die manuell gelöst werden müssen | Stufe 2 |
| stash | Nicht committete Änderungen vorübergehend beiseitelegen | Stufe 4 |
| checkout | Branches wechseln oder Dateien wiederherstellen | Stufe 2 |
| switch | Branches wechseln (neuerer Befehl) | Stufe 2 |
| restore | Eine Datei auf eine bestimmte Version zurücksetzen | Stufe 1 |
| reset | HEAD und/oder Staging area und Working tree bewegen | Stufe 4 |
| revert | Einen alten Commit mit einem neuen Commit rückgängig machen | Stufe 4 |
| cherry-pick | Einen bestimmten Commit auf den aktuellen Branch kopieren | Stufe 4 |
| diff | Die Änderung zwischen zwei Zuständen | Stufe 1 |
| status | Übersicht der Unterschiede zwischen den drei Bereichen | Stufe 1 |
| log | Die Liste der Commit-Historie | Stufe 1 |
| tracking branch | Ein lokaler Branch, der einem Remote-Branch zugeordnet ist | Stufe 3 |
| upstream | Der Remote-Branch, den ein lokaler Branch verfolgt | Stufe 3 |
| fast-forward | Ein Merge, der ohne Abweichung einfach vorwärts läuft | Stufe 2 |
| detached HEAD | HEAD, der auf keinen Branch zeigt | Stufe 4 |
| reflog | Die vollständige Aufzeichnung, wo HEAD war | Stufe 4 |
| DAG | Gerichteter azyklischer Graph; die Topologie der Commit-Historie | Stufe 2 |
| fork | Das Repository eines anderen in das eigene Konto kopieren | Stufe 5 |
| pull request | Anfrage, den eigenen Branch zu mergen (PR) | Stufe 5 |
