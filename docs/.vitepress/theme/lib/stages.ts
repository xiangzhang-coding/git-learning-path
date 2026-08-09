export const LANGS = ['zh', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru'] as const

export type LocaleKey = 'root' | (typeof LANGS)[number]

export const LOCALE_KEYS: LocaleKey[] = ['root', ...LANGS]
const stage0Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '0-1-version-control', title: '0-1 Why version control?' },
    { slug: '0-2-three-areas', title: '0-2 The three-areas model' },
    { slug: '0-3-config-help', title: '0-3 config and help' }
  ],
  zh: [
    { slug: '0-1-version-control', title: '0-1 为什么需要版本控制' },
    { slug: '0-2-three-areas', title: '0-2 三个区域模型' },
    { slug: '0-3-config-help', title: '0-3 config 与 help' }
  ],
  ja: [
    { slug: '0-1-version-control', title: '0-1 なぜバージョン管理が必要か' },
    { slug: '0-2-three-areas', title: '0-2 3つのエリアモデル' },
    { slug: '0-3-config-help', title: '0-3 config と help' }
  ],
  ko: [
    { slug: '0-1-version-control', title: '0-1 왜 버전 관리가 필요한가' },
    { slug: '0-2-three-areas', title: '0-2 3영역 모델' },
    { slug: '0-3-config-help', title: '0-3 config와 help' }
  ],
  de: [
    { slug: '0-1-version-control', title: '0-1 Warum Versionskontrolle?' },
    { slug: '0-2-three-areas', title: '0-2 Das Drei-Bereiche-Modell' },
    { slug: '0-3-config-help', title: '0-3 config und help' }
  ],
  fr: [
    { slug: '0-1-version-control', title: '0-1 Pourquoi le contrôle de version ?' },
    { slug: '0-2-three-areas', title: '0-2 Le modèle des trois zones' },
    { slug: '0-3-config-help', title: '0-3 config et help' }
  ],
  es: [
    { slug: '0-1-version-control', title: '0-1 ¿Por qué el control de versiones?' },
    { slug: '0-2-three-areas', title: '0-2 El modelo de tres áreas' },
    { slug: '0-3-config-help', title: '0-3 config y help' }
  ],
  pt: [
    { slug: '0-1-version-control', title: '0-1 Por que controle de versão?' },
    { slug: '0-2-three-areas', title: '0-2 O modelo de três áreas' },
    { slug: '0-3-config-help', title: '0-3 config e help' }
  ],
  ru: [
    { slug: '0-1-version-control', title: '0-1 Зачем нужен контроль версий?' },
    { slug: '0-2-three-areas', title: '0-2 Модель трёх областей' },
    { slug: '0-3-config-help', title: '0-3 config и help' }
  ]
}
const stage1Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '1-1-init-status', title: '1-1 git init and git status' },
    { slug: '1-2-add-commit', title: '1-2 git add and git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log and git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm and git mv' }
  ],
  zh: [
    { slug: '1-1-init-status', title: '1-1 git init 与 git status' },
    { slug: '1-2-add-commit', title: '1-2 git add 与 git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log 与 git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore、git rm 与 git mv' }
  ],
  ja: [
    { slug: '1-1-init-status', title: '1-1 git init と git status' },
    { slug: '1-2-add-commit', title: '1-2 git add と git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log と git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore、git rm と git mv' }
  ],
  ko: [
    { slug: '1-1-init-status', title: '1-1 git init와 git status' },
    { slug: '1-2-add-commit', title: '1-2 git add와 git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log와 git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm와 git mv' }
  ],
  de: [
    { slug: '1-1-init-status', title: '1-1 git init und git status' },
    { slug: '1-2-add-commit', title: '1-2 git add und git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log und git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm und git mv' }
  ],
  fr: [
    { slug: '1-1-init-status', title: '1-1 git init et git status' },
    { slug: '1-2-add-commit', title: '1-2 git add et git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log et git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm et git mv' }
  ],
  es: [
    { slug: '1-1-init-status', title: '1-1 git init y git status' },
    { slug: '1-2-add-commit', title: '1-2 git add y git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log y git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm y git mv' }
  ],
  pt: [
    { slug: '1-1-init-status', title: '1-1 git init e git status' },
    { slug: '1-2-add-commit', title: '1-2 git add e git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log e git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm e git mv' }
  ],
  ru: [
    { slug: '1-1-init-status', title: '1-1 git init и git status' },
    { slug: '1-2-add-commit', title: '1-2 git add и git commit' },
    { slug: '1-3-log-diff', title: '1-3 git log и git diff' },
    { slug: '1-4-restore-rm-mv', title: '1-4 git restore, git rm и git mv' }
  ]
}
const stage2Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '2-1-branch-switch', title: '2-1 git branch and git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Working on branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolving merge conflicts' }
  ],
  zh: [
    { slug: '2-1-branch-switch', title: '2-1 git branch 与 git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 在分支上工作' },
    { slug: '2-3-merge', title: '2-3 git merge 合并分支' },
    { slug: '2-4-merge-conflict', title: '2-4 解决合并冲突' }
  ],
  ja: [
    { slug: '2-1-branch-switch', title: '2-1 git branch と git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 ブランチ上での作業' },
    { slug: '2-3-merge', title: '2-3 git merge によるマージ' },
    { slug: '2-4-merge-conflict', title: '2-4 マージコンフリクトの解決' }
  ],
  ko: [
    { slug: '2-1-branch-switch', title: '2-1 git branch와 git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 브랜치에서 작업하기' },
    { slug: '2-3-merge', title: '2-3 git merge 병합' },
    { slug: '2-4-merge-conflict', title: '2-4 병합 충돌 해결하기' }
  ],
  de: [
    { slug: '2-1-branch-switch', title: '2-1 git branch und git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Arbeiten auf Branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Merge-Konflikte lösen' }
  ],
  fr: [
    { slug: '2-1-branch-switch', title: '2-1 git branch et git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Travailler sur des branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Résoudre les conflits de fusion' }
  ],
  es: [
    { slug: '2-1-branch-switch', title: '2-1 git branch y git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Trabajar en ramas' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolver conflictos de fusión' }
  ],
  pt: [
    { slug: '2-1-branch-switch', title: '2-1 git branch e git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Trabalhando em branches' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Resolvendo conflitos de merge' }
  ],
  ru: [
    { slug: '2-1-branch-switch', title: '2-1 git branch и git switch' },
    { slug: '2-2-branch-workflow', title: '2-2 Работа в ветках' },
    { slug: '2-3-merge', title: '2-3 git merge' },
    { slug: '2-4-merge-conflict', title: '2-4 Разрешение конфликтов слияния' }
  ]
}
const stage3Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch and git pull' }
  ],
  zh: [
    { slug: '3-1-remote', title: '3-1 git remote 远程仓库' },
    { slug: '3-2-clone', title: '3-2 git clone 克隆仓库' },
    { slug: '3-3-push', title: '3-3 git push 推送提交' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch 与 git pull' }
  ],
  ja: [
    { slug: '3-1-remote', title: '3-1 git remote リモート' },
    { slug: '3-2-clone', title: '3-2 git clone でクローン' },
    { slug: '3-3-push', title: '3-3 git push でプッシュ' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch と git pull' }
  ],
  ko: [
    { slug: '3-1-remote', title: '3-1 git remote 원격 저장소' },
    { slug: '3-2-clone', title: '3-2 git clone 복제' },
    { slug: '3-3-push', title: '3-3 git push 푸시' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch와 git pull' }
  ],
  de: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch und git pull' }
  ],
  fr: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch et git pull' }
  ],
  es: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch y git pull' }
  ],
  pt: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch e git pull' }
  ],
  ru: [
    { slug: '3-1-remote', title: '3-1 git remote' },
    { slug: '3-2-clone', title: '3-2 git clone' },
    { slug: '3-3-push', title: '3-3 git push' },
    { slug: '3-4-fetch-pull', title: '3-4 git fetch и git pull' }
  ]
}
const stage4Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '4-1-stash-tag', title: '4-1 git stash and git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset and git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert and git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  zh: [
    { slug: '4-1-stash-tag', title: '4-1 git stash 与 git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset 与 reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert 与 git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase 重放提交' },
    { slug: '4-5-worktree', title: '4-5 git worktree 多工作树' },
  ],
  ja: [
    { slug: '4-1-stash-tag', title: '4-1 git stash と git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset と git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert と git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  ko: [
    { slug: '4-1-stash-tag', title: '4-1 git stash와 git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset과 git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert와 git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  de: [
    { slug: '4-1-stash-tag', title: '4-1 git stash und git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset und git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert und git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  fr: [
    { slug: '4-1-stash-tag', title: '4-1 git stash et git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset et git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert et git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  es: [
    { slug: '4-1-stash-tag', title: '4-1 git stash y git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset y git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert y git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  pt: [
    { slug: '4-1-stash-tag', title: '4-1 git stash e git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset e git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert e git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ],
  ru: [
    { slug: '4-1-stash-tag', title: '4-1 git stash и git tag' },
    { slug: '4-2-reset-reflog', title: '4-2 git reset и git reflog' },
    { slug: '4-3-revert-cherry-pick', title: '4-3 git revert и git cherry-pick' },
    { slug: '4-4-rebase', title: '4-4 git rebase' },
    { slug: '4-5-worktree', title: '4-5 git worktree' },
  ]
}
const stage5Lessons: Record<LocaleKey, { slug: string; title: string }[]> = {
  root: [
    { slug: '5-1-fork-upstream', title: '5-1 fork and upstream sync' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request workflow' },
    { slug: '5-3-issues', title: '5-3 Issues and collaboration' },
    { slug: '5-4-releases', title: '5-4 Releases and versioning' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions and Pages' }
  ],
  zh: [
    { slug: '5-1-fork-upstream', title: '5-1 fork 与 upstream 同步' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request 工作流' },
    { slug: '5-3-issues', title: '5-3 Issues 与协作' },
    { slug: '5-4-releases', title: '5-4 Releases 与版本发布' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions 与 Pages' }
  ],
  ja: [
    { slug: '5-1-fork-upstream', title: '5-1 fork と upstream の同期' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request の流れ' },
    { slug: '5-3-issues', title: '5-3 Issues と協働' },
    { slug: '5-4-releases', title: '5-4 Releases とバージョン公開' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions と Pages' }
  ],
  ko: [
    { slug: '5-1-fork-upstream', title: '5-1 fork와 upstream 동기화' },
    { slug: '5-2-pull-request', title: '5-2 Pull Request 워크플로' },
    { slug: '5-3-issues', title: '5-3 Issues와 협업' },
    { slug: '5-4-releases', title: '5-4 Releases와 버전 출시' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions와 Pages' }
  ],
  de: [
    { slug: '5-1-fork-upstream', title: '5-1 fork und upstream synchronisieren' },
    { slug: '5-2-pull-request', title: '5-2 Pull-Request-Workflow' },
    { slug: '5-3-issues', title: '5-3 Issues und Zusammenarbeit' },
    { slug: '5-4-releases', title: '5-4 Releases und Versionierung' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions und Pages' }
  ],
  fr: [
    { slug: '5-1-fork-upstream', title: '5-1 fork et synchronisation upstream' },
    { slug: '5-2-pull-request', title: '5-2 Flux de travail Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues et collaboration' },
    { slug: '5-4-releases', title: '5-4 Releases et versions' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions et Pages' }
  ],
  es: [
    { slug: '5-1-fork-upstream', title: '5-1 fork y sincronización con upstream' },
    { slug: '5-2-pull-request', title: '5-2 Flujo de trabajo de Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues y colaboración' },
    { slug: '5-4-releases', title: '5-4 Releases y versionado' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions y Pages' }
  ],
  pt: [
    { slug: '5-1-fork-upstream', title: '5-1 fork e sincronização com upstream' },
    { slug: '5-2-pull-request', title: '5-2 Fluxo de trabalho de Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues e colaboração' },
    { slug: '5-4-releases', title: '5-4 Releases e versionamento' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions e Pages' }
  ],
  ru: [
    { slug: '5-1-fork-upstream', title: '5-1 fork и синхронизация с upstream' },
    { slug: '5-2-pull-request', title: '5-2 Рабочий процесс Pull Request' },
    { slug: '5-3-issues', title: '5-3 Issues и совместная работа' },
    { slug: '5-4-releases', title: '5-4 Releases и выпуск версий' },
    { slug: '5-5-actions-pages', title: '5-5 GitHub Actions и Pages' }
  ]
}
export const stageLessons: Record<number, Record<LocaleKey, { slug: string; title: string }[]>> = {
  0: stage0Lessons,
  1: stage1Lessons,
  2: stage2Lessons,
  3: stage3Lessons,
  4: stage4Lessons,
  5: stage5Lessons
}
