import { useEffect, useState, type ReactNode } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import {
  Eyebrow,
  SectionFrame,
  ListRow,
  Container,
  Hairline,
  HeroHeading,
  SectionHeading,
  Lead,
  LinkRow,
  Header as ACHeader,
  Footer as ACFooter,
  typography,
  type TypographyToken,
  Quote,
  Highlight as ACHighlight,
  Image as ACImage,
  Video,
  DefList,
  StatList,
  Timeline,
  Pill,
  HeroPattern,
  SectorsPattern,
  TalkPattern,
  EmptyState,
  CTASection,
  Banner,
  Button,
  FeatureRow,
  ClientLogos,
  Testimonial,
  StatBlock,
  CaseStudy,
  WaveCard,
  FadeIn,
  HoverAccent,
  ScrollProgress,
  Marquee,
  Callout,
  FAQ,
  PricingTable,
  PricingPattern,
  Steps,
  CompareTable,
} from "@freeive/anti-card";

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
      { id: "header", ko: "헤더", en: "Header", status: "ready" },
      { id: "footer", ko: "푸터", en: "Footer", status: "ready" },
      { id: "container", ko: "컨테이너", en: "Container", status: "ready" },
      { id: "section-frame", ko: "섹션 프레임", en: "SectionFrame", status: "ready" },
      { id: "hairline", ko: "헤어라인 구분선", en: "Hairline", status: "ready" },
      { id: "grid-columns", ko: "그리드·컬럼", en: "Grid", status: "soon" },
    ],
  },
  {
    group: "타이포그래피",
    desc: "글로 위계를 만드는 모든 것",
    items: [
      { id: "typography-tokens", ko: "타이포 토큰", en: "Typography Tokens", status: "ready" },
      { id: "eyebrow", ko: "아이브로우 라벨", en: "Eyebrow", status: "ready" },
      { id: "hero-heading", ko: "히어로 큰 제목", en: "Hero Heading", status: "ready" },
      { id: "section-heading", ko: "섹션 제목", en: "Section Heading", status: "ready" },
      { id: "lead", ko: "리드 카피", en: "Lead", status: "ready" },
      { id: "quote", ko: "인용구", en: "Quote", status: "ready" },
      { id: "highlight", ko: "강조 문장", en: "Highlight", status: "ready" },
    ],
  },
  {
    group: "리스트",
    desc: "정보 나열 (카드 그리드의 대안)",
    items: [
      { id: "list-row", ko: "리스트 행", en: "ListRow", status: "ready" },
      { id: "definition-list", ko: "정의 리스트", en: "Definition List", status: "ready" },
      { id: "stat-list", ko: "통계 숫자 행", en: "Stat List", status: "ready" },
      { id: "timeline", ko: "타임라인", en: "Timeline", status: "ready" },
      { id: "compare-table", ko: "비교 표", en: "Compare Table", status: "ready" },
    ],
  },
  {
    group: "액션",
    desc: "버튼·링크·전환",
    items: [
      { id: "button-primary", ko: "기본 버튼", en: "Button (Primary)", status: "ready" },
      { id: "button-secondary", ko: "보조 버튼", en: "Button (Secondary)", status: "ready" },
      { id: "link-row", ko: "링크 행", en: "Link Row", status: "ready" },
      { id: "cta-section", ko: "CTA 섹션", en: "CTA Section", status: "ready" },
      { id: "banner", ko: "알림 배너", en: "Banner", status: "ready" },
    ],
  },
  {
    group: "콘텐츠 블록",
    desc: "본문에 들어가는 단위",
    items: [
      { id: "callout", ko: "강조 박스", en: "Callout", status: "ready" },
      { id: "faq", ko: "FAQ 아코디언", en: "FAQ", status: "ready" },
      { id: "pricing-table", ko: "가격 표", en: "Pricing Table", status: "ready" },
      { id: "steps", ko: "단계 (3·4단계)", en: "Steps", status: "ready" },
      { id: "feature-row", ko: "특징 나열 행", en: "Feature Row", status: "ready" },
    ],
  },
  {
    group: "신뢰·증거",
    desc: "이 사이트가 왜 믿을만한가",
    items: [
      { id: "client-logos", ko: "클라이언트 로고 띠", en: "Client Logos", status: "ready" },
      { id: "testimonial", ko: "사용자 후기", en: "Testimonial", status: "ready" },
      { id: "stat-block", ko: "큰 통계 블록", en: "Stat Block", status: "ready" },
      { id: "case-study", ko: "케이스 스터디", en: "Case Study", status: "ready" },
    ],
  },
  {
    group: "미디어",
    desc: "이미지·영상·갤러리",
    items: [
      { id: "image", ko: "이미지", en: "Image", status: "ready" },
      { id: "video", ko: "비디오 플레이어", en: "Video", status: "ready" },
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
      { id: "pill", ko: "필 / 태그", en: "Pill / Tag", status: "ready" },
    ],
  },
  {
    group: "인터랙션",
    desc: "움직임·반응. 시그니처.",
    items: [
      { id: "fade-in", ko: "부드러운 등장", en: "Fade-in on Scroll", status: "ready" },
      { id: "hover-accent", ko: "호버 강조", en: "Hover Accent", status: "ready" },
      { id: "scroll-progress", ko: "스크롤 진행", en: "Scroll Progress", status: "ready" },
      { id: "marquee", ko: "흐르는 띠", en: "Marquee", status: "ready" },
      { id: "wave-card", ko: "물결 진행 카드", en: "Wave Card", status: "ready" },
    ],
  },
  {
    group: "페이지 패턴",
    desc: "한 페이지 단위의 큰 조합",
    items: [
      { id: "hero-pattern", ko: "히어로 (메인 첫 화면)", en: "Hero", status: "ready" },
      { id: "sectors-pattern", ko: "섹터 리스트 페이지", en: "Sectors", status: "ready" },
      { id: "pricing-pattern", ko: "가격 페이지", en: "Pricing", status: "ready" },
      { id: "talk-pattern", ko: "Talk·Contact", en: "Talk / Contact", status: "ready" },
      { id: "empty-error", ko: "빈 상태·404", en: "Empty / 404", status: "ready" },
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
  "typography-tokens": TypographyTokens,
  eyebrow: () => <ComponentPage def={EYEBROW_DEF} />,
  "section-frame": () => <ComponentPage def={SECTION_FRAME_DEF} />,
  "list-row": () => <ComponentPage def={LIST_ROW_DEF} />,
  container: () => <ComponentPage def={CONTAINER_DEF} />,
  hairline: () => <ComponentPage def={HAIRLINE_DEF} />,
  "hero-heading": () => <ComponentPage def={HERO_HEADING_DEF} />,
  "section-heading": () => <ComponentPage def={SECTION_HEADING_DEF} />,
  lead: () => <ComponentPage def={LEAD_DEF} />,
  "link-row": () => <ComponentPage def={LINK_ROW_DEF} />,
  header: () => <ComponentPage def={HEADER_DEF} />,
  footer: () => <ComponentPage def={FOOTER_DEF} />,
  quote: () => <ComponentPage def={QUOTE_DEF} />,
  highlight: () => <ComponentPage def={HIGHLIGHT_DEF} />,
  image: () => <ComponentPage def={IMAGE_DEF} />,
  video: () => <ComponentPage def={VIDEO_DEF} />,
  "definition-list": () => <ComponentPage def={DEF_LIST_DEF} />,
  "stat-list": () => <ComponentPage def={STAT_LIST_DEF} />,
  timeline: () => <ComponentPage def={TIMELINE_DEF} />,
  pill: () => <ComponentPage def={PILL_DEF} />,
  "hero-pattern": () => <ComponentPage def={HERO_PATTERN_DEF} />,
  "sectors-pattern": () => <ComponentPage def={SECTORS_PATTERN_DEF} />,
  "talk-pattern": () => <ComponentPage def={TALK_PATTERN_DEF} />,
  "empty-error": () => <ComponentPage def={EMPTY_STATE_DEF} />,
  "cta-section": () => <ComponentPage def={CTA_SECTION_DEF} />,
  banner: () => <ComponentPage def={BANNER_DEF} />,
  "button-primary": () => <ComponentPage def={BUTTON_PRIMARY_DEF} />,
  "button-secondary": () => <ComponentPage def={BUTTON_SECONDARY_DEF} />,
  "feature-row": () => <ComponentPage def={FEATURE_ROW_DEF} />,
  "client-logos": () => <ComponentPage def={CLIENT_LOGOS_DEF} />,
  testimonial: () => <ComponentPage def={TESTIMONIAL_DEF} />,
  "stat-block": () => <ComponentPage def={STAT_BLOCK_DEF} />,
  "case-study": () => <ComponentPage def={CASE_STUDY_DEF} />,
  "wave-card": () => <ComponentPage def={WAVE_CARD_DEF} />,
  "fade-in": () => <ComponentPage def={FADE_IN_DEF} />,
  "hover-accent": () => <ComponentPage def={HOVER_ACCENT_DEF} />,
  "scroll-progress": () => <ComponentPage def={SCROLL_PROGRESS_DEF} />,
  marquee: () => <ComponentPage def={MARQUEE_DEF} />,
  callout: () => <ComponentPage def={CALLOUT_DEF} />,
  faq: () => <ComponentPage def={FAQ_DEF} />,
  "pricing-table": () => <ComponentPage def={PRICING_TABLE_DEF} />,
  "pricing-pattern": () => <ComponentPage def={PRICING_PATTERN_DEF} />,
  steps: () => <ComponentPage def={STEPS_DEF} />,
  "compare-table": () => <ComponentPage def={COMPARE_TABLE_DEF} />,
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

/* ================ Typography tokens reference ================ */

interface TokenRow {
  token: TypographyToken;
  label: string;
  sample: ReactNode;
}

const HEADING_ROWS: TokenRow[] = [
  {
    token: "displayLg",
    label: 'HeroHeading size="hero" · 메인 hero · 40~64px · 사이트당 1회',
    sample: "1인 운영자의 무기를 만드는 1인 랩.",
  },
  {
    token: "display",
    label: 'HeroHeading default · 페이지 타이틀 · 30~48px',
    sample: "큰 프로젝트들의 깊이를 1인 랩으로 옮긴다.",
  },
  {
    token: "h2",
    label: "SectionHeading h2 · 24~30px",
    sample: "네 개의 축으로 운영합니다.",
  },
  {
    token: "h3",
    label: "SectionHeading h3 · 20~24px",
    sample: "서브섹션 제목",
  },
  {
    token: "h4",
    label: "블로그 단락 제목 · 18px",
    sample: "블로그 글의 단락 제목",
  },
];

const BODY_ROWS: TokenRow[] = [
  {
    token: "body",
    label: "본문 기본 · 15px · 1.65",
    sample:
      "긴 글이 한 줄에 65~75자일 때 가장 읽기 좋다는 Bringhurst 원칙. body는 본문 텍스트의 표준 톤이다. zinc-700 / dark:zinc-300.",
  },
  {
    token: "lead",
    label: "Lead 인트로 · 15px · 한 단계 흐림",
    sample: "헤딩 직후의 보조 카피. 본문보다 한 단계 흐린 회색으로 위계를 만든다.",
  },
  {
    token: "leadLarge",
    label: "Lead Large · 18~20px · 히어로 직후",
    sample: "AI가 만들면 다 비슷해진다고 누가 정했나.",
  },
  {
    token: "small",
    label: "보조 본문·meta · 13.5px",
    sample: "마지막 업데이트: 2026-05-07 · 작성자 김민철",
  },
];

const LABEL_ROWS: TokenRow[] = [
  {
    token: "eyebrow",
    label: "Eyebrow 기본 · 12px uppercase · zinc-500",
    sample: "HERITAGE · 2016 — NOW",
  },
  {
    token: "eyebrowAccent",
    label: "Eyebrow accent · emerald-600 / 400",
    sample: "LIVE · 진행 중",
  },
];

function TokenList({ rows }: { rows: TokenRow[] }) {
  return (
    <ul className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
      {rows.map((r) => (
        <li
          key={r.token}
          className="grid grid-cols-1 gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-10 md:py-9"
        >
          <div>
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              {r.token}
            </p>
            <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">
              {r.label}
            </p>
          </div>
          <div className="min-w-0">
            <div className={typography[r.token]}>{r.sample}</div>
            <code className="mt-3 inline-block font-mono text-[11.5px] text-zinc-500 dark:text-zinc-500">
              typography.{r.token}
            </code>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TypographyTokens() {
  return (
    <section>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
        Tokens · Layer 0
      </p>
      <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
        타이포 토큰
      </h2>
      <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        anti-card 라이브러리 전체가 참조하는{" "}
        <strong className="text-zinc-900 dark:text-zinc-200">
          단일 진실 원천
        </strong>
        . 모든 컴포넌트의 크기·굵기·색·자간이 여기서 결정됩니다. 외부에서도{" "}
        <code className="font-mono text-[13px] text-emerald-700 dark:text-emerald-400">
          {`import { typography }`}
        </code>{" "}
        해서 자유 글에서도 동일한 톤을 유지하세요.
      </p>

      {/* Headings */}
      <div className="mt-14">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Headings
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          큰 타입은 negative tracking + 좁은 leading. 자간이 크기에 반비례하게
          조정됨 (display -0.02em → h4 0).
        </p>
        <TokenList rows={HEADING_ROWS} />
      </div>

      {/* Body / Lead */}
      <div className="mt-16">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Body / Lead
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          본문 색은 zinc-700 / 600. 회색 한 단계 차이가 위계를 만든다 (body →
          lead → small).
        </p>
        <TokenList rows={BODY_ROWS} />
      </div>

      {/* Smallcaps labels */}
      <div className="mt-16">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Smallcaps Labels
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          12px uppercase + 자간 0.08em. 5원칙 중 "smallcaps 라벨" — 카드 없이
          영역을 구분하는 가장 가벼운 신호.
        </p>
        <TokenList rows={LABEL_ROWS} />
      </div>

      {/* Code */}
      <div className="mt-16">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Code (Inline)
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          본문에 자연스럽게 섞이는 인라인 코드. 0.92em 상대 크기 + mono. 박스로
          감싸지 않는다.
        </p>
        <ul className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
          <li className="grid grid-cols-1 gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-10 md:py-9">
            <div>
              <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                code
              </p>
              <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">
                인라인 코드 · 0.92em
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                패키지 진입점은{" "}
                <code className={typography.code}>{`import { typography } from "@freeive/anti-card"`}</code>{" "}
                한 줄이면 끝입니다.
              </p>
              <code className="mt-3 inline-block font-mono text-[11.5px] text-zinc-500 dark:text-zinc-500">
                typography.code
              </code>
            </div>
          </li>
        </ul>
      </div>

      {/* 5 design rules */}
      <div className="mt-20 border-t border-zinc-200 pt-10 dark:border-white/[0.08]">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Design Rules
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          토큰을 추가·수정할 때 지켜야 할 5가지.
        </p>
        <ol className="mt-8 space-y-6">
          {[
            {
              n: "01",
              t: "굵기 3단계만",
              d: "400 (regular) / 500 (medium) / 600 (semibold). bold(700)·black(900) 사용 금지. 두꺼움이 아니라 색·크기로 위계.",
            },
            {
              n: "02",
              t: "색 7단계만",
              d: "zinc-900 / 700 / 600 / 500 / 400 / 300 / 50. 그 외 색은 액센트(emerald)를 제외하면 사용 X.",
            },
            {
              n: "03",
              t: "자간은 크기 반비례",
              d: "display -0.02em → h4 0 → smallcaps +0.08em. 큰 타입은 좁게, smallcaps만 넓게.",
            },
            {
              n: "04",
              t: "줄간격은 크기 반비례",
              d: "display 1.1 / h2 1.2 / h3 1.3 / h4 1.4 / body 1.65. 본문이 가장 여유롭게.",
            },
            {
              n: "05",
              t: "폰트는 호스트가 결정",
              d: "라이브러리는 family를 강제하지 않음. 호스트가 :root에 --anti-card-font-sans / --anti-card-font-mono CSS 변수로 override 가능.",
            },
          ].map((r) => (
            <li
              key={r.n}
              className="grid grid-cols-1 gap-3 md:grid-cols-[60px_180px_1fr] md:gap-8"
            >
              <span className="font-mono text-[12px] text-zinc-400 dark:text-zinc-500">
                {r.n}
              </span>
              <p className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">
                {r.t}
              </p>
              <p className="max-w-[58ch] text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {r.d}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Usage */}
      <div className="mt-20 border-t border-zinc-200 pt-10 dark:border-white/[0.08]">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
          Usage
        </p>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          토큰은 className 문자열입니다. 자유 글이나 외부 컴포넌트에서 직접 사용
          가능.
        </p>
        <pre className="mt-6 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50/60 p-4 text-[13px] leading-relaxed text-zinc-800 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-300">
          <code className="font-mono">{`import { typography, cn } from "@freeive/anti-card";

// 그대로 사용
<p className={typography.body}>본문 텍스트</p>
<code className={typography.code}>inline code</code>

// 다른 클래스와 합치기
<p className={cn(typography.lead, "max-w-[58ch] mt-6")}>
  헤딩 직후 인트로 카피.
</p>

// 부분 override (twMerge가 충돌 자동 해결)
<h2 className={cn(typography.h2, "text-emerald-600 dark:text-emerald-400")}>
  강조 섹션 제목
</h2>`}</code>
        </pre>
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
      prompt: `end-user 화면(랜딩·콘텐츠 사이트)의 섹션 위에 들어가는 작은 카테고리 라벨이 필요해.
shadcn CardHeader처럼 박스에 감싸진 헤더가 아니라, 더 가볍게 본문 위에 얹는 한 줄 텍스트.

용도: 헤딩 위에서 "이 영역이 무슨 카테고리"인지 한 번에 알리는 정도.
"Heritage · 2016 — Now", "Pillars", "Section · Label" 같은 짧고 분류적인 텍스트.

스타일:
- 12px uppercase, 자간 0.08em (smallcaps 톤)
- font-medium (너무 가늘지 않게)
- 색: 본문보다 한 단계 차분한 회색 (zinc-500/600 — 라이트/다크 양쪽 자연스럽게)

박스로 감싸지 말고 단순한 <p> 한 줄. margin은 헤딩이 처리.

이게 안티 카드 5원칙 중 "smallcaps 라벨" — 카드 없이 영역을 구분하는 가장 가벼운 신호.`,
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
      prompt: `기본 eyebrow의 강조 변형이 필요해. "진행 중", "Live", "신규" 같은 상태를 짧게 표시.

용도: Heritage·Lab 페이지의 "현재 진행 중" 섹션, 새 콘텐츠 배지 등.
주위에 다른 정보가 많은 상황에서 한 영역만 살짝 강조하고 싶을 때.

스타일: 기본 eyebrow와 사이즈·자간·굵기 동일. 색만 액센트 컬러로.
- 색: emerald-600 dark:emerald-400 (라이트에선 더 진하게, 다크에선 밝게)
- 다른 액센트가 필요하면 className으로 yellow-400/rose-400 등 오버라이드

여전히 <p> 한 줄. 박스 X. "한 줄 텍스트의 색만 바뀐 것"이라는 가벼움 유지.`,
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
      prompt: `end-user 화면의 섹션 헤더 묶음을 만들어줘. 안티 카드 톤.

구조: 작은 라벨 → 큰 헤딩 → 서브 카피 (3줄 묶음).
- 라벨(eyebrow): 12px uppercase smallcaps, zinc-500/600
- 헤딩(h2): text-2xl font-semibold tracking-tight, 본문보다 진한 색 (zinc-900 dark:zinc-50)
- 서브 카피(p): text-[14px] leading-relaxed, max-w-40ch, zinc-600 dark:zinc-400

카드 박스 X. 그릇 X. 위 3줄 사이의 간격(mt-3)이 묶음 자체.

이게 SectionFrame 안에서 자동으로 만들어지는 구조이기도 함.
end-user 화면에서 가장 자주 등장하는 패턴.`,
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
      prompt: `Eyebrow의 사전 정의 두 톤(neutral/accent) 외 다른 색이 필요한 경우.
경고·위험·정보 등 의미 있는 색 변경.

원칙: 사이즈·자간·굵기는 절대 건드리지 말고, 색(text-*)만 변경.
className으로 오버라이드하면 twMerge가 기존 색 클래스를 자동으로 무효화.

예시:
- env not set / warning: text-yellow-500 dark:text-yellow-400
- danger / 위험: text-rose-500 dark:text-rose-400
- info / 정보: text-sky-500 dark:text-sky-400

color 변형이 늘어나도 사이즈·자간은 일관 유지 → 시스템 안정성.`,
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
      prompt: `end-user 화면(랜딩 페이지 등)의 한 섹션을 만들어줘. 카드 박스 절대 사용 금지.

안티 카드 5원칙 중 "공간(여백) + 헤어라인 + smallcaps 라벨" 세 가지를 조합:
- 위쪽 1px 헤어라인 (border-t border-zinc-200 dark:border-white/[0.06])
- 위·아래 큰 패딩 py-16 md:py-20 (안티 카드는 큰 호흡)
- eyebrow 라벨 (12px uppercase smallcaps)
- 그 아래 큰 헤딩 (text-2xl md:text-3xl font-semibold tracking-tight, max-w-20ch)
- 그 아래 서브 카피 (text-[15px] leading-relaxed, max-w-58ch, zinc-700 dark:zinc-300)

카드 박스로 감싸면 정보가 그릇에 갇혀 보임. 이 패턴은 그릇 없이 헤어라인과 여백만으로
영역을 만든다 → 화면이 "콘텐츠가 곧 형태"인 느낌.

다른 섹션이 위에 있으면 위쪽 헤어라인이 자연스러운 구분자 역할.
연속된 섹션을 이 프레임으로 쌓으면 페이지 리듬이 만들어짐.`,
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
      prompt: `페이지의 첫 섹션이라 위쪽 헤어라인을 빼야 자연스러워.

이유: 페이지 시작부 위에는 아무것도 없는데 헤어라인만 보이면 "잘린 섹션"처럼 보임.
첫 섹션은 헤어라인 없이 시작 → 페이지 자체가 그 섹션을 안고 있는 느낌.

구조는 기본 SectionFrame과 동일 (라벨 + 헤딩 + 서브 카피).
다만 padding을 더 크게 가도 OK — Hero라면 py-24 md:py-32.
헤딩도 더 크게 — text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] (h1 권장).

뒤따라오는 두 번째 섹션부터는 기본 SectionFrame (헤어라인 ON).
이 둘이 만나면 페이지의 시작과 본문 영역이 자연스럽게 분리됨.`,
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
          <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
            <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
            <ListRow meta="2021" trailing="EBS">EBS 온라인 클래스 재구조화</ListRow>
          </ul>
        </SectionFrame>
      ),
      prompt: `섹션 헤더 + 그 아래 행 리스트 — end-user 화면에서 가장 자주 등장하는 조합.
Heritage·Sectors·Pricing·FAQ 등 정보 나열이 필요한 모든 섹션의 표준 패턴.

구조:
1) SectionFrame (라벨 + 헤딩 + 설명)
2) children 영역에 <ul> + ListRow들

ul 클래스: divide-y divide-zinc-200 border-y border-zinc-200
          dark:divide-white/[0.06] dark:border-white/[0.06]
- divide-y: 행 사이 1px 가로선 (구분자)
- border-y: ul 위·아래 1px 가로선 (영역 경계)
- 색: 라이트/다크 양쪽 — 라이트에선 zinc-200 (옅은 회색), 다크에선 white 6% 알파

카드 그리드 절대 X. 카드 그리드는 모든 항목을 균등하게 보여줘 위계가 사라지고,
50개 카드는 답답해짐. 행 레이아웃은 위계가 본문 크기·meta로 만들어지고,
한 화면에 자연스럽게 더 많은 정보 나열 가능.`,
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
        <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
          <ListRow meta="2024">미니북 저작 퍼블리셔</ListRow>
          <ListRow meta="2021">EBS 온라인 클래스 재구조화</ListRow>
        </ul>
      ),
      prompt: `end-user 화면에서 정보 나열이 필요해. 카드 그리드 말고 행 레이아웃.

왜 행이냐: 카드 그리드는 50개 항목을 보면 답답해지고, 모든 항목이 균등 → 위계가 사라짐.
행은 한 화면에 자연스럽게 펼쳐지고, 위계는 본문 크기·meta로 만든다.
shadcn 카드 그리드 패턴을 안 쓰는 안티 카드 영역의 핵심.

구조:
- ul: divide-y divide-zinc-200 border-y border-zinc-200
      dark:divide-white/[0.06] dark:border-white/[0.06]
  → 행 구분 + ul 영역 경계
- li: grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-8 py-6
  → 데스크톱 2컬럼 (meta 140px 고정 / 본문 flex), 모바일 stack

각 컬럼:
- meta (좌): text-[12px] uppercase tracking-[0.08em] zinc-500 (smallcaps 톤)
  연도·카테고리·번호 등 분류 정보. eyebrow와 같은 톤.
- 본문 (우): text-[15.5px] font-medium leading-snug, zinc-900 dark:zinc-100
  가장 두드러지는 텍스트 — 제목·핵심.

trailing(우측 보조)이 필요하면 grid-cols-[140px_1fr_auto]로 확장 (다음 패턴).`,
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
        <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
          <ListRow meta="2024" trailing="아이스크림미디어">미니북 저작 퍼블리셔</ListRow>
          <ListRow meta="2023" trailing="롯데카드">mydata 수집 및 admin 개발</ListRow>
          <ListRow meta="2022" trailing="라이나생명">대고객 디지털채널 재구축</ListRow>
        </ul>
      ),
      prompt: `정보 행에 우측 보조 라벨이 더 필요해. Heritage 페이지의 표준 패턴.

상황: 각 프로젝트 행에 [연도, 제목, 클라이언트] 세 가지 정보가 필요.
연도(meta)·제목(본문)·클라이언트(trailing)를 한 행에 균형 있게 배치.

구조: Example 01의 2컬럼을 3컬럼으로 확장.
- grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-6
  → 좌측 meta 140px / 본문 1fr / 우측 trailing auto-width

각 컬럼:
- meta (좌, 140px): 연도·카테고리. text-[12px] uppercase tracking-[0.08em] zinc-500
- 본문 (가운데, flex): 제목. text-[15.5px] font-medium zinc-900 dark:zinc-100
- trailing (우, auto): 보조 정보 (클라이언트, 산업, 태그). text-[12.5px] zinc-500 dark:zinc-400

세 정보가 균형 있게 — 본문이 가장 강하고, meta·trailing은 보조 톤.
모바일은 단일 컬럼 stack (gap-3로 세 줄로 쌓임).

end-user 화면의 "표준 행" 형태. 한 페이지에 50개 나열해도 답답하지 않다.`,
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
        <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
          <ListRow meta="2024" trailing="EBS" href="#">EBS 온라인 클래스 재구조화 (클릭 가능)</ListRow>
          <ListRow meta="2023" trailing="롯데카드" href="#">mydata 수집 및 admin 개발 (클릭 가능)</ListRow>
        </ul>
      ),
      prompt: `정보 행이 클릭 가능한 링크여야 함. 각 행을 클릭하면 상세 페이지로 이동.

상황: Heritage 행 리스트에서 클릭 시 케이스 스터디 페이지로 이동, 또는
블로그 목록에서 글 상세로. 행 전체가 클릭 영역이어야 사용성이 좋음.

구조: Example 02 (trailing 패턴)을 그대로 사용하되, li 안을 a 태그로 감쌈.
- li: group transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.02]
- a: block px-1, group-hover:text-emerald-700 dark:group-hover:text-emerald-400
- 내부 div는 기존 grid 구조 유지 (140px 1fr auto)

hover 효과:
- li 배경 살짝 (zinc-50 라이트 / white 2% 알파 다크) — 클릭 가능 시그널
- 본문 텍스트 색이 액센트 컬러로 부드럽게 (transition-colors)
- meta·trailing은 색 그대로 → 본문만 도드라짐

전체 행이 클릭 영역이라 hit target 크고, 부드러운 transition이 인터랙션 인상을 만듦.`,
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

const CONTAINER_DEF: ComponentDef = {
  id: "container",
  ko: "컨테이너",
  en: "Container",
  desc: "페이지 본문 너비 통일. 카드로 영역을 가두지 않는 대신 너비로 영역을 정의한다. 안티 카드 5원칙 중 '공간(여백)'.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 (1200px) — 사이트 표준",
      description: "랜딩·Heritage·Lab 등 일반 페이지 본문. 좌우 패딩 자동.",
      preview: (
        <div className="w-full">
          <Container size="default">
            <div className="border-y border-zinc-300 py-6 dark:border-zinc-700">
              <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                max-w-[1200px]
              </p>
              <p className="mt-2 text-[14px] text-zinc-700 dark:text-zinc-300">
                사이트 본문 영역 — 좌우 패딩 px-6 md:px-10 자동.
              </p>
            </div>
          </Container>
        </div>
      ),
      prompt: `end-user 사이트 본문 너비를 통일하는 컨테이너가 필요해. 카드로 가두지 않고 너비로만 영역을 정의.

용도: 모든 페이지 본문(랜딩·Heritage·Lab·블로그)이 동일한 max-width를 가지게.
중앙 정렬 + 좌우 패딩 표준화.

스타일:
- 기본 너비: max-w-[1200px] — 사이트 표준
- 좌우 패딩: px-6 md:px-10 (모바일 24px, 데스크톱 40px)
- 중앙 정렬: mx-auto w-full
- 배경·border 없음 (라이트/다크 모두 투명)

박스가 아니라 너비 제약. shadcn Card 같은 박스 컴포넌트와 정반대 방향 — "그릇"이 아니라 "여백 규칙".

이게 안티 카드 5원칙 중 "공간(여백)" — 본문을 화면 끝까지 늘리지 않고 적절한 너비로 가독성을 유지.`,
      html: `<div class="mx-auto w-full max-w-[1200px] px-6 md:px-10">
  <!-- 본문 -->
</div>`,
      css: `.container {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px;
  padding-left: 24px;
  padding-right: 24px;
}
@media (min-width: 768px) {
  .container {
    padding-left: 40px;
    padding-right: 40px;
  }
}`,
      cssHtml: `<div class="container"><!-- 본문 --></div>`,
      react: `import { Container } from "@freeive/anti-card";

<Container>
  <SectionFrame title="..." />
</Container>`,
    },
    {
      index: "02",
      badge: "narrow",
      title: "narrow (640px) — 긴 글",
      description: "블로그 본문, 학습 일지처럼 글 가독성이 중요한 영역.",
      preview: (
        <div className="w-full">
          <Container size="narrow">
            <div className="border-y border-zinc-300 py-6 dark:border-zinc-700">
              <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                max-w-[640px]
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                긴 글은 한 줄이 65~75자 정도일 때 가장 읽기 좋다.
                640px가 그 황금 너비.
              </p>
            </div>
          </Container>
        </div>
      ),
      prompt: `블로그 글이나 긴 학습 일지처럼 본문 가독성이 핵심인 페이지에 쓰는 narrow 컨테이너.

상황: 1200px 너비로 본문을 펼치면 한 줄이 너무 길어서 시선 이동이 피곤하다.
긴 글은 한 줄이 65~75자(약 640px)일 때 가장 읽기 좋다 (Bringhurst 원칙).

스타일: default와 모든 게 동일하고 max-width만 변경.
- max-w-[640px] (default 1200px의 약 절반)
- 좌우 패딩 동일 (px-6 md:px-10)

언제 쓰는가:
- 블로그 글 본문
- 학습 일지·에세이
- About / 정책 페이지

언제 안 쓰는가:
- Heritage 같은 ListRow 다수 (1200px 권장 — 행 정보가 충분히 펼쳐져야)
- 갤러리·이미지 그리드`,
      html: `<article class="mx-auto w-full max-w-[640px] px-6 md:px-10">
  <h1>제목</h1>
  <p>긴 본문…</p>
</article>`,
      react: `<Container size="narrow" as="article">
  <h1>제목</h1>
  <p>긴 본문…</p>
</Container>`,
    },
    {
      index: "03",
      badge: "wide",
      title: "wide (1440px) — 와이드 레이아웃",
      description: "이미지·갤러리·미디어 헤비 페이지에. 1200px이 좁게 느껴질 때.",
      preview: (
        <div className="w-full">
          <Container size="wide">
            <div className="border-y border-zinc-300 py-6 dark:border-zinc-700">
              <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                max-w-[1440px]
              </p>
              <p className="mt-2 text-[14px] text-zinc-700 dark:text-zinc-300">
                Lab·갤러리처럼 시각 요소가 큰 페이지의 와이드 모드.
              </p>
            </div>
          </Container>
        </div>
      ),
      prompt: `Lab 페이지 카메라 데모처럼 시각 요소가 크고 1200px이 좁게 느껴지는 페이지를 위한 wide 변형.

상황: 카메라 캔버스, 인터랙션 데모, 큰 이미지 갤러리 등 비주얼이 메인인 영역.
글 가독성보다 시각 임팩트가 중요할 때.

스타일: default와 동일하고 max-width만 1440px로.
- max-w-[1440px]
- 좌우 패딩 px-6 md:px-10 동일

쓸 때 유의:
- 본문 텍스트는 안에서 다시 narrow로 한 번 더 가두는 게 좋다.
  (시각 영역만 wide, 본문은 640px)
- 데스크톱 대형 모니터에서 의미 있음 (모바일은 어차피 풀폭)

대부분의 일반 페이지는 default(1200px)로 충분하다 — wide는 의식적으로 선택.`,
      html: `<section class="mx-auto w-full max-w-[1440px] px-6 md:px-10">
  <!-- 갤러리·캔버스 -->
</section>`,
      react: `<Container size="wide" as="section">
  <Gallery />
</Container>`,
    },
    {
      index: "04",
      badge: "semantic",
      title: "as — 시맨틱 태그",
      description: "main, article, section 등 의미 있는 태그로 변경. div가 기본.",
      preview: (
        <div className="w-full">
          <Container size="default" as="main">
            <div className="border-y border-zinc-300 py-6 dark:border-zinc-700">
              <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {"<main> · max-w-[1200px]"}
              </p>
              <p className="mt-2 text-[14px] text-zinc-700 dark:text-zinc-300">
                페이지 메인 영역은 main 태그로. 접근성·SEO에 유리.
              </p>
            </div>
          </Container>
        </div>
      ),
      prompt: `Container의 시맨틱 태그를 div가 아니라 main, article, section으로 바꾸고 싶다.

상황:
- 페이지 메인 영역 → <main>
- 블로그 글 단위 → <article>
- 페이지 안의 의미 있는 구획 → <section>

div보다 시맨틱 태그를 쓰면 스크린 리더 내비게이션·SEO 모두에 유리.
대부분의 페이지에서 최상위 컨테이너는 <main>이 맞다.

스타일·동작은 div와 완전히 동일. as prop만 바꾸면 됨.

기본은 div를 유지 (가장 중립). 의미가 명확할 때만 변경.`,
      html: `<main class="mx-auto w-full max-w-[1200px] px-6 md:px-10">
  <!-- 페이지 본문 -->
</main>

<article class="mx-auto w-full max-w-[640px] px-6 md:px-10">
  <!-- 블로그 글 -->
</article>`,
      react: `<Container as="main">
  <Hero />
  <SectionFrame ... />
</Container>

<Container size="narrow" as="article">
  <BlogPost />
</Container>`,
    },
  ],
  props: [
    {
      name: "size",
      type: '"narrow" | "default" | "wide" | "full"',
      default: '"default"',
      desc: "max-width 변형. narrow=640px, default=1200px, wide=1440px, full=제한없음",
    },
    {
      name: "as",
      type: '"div" | "main" | "article" | "section"',
      default: '"div"',
      desc: "시맨틱 태그 변경. 페이지 메인 영역은 main 권장",
    },
    {
      name: "className",
      type: "string",
      desc: "Tailwind 클래스 추가 (twMerge로 충돌 해결)",
    },
    {
      name: "...rest",
      type: "HTMLAttributes<HTMLElement>",
      desc: "표준 HTML 속성",
    },
  ],
};

const HAIRLINE_DEF: ComponentDef = {
  id: "hairline",
  ko: "헤어라인 구분선",
  en: "Hairline",
  desc: "박스 거부 영역 분리. border 1px 한 줄로 영역의 시작/끝을 표시. 안티 카드 5원칙 중 '헤어라인'.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 영역 분리",
      description: "섹션과 섹션 사이 표준 구분선. my-12 md:my-16 자동 여백.",
      preview: (
        <div>
          <p className="text-zinc-700 dark:text-zinc-300">위 섹션 내용</p>
          <Hairline />
          <p className="text-zinc-700 dark:text-zinc-300">아래 섹션 내용</p>
        </div>
      ),
      prompt: `섹션과 섹션 사이를 카드 박스 없이 분리하고 싶다. 헤어라인 1px 한 줄.

상황: 페이지에 여러 섹션이 있고, 각 영역의 시작/끝을 시각적으로 구분해야 하는데
shadcn Card처럼 박스로 가두지 않으면서 영역을 나누는 가장 가벼운 방법이 필요.

스타일:
- border-top 1px (border-zinc-200/60 dark:border-white/[0.06])
- 위아래 충분한 여백 (my-12 md:my-16) — 헤어라인 자체가 영역 분리 신호
- 색은 본문보다 훨씬 흐림 — 시선을 끌지 않고 위계만 만든다

이게 안티 카드 5원칙 중 "헤어라인" — 박스 없이 1px 한 줄로 영역의 위계.`,
      html: `<hr class="border-0 border-t border-zinc-200/60 dark:border-white/[0.06] my-12 md:my-16" />`,
      react: `<Hairline />`,
    },
    {
      index: "02",
      badge: "tight",
      title: "tight — 가까운 단락 분리",
      description: "본문 내 단락 단위 가벼운 분리. my-6.",
      preview: (
        <div>
          <p className="text-zinc-700 dark:text-zinc-300">단락 1</p>
          <Hairline spacing="tight" />
          <p className="text-zinc-700 dark:text-zinc-300">단락 2</p>
        </div>
      ),
      prompt: `본문 안의 단락 사이에 작은 분리선이 필요한 경우.
default(my-12)는 영역 단위인데, tight(my-6)는 더 가까운 단락 단위.

용도: 블로그 글 내부의 큰 주제 전환, 정의 리스트 사이 등.
default보다 가까이 붙어 있어 "같은 섹션 안의 다른 단락" 신호.`,
      html: `<hr class="border-0 border-t border-zinc-200/60 dark:border-white/[0.06] my-6" />`,
      react: `<Hairline spacing="tight" />`,
    },
    {
      index: "03",
      badge: "subtle",
      title: "subtle — 더 흐릿한 톤",
      description: "푸터 안 등 시선 끌면 안 되는 분리. tone='subtle'.",
      preview: (
        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            © 2026 Freeive
          </p>
          <Hairline spacing="tight" tone="subtle" />
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400">정책 · 약관</p>
        </div>
      ),
      prompt: `푸터 영역 안 같이, 분리는 필요한데 시선이 가면 안 되는 경우의 더 흐릿한 톤.

스타일: 색만 한 단계 더 흐림.
- default: border-zinc-200/60 dark:border-white/[0.06]
- subtle:  border-zinc-200/40 dark:border-white/[0.04]

푸터·메타 영역 등 정보 위계가 낮은 곳에 사용.`,
      html: `<hr class="border-0 border-t border-zinc-200/40 dark:border-white/[0.04] my-6" />`,
      react: `<Hairline spacing="tight" tone="subtle" />`,
    },
  ],
  props: [
    {
      name: "spacing",
      type: '"none" | "tight" | "default" | "loose"',
      default: '"default"',
      desc: "위아래 여백",
    },
    {
      name: "tone",
      type: '"default" | "subtle"',
      default: '"default"',
      desc: "선의 흐림 정도",
    },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
    { name: "...rest", type: "HTMLAttributes<HTMLHRElement>", desc: "표준 hr 속성" },
  ],
};

const HERO_HEADING_DEF: ComponentDef = {
  id: "hero-heading",
  ko: "히어로 큰 제목",
  en: "HeroHeading",
  desc: "페이지 첫 화면의 큰 제목. 두 단계 위계 — size='hero'(40~64px, 메인 1회) / default(30~48px, 일반 페이지).",
  examples: [
    {
      index: "01",
      badge: "default · page",
      title: "기본 — 일반 페이지 타이틀 (30~48px)",
      description: "Lab / Heritage / Blog 등 일반 페이지의 첫 화면. typography.display 토큰.",
      preview: (
        <HeroHeading>큰 프로젝트들의 깊이를 1인 랩으로 옮긴다.</HeroHeading>
      ),
      prompt: `일반 페이지(Lab / Heritage / Blog)의 첫 화면 큰 제목이 필요해. 사이트 메인이 아닌 페이지 단위 hero.

용도: 페이지의 정체성을 한 줄로 알리는 큰 제목. 카드 박스 없이 큰 타입과 공간 자체가 영역 시그널.

스타일 (typography.display 토큰):
- 크기: clamp(1.875rem, 4vw, 3rem) — 30~48px
- font-semibold tracking-[-0.02em] (자간 살짝 negative)
- 색: text-zinc-900 dark:text-zinc-50
- 너비: max-w-[20ch] — 자연스러운 줄바꿈
- 줄간격: leading-[1.1]
- 1인 랩 차분 톤 — shadcn식 거대 hero(64~80px+) 거부.

사이트 메인의 최상위 hero가 필요하면 size="hero" (다음 example 참조).`,
      html: `<h1 class="font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] max-w-[20ch]">
  큰 프로젝트들의 깊이를 1인 랩으로 옮긴다.
</h1>`,
      react: `<HeroHeading>큰 프로젝트들의 깊이를 1인 랩으로 옮긴다.</HeroHeading>`,
    },
    {
      index: "02",
      badge: "size · hero",
      title: "size='hero' — 사이트 메인 (40~64px)",
      description: "사이트 최상위 hero. typography.displayLg 토큰. 사이트당 1번만.",
      preview: (
        <HeroHeading size="hero">1인 운영자의 무기를 만드는 1인 랩.</HeroHeading>
      ),
      prompt: `사이트 메인 페이지의 가장 큰 hero가 필요해. 페이지 단위 hero(default, 30~48px)보다 한 단계 큰 위계.

용도: 사이트 첫 화면 단 1번. "이 사이트가 무엇인가"를 가장 강하게 알리는 위치.

스타일 (typography.displayLg 토큰):
- 크기: clamp(2.5rem, 5vw, 4rem) — 40~64px
- font-semibold tracking-[-0.025em] (default보다 한 단계 더 negative)
- 색: text-zinc-900 dark:text-zinc-50
- 줄간격: leading-[1.05] (더 좁게)
- 너비: max-w-[20ch] (변경 없음)

원칙: size="hero"는 사이트당 1번만. 모든 페이지 첫 화면을 size="hero"로 하면 위계가 사라진다. 메인=hero, 그 외=default.

이게 1인 랩 사이트의 표준 위계 — 메인 1번 강조 + 나머지는 차분.`,
      html: `<h1 class="font-semibold tracking-[-0.025em] text-zinc-900 dark:text-zinc-50 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] max-w-[20ch]">
  1인 운영자의 무기를 만드는 1인 랩.
</h1>`,
      react: `<HeroHeading size="hero">
  1인 운영자의 무기를 만드는 1인 랩.
</HeroHeading>`,
    },
    {
      index: "03",
      badge: "center",
      title: "가운데 정렬",
      description: "랜딩 메인 첫 화면이나 캠페인 페이지에.",
      preview: (
        <HeroHeading align="center" width="wide">
          AI 동질화에 대한 답변.
        </HeroHeading>
      ),
      prompt: `히어로 제목을 가운데 정렬하고 싶다. 캠페인·랜딩 페이지 톤.

스타일: 기본과 동일하고 정렬만 변경.
- text-center mx-auto

가운데 정렬은 강한 시그널이라 페이지당 1번만. 사이트 전반은 좌측이 일관성 측면에서 권장.`,
      html: `<h1 class="font-semibold tracking-tight text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] max-w-[32ch] mx-auto text-center text-zinc-900 dark:text-zinc-50">
  AI 동질화에 대한 답변.
</h1>`,
      react: `<HeroHeading align="center" width="wide">
  AI 동질화에 대한 답변.
</HeroHeading>`,
    },
    {
      index: "04",
      badge: "wide",
      title: "wide — 긴 카피",
      description: "한 줄에 더 많은 글자가 들어가야 하는 긴 카피용. 32ch.",
      preview: (
        <HeroHeading width="wide">
          AI가 만들면 다 비슷해진다고 누가 정했나.
        </HeroHeading>
      ),
      prompt: `긴 카피를 히어로로 쓸 때 기본 20ch가 너무 좁아 줄바꿈이 어색한 경우 wide(32ch).

원칙: 너비를 넓혀도 한 줄당 글자 수 제한은 유지. full(제한 없음)은 큰 타입에서 거의 안 쓴다 (한 줄이 너무 길면 가독성 폭락).`,
      html: `<h1 class="font-semibold tracking-tight text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] max-w-[32ch] text-zinc-900 dark:text-zinc-50">
  AI가 만들면 다 비슷해진다고 누가 정했나.
</h1>`,
      react: `<HeroHeading width="wide">
  AI가 만들면 다 비슷해진다고 누가 정했나.
</HeroHeading>`,
    },
  ],
  props: [
    { name: "as", type: '"h1" | "div"', default: '"h1"', desc: "페이지당 h1 1개 원칙. 다른 곳 큰 타입은 div" },
    { name: "size", type: '"page" | "hero"', default: '"page"', desc: "page=일반 페이지 타이틀(30~48px) / hero=사이트 메인(40~64px, 1회)" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬" },
    { name: "width", type: '"default" | "wide" | "full"', default: '"default"', desc: "너비 제한 (20ch / 32ch / 무제한)" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
    { name: "...rest", type: "HTMLAttributes<HTMLHeadingElement>", desc: "표준 헤딩 속성" },
  ],
};

const SECTION_HEADING_DEF: ComponentDef = {
  id: "section-heading",
  ko: "섹션 제목",
  en: "SectionHeading",
  desc: "섹션 제목. SectionFrame 내부에서 쓰는 그 톤을 외부에서도 사용. h2: 2xl md:3xl, h3: xl md:2xl.",
  examples: [
    {
      index: "01",
      badge: "h2",
      title: "h2 — 표준 섹션 제목",
      description: "기본. 페이지 안의 큰 영역 제목.",
      preview: (
        <SectionHeading>네 개의 축으로 운영합니다.</SectionHeading>
      ),
      prompt: `페이지 안의 섹션 제목이 필요해. h1보다 한 단계 작은 위계.

용도: 메인 페이지 안의 각 섹션, Heritage 페이지의 섹터별 제목 등.

스타일:
- font-semibold tracking-tight
- 크기: text-2xl md:text-3xl (모바일 24px, 데스크톱 30px)
- 색: text-zinc-900 dark:text-zinc-50
- 너비: max-w-[20ch]

SectionFrame 컴포넌트가 내부적으로 만드는 그 제목 톤. 외부에서 직접 쓸 때 동일한 시각.`,
      html: `<h2 class="font-semibold tracking-tight text-2xl md:text-3xl max-w-[20ch] text-zinc-900 dark:text-zinc-50">
  네 개의 축으로 운영합니다.
</h2>`,
      react: `<SectionHeading>네 개의 축으로 운영합니다.</SectionHeading>`,
    },
    {
      index: "02",
      badge: "h3",
      title: "h3 — 더 작은 위계",
      description: "섹션 안의 서브섹션 제목. 한 단계 작음.",
      preview: <SectionHeading as="h3">서브섹션 제목</SectionHeading>,
      prompt: `섹션 안의 서브섹션 제목. h2보다 한 단계 작게.

스타일: text-xl md:text-2xl (모바일 20px, 데스크톱 24px). 나머지 동일.`,
      html: `<h3 class="font-semibold tracking-tight text-xl md:text-2xl max-w-[20ch] text-zinc-900 dark:text-zinc-50">
  서브섹션 제목
</h3>`,
      react: `<SectionHeading as="h3">서브섹션 제목</SectionHeading>`,
    },
    {
      index: "03",
      badge: "center",
      title: "가운데 정렬 (랜딩)",
      description: "랜딩 페이지의 가운데 정렬 섹션 제목.",
      preview: (
        <SectionHeading align="center" width="wide">
          시장의 빈 자리를 짚는 컴포넌트.
        </SectionHeading>
      ),
      prompt: `랜딩 페이지에서 가운데 정렬 섹션 제목이 필요할 때. 너비도 좀 더 넓게.`,
      html: `<h2 class="font-semibold tracking-tight text-2xl md:text-3xl max-w-[32ch] mx-auto text-center text-zinc-900 dark:text-zinc-50">
  시장의 빈 자리를 짚는 컴포넌트.
</h2>`,
      react: `<SectionHeading align="center" width="wide">
  시장의 빈 자리를 짚는 컴포넌트.
</SectionHeading>`,
    },
  ],
  props: [
    { name: "as", type: '"h2" | "h3"', default: '"h2"', desc: "헤딩 레벨" },
    { name: "width", type: '"default" | "wide" | "full"', default: '"default"', desc: "너비 제한" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
    { name: "...rest", type: "HTMLAttributes<HTMLHeadingElement>", desc: "표준 헤딩 속성" },
  ],
};

const LEAD_DEF: ComponentDef = {
  id: "lead",
  ko: "리드 카피",
  en: "Lead",
  desc: "헤딩 직후의 보조 카피. 본문보다 살짝 흐린 회색으로 위계가 자연스럽게 만들어진다.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 인트로 본문",
      description: "헤딩 직후의 한두 문단. 15px / 58ch.",
      preview: (
        <div>
          <SectionHeading>네 개의 축으로 운영합니다.</SectionHeading>
          <div className="mt-4">
            <Lead>
              만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
              모청에서 출발해 자체 제품과 라이브러리로 확장.
            </Lead>
          </div>
        </div>
      ),
      prompt: `헤딩 다음에 들어가는 인트로 본문이 필요해. 본문보다 살짝 흐린 회색.

용도: 모든 섹션 헤딩 직후의 한두 문단 보조 카피.

스타일:
- text-[15px] leading-relaxed
- 색: text-zinc-600 dark:text-zinc-300 (본문보다 한 단계 흐림)
- 너비: max-w-[58ch] (글 한 줄 65~75자 황금 너비)

이 회색이 위계를 만든다 — 헤딩(zinc-900)과 본문 회색의 차이로 시선이 자연스럽게 흐름.`,
      html: `<p class="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-[58ch]">
  만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.
</p>`,
      react: `<Lead>만들어 파는 것 두 축, 토대 한 축, 함께 배우는 한 축.</Lead>`,
    },
    {
      index: "02",
      badge: "large",
      title: "large — 히어로 직후",
      description: "HeroHeading 다음의 큰 인트로. 18~20px.",
      preview: (
        <Lead size="large">
          AI가 만들면 다 비슷해진다고 누가 정했나.
        </Lead>
      ),
      prompt: `HeroHeading 직후의 인트로 카피는 일반 Lead보다 좀 더 크게. 18~20px.

상황: 메인 페이지 첫 화면에서 큰 제목 다음에 한 문단의 강한 카피.
일반 lead(15px)는 너무 작게 느껴짐.`,
      html: `<p class="text-[18px] md:text-[20px] leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-[58ch]">
  AI가 만들면 다 비슷해진다고 누가 정했나.
</p>`,
      react: `<Lead size="large">AI가 만들면 다 비슷해진다고 누가 정했나.</Lead>`,
    },
    {
      index: "03",
      badge: "narrow",
      title: "narrow — 좁은 너비",
      description: "사이드 카피, 푸터 description처럼 좁은 영역.",
      preview: (
        <Lead width="narrow">
          1인 랩의 실험 기록. 작게, 자주, 솔직하게.
        </Lead>
      ),
      prompt: `사이드 영역 / 푸터 description처럼 좁은 너비의 보조 카피. max-w-[44ch].`,
      html: `<p class="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-[44ch]">
  1인 랩의 실험 기록. 작게, 자주, 솔직하게.
</p>`,
      react: `<Lead width="narrow">1인 랩의 실험 기록. 작게, 자주, 솔직하게.</Lead>`,
    },
  ],
  props: [
    { name: "size", type: '"default" | "large"', default: '"default"', desc: "15px 또는 18~20px" },
    { name: "width", type: '"narrow" | "default" | "wide" | "full"', default: '"default"', desc: "너비 제한 (44ch / 58ch / 72ch / 무제한)" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
    { name: "...rest", type: "HTMLAttributes<HTMLParagraphElement>", desc: "표준 p 속성" },
  ],
};

const LINK_ROW_DEF: ComponentDef = {
  id: "link-row",
  ko: "링크 행",
  en: "LinkRow",
  desc: "박스 거부형 CTA 링크. 한 줄 텍스트 + 화살표 + hover 시 emerald. '버튼 박스' 대안.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 표준 CTA",
      description: "본문 톤 + hover 시 emerald + 화살표 살짝 이동.",
      preview: (
        <LinkRow href="#">전체 Heritage 보기</LinkRow>
      ),
      prompt: `버튼 박스 대신 한 줄 텍스트 CTA가 필요해. shadcn Button처럼 채워진 박스 거부.

용도: 섹션 끝의 "전체 보기 →", 페이지 하단 "다음 단계로 →", 푸터 외부 링크.

스타일:
- 한 줄 텍스트 + 화살표 (→)
- 기본 색: text-zinc-900 dark:text-zinc-100 (본문 톤)
- hover: text-emerald-600 dark:text-emerald-400 + 화살표 살짝 우측 이동(translate-x-0.5)
- 텍스트 아래 얇은 밑줄 (border-current/30 → hover시 border-current 진해짐)

박스 X. 패딩 X. 채움 X. "한 줄 텍스트의 색이 살짝 바뀐다"는 가벼움이 핵심.

이게 안티 카드의 표준 CTA 톤.`,
      html: `<a href="#" class="group inline-flex items-baseline gap-2 text-[15.5px] text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
  <span class="border-b border-current/30 group-hover:border-current">전체 Heritage 보기</span>
  <span aria-hidden class="transition-transform group-hover:translate-x-0.5">→</span>
</a>`,
      react: `<LinkRow href="/heritage">전체 Heritage 보기</LinkRow>`,
    },
    {
      index: "02",
      badge: "accent",
      title: "accent — 항상 emerald",
      description: "강조가 필요한 CTA. 처음부터 emerald 색.",
      preview: (
        <LinkRow href="#" tone="accent">Talk · 의뢰·문의</LinkRow>
      ),
      prompt: `Talk·메인 CTA처럼 처음부터 강조해야 하는 링크. 호버 안 해도 emerald.

기본 default와 동일하지만 색만 항상 emerald-600 (라이트) / emerald-400 (다크).
사용 빈도는 default 70% / accent 30% 정도가 자연스러움. accent 남발 X.`,
      html: `<a href="#" class="group inline-flex items-baseline gap-2 text-[15.5px] text-emerald-600 dark:text-emerald-400">
  <span class="border-b border-current/30 group-hover:border-current">Talk · 의뢰·문의</span>
  <span aria-hidden class="transition-transform group-hover:translate-x-0.5">→</span>
</a>`,
      react: `<LinkRow href="/talk" tone="accent">Talk · 의뢰·문의</LinkRow>`,
    },
    {
      index: "03",
      badge: "external",
      title: "external — 외부 링크",
      description: "external prop으로 자동 target/rel + trailing 라벨.",
      preview: (
        <LinkRow href="https://github.com/freeive" external trailing="외부">
          GitHub
        </LinkRow>
      ),
      prompt: `외부 사이트 링크. external=true면 target="_blank" + rel="noopener noreferrer" 자동.

trailing prop으로 우측에 작은 라벨 (예: "외부", "PDF", "→ 새창") 추가 가능.
trailing은 12px uppercase smallcaps 톤 — eyebrow와 동일.`,
      html: `<a href="https://github.com/freeive" target="_blank" rel="noopener noreferrer" class="group inline-flex items-baseline gap-2 text-[15.5px] text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400">
  <span class="border-b border-current/30 group-hover:border-current">GitHub</span>
  <span aria-hidden>→</span>
  <span class="ml-2 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">외부</span>
</a>`,
      react: `<LinkRow href="https://github.com/freeive" external trailing="외부">
  GitHub
</LinkRow>`,
    },
  ],
  props: [
    { name: "href", type: "string", desc: "링크 경로 (필수)" },
    { name: "external", type: "boolean", desc: "true면 target='_blank' + rel 자동" },
    { name: "trailing", type: "ReactNode", desc: "우측 보조 라벨 (smallcaps)" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "default=hover시 emerald / accent=항상 emerald" },
    { name: "size", type: '"default" | "large"', default: '"default"', desc: "15.5px / 18~20px" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const HEADER_DEF: ComponentDef = {
  id: "header",
  ko: "헤더",
  en: "Header",
  desc: "사이트 상단. 박스 거부, 헤어라인 1px 하단만. 브랜드 + 메뉴 + 단일 CTA의 표준 구성.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 4축 + Talk CTA",
      description: "Freeive 사이트 표준 구성. brand + 4 links + Talk.",
      preview: (
        <div className="-mx-6 md:-mx-8">
          <ACHeader
            brand="Freeive"
            brandHref="#"
            links={[
              { label: "안티 카드", href: "#" },
              { label: "Lab", href: "#" },
              { label: "Heritage", href: "#" },
              { label: "Blog", href: "#" },
            ]}
            cta={{ label: "Talk", href: "#" }}
          />
        </div>
      ),
      prompt: `사이트 상단 헤더가 필요해. 박스 X, 카드 X, 헤어라인 1px 하단만.

구성: 좌측 brand · 가운데 메뉴 · 우측 CTA.

스타일:
- 배경: bg-white/80 dark:bg-zinc-950/80 + backdrop-blur (스크롤 시 본문이 살짝 비침)
- 하단 헤어라인: border-b border-zinc-200/60 dark:border-white/[0.06]
- 패딩: py-4 px-6 md:px-10, max-w-[1200px] mx-auto

브랜드(좌):
- text-[15.5px] font-semibold tracking-tight zinc-900 dark:zinc-50

메뉴(가운데):
- gap-6, text-[14px]
- 비활성: text-zinc-500 dark:text-zinc-400
- hover/활성: text-zinc-900 dark:text-zinc-50

CTA(우, 자동 ml-auto):
- text-[14px] font-medium
- "한 줄 텍스트 + 화살표" 형태 (LinkRow와 동일 톤)
- hover시 emerald

이게 안티 카드 표준 헤더 — sticky가 필요하면 sticky=true.`,
      html: `<header class="border-b border-zinc-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
  <div class="mx-auto flex w-full max-w-[1200px] items-center gap-8 px-6 py-4 md:px-10">
    <a href="/" class="text-[15.5px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      Freeive
    </a>
    <nav class="hidden flex-1 items-center gap-6 md:flex">
      <a href="/anti-card" class="text-[14px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">안티 카드</a>
      <a href="/lab" class="text-[14px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Lab</a>
      <a href="/heritage" class="text-[14px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Heritage</a>
      <a href="/blog" class="text-[14px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Blog</a>
    </nav>
    <a href="/talk" class="ml-auto inline-flex items-baseline gap-1.5 text-[14px] font-medium text-zinc-900 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-400">
      <span class="border-b border-current/40">Talk</span>
      <span aria-hidden>→</span>
    </a>
  </div>
</header>`,
      react: `<Header
  brand="Freeive"
  links={[
    { label: "안티 카드", href: "/anti-card" },
    { label: "Lab", href: "/lab" },
    { label: "Heritage", href: "/heritage" },
    { label: "Blog", href: "/blog" },
  ]}
  cta={{ label: "Talk", href: "/talk" }}
/>`,
    },
    {
      index: "02",
      badge: "minimal",
      title: "minimal — brand + cta only",
      description: "랜딩 페이지처럼 메뉴 없이 brand + CTA만.",
      preview: (
        <div className="-mx-6 md:-mx-8">
          <ACHeader
            brand="Freeive"
            brandHref="#"
            cta={{ label: "Talk", href: "#" }}
          />
        </div>
      ),
      prompt: `랜딩·캠페인 페이지처럼 메뉴를 두지 않고 brand + 단일 CTA만 두는 구성.
links 없이 brand + cta props만 사용. 나머지는 동일.`,
      react: `<Header brand="Freeive" cta={{ label: "Talk", href: "/talk" }} />`,
    },
  ],
  props: [
    { name: "brand", type: "ReactNode", desc: "좌측 브랜드 (필수)" },
    { name: "brandHref", type: "string", default: '"/"', desc: "브랜드 클릭 시 링크" },
    { name: "links", type: "HeaderLink[]", desc: "메뉴 항목 배열 ({label, href, external?, active?})" },
    { name: "cta", type: "{ label, href, external? }", desc: "우측 강조 CTA (1개)" },
    { name: "sticky", type: "boolean", default: "false", desc: "sticky top-0 z-40 적용" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const FOOTER_DEF: ComponentDef = {
  id: "footer",
  ko: "푸터",
  en: "Footer",
  desc: "사이트 하단. 헤어라인 1px 상단 + 충분한 공간. 컬럼 단위 정보 + smallcaps 헤딩.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — brand + 4 columns",
      description: "Freeive 표준 푸터.",
      preview: (
        <div className="-mx-6 md:-mx-8">
          <ACFooter
            brand="Freeive"
            description="1인 랩. 안티 카드 톤으로 만든 사이트와 라이브러리."
            columns={[
              {
                heading: "Pillars",
                links: [
                  { label: "안티 카드", href: "#" },
                  { label: "Lab", href: "#" },
                  { label: "Heritage", href: "#" },
                  { label: "Blog", href: "#" },
                ],
              },
              {
                heading: "Talk",
                links: [
                  { label: "의뢰·문의", href: "#" },
                  { label: "이메일", href: "#" },
                ],
              },
              {
                heading: "Open",
                links: [
                  { label: "GitHub", href: "#", external: true },
                  { label: "npm", href: "#", external: true },
                ],
              },
              {
                heading: "Policies",
                links: [
                  { label: "개인정보", href: "#" },
                  { label: "약관", href: "#" },
                ],
              },
            ]}
            copyright="© 2026 Freeive · kmc8301@gmail.com"
          />
        </div>
      ),
      prompt: `사이트 하단 푸터. 카드 박스 X, 헤어라인 1px 상단만. 정보는 컬럼으로 펼친다.

구성:
- 상단 헤어라인 (border-t border-zinc-200/60 dark:border-white/[0.06])
- 충분한 공간 (py-16 md:py-20)
- 좌측: brand + description (1.5fr)
- 우측: 4 컬럼 grid (3fr) — 각 컬럼 = smallcaps 헤딩 + 링크 리스트
- 하단: 카피라이트 (border-t + smallcaps)

각 컬럼 헤딩:
- text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400
- (Eyebrow와 동일 톤)

각 링크:
- text-[13.5px] text-zinc-600 dark:text-zinc-300
- hover: text-emerald-600 dark:text-emerald-400

박스 거부, 시선 끌지 않고, 정보는 컬럼으로 충분히 펼친다.`,
      react: `<Footer
  brand="Freeive"
  description="1인 랩."
  columns={[
    { heading: "Pillars", links: [...] },
    { heading: "Talk", links: [...] },
    { heading: "Open", links: [...] },
    { heading: "Policies", links: [...] },
  ]}
  copyright="© 2026 Freeive"
/>`,
    },
    {
      index: "02",
      badge: "minimal",
      title: "minimal — brand + copyright",
      description: "단순한 페이지의 미니멀 푸터.",
      preview: (
        <div className="-mx-6 md:-mx-8">
          <ACFooter
            brand="Freeive"
            description="1인 랩."
            copyright="© 2026 Freeive"
          />
        </div>
      ),
      prompt: `1페이지 랜딩이나 단순한 사이트의 미니멀 푸터.
columns 생략하고 brand + description + copyright만. 동일한 헤어라인 + 공간 톤은 유지.`,
      react: `<Footer brand="Freeive" description="1인 랩." copyright="© 2026 Freeive" />`,
    },
  ],
  props: [
    { name: "brand", type: "ReactNode", desc: "좌측 브랜드" },
    { name: "description", type: "ReactNode", desc: "브랜드 아래 짧은 카피" },
    { name: "columns", type: "FooterColumn[]", desc: "{heading, links: [{label, href, external?}]}[]" },
    { name: "copyright", type: "ReactNode", desc: "하단 카피라이트" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const QUOTE_DEF: ComponentDef = {
  id: "quote",
  ko: "인용구",
  en: "Quote",
  desc: "본문 안의 인용. 박스 거부, 좌측 헤어라인 1px + 본문 한 단계 흐림. blockquote + figcaption.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 좌측 헤어라인",
      description: "blockquote + 좌측 border-l 2px + cite는 figcaption.",
      preview: (
        <Quote cite="— Bringhurst, The Elements of Typographic Style">
          한 줄에 65~75자가 가장 읽기 좋다.
        </Quote>
      ),
      prompt: `블로그 본문 안의 인용구가 필요해. 박스 안에 가두지 말고, 좌측 헤어라인 1~2px만으로 위계.

스타일:
- figure 안에 blockquote + figcaption
- blockquote: border-l-2 border-zinc-300 dark:border-white/[0.12], pl-5
- 본문은 lead 토큰 (15px, 색 한 단계 흐림)
- cite는 figcaption — 12px uppercase tracking-[0.08em] zinc-500

박스로 둘러싸지 않는다. 좌측 한 줄 헤어라인이 인용 시그널.`,
      html: `<figure class="my-8">
  <blockquote class="border-l-2 border-zinc-300 dark:border-white/[0.12] pl-5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
    한 줄에 65~75자가 가장 읽기 좋다.
  </blockquote>
  <figcaption class="mt-3 pl-5 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
    — Bringhurst, The Elements of Typographic Style
  </figcaption>
</figure>`,
      react: `<Quote cite="— Bringhurst">
  한 줄에 65~75자가 가장 읽기 좋다.
</Quote>`,
    },
    {
      index: "02",
      badge: "large",
      title: "large — 강조 인용",
      description: "글의 핵심 인용을 강조할 때. leadLarge 토큰 (18~20px).",
      preview: (
        <Quote size="large" cite="— Freeive Manifesto">
          AI가 만들면 다 비슷해진다고 누가 정했나.
        </Quote>
      ),
      prompt: `블로그 글의 핵심 인용. 일반 quote보다 한 단계 큰 톤. leadLarge 토큰(18~20px) 사용.
글에서 1~2번만 — 너무 많이 쓰면 위계 사라짐.`,
      react: `<Quote size="large" cite="— Manifesto">
  AI가 만들면 다 비슷해진다고 누가 정했나.
</Quote>`,
    },
  ],
  props: [
    { name: "cite", type: "ReactNode", desc: "출처 — figcaption smallcaps" },
    { name: "size", type: '"default" | "large"', default: '"default"', desc: "lead / leadLarge 토큰" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const HIGHLIGHT_DEF: ComponentDef = {
  id: "highlight",
  ko: "강조 문장",
  en: "Highlight",
  desc: "본문 안 한 줄 강조. 형광펜 거부 — 색 또는 굵기 변경만으로 강조.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 굵기만 변경",
      description: "본문 톤(15px) + font-medium + zinc-900. mark 태그 X.",
      preview: <ACHighlight>이 한 줄이 핵심이다.</ACHighlight>,
      prompt: `본문 안에서 한 줄 강조가 필요해. shadcn처럼 형광펜(<mark>) 노란 배경 거부.

스타일:
- 본문 사이즈 (15px) 유지
- font-medium (regular → medium 한 단계)
- 색만 zinc-900 dark:zinc-50 (본문 zinc-700보다 한 단계 진하게)

박스 X. 배경 X. "본문에서 살짝 진해진 한 줄"의 가벼움.`,
      html: `<p class="text-[15px] leading-relaxed font-medium text-zinc-900 dark:text-zinc-50">
  이 한 줄이 핵심이다.
</p>`,
      react: `<Highlight>이 한 줄이 핵심이다.</Highlight>`,
    },
    {
      index: "02",
      badge: "accent · large",
      title: "accent + large — 섹션 강조",
      description: "섹션 안 큰 한 줄 강조. emerald 색 + 18~24px.",
      preview: (
        <ACHighlight tone="accent" size="large">
          1인 랩의 가장 강력한 자산은 살아있는 사이트다.
        </ACHighlight>
      ),
      prompt: `섹션 안에서 가장 강한 한 줄 메시지. tone="accent" + size="large" 조합.

용도: 매니페스토 인용, 핵심 원칙, 섹션 결론.
페이지당 1~2번만.`,
      react: `<Highlight tone="accent" size="large">
  1인 랩의 가장 강력한 자산은 살아있는 사이트다.
</Highlight>`,
    },
  ],
  props: [
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "본문 색(굵기만) / emerald" },
    { name: "size", type: '"default" | "large"', default: '"default"', desc: "15px / 18~24px" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const IMAGE_DEF: ComponentDef = {
  id: "image",
  ko: "이미지",
  en: "Image",
  desc: "본문 이미지 + caption. figure + figcaption. 살짝 rounded, 12.5px caption.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — caption 포함",
      description: "img + figcaption. 모서리 살짝 rounded-md, border 없음.",
      preview: (
        <ACImage
          src="https://placehold.co/800x450/0a0a0a/64748b?text=Demo+Screenshot"
          alt="데모 스크린샷"
          caption="첫 번째 데모 — 손가락 그림 그리기"
          ratio="16/9"
        />
      ),
      prompt: `블로그 본문 이미지가 필요해. 박스로 가두지 말고 figure + figcaption만.

스타일:
- figure: my-8
- 컨테이너: rounded-md, bg-zinc-100 dark:bg-white/[0.04] (로딩 중 placeholder)
- img: block w-full
- ratio prop으로 종횡비 강제 (16/9, 4/3, 3/2, 1/1, native)
- figcaption: 12.5px zinc-500 (본문보다 작고 흐림)

shadow / border / 큰 모서리 둥글기 거부. 살짝 rounded-md만.`,
      html: `<figure class="my-8">
  <div class="overflow-hidden rounded-md bg-zinc-100 dark:bg-white/[0.04] aspect-[16/9]">
    <img src="..." alt="..." class="block w-full h-full object-cover" />
  </div>
  <figcaption class="mt-3 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
    첫 번째 데모 — 손가락 그림 그리기
  </figcaption>
</figure>`,
      react: `<Image src="/screenshot.png" alt="..." caption="..." ratio="16/9" />`,
    },
    {
      index: "02",
      badge: "no-caption",
      title: "caption 없음 — 본문 사이 이미지",
      description: "caption 생략. 단순 이미지만.",
      preview: (
        <ACImage
          src="https://placehold.co/600x400/0a0a0a/64748b?text=Image"
          alt="이미지"
          ratio="3/2"
        />
      ),
      prompt: `caption 없이 본문 사이에 이미지만 들어갈 때. caption prop 생략.`,
      react: `<Image src="/photo.png" alt="..." ratio="3/2" />`,
    },
  ],
  props: [
    { name: "src", type: "string", desc: "이미지 경로 (img 표준)" },
    { name: "alt", type: "string", desc: "접근성 텍스트" },
    { name: "caption", type: "ReactNode", desc: "figcaption — 12.5px zinc-500" },
    { name: "ratio", type: '"native" | "16/9" | "4/3" | "3/2" | "1/1"', default: '"native"', desc: "종횡비 강제" },
    { name: "figureClassName", type: "string", desc: "figure 외곽 클래스" },
  ],
};

const VIDEO_DEF: ComponentDef = {
  id: "video",
  ko: "비디오 플레이어",
  en: "Video",
  desc: "본문 비디오 + caption. controls 기본. ratio 강제.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — controls + 16/9",
      description: "video controls + figure + caption. 어두운 placeholder.",
      preview: (
        <Video
          ratio="16/9"
          poster="https://placehold.co/800x450/0a0a0a/64748b?text=Video+Poster"
          caption="손가락 그림 그리기 데모 영상"
        />
      ),
      prompt: `블로그 본문 비디오가 필요해. 기본 controls 노출, 박스 거부.

스타일:
- figure: my-8
- 컨테이너: rounded-md bg-zinc-900 dark:bg-black + ratio 강제 (기본 16/9)
- video: block w-full h-full object-cover
- figcaption: 12.5px zinc-500

src + poster prop. controls 기본 true. autoplay/loop/muted는 표준 video 속성 그대로.`,
      html: `<figure class="my-8">
  <div class="overflow-hidden rounded-md bg-zinc-900 dark:bg-black aspect-[16/9]">
    <video controls poster="..." class="block h-full w-full object-cover">
      <source src="/demo.mp4" type="video/mp4" />
    </video>
  </div>
  <figcaption class="mt-3 text-[12.5px] text-zinc-500 dark:text-zinc-400">
    손가락 그림 그리기 데모 영상
  </figcaption>
</figure>`,
      react: `<Video src="/demo.mp4" poster="/demo.jpg" caption="..." />`,
    },
  ],
  props: [
    { name: "src", type: "string", desc: "비디오 경로 (video 표준)" },
    { name: "poster", type: "string", desc: "재생 전 표시 이미지" },
    { name: "controls", type: "boolean", default: "true", desc: "재생 컨트롤" },
    { name: "ratio", type: '"16/9" | "4/3" | "1/1" | "21/9"', default: '"16/9"', desc: "종횡비" },
    { name: "caption", type: "ReactNode", desc: "figcaption" },
  ],
};

const DEF_LIST_DEF: ComponentDef = {
  id: "definition-list",
  ko: "정의 리스트",
  en: "DefList",
  desc: "term ↔ definition 페어. 시맨틱 dl + dt + dd. 박스 거부, 헤어라인 행 구분.",
  examples: [
    {
      index: "01",
      badge: "row",
      title: "row layout — 좌우 분리",
      description: "데스크톱 [140px term / 1fr def]. 모바일 stack. ListRow와 동일 그리드.",
      preview: (
        <DefList
          items={[
            { term: "출시", definition: "2026 Q2" },
            { term: "기술", definition: "Next.js 16 + PostgreSQL + Tailwind" },
            { term: "라이선스", definition: "MIT" },
          ]}
        />
      ),
      prompt: `프로젝트 메타 정보(출시일, 기술, 라이선스 등)를 페어로 나열. dt + dd 시맨틱.

용도: 블로그 글의 메타, 프로젝트 페이지의 정보 박스, 제품 spec.
스타일: ListRow와 동일한 그리드 (140px term / 1fr def). 헤어라인으로 행 구분. 박스 X.

term: 12px uppercase smallcaps zinc-500 (eyebrow와 동일)
def:  15px leading-relaxed zinc-700 dark:zinc-300`,
      html: `<dl class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <div class="py-4 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-8">
    <dt class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">출시</dt>
    <dd class="text-[15px] leading-relaxed text-zinc-300">2026 Q2</dd>
  </div>
</dl>`,
      react: `<DefList items={[
  { term: "출시", definition: "2026 Q2" },
  { term: "기술", definition: "Next.js + PostgreSQL" },
]} />`,
    },
    {
      index: "02",
      badge: "stack",
      title: "stack layout — 수직",
      description: "term 위 / def 아래. 좁은 영역(사이드바) 또는 모바일 친화.",
      preview: (
        <DefList
          layout="stack"
          items={[
            { term: "Year", definition: "2024" },
            { term: "Client", definition: "EBS" },
            { term: "Role", definition: "재구조화 PM + 개발 리드" },
          ]}
        />
      ),
      prompt: `좁은 영역(사이드바·모바일)에서 정의 리스트. row 대신 stack — term 위, def 아래.`,
      react: `<DefList layout="stack" items={[...]} />`,
    },
  ],
  props: [
    { name: "items", type: "DefListItem[]", desc: "{term, definition}[]" },
    { name: "layout", type: '"row" | "stack"', default: '"row"', desc: "그리드 분리 / 수직 stack" },
  ],
};

const STAT_LIST_DEF: ComponentDef = {
  id: "stat-list",
  ko: "통계 숫자 행",
  en: "StatList",
  desc: "큰 숫자 + smallcaps 라벨. Heritage 카운터(10+/30+/150+) 패턴. 카드 박스 거부.",
  examples: [
    {
      index: "01",
      badge: "row · 3col",
      title: "기본 — 3열 grid + 헤어라인",
      description: "Heritage 표준 패턴. 카드 박스 X, 헤어라인 + 큰 타입 + 라벨.",
      preview: (
        <StatList
          items={[
            { value: "10+", label: "Years" },
            { value: "30+", label: "Clients" },
            { value: "150+", label: "Projects" },
          ]}
        />
      ),
      prompt: `사이트 통계 카운터 (10+ Years / 30+ Clients / 150+ Projects 같은 패턴).
shadcn식 카드 그리드 거부. 헤어라인 + 공간 + 큰 숫자만.

스타일:
- 컨테이너: border-y border-zinc-200 dark:border-white/[0.06], py-10 md:py-12
- grid 2열 (모바일) / 3열 (데스크톱)
- 숫자: clamp(2rem, 4vw, 3rem) font-semibold tracking-tight zinc-900 dark:zinc-50
- 라벨: 12px uppercase tracking-[0.08em] zinc-500 (eyebrow 톤)

각 항목 사이 박스 X — 충분한 여백(gap)만으로 분리.`,
      html: `<dl class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 border-y border-white/[0.06] py-10 md:py-12">
  <div>
    <dt class="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-tight text-zinc-50">10+</dt>
    <dd class="mt-3 text-[12px] uppercase tracking-[0.08em] text-zinc-400">Years</dd>
  </div>
</dl>`,
      react: `<StatList items={[
  { value: "10+", label: "Years" },
  { value: "30+", label: "Clients" },
  { value: "150+", label: "Projects" },
]} />`,
    },
    {
      index: "02",
      badge: "with hint",
      title: "hint 추가",
      description: "각 통계에 보조 설명 (작은 글씨).",
      preview: (
        <StatList
          items={[
            { value: "30+", label: "Clients", hint: "텔레콤·금융·교육 포함" },
            { value: "150+", label: "Projects", hint: "2016~2022" },
          ]}
        />
      ),
      prompt: `통계에 짧은 설명이 더 필요할 때. hint prop으로 작은 글씨 추가 (12.5px zinc-500).`,
      react: `<StatList items={[
  { value: "30+", label: "Clients", hint: "텔레콤·금융·교육 포함" },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "StatItem[]", desc: "{value, label, hint?}[]" },
    { name: "layout", type: '"row" | "stack"', default: '"row"', desc: "grid 가로 / 수직 stack (헤어라인 행)" },
  ],
};

const TIMELINE_DEF: ComponentDef = {
  id: "timeline",
  ko: "타임라인",
  en: "Timeline",
  desc: "시간 순 행. ListRow와 비슷하지만 좌측 when에 특화. ol 시맨틱.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — when + title + desc",
      description: "ol 안에 헤어라인 행. 좌측 when 120px / 우측 본문.",
      preview: (
        <Timeline
          items={[
            { when: "2026", title: "anti-card 0.1.0 출시", description: "P0 8 컴포넌트 + 타이포 토큰" },
            { when: "2024", title: "EBS 온라인 클래스", description: "재구조화 PM + 개발 리드" },
            { when: "2022", title: "Preive 마지막 큰 싸움", description: "라이나생명 디지털채널 재구축" },
          ]}
        />
      ),
      prompt: `시간 순 항목 나열 (Heritage 연도별, 변경 이력, 학습 일지 등). ol 시맨틱.

용도: Heritage의 연대표, blog의 변경 이력, 프로젝트 마일스톤.

스타일:
- ol: divide-y border-y zinc-200 dark:white/[0.06]
- 각 li: grid-cols-1 md:grid-cols-[120px_1fr] gap-1 md:gap-8 py-6
- when (좌, 120px): 12px uppercase tracking-[0.08em] zinc-500 (eyebrow 톤)
- title: 15.5px font-medium zinc-900 dark:zinc-100
- description: 14px leading-relaxed zinc-600 dark:zinc-400

href 있으면 a로 감싸지고 hover시 emerald.`,
      html: `<ol class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
  <li>
    <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-1 md:gap-8 py-6">
      <div class="text-[12px] uppercase tracking-[0.08em] text-zinc-500">2026</div>
      <div>
        <div class="text-[15.5px] font-medium text-zinc-100">anti-card 0.1.0 출시</div>
        <div class="mt-1.5 text-[14px] text-zinc-400">P0 8 컴포넌트 + 타이포 토큰</div>
      </div>
    </div>
  </li>
</ol>`,
      react: `<Timeline items={[
  { when: "2026", title: "0.1.0 출시", description: "..." },
  { when: "2024", title: "EBS 재구조화" },
]} />`,
    },
    {
      index: "02",
      badge: "linkable",
      title: "클릭 가능 (href)",
      description: "각 항목에 href. hover시 emerald + 살짝 배경.",
      preview: (
        <Timeline
          items={[
            { when: "2024", title: "미니북 저작 퍼블리셔", href: "#" },
            { when: "2023", title: "mydata 수집 admin", href: "#" },
          ]}
        />
      ),
      prompt: `각 행이 상세 페이지로 이동하는 경우. href prop으로 a 태그 자동.`,
      react: `<Timeline items={[
  { when: "2024", title: "프로젝트 A", href: "/heritage/a" },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "TimelineItem[]", desc: "{when, title, description?, href?}[]" },
    { name: "className", type: "string", desc: "Tailwind 클래스 추가" },
  ],
};

const PILL_DEF: ComponentDef = {
  id: "pill",
  ko: "필 / 태그",
  en: "Pill / Tag",
  desc: "작은 라벨·태그·필터 칩. 둥근 사각, 12.5px, 살짝 border + bg.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 중성 톤",
      description: "blog 태그, 카테고리 라벨. span 시맨틱.",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Pill>NPM</Pill>
          <Pill>AI Skill</Pill>
          <Pill>Tailwind</Pill>
        </div>
      ),
      prompt: `블로그 태그·카테고리·기술 스택 등 작은 라벨이 필요해.

스타일:
- inline-flex rounded-md border px-2.5 py-1 text-[12.5px]
- default tone: 살짝 회색 bg + 회색 border (zinc-50/white/[0.03])
- transition-colors hover시 border 진해짐

shadcn Badge처럼 화려한 색 거부. 본문에 자연스럽게 섞이는 가벼운 톤.`,
      html: `<span class="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[12.5px] text-zinc-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300">
  NPM
</span>`,
      react: `<Pill>NPM</Pill>`,
    },
    {
      index: "02",
      badge: "active · accent",
      title: "활성 / accent 톤",
      description: "필터 선택 상태(active) 또는 강조(accent).",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Pill active>전체</Pill>
          <Pill>학습 일지</Pill>
          <Pill>AI 워크플로우</Pill>
          <Pill tone="accent">Live</Pill>
        </div>
      ),
      prompt: `필터 선택 상태나 진행 중 표시.
- active=true: emerald-500/[0.12] 배경 + emerald 텍스트
- tone="accent": active와 비슷한 emerald 톤이지만 살짝 더 흐림 (선택은 안된 상태에서 액센트만)`,
      react: `<Pill active>전체</Pill>
<Pill>학습 일지</Pill>
<Pill tone="accent">Live</Pill>`,
    },
    {
      index: "03",
      badge: "as=a",
      title: "링크 — as='a'",
      description: "클릭 가능한 태그 (블로그 카테고리 필터 등).",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Pill as="a" href="#">학습 일지</Pill>
          <Pill as="a" href="#" tone="accent">AI 워크플로우</Pill>
        </div>
      ),
      prompt: `Pill을 클릭 가능한 링크로. as="a" + href.`,
      react: `<Pill as="a" href="/blog?tag=ai">AI 워크플로우</Pill>`,
    },
  ],
  props: [
    { name: "as", type: '"span" | "a"', default: '"span"', desc: "시맨틱 태그" },
    { name: "href", type: "string", desc: "as='a'일 때 링크" },
    { name: "external", type: "boolean", desc: "외부 링크" },
    { name: "tone", type: '"default" | "accent" | "muted"', default: '"default"', desc: "색 톤" },
    { name: "active", type: "boolean", default: "false", desc: "활성 상태 (필터 선택)" },
  ],
};

const HERO_PATTERN_DEF: ComponentDef = {
  id: "hero-pattern",
  ko: "히어로 (메인 첫 화면)",
  en: "HeroPattern",
  desc: "Eyebrow + HeroHeading + Lead + LinkRow×N 조합 패턴. 페이지 첫 화면을 한 번에.",
  examples: [
    {
      index: "01",
      badge: "size · hero",
      title: "메인 페이지 hero (40~64px)",
      description: "사이트 메인. size='hero' + accent CTA + default CTA.",
      preview: (
        <HeroPattern
          size="hero"
          eyebrow="Freeive — Solo lab, est. 2016"
          title={
            <>
              1인 운영자의<br />
              <span className="text-zinc-400 dark:text-zinc-400">무기를 만드는</span><br />
              1인 랩.
            </>
          }
          lead="외주 에이전시가 아닙니다. 자체 UI 프레임워크와 카메라 기반 공간 UI 연구."
          ctas={[
            { label: "안티 카드 살펴보기", href: "#", tone: "accent" },
            { label: "Talk · 이기는 싸움만", href: "#" },
          ]}
        />
      ),
      prompt: `사이트 메인 페이지의 hero 영역 통째로. Eyebrow + HeroHeading(size='hero', 40~64px) + Lead(large) + LinkRow 2개.
첫 LinkRow는 accent (강조), 두 번째는 default. 박스 거부 — 모든 요소가 한 줄 텍스트 + 큰 타입 + 공간으로만 구성.`,
      react: `<HeroPattern
  size="hero"
  eyebrow="Freeive — Solo lab, est. 2016"
  title="1인 운영자의 무기를 만드는 1인 랩."
  lead="외주 에이전시가 아닙니다."
  ctas={[
    { label: "안티 카드", href: "/anti-card", tone: "accent" },
    { label: "Talk", href: "/talk" },
  ]}
/>`,
    },
    {
      index: "02",
      badge: "size · page",
      title: "일반 페이지 hero (30~48px)",
      description: "Lab/Heritage/Blog 등 일반 페이지. size='page' default.",
      preview: (
        <HeroPattern
          eyebrow="Heritage · 2016 — Now"
          title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
          lead="텔레콤·금융·교육·기업시스템·미디어의 큰 싸움을 거친 깊이."
        />
      ),
      prompt: `일반 페이지(Lab/Heritage/Blog) 첫 화면. size 생략(default 'page'). HeroHeading 30~48px.
ctas 생략하면 hero 영역에 CTA 없이 제목 + 본문만.`,
      react: `<HeroPattern
  eyebrow="Heritage · 2016 — Now"
  title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
  lead="..."
/>`,
    },
  ],
  props: [
    { name: "eyebrow", type: "ReactNode", desc: "smallcaps 라벨" },
    { name: "title", type: "ReactNode", desc: "큰 제목 (필수)" },
    { name: "lead", type: "ReactNode", desc: "인트로 본문" },
    { name: "ctas", type: "HeroPatternCTA[]", desc: "0~3개 권장. 첫 번째는 accent" },
    { name: "size", type: '"page" | "hero"', default: '"page"', desc: "page 30~48 / hero 40~64 (메인 1회)" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬" },
    { name: "padding", type: '"default" | "tight" | "loose"', default: '"default"', desc: "상하 패딩" },
  ],
};

const SECTORS_PATTERN_DEF: ComponentDef = {
  id: "sectors-pattern",
  ko: "섹터 리스트 페이지",
  en: "SectorsPattern",
  desc: "Heritage 표준 — 좌측 섹터(smallcaps) + 우측 ListRow 행. 카드 그리드 거부.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 섹터 + 프로젝트 리스트",
      description: "데스크톱 12열 grid (섹터 3 / 프로젝트 9). 모바일 stack.",
      preview: (
        <SectorsPattern
          sectors={[
            {
              name: "Telecom",
              subtitle: "3 projects",
              projects: [
                { year: "2022", title: "라이나생명 디지털채널 재구축", client: "라이나" },
                { year: "2020", title: "통신사 mydata 수집 admin", client: "롯데카드" },
              ],
            },
            {
              name: "Education",
              subtitle: "2 projects",
              projects: [
                { year: "2021", title: "EBS 온라인 클래스 재구조화", client: "EBS" },
                { year: "2019", title: "미니북 저작 퍼블리셔", client: "아이스크림" },
              ],
            },
          ]}
        />
      ),
      prompt: `Heritage 페이지처럼 산업/도메인 섹터별로 프로젝트를 나열. 좌측 섹터명 + 우측 프로젝트 행.

스타일:
- 컨테이너: divide-y border-y zinc-200 dark:white/[0.06]
- 각 섹터: grid 12열 (md:col-span-3 + md:col-span-9)
- 좌측: 섹터명 (smallcaps) + 보조 (projects count)
- 우측: ListRow 행들 (year / title / client)

shadcn 카드 그리드 거부. 모든 정보를 행으로.`,
      react: `<SectorsPattern sectors={[
  { name: "Telecom", subtitle: "3 projects", projects: [
    { year: "2022", title: "...", client: "라이나" },
  ]},
]} />`,
    },
  ],
  props: [
    { name: "sectors", type: "SectorsPatternSector[]", desc: "{name, subtitle?, projects: [{year, title, client?, href?}]}[]" },
  ],
};

const TALK_PATTERN_DEF: ComponentDef = {
  id: "talk-pattern",
  ko: "Talk·Contact",
  en: "TalkPattern",
  desc: "Talk 페이지 — Hero + 받음/안받음 체크리스트 + 연락 채널.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "Talk 페이지 표준",
      description: "이기는 싸움만 받음. 의뢰 가능성을 명시적으로 분리.",
      preview: (
        <TalkPattern
          eyebrow="Talk · 의뢰·문의"
          title="이기는 싸움만 받습니다."
          lead="외주 에이전시가 아닙니다. 단 1인 랩의 깊이가 필요한 일에만."
          acceptList={[
            "B2B 의뢰 (계약·법인 사업)",
            "1인 랩과의 협업 / 공동 프로젝트",
            "AI UI / 안티 카드 톤 컨설팅",
          ]}
          declineList={[
            "가격 경쟁 입찰",
            "양산형 사이트 / 템플릿 작업",
            "테스트성 PoC 의뢰",
          ]}
          channels={[
            { label: "Email", value: "ive@freeive.com", href: "mailto:ive@freeive.com" },
            { label: "GitHub", value: "kimminchul/anticard", href: "https://github.com/kimminchul/anticard", external: true },
          ]}
        />
      ),
      prompt: `Talk·Contact 페이지를 안티 카드 톤으로 한 번에. 일반 폼 페이지 거부 — "받는 일 / 안 받는 일"을 명시.

구성:
- HeroPattern (eyebrow + 큰 제목 + lead)
- 받음(accept) / 안 받음(decline) 2열 체크리스트 (받음=emerald ✓, 안받음=zinc ✕)
- 연락 채널 (Email, GitHub 등) DefList 패턴

1인 랩 정체성 — "이기는 싸움만"을 의사결정자에게 직접 알리는 페이지.`,
      react: `<TalkPattern
  title="이기는 싸움만 받습니다."
  acceptList={["B2B 의뢰", "1인 랩 협업"]}
  declineList={["가격 경쟁", "양산형 사이트"]}
  channels={[{ label: "Email", value: "ive@...", href: "mailto:..." }]}
/>`,
    },
  ],
  props: [
    { name: "eyebrow / title / lead", type: "ReactNode", desc: "Hero 영역 (HeroPattern 내장)" },
    { name: "acceptList", type: "ReactNode[]", desc: "받는 일 (✓ emerald)" },
    { name: "declineList", type: "ReactNode[]", desc: "안 받는 일 (✕ zinc)" },
    { name: "channels", type: "[{label, value, href?, external?}]", desc: "연락 채널 DefList" },
  ],
};

const EMPTY_STATE_DEF: ComponentDef = {
  id: "empty-error",
  ko: "빈 상태 / 404",
  en: "EmptyState",
  desc: "빈 상태·404·error 페이지. 큰 code(숫자) + 짧은 메시지 + LinkRow 액션.",
  examples: [
    {
      index: "01",
      badge: "404",
      title: "404 — 가운데 정렬",
      description: "큰 코드 + smallcaps + 제목 + 설명 + 홈으로 LinkRow.",
      preview: (
        <EmptyState
          code="404"
          eyebrow="Not found"
          title="찾으시는 페이지가 없습니다."
          description="이미 옮겨졌거나 잘못된 경로일 수 있어요. 홈에서 다시 시작해 주세요."
          actions={[
            { label: "홈으로 돌아가기", href: "#", tone: "accent" },
            { label: "Talk · 직접 알리기", href: "#" },
          ]}
          align="center"
        />
      ),
      prompt: `404 / 빈 상태 페이지. 카드 박스 거부. 큰 code(숫자) + smallcaps + 큰 제목 + 설명 + LinkRow.
align="center"가 기본 권장 (404은 시각 임팩트).`,
      react: `<EmptyState
  code="404"
  eyebrow="Not found"
  title="찾으시는 페이지가 없습니다."
  actions={[{ label: "홈으로", href: "/" }]}
  align="center"
/>`,
    },
    {
      index: "02",
      badge: "empty-list",
      title: "빈 리스트 (코드 없음)",
      description: "blog/heritage 등 데이터 없을 때. code 생략, 좌측 정렬.",
      preview: (
        <EmptyState
          eyebrow="Blog"
          title="아직 글이 없습니다."
          description="곧 학습 일지부터 채워나갑니다."
        />
      ),
      prompt: `데이터 없는 페이지(빈 블로그, 빈 Heritage 등). code 생략 → smallcaps + 큰 제목 + 설명만.
416 / 500 / "준비 중" 등 다양한 빈 상태에 사용 가능.`,
      react: `<EmptyState
  eyebrow="Blog"
  title="아직 글이 없습니다."
  description="곧 학습 일지부터..."
/>`,
    },
  ],
  props: [
    { name: "code", type: "ReactNode", desc: "큰 숫자/코드 (예: 404)" },
    { name: "eyebrow", type: "ReactNode", desc: "smallcaps" },
    { name: "title", type: "ReactNode", desc: "큰 제목 (필수)" },
    { name: "description", type: "ReactNode", desc: "보조 설명" },
    { name: "actions", type: "[{label, href, tone?}]", desc: "LinkRow 액션들" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬 (404는 center 권장)" },
  ],
};

const CTA_SECTION_DEF: ComponentDef = {
  id: "cta-section",
  ko: "CTA 섹션",
  en: "CTASection",
  desc: "페이지 하단 CTA. 헤어라인 + h2 제목 + Lead + LinkRow 묶음.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 헤어라인 + 좌측 정렬",
      description: "페이지 자연스러운 마무리로서 액션 유도.",
      preview: (
        <CTASection
          eyebrow="Talk"
          title="이기는 싸움이 있다면 알려주세요."
          lead="간단한 의뢰 메모로 충분합니다. 1인 랩이 직접 응답합니다."
          actions={[
            { label: "Talk 페이지로", href: "#", tone: "accent" },
            { label: "이메일", href: "#" },
          ]}
        />
      ),
      prompt: `페이지 하단 CTA 영역. 헤어라인 위 + h2 제목 + Lead + LinkRow.

스타일:
- 위쪽 헤어라인: border-t border-zinc-200/60 dark:white/[0.06]
- 패딩: py-16 md:py-20
- 제목: SectionHeading h2 톤
- LinkRow 1~2개 (accent + default)

박스 거부 — 페이지 마무리로서 자연스러운 액션 유도.`,
      react: `<CTASection
  eyebrow="Talk"
  title="이기는 싸움이 있다면 알려주세요."
  lead="간단한 의뢰 메모로 충분합니다."
  actions={[{ label: "Talk", href: "/talk", tone: "accent" }]}
/>`,
    },
  ],
  props: [
    { name: "eyebrow", type: "ReactNode", desc: "smallcaps" },
    { name: "title", type: "ReactNode", desc: "h2 톤 제목 (필수)" },
    { name: "lead", type: "ReactNode", desc: "보조 카피" },
    { name: "actions", type: "CTASectionAction[]", desc: "1~2개 권장" },
    { name: "divider", type: "boolean", default: "true", desc: "위쪽 헤어라인" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬" },
  ],
};

const BANNER_DEF: ComponentDef = {
  id: "banner",
  ko: "알림 배너",
  en: "Banner",
  desc: "작은 알림 띠. 페이지 상단 또는 본문 사이. 큰 박스 X, 헤어라인 + 살짝 톤 배경.",
  examples: [
    {
      index: "01",
      badge: "tone × 4",
      title: "4가지 톤",
      description: "info / accent / warning / danger.",
      preview: (
        <div className="space-y-3">
          <Banner label="공지">새 마일스톤 0.3.0 작업 중 — 페이지 패턴 + 액션.</Banner>
          <Banner tone="accent" label="Live">anti-card 0.2.0 출시 — 19개 컴포넌트.</Banner>
          <Banner tone="warning" label="알림">env not set — 환경 변수 확인 필요.</Banner>
          <Banner tone="danger" label="에러">데이터베이스 연결 실패.</Banner>
        </div>
      ),
      prompt: `페이지 상단 또는 본문 사이의 작은 알림 띠. shadcn Alert처럼 큰 박스 X.

스타일:
- border-y (위 아래 헤어라인) + 살짝 톤 배경
- 좌측 label (smallcaps 11px) + 본문 + 우측 action / dismiss
- tone: info(zinc) / accent(emerald) / warning(yellow) / danger(rose)

큰 둥근 박스 거부. 띠 형태로 본문 흐름 거의 안 막음.`,
      react: `<Banner tone="accent" label="Live">
  anti-card 0.2.0 출시
</Banner>

<Banner tone="warning" label="알림" onDismiss={() => {}}>
  env not set
</Banner>`,
    },
  ],
  props: [
    { name: "tone", type: '"info" | "accent" | "warning" | "danger"', default: '"info"', desc: "색 톤" },
    { name: "label", type: "ReactNode", desc: "좌측 라벨 (smallcaps)" },
    { name: "action", type: "ReactNode", desc: "우측 액션" },
    { name: "onDismiss", type: "() => void", desc: "닫기 버튼 자동 노출" },
  ],
};

const BUTTON_PRIMARY_DEF: ComponentDef = {
  id: "button-primary",
  ko: "기본 버튼",
  en: "Button (Primary)",
  desc: "채워진 박스 버튼. 폼 submit, 모달 confirm 등 진짜 button. variant='primary'.",
  examples: [
    {
      index: "01",
      badge: "tone · default",
      title: "기본 — neutral 채움",
      description: "zinc-900 배경 (라이트) / zinc-50 배경 (다크). 본문과 강한 대비.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button>전송</Button>
          <Button size="small">작게</Button>
          <Button size="large">크게</Button>
        </div>
      ),
      prompt: `진짜 button이 필요한 곳 — 폼 submit, 모달 confirm, 게시글 발행 등.
일반 페이지 CTA는 LinkRow 권장. Button은 form/dialog 전용.

스타일:
- variant="primary" tone="default": bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900
- rounded-md (살짝 둥글게, shadcn보다 약함)
- shadow X, gradient X, ring X

size: small (px-3 py-1.5 13px) / default (px-4 py-2 14px) / large (px-5 py-2.5 15px)`,
      react: `<Button type="submit">전송</Button>
<Button size="small">취소</Button>`,
    },
    {
      index: "02",
      badge: "tone · accent",
      title: "accent — emerald",
      description: "주요 액션. 페이지당 1번만.",
      preview: <Button tone="accent">발행하기</Button>,
      prompt: `페이지 안 가장 강조하고 싶은 액션 (발행, 결제, 구독 등). 페이지당 1번만 — 남발 X.
스타일: bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950.`,
      react: `<Button tone="accent">발행하기</Button>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary"', default: '"primary"', desc: "primary=채움 / secondary=헤어라인 only" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "neutral / emerald (primary 전용)" },
    { name: "leadingIcon / trailingIcon", type: "ReactNode", desc: "아이콘 (선택)" },
    { name: "...rest", type: "ButtonHTMLAttributes<HTMLButtonElement>", desc: "type / onClick / disabled 등 표준" },
  ],
};

const BUTTON_SECONDARY_DEF: ComponentDef = {
  id: "button-secondary",
  ko: "보조 버튼",
  en: "Button (Secondary)",
  desc: "헤어라인 only 버튼. 채움 X, border만. variant='secondary'.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 헤어라인 only",
      description: "취소·뒤로가기 같은 보조 액션.",
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">취소</Button>
          <Button variant="secondary" size="small">뒤로</Button>
          <Button variant="secondary" size="large">자세히</Button>
        </div>
      ),
      prompt: `secondary 액션 — primary 옆에서 보조 역할. 채움 X, border만.

스타일:
- variant="secondary": border border-zinc-300 dark:border-white/[0.15]
- bg-transparent (호버시 zinc-50 / dark:white/[0.03])
- text-zinc-900 dark:text-zinc-100

primary와 같은 size 시스템 (small/default/large). 보통 primary와 함께 한 쌍 (취소 + 확인).`,
      react: `<Button variant="secondary">취소</Button>`,
    },
    {
      index: "02",
      badge: "pair",
      title: "primary + secondary 쌍",
      description: "모달·폼의 표준 — 좌측 secondary(취소) / 우측 primary(확인).",
      preview: (
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="secondary">취소</Button>
          <Button variant="primary" tone="accent">확인</Button>
        </div>
      ),
      prompt: `모달·폼 풋터의 표준 패턴. justify-end로 우측 정렬.
원칙: secondary가 좌측, primary가 우측 (눈의 마지막 도착점이 primary 액션).`,
      react: `<div className="flex justify-end gap-3">
  <Button variant="secondary">취소</Button>
  <Button variant="primary" tone="accent">확인</Button>
</div>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary"', default: '"primary"', desc: "primary=채움 / secondary=헤어라인" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈" },
    { name: "...rest", type: "ButtonHTMLAttributes<HTMLButtonElement>", desc: "표준" },
  ],
};

const FEATURE_ROW_DEF: ComponentDef = {
  id: "feature-row",
  ko: "특징 나열 행",
  en: "FeatureRow",
  desc: "특징·장점 나열. 카드 그리드 거부, 좌측 라벨/번호 + 우측 본문.",
  examples: [
    {
      index: "01",
      badge: "row · label",
      title: "row layout — 좌측 라벨",
      description: "smallcaps 라벨로 분류. ListRow 비슷하지만 description이 더 길어도 OK.",
      preview: (
        <FeatureRow
          items={[
            {
              label: "Speed",
              title: "1인 랩의 속도",
              description: "결정자가 직접 의사결정. 이메일 한 통이면 시작.",
            },
            {
              label: "Depth",
              title: "큰 싸움의 깊이",
              description: "150건+ 프로젝트 경험. 텔레콤·금융·교육의 큰 무대를 거친 시선.",
            },
            {
              label: "Tone",
              title: "안티 카드 톤",
              description: "AI 동질화 거부. 자체 UI 프레임워크로 시각 정체성.",
            },
          ]}
        />
      ),
      prompt: `랜딩 페이지의 특징 3~5개 나열. shadcn 카드 그리드 거부, 행 레이아웃.

스타일:
- ol: divide-y border-y zinc-200 dark:white/[0.06]
- 각 li: grid [120px label / 1fr 본문] (모바일 stack)
- label: 12px uppercase smallcaps zinc-500
- title: 18px font-semibold zinc-900 dark:zinc-50
- description: 14.5px leading-relaxed zinc-600 dark:zinc-400

설명이 ListRow보다 길어도 OK (max-w-[58ch]).`,
      react: `<FeatureRow items={[
  { label: "Speed", title: "1인 랩의 속도", description: "..." },
  { label: "Depth", title: "큰 싸움의 깊이", description: "..." },
]} />`,
    },
    {
      index: "02",
      badge: "numbered",
      title: "numbered layout — 자동 번호",
      description: "01/02/03 자동. 단계 / 순서가 있는 특징.",
      preview: (
        <FeatureRow
          layout="numbered"
          items={[
            { title: "정체성 정리", description: "1인 랩 / 안티 카드 / Lab / Heritage 4축." },
            { title: "사이트 골격", description: "anti-card 컴포넌트로 메인 hero + 4축 ListRow." },
            { title: "콘텐츠 채우기", description: "블로그 첫 글, Heritage 사례 정리." },
          ]}
        />
      ),
      prompt: `단계·순서가 있는 특징. layout="numbered"로 자동 01/02/03 번호. label prop 생략.
font-mono 번호로 시각 분리.`,
      react: `<FeatureRow layout="numbered" items={[
  { title: "정체성 정리", description: "..." },
  { title: "사이트 골격", description: "..." },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "FeatureRowItem[]", desc: "{label?, title, description?}[]" },
    { name: "layout", type: '"row" | "numbered"', default: '"row"', desc: "label 사용 / 자동 번호" },
  ],
};

const CLIENT_LOGOS_DEF: ComponentDef = {
  id: "client-logos",
  ko: "클라이언트 로고 띠",
  en: "ClientLogos",
  desc: "박스 거부, grayscale 로고. hover 시 컬러. 로고 없으면 텍스트로 대체.",
  examples: [
    {
      index: "01",
      badge: "grid · text-only",
      title: "기본 — 텍스트만 (로고 이미지 없음)",
      description: "이미지 자산 준비 전 단계. 텍스트로 임시 표시.",
      preview: (
        <ClientLogos
          eyebrow="Clients"
          items={[
            { name: "EBS" },
            { name: "라이나생명" },
            { name: "롯데카드" },
            { name: "아이스크림미디어" },
            { name: "통신3사" },
          ]}
        />
      ),
      prompt: `클라이언트/파트너 로고 띠가 필요한데 아직 로고 이미지가 없을 때. 텍스트로 임시 표시.

스타일:
- border-y (헤어라인 위/아래) + py-10 md:py-12
- grid 2열 (모바일) / 4~5열 (데스크톱)
- 텍스트: 12.5px uppercase tracking-[0.08em] zinc-500 (smallcaps 톤)
- hover시 zinc-900 dark:zinc-100 (살아있는 표시)

shadcn 카드 그리드 거부. 로고는 정보가 아니라 시그널 — 살짝 회색 톤으로 본문 흐름 거의 안 막음.`,
      react: `<ClientLogos eyebrow="Clients" items={[
  { name: "EBS" },
  { name: "라이나생명" },
  { name: "롯데카드" },
]} />`,
    },
    {
      index: "02",
      badge: "row",
      title: "row layout — 가로 한 줄",
      description: "클라이언트가 적을 때 (3~5개). 가로 정렬 + flex-wrap.",
      preview: (
        <ClientLogos
          layout="row"
          items={[
            { name: "EBS" },
            { name: "라이나" },
            { name: "롯데카드" },
          ]}
        />
      ),
      prompt: `클라이언트가 3~5개 정도로 적을 때 grid보다 가로 한 줄이 자연스러움. layout="row".`,
      react: `<ClientLogos layout="row" items={[
  { name: "EBS" }, { name: "라이나" }, { name: "롯데카드" },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "ClientLogoItem[]", desc: "{name, logo?, href?, external?}[]" },
    { name: "layout", type: '"grid" | "row"', default: '"grid"', desc: "균등 그리드 / 가로 wrap" },
    { name: "eyebrow", type: "ReactNode", desc: "좌측 라벨 (예: Clients)" },
  ],
};

const TESTIMONIAL_DEF: ComponentDef = {
  id: "testimonial",
  ko: "사용자 후기",
  en: "Testimonial",
  desc: "박스 거부, 좌측 헤어라인 + 인용 + 작성자 묶음. Quote의 확장.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — lead 톤 + 작성자",
      description: "본문 인용 + 작성자 정보 (avatar / name / title·company).",
      preview: (
        <Testimonial author={{ name: "김OO", title: "PM", company: "EBS" }}>
          1인 랩이 대형 에이전시 PM보다 빠르게 결정해서 놀랐습니다.
          그리고 결과물의 깊이가 다릅니다.
        </Testimonial>
      ),
      prompt: `사이트에 클라이언트 후기를 인용으로 표시. 박스 거부, 좌측 헤어라인 + 본문 + 작성자 묶음.

스타일:
- figure: my-10
- blockquote: border-l-2 + pl-6, lead 토큰 (15px, zinc-600 dark:zinc-300)
- figcaption: 9x9 avatar(없으면 이니셜) + name(zinc-900 medium) + title·company(zinc-500 12.5px)

박스 안에 후기를 가두지 않는다 — 인용은 본문 안의 확장.`,
      react: `<Testimonial author={{ name: "김OO", title: "PM", company: "EBS" }}>
  1인 랩이 대형 에이전시 PM보다 빠르게 결정해서 놀랐습니다.
</Testimonial>`,
    },
    {
      index: "02",
      badge: "large",
      title: "large — 섹션 강조 후기",
      description: "랜딩 페이지 핵심 후기 (22~32px). 글당 1회.",
      preview: (
        <Testimonial
          size="large"
          author={{ name: "박OO", title: "디자인 리드", company: "라이나생명" }}
        >
          “안티 카드 톤이 우리 브랜드의 톤을 대체했습니다.
          이젠 다른 사이트로 못 돌아가요.”
        </Testimonial>
      ),
      prompt: `랜딩 페이지 핵심 영역에 들어가는 강조 후기. size="large".
크기는 큰데 굵기는 medium 유지 (heavy bold 거부).`,
      react: `<Testimonial size="large" author={{ name: "박OO", title: "디자인 리드", company: "라이나" }}>
  안티 카드 톤이 우리 브랜드의 톤을 대체했습니다.
</Testimonial>`,
    },
  ],
  props: [
    { name: "author", type: "TestimonialAuthor", desc: "{name, title?, company?, avatar?}" },
    { name: "size", type: '"default" | "large"', default: '"default"', desc: "lead 15px / 22~32px 강조" },
    { name: "children", type: "ReactNode", desc: "인용 본문" },
  ],
};

const STAT_BLOCK_DEF: ComponentDef = {
  id: "stat-block",
  ko: "큰 통계 블록",
  en: "StatBlock",
  desc: "단일 큰 통계. StatList(여러 행)과 다름 — 한 영역을 큰 숫자로 채움.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 숫자 + 라벨 + 설명",
      description: "value + smallcaps label + Lead 설명.",
      preview: (
        <StatBlock
          value="150+"
          label="Projects"
          description="2016~2022, Preive 시절 누적 프로젝트 수. 텔레콤·금융·교육·기업시스템·미디어 5개 섹터."
        />
      ),
      prompt: `이 페이지의 핵심 숫자 1개를 강조. StatList(여러 행)과 다름 — 단일 큰 숫자로 영역을 채움.

스타일:
- value: clamp(2.5rem, 6vw, 4.5rem) (40~72px)
- label: 12px uppercase smallcaps (eyebrow 톤)
- description: lead 토큰 (15px, max-w-[52ch])
- 패딩: py-12 md:py-16

언제 쓰는가:
- 페이지의 한 영역을 "이 숫자가 핵심"으로 채울 때
- StatBlock은 1번 / StatList는 3개 묶음 — 다른 용도`,
      react: `<StatBlock
  value="150+"
  label="Projects"
  description="2016~2022, Preive 시절 누적 프로젝트 수."
/>`,
    },
    {
      index: "02",
      badge: "trend",
      title: "trend — 추세 표시",
      description: "↑/↓/→ 화살표 + 추세 값. 전년 대비 등.",
      preview: (
        <StatBlock
          value="+38%"
          label="완강율"
          trend={{ direction: "up", value: "vs. 전년 동기" }}
          description="EBS 온라인 클래스 재구조화 후 6개월 측정값."
        />
      ),
      prompt: `통계에 추세를 추가. trend.direction = "up" | "down" | "flat".
색: up=emerald / down=rose / flat=zinc.

전년 대비, 첫 출시 대비 등 변화 표현.`,
      react: `<StatBlock
  value="+38%"
  label="완강율"
  trend={{ direction: "up", value: "vs. 전년 동기" }}
/>`,
    },
    {
      index: "03",
      badge: "size · xl · center",
      title: "xl — 가장 큰 강조 (페이지 hero급)",
      description: "거대한 숫자로 페이지 영역 채움. 가운데 정렬 권장.",
      preview: (
        <StatBlock
          size="xl"
          align="center"
          value="10+"
          label="Years of solo lab"
          description="2016 Preive 첫 외주 → 2026 1인 랩 정체성 정리. 10년의 큰 싸움."
        />
      ),
      prompt: `페이지 hero급 거대 숫자. size="xl" + align="center". clamp(3rem, 9vw, 7rem) — 48~112px.
페이지당 1번만. 사용 빈도 낮음.`,
      react: `<StatBlock size="xl" align="center" value="10+" label="Years" description="..." />`,
    },
  ],
  props: [
    { name: "value", type: "ReactNode", desc: "큰 숫자" },
    { name: "label", type: "ReactNode", desc: "smallcaps 라벨" },
    { name: "description", type: "ReactNode", desc: "보조 본문 (Lead 톤)" },
    { name: "trend", type: '{direction: "up" | "down" | "flat", value: ReactNode}', desc: "추세 표시" },
    { name: "align", type: '"left" | "center"', default: '"left"', desc: "정렬" },
    { name: "size", type: '"default" | "xl"', default: '"default"', desc: "default 40~72 / xl 48~112" },
  ],
};

const CASE_STUDY_DEF: ComponentDef = {
  id: "case-study",
  ko: "케이스 스터디",
  en: "CaseStudy",
  desc: "Problem → Solution → Outcome 3단 구조 + 메타 정보. 단일 프로젝트 사례.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — Problem/Solution/Outcome",
      description: "메타(year/client/role) + 좌우 분할(P/S) + 하단 outcome.",
      preview: (
        <CaseStudy
          eyebrow="Heritage · 2021"
          title="EBS 온라인 클래스 재구조화"
          meta={[
            { label: "Year", value: "2021" },
            { label: "Client", value: "EBS" },
            { label: "Role", value: "PM + 개발 리드" },
          ]}
          problem="기존 학습 흐름이 모바일에서 단절됨. PC와 mobile에서 진척도가 동기화되지 않아 학습자가 다시 처음부터 보는 경우 발생."
          solution="단일 SPA로 전환 + 학습 진척도 실시간 동기화. PWA 패턴으로 오프라인 일부 지원. PM으로서 30+ 의사결정자와 직접 대화."
          outcomes={[
            { value: "+38%", label: "완강율" },
            { value: "-22%", label: "이탈률" },
            { value: "60+", label: "기관 도입" },
          ]}
          href="#"
          hrefLabel="자세히 보기 →"
        />
      ),
      prompt: `Heritage 단일 프로젝트 페이지. 카드 박스 거부 — 헤어라인 + Problem/Solution 좌우 분할 + Outcome 하단 통계.

구조:
- eyebrow + 큰 제목 (h2 톤)
- meta DefList (Year / Client / Role 등 가로 wrap)
- 2열 grid: Problem(zinc smallcaps) / Solution(emerald smallcaps)
- Outcome: StatList 패턴 (1~3개 통계)
- href 링크 (선택)

Solution 영역만 emerald smallcaps — "여기가 핵심"이라는 시그널.`,
      react: `<CaseStudy
  eyebrow="Heritage · 2021"
  title="EBS 온라인 클래스 재구조화"
  meta={[
    { label: "Year", value: "2021" },
    { label: "Client", value: "EBS" },
  ]}
  problem="..."
  solution="..."
  outcomes={[
    { value: "+38%", label: "완강율" },
    { value: "-22%", label: "이탈률" },
  ]}
/>`,
    },
    {
      index: "02",
      badge: "minimal",
      title: "minimal — outcome 없이",
      description: "결과 수치 공개 어려운 사례 (NDA 등). Problem/Solution만.",
      preview: (
        <CaseStudy
          eyebrow="Heritage · 2022"
          title="라이나생명 디지털채널 재구축"
          meta={[
            { label: "Year", value: "2022" },
            { label: "Client", value: "라이나생명" },
          ]}
          problem="레거시 ERP 기반 채널 — 모바일 비대응, 신규 상품 등록 4주 소요."
          solution="Headless CMS + Next.js + 디자인 시스템 자체 구축. 신규 상품 등록을 4주 → 3시간."
        />
      ),
      prompt: `결과 수치를 공개하기 어려운 사례 (NDA, 진행 중 등). outcomes 생략.
Problem / Solution만 좌우 분할로 표시.`,
      react: `<CaseStudy
  eyebrow="Heritage · 2022"
  title="라이나생명 디지털채널 재구축"
  meta={[{ label: "Client", value: "라이나" }]}
  problem="..."
  solution="..."
/>`,
    },
  ],
  props: [
    { name: "eyebrow / title", type: "ReactNode", desc: "smallcaps + 큰 제목" },
    { name: "meta", type: "CaseStudyMeta[]", desc: "{label, value}[] (year/client/role)" },
    { name: "problem", type: "ReactNode", desc: "Problem 섹션 (필수)" },
    { name: "solution", type: "ReactNode", desc: "Solution 섹션 (필수, emerald smallcaps)" },
    { name: "outcomes", type: "CaseStudyOutcome[]", desc: "결과 통계 0~3개" },
    { name: "href / hrefLabel", type: "string / ReactNode", desc: "상세 링크" },
  ],
};

const WAVE_CARD_DEF: ComponentDef = {
  id: "wave-card",
  ko: "물결 진행 카드",
  en: "WaveCard",
  desc: "물결이 차오르는 진척도 시각화. variant=frame(헤어라인) / card(rounded box).",
  examples: [
    {
      index: "01",
      badge: "frame · default",
      title: "기본 — 헤어라인 (anti-card 톤)",
      description: "박스 거부 frame variant. 위/아래 헤어라인 + wave fill.",
      preview: (
        <WaveCard
          title="anti-card 0.5.0"
          client="Freeive"
          summary="P4 인터랙션 5개 작업 중. WaveCard / FadeIn / HoverAccent / ScrollProgress / Marquee."
          progress={62}
          waveColor="#34d399"
          year="2026"
        />
      ),
      prompt: `진행 중 프로젝트의 진척도를 wave fill로 시각화. 박스 거부 frame variant.

스타일:
- variant="frame" (default): border-y (헤어라인 위/아래) + wave fill
- 220~240px height
- 좌측 상단 "In progress" smallcaps + 우측 상단 "%" badge
- 하단: 큰 제목 + summary + (client · year) smallcaps

wave는 0~90% 권장 (90+는 거의 완료라 시각이 어색).`,
      react: `<WaveCard
  title="anti-card 0.5.0"
  client="Freeive"
  summary="P4 인터랙션 작업 중."
  progress={62}
  waveColor="#34d399"
  year="2026"
/>`,
    },
    {
      index: "02",
      badge: "card · variant",
      title: "card variant — 기존 freeive 톤",
      description: "rounded-xl + border + bg. freeive Heritage In progress 카드와 동일.",
      preview: (
        <WaveCard
          variant="card"
          title="freeive.com 메인 리뉴얼"
          client="Freeive"
          summary="외주 에이전시 → 1인 랩 정체성으로 교체."
          progress={78}
          waveColor="#7cf2c4"
          year="2026"
        />
      ),
      prompt: `기존 freeive Heritage 페이지의 In progress 카드 톤. variant="card".
박스 정체성 강하지만 단일 컴포넌트로서 특수 시각이라 인정.`,
      react: `<WaveCard variant="card" title="..." progress={78} waveColor="#7cf2c4" />`,
    },
  ],
  props: [
    { name: "title", type: "ReactNode", desc: "제목 (필수)" },
    { name: "client / summary / year", type: "ReactNode", desc: "메타·요약" },
    { name: "progress", type: "number", desc: "0~90 권장" },
    { name: "waveColor", type: "string (hex)", default: '"#34d399"', desc: "wave 색" },
    { name: "variant", type: '"card" | "frame"', default: '"frame"', desc: "card=rounded box / frame=헤어라인" },
    { name: "label", type: "ReactNode", default: '"In progress"', desc: "좌측 상단 smallcaps" },
  ],
};

const FADE_IN_DEF: ComponentDef = {
  id: "fade-in",
  ko: "부드러운 등장",
  en: "FadeIn",
  desc: "스크롤 시 in-view 감지 → opacity + translate 등장. prefers-reduced-motion 자동 반응.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — up 16px / 700ms",
      description: "아래에서 위로 살짝 + opacity. 페이지 스크롤하면 자연스럽게 등장.",
      preview: (
        <div className="space-y-4">
          <FadeIn>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <p className="text-[14px] text-zinc-700 dark:text-zinc-300">
                FadeIn 안의 콘텐츠. 스크롤로 in-view 시 등장.
              </p>
            </div>
          </FadeIn>
        </div>
      ),
      prompt: `요소가 스크롤로 화면에 들어올 때 부드러운 등장이 필요하다.

구현:
- Intersection Observer로 in-view 감지
- threshold 0.15 (15% 보이면 등장)
- direction="up" + distance=16px + 700ms ease-out
- once=true (한 번만 — 스크롤 위로 가도 다시 사라지지 않음)
- motion-reduce 자동 비활성

화려한 애니메이션 거부 — 살짝 + 짧음 + 한 번만.`,
      react: `<FadeIn>
  <SectionHeading>스크롤로 등장하는 섹션</SectionHeading>
</FadeIn>`,
    },
    {
      index: "02",
      badge: "delay · stagger",
      title: "stagger — delay로 순차 등장",
      description: "각 항목마다 delay 다르게 → 줄지어 등장.",
      preview: (
        <div className="space-y-3">
          {[0, 100, 200, 300].map((d) => (
            <FadeIn key={d} delay={d}>
              <div className="border-y border-zinc-200/60 py-3 text-[14px] dark:border-white/[0.06]">
                delay={d}ms
              </div>
            </FadeIn>
          ))}
        </div>
      ),
      prompt: `리스트의 각 항목이 줄지어 등장. delay를 항목마다 100~150ms씩 다르게.

ListRow의 각 행에 FadeIn 감싸고 index × 80ms로 delay 주면 자연스러운 stagger.
주의: 너무 많은 항목(50+)에는 stagger 안 함 — 끝까지 기다리는 시간 길어짐.`,
      react: `{items.map((item, i) => (
  <FadeIn key={item.id} delay={i * 80}>
    <ListRow ... />
  </FadeIn>
))}`,
    },
  ],
  props: [
    { name: "direction", type: '"up" | "down" | "left" | "right" | "none"', default: '"up"', desc: "등장 방향" },
    { name: "distance", type: "number (px)", default: "16", desc: "시작 transform 거리" },
    { name: "delay", type: "number (ms)", default: "0", desc: "등장 지연" },
    { name: "duration", type: "number (ms)", default: "700", desc: "트랜지션 길이" },
    { name: "once", type: "boolean", default: "true", desc: "한 번만 등장" },
    { name: "threshold", type: "number 0~1", default: "0.15", desc: "Intersection threshold" },
  ],
};

const HOVER_ACCENT_DEF: ComponentDef = {
  id: "hover-accent",
  ko: "호버 강조",
  en: "HoverAccent",
  desc: "자식에 hover 시 색·밑줄·이동 효과. group 패턴 wrapper.",
  examples: [
    {
      index: "01",
      badge: "color",
      title: "color — 텍스트 emerald",
      description: "hover시 자식 텍스트가 emerald로.",
      preview: (
        <HoverAccent>
          <a href="#" className="text-[15.5px]">호버하면 emerald가 됩니다 →</a>
        </HoverAccent>
      ),
      prompt: `자식 요소(텍스트, 링크)에 hover시 emerald 색 강조 wrapper. group 패턴.

LinkRow가 직접 hover 처리하지만, 자유로운 마크업에 적용하고 싶을 때 HoverAccent로 감쌈.

effect="color" (default): hover시 text-emerald-600 dark:emerald-400 transition.`,
      react: `<HoverAccent>
  <a href="/heritage">전체 Heritage 보기 →</a>
</HoverAccent>`,
    },
    {
      index: "02",
      badge: "underline",
      title: "underline — 좌→우 밑줄",
      description: "hover시 밑줄이 좌에서 우로 차오름.",
      preview: (
        <HoverAccent effect="underline">
          <span className="text-[15.5px]">밑줄이 자라는 텍스트</span>
        </HoverAccent>
      ),
      prompt: `hover시 밑줄이 좌에서 우로 채워지는 효과. 본문 안 링크에 시그널.

CSS-only ::after pseudo + width transition (0% → 100%, 300ms).`,
      react: `<HoverAccent effect="underline">
  <span>밑줄이 자라는 텍스트</span>
</HoverAccent>`,
    },
    {
      index: "03",
      badge: "all",
      title: "all — color + translate",
      description: "color + 살짝 우측 이동 (LinkRow와 비슷).",
      preview: (
        <HoverAccent effect="all">
          <a href="#" className="inline-flex items-baseline gap-2 text-[15.5px]">
            모든 효과 한꺼번에 <span aria-hidden>→</span>
          </a>
        </HoverAccent>
      ),
      prompt: `color + translate 동시. 화살표가 살짝 우측으로 이동 + 텍스트 emerald.
LinkRow가 내장하는 효과를 자유 마크업에 재현.`,
      react: `<HoverAccent effect="all">
  <a href="/talk">Talk · 의뢰 <span aria-hidden>→</span></a>
</HoverAccent>`,
    },
  ],
  props: [
    { name: "effect", type: '"color" | "underline" | "translate" | "all"', default: '"color"', desc: "효과 종류" },
    { name: "tone", type: '"accent" | "mute"', default: '"accent"', desc: "accent=emerald / mute=zinc 진하게" },
    { name: "as", type: '"div" | "span" | "li"', default: '"div"', desc: "시맨틱" },
  ],
};

const SCROLL_PROGRESS_DEF: ComponentDef = {
  id: "scroll-progress",
  ko: "스크롤 진행",
  en: "ScrollProgress",
  desc: "페이지 스크롤 진행을 1~3px 막대로 표시. fixed 위/아래.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 상단 emerald 2px",
      description: "페이지 상단 fixed. 스크롤하면 좌→우로 차오름. 본문 흐름 거의 안 막음.",
      preview: (
        <div className="space-y-3 text-[14px]">
          <p className="text-zinc-500 dark:text-zinc-400">
            ※ ScrollProgress는 fixed top-0 z-50이라 페이지 진짜 상단에 노출됩니다 — playground 안의 미리보기로는 효과를 시각화하기 어렵습니다.
          </p>
          <div className="border-y border-zinc-200 py-3 dark:border-white/[0.06]">
            <div className="h-0.5 w-2/3 bg-emerald-500 dark:bg-emerald-400" />
            <p className="mt-2 text-[12.5px] text-zinc-500">실제 시뮬레이션 (66% 스크롤된 상태)</p>
          </div>
        </div>
      ),
      prompt: `페이지 상단에 스크롤 진행도 막대. 본문 흐름 거의 안 막음 — 1~3px 두께.

스타일:
- fixed top-0 left-0 right-0 z-50
- height: thickness(기본 2px)
- bg: emerald-500 (accent) 또는 zinc-700 (mute)
- transition-[width] duration-100 ease-out

target prop으로 특정 요소만 추적 가능 (블로그 글의 article 스크롤 등).`,
      react: `// 페이지 상단 고정
<ScrollProgress />

// 특정 article만 추적
const ref = useRef<HTMLElement>(null);
<article ref={ref}>...</article>
<ScrollProgress target={ref} />`,
    },
  ],
  props: [
    { name: "position", type: '"top" | "bottom"', default: '"top"', desc: "fixed 위치" },
    { name: "tone", type: '"accent" | "mute"', default: '"accent"', desc: "emerald / zinc" },
    { name: "thickness", type: "number (px)", default: "2", desc: "두께" },
    { name: "target", type: "RefObject<HTMLElement>", desc: "추적할 요소 (생략시 document)" },
  ],
};

const MARQUEE_DEF: ComponentDef = {
  id: "marquee",
  ko: "흐르는 띠",
  en: "Marquee",
  desc: "끊김 없이 흐르는 띠. 클라이언트 로고, 알림 등. children 자동 복제 무한 루프.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 좌로 30초 사이클",
      description: "children 자동 2회 복제 → 끊김 없는 무한 스크롤.",
      preview: (
        <Marquee divider>
          {["EBS", "라이나생명", "롯데카드", "아이스크림미디어", "통신3사", "Freeive"].map((name) => (
            <span
              key={name}
              className="text-[12.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400"
            >
              {name}
            </span>
          ))}
        </Marquee>
      ),
      prompt: `클라이언트 로고/이름이 흐르는 띠. shadcn 캐러셀 거부 — 단순 CSS animation으로.

구현:
- children을 2회 복제 (aria-hidden 두 번째)
- transform: translateX(0 → -50%)
- 30s linear infinite
- pauseOnHover (기본 true) — group:hover시 animation-play-state:paused

prefers-reduced-motion 자동 멈춤.

용도: 클라이언트 띠 (로고 5+개 가로 흐름), 알림 뉴스 등.`,
      react: `<Marquee divider>
  {clients.map((c) => (
    <span key={c.name}>{c.name}</span>
  ))}
</Marquee>`,
    },
    {
      index: "02",
      badge: "right · fast",
      title: "right + 빠른 속도",
      description: "오른쪽으로 흐름 + duration=15(빠름).",
      preview: (
        <Marquee direction="right" duration={15} divider>
          {["새 글", "P4 작업 중", "0.5.0 곧 출시", "Talk · 이기는 싸움만"].map((t) => (
            <span key={t} className="text-[13px] text-zinc-700 dark:text-zinc-300">
              · {t}
            </span>
          ))}
        </Marquee>
      ),
      prompt: `방향과 속도 변형. direction="right" + duration 작게(빠름).
알림 띠, 뉴스 ticker 등에 사용.`,
      react: `<Marquee direction="right" duration={15}>
  <span>· 새 글</span>
  <span>· 0.5.0 출시</span>
</Marquee>`,
    },
  ],
  props: [
    { name: "direction", type: '"left" | "right"', default: '"left"', desc: "흐름 방향" },
    { name: "duration", type: "number (s)", default: "30", desc: "한 사이클 시간" },
    { name: "pauseOnHover", type: "boolean", default: "true", desc: "hover시 정지" },
    { name: "gap", type: "number (px)", default: "48", desc: "항목 사이 간격" },
    { name: "divider", type: "boolean", default: "false", desc: "헤어라인 위/아래" },
  ],
};

const CALLOUT_DEF: ComponentDef = {
  id: "callout",
  ko: "강조 박스",
  en: "Callout",
  desc: "본문 안의 인라인 강조. Banner와 다름 — 풀폭 띠 X, 본문 흐름 안의 영역.",
  examples: [
    {
      index: "01",
      badge: "info",
      title: "기본 — info 톤",
      description: "참고·노트 영역. 좌측 헤어라인 + 살짝 회색 배경.",
      preview: (
        <Callout tone="info" title="참고">
          이 글의 모든 코드 예시는 Tailwind 3.4 기준이며, anti-card 0.5.0 이상에서 동작합니다.
        </Callout>
      ),
      prompt: `블로그 본문 안의 참고·노트 영역. shadcn처럼 큰 둥근 박스 거부. 좌측 border-l 2px + 살짝 톤 배경.

스타일:
- border-l-2 (좌측 2px 헤어라인)
- 살짝 톤 배경 (zinc-50 / emerald-500/[0.06] / yellow-500/[0.06] / rose-500/[0.06])
- title: 14px medium (선택) + body: 14.5px leading-relaxed
- icon: 좌측 아이콘 (텍스트도 OK — ⚠ ℹ︎ ✓)`,
      react: `<Callout tone="info" title="참고">
  본문 안 참고 영역.
</Callout>`,
    },
    {
      index: "02",
      badge: "tone × 4",
      title: "4가지 톤",
      description: "info / accent / warning / danger.",
      preview: (
        <div className="space-y-3">
          <Callout tone="info">기본 info — 일반 참고.</Callout>
          <Callout tone="accent" icon="✓">accent — 핵심·성공.</Callout>
          <Callout tone="warning" icon="⚠">warning — 주의 사항.</Callout>
          <Callout tone="danger" icon="!">danger — 위험·실패.</Callout>
        </div>
      ),
      prompt: `4가지 톤 (info=zinc / accent=emerald / warning=yellow / danger=rose). icon prop으로 좌측 아이콘 자유 추가.`,
      react: `<Callout tone="warning" icon="⚠">env not set.</Callout>`,
    },
  ],
  props: [
    { name: "tone", type: '"info" | "accent" | "warning" | "danger"', default: '"info"', desc: "색 톤" },
    { name: "title", type: "ReactNode", desc: "제목 (선택)" },
    { name: "icon", type: "ReactNode", desc: "좌측 아이콘 (텍스트도 OK)" },
    { name: "children", type: "ReactNode", desc: "본문" },
  ],
};

const FAQ_DEF: ComponentDef = {
  id: "faq",
  ko: "FAQ 아코디언",
  en: "FAQ",
  desc: "자주 묻는 질문. details/summary 시맨틱 — JS 없이 native 동작. 박스 거부, 헤어라인 행.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 헤어라인 행 + + 토글",
      description: "각 행 클릭하면 답변 펼침. group-open으로 + → ×.",
      preview: (
        <FAQ
          items={[
            {
              question: "anti-card는 어디에 사용하나요?",
              answer: "랜딩 페이지·콘텐츠 사이트·블로그·1인 랩 사이트 등 end-user UI 영역. shadcn(admin 강함)과 정반대 영역을 채웁니다.",
              defaultOpen: true,
            },
            {
              question: "shadcn과 함께 쓸 수 있나요?",
              answer: "가능합니다. admin 영역은 shadcn, end-user 영역은 anti-card 권장.",
            },
            {
              question: "AI Skill은 무엇인가요?",
              answer: "Layer 1 — Claude/Cursor가 anti-card 톤으로 코드를 생성하도록 안내하는 system prompt. Layer 2(React lib)보다 더 본체.",
            },
          ]}
        />
      ),
      prompt: `자주 묻는 질문 영역. JS 없이 native details/summary 사용 — 접근성·성능 모두 좋음.

스타일:
- dl + 각 항목 details/summary
- 헤어라인 행 구분 (border-y, divide-y)
- + → × 회전 (group-open + transition-transform rotate-45)
- summary hover시 emerald

defaultOpen: 특정 항목 기본 열림.`,
      react: `<FAQ items={[
  { question: "어디에 쓰나요?", answer: "..." },
  { question: "AI Skill은?", answer: "...", defaultOpen: true },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "FAQItem[]", desc: "{question, answer, defaultOpen?}[]" },
  ],
};

const PRICING_TABLE_DEF: ComponentDef = {
  id: "pricing-table",
  ko: "가격 표",
  en: "PricingTable",
  desc: "가격 plan 비교. 카드 박스 최소화 — 1px gap grid + highlighted plan만 살짝 강조.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "3 plan — Free / Pro / Team",
      description: "highlighted plan(Pro)는 살짝 emerald bg + accent CTA 자동.",
      preview: (
        <PricingTable
          plans={[
            {
              name: "Free",
              price: "₩0",
              priceHint: "영구 무료",
              tagline: "개인 프로젝트 / 학습용.",
              features: ["기본 컴포넌트 27개", "GitHub 이슈 지원"],
              cta: { label: "시작하기", href: "#" },
            },
            {
              name: "Pro",
              price: "₩9,900",
              priceHint: "월 / VAT 별도",
              tagline: "1인 팀·프리랜서.",
              features: ["모든 컴포넌트", "AI Skill 사용권", "이메일 지원"],
              highlighted: true,
              cta: { label: "Pro 시작하기", href: "#", tone: "accent" },
            },
            {
              name: "Team",
              price: "Custom",
              priceHint: "월 / 협의",
              tagline: "팀·기업.",
              features: ["모든 Pro 기능", "전용 채널 지원", "커스텀 컨설팅"],
              cta: { label: "Talk", href: "#" },
            },
          ]}
        />
      ),
      prompt: `가격 plan 비교 표. 일반적 카드 그리드 영역이지만 anti-card에서는 박스 최소화.

스타일:
- 1px gap grid (모바일 1열, 데스크톱 3열)
- highlighted plan: 살짝 emerald bg + accent name
- features: ✓ + 텍스트 행
- CTA: LinkRow (href) 또는 Button (onClick)

shadow / 둥근 큰 모서리 / 그라데이션 거부. 본질만.`,
      react: `<PricingTable plans={[
  { name: "Free", price: "₩0", features: [...] },
  { name: "Pro", price: "₩9,900", features: [...], highlighted: true,
    cta: { label: "시작", href: "/signup", tone: "accent" } },
]} />`,
    },
  ],
  props: [
    { name: "plans", type: "PricingPlan[]", desc: "{name, price, priceHint?, tagline?, features, cta?, highlighted?}[]" },
  ],
};

const PRICING_PATTERN_DEF: ComponentDef = {
  id: "pricing-pattern",
  ko: "가격 페이지",
  en: "PricingPattern",
  desc: "가격 페이지 통째로 — Hero(center) + PricingTable + FAQ + CTASection 조합.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — Hero + Table + FAQ + CTA",
      description: "가격 페이지의 표준 4섹션 레이아웃.",
      preview: (
        <PricingPattern
          eyebrow="Pricing"
          title="간단한 가격."
          lead="시작은 무료. 필요할 때만 업그레이드."
          plans={[
            {
              name: "Free",
              price: "₩0",
              features: ["기본 컴포넌트", "GitHub 지원"],
              cta: { label: "시작", href: "#" },
            },
            {
              name: "Pro",
              price: "₩9,900",
              features: ["모든 컴포넌트", "AI Skill", "이메일 지원"],
              highlighted: true,
              cta: { label: "Pro 시작", href: "#", tone: "accent" },
            },
            {
              name: "Team",
              price: "Custom",
              features: ["전용 채널", "컨설팅"],
              cta: { label: "Talk", href: "#" },
            },
          ]}
          faq={[
            { question: "환불 가능한가요?", answer: "결제 후 7일 내 100% 환불." },
            { question: "팀 단위 결제는?", answer: "Talk으로 별도 협의." },
          ]}
          cta={{
            eyebrow: "Talk",
            title: "더 궁금한 점이 있으면 직접 알려주세요.",
            actions: [{ label: "Talk 페이지로", href: "#", tone: "accent" }],
          }}
        />
      ),
      prompt: `가격 페이지 전체를 한 번에. HeroPattern(center align) + PricingTable + FAQ + CTASection 조합.

각 섹션 사이 헤어라인 자동. 박스 최소화 톤 유지.`,
      react: `<PricingPattern
  title="간단한 가격."
  lead="시작은 무료."
  plans={[...]}
  faq={[...]}
  cta={{ title: "...", actions: [...] }}
/>`,
    },
  ],
  props: [
    { name: "eyebrow / title / lead", type: "ReactNode", desc: "Hero 영역" },
    { name: "plans", type: "PricingPlan[]", desc: "PricingTable에 전달" },
    { name: "faq", type: "FAQItem[]", desc: "FAQ 섹션 (선택)" },
    { name: "cta", type: "{eyebrow?, title, lead?, actions?}", desc: "하단 CTA (선택)" },
  ],
};

const STEPS_DEF: ComponentDef = {
  id: "steps",
  ko: "단계 (3·4단계)",
  en: "Steps",
  desc: "절차 단계. 자동 번호(01/02/03) + 제목 + 설명. vertical / horizontal layout.",
  examples: [
    {
      index: "01",
      badge: "vertical",
      title: "vertical — 좌측 번호 + 우측 본문",
      description: "FeatureRow numbered와 비슷하지만 '프로세스' 의미.",
      preview: (
        <Steps
          items={[
            {
              title: "프로젝트 정리",
              description: "Plan 문서 + 우선순위 + 마일스톤 컴포넌트 set.",
            },
            {
              title: "구현",
              description: "P0~P5 순서로 컴포넌트 + dogfooding.",
            },
            {
              title: "검증",
              description: "Check 단계 — 사용자 피드백 + 시각 검증.",
            },
          ]}
        />
      ),
      prompt: `프로세스 단계를 수직으로 나열. 각 단계 자동 번호.

스타일:
- ol + divide-y border-y
- grid [60px 번호 / 1fr 본문]
- 번호: font-mono 12px tabular-nums zinc-400
- 제목: 17px font-semibold
- 설명: 14.5px leading-relaxed

FeatureRow numbered와 시각 비슷하지만 의미 다름 — Steps는 "이 순서로 한다", FeatureRow는 "이런 특징들".`,
      react: `<Steps items={[
  { title: "Plan", description: "..." },
  { title: "Do", description: "..." },
  { title: "Check", description: "..." },
]} />`,
    },
    {
      index: "02",
      badge: "horizontal",
      title: "horizontal — 가로 grid",
      description: "3·4단계를 한 줄에. 위 헤어라인 2px + 아래 본문.",
      preview: (
        <Steps
          layout="horizontal"
          items={[
            { title: "관찰", description: "사용자가 어떻게 쓰는지." },
            { title: "분석", description: "어디서 막히는지." },
            { title: "결정", description: "무엇을 바꿀지." },
            { title: "적용", description: "최소 단위로 시도." },
          ]}
        />
      ),
      prompt: `3·4단계를 한 화면에 가로로. layout="horizontal".
- 위 border-t-2 (단계 시그널) + 번호 + 제목 + 설명 수직 stack
- 모바일은 1열, 태블릿 2열, 데스크톱 3·4열`,
      react: `<Steps layout="horizontal" items={[
  { title: "관찰", description: "..." },
  { title: "분석", description: "..." },
  { title: "결정", description: "..." },
  { title: "적용", description: "..." },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "StepItem[]", desc: "{title, description?}[]" },
    { name: "layout", type: '"vertical" | "horizontal"', default: '"vertical"', desc: "수직 / 가로 grid" },
  ],
};

const COMPARE_TABLE_DEF: ComponentDef = {
  id: "compare-table",
  ko: "비교 표",
  en: "CompareTable",
  desc: "기능·플랜 비교 표. 박스 거부 — 헤어라인 only. boolean 값 ✓/− 자동.",
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 3 컬럼 비교",
      description: "highlighted 컬럼은 emerald 헤더 + 진한 본문.",
      preview: (
        <CompareTable
          columns={[
            { name: "Free" },
            { name: "Pro", highlighted: true },
            { name: "Team" },
          ]}
          rows={[
            { feature: "API 호출 / 월", values: ["1,000", "100,000", "Unlimited"] },
            { feature: "팀 멤버", values: [false, "5", "Unlimited"] },
            {
              feature: "전용 지원",
              hint: "이메일 응답 시간",
              values: ["GitHub Issues", "24시간 내", "전용 채널"],
            },
            { feature: "커스텀 컨설팅", values: [false, false, true] },
          ]}
        />
      ),
      prompt: `기능·플랜 비교 표. 박스 거부 — table + 헤어라인 only.

스타일:
- table w-full text-[14px]
- thead: 12px uppercase smallcaps + border-y
- tbody: divide-y zinc-200 dark:white/[0.06]
- highlighted 컬럼: emerald 헤더 + 진한 본문

값 처리:
- string/ReactNode: 그대로 표시
- true: ✓ (emerald)
- false: − (zinc 흐림)

PricingTable과 함께 사용 — Table에 못 들어가는 디테일을 CompareTable로.`,
      react: `<CompareTable
  columns={[
    { name: "Free" },
    { name: "Pro", highlighted: true },
  ]}
  rows={[
    { feature: "API", values: ["1,000", "100,000"] },
    { feature: "팀", values: [false, "5"] },
  ]}
/>`,
    },
  ],
  props: [
    { name: "columns", type: "CompareColumn[]", desc: "{name, highlighted?}[]" },
    { name: "rows", type: "CompareRow[]", desc: "{feature, hint?, values: (ReactNode | boolean)[]}[]" },
  ],
};
