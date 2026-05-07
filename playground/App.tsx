import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

/**
 * anti-card 컴포넌트 격리 시연. 사이트와 무관, vite로 띄움.
 *
 * 새 컴포넌트 만들면 여기 한 섹션 추가해서 즉시 시각 확인.
 */
export default function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="border-b border-white/[0.06] pb-10">
        <Eyebrow tone="accent">Playground · anti-card v0.0.2</Eyebrow>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          컴포넌트 시연실
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-zinc-400">
          이 페이지는 격리된 vite 환경에서 anti-card 컴포넌트만 빠르게 보기 위한 시연실입니다.
          <code className="ml-1 rounded bg-white/5 px-1.5 py-0.5 text-[12.5px] text-zinc-200">
            npm run dev:play
          </code>{" "}
          로 띄웁니다. 사이트와 무관하게 동작.
        </p>
      </header>

      <SectionFrame
        eyebrow="Eyebrow · neutral"
        title="섹션 카테고리 라벨"
        description="박스 없이 영역을 구분하는 가장 가벼운 신호. 본문 위에 한 줄로 얹습니다."
      >
        <div className="space-y-3">
          <Eyebrow>Heritage · 2016 — Now</Eyebrow>
          <Eyebrow>Framework · v0</Eyebrow>
          <Eyebrow>Pillars</Eyebrow>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Eyebrow · accent"
        title="강조 톤"
        description="진행 중 표시, 라이브 표시 등에. tone='accent'."
      >
        <div className="space-y-3">
          <Eyebrow tone="accent">Live · 진행 중</Eyebrow>
          <Eyebrow tone="accent">In progress</Eyebrow>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="ListRow"
        title="카드 그리드 대신 행"
        description="meta · 본문 · trailing 3컬럼. divide-y + border-y 와 함께 ul 안에 넣습니다."
      >
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <ListRow meta="2024" trailing="EBS">
            EBS 온라인 클래스 재구조화
          </ListRow>
          <ListRow meta="2023" trailing="롯데카드">
            mydata 수집 및 admin 개발
          </ListRow>
          <ListRow meta="2022" trailing="라이나생명" href="#">
            대고객 디지털채널 재구축 (클릭 가능)
          </ListRow>
          <ListRow meta="2021" trailing="KT">
            powertel 영업전산 Cloud 전환 및 ERP 재구축
          </ListRow>
        </ul>
      </SectionFrame>

      <SectionFrame
        as="h3"
        eyebrow="SectionFrame"
        title="이 섹션 자체가 SectionFrame"
        description="eyebrow + title + description + children. 위쪽 헤어라인은 divider prop으로 끌 수 있음."
      >
        <p className="text-[14px] leading-relaxed text-zinc-400">
          children 영역은 자유. 위 SectionFrame 들의 children 으로 들어간{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-[12.5px] text-zinc-200">
            div / ul
          </code>{" "}
          를 보세요.
        </p>
      </SectionFrame>

      <footer className="mt-20 border-t border-white/[0.06] pt-8 text-[12.5px] text-zinc-500">
        <p>
          코드 수정 시 vite가 즉시 hot reload 합니다 — 사이트와 무관하게 빠르게 시연 가능.
        </p>
        <p className="mt-2">
          사이트(freeive.com) 통합은 별도{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11.5px] text-zinc-300">
            npm run sync
          </code>{" "}
          명령으로.
        </p>
      </footer>
    </main>
  );
}
