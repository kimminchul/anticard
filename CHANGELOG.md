# Changelog

이 패키지의 모든 의미 있는 변경사항을 여기에 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/), 버저닝은 [SemVer](https://semver.org/).

## [Unreleased]

### Added
- **TalkPattern** 다국어/카피 변형 prop 3종:
  - `acceptLabel` (default `"받음"`)
  - `declineLabel` (default `"안 받음"`)
  - `channelsLabel` (default `"Channels"`)
  - 영문/일문 사이트에서 dogfood할 때 hardcoded 한국어를 외부 주입으로 교체할 수 있도록. freeive ko/en/ja 사이트에서 발견된 누락 봉합.
- **HeroPattern** `width` prop — HeroHeading의 `width` 노출 (default/wide/full). 일본어·영문 긴 제목이 좁은 max-width(20ch)에 갇혀 줄바꿈하는 문제를 prop으로 해결. 이전엔 freeive가 HeroPattern을 분해해 직접 조립해서 우회.
- **DataTable** `rowClassName(row, i)` prop — 행 단위 추가 className. group header / disabled / 강조 행 표현. GroupedTable이 그룹 헤더 행 시각 분리(border-t + bg-zinc-100/50)에 활용.
- **DataTable** `getCellSpan(row, i, colIndex)` prop — 한 셀이 colSpan으로 여러 컬럼 차지. 같은 row의 후속 cell 자동 skip (let 변수로 row 단위 skipCount 추적). GroupedTable의 그룹 헤더가 첫 컬럼에서 전체 columns 차지하는 시각화에 활용.
- **DataTable** `selection` prop — 행 선택 모드. 지정 시 첫 컬럼에 체크박스 자동 노출, 헤더 위에 일괄 액션 영역 노출. 헤더 체크박스는 전체/일부(mixed)/없음 3-state. 선택된 행은 emerald accent 톤. 행 onClick과 체크박스 onClick은 stopPropagation으로 분리.
  - `selectedKeys` / `onSelectionChange` (controlled)
  - `selectKey(row, i) => string` — DB id 등 안정적 unique key 권장
  - `bulkActions` (`ReactNode` 또는 `(keys) => ReactNode`)
  - `showCount` (default true) — 'N개 선택됨' 표시
- **SelectableTable** (NEW) — DataTable + 행 선택 wrapper. uncontrolled (`defaultSelectedKeys`) / controlled 둘 다 지원. admin 리스트의 일괄 처리 패턴(일괄 발행 / 휴지통 / 카테고리 변경 등)에 적합. NAV "데이터 테이블" 그룹의 planned 6개 중 1번째 ready 전환.
- **DataTable** `expansion` prop — 행 펼침 모드. 지정 시 첫 컬럼에 chevron 자동 노출, 클릭 시 다음 줄에 `colSpan` 전체로 `renderExpanded(row)` 결과 출력. 펼친 행은 zinc accent 톤. selection과 함께 켜면 chevron → 체크박스 → 본 컬럼 순으로 자동 정렬.
  - `expandedKeys` / `onExpandedChange` (controlled)
  - `expandKey(row, i) => string`
  - `renderExpanded(row) => ReactNode`
  - `single` (accordion — 한 개만)
  - `toggleOnRowClick` (행 어디든 클릭으로 toggle)
- **ExpandableTable** (NEW) — DataTable + 행 펼침 wrapper. 카드 그리드의 대안 — 표는 좁게, 깊은 정보는 같은 줄 컨텍스트에 펼침. admin 글/Heritage 사례/주문·로그 리스트에 적합. NAV "데이터 테이블" planned 6개 중 2번째 ready 전환.
- **EditableTable** (NEW) — DataTable + inline 셀 편집. 셀 클릭 → emerald accent ring input으로 전환, Enter / blur 저장, Esc 취소. 비편집 시 hover에 헤어라인 박스로 편집 가능성 인지. `editable=true` 컬럼만 적용, `editorType: 'text' | 'number'`, `toEditValue`로 표시(포맷팅) ↔ 편집(raw) 분리 가능. DataTable 본체 prop은 추가하지 않고 columns.cell augment 방식 — selection/expansion과 직교 (조합 가능). admin의 빠른 데이터 보정 / Excel-like 패턴. NAV "데이터 테이블" planned 6개 중 3번째 ready 전환.
- **GroupedTable** (NEW) — DataTable + 카테고리·섹터로 묶인 행 사이에 그룹 헤더 자동 삽입. `groupBy(row) => string` 함수로 그룹화, 헤더는 smallcaps + count, `collapsible=true`로 그룹별 펼침/접힘. `renderGroupHeader`로 헤더 커스터마이즈. 그룹 헤더 행은 DataTable의 `rowClassName` + `getCellSpan`을 활용해 첫 컬럼에서 전체 columns colSpan + border-t / bg-zinc-100/50 톤으로 시각 분리. Heritage 섹터별 / admin 카테고리별 리스트에 자연. NAV "데이터 테이블" planned 6개 중 4번째 ready 전환.
- **TreeTable** (NEW) — DataTable + 계층 구조. `getChildren(row) => T[]`로 자식 추출, 내부에서 depth 누적해 flatten. 첫 컬럼만 자동으로 `indent(depth × indentSize) + chevron` 부여, 다른 컬럼은 원본 cell 그대로. leaf 노드는 chevron 자리에 빈 4×4 (컬럼 정렬 안정). `defaultExpandedKeys`/`expandedKeys`+`onExpandedChange`. 트리 컨텍스트에서 sortable 자동 비활성. 파일 트리 / 카테고리 트리 / 조직도 / nested 댓글에 자연. NAV "데이터 테이블" planned 6개 중 5번째 ready 전환.
- **CompactTable** (NEW) — 로그·데이터 뷰어용 압축 표. DataTable wrapper로 `density='tight'` 강제 + 본문 12px + 헤더 10.5px + 컬럼 패딩 px-2.5 (더 좁게). `font='mono'`(default): `ui-monospace + tabular-nums`로 timestamp·자릿수 정렬 안정. `font='sans'`도 가능 (정보 밀도만 높이고 싶을 때). `hoverable=false`로 hover 강조 끄기 (정적 로그 뷰). 안티 카드 헤어라인 톤 유지. NAV "데이터 테이블" planned 6개 중 6번째 ready 전환 — **DataTable variants 6개 모두 ready, planned 0개**.

### Changed
- **Playground NAV** — `selectable-table` / `expandable-table` / `editable-table` / `grouped-table` / `tree-table` / `compact-table` 모두 `status: "ready"`. NAV 78항목 중 78 ready / 0 planned. 라이브러리 v0.13.1 기준 dogfooding 마무리.
- **Playground UX 보강 6종**:
  - 검색 dropdown 키보드 nav — ↓↑ 항목 이동, Enter 선택, Esc 닫기. active 항목 emerald accent 배경 강조, mouseEnter 시 동기화. ARIA (`combobox` / `listbox` / `option` / `aria-activedescendant`) 적용.
  - 글로벌 `/` 단축키 — 어디서든 `/` 누르면 검색 input 포커스. 입력 중인 INPUT/TEXTAREA/contenteditable에서는 무시.
  - 코드 / 프롬프트 복사 피드백 — copy 버튼 클릭 시 1.6초 동안 `✓ copied` + emerald accent 배경. `useCopyFeedback` 훅으로 latest-timer 유지 (빠른 반복 안전).
  - 사이드바 active 항목 자동 스크롤 — 페이지 진입 / 검색 dropdown 선택 시 사이드바가 active 항목으로 `scrollIntoView({ block: "nearest" })`. details auto-open 후 DOM 마운트 보장 위해 50ms 지연.
  - Props 표 sticky 헤더 — 긴 컴포넌트 페이지에서 props 표 헤더가 viewport top에 sticky. backdrop-blur + bg-white/95 (dark mode 대응).
  - `?` 단축키 → 키보드 단축키 모달 — anti-card Dialog dogfood. `/` `↓↑` `Enter` `Esc` `?` 5개 단축키 목록. Header에 `?` 버튼도 노출 (발견성).
- Playground 검색에 **버전 필터** — `v0.14.0` / `version:0.14.0` / `latest` / `최신` 입력 시 해당 라운드의 addedIn 또는 updatedIn 컴포넌트만 노출. 결과 헤더에 'v{버전}에 변경된 컴포넌트 · N개' + 각 항목 옆 `updated`(emerald) / `added`(zinc) tag. 신규 release 직후 변경분 빠르게 보는 보조 도구.

## [0.13.1] - 2026-05-10

### Fixed
- **Dialog / Drawer focus useEffect 디펜던시 버그**. `onOpenChange`가 deps에 포함되어 있어 consumer가 인라인 화살표 함수를 넘기면 매 렌더마다 effect cleanup-re-run 사이클로 focus가 트리거 panel을 왕복했다. 결과: 컴포넌트 안의 controlled input이 한 글자 입력 후 focus를 잃어 다음 키스트로크가 무시되는 증상. ref 패턴으로 onOpenChange를 deps에서 분리해 해결.

## [0.13.0] - 2026-05-09

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
- Playground Button 페이지 4종 (primary/secondary/ghost/plain) — 각 페이지마다 icon + iconOnly 예시
- **Pill** `shape` prop 추가:
  - `shape="rounded"` (기본): rounded-md, 태그·필터 톤
  - `shape="pill"`         : rounded-full, badge 톤 (status·count·NEW/BETA/v0.10.0)
  - Pill = "필 / 태그 / 뱃지" 통일 어휘 (별도 Badge 컴포넌트 없음)
- 신규 NAV 카테고리:
  - **내비게이션** (Tabs / Breadcrumb / Pagination)
  - **오버레이** (Dialog / Drawer / Popover / Tooltip / Toast / Dropdown)
- **내비게이션 컴포넌트 3종** (NEW):
  - `Breadcrumb` — 위치 표시 (12.5px, ChevronRight 자동, aria-current)
  - `Pagination` — 페이지 이동 (1...siblings...last 패턴, 헤어라인 박스)
  - `Tabs` — 탭 패널 전환 (variant=line/pills, role=tablist 자동)
- **오버레이 컴포넌트 6종** (NEW):
  - `Dialog` — 모달 (native `<dialog>` + showModal, focus trap·ESC·backdrop 자동)
  - `Drawer` — 사이드 슬라이드 패널 (left/right, body scroll lock, ESC)
  - `Popover` — 트리거 옆 floating 패널 (외부 클릭+ESC 자동 닫힘)
  - `Tooltip` — 호버 시 라벨 (CSS group-hover, JS 불필요)
  - `Toast` — 일시적 알림 (4 tones × 6 positions, aria-live=polite)
  - `ToastProvider` + `useToast()` — **누적(stack) 알림 시스템**
    - app root에 Provider 설치 → 자식에서 `useToast()` 훅으로 호출
    - 여러 알림이 한 위치에 누적, limit 초과 시 가장 오래된 것 자동 제거
    - `toast({ tone, title, description, duration? })` / `dismiss(id)` / `clear()`
    - 단일 `<Toast>` 컴포넌트도 그대로 — 단순 사례용
  - `Dropdown` — 메뉴 리스트 (icon / separator / danger 지원)
- 모든 오버레이는 anti-card 톤: shadow X, 헤어라인 1px, smallcaps 라벨, 큰 패딩
- **Motion 토큰 시스템** (NEW):
  - `src/tokens/motion.ts` — 5 duration (instant/fast/DEFAULT/slow/slower) + 3 easing (standard/decelerate/accelerate)
  - Tailwind config 확장: `duration-instant` / `duration-fast` / `duration-slow` / `duration-slower`
  - Easing은 Tailwind 기본 ease-in-out / ease-out / ease-in이 동일 베지어라 추가 안 함
  - `prefers-reduced-motion: reduce` 글로벌 CSS (playground/styles.css)
  - `docs/motion.mdx` — 5원칙 + 권장 매트릭스 + 안티 패턴
  - Playground "리소스 → 모션 토큰" 페이지 신규 (interactive demo)
  - JS import: `import { motion } from "@freeive/anti-card"`
- **애니메이션 레시피** — Tailwind `animate-anti-*` 클래스 (토큰 + keyframes 결합):
  - `animate-anti-fade-in` / `-fast` / `animate-anti-fade-out`
  - `animate-anti-slide-up` / `-down`
  - `animate-anti-slide-in-right` / `-left`
  - `animate-anti-scale-in`
- **오버레이 enter 모션 적용** — 즉각 mount → 부드러운 등장:
  - Drawer: side에 따라 slide-in-left / slide-in-right
  - Dialog (native `<dialog>`): backdrop fade-in + dialog scale-in
  - Popover / Dropdown: scale-in (origin-top)
  - Toast (큐 / 단일 모두): slide-up
  - Tooltip: opacity 150ms → 200ms (조금 더 여유)

### Changed
- Playground 헤더 VERSION 표기: 0.0.3 → **0.10.0** (실제 버전 동기화)
- 용어 통일: "framework" / "프레임워크" → "library" / "라이브러리" (CHANGELOG 과거 기록 제외)
- Specific count 제거: "51 컴포넌트" / "12 타이포 토큰" / 카테고리별 (7)(6) 등 일반 표현으로
- Icons 페이지 테이블 셀 layout — icons column 텍스트 오버랩 fix (세로 stack)

### Notes
- `0.x.x`는 GitHub-only release (git tag + GitHub Release). npm publish는 `1.0.0`부터 — 정책 docs/VERSIONING.md §7.
- 첫 git tag `v0.10.0` 생성됨 (annotated, commit `aab23ef`).
- 첫 번째 minor release with 풍부한 신규 컴포넌트 (내비게이션 3 + 오버레이 6 + Motion + Button 확장).

## [0.12.1] - 2026-05-08

### Fixed
- **Next.js Server Component 호환성** — `tsup.config.ts`에 `banner: { js: '"use client";' }` 추가. 라이브러리 전체를 client boundary로 마킹하여 `createContext` (ToastProvider 등)가 server component에서 import 시 발생하던 `Runtime TypeError: createContext only works in Client Components` 에러 해소.

## [0.12.0] - 2026-05-08

### Added
- **TextList** 컴포넌트 — 본문 텍스트 ul/ol 리스트 (6 variants: bullet · hyphen · number · number-padded · check · dot-accent)
- **Carousel** 컴포넌트 — 한 장씩 슬라이드 (fade/slide 트랜지션, autoPlay, ←/→ 키보드, 모바일 스와이프)
- **FormField** wrapper — label / hint / error wrapper (label-top / label-left)
- **DataTable** — 정렬 가능 표 (generic `<T>`, density 3단계, stable sort)
- **DatePicker** — Popover 위 캘린더 (ko/en locale, disabledDate)
- **Combobox** — 검색 가능 select (↑↓ 키보드, Enter, ESC, X 트리거 외부 분리)
- **데이터 테이블** NAV 카테고리 신설 (1 ready + 6 planned: selectable / expandable / editable / grouped / tree / compact)
- **focus-trap** 유틸 (`src/utils/focus-trap.ts`) — Dialog/Drawer 공유

### Changed
- **Dialog** — native `<dialog>` → 커스텀 React 오버레이 전환 (애니메이션 안정성 + focus trap + initial/return focus + aria-labelledby)
- **Drawer** — Dialog와 동일한 focus 관리 패턴 적용
- **Popover / Dropdown** — outer `<span onClick>` 제거 → trigger를 `cloneElement`로 받아 키보드 동작 (aria-expanded / aria-haspopup 자동 주입)
- **Combobox** — 트리거 `<button>` 안 nested `<button>` 제거 (HTML 명세 위반 해소). X 클리어 버튼은 트리거 외부 absolute 분리
- **Carousel** — autoPlay effect deps에서 `index` 제거 + 함수형 update (timer drift 해소)
- **Header** — `border-current/40` (Tailwind opacity 미지원) → `border-zinc-900/40 dark:border-zinc-50/40`
- **Banner** — danger/warning tone에 `role="alert"` 분기 (기존 `role="status"`)
- **Callout** — 아이콘 박스 높이를 본문 첫 줄 line-box와 일치 + items-center로 시각 중앙 정렬
- **WaveCard** — `orientation` prop 추가 ("horizontal" default | "vertical" 좌→우 진행)
- **TalkPattern** — accept/decline 한쪽만 있을 때 1열로 자연 정렬 (md:grid-cols-2 조건부)
- **카피 톤** — playground 전체 "1인 운영자/1인 랩" 표현 제거 (66 → 0 occurrences)

### Documentation (playground)
- 모든 ComponentDef(66)에 `intro` + `useCases` 채움 — 비개발자도 이해할 수 있는 풍부한 설명 + 주 사용처
- ComponentPage 렌더 영역에 desc 자리 intro fallback + "주로 어디에 쓰나요" 단독 영역 추가
- 카탈로그 사이드바 / NAV는 짧은 desc 그대로 유지 (두 톤 분리)

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
