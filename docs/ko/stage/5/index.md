# 챕터 5 — GitHub 생태계

이 챕터의 원리 축: **GitHub를 중심으로 한 협업 루프**. fork가 내 사본을 만들고 upstream이 원작자를 이어 줍니다. PR은 커밋이 main으로 들어가는 문이고, issue가 토론을 담당하며, release가 버전을 출시하고, Actions와 Pages가 테스트와 배포를 자동화합니다. 이 챕터는 실제 GitHub에서 연습합니다 — 모든 개념에 직접 해보기 과제가 붙습니다.

## 실천 체크리스트

실제 GitHub에서 아래의 전체 과정을 완료하고, 체크해서 진행 상황을 기록하세요:

<Checklist :tasks="[
  { text: '자주 쓰는 오픈소스 저장소를 fork하세요', link: '/ko/stage/5/5-1-fork-upstream' },
  { text: '내 fork를 clone하고 upstream을 추가한 뒤 한 번 동기화하세요', link: '/ko/stage/5/5-1-fork-upstream' },
  { text: '기능 브랜치를 push하고 실제 PR을 여세요', link: '/ko/stage/5/5-2-pull-request' },
  { text: 'PR에서 review 토론을 한 번 경험하세요', link: '/ko/stage/5/5-2-pull-request' },
  { text: 'issue를 열고 label과 milestone을 만드세요', link: '/ko/stage/5/5-3-issues' },
  { text: 'issue와 연결된 PR을 올리세요(fixes #번호)', link: '/ko/stage/5/5-3-issues' },
  { text: 'v0.1.0 태그를 붙이고 첫 번째 Release를 만드세요', link: '/ko/stage/5/5-4-releases' },
  { text: '패치 버전을 출시하고 세 부분으로 된 설명을 쓰세요', link: '/ko/stage/5/5-4-releases' },
  { text: '정적 페이지를 Pages에 배포하는 workflow를 작성하세요', link: '/ko/stage/5/5-5-actions-pages' },
  { text: '일부러 빌드 단계를 틀리게 작성해 Actions 실패 로그를 확인하세요', link: '/ko/stage/5/5-5-actions-pages' }
]" />

## 강의

- 5-1 [fork와 upstream 동기화](/ko/stage/5/5-1-fork-upstream): fork로 사본을 만들고 upstream으로 상위 업데이트 받기
- 5-2 [Pull Request 워크플로](/ko/stage/5/5-2-pull-request): PR 열기, review 토론, 세 가지 병합 방식
- 5-3 [Issues와 협업](/ko/stage/5/5-3-issues): issue 토론, label과 milestone, PR로 issue 자동 닫기
- 5-4 [Releases와 버전 출시](/ko/stage/5/5-4-releases): 의미론적 버전, tag push, Release 출시
- 5-5 [GitHub Actions와 Pages](/ko/stage/5/5-5-actions-pages): workflow 자동화, Pages 배포

## 이 챕터의 핵심 기능

| 기능 | 역할 |
| --- | --- |
| fork | GitHub에서 저장소를 내 계정으로 복사 |
| pull request | 브랜치 커밋을 대상 저장소에 병합 요청 |
| issue | bug, 기능, 작업의 토론과 추적 |
| milestone | issue 무리를 하나의 버전 목표로 묶기 |
| release | tag 기반 정식 출시(설명과 첨부 포함) |
| GitHub Actions | 이벤트 기반 CI/CD 자동화 |
| GitHub Pages | 무료 정적 사이트 호스팅(이 프로젝트가 바로 그것) |

<StageProgress stage="5" />
