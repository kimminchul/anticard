# @freeive/anti-card

> **End-user UI를 위한 라이브러리 + AI Skill.**
> 시장에는 admin lib가 20개고, end-user lib는 0개다. 그 빈 자리.

**현재 버전: 0.9.1** · 51 컴포넌트 · 12 타이포 토큰
🎯 **[Playground 보기 → kimminchul.github.io/anticard](https://kimminchul.github.io/anticard/)**

> [Read in English](./README.en.md)

---

## 시장의 진짜 그림

`shadcn/ui` · `Mantine` · `MUI` · `Ant Design` · `Chakra UI` —
인기 UI 라이브러리 대부분은 **사실 Admin/Dashboard 라이브러리**입니다.
Card · Sidebar · DataTable · Form 중심.

랜딩·마케팅·콘텐츠 같은 **End-user 화면**을 위한 라이브러리는 거의 없습니다.
**부트스트랩 정도**가 그나마 가깝지만 톤이 정형적이라 모던 사이트엔 안 씁니다.

→ 이 빈 자리에 안티 카드.

## Admin vs End-user

| | Admin | End-user (안티 카드 영역) |
|---|---|---|
| 우선 | 정보 밀도, 효율 | 정서·인상, 공간감 |
| 카드 박스 | OK (그릇 명확) | 답답함 — 콘텐츠가 곧 형태 |
| 헤딩 | 작게 | 크게, 시그니처 |
| 라벨 | form label | smallcaps eyebrow |
| 리듬 | 균등 그리드 | 큰 호흡과 리스트 |
| 인터랙션 | 빠른 클릭 | 부드러운 transition·scroll |

자세히: [Admin vs End-user](https://freeive.com/anti-card/admin-vs-end-user)

## 두 레이어

### Layer 1 — AI Skill (진짜 본체)

Claude · Cursor 같은 AI 코딩 도구에 **플러그인 스킬로 설치**.
AI가 화면을 만들 때 안티 카드 원칙·패턴·HTML 레퍼런스를 참조합니다.

```bash
# 0.0.x ~ 0.9.x: 수동 셋업
cat node_modules/@freeive/anti-card/skill/CLAUDE.md > CLAUDE.md
cat node_modules/@freeive/anti-card/skill/cursorrules > .cursorrules

# 1.0.0 이후 (예정): claude skill install @freeive/anti-card
```

코드 0줄도 가능. React/Vue/Svelte/순수 HTML 어디든 같은 톤.
**결과: AI가 만들었지만 AI가 만든 것 같지 않은 화면.**

자세히: [AI Skill](https://freeive.com/anti-card/ai-skill)

### Layer 2 — React 컴포넌트 (51개)

```bash
npm install @freeive/anti-card
```

```tsx
import {
  HeroPattern, SectionFrame, ListRow, Eyebrow, StatList, ClientLogos
} from "@freeive/anti-card";

<HeroPattern
  size="hero"
  eyebrow="Heritage · 2016 — Now"
  title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
  ctas={[{ label: "Talk", href: "/talk", tone: "accent" }]}
/>

<StatList items={[
  { value: "10+", label: "Years" },
  { value: "30+", label: "Clients" },
  { value: "150+", label: "Projects" },
]} />
```

#### 카테고리별 51 컴포넌트

| 카테고리 | 컴포넌트 |
|---|---|
| **레이아웃** (7) | Container · Hairline · Header · Footer · SectionFrame · Grid · GridSystem (12 col) |
| **타이포그래피** (6) | Eyebrow · HeroHeading · SectionHeading · Lead · Quote · Highlight |
| **리스트** (5) | ListRow · DefList · StatList · Timeline · CompareTable |
| **액션** (4) | LinkRow · Button (Primary/Secondary) · CTASection · Banner |
| **콘텐츠 블록** (5) | Callout · FAQ · PricingTable · Steps · FeatureRow |
| **신뢰·증거** (4) | ClientLogos · Testimonial · StatBlock · CaseStudy |
| **미디어** (3) | Image · Video · Gallery |
| **인터랙션** (5) | WaveCard · FadeIn · HoverAccent · ScrollProgress · Marquee |
| **폼** (6) | Input · Textarea · Select · Checkbox · Radio · Pill |
| **페이지 패턴** (5) | HeroPattern · SectorsPattern · TalkPattern · EmptyState · PricingPattern |
| **유틸** | `cn()` · `typography` 토큰 (12개) |

각 컴포넌트의 props·사용법은 **[Playground](https://kimminchul.github.io/anticard/)** 에서 시각 미리보기 + 6 탭(디자인 / 프롬프트 / HTML / CSS / JS / React)으로 확인.

> 시장에 없던 것은 Layer 1(AI 디자인 가이드)입니다.
> Layer 2 컴포넌트 라이브러리 자체는 너무 많아요. anti-card는 톤(5원칙)으로 차별.

## 안티 카드 5원칙

위계를 카드 박스 없이 만드는 다섯 가지:

1. **공간** — 섹션 사이 100~160px 여백
2. **대비** — 텍스트 크기·굵기·색의 단계
3. **헤어라인** — 1px 라인은 박스보다 가벼움
4. **smallcaps 라벨** — Eyebrow
5. **리스트의 행** — 카드 그리드 대신 행

자세히: [Manifesto](https://freeive.com/anti-card/manifesto) · [Why not cards](https://freeive.com/anti-card/why-not-cards)

## Playground

51 컴포넌트의 시각 미리보기 + 6 탭 (디자인 / 프롬프트 / HTML / CSS / JS / React).

- **공개 URL**: **[kimminchul.github.io/anticard](https://kimminchul.github.io/anticard/)** (GitHub Pages, main push 시 자동 배포)
- **로컬**: `npm run dev:play` → http://localhost:5174

각 컴포넌트 페이지에 **AI 프롬프트** 포함 — Claude/Cursor에 복사해서 동일 톤으로 코드 생성 가능.

GitHub Pages 빌드 (로컬 테스트):

```bash
# bash / git bash
GH_PAGES=1 npm run build:play && npm run preview:play

# PowerShell
$env:GH_PAGES="1"; npm run build:play; npm run preview:play
```

## What's New (0.9.1, 2026-05-08)

**0.0.3 → 0.9.1, 하루 만에 51 컴포넌트 + 토큰 시스템 완성.**

| 마일스톤 | 버전 | 추가 |
|---|---|---|
| P0 — freeive 골격 | 0.1.0 | Container · Hairline · HeroHeading · SectionHeading · Lead · LinkRow · Header · Footer (8) |
| 토큰 patch | 0.1.1 | typography.displayLg + HeroHeading size prop |
| P1 — 콘텐츠 톤 | 0.2.0 | Quote · Highlight · Image · Video · DefList · StatList · Timeline · Pill (8) |
| P2 — 패턴 + 액션 | 0.3.0 | HeroPattern · SectorsPattern · TalkPattern · EmptyState · CTASection · Banner · Button · FeatureRow (8) |
| P3 — 신뢰·증거 | 0.4.0 | ClientLogos · Testimonial · StatBlock · CaseStudy (4) |
| P4 — 인터랙션 | 0.5.0 | WaveCard · FadeIn · HoverAccent · ScrollProgress · Marquee (5) |
| P5 — 콘텐츠 블록 | 0.6.0 | Callout · FAQ · PricingTable · PricingPattern · Steps · CompareTable (6) |
| P6+P7 — 폼·갤러리 | 0.8.0 | Grid · Input · Textarea · Select · Checkbox · Radio · Gallery (6) |
| Grid 시스템 | 0.9.0 | **GridSystem · GridCol** (12 col) + Grid examples 4 + Select/Checkbox/Radio fix |
| 차분 톤 patch | 0.9.1 | typography.display 30~48 → 26~40px (일반 페이지 hero 차분) |

**타이포 토큰 시스템 (0.1.1)**
12개 토큰 (`displayLg / display / h2 / h3 / h4 / body / lead / leadLarge / small / eyebrow / eyebrowAccent / code`).
모든 컴포넌트가 토큰 참조 — 단일 변경점으로 전체 톤 조정 가능.

**5 원칙 일관 적용**
모든 51 컴포넌트가 박스 거부 + 헤어라인 + smallcaps + 공간 + 행 5원칙을 자체 검증.

**dogfooding** — [freeive.com](https://freeive.com) 사이트 자체가 살아있는 증거:
- 메인 — `HeroPattern` + `ListRow` (4축 카드 그리드 거부)
- Heritage — `StatList` + `ClientLogos` + `WaveCard` + `ListRow`
- Talk — `TalkPattern` (받음/안받음 체크리스트)

## ⚠️ Status

**0.9.x 베타.** 51 컴포넌트 시각·기능 안정화 단계.
1.0.0에서 API 동결, npm publish 예정.

## 활용사례

- **[freeive.com](https://freeive.com)** — 사이트 자체가 첫 활용사례 (4 페이지 모두 anti-card)
- 자세히: `freeive.com/anti-card`

## 개발 (contributors)

```bash
git clone https://github.com/kimminchul/anticard.git
cd anticard
npm install --legacy-peer-deps

# 격리 dev (vite playground :5174)
npm run dev:play

# tsup watch (라이브러리만 자동 재빌드)
npm run dev

# 사이트(../new-freeive)에 sync
npm run sync
```

## Roadmap

- **v0.9.x (현재)** — 51 컴포넌트 + 토큰 시스템 + Playground GitHub Pages
- **v1.0.0** — API 동결, npm publish, 1인 랩 정체성 콘텐츠 + 첫 외부 사용 사례
- **v1.1.0+** — Tailwind preset 패키지화, Headless 모드 (Tailwind 없이도)
- **v2.0.0+** — AI Skill 정식 install 명령 (`claude skill install`), Vue/Svelte 포트

## 라이선스

MIT — © Kim Min Chul (Freeive)
