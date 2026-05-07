# Changelog

이 패키지의 모든 의미 있는 변경사항을 여기에 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/), 버저닝은 [SemVer](https://semver.org/).

## [Unreleased]

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
