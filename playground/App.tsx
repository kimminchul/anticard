import { useEffect, useState, type ReactNode } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { Eyebrow, SectionFrame, ListRow } from "@freeive/anti-card";

/**
 * anti-card 컴포넌트 격리 dev. 각 Example이 자체 6탭(디자인/프롬프트/HTML/CSS/JS/React).
 *
 * 새 컴포넌트 추가:
 *  1) src/components/foo.tsx + src/index.ts export
 *  2) READY_SECTIONS 매핑 + Example[] 데이터 작성
 *  3) NAV에 status: "ready"
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
    desc: "정보 나열 (카드 그리드의 대안)",
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
    desc: "버튼·링크·전환",
    items: [
      { id: "button-primary", ko: "기본 버튼", en: "Button (Primary)", status: "soon" },
      { id: "button-secondary", ko: "보조 버튼", en: "Button (Secondary)", status: "soon" },
      { id: "link-row", ko: "링크 행", en: "Link Row", status: "soon" },
      { id: "cta-section", ko: "CTA 섹션", en: "CTA Section", status: "soon" },
      { id: "banner", ko: "알림 배너", en: "Banner", status: "soon" },
    ],
  },
  {
    group: "콘텐츠 블록",
    desc: "본문에 들어가는 단위",
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
    desc: "움직임·반응. 시그니처.",
    items: [
      { id: "fade-in", ko: "부드러운 등장", en: "Fade-in on Scroll", status: "soon" },
      { id: "hover-accent", ko: "호버 강조", en: "Hover Accent", status: "soon" },
      { id: "scroll-progress", ko: "스크롤 진행", en: "Scroll Progress", status: "soon" },
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
  ready: { label: "ready", cls: "text-emerald-600 dark:text-emerald-400" },
  soon: { label: "soon", cls: "text-zinc-400 dark:text-zinc-500" },
  planned: { label: "planned", cls: "text-zinc-300 dark:text-zinc-600" },
};

/* ================ Example data shape ================ */

interface Example {
  index: string;
  badge: string;
  title: string;
  description: string;
  preview: ReactNode;
  prompt: string;
  html: string;
  css?: string;       // 비워두면 "Tailwind만으로 충분" 안내
  cssHtml?: string;   // CSS와 함께 쓸 plain HTML
  js?: string;        // 비워두면 "JS 필요 없음"
  react: string;
}

interface ComponentDef {
  id: string;
  ko: string;
  en: string;
  desc: string;
  examples: Example[];
  props: Array<{ name: string; type: string; default?: string; desc: string }>;
}

/* ================ App ================ */

const READY_SECTIONS: Record<string, () => JSX.Element> = {
  intro: Intro,
  eyebrow: () => <ComponentPage def={EYEBROW_DEF} />,
  "section-frame": () => <ComponentPage def={SECTION_FRAME_DEF} />,
  "list-row": () => <ComponentPage def={LIST_ROW_DEF} />,
};

const DEFAULT_ID = "intro";

export default function App() {
  const [filter, setFilter] = useState<"all" | "ready">("all");
  const [activeId, setActiveId] = useState<string>(DEFAULT_ID);

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace("#", "") || DEFAULT_ID;
      if (READY_SECTIONS[id]) {
        setActiveId(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const ActiveSection = READY_SECTIONS[activeId] ?? Intro;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Header />
      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
        <Sidebar filter={filter} onFilterChange={setFilter} activeId={activeId} />
        <main className="min-w-0">
          <ActiveSection />
          <div className="mt-24 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================ Layout ================ */

function Header() {
  return (
    <header className="flex items-baseline justify-between border-b border-zinc-200/60 pb-5 dark:border-white/[0.06]">
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          anti-card
        </h1>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-600 dark:border-white/15 dark:text-zinc-300">
          v{VERSION}
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          playground
        </span>
      </div>
      <nav className="flex items-center gap-4 text-[12.5px] text-zinc-500 dark:text-zinc-400">
        <ThemeToggle />
        <a href="https://github.com/kimminchul/anticard" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
          Github
        </a>
        <a href="https://freeive.com/anti-card" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
          freeive.com/anti-card
        </a>
      </nav>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("anti-card-theme") as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("anti-card-theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1 text-[11px] transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:border-white/15 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400"
      title={theme === "dark" ? "라이트 모드로" : "다크 모드로"}
    >
      <span aria-hidden>{theme === "dark" ? "☾" : "☀"}</span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

interface SidebarProps {
  filter: "all" | "ready";
  onFilterChange: (f: "all" | "ready") => void;
  activeId: string;
}

function Sidebar({ filter, onFilterChange, activeId }: SidebarProps) {
  const readyCount = NAV.flatMap((g) => g.items).filter((i) => i.status === "ready").length;
  const totalCount = NAV.flatMap((g) => g.items).length;

  return (
    <aside className="thin-scroll self-start md:sticky md:top-10 md:max-h-[calc(100vh-5rem)] md:overflow-y-auto md:pr-6">
      <a
        href="#intro"
        className={`mb-5 block rounded-md px-3 py-2.5 text-[14px] transition-colors ${
          activeId === "intro"
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-white/[0.04] dark:hover:text-zinc-50"
        }`}
      >
        개요
      </a>

      <div className="flex items-center gap-1 rounded-md border border-zinc-200 p-0.5 dark:border-white/[0.08]">
        <button type="button" onClick={() => onFilterChange("all")} className={`flex-1 rounded px-2 py-1.5 text-[12px] transition-colors ${filter === "all" ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.08] dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
          전체 {totalCount}
        </button>
        <button type="button" onClick={() => onFilterChange("ready")} className={`flex-1 rounded px-2 py-1.5 text-[12px] transition-colors ${filter === "ready" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
          준비됨 {readyCount}
        </button>
      </div>

      <div className="mt-7 space-y-7">
        {NAV.map((group) => {
          const items = filter === "ready" ? group.items.filter((i) => i.status === "ready") : group.items;
          if (items.length === 0) return null;
          return (
            <div key={group.group}>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
                {group.group}
              </p>
              {group.desc && <p className="mt-1 text-[12px] leading-snug text-zinc-500">{group.desc}</p>}
              <ul className="mt-3.5 space-y-1.5 border-l border-zinc-200 pl-3.5 text-[14px] dark:border-white/[0.08]">
                {items.map((item) => {
                  const meta = STATUS_META[item.status];
                  const isClickable = item.status === "ready";
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      {isClickable ? (
                        <a
                          href={`#${item.id}`}
                          className={`-ml-3.5 flex items-baseline justify-between gap-2 rounded-r-md py-1 pl-3.5 pr-2 transition-colors ${isActive ? "border-l-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400" : "border-l-2 border-transparent text-zinc-700 hover:border-zinc-300 hover:text-emerald-700 dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-emerald-400"}`}
                        >
                          <span>{item.ko}</span>
                          <span className={`text-[11px] ${isActive ? "text-emerald-600 dark:text-emerald-400" : meta.cls}`}>{meta.label}</span>
                        </a>
                      ) : (
                        <span className="flex items-baseline justify-between gap-2 py-1 text-zinc-400 dark:text-zinc-500">
                          <span>{item.ko}</span>
                          <span className={`text-[11px] ${meta.cls}`}>{meta.label}</span>
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

      <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-white/[0.08]">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">Docs</p>
        <ul className="mt-3.5 space-y-1.5 border-l border-zinc-200 pl-3.5 text-[14px] dark:border-white/[0.08]">
          <li><a href="https://freeive.com/anti-card/manifesto" target="_blank" rel="noopener noreferrer" className="block py-1 text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">Manifesto</a></li>
          <li><a href="https://freeive.com/anti-card/admin-vs-end-user" target="_blank" rel="noopener noreferrer" className="block py-1 text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">Admin vs End-user</a></li>
          <li><a href="https://freeive.com/anti-card/ai-skill" target="_blank" rel="noopener noreferrer" className="block py-1 text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">AI Skill</a></li>
        </ul>
      </div>
    </aside>
  );
}

function Intro() {
  return (
    <section>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">Playground</p>
      <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
        컴포넌트 시연실
      </h2>
      <p className="mt-5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        AI 시대의 UI 프레임워크는 방식이 바꿔야 합니다. 안티 카드는{" "}
        <strong className="text-zinc-900 dark:text-zinc-200">가장 순수한 HTML/CSS</strong>를 제공하고, AI가 이 디자인과
        구조를 참고합니다. 각 Example마다{" "}
        <strong className="text-zinc-900 dark:text-zinc-200">디자인 / 프롬프트 / HTML / CSS / JS / React</strong> 탭을 제공합니다.
      </p>
      <div className="mt-12 border-t border-zinc-200 pt-10 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">준비된 컴포넌트</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500">좌측 사이드바에서도 선택할 수 있습니다.</p>
        <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200/40 dark:border-white/[0.08] dark:bg-white/[0.02] sm:grid-cols-3">
          {[
            { id: "eyebrow", ko: "아이브로우 라벨", en: "Eyebrow", desc: "섹션 카테고리 라벨 (smallcaps)" },
            { id: "section-frame", ko: "섹션 프레임", en: "SectionFrame", desc: "카드 없는 섹션 + 헤어라인" },
            { id: "list-row", ko: "리스트 행", en: "ListRow", desc: "카드 그리드 대신 행 레이아웃" },
          ].map((c) => (
            <li key={c.id} className="bg-white dark:bg-zinc-950">
              <a href={`#${c.id}`} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
                <span className="text-[11px] uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">ready</span>
                <span className="text-[15px] font-medium text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  {c.ko} <code className="ml-1 text-[12px] text-zinc-500 dark:text-zinc-400">{`<${c.en}>`}</code>
                </span>
                <span className="text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{c.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================ Component page ================ */

function ComponentPage({ def }: { def: ComponentDef }) {
  return (
    <section>
      <div id={def.id} className="scroll-mt-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">Component</p>
        <div className="mt-3 flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{def.ko}</h2>
          <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
            <code>{`<${def.en}>`}</code>
          </span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{def.desc}</p>
      </div>

      {/* Examples — 각 example이 자체 6탭 */}
      <div className="mt-10 space-y-14">
        {def.examples.map((ex) => (
          <ExampleBlock key={ex.index} example={ex} />
        ))}
      </div>

      <PropsTable rows={def.props} />
    </section>
  );
}

/* ================ Example block — 자체 6탭 ================ */

type TabId = "design" | "prompt" | "html" | "css" | "js" | "react";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "design", label: "디자인" },
  { id: "prompt", label: "프롬프트" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
  { id: "react", label: "React" },
];

function ExampleBlock({ example }: { example: Example }) {
  const [tab, setTab] = useState<TabId>("design");

  return (
    <div className="overflow-hidden rounded-lg border border-dashed border-zinc-300 dark:border-white/[0.12]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dashed border-zinc-300 bg-zinc-50/60 px-5 py-3 dark:border-white/[0.12] dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400/80">EX. {example.index}</span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">Example</span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400">
            {example.badge}
          </span>
        </div>
        <span className="text-[12px] tracking-[0.02em] text-zinc-700 dark:text-zinc-300">{example.title}</span>
      </div>

      {/* Tab nav */}
      <div className="border-b border-dashed border-zinc-300 bg-zinc-50/40 px-3 pt-3 dark:border-white/[0.12] dark:bg-white/[0.01]">
        <div className="flex flex-wrap">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative px-3 py-2 text-[12.5px] transition-colors ${
                  active
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {t.label}
                {active && <span className="absolute inset-x-2 -bottom-px h-px bg-emerald-500 dark:bg-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-zinc-950">
        {tab === "design" && (
          <div className="canvas-surface relative p-8 md:p-12">
            <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-emerald-500/30 dark:border-emerald-400/30" />
            {example.preview}
          </div>
        )}
        {tab === "prompt" && <PromptInline prompt={example.prompt} />}
        {tab === "html" && <CodeInline code={example.html} language="HTML (Tailwind)" />}
        {tab === "css" && (
          example.css ? (
            <>
              <CodeInline code={example.css} language="CSS (vanilla)" />
              {example.cssHtml && <CodeInline code={example.cssHtml} language="HTML (vanilla CSS와 함께)" />}
            </>
          ) : (
            <NoteInline title="Tailwind만으로 충분" body="이 example은 별도 vanilla CSS 없이도 Tailwind 클래스만으로 동작합니다. 위 HTML 탭의 코드를 그대로 사용하세요." />
          )
        )}
        {tab === "js" && (
          example.js ? (
            <CodeInline code={example.js} language="JavaScript" />
          ) : (
            <NoteInline title="JS 필요 없음" body="이 example은 정적이라 JavaScript 인터랙션이 필요 없습니다." />
          )
        )}
        {tab === "react" && <CodeInline code={example.react} language="React" />}
      </div>

      {/* Description below tab content */}
      <div className="border-t border-dashed border-zinc-300 bg-zinc-50/60 px-5 py-3.5 dark:border-white/[0.12] dark:bg-white/[0.02]">
        <p className="text-[13px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {example.title}
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {example.description}
        </p>
      </div>
    </div>
  );
}

/* ================ Tab content components ================ */

/** 라벨 → Prism 언어 매핑 */
function detectLanguage(label: string): Language {
  const lower = label.toLowerCase();
  if (lower.includes("html")) return "markup";
  if (lower.includes("css")) return "css";
  if (lower.includes("javascript") || lower.includes("js")) return "javascript";
  if (lower.includes("react") || lower.includes("tsx")) return "tsx";
  if (lower.includes("typescript") || lower.includes("ts")) return "typescript";
  return "markup";
}

/** html.classList의 'dark' 변화를 감지하는 훅 */
function useIsDark(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

function CodeInline({ code, language }: { code: string; language: string }) {
  const lang = detectLanguage(language);
  const isDark = useIsDark();
  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:border-white/[0.04] dark:bg-white/[0.02]">
        <span>{language}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(code)}
          className="rounded border border-zinc-300 px-2 py-0.5 text-[10.5px] tracking-normal text-zinc-700 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400"
        >
          copy
        </button>
      </div>
      <Highlight
        code={code.trimEnd()}
        language={lang}
        theme={isDark ? themes.vsDark : themes.vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto px-5 py-4 text-[12.5px] leading-relaxed`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function PromptInline({ prompt }: { prompt: string }) {
  return (
    <div>
      <div className="bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03]">
        <div className="flex items-center justify-between border-b border-emerald-500/20 px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-emerald-700 dark:border-emerald-500/15 dark:text-emerald-400">
          <span>Prompt</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(prompt)}
            className="rounded border border-emerald-500/40 px-2 py-0.5 text-[10.5px] tracking-normal text-emerald-700 transition-colors hover:bg-emerald-500/10 dark:border-emerald-400/30 dark:text-emerald-400"
          >
            copy
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-4 text-[13px] leading-relaxed text-zinc-900 dark:text-zinc-100">
          {prompt}
        </pre>
      </div>
      <p className="border-t border-zinc-200 bg-zinc-50/60 px-5 py-3 text-[12.5px] leading-relaxed text-zinc-600 dark:border-white/[0.04] dark:bg-white/[0.01] dark:text-zinc-400">
        Claude / Cursor 등에 그대로 붙여넣으면 안티 카드 톤으로 만들어집니다.{" "}
        <code className="rounded bg-zinc-200/60 px-1 py-0.5 text-[11.5px] text-zinc-800 dark:bg-white/5 dark:text-zinc-200">skill/CLAUDE.md</code>
        를 같이 적용해두면 더 정확합니다.
      </p>
    </div>
  );
}

function NoteInline({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500">{title}</p>
      <p className="mx-auto mt-3 max-w-[44ch] text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">{body}</p>
    </div>
  );
}

/* ================ Props table ================ */

function PropsTable({
  rows,
}: {
  rows: Array<{ name: string; type: string; default?: string; desc: string }>;
}) {
  return (
    <>
      <h3 className="mt-12 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">Props</h3>
      <table className="mt-3 w-full text-[13px]">
        <thead>
          <tr className="border-b border-zinc-200 text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:border-white/[0.06]">
            <th className="py-2 text-left font-medium">Name</th>
            <th className="py-2 text-left font-medium">Type</th>
            <th className="py-2 text-left font-medium">Default</th>
            <th className="py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name} className="border-b border-zinc-100 dark:border-white/[0.04]">
              <td className="py-2.5 align-top">
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px] text-zinc-900 dark:bg-white/5 dark:text-zinc-100">{p.name}</code>
              </td>
              <td className="py-2.5 align-top text-emerald-700 dark:text-emerald-400">
                <code className="text-[12px]">{p.type}</code>
              </td>
              <td className="py-2.5 align-top text-zinc-500 dark:text-zinc-400">
                {p.default ? <code className="text-[12px]">{p.default}</code> : <span className="text-zinc-400 dark:text-zinc-600">—</span>}
              </td>
              <td className="py-2.5 align-top text-zinc-700 dark:text-zinc-300">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Footer() {
  return (
    <footer className="text-[12.5px] text-zinc-500">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-medium text-amber-700 dark:text-amber-400">
          dev only
        </span>
        <span className="text-[12px] text-zinc-500">
          이 playground는 패키지 dev 전용. npm 발행 시 제외됨 (.npmignore).
        </span>
      </div>
      <p>
        새 컴포넌트 추가:{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11.5px] text-zinc-700 dark:bg-white/5 dark:text-zinc-300">src/components/foo.tsx</code> →{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11.5px] text-zinc-700 dark:bg-white/5 dark:text-zinc-300">src/index.ts</code> export →{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11.5px] text-zinc-700 dark:bg-white/5 dark:text-zinc-300">playground/App.tsx</code> 의 ComponentDef + READY_SECTIONS 등록
      </p>
      <p className="mt-2">
        사이트(:3000) 통합:{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11.5px] text-zinc-700 dark:bg-white/5 dark:text-zinc-300">npm run sync</code>
      </p>
    </footer>
  );
}

/* ================ Component definitions ================ */

const EYEBROW_DEF: ComponentDef = {
  id: "eyebrow",
  ko: "아이브로우 라벨",
  en: "Eyebrow",
  desc: "섹션의 카테고리를 작은 라벨로 분리하는 smallcaps 컴포넌트. 카드 박스 없이 영역을 구분하는 가장 가벼운 신호.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 톤 (neutral)",
      description: "본문 텍스트보다 한 단계 어두운 회색.",
      preview: <Eyebrow>Heritage · 2016 — Now</Eyebrow>,
      prompt: `섹션 위에 작은 카테고리 라벨(eyebrow)을 만들어줘.
- 12px 크기, 대문자, 자간 0.08em, font-medium
- 색은 zinc-500 (어두운 회색)
- shadcn 카드 헤더 같은 게 아니라 정말 작은 한 줄 라벨
- 박스로 감싸지 말고, 단순한 <p> 한 줄`,
      html: `<p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500 font-medium">
  Heritage · 2016 — Now
</p>`,
      css: `.eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
  color: #71717a;
  margin: 0;
}`,
      cssHtml: `<p class="eyebrow">Heritage · 2016 — Now</p>`,
      react: `import { Eyebrow } from "@freeive/anti-card";

<Eyebrow>Heritage · 2016 — Now</Eyebrow>`,
    },
    {
      index: "02",
      badge: "accent",
      title: "강조 톤 (accent)",
      description: "진행 중·라이브 같은 상태 표시에. 색만 emerald-400.",
      preview: (
        <div className="space-y-3">
          <Eyebrow tone="accent">Live · 진행 중</Eyebrow>
          <Eyebrow tone="accent">In progress</Eyebrow>
        </div>
      ),
      prompt: `진행 중 / 라이브 상태를 표시하는 작은 라벨을 만들어줘.
기본 eyebrow와 동일한 사이즈·자간·굵기.
색만 emerald-400 (#34d399) 으로 강조.`,
      html: `<p class="text-[12px] uppercase tracking-[0.08em] text-emerald-400 font-medium">
  Live · 진행 중
</p>`,
      css: `.eyebrow.accent {
  color: #34d399; /* emerald-400 */
}`,
      cssHtml: `<p class="eyebrow accent">Live · 진행 중</p>`,
      react: `<Eyebrow tone="accent">Live · 진행 중</Eyebrow>`,
    },
    {
      index: "03",
      badge: "real-world",
      title: "실제 사용 패턴",
      description: "라벨 + 큰 헤딩 + 서브 카피 묶음. SectionFrame이 자동으로 만드는 구조.",
      preview: (
        <div>
          <Eyebrow>Pillars</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            네 개의 축으로 운영합니다.
          </h2>
          <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
          </p>
        </div>
      ),
      prompt: `섹션 헤더를 만들어줘.
- 작은 eyebrow 라벨 (12px uppercase smallcaps)
- 그 아래 큰 헤딩 (text-2xl font-semibold tracking-tight)
- 그 아래 서브 카피 (max-w-40ch text-[14px] text-zinc-400)
- 카드 박스 없이`,
      html: `<section>
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500 font-medium">
    Pillars
  </p>
  <h2 class="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
    네 개의 축으로 운영합니다.
  </h2>
  <p class="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-zinc-400">
    만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
  </p>
</section>`,
      react: `<section>
  <Eyebrow>Pillars</Eyebrow>
  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
    네 개의 축으로 운영합니다.
  </h2>
  <p className="mt-3 max-w-[40ch] text-zinc-400">
    만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
  </p>
</section>`,
    },
    {
      index: "04",
      badge: "custom",
      title: "커스텀 색 (className)",
      description: "사전 정의 두 톤 외 색은 className으로. twMerge가 충돌 자동 해결.",
      preview: (
        <div className="space-y-3">
          <Eyebrow className="text-yellow-400">env not set</Eyebrow>
          <Eyebrow className="text-rose-400">danger zone</Eyebrow>
        </div>
      ),
      prompt: `eyebrow와 같은 톤이지만 색이 다른 라벨이 필요해.
- 경고: yellow-400
- 위험: rose-400
className으로 색만 덮어쓰면 됨.`,
      html: `<p class="text-[12px] uppercase tracking-[0.08em] text-yellow-400 font-medium">
  env not set
</p>
<p class="text-[12px] uppercase tracking-[0.08em] text-rose-400 font-medium">
  danger zone
</p>`,
      react: `<Eyebrow className="text-yellow-400">env not set</Eyebrow>
<Eyebrow className="text-rose-400">danger zone</Eyebrow>`,
    },
  ],
  props: [
    { name: "tone", type: '"neutral" | "accent"', default: '"neutral"', desc: "accent는 액센트 컬러로 강조" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가 (twMerge로 충돌 해결)" },
    { name: "...rest", type: "HTMLAttributes<HTMLParagraphElement>", desc: "표준 p 속성" },
  ],
};

const SECTION_FRAME_DEF: ComponentDef = {
  id: "section-frame",
  ko: "섹션 프레임",
  en: "SectionFrame",
  desc: "카드 박스 없이 섹션을 짜는 헤어라인 + 여백 + 라벨 묶음. 안티 카드 5원칙 중 세 가지를 한 컴포넌트로.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 라벨 + 제목 + 설명",
      description: "가장 흔한 사용 패턴. 위쪽 헤어라인이 자동.",
      preview: (
        <SectionFrame
          eyebrow="Pillars"
          title="네 개의 축으로 운영합니다."
          description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
        />
      ),
      prompt: `섹션 프레임을 만들어줘. 카드 박스 없이.
- 위쪽에 1px 헤어라인 (border-t border-white/[0.06])
- 위·아래 패딩 py-16 md:py-20
- eyebrow 라벨 (12px uppercase smallcaps)
- 그 아래 큰 헤딩 (text-2xl md:text-3xl font-semibold tracking-tight)
- 그 아래 서브 카피 (text-[15px] text-zinc-300)`,
      html: `<section class="border-t border-white/[0.06] py-16 md:py-20">
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500 font-medium">
    Pillars
  </p>
  <h2 class="mt-3 max-w-[20ch] text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50">
    네 개의 축으로 운영합니다.
  </h2>
  <p class="mt-6 text-[15px] leading-relaxed text-zinc-300">
    만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
  </p>
</section>`,
      css: `.section-frame {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4rem 0;
}
@media (min-width: 768px) {
  .section-frame { padding: 5rem 0; }
}`,
      cssHtml: `<section class="section-frame">
  <p class="eyebrow">Pillars</p>
  <h2>네 개의 축으로 운영합니다.</h2>
  <p>...</p>
</section>`,
      react: `<SectionFrame
  eyebrow="Pillars"
  title="네 개의 축으로 운영합니다."
  description="만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축."
/>`,
    },
    {
      index: "02",
      badge: "first-section",
      title: "첫 섹션 (divider 끔)",
      description: "페이지 첫 섹션이면 divider={false}. 헤어라인 중복 방지.",
      preview: (
        <SectionFrame
          divider={false}
          eyebrow="Hero"
          title="첫 섹션은 헤어라인 없이."
          description="페이지 시작부에는 위쪽 라인이 어색하니 끕니다."
        />
      ),
      prompt: `페이지 첫 섹션 (Hero)이라 위쪽 헤어라인은 빼줘.
나머지는 기본 SectionFrame과 동일.`,
      html: `<section class="py-16 md:py-20">
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500 font-medium">Hero</p>
  <h2 class="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50">
    첫 섹션은 헤어라인 없이.
  </h2>
  <p class="mt-6 text-[15px] leading-relaxed text-zinc-300">
    페이지 시작부에는 위쪽 라인이 어색하니 끕니다.
  </p>
</section>`,
      react: `<SectionFrame
  divider={false}
  eyebrow="Hero"
  title="첫 섹션은 헤어라인 없이."
  description="페이지 시작부에는 위쪽 라인이 어색하니 끕니다."
/>`,
    },
    {
      index: "03",
      badge: "composite",
      title: "ListRow와 함께",
      description: "children에 ListRow ul을 넣으면 안티 카드 표준 섹션.",
      preview: (
        <SectionFrame divider={false} eyebrow="Heritage · Education" title="교육·에듀테크">
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
            <ListRow meta="2021" trailing="EBS">EBS 온라인 클래스 재구조화</ListRow>
          </ul>
        </SectionFrame>
      ),
      prompt: `섹션 헤더 + 그 아래 행 리스트 (ListRow) 패턴.
SectionFrame children에 <ul divide-y border-y> 안에 ListRow 들 넣어줘.
이게 Heritage 페이지의 표준 구조.`,
      html: `<section class="py-16 md:py-20">
  <p class="text-[12px] uppercase tracking-[0.08em] text-zinc-500 font-medium">
    Heritage · Education
  </p>
  <h2 class="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50">
    교육·에듀테크
  </h2>
  <ul class="mt-10 md:mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
    <li class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
      <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2024</span>
      <span class="text-[15.5px] font-medium text-zinc-100">미니북 저작 퍼블리셔</span>
      <span class="text-[12.5px] text-zinc-400">아이스크림미디어</span>
    </li>
    <li class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
      <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2021</span>
      <span class="text-[15.5px] font-medium text-zinc-100">EBS 온라인 클래스 재구조화</span>
      <span class="text-[12.5px] text-zinc-400">EBS</span>
    </li>
  </ul>
</section>`,
      react: `<SectionFrame eyebrow="Heritage · Education" title="교육·에듀테크">
  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
    <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
    <ListRow meta="2021" trailing="EBS">EBS 온라인 클래스 재구조화</ListRow>
  </ul>
</SectionFrame>`,
    },
  ],
  props: [
    { name: "eyebrow", type: "ReactNode", desc: "섹션 카테고리 라벨" },
    { name: "title", type: "ReactNode", desc: "섹션 큰 제목" },
    { name: "description", type: "ReactNode", desc: "제목 아래 서브 카피" },
    { name: "as", type: '"h1" | "h2" | "h3"', default: '"h2"', desc: "헤딩 레벨" },
    { name: "divider", type: "boolean", default: "true", desc: "위쪽 헤어라인 표시 여부" },
    { name: "children", type: "ReactNode", desc: "본문 콘텐츠" },
  ],
};

const LIST_ROW_DEF: ComponentDef = {
  id: "list-row",
  ko: "리스트 행",
  en: "ListRow",
  desc: "카드 그리드 대신 행 레이아웃. divide-y + border-y 와 함께 ul 안에서 사용. 안티 카드의 가장 자주 쓰는 컴포넌트.",
  examples: [
    {
      index: "01",
      badge: "minimal",
      title: "기본 — meta + 본문",
      description: "가장 단순. trailing 없으면 우측 영역 비어있음.",
      preview: (
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <ListRow meta="2024">미니북 저작 퍼블리셔</ListRow>
          <ListRow meta="2021">EBS 온라인 클래스 재구조화</ListRow>
        </ul>
      ),
      prompt: `행 리스트 만들어줘. 카드 그리드 말고.
- ul: divide-y border-y (헤어라인으로 행 구분)
- 각 li: grid-cols-[140px_1fr] (좌측 meta 140px / 본문 flex)
- meta: 12px uppercase smallcaps zinc-500
- 본문: 15.5px font-medium zinc-100
- 모바일은 grid-cols-1 stack`,
      html: `<ul class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <li class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-8 py-6">
    <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2024</span>
    <span class="text-[15.5px] font-medium text-zinc-100">미니북 저작 퍼블리셔</span>
  </li>
  <li class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-8 py-6">
    <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2021</span>
    <span class="text-[15.5px] font-medium text-zinc-100">EBS 온라인 클래스 재구조화</span>
  </li>
</ul>`,
      react: `<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024">미니북 저작 퍼블리셔</ListRow>
  <ListRow meta="2021">EBS 온라인 클래스 재구조화</ListRow>
</ul>`,
    },
    {
      index: "02",
      badge: "standard",
      title: "trailing — 표준 패턴",
      description: "우측에 클라이언트, 카테고리 등 보조 정보. Heritage 페이지 표준.",
      preview: (
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
          <ListRow meta="2023" trailing="롯데카드">mydata 수집 및 admin 개발</ListRow>
          <ListRow meta="2022" trailing="라이나생명">대고객 디지털채널 재구축</ListRow>
        </ul>
      ),
      prompt: `Example 01과 같지만 우측에 trailing 보조 정보 추가.
- grid-cols-[140px_1fr_auto] (좌측 meta / 본문 flex / 우측 trailing auto)
- trailing: 12.5px text-zinc-400
이게 Heritage 페이지에서 가장 자주 쓰는 패턴.`,
      html: `<ul class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <li class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
    <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2024</span>
    <span class="text-[15.5px] font-medium text-zinc-100">미니북 저작 퍼블리셔</span>
    <span class="text-[12.5px] text-zinc-400">아이스크림미디어</span>
  </li>
  <li class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
    <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2023</span>
    <span class="text-[15.5px] font-medium text-zinc-100">mydata 수집 및 admin 개발</span>
    <span class="text-[12.5px] text-zinc-400">롯데카드</span>
  </li>
</ul>`,
      css: `.list-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.list-rows > li {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.list-rows > li:last-child { border-bottom: 0; }
@media (min-width: 768px) {
  .list-rows > li {
    grid-template-columns: 140px 1fr auto;
    gap: 2rem;
  }
}
.list-rows .meta {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #71717a;
}
.list-rows .title { font-size: 15.5px; font-weight: 500; color: #f4f4f5; }
.list-rows .trailing { font-size: 12.5px; color: #a1a1aa; }`,
      cssHtml: `<ul class="list-rows">
  <li>
    <span class="meta">2024</span>
    <span class="title">미니북 저작 퍼블리셔</span>
    <span class="trailing">아이스크림미디어</span>
  </li>
</ul>`,
      react: `<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
  <ListRow meta="2023" trailing="롯데카드">mydata 수집 및 admin 개발</ListRow>
  <ListRow meta="2022" trailing="라이나생명">대고객 디지털채널 재구축</ListRow>
</ul>`,
    },
    {
      index: "03",
      badge: "interactive",
      title: "클릭 가능 — href",
      description: "href 주면 자동 a 태그, hover 시 본문이 액센트 색.",
      preview: (
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <ListRow meta="2024" trailing="EBS" href="#">EBS 온라인 클래스 재구조화 (클릭 가능)</ListRow>
          <ListRow meta="2023" trailing="롯데카드" href="#">mydata 수집 및 admin 개발 (클릭 가능)</ListRow>
        </ul>
      ),
      prompt: `Example 02와 같지만 각 행이 링크.
- li 자체가 hover 시 background 살짝 (white/0.02)
- 안에 a 태그로 감쌈
- hover 시 본문 색이 emerald-400으로 전환
- 부드러운 transition`,
      html: `<ul class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <li class="group transition-colors hover:bg-white/[0.02]">
    <a href="/heritage/ebs" class="block px-1 group-hover:text-emerald-400">
      <div class="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6">
        <span class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2024</span>
        <span class="text-[15.5px] font-medium">EBS 온라인 클래스 재구조화</span>
        <span class="text-[12.5px] text-zinc-400">EBS</span>
      </div>
    </a>
  </li>
</ul>`,
      css: `.list-rows.linkable a {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease, background 0.2s ease;
}
.list-rows.linkable a:hover {
  color: #34d399;
  background: rgba(255, 255, 255, 0.02);
}`,
      react: `<ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <ListRow meta="2024" trailing="EBS" href="/heritage/ebs">
    EBS 온라인 클래스 재구조화
  </ListRow>
  <ListRow meta="2023" trailing="롯데카드" href="/heritage/lotte">
    mydata 수집 및 admin 개발
  </ListRow>
</ul>`,
    },
  ],
  props: [
    { name: "meta", type: "ReactNode", desc: "좌측 작은 라벨 (smallcaps)" },
    { name: "trailing", type: "ReactNode", desc: "우측 보조 라벨" },
    { name: "children", type: "ReactNode", desc: "본문 (제목)" },
    { name: "href", type: "string", desc: "있으면 a 태그로 감싸지고 hover 시 액센트" },
  ],
};
