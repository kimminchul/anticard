# Versioning Policy

`@freeive/anti-card` 의 버전 관리 정책. (한국어 / English below)

---

## 1. 두 층의 버저닝 (Hybrid)

| 레벨 | 방식 | 변경 시점 |
|---|---|---|
| **라이브러리 전체** | SemVer `MAJOR.MINOR.PATCH` (예: `0.10.0`) | 매 release 마다 |
| **각 컴포넌트** | `addedIn` + `updatedIn` 메타데이터만 | 컴포넌트 의미 있는 변경 시 `updatedIn` 갱신 |

> 컴포넌트마다 독립 SemVer 는 51개 × 자체 버전 → 관리 비용 폭증. **메타로만 표기**.

---

## 2. SemVer 적용 규칙 (라이브러리)

`0.x.y` 단계 (1.0.0 이전):

| 변경 | bump |
|---|---|
| 신규 컴포넌트 추가 / 새 의존성 / 기존 컴포넌트 호환 깨지는 변경 | **MINOR** (`0.x.0`) |
| 기존 컴포넌트 버그 수정 / 사소한 시각 조정 / 타이포 토큰 미세 조정 | **PATCH** (`0.x.y`) |
| 정식 출시 | **MAJOR** (`1.0.0`) |

`1.0.0` 이후 표준 SemVer:
- MAJOR: 호환 깨지는 변경 (Props 제거, Component 제거, default 변경 등)
- MINOR: 호환되는 신기능 추가
- PATCH: 호환되는 버그 수정

---

## 3. 변경 이력 기록 — 3-tier

| Tier | 위치 | 형식 | 누가 봄 |
|---|---|---|---|
| 1 | **Playground UI** | 컴포넌트 페이지 상단 `v0.x.x` Pill | 시각 미리보기 디자이너/개발자 |
| 2 | **CHANGELOG.md** | [Keep a Changelog](https://keepachangelog.com/) 형식, 루트 위치 | 코드 보는 OSS 사용자 |
| 3 | **GitHub Releases** | tag (`v0.x.x`) + Release notes (CHANGELOG 섹션 복사) | npm 사용자, dependabot, RSS 구독자 |

---

## 4. Git Workflow

### 일상 작업 (develop 브랜치)

- 모든 변경사항은 `[Unreleased]` 섹션에 누적
- 컴포넌트 추가/수정 시 즉시 CHANGELOG 항목 작성
- `package.json` version 은 미리 bump 가능 (release 직전 fix)

### Release (develop → main)

```bash
# 1) CHANGELOG 마무리
#    [Unreleased] → [0.x.x] — YYYY-MM-DD 로 변환
#    package.json version 최종 확인

# 2) Release commit
git add CHANGELOG.md package.json
git commit -m "release: 0.x.x"

# 3) Tag (annotated 권장)
git tag -a v0.x.x -m "Release 0.x.x — <한 줄 요약>"

# 4) develop → main merge
git checkout main
git merge --ff-only develop  # 또는 --no-ff (보존 commit)
git push origin main
git push origin v0.x.x       # 또는 git push --follow-tags

# 5) GitHub Release 생성
#    UI 또는 CLI:
gh release create v0.x.x --title "0.x.x — <한 줄 요약>" \
  --notes-file <(awk '/^## \[0\.x\.x\]/,/^## \[/' CHANGELOG.md | sed '$d')
```

### Hotfix (main 직접 패치)

긴급 수정만:
```bash
git checkout -b hotfix/0.x.y main
# fix
git tag v0.x.y && git push --follow-tags
# main → develop back-merge
```

---

## 5. 컴포넌트 메타 (`addedIn` / `updatedIn`)

`playground/App.tsx` 의 `COMPONENT_VERSIONS` 맵에서 단일 관리:

```ts
const COMPONENT_VERSIONS: Record<string, { addedIn: string; updatedIn?: string }> = {
  eyebrow: { addedIn: "0.0.1" },
  "link-row": { addedIn: "0.1.0", updatedIn: "0.10.0" },
  // ...
};
```

**규칙**:
- `addedIn` — 첫 출현 release 버전. 절대 변경 X.
- `updatedIn` — 의미 있는 변경의 마지막 버전. **없으면 `addedIn` 과 동일로 간주**.
- 변경 기준: Props 추가/제거, default 변경, 시각 톤 변경(border 두께, 패딩, 색 톤). 단순 코드 리팩터는 X.

Playground 컴포넌트 페이지 상단에 Pill 로 `v0.x.x` 표기 — 클릭 시 GitHub CHANGELOG 해당 섹션으로 이동.

---

## 6. Playground 자체 버저닝

Playground (`kimminchul.github.io/anticard`) 는 **GitHub Pages 자동 배포** — 별도 버전 X. main 브랜치 push 마다 자동 갱신. 시각 미리보기 도구이므로 npm package version 과 분리됨.

`README.md` Branch Policy:
- `main` — 안정 (auto-deploy)
- `develop` — 작업 (수동 미리보기 vite dev)

---

## 7. npm publish 정책

| 단계 | Release 채널 | 비고 |
|---|---|---|
| `0.x.x` (현재) | **GitHub-only** — git tag + GitHub Release | npm 미공개. dogfooding(`freeive.com`)으로 안정화. |
| `1.0.0` 이후 | **npm publish** — git tag + GitHub Release + `npm publish --access public` | API 동결, peer/dep 정리, Tailwind config 가이드, AI Skill install 명령 정식화 후. |

**1.0.0 이전 publish 안 하는 이유**:
- README 자기 선언과 일치 ("1.0.0에서 API 동결, npm publish 예정")
- 외부 사용자 검증 없이 publish하면 첫 install 마찰이 신뢰를 깎음
- `prism-react-renderer` (playground 전용) 가 dep에 잘못 있음 — publish 전 정리 필요
- `tailwindcss` peerDependencies 미명시 — publish 전 추가 필요

**0.x.x 사용자**: GitHub repo clone 또는 `npm pack` tarball 직접 install. 이미 `freeive.com`에서 이 방식으로 dogfooding 중.

---

# English

## 1. Hybrid Versioning

| Level | Approach | When |
|---|---|---|
| **Library** | SemVer `MAJOR.MINOR.PATCH` | Every release |
| **Component** | `addedIn` + `updatedIn` metadata only | When component changes meaningfully |

Per-component SemVer (51 × independent versions) explodes management cost. Metadata only.

## 2. SemVer (Pre-1.0)

| Change | Bump |
|---|---|
| New component / new dep / breaking changes | **MINOR** (`0.x.0`) |
| Bug fix / minor visual tweak | **PATCH** (`0.x.y`) |
| Stable release | **MAJOR** (`1.0.0`) |

## 3. Change History — 3-tier

1. **Playground UI** — version Pill on each component page
2. **CHANGELOG.md** — root, Keep a Changelog format
3. **GitHub Releases** — git tag + release notes

## 4. Git Workflow

```bash
# Release (develop → main)
git add CHANGELOG.md package.json
git commit -m "release: 0.x.x"
git tag -a v0.x.x -m "Release 0.x.x"
git checkout main
git merge --ff-only develop
git push --follow-tags
gh release create v0.x.x --notes-file <changelog-section>
```

## 5. Component metadata

Single-source-of-truth in `playground/App.tsx` `COMPONENT_VERSIONS` map. `addedIn` is immutable. `updatedIn` reflects last meaningful change.

## 6. Playground

Auto-deployed via GitHub Pages on `main` push. No separate version.
