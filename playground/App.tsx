import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

/**
 * anti-card 컴포넌트 격리 dev. shadcn/ui docs 스타일.
 * 좌측 sidebar + 우측 섹션별 다중 variant.
 *
 * 새 컴포넌트 추가 시:
 *   1) src/components/foo.tsx + src/index.ts export
 *   2) COMPONENTS 배열 + Section 함수 추가
 *   3) 각 변형은 <Example title preview code /> 한 블록
 */

const COMPONENTS = [
  { id: "eyebrow", name: "Eyebrow" },
  { id: "section-frame", name: "SectionFrame" },
  { id: "list-row", name: "ListRow" },
];

const VERSION = "0.0.2";

export default function App() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Header />
      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[200px_1fr]">
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
        격리된 vite 환경에서 anti-card 컴포넌트만 빠르게 시각 확인. 각 컴포넌트마다 여러
        사용 패턴(variant)을 미리보기 + 코드로 보여줍니다. 코드 저장 시 즉시 hot
        reload.
      </p>
    </section>
  );
}

/* ================ Reusable blocks ================ */

interface ExampleProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
}

function Example({ title, description, preview, code }: ExampleProps) {
  return (
    <div className="mt-8 first:mt-0">
      <h4 className="text-[14px] font-medium tracking-tight text-zinc-100">
        {title}
      </h4>
      {description && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
          {description}
        </p>
      )}

      <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.06]">
        <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
          Preview
        </div>
        <div className="p-6 md:p-8">{preview}</div>
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border border-white/[0.06] bg-zinc-950">
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
    </div>
  );
}

interface PropRow {
  name: string;
  type: string;
  default?: string;
  desc: string;
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <>
      <h3 className="mt-12 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
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
          {rows.map((p) => (
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
    </>
  );
}

function SectionHeading({
  id,
  name,
  desc,
}: {
  id: string;
  name: string;
  desc: string;
}) {
  return (
    <div id={id} className="scroll-mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        {name}
      </h2>
      <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-zinc-400">
        {desc}
      </p>
    </div>
  );
}

/* ================ Eyebrow ================ */

function EyebrowSection() {
  return (
    <section>
      <SectionHeading
        id="eyebrow"
        name="Eyebrow"
        desc="섹션의 카테고리를 작은 라벨로 분리하는 smallcaps 컴포넌트. 카드 박스 없이 영역을 구분하는 가장 가벼운 신호."
      />

      <Example
        title="Default"
        description="기본 톤. 본문 텍스트보다 한 단계 어두운 회색."
        preview={<Eyebrow>Heritage · 2016 — Now</Eyebrow>}
        code={`<Eyebrow>Heritage · 2016 — Now</Eyebrow>`}
      />

      <Example
        title="Accent tone"
        description="강조할 라벨. 진행 중·라이브 같은 상태 표시에."
        preview={
          <div className="space-y-3">
            <Eyebrow tone="accent">Live · 진행 중</Eyebrow>
            <Eyebrow tone="accent">In progress</Eyebrow>
          </div>
        }
        code={`<Eyebrow tone="accent">Live · 진행 중</Eyebrow>`}
      />

      <Example
        title="With heading"
        description="실제 사용 패턴 — 라벨 + 큰 헤딩 + 서브 카피 한 묶음. SectionFrame 안에서 자동으로 이렇게 됩니다."
        preview={
          <div>
            <Eyebrow>Pillars</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
              네 개의 축으로 운영합니다.
            </h2>
            <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-zinc-400">
              만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
            </p>
          </div>
        }
        code={`<Eyebrow>Pillars</Eyebrow>
<h2 className="mt-3 text-2xl font-semibold tracking-tight">
  네 개의 축으로 운영합니다.
</h2>
<p className="mt-3 max-w-[40ch] text-zinc-400">
  만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
</p>`}
      />

      <Example
        title="Custom tone via className"
        description="사전 정의 두 톤 외 색은 className으로. twMerge가 충돌 자동 해결."
        preview={
          <div className="space-y-3">
            <Eyebrow className="text-yellow-400">env not set</Eyebrow>
            <Eyebrow className="text-rose-400">danger zone</Eyebrow>
          </div>
        }
        code={`<Eyebrow className="text-yellow-400">env not set</Eyebrow>
<Eyebrow className="text-rose-400">danger zone</Eyebrow>`}
      />

      <PropsTable
        rows={[
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
    </section>
  );
}

/* ================ SectionFrame ================ */

function SectionFrameSection() {
  return (
    <section>
      <SectionHeading
        id="section-frame"
        name="SectionFrame"
        desc="카드 박스 없이 섹션을 짠다. 안티 카드 5원칙 중 ‘공간(여백) + 헤어라인 + smallcaps 라벨’ 세 가지를 한 컴포넌트로 묶음."
      />

      <Example
        title="Default — eyebrow + title + description"
        description="가장 흔한 사용 패턴. 위쪽 헤어라인이 자동으로 그려집니다."
        preview={
          <SectionFrame
            eyebrow="Pillars"
            title="네 개의 축으로 운영합니다."
            description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
          />
        }
        code={`<SectionFrame
  eyebrow="Pillars"
  title="네 개의 축으로 운영합니다."
  description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
/>`}
      />

      <Example
        title="No divider (첫 섹션)"
        description="페이지 첫 섹션이면 divider={false}. 헤어라인 중복 방지."
        preview={
          <SectionFrame
            divider={false}
            eyebrow="Hero"
            title="첫 섹션은 헤어라인 없이."
            description="페이지 시작부에는 위쪽 라인이 어색하니 끕니다."
          />
        }
        code={`<SectionFrame
  divider={false}
  eyebrow="Hero"
  title="첫 섹션은 헤어라인 없이."
  description="..."
/>`}
      />

      <Example
        title="With ListRow children"
        description="children 영역에 ListRow ul을 넣으면 안티 카드의 표준 섹션 형태가 됩니다."
        preview={
          <SectionFrame
            divider={false}
            eyebrow="Heritage · Education"
            title="교육·에듀테크"
            description="EBS, 아이스크림미디어 등 미디어·교육 분야 프로젝트."
          >
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              <ListRow meta="2024" trailing="아이스크림미디어">
                미니북 저작 퍼블리셔
              </ListRow>
              <ListRow meta="2021" trailing="EBS">
                EBS 온라인 클래스 재구조화
              </ListRow>
            </ul>
          </SectionFrame>
        }
        code={`<SectionFrame
  eyebrow="Heritage · Education"
  title="교육·에듀테크"
  description="..."
>
  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
    <ListRow meta="2024" trailing="아이스크림미디어">
      미니북 저작 퍼블리셔
    </ListRow>
  </ul>
</SectionFrame>`}
      />

      <Example
        title="Heading levels"
        description="페이지 메인 섹션이면 as='h1', 하위 영역이면 as='h3'. 기본 h2."
        preview={
          <div className="space-y-12">
            <SectionFrame
              divider={false}
              as="h1"
              eyebrow="Page"
              title="as='h1' — 페이지 메인"
            />
            <SectionFrame
              eyebrow="Section"
              title="as='h2' — 일반 섹션 (기본)"
            />
            <SectionFrame
              as="h3"
              eyebrow="Sub"
              title="as='h3' — 하위 영역"
            />
          </div>
        }
        code={`<SectionFrame as="h1" eyebrow="Page" title="..." />
<SectionFrame as="h2" eyebrow="Section" title="..." />     // 기본
<SectionFrame as="h3" eyebrow="Sub" title="..." />`}
      />

      <PropsTable
        rows={[
          { name: "eyebrow", type: "ReactNode", desc: "섹션 카테고리 라벨" },
          { name: "title", type: "ReactNode", desc: "섹션 큰 제목" },
          {
            name: "description",
            type: "ReactNode",
            desc: "제목 아래 서브 카피",
          },
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
    </section>
  );
}

/* ================ ListRow ================ */

function ListRowSection() {
  return (
    <section>
      <SectionHeading
        id="list-row"
        name="ListRow"
        desc="카드 그리드 대신 행 레이아웃. divide-y + border-y 와 함께 ul 안에서 사용. 가장 자주 쓰는 컴포넌트."
      />

      <Example
        title="Default"
        description="meta + 본문(children) 만으로 가장 단순. trailing 없으면 우측 정렬 영역이 비어있음."
        preview={
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow meta="2024">미니북 저작 퍼블리셔</ListRow>
            <ListRow meta="2021">EBS 온라인 클래스 재구조화</ListRow>
          </ul>
        }
        code={`<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024">미니북 저작 퍼블리셔</ListRow>
  <ListRow meta="2021">EBS 온라인 클래스 재구조화</ListRow>
</ul>`}
      />

      <Example
        title="With trailing"
        description="우측에 클라이언트, 카테고리 등 보조 정보. Heritage 페이지의 표준 패턴."
        preview={
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow meta="2024" trailing="아이스크림미디어">
              미니북 저작 퍼블리셔
            </ListRow>
            <ListRow meta="2023" trailing="롯데카드">
              mydata 수집 및 admin 개발
            </ListRow>
            <ListRow meta="2022" trailing="라이나생명">
              대고객 디지털채널 재구축
            </ListRow>
          </ul>
        }
        code={`<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024" trailing="아이스크림미디어">
    미니북 저작 퍼블리셔
  </ListRow>
  <ListRow meta="2023" trailing="롯데카드">
    mydata 수집 및 admin 개발
  </ListRow>
</ul>`}
      />

      <Example
        title="Clickable rows"
        description="href 주면 자동으로 a 태그로 감싸지고 hover 시 본문이 액센트 색으로."
        preview={
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow meta="2024" trailing="EBS" href="#">
              EBS 온라인 클래스 재구조화 (클릭 가능)
            </ListRow>
            <ListRow meta="2023" trailing="롯데카드" href="#">
              mydata 수집 및 admin 개발 (클릭 가능)
            </ListRow>
          </ul>
        }
        code={`<ListRow meta="2024" trailing="EBS" href="/heritage/ebs">
  EBS 온라인 클래스 재구조화
</ListRow>`}
      />

      <Example
        title="Mixed content (ReactNode meta/trailing)"
        description="meta·trailing은 string 뿐 아니라 ReactNode. Eyebrow나 Pill 같은 컴포넌트 그대로 넣을 수 있음."
        preview={
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow
              meta={<span className="text-emerald-400">v0.0.2</span>}
              trailing={
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px]">
                  released
                </span>
              }
            >
              docs 디렉토리 + sync 스크립트
            </ListRow>
            <ListRow
              meta={<span className="text-emerald-400">v0.0.1</span>}
              trailing={
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px]">
                  seed
                </span>
              }
            >
              초기 컴포넌트 3종
            </ListRow>
          </ul>
        }
        code={`<ListRow
  meta={<span className="text-emerald-400">v0.0.2</span>}
  trailing={<Pill>released</Pill>}
>
  docs 디렉토리 + sync 스크립트
</ListRow>`}
      />

      <PropsTable
        rows={[
          {
            name: "meta",
            type: "ReactNode",
            desc: "좌측 작은 라벨 (smallcaps). 보통 카테고리·날짜·버전.",
          },
          { name: "trailing", type: "ReactNode", desc: "우측 보조 라벨" },
          {
            name: "children",
            type: "ReactNode",
            desc: "본문 (제목). 가장 두드러지는 텍스트.",
          },
          {
            name: "href",
            type: "string",
            desc: "있으면 a 태그로 감싸지고 hover 시 액센트",
          },
        ]}
      />
    </section>
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
        에 Section 함수 + 여러 Example 추가
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
