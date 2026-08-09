---
title: git worktree 여러 개의 작업 트리
exercises:
  - id: 4-5-e1
    question: git worktree란 무엇인가요?
    options:
      - 같은 저장소의 objects와 refs를 공유하는 추가 작업 디렉터리
      - 고유한 역사를 가진 저장소의 복사본
      - 실험용 임시 브랜치
    correct: 0
    explanation: "git worktree add는 같은 저장소(공유되는 objects와 refs)를 읽고 쓰는 또 다른 작업 디렉터리를 만들지만, HEAD와 index는 각자 따로 가집니다."
    anchor: "#하나의-저장소-하나의-작업-트리"
  - id: 4-5-e2
    question: 같은 브랜치를 두 개의 worktree에서 동시에 checkout할 수 있나요?
    options:
      - 안 됩니다. git이 거부합니다. 브랜치는 하나의 worktree에서만 checkout할 수 있습니다
      - 네, 둘 다 작업하고 나중에 병합할 수 있습니다
      - 브랜치가 아직 push되지 않은 경우에만 가능합니다
    correct: 0
    explanation: 각 브랜치는 정확히 하나의 worktree에서만 checkout할 수 있습니다 — 그렇지 않으면 두 worktree가 같은 브랜치에 서로의 커밋을 덮어쓰게 되기 때문입니다.
    anchor: "#git-worktree-add-두-번째-작업-트리"
  - id: 4-5-e3
    question: 커밋되지 않은 변경 사항이 있는 worktree를 git worktree remove하면 어떻게 되나요?
    options:
      - git이 거부하고, 변경 사항을 처리할 때까지 worktree를 유지합니다
      - git이 worktree와 함께 변경 사항도 삭제합니다
      - git이 변경 사항을 자동으로 커밋합니다
    correct: 0
    explanation: "안전 장치로, 변경 사항이 커밋되지 않은 상태에서는 remove가 거부됩니다 — commit하거나 stash하거나, 정말 버리려면 -f(강제)를 사용하세요."
    anchor: "#git-worktree-remove-정리"
---

# git worktree 여러 개의 작업 트리

## 이번 과의 목표

- git worktree로 같은 저장소에 추가 작업 디렉터리 만들기
- 모든 worktree가 objects와 refs를 공유하지만 HEAD는 각자 따로 가진다는 점 이해하기
- worktree 목록 보기와 정리하기, 에이전트가 사용하는 이유 알기

## 하나의 저장소, 하나의 작업 트리

기본적으로 저장소 하나는 작업 디렉터리 하나를 의미합니다. 브랜치 하나를 checkout하고, 파일을 편집하고, 커밋합니다 — 다른 브랜치가 필요하면 `git switch`를 실행해 디렉터리 전체의 내용을 바꿉니다.

그 스위칭에는 비용이 따릅니다: 현재 브랜치의 진행 중인 작업은 먼저 커밋하거나 stash해야 하고, 두 브랜치가 같은 디렉터리를 공유하므로 두 브랜치를 동시에 볼 수 없습니다.

`git worktree`는 그 일대일 규칙을 깨뜨립니다. **worktree**는 같은 저장소에 연결된 추가 작업 디렉터리입니다:

```
your project/            <- main working tree (the original one)
├── .git/                <- shared: objects, refs, config
├── src/  (branch main)
└── ...
your project-hotfix/     <- second worktree (added by git worktree add)
└── src/  (branch hotfix)   <- different branch, different directory
```

모든 worktree는 **같은 object database와 refs를 공유**합니다 — 한 worktree에서 만든 커밋은 모든 worktree에서 보입니다 — 하지만 각 worktree는 **자체 HEAD와 index**를 가지므로 서로를 방해하지 않고 각자 다른 브랜치에 있을 수 있습니다.

## git worktree add: 두 번째 작업 트리

```bash
git worktree add <path> <branch>
```

`<path>`에 새 작업 디렉터리를 만들고 `<branch>`를 checkout합니다. 자주 쓰는 형태 몇 가지:

```bash
git worktree add ../hotfix hotfix         # check out existing branch hotfix
git worktree add -b fix-login ../login    # create branch fix-login and check it out
git worktree add --detach ../explore v1.2 # detached HEAD at a tag
```

유용한 세부 사항:

- 브랜치가 이미 존재하면 경로는 비어 있어야 합니다 — git은 파일이 있는 디렉터리를 덮어쓰지 않습니다.
- 브랜치는 **하나의 worktree에서만** checkout할 수 있습니다. 같은 브랜치를 두 번째 worktree에 checkout하면 `fatal: '<branch>' is already checked out at ...` 오류가 납니다.
- `git clone`을 하면 클론은 완전히 별도의 저장소입니다. worktree는 클론이 **아닙니다** — 자체 `.git` 디렉터리가 없고 부모 저장소의 `.git`을 가리킵니다.

## git worktree list: 모든 작업 트리 보기

```bash
git worktree list
```

저장소에 연결된 모든 worktree를 경로, checkout된 브랜치, 그리고 어느 것이 main worktree인지와 함께 보여줍니다:

```
/path/your-project        abc1234 [main]
/path/your-project-hotfix def5678 [hotfix]
```

main worktree는 저장소가 원래 clone되거나 생성된 디렉터리입니다 — 제거할 수 없습니다.

## git worktree remove: 정리

```bash
git worktree remove <path>
```

작업 디렉터리를 삭제하고 worktree 등록을 해제합니다. 두 가지 안전 장치:

- 디렉터리에 untracked 파일이나 수정된 파일이 있으면 안 됩니다 — 있으면 git이 거부하고 commit, stash 또는 `-f`를 쓰라고 안내합니다.
- `git worktree remove -f <path>`는 변경 사항이 있어도 삭제하며, 변경 사항은 버려집니다.

제거된 worktree는 브랜치(그리고 그 커밋)를 그대로 둡니다: 브랜치 포인터는 여전히 저장소에 남아 있고, 나중에 main worktree에서 다시 checkout할 수 있습니다.

## 에이전트가 작업 트리를 좋아하는 이유

AI 코딩 에이전트(Claude Code, Cursor 등)는 여러 작업을 동시에 진행하는 경우가 많습니다. worktree가 없으면 에이전트는 작업을 전환할 때마다 커밋하거나 stash하고, 브랜치를 바꾸고, 나중에 변경 사항을 다시 정리해야 합니다 — 실수하면 한 작업의 수정이 다른 브랜치의 커밋에 섞일 수도 있습니다.

`git worktree add`를 쓰면 각 작업은 **자체 디렉터리와 브랜치**를 가지며 완전히 분리됩니다:

- 작업 A의 에이전트는 브랜치 `feature/login`에서 `../task-a`를 편집합니다
- 작업 B의 에이전트는 브랜치 `fix/typo`에서 `../task-b`를 편집합니다
- 두 커밋 모두 같은 저장소에 들어가며, 어느 쪽도 상대의 파일을 건드릴 수 없습니다

결과를 검토할 때 각 브랜치는 깔끔한 단위입니다 — 그리고 푸시할 역사는 여전히 하나로 공유됩니다. 그 분리가 바로 worktree 기반 워크플로가 에이전트 주도 개발의 표준이 된 이유입니다.

## 작업 트리를 사용하는 경우

이런 경우에 사용하세요:

- 두 브랜치에서 동시에 작업해야 할 때(기능 작업이 계속되는 동안 핫픽스)
- 한 worktree에서 긴 테스트나 dev server를 돌리면서 다른 worktree에서 계속 편집할 때
- 에이전트나 팀 도구가 병렬로 분리된 작업을 실행할 때

이런 경우에는 건너뛰세요: 한 번에 하나의 작업만 하는 것이 일반적이라면 — 추가 디렉터리는 이득 없이 관리 부담만 늘립니다.

## 연습

<Exercise />

<LessonProgress />
