# 챕터 4 — 수정과 심화

이 챕터의 원리 축: **refs와 reflog**. reset은 브랜치 포인터를 움직이고, revert/cherry-pick은 새 커밋을 만들고, rebase는 역사를 다시 쓰며 — reflog는 HEAD의 모든 이동을 기록해서 어떤「후회」든 되찾을 수 있게 합니다.

## 강의

- 4-1 [git stash와 git tag](/ko/stage/4/4-1-stash-tag): 변경사항 임시 보관, 버전 고정 표시
- 4-2 [git reset과 reflog](/ko/stage/4/4-2-reset-reflog): HEAD를 움직이는 세 가지 모드, reflog로 커밋 되찾기
- 4-3 [git revert와 git cherry-pick](/ko/stage/4/4-3-revert-cherry-pick): 역방향 취소와 커밋 복사
- 4-4 [git rebase로 커밋 재생](/ko/stage/4/4-4-rebase): 역사 선형화, 충돌과 중단
- 4-5 [git worktree](/ko/stage/4/4-5-worktree): 하나의 저장소에 여러 작업 트리

## 이 챕터의 새 명령

| 명령 | 역할 |
| --- | --- |
| `git stash` / `git stash list` / `git stash pop` | 커밋하지 않은 변경사항 임시로 치워 두기 |
| `git tag <name>` / `git tag -a <name> -m <msg>` | 커밋에 고정 표시 붙이기 |
| `git reset [--hard\|--soft] <ref>` | HEAD 이동(인덱스/작업 영역까지 가능) |
| `git reflog` | HEAD의 전체 이동 기록 보기 |
| `git revert <ref>` | 역방향 새 커밋으로 하나의 커밋 취소 |
| `git cherry-pick <ref>` | 어떤 커밋을 현재 브랜치로 복사 |
| `git rebase <branch>` / `--continue` / `--abort` | 브랜치 커밋을 대상 브랜치에 재생 |
| `git worktree add/list/remove` | 저장소에 여러 작업 디렉터리를 연결한다 |

<StageProgress stage="4" />
