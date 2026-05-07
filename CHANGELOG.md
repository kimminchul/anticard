# Changelog

이 패키지의 모든 의미 있는 변경사항을 여기에 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/), 버저닝은 [SemVer](https://semver.org/).

## [Unreleased]

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
