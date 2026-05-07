import { useState } from "react";
import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

/**
 * anti-card 컴포넌트 격리 dev. shadcn/ui docs 스타일.
 *
 * 정체성:
 *  1) AI에게 가장 순수한 HTML/CSS를 제공 → AI가 참고
 *  2) 초보자 용어 문제 해소 — 한글 컴포넌트명 + 한글 설명
 *  3) End-user(랜딩) 화면 최적화. 카드 안의 카드 지양.
 *
 * 사이드바: 한글 그룹별 컴포넌트 리스트 (Ready / Soon).
 */

interface NavItem {
  id: string;
  ko: string;
  en: string;
  status: "ready" | "soon" | "planned";
}
interface NavGroup {
  group: string;
  desc?: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    group: "레이아웃",
    desc: "페이지 골격을 짜는 큰 단위",
    items: [
      { id: "header", ko: "헤더", en: "Header", status: "soon" },
      { id: "footer", ko: "푸터", en: "Footer", status: "soon" },
      { id: "container", ko: "컨테이너", en: "Container", status: "soon" },
      { id: "section-frame", ko: "섹션 프레임", en: "SectionFrame", status: "ready" },
      { id: "hairline", ko: "헤어라인 구분선", en: "Hairline", status: "soon" },
      { id: "grid-columns", ko: "그리드·컬럼", en: "Grid", status: "soon" },
    ],
  },
  {
    group: "타이포그래피",
    desc: "글로 위계를 만드는 모든 것",
    items: [
      { id: "eyebrow", ko: "아이브로우 라벨", en: "Eyebrow", status: "ready" },
      { id: "hero-heading", ko: "히어로 큰 제목", en: "Hero Heading", status: "soon" },
      { id: "section-heading", ko: "섹션 제목", en: "Section Heading", status: "soon" },
      { id: "lead", ko: "리드 카피", en: "Lead", status: "soon" },
      { id: "quote", ko: "인용구", en: "Quote", status: "soon" },
      { id: "highlight", ko: "강조 문장", en: "Highlight", status: "soon" },
    ],
  },
  {
    group: "리스트",
    desc: "정보를 나열하는 패턴 (카드 그리드의 대안)",
    items: [
      { id: "list-row", ko: "리스트 행", en: "ListRow", status: "ready" },
      { id: "definition-list", ko: "정의 리스트", en: "Definition List", status: "soon" },
      { id: "stat-list", ko: "통계 숫자 행", en: "Stat List", status: "soon" },
      { id: "timeline", ko: "타임라인", en: "Timeline", status: "soon" },
      { id: "compare-table", ko: "비교 표", en: "Compare Table", status: "soon" },
    ],
  },
  {
    group: "액션",
    desc: "버튼·링크·전환 영역",
    items: [
      { id: "button-primary", ko: "기본 버튼", en: "Button (Primary)", status: "soon" },
      { id: "button-secondary", ko: "보조 버튼", en: "Button (Secondary/Ghost)", status: "soon" },
      { id: "link-row", ko: "링크 행", en: "Link Row", status: "soon" },
      { id: "cta-section", ko: "CTA 섹션", en: "CTA Section", status: "soon" },
      { id: "banner", ko: "알림 배너", en: "Banner", status: "soon" },
    ],
  },
  {
    group: "콘텐츠 블록",
    desc: "본문 영역에 들어가는 단위",
    items: [
      { id: "callout", ko: "강조 박스", en: "Callout", status: "soon" },
      { id: "faq", ko: "FAQ 아코디언", en: "FAQ", status: "soon" },
      { id: "pricing-table", ko: "가격 표", en: "Pricing Table", status: "soon" },
      { id: "steps", ko: "단계 (3·4단계)", en: "Steps", status: "soon" },
      { id: "feature-row", ko: "특징 나열 행", en: "Feature Row", status: "soon" },
    ],
  },
  {
    group: "신뢰·증거",
    desc: "이 사이트가 왜 믿을만한가",
    items: [
      { id: "client-logos", ko: "클라이언트 로고 띠", en: "Client Logos", status: "soon" },
      { id: "testimonial", ko: "사용자 후기", en: "Testimonial", status: "soon" },
      { id: "stat-block", ko: "큰 통계 블록", en: "Stat Block", status: "soon" },
      { id: "case-study", ko: "케이스 스터디", en: "Case Study", status: "soon" },
    ],
  },
  {
    group: "미디어",
    desc: "이미지·영상·갤러리",
    items: [
      { id: "image", ko: "이미지", en: "Image", status: "soon" },
      { id: "video", ko: "비디오 플레이어", en: "Video", status: "soon" },
      { id: "gallery", ko: "갤러리", en: "Gallery", status: "soon" },
      { id: "carousel", ko: "캐러셀·슬라이드", en: "Carousel", status: "planned" },
    ],
  },
  {
    group: "폼",
    desc: "입력·선택. 안티 카드 영역에선 최소한.",
    items: [
      { id: "input", ko: "입력 필드", en: "Input", status: "soon" },
      { id: "textarea", ko: "여러 줄 입력", en: "Textarea", status: "soon" },
      { id: "select", ko: "드롭다운", en: "Select", status: "soon" },
      { id: "checkbox-radio", ko: "체크박스·라디오", en: "Checkbox/Radio", status: "soon" },
      { id: "pill", ko: "필 / 태그", en: "Pill / Tag", status: "soon" },
    ],
  },
  {
    group: "인터랙션",
    desc: "움직임·반응. 정체성을 만드는 시그니처.",
    items: [
      { id: "fade-in", ko: "부드러운 등장", en: "Fade-in on Scroll", status: "soon" },
      { id: "hover-accent", ko: "호버 강조", en: "Hover Accent", status: "soon" },
      { id: "scroll-progress", ko: "스크롤 진행 표시", en: "Scroll Progress", status: "soon" },
      { id: "marquee", ko: "흐르는 띠", en: "Marquee", status: "soon" },
      { id: "wave-card", ko: "물결 진행 카드", en: "Wave Card", status: "soon" },
    ],
  },
  {
    group: "페이지 패턴",
    desc: "한 페이지 단위의 큰 조합",
    items: [
      { id: "hero-pattern", ko: "히어로 (메인 첫 화면)", en: "Hero", status: "soon" },
      { id: "sectors-pattern", ko: "섹터 리스트 페이지", en: "Sectors", status: "soon" },
      { id: "pricing-pattern", ko: "가격 페이지", en: "Pricing", status: "soon" },
      { id: "talk-pattern", ko: "Talk·Contact", en: "Talk / Contact", status: "soon" },
      { id: "empty-error", ko: "빈 상태·404", en: "Empty / 404", status: "soon" },
    ],
  },
];

const VERSION = "0.0.3";

const STATUS_META: Record<NavItem["status"], { label: string; cls: string }> = {
  ready: {
    label: "ready",
    cls: "text-emerald-400",
  },
  soon: {
    label: "soon",
    cls: "text-zinc-600",
  },
  planned: {
    label: "planned",
    cls: "text-zinc-700",
  },
};

export default function App() {
  const [filter, setFilter] = useState<"all" | "ready">("all");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Header />
      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[240px_1fr]">
        <Sidebar filter={filter} onFilterChange={setFilter} />
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

interface SidebarProps {
  filter: "all" | "ready";
  onFilterChange: (f: "all" | "ready") => void;
}

function Sidebar({ filter, onFilterChange }: SidebarProps) {
  const readyCount = NAV.flatMap((g) => g.items).filter(
    (i) => i.status === "ready"
  ).length;
  const totalCount = NAV.flatMap((g) => g.items).length;

  return (
    <aside className="self-start md:sticky md:top-10 md:max-h-[calc(100vh-5rem)] md:overflow-y-auto md:pr-2">
      {/* Filter */}
      <div className="flex items-center gap-1 rounded-md border border-white/[0.06] p-0.5">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={`flex-1 rounded px-2 py-1 text-[11px] transition-colors ${
            filter === "all"
              ? "bg-white/[0.06] text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          전체 {totalCount}
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("ready")}
          className={`flex-1 rounded px-2 py-1 text-[11px] transition-colors ${
            filter === "ready"
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          준비됨 {readyCount}
        </button>
      </div>

      <div className="mt-6 space-y-7">
        {NAV.map((group) => {
          const items =
            filter === "ready"
              ? group.items.filter((i) => i.status === "ready")
              : group.items;
          if (items.length === 0) return null;

          return (
            <div key={group.group}>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                {group.group}
              </p>
              {group.desc && (
                <p className="mt-1 text-[11.5px] leading-snug text-zinc-600">
                  {group.desc}
                </p>
              )}
              <ul className="mt-3 space-y-1.5 border-l border-white/[0.06] pl-3 text-[13px]">
                {items.map((item) => {
                  const meta = STATUS_META[item.status];
                  const isClickable = item.status === "ready";
                  return (
                    <li key={item.id}>
                      {isClickable ? (
                        <a
                          href={`#${item.id}`}
                          className="flex items-baseline justify-between gap-2 text-zinc-300 transition-colors hover:text-emerald-400"
                        >
                          <span>{item.ko}</span>
                          <span className={`text-[10px] ${meta.cls}`}>
                            {meta.label}
                          </span>
                        </a>
                      ) : (
                        <span className="flex items-baseline justify-between gap-2 text-zinc-600">
                          <span>{item.ko}</span>
                          <span className={`text-[10px] ${meta.cls}`}>
                            {meta.label}
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-white/[0.06] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          Docs
        </p>
        <ul className="mt-3 space-y-1 border-l border-white/[0.06] pl-3 text-[13px]">
          <li>
            <a
              href="https://freeive.com/anti-card/manifesto"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-zinc-400 transition-colors hover:text-emerald-400"
            >
              Manifesto
            </a>
          </li>
          <li>
            <a
              href="https://freeive.com/anti-card/admin-vs-end-user"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-zinc-400 transition-colors hover:text-emerald-400"
            >
              Admin vs End-user
            </a>
          </li>
          <li>
            <a
              href="https://freeive.com/anti-card/ai-skill"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-zinc-400 transition-colors hover:text-emerald-400"
            >
              AI Skill
            </a>
          </li>
        </ul>
      </div>
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
      <p className="mt-5 max-w-[64ch] text-[15px] leading-relaxed text-zinc-400">
        AI 시대의 UI 프레임워크는 방식이 바꿔야 합니다. 안티 카드는{" "}
        <strong className="text-zinc-200">가장 순수한 HTML/CSS</strong>를
        제공하고, AI가 이 디자인과 구조를 참고합니다. 사이드바의 컴포넌트 리스트는
        End-user(랜딩) 화면 만들 때 자주 쓰는 패턴들을 한글로 정리한 것입니다.
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-2 max-w-[60ch] text-[13.5px] text-zinc-400 sm:grid-cols-2">
        <li className="flex gap-2">
          <span className="text-emerald-400">▸</span>
          <span>
            <strong className="text-zinc-200">ready</strong> — 컴포넌트 + 디자인 +
            HTML 레퍼런스 완성
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-zinc-600">▸</span>
          <span>
            <strong className="text-zinc-300">soon</strong> — 곧 추가 예정 (사용자
            우선순위에 따라)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-zinc-700">▸</span>
          <span>
            <strong className="text-zinc-400">planned</strong> — 0.x 후반 또는 1.0
            로드맵
          </span>
        </li>
      </ul>
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
  ko,
  en,
  desc,
}: {
  id: string;
  ko: string;
  en: string;
  desc: string;
}) {
  return (
    <div id={id} className="scroll-mt-10">
      <div className="flex items-baseline gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {ko}
        </h2>
        <span className="text-[12px] text-zinc-500">
          <code className="text-zinc-400">{`<${en}>`}</code>
        </span>
      </div>
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
        ko="아이브로우 라벨"
        en="Eyebrow"
        desc="섹션의 카테고리를 작은 라벨로 분리하는 smallcaps 컴포넌트. 카드 박스 없이 영역을 구분하는 가장 가벼운 신호."
      />

      <Example
        title="Default — 기본 톤"
        description="본문 텍스트보다 한 단계 어두운 회색."
        preview={<Eyebrow>Heritage · 2016 — Now</Eyebrow>}
        code={`<Eyebrow>Heritage · 2016 — Now</Eyebrow>`}
      />

      <Example
        title="Accent — 강조 톤"
        description="진행 중·라이브 같은 상태 표시에."
        preview={
          <div className="space-y-3">
            <Eyebrow tone="accent">Live · 진행 중</Eyebrow>
            <Eyebrow tone="accent">In progress</Eyebrow>
          </div>
        }
        code={`<Eyebrow tone="accent">Live · 진행 중</Eyebrow>`}
      />

      <Example
        title="With heading — 실제 사용 패턴"
        description="라벨 + 큰 헤딩 + 서브 카피 한 묶음. SectionFrame 안에서 자동으로 이렇게 됩니다."
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
        title="Custom tone — className으로 색"
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
        ko="섹션 프레임"
        en="SectionFrame"
        desc="카드 박스 없이 섹션을 짜는 헤어라인 + 여백 + 라벨 묶음. 안티 카드 5원칙 중 세 가지를 한 컴포넌트로."
      />

      <Example
        title="Default — 라벨 + 제목 + 설명"
        description="가장 흔한 사용 패턴. 위쪽 헤어라인이 자동."
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
        title="No divider — 첫 섹션"
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
/>`}
      />

      <Example
        title="With ListRow — 가장 자주 쓰는 조합"
        description="children에 ListRow ul을 넣으면 안티 카드 표준 섹션."
        preview={
          <SectionFrame
            divider={false}
            eyebrow="Heritage · Education"
            title="교육·에듀테크"
            description="EBS, 아이스크림미디어 등."
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
        title="Heading levels — h1 / h2 / h3"
        description="페이지 메인 섹션이면 as='h1', 하위 영역이면 as='h3'. 기본 h2."
        preview={
          <div className="space-y-12">
            <SectionFrame
              divider={false}
              as="h1"
              eyebrow="Page"
              title="as='h1' — 페이지 메인"
            />
            <SectionFrame eyebrow="Section" title="as='h2' — 일반 (기본)" />
            <SectionFrame as="h3" eyebrow="Sub" title="as='h3' — 하위" />
          </div>
        }
        code={`<SectionFrame as="h1" eyebrow="Page" title="..." />
<SectionFrame eyebrow="Section" title="..." />     // 기본 h2
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
        ko="리스트 행"
        en="ListRow"
        desc="카드 그리드 대신 행 레이아웃. divide-y + border-y 와 함께 ul 안에서 사용. 가장 자주 쓰는 컴포넌트."
      />

      <Example
        title="Default — meta + 본문"
        description="가장 단순. trailing 없으면 우측 영역 비어있음."
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
        title="With trailing — 표준 패턴"
        description="우측에 클라이언트, 카테고리 등 보조 정보. Heritage 페이지의 표준."
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
</ul>`}
      />

      <Example
        title="Clickable — href"
        description="href 주면 자동 a 태그, hover 시 액센트 색."
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
        title="Mixed content — meta·trailing에 ReactNode"
        description="meta·trailing은 string 뿐 아니라 ReactNode."
        preview={
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow
              meta={<span className="text-emerald-400">v0.0.3</span>}
              trailing={
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px]">
                  released
                </span>
              }
            >
              정체성 정리 + AI Skill / docs / HTML 레퍼런스
            </ListRow>
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
          </ul>
        }
        code={`<ListRow
  meta={<span className="text-emerald-400">v0.0.3</span>}
  trailing={<Pill>released</Pill>}
>
  정체성 정리 + AI Skill
</ListRow>`}
      />

      <PropsTable
        rows={[
          {
            name: "meta",
            type: "ReactNode",
            desc: "좌측 작은 라벨. 보통 카테고리·날짜·버전.",
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
        의 NAV 배열에 등록 + Section 추가
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
