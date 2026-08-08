# Glossary

Terms always keep their English names; this table gives a short definition for each.

| Term | Meaning | First seen |
| --- | --- | --- |
| repository | The directory that stores project history and metadata (contains `.git`) | 0-2 |
| working tree | The area where you edit files | 0-2 |
| staging area | The list of changes prepared for the next commit (also called index) | 0-2 |
| commit | A complete snapshot record | 0-1 |
| snapshot | The complete state of the project at one point in time | 0-1 |
| SHA-1 | Content hash; the unique identifier of a commit | Stage 1 |
| HEAD | Pointer to the latest commit of the current branch | Stage 2 |
| branch | A movable pointer to a commit | Stage 2 |
| tag | A name fixed to a specific commit | Stage 4 |
| remote | A copy of the repository hosted elsewhere | Stage 3 |
| origin | The default name of the remote after cloning | Stage 3 |
| clone | Copy a remote repository to your machine | Stage 3 |
| fetch | Download remote commits without merging | Stage 3 |
| push | Upload local commits to a remote | Stage 3 |
| pull | Fetch + merge | Stage 3 |
| merge | Integrate another branch into the current one | Stage 2 |
| rebase | Re-anchor commits onto a new base | Stage 4 |
| conflict | Overlapping changes that need manual resolution | Stage 2 |
| stash | Set aside uncommitted changes temporarily | Stage 4 |
| checkout | Switch branches or restore files | Stage 2 |
| switch | Switch branches (newer command) | Stage 2 |
| restore | Restore a file to a given version | Stage 1 |
| reset | Move HEAD and/or the staging area and working tree | Stage 4 |
| revert | Undo an old commit with a new commit | Stage 4 |
| cherry-pick | Copy a specific commit onto the current branch | Stage 4 |
| diff | The change between two states | Stage 1 |
| status | Overview of the differences between the three areas | Stage 1 |
| log | The list of commit history | Stage 1 |
| tracking branch | A local branch associated with a remote branch | Stage 3 |
| upstream | The remote branch a local branch tracks | Stage 3 |
| fast-forward | A merge that just moves forward without divergence | Stage 2 |
| detached HEAD | HEAD not pointing at any branch | Stage 4 |
| reflog | The complete record of where HEAD has been | Stage 4 |
| DAG | Directed acyclic graph; the topology of commit history | Stage 2 |
| fork | Copy someone else's repository into your account | Stage 5 |
| pull request | Request to merge your branch (PR) | Stage 5 |
