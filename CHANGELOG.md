# Changelog

이 패키지의 모든 의미 있는 변경사항을 여기에 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/), 버저닝은 [SemVer](https://semver.org/).

## [Unreleased]

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
