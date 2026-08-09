# 챕터 3 — 원격 협업

이 챕터의 원리 축: **두 개의 저장소와 추적 브랜치**. remote는 다른 저장소의 주소이며, clone이 그것을 복사하고, fetch가「원격의 미러」(origin/main)를 갱신하며, push가 로컬 커밋을 보내고, pull = fetch + merge입니다.

## 강의

- 3-1 [git remote 원격 저장소](/ko/stage/3/3-1-remote): remote가 무엇인지, 추가와 확인
- 3-2 [git clone 저장소 복제](/ko/stage/3/3-2-clone): 한 번에 복사 완료, origin과 추적 브랜치
- 3-3 [git push 커밋 푸시](/ko/stage/3/3-3-push): 로컬 커밋 전송, non-fast-forward 거부
- 3-4 [git fetch와 git pull](/ko/stage/3/3-4-fetch-pull): fetch는 보기만 하고 움직이지 않음, pull = fetch + merge

## 이 챕터의 새 명령

| 명령 | 역할 |
| --- | --- |
| `git remote add <name> <url>` | 원격 저장소 주소 등록 |
| `git remote -v` | 모든 remote의 이름과 주소 확인 |
| `git clone <url> [<dir>]` | 원격 저장소를 로컬에 완전히 복사 |
| `git push` | 현재 브랜치가 앞선 커밋을 원격으로 푸시 |
| `git fetch` | 원격의 새 커밋을 다운로드하고 추적 브랜치 갱신 |
| `git pull` | fetch + merge: 원격 갱신을 가져와 병합 |
| `git log origin/main` | 원격 브랜치가 가리키는 역사 확인 |
| `cd <dir>` | 연습장에서 디렉터리 전환(clone 후 새 저장소로 들어가기) |

<StageProgress stage="3" />
