# @freeive/anti-card

> 카드 안에 카드를 쌓지 않는 UI 시드.

ChatGPT · Claude · Cursor · v0 같은 AI 코딩 도구가 만드는 UI는 거의 다 `Card`
박스 안에 `Card`를 또 쌓아 위계를 표현합니다. 안전하지만 **모든 사이트가
같은 모양**이 됩니다.

`@freeive/anti-card`는 **공간 · 대비 · 헤어라인 · smallcaps 라벨 · 리스트의 행**
다섯 가지로 위계를 짜는 UI 시드입니다. AI 시대 디자인 동질화에 대한 답변입니다.

📚 자세한 원칙·로드맵: https://freeive.com/anti-card
🧪 운영 사이트가 곧 첫 활용사례입니다.

## ⚠️ Status

**0.0.x — 시드 단계.** 컴포넌트 API는 0.1.0 전까지 변경될 수 있습니다.
프로덕션 사용은 0.1.0 이후 권장합니다.

## Install

```bash
npm install @freeive/anti-card
# or
pnpm add @freeive/anti-card
```

Peer dependency: `react ≥ 18`. Tailwind CSS는 권장(필수 아님 — 컴포넌트는
Tailwind 클래스 기반이지만, 자체 className으로 오버라이드 가능합니다).

## Usage

```tsx
import { SectionFrame, ListRow, Eyebrow } from "@freeive/anti-card";

export default function Heritage() {
  return (
    <SectionFrame
      eyebrow="Heritage · 2016 — Now"
      title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
      description="텔레콤·금융·교육의 큰 싸움을 거친 깊이가 토대입니다."
    >
      <ul className="divide-y divide-white/[0.04] border-y border-white/[0.04]">
        <ListRow meta="2024" trailing="EBS" href="/heritage/ebs">
          EBS 온라인 클래스 재구조화
        </ListRow>
        <ListRow meta="2023" trailing="롯데카드">
          mydata 수집 및 admin 개발
        </ListRow>
      </ul>
    </SectionFrame>
  );
}
```

## Components (v0.0.1)

| Component | What | Anti-card 원칙 |
|---|---|---|
| `<Eyebrow>` | 섹션의 카테고리 라벨 (smallcaps) | smallcaps 라벨 |
| `<SectionFrame>` | 카드 없이 섹션 짜기 (헤어라인 + 여백 + 라벨) | 공간 / 헤어라인 / 라벨 |
| `<ListRow>` | 카드 그리드 대신 행 레이아웃 | 리스트의 행 |
| `cn()` | clsx + tailwind-merge 유틸 | — |

## 안티 카드 5원칙

1. **공간** — 섹션 사이 여백을 카드 테두리 대신 사용. 100~160px의 큰 호흡.
2. **대비** — 텍스트 크기·굵기·색의 단계로 위계.
3. **헤어라인** — 1px 라인은 박스보다 가볍게 영역 구분.
4. **smallcaps 라벨** — 영역의 카테고리를 작은 라벨로 분리.
5. **리스트의 행** — 카드 그리드 대신 행이 정보 밀도를 높임.

## Roadmap

- **v0.1.0** — Tailwind preset / plugin 제공, `Pill`, `MetricCard`(non-card!),
  Storybook
- **v0.2.0** — Headless 모드 (Tailwind 없이도)
- **v1.0.0** — 안정 API, AI Skill (Claude/Cursor) 동봉

## License

MIT — © Kim Min Chul (Freeive)
