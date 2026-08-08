# 단계 2 — 브랜치와 머지

이 단계의 원리 축: **커밋 그래프와 HEAD**. 브랜치는 commit을 가리키는 포인터일 뿐이며, HEAD가 현재 위치를 표시합니다. 모든 브랜치 작업(switch, merge, 충돌)은 커밋 그래프 위에서 포인터를 옮기거나, 갈라진 역사를 다시 합치는 일입니다.

## 강의

- 2-1 [git branch와 git switch](/ko/stage/2/2-1-branch-switch): 브랜치는 포인터, HEAD는 현재 위치
- 2-2 [브랜치에서 작업하기](/ko/stage/2/2-2-branch-workflow): 커밋은 현재 브랜치에만 쌓이고 역사는 DAG로 갈라진다
- 2-3 [git merge로 브랜치 병합](/ko/stage/2/2-3-merge): 패스트포워드 머지와 머지 커밋
- 2-4 [머지 충돌 해결하기](/ko/stage/2/2-4-merge-conflict): 충돌 마커와 해결 절차

## 이 단계의 새 명령

| 명령 | 역할 |
| --- | --- |
| `git branch` | 브랜치 목록 표시, 현재 브랜치는 `*` |
| `git branch <name>` | 브랜치 생성(전환은 하지 않음) |
| `git switch <name>` | 기존 브랜치로 전환 |
| `git switch -c <name>` | 생성과 동시에 새 브랜치로 전환 |
| `git merge <branch>` | 대상 브랜치를 현재 브랜치로 병합 |

<StageProgress stage="2" />
