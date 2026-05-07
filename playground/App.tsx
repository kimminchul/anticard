import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

/**
 * anti-card 컴포넌트 격리 dev. shadcn/ui docs 스타일 — 좌측 sidebar + 우측 컴포넌트 섹션.
 *
 * 새 컴포넌트 추가 시:
 *   1) src/components/foo.tsx + src/index.ts export
 *   2) 이 파일의 COMPONENTS 배열에 항목 추가
 *   3) Section 한 개 추가
 */

const COMPONENTS = [
  { id: "eyebrow", name: "Eyebrow", group: "primitives" },
  { id: "section-frame", name: "SectionFrame", group: "primitives" },
  { id: "list-row", name: "ListRow", group: "primitives" },
];

const VERSION = "0.0.2";

export default function App() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Header />
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[200px_1fr]">
        <Sidebar />
        <main className="min-w-0 space-y-24">
          <Intro />
          <EyebrowSection />
          <SectionFrameSection />
          <ListRowSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

/* ================ Layout ================ */

function Header() {
  return (
    <header className="flex items-baseline justify-between border-b border-white/[0.06] pb-5">
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-50">
          anti-card
        </h1>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-zinc-300">
          v{VERSION}
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400">
          playground
        </span>
      </div>
      <nav className="flex items-center gap-5 text-[12.5px] text-zinc-400">
        <a
          href="https://github.com/kimminchul/anticard"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-zinc-100"
        >
          Github
        </a>
        <a
          href="https://freeive.com/anti-card"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-zinc-100"
        >
          freeive.com/anti-card
        </a>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="self-start md:sticky md:top-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        Components
      </p>
      <ul className="mt-3 space-y-1 border-l border-white/[0.06] pl-3 text-[13.5px]">
        {COMPONENTS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="block text-zinc-400 transition-colors hover:text-emerald-400"
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        Docs
      </p>
      <ul className="mt-3 space-y-1 border-l border-white/[0.06] pl-3 text-[13.5px]">
        <li>
          <a
            href="https://freeive.com/anti-card/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-zinc-400 transition-colors hover:text-emerald-400"
          >
            Getting Started
          </a>
        </li>
        <li>
          <a
            href="https://freeive.com/anti-card/why-not-cards"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-zinc-400 transition-colors hover:text-emerald-400"
          >
            Why not cards
          </a>
        </li>
      </ul>
    </aside>
  );
}

function Intro() {
  return (
    <section>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-400">
        Playground
      </p>
      <h2 className="mt-3 max-w-[24ch] text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight text-zinc-50">
        컴포넌트 시연실
      </h2>
      <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
        격리된 vite 환경에서 anti-card 컴포넌트만 빠르게 시각 확인.{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-[12.5px] text-zinc-200">
          src/
        </code>{" "}
        를 직접 alias로 가져오므로 코드 저장 시 즉시 hot reload. 사이트와 무관하게
        동작.
      </p>
    </section>
  );
}

/* ================ Reusable section blocks ================ */

interface SectionProps {
  id: string;
  name: string;
  desc: string;
  preview: React.ReactNode;
  code: string;
  props: Array<{ name: string; type: string; default?: string; desc: string }>;
}

function ComponentSection({ id, name, desc, preview, code, props }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        {name}
      </h2>
      <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-zinc-400">
        {desc}
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.06]">
        <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
          Preview
        </div>
        <div className="p-6 md:p-8">{preview}</div>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.06] bg-zinc-950">
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
          <span>Code</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(code)}
            className="rounded border border-white/10 px-2 py-0.5 text-[10.5px] tracking-normal text-zinc-300 transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
            title="복사"
          >
            copy
          </button>
        </div>
        <pre className="overflow-x-auto px-5 py-4 text-[12.5px] leading-relaxed text-zinc-200">
          <code>{code}</code>
        </pre>
      </div>

      <h3 className="mt-10 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        Props
      </h3>
      <table className="mt-3 w-full text-[13px]">
        <thead>
          <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.08em] text-zinc-500">
            <th className="py-2 text-left font-medium">Name</th>
            <th className="py-2 text-left font-medium">Type</th>
            <th className="py-2 text-left font-medium">Default</th>
            <th className="py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-white/[0.04]">
              <td className="py-2.5 align-top">
                <code className="rounded bg-white/5 px-1.5 py-0.5 text-[12px] text-zinc-100">
                  {p.name}
                </code>
              </td>
              <td className="py-2.5 align-top text-emerald-400">
                <code className="text-[12px]">{p.type}</code>
              </td>
              <td className="py-2.5 align-top text-zinc-400">
                {p.default ? (
                  <code className="text-[12px]">{p.default}</code>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="py-2.5 align-top text-zinc-300">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ================ Per-component sections ================ */

function EyebrowSection() {
  return (
    <ComponentSection
      id="eyebrow"
      name="Eyebrow"
      desc="섹션의 카테고리를 작은 라벨로 분리하는 smallcaps 컴포넌트. 카드 박스 없이 영역을 구분하는 가장 가벼운 신호."
      preview={
        <div className="space-y-4">
          <Eyebrow>Heritage · 2016 — Now</Eyebrow>
          <Eyebrow>Framework · v0</Eyebrow>
          <Eyebrow tone="accent">Live · 진행 중</Eyebrow>
        </div>
      }
      code={`import { Eyebrow } from "@freeive/anti-card";

<Eyebrow>Heritage · 2016 — Now</Eyebrow>
<Eyebrow>Framework · v0</Eyebrow>
<Eyebrow tone="accent">Live · 진행 중</Eyebrow>`}
      props={[
        {
          name: "tone",
          type: '"neutral" | "accent"',
          default: '"neutral"',
          desc: "accent는 액센트 컬러로 강조",
        },
        {
          name: "className",
          type: "string",
          desc: "Tailwind 클래스 추가 (twMerge로 충돌 해결)",
        },
        {
          name: "...rest",
          type: "HTMLAttributes<HTMLParagraphElement>",
          desc: "표준 p 속성",
        },
      ]}
    />
  );
}

function SectionFrameSection() {
  return (
    <ComponentSection
      id="section-frame"
      name="SectionFrame"
      desc="카드 박스 없이 섹션을 짠다. 안티 카드 5원칙 중 ‘공간(여백) + 헤어라인 + smallcaps 라벨’ 세 가지를 한 컴포넌트로 묶음."
      preview={
        <SectionFrame
          divider={false}
          eyebrow="Pillars"
          title="네 개의 축으로 운영합니다."
          description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
        >
          <p className="text-[13.5px] text-zinc-400">
            children 영역. ListRow 또는 자유 콘텐츠.
          </p>
        </SectionFrame>
      }
      code={`import { SectionFrame } from "@freeive/anti-card";

<SectionFrame
  eyebrow="Pillars"
  title="네 개의 축으로 운영합니다."
  description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
>
  {children}
</SectionFrame>`}
      props={[
        { name: "eyebrow", type: "ReactNode", desc: "섹션 카테고리 라벨" },
        { name: "title", type: "ReactNode", desc: "섹션 큰 제목" },
        { name: "description", type: "ReactNode", desc: "제목 아래 서브 카피" },
        {
          name: "as",
          type: '"h1" | "h2" | "h3"',
          default: '"h2"',
          desc: "헤딩 레벨",
        },
        {
          name: "divider",
          type: "boolean",
          default: "true",
          desc: "위쪽 헤어라인 표시 여부",
        },
        { name: "children", type: "ReactNode", desc: "본문 콘텐츠" },
      ]}
    />
  );
}

function ListRowSection() {
  return (
    <ComponentSection
      id="list-row"
      name="ListRow"
      desc="카드 그리드 대신 행 레이아웃. divide-y + border-y 와 함께 ul 안에서 사용. 가장 쓸 일이 많은 컴포넌트."
      preview={
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
        </ul>
      }
      code={`import { ListRow } from "@freeive/anti-card";

<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024" trailing="EBS">
    EBS 온라인 클래스 재구조화
  </ListRow>
  <ListRow meta="2022" trailing="라이나생명" href="/heritage/lina">
    대고객 디지털채널 재구축
  </ListRow>
</ul>`}
      props={[
        { name: "meta", type: "ReactNode", desc: "좌측 작은 라벨 (smallcaps)" },
        { name: "trailing", type: "ReactNode", desc: "우측 보조 라벨" },
        { name: "children", type: "ReactNode", desc: "본문 (제목)" },
        {
          name: "href",
          type: "string",
          desc: "있으면 a 태그로 감싸지고 hover 시 액센트",
        },
      ]}
    />
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-8 text-[12.5px] text-zinc-500">
      <p>
        새 컴포넌트 추가:{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11.5px] text-zinc-300">
          src/components/foo.tsx
        </code>{" "}
        →{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11.5px] text-zinc-300">
          src/index.ts
        </code>{" "}
        export →{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11.5px] text-zinc-300">
          playground/App.tsx
        </code>{" "}
        섹션 추가
      </p>
      <p className="mt-2">
        사이트(:3000) 통합:{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11.5px] text-zinc-300">
          npm run sync
        </code>
      </p>
    </footer>
  );
}
