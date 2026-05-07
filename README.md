# @freeive/anti-card

> **End-user UI를 위한 라이브러리 + AI Skill.**
> 시장에는 admin lib가 20개고, end-user lib는 0개다. 그 빈 자리.

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
# 0.0.x: 수동 셋업
cat node_modules/@freeive/anti-card/skill/CLAUDE.md > CLAUDE.md
cat node_modules/@freeive/anti-card/skill/cursorrules > .cursorrules

# 0.1.0 이후 (예정): claude skill install @freeive/anti-card
```

코드 0줄도 가능. React/Vue/Svelte/순수 HTML 어디든 같은 톤.
**결과: AI가 만들었지만 AI가 만든 것 같지 않은 화면.**

자세히: [AI Skill](https://freeive.com/anti-card/ai-skill)

### Layer 2 — React 컴포넌트 (보조)

```bash
npm install @freeive/anti-card
```

```tsx
import { SectionFrame, ListRow, Eyebrow } from "@freeive/anti-card";

<SectionFrame
  eyebrow="Heritage · 2016 — Now"
  title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
>
  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
    <ListRow meta="2024" trailing="EBS">EBS 온라인 클래스 재구조화</ListRow>
    <ListRow meta="2023" trailing="롯데카드">mydata 수집 및 admin 개발</ListRow>
  </ul>
</SectionFrame>
```

| Component | 역할 | 5원칙 |
|---|---|---|
| `<Eyebrow>` | 섹션 카테고리 라벨 | smallcaps |
| `<SectionFrame>` | 카드 없이 섹션 짜기 | 공간 / 헤어라인 / 라벨 |
| `<ListRow>` | 카드 그리드 대신 행 | 리스트의 행 |
| `cn()` | clsx + tailwind-merge | 유틸 |

> 시장에 없던 것은 Layer 1(AI 디자인 가이드)입니다.
> Layer 2 컴포넌트 라이브러리 자체는 너무 많아요.

## 안티 카드 5원칙

위계를 카드 박스 없이 만드는 다섯 가지:

1. **공간** — 섹션 사이 100~160px 여백
2. **대비** — 텍스트 크기·굵기·색의 단계
3. **헤어라인** — 1px 라인은 박스보다 가벼움
4. **smallcaps 라벨** — Eyebrow
5. **리스트의 행** — 카드 그리드 대신 행

자세히: [Manifesto](https://freeive.com/anti-card/manifesto) · [Why not cards](https://freeive.com/anti-card/why-not-cards)

## ⚠️ Status

**0.0.x 시드.** API는 0.1.0 전까지 변경될 수 있습니다.
프로덕션 사용은 0.1.0 이후 권장.

## 활용사례

- **[freeive.com](https://freeive.com)** — 사이트 자체가 첫 활용사례
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

- **v0.1.0** — Tailwind preset, AI Skill 정식 install 명령, `Pill`/`Stat`/`Hero` 컴포넌트
- **v0.2.0** — Headless 모드 (Tailwind 없이도)
- **v1.0.0** — 안정 API, 더 많은 end-user 패턴 (Footer / Marquee / Showcase)

## 라이선스

MIT — © Kim Min Chul (Freeive)
