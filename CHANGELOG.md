# Changelog

이 패키지의 모든 의미 있는 변경사항을 여기에 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/), 버저닝은 [SemVer](https://semver.org/).

## [Unreleased]

### Added
- `docs/VERSIONING.md` — Hybrid 버전 정책 (라이브러리 SemVer + 컴포넌트 `addedIn`/`updatedIn` 메타)
- Playground 컴포넌트 페이지에 **버전 메타 Pill** — `added v0.x.x` (zinc) + `updated v0.y.y` (emerald accent, 변경 있을 때만). 클릭 시 GitHub CHANGELOG 이동.
- Playground `COMPONENT_VERSIONS` 단일 진실 원천 맵 (addedIn 백필)
- Playground 사이드바 카테고리 collapse + 검색 dropdown (Header) + 리소스 그룹 (타이포 토큰 / 아이콘)
- Playground 컴포넌트 헤더 뱃지 → `<Pill>` 컴포넌트 사용 (dogfooding)
- **Button** 컴포넌트 변형 확장:
  - `variant`: `primary` | `secondary` | `ghost` (NEW) | `plain` (NEW) — 박스 강도 순
  - `iconOnly`: 정사각형 패딩 모드 (툴바·작은 액션)
  - `secondary` + `tone="accent"` (emerald 헤어라인)
  - 4 variants × default/accent tone × small/default/large size × icon options
- Playground Button 페이지 4종 (primary/secondary/ghost/plain) — 각 페이지마다 icon 예시

### Changed
- Playground 헤더 VERSION 표기: 0.0.3 → **0.10.0** (실제 버전 동기화)
- 용어 통일: "framework" / "프레임워크" → "library" / "라이브러리" (CHANGELOG 과거 기록 제외)
- Specific count 제거: "51 컴포넌트" / "12 타이포 토큰" / 카테고리별 (7)(6) 등 일반 표현으로
- Icons 페이지 테이블 셀 layout — icons column 텍스트 오버랩 fix (세로 stack)

### Notes
- `0.x.x`는 GitHub-only release (git tag + GitHub Release). npm publish는 `1.0.0`부터 — 정책 docs/VERSIONING.md §7.
- 첫 git tag `v0.10.0` 생성됨 (annotated, commit `aab23ef`).
- 이 [Unreleased] 항목들은 `0.11.0` release 시점에 [0.11.0] 섹션으로 변환 예정.

## [0.10.0] — 2026-05-08

### Added
- **lucide-react** dependency (devDep → dep, ISC License). 안티 카드 헤어라인 정체성과 1px stroke 시각 일치.
- `LinkRow` 화살표 — 텍스트(→) → `<ArrowRight>` (내부 링크) / `<ArrowUpRight>` (external)
  - external prop 시 자동 ArrowUpRight 표시 (hover 시 우/상 translate)
  - size에 따라 h-4/h-5 자동
- `FAQ` 토글 아이콘 — 텍스트(+) → `<Plus>` (group-open 시 45도 회전 → ×)
- `Pill` external 자동 표시 — `external=true` 시 자동 `<ArrowUpRight>` (h-3 w-3 opacity-60)

### Changed
- 사용자 dep 1개 추가 (lucide-react ~24 KB gzipped, tree-shake로 사용 아이콘만 번들)
- minor 버전 (semver: 새 의존성 추가는 minor)

### Notes
- README Acknowledgements에 lucide(ISC) / prism(MIT) / Tailwind(MIT) 명시
- 다른 아이콘 라이브러리 사용도 자유 — anti-card 컴포넌트의 `icon` prop은 모두 ReactNode

## [0.9.1] — 2026-05-08

### Changed
- `typography.display` (HeroHeading default) — clamp(1.875rem,4vw,3rem) 30~48px → clamp(1.625rem,3vw,2.5rem) **26~40px**
- 일반 페이지(Lab/Heritage/Blog)의 hero가 차분하게 다운. 메인 hero(`displayLg`)는 그대로 40~64px 유지.

## [0.9.0] — 2026-05-08

### Added
- **GridSystem + GridCol** — 12 column grid system (Bootstrap·Material 표준 톤):
  - `GridSystem` — columns(6/8/12/16/24) × gap × as
  - `GridCol` — span(1~12) × start(offset) × as(div/section/article/aside)
- `Grid` examples 1개 → **4개 확장**:
  - 3 cols default / 2 cols loose (Problem-Solution) / 4 cols tight (logos) / mobileColumns=2 (StatList 패턴)
- docs/grid-system.mdx 신규 + docs/grid.mdx에 GridSystem 참조 추가

### Fixed
- **Select** 옵션 다크 모드 가독성 — bg-transparent → bg-white / dark:bg-zinc-950 명시 (native option dropdown 상속)
- **Checkbox / Radio** 체크 표시 안 나옴 — 깨진 SVG data URL 제거 → `accent-color` CSS로 단순화 (native ✓ 사용)
- **Testimonial** size="large" 22~32px → 18~22px (헤딩급 → 본문 강조 톤)

### Changed
- Grid description 갱신 — "단순 grid wrapper" → "균등 grid wrapper (1~6), 자유 layout은 GridSystem"
- 누적: **51개 컴포넌트** (49 + GridSystem + GridCol)

## [0.8.0] — 2026-05-08

### Added
- **P6 + P7 마일스톤** — 폼 + 그리드 + 갤러리 컴포넌트 6개 (P6 5개 + P7 1개 통합 release):
  - `Grid` — 단순 grid wrapper (1~6 columns × tight/default/loose × as)
  - `Input` — 텍스트 입력 (label/hint/error, forwardRef, react-hook-form 호환)
  - `Textarea` — 여러 줄 입력 (rows × resize-y, Input 동일 톤)
  - `Select` — native select + 커스텀 SVG 화살표 (커스텀 dropdown 거부)
  - `Checkbox` + `Radio` — native input + label + description (checked emerald)
  - `Gallery` — 이미지 그리드 (2/3/4 columns × ratio × lazy loading)
- 각 컴포넌트 docs 6개

### Notes
- 0.6.0 → 0.8.0 (P6 + P7 통합 release, P7은 Gallery 1개라 별도 마일스톤 분리 X)
- 폼 컴포넌트는 anti-card 정체성과 균형 — 박스를 완전히 거부하기 어렵지만 둥근 모서리 최소(rounded-md), shadow X, focus emerald 헤어라인
- native select / checkbox / radio 사용 — 커스텀 dropdown 거부, 접근성·모바일 OS·키보드 자동 지원
- **누적: 49개 컴포넌트** (3 + P0 8 + P1 8 + P2 8 + P3 4 + P4 5 + P5 6 + P6+P7 6 + Checkbox/Radio 분리 = 49)
- Carousel만 `planned` 상태 유지 (장기 검토)
- **모든 P0~P7 컴포넌트 완료** — 다음 단계는 AI Skill catalog 작업 (Layer 1)

## [0.6.0] — 2026-05-08

### Added
- **P5 마일스톤** — 콘텐츠 블록 + 비교 컴포넌트 6개:
  - `Callout` — 본문 안 인라인 강조 (info/accent/warning/danger × title × icon)
  - `FAQ` — 자주 묻는 질문 (native details/summary, JS-free)
  - `PricingTable` — 가격 plan 비교 (1px gap grid, highlighted plan)
  - `PricingPattern` — 가격 페이지 통째로 (Hero+Table+FAQ+CTA)
  - `Steps` — 프로세스 단계 (vertical/horizontal × 자동 번호)
  - `CompareTable` — 기능 비교 (boolean ✓/− 자동, highlighted 컬럼)
- 각 컴포넌트 docs 6개
- playground 6 ComponentDef + NAV status ready

### Notes
- 0.6.0 = 가격 페이지 + FAQ + 비교 영역 한 번에 만들 수 있는 set
- FAQ는 native `<details>` 시맨틱 — JS 없이 동작 + 접근성 우수
- 누적: 42개 컴포넌트 (3 + P0 8 + P1 8 + P2 8 + P3 4 + P4 5 + P5 6)
- 다음 마일스톤(0.7.0) = P6 폼 + 그리드 (Grid/Input/Textarea/Select/CheckboxRadio)

## [0.5.0] — 2026-05-08

### Added
- **P4 마일스톤** — 인터랙션 컴포넌트 5개:
  - `WaveCard` — 물결 차오르는 진척도 (variant=frame/card, freeive 기존 자산 이식)
  - `FadeIn` — 스크롤 in-view 등장 (Intersection Observer + transition, motion-reduce 자동)
  - `HoverAccent` — hover 강조 wrapper (color/underline/translate/all × accent/mute)
  - `ScrollProgress` — fixed 1~3px 진행 막대 (top/bottom × accent/mute, target 옵션)
  - `Marquee` — CSS-only 무한 흐름 (left/right × duration × pauseOnHover × divider)
- 각 컴포넌트 docs 5개
- playground 5 ComponentDef + NAV status ready

### Notes
- 0.5.0 = 사이트에 동적 시그널 추가 (Lab 페이지·진행 중 영역에 시너지)
- `FadeIn` / `ScrollProgress`는 `"use client"` 컴포넌트 — Next.js App Router 서버 페이지에서도 자유롭게 사용
- 누적: 36개 컴포넌트 (3 + P0 8 + P1 8 + P2 8 + P3 4 + P4 5)
- 다음 마일스톤(0.6.0) = P5 콘텐츠 블록 + 비교 6개 (Callout / FAQ / PricingTable / PricingPattern / Steps / CompareTable)

## [0.4.0] — 2026-05-08

### Added
- **P3 마일스톤** — 신뢰·증거 컴포넌트 4개:
  - `ClientLogos` — 클라이언트 로고 띠 (grid/row × eyebrow, 로고 없으면 텍스트)
  - `Testimonial` — 사용자 후기 (Quote 확장, author avatar/title/company)
  - `StatBlock` — 단일 강조 통계 (default/xl × trend up/down/flat)
  - `CaseStudy` — Problem/Solution/Outcome 3단 구조 + 메타 (Solution emerald 강조)
- 각 컴포넌트 docs/*.mdx 4개
- playground 4 ComponentDef + NAV status ready

### Notes
- 0.4.0 = Heritage 페이지를 안티 카드 톤으로 완성하는 데 필요한 부품 set
- Solution emerald 강조 — Problem(zinc) vs Solution(emerald) 시각 위계로 1인 랩 차별점 표시
- 누적: 31개 컴포넌트 (3 + P0 8 + P1 8 + P2 8 + P3 4)
- 다음 마일스톤(0.5.0) = P4 인터랙션 (Wave Card / Fade-in / Hover Accent / Scroll Progress / Marquee)

## [0.3.0] — 2026-05-08

### Added
- **P2 마일스톤** — 페이지 패턴 + 액션 컴포넌트 8개 (NAV에선 9 항목 — Button variant=primary/secondary):
  - `HeroPattern` — Eyebrow + HeroHeading + Lead + LinkRow×N 조합 (size hero/page)
  - `SectorsPattern` — Heritage 섹터별 프로젝트 리스트 페이지 패턴
  - `TalkPattern` — Talk·Contact 페이지 (Hero + 받음/안받음 체크리스트 + 채널)
  - `EmptyState` — 404·빈 상태·error (큰 code + 메시지 + LinkRow)
  - `CTASection` — 페이지 하단 CTA (헤어라인 + h2 + Lead + LinkRow)
  - `Banner` — 작은 알림 띠 (info/accent/warning/danger × dismissible)
  - `Button` — 진짜 button 액션 (primary/secondary × small/default/large × default/accent)
  - `FeatureRow` — 특징 나열 행 (label / numbered layout)
- 각 컴포넌트 docs (button.mdx는 primary/secondary 통합)
- playground 9개 ComponentDef + NAV status ready

### Notes
- 0.3.0 = 페이지 1개를 통째로 만들 수 있는 단위 (Hero·Sectors·Talk·Empty 패턴)
- Button은 진짜 form/dialog 전용 — 일반 페이지 CTA는 LinkRow 권장
- 누적: 27개 컴포넌트 (3 + P0 8 + P1 8 + P2 8)
- 다음 마일스톤(0.4.0) = P3 신뢰·증거 (Client Logos / Testimonial / Stat Block / Case Study)

## [0.2.0] — 2026-05-08

### Added
- **P1 마일스톤** — 블로그/콘텐츠 톤 컴포넌트 8개:
  - `Quote` — 본문 인용 (좌측 헤어라인 + lead/leadLarge)
  - `Highlight` — 한 줄 강조 (default/accent × default/large, 형광펜 거부)
  - `Image` — figure + caption (16/9/4:3/3:2/1:1/native ratio)
  - `Video` — figure + caption + controls
  - `DefList` — dl/dt/dd 정의 리스트 (row/stack layout)
  - `StatList` — Heritage 카운터 패턴 (10+/30+/150+ 톤)
  - `Timeline` — ol 시간 순 행 (when 120px / title + description)
  - `Pill` — 태그/필터 칩 (default/accent/muted × active × span/a)
- 각 컴포넌트 `docs/{name}.mdx` 8개
- playground 8개 ComponentDef + NAV status ready

### Notes
- 0.2.0 = 블로그 글 1편을 anti-card 톤으로 완성하는 데 필요한 부품 set
- 다음 마일스톤(0.3.0) = P2 페이지 패턴 + 액션 (Hero/CTA/Button 등 9개)
- 누적: 19개 컴포넌트 (Eyebrow/SectionFrame/ListRow + P0 8 + P1 8)

## [0.1.1] — 2026-05-07

### Added
- `typography.displayLg` 토큰 — 사이트 메인 hero 전용 (40~64px, clamp(2.5rem, 5vw, 4rem))
- `HeroHeading` 컴포넌트에 `size` prop (`"page"` default / `"hero"`)
  - `size="hero"`: displayLg 토큰, 사이트당 1번 (메인 페이지)
  - `size="page"`: display 토큰, 일반 페이지 타이틀 (Lab/Heritage/Blog)

### Why
freeive dogfooding 결과 — 메인 hero와 일반 페이지 타이틀의 위계 구분 필요. 모두 동일한 display(30~48px)는 사이트 위계가 평탄해 보임.

## [0.1.0] — 2026-05-07

### Added
- **P0 마일스톤** — freeive 사이트 골격 컴포넌트 8개 추가:
  - `Container` — 페이지 본문 너비 통일 (narrow/default/wide/full)
  - `Hairline` — 박스 거부 영역 분리 (spacing × tone)
  - `HeroHeading` — 페이지 첫 화면 큰 제목 (clamp 자동 스케일)
  - `SectionHeading` — 섹션 제목 (h2/h3)
  - `Lead` — 헤딩 직후 인트로 본문 (default/large × narrow/default/wide)
  - `LinkRow` — 박스 거부형 CTA 링크 (default/accent × external)
  - `Header` — 사이트 헤더 (brand + links + cta)
  - `Footer` — 사이트 푸터 (brand + columns + copyright)
- 각 컴포넌트 docs/{name}.mdx 추가 (총 11개 컴포넌트 문서 완성)
- playground (`localhost:5174`)에 8개 컴포넌트 ComponentDef 추가 (각 2~3 Example)

### Changed
- `version`: 0.0.3 → 0.1.0 (P0 마일스톤 도달, framework 호명 가능 단계)

### Notes
- 0.1.0은 freeive 사이트 골격에 즉시 사용 가능한 부품 set
- 다음 마일스톤(0.2.0)은 P1 블로그·콘텐츠 톤 8개 (quote / image / timeline 등)

## [0.0.3] — 2026-05-07

### Added
- 정체성 정리: **End-user UI lib + AI Skill** (Layer 1/2 분리)
- `docs/manifesto.mdx` — 시장의 빈 자리, admin vs end-user, 5원칙
- `docs/admin-vs-end-user.mdx` — 영역 차이 + 안 만드는 컴포넌트 명시
- `docs/ai-skill.mdx` — AI Skill이 진짜 본체, 작동 원리, before/after
- `skill/` 디렉토리:
  - `CLAUDE.md` — Claude Code용 system prompt (한국어)
  - `cursorrules` — Cursor용 (영문)
  - `README.md` — 사용법
- 각 컴포넌트 docs에 **HTML 레퍼런스 섹션** 추가 (framework-free)
- README 재작성 (Layer 1/2 명시)
- `package.json` `files`에 `skill` 추가

### Changed
- 정체성 카피: "AI 시대 디자인 동질화에 답변" → "End-user UI를 위한 lib +
  AI Skill, 시장의 빈 자리"

## [0.0.2] — 2026-05-07

### Added
- `docs/` 디렉토리 신설 — getting-started, why-not-cards, eyebrow, section-frame, list-row 5개 MDX
- 패키지 publish 시 `docs`도 함께 포함 (`files`에 추가)
- `freeive.com/anti-card` 페이지가 이 docs를 직접 sync해서 렌더 (단일 진실 원천)

## [0.0.1] — 2026-05-07

초기 시드. 사용 가능한 컴포넌트는 미완 상태이며, API는 0.1.0 전까지 변경될 수 있습니다.

### Added
- `Eyebrow` — 섹션 카테고리 라벨. smallcaps 톤.
- `SectionFrame` — 카드 없이 섹션을 짜는 헤어라인+여백 프레임.
- `ListRow` — 카드 그리드 대신 행 레이아웃.
- `cn()` — clsx + tailwind-merge 유틸.
