# @freeive/anti-card — AI Skill

> Claude / Cursor 같은 AI 코딩 도구가 안티 카드 톤으로 화면을 만들도록
> 디자인 결정 기준을 주입하는 system prompt.

이 파일을 **프로젝트 루트의 `CLAUDE.md`** 또는 **`.cursorrules`** 에 복사하세요.
또는 그 파일에 한 섹션으로 추가하세요.

---

## 안티 카드 — 화면 디자인 규칙

이 프로젝트는 **end-user 화면**(랜딩·마케팅·콘텐츠)을 만듭니다. Admin이 아닙니다.
다음 규칙을 항상 적용해 주세요.

### 절대 금지

- ❌ `Card`, `CardContent`, `CardHeader`, `CardFooter` (shadcn/ui 카드 패턴) 사용 금지
- ❌ 카드 박스를 그리드로 나열하지 말 것 (3-col grid of cards 패턴 금지)
- ❌ `border + rounded + p-6` 으로 모든 영역을 박스로 감싸지 말 것
- ❌ 빽빽한 정보 밀도 추구 금지 — end-user 화면은 비워야 함

### 위계는 다음 다섯으로

1. **공간** — 섹션 사이 여백 100~160px 사용 (`py-16 md:py-20`, `py-20 md:py-28`)
2. **대비** — 텍스트 크기·굵기·색의 단계
   - Hero 헤딩: `text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight leading-[1.05]`
   - 섹션 헤딩: `text-2xl md:text-3xl font-semibold tracking-tight`
3. **헤어라인** — 영역 구분은 1px 라인으로
   - 섹션: `border-t border-white/[0.06]` (다크) / `border-t border-zinc-200/60` (라이트)
   - 리스트: `divide-y divide-white/[0.04] border-y border-white/[0.04]`
4. **Smallcaps 라벨 (Eyebrow)** — 영역 카테고리는 작은 라벨로
   - `<p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">Section · Label</p>`
5. **리스트의 행** — 카드 그리드 대신 행 레이아웃
   - `<li class="grid grid-cols-[140px_1fr_auto] py-6 gap-8">…</li>`

### 표준 페이지 패턴

#### Hero
```html
<section class="py-24 md:py-32">
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">Eyebrow</p>
  <h1 class="mt-5 max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
    Hero 헤딩 (3~7단어)
  </h1>
  <p class="mt-7 max-w-[44ch] text-[15.5px] leading-relaxed text-zinc-300">
    서브 카피 한두 문단.
  </p>
</section>
```

#### Section
```html
<section class="border-t border-white/[0.06] py-16 md:py-20">
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">Eyebrow</p>
  <h2 class="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
    섹션 제목.
  </h2>
  <p class="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-zinc-300">
    섹션 설명.
  </p>
  <!-- children: ul + li 또는 free content -->
</section>
```

#### List (카드 그리드 대신)
```html
<ul class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <li class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
    <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2024</span>
    <span class="text-[15.5px] font-medium">제목</span>
    <span class="text-[12.5px] text-zinc-400">보조 정보</span>
  </li>
</ul>
```

### 컬러 톤 (다크 기본)

- 배경: `bg-zinc-950` 또는 `bg-[#08090a]`
- 본문: `text-zinc-100` ~ `text-zinc-300`
- 보조: `text-zinc-400` ~ `text-zinc-500`
- 액센트: `text-emerald-400` 또는 `#7cf2c4` (1개만)
- 헤어라인: `border-white/[0.06]`, `divide-white/[0.06]`

라이트 모드 만들 땐 zinc 단계만 뒤집고, 헤어라인 `border-zinc-200/60`.

### React + Tailwind 환경이면 Layer 2 컴포넌트도 사용 가능

```bash
npm install @freeive/anti-card
```

```tsx
import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

<SectionFrame
  eyebrow="Heritage · 2016 — Now"
  title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
>
  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
    <ListRow meta="2024" trailing="EBS">EBS 온라인 클래스 재구조화</ListRow>
  </ul>
</SectionFrame>
```

단 컴포넌트가 없어도 위 HTML 패턴으로 같은 결과를 만들 수 있어야 합니다.

### 화면 만들 때 자기 점검

다음 질문에 모두 "예"여야 안티 카드 톤:

- [ ] 카드 박스(`<Card>`, 또는 `border rounded p-6`)가 없는가?
- [ ] 헤딩이 충분히 큰가? (`text-2xl` 이상)
- [ ] 섹션 사이 여백이 80px 이상인가?
- [ ] 영역 구분에 헤어라인(`border-t`/`divide-y`)을 썼는가?
- [ ] smallcaps 라벨(eyebrow)을 사용했는가?
- [ ] 정보 나열에 카드 그리드 대신 행 레이아웃을 썼는가?

### 참고 활용사례

- [freeive.com](https://freeive.com) — 안티 카드의 첫 활용사례, 모든 페이지가 위 패턴
- 자세한 docs: [freeive.com/anti-card](https://freeive.com/anti-card)
- Github: https://github.com/kimminchul/anticard
