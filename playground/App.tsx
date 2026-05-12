import { useEffect, useState, type ReactNode } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import {
  Moon,
  Sun,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Plus,
  Mail,
  Lock,
  Check,
  Info,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  ExternalLink,
  MoreHorizontal,
  Settings,
  Trash2,
  Pencil,
} from "lucide-react";
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
  Grid,
  GridSystem,
  GridCol,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Gallery,
  Carousel,
  FormField,
  DataTable,
  SelectableTable,
  DatePicker,
  Combobox,
  TextList,
  Breadcrumb,
  Pagination,
  Tabs,
  Tooltip,
  Popover,
  Dialog,
  Drawer,
  Dropdown,
  Toast,
  ToastProvider,
  useToast,
  motion,
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
      { id: "grid-columns", ko: "그리드·컬럼", en: "Grid", status: "ready" },
      { id: "grid-system", ko: "그리드 시스템 (12 col)", en: "Grid System", status: "ready" },
    ],
  },
  {
    group: "타이포그래피",
    desc: "글로 위계를 만드는 모든 것",
    items: [
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
      { id: "text-list", ko: "텍스트 리스트 (블릿·하이픈·번호)", en: "Text List", status: "ready" },
      { id: "list-row", ko: "리스트 행", en: "ListRow", status: "ready" },
      { id: "definition-list", ko: "정의 리스트", en: "Definition List", status: "ready" },
      { id: "stat-list", ko: "통계 숫자 행", en: "Stat List", status: "ready" },
      { id: "timeline", ko: "타임라인", en: "Timeline", status: "ready" },
      { id: "compare-table", ko: "비교 표", en: "Compare Table", status: "ready" },
    ],
  },
  {
    group: "데이터 테이블",
    desc: "정렬·편집·계층 등 인터랙티브 표 모음. 행 + 1px 헤어라인 시그니처.",
    items: [
      { id: "data-table", ko: "기본 데이터 테이블 (정렬)", en: "DataTable", status: "ready" },
      { id: "selectable-table", ko: "선택 가능 테이블 (체크박스 + 일괄 액션)", en: "SelectableTable", status: "ready" },
      { id: "expandable-table", ko: "펼침 가능 테이블 (행 클릭 → 상세)", en: "ExpandableTable", status: "planned" },
      { id: "editable-table", ko: "인라인 편집 테이블", en: "EditableTable", status: "planned" },
      { id: "grouped-table", ko: "그룹 헤더 테이블", en: "GroupedTable", status: "planned" },
      { id: "tree-table", ko: "트리 테이블 (계층 구조)", en: "TreeTable", status: "planned" },
      { id: "compact-table", ko: "압축 테이블 (로그·데이터 뷰어)", en: "CompactTable", status: "planned" },
    ],
  },
  {
    group: "액션",
    desc: "버튼·링크·전환",
    items: [
      { id: "button-primary", ko: "기본 버튼", en: "Button (Primary)", status: "ready" },
      { id: "button-secondary", ko: "보조 버튼", en: "Button (Secondary)", status: "ready" },
      { id: "button-ghost", ko: "고스트 버튼", en: "Button (Ghost)", status: "ready" },
      { id: "button-plain", ko: "플레인 버튼", en: "Button (Plain)", status: "ready" },
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
      { id: "gallery", ko: "갤러리", en: "Gallery", status: "ready" },
      { id: "carousel", ko: "캐러셀·슬라이드", en: "Carousel", status: "ready" },
    ],
  },
  {
    group: "폼",
    desc: "입력·선택·검증. admin / Talk / 검색에 필요한 풀 라인업.",
    items: [
      { id: "input", ko: "입력 필드", en: "Input", status: "ready" },
      { id: "textarea", ko: "여러 줄 입력", en: "Textarea", status: "ready" },
      { id: "select", ko: "드롭다운", en: "Select", status: "ready" },
      { id: "checkbox-radio", ko: "체크박스·라디오", en: "Checkbox/Radio", status: "ready" },
      { id: "pill", ko: "필 / 태그", en: "Pill / Tag", status: "ready" },
      { id: "form-field", ko: "폼 필드 (라벨·검증)", en: "Form Field", status: "ready" },
      { id: "date-picker", ko: "날짜 선택", en: "Date Picker", status: "ready" },
      { id: "combobox", ko: "콤보박스 (검색 select)", en: "Combobox", status: "ready" },
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
  {
    group: "내비게이션",
    desc: "위치 표시 + 페이지·패널 전환",
    items: [
      { id: "tabs", ko: "탭 메뉴", en: "Tabs", status: "ready" },
      { id: "breadcrumb", ko: "브레드크럼", en: "Breadcrumb", status: "ready" },
      { id: "pagination", ko: "페이지네이션", en: "Pagination", status: "ready" },
    ],
  },
  {
    group: "오버레이",
    desc: "본문 위에 떠있는 일시적 UI — anti-card 톤 (shadow X, 헤어라인)",
    items: [
      { id: "dialog", ko: "다이얼로그·모달", en: "Dialog", status: "ready" },
      { id: "drawer", ko: "서랍·사이드 패널", en: "Drawer", status: "ready" },
      { id: "popover", ko: "팝오버", en: "Popover", status: "ready" },
      { id: "tooltip", ko: "툴팁", en: "Tooltip", status: "ready" },
      { id: "toast", ko: "토스트 알림", en: "Toast", status: "ready" },
      { id: "dropdown", ko: "드롭다운 메뉴", en: "Dropdown Menu", status: "ready" },
    ],
  },
  {
    group: "리소스",
    desc: "참조 표준 — 컴포넌트 사용 시 함께 보는 자료",
    items: [
      { id: "typography-tokens", ko: "타이포 토큰", en: "Typography Tokens", status: "ready" },
      { id: "motion-tokens", ko: "모션 토큰", en: "Motion Tokens", status: "ready" },
      { id: "icons", ko: "아이콘 (lucide)", en: "Icons", status: "ready" },
    ],
  },
];

/** Lucide 아이콘을 내부적으로 사용하는 컴포넌트 (0.10.0~)
 *  사이드바 + ComponentPage 헤더에 'lucide' 뱃지로 표기. */
const USES_LUCIDE: Record<string, string[]> = {
  "link-row": ["ArrowRight", "ArrowUpRight"],
  faq: ["Plus"],
  pill: ["ArrowUpRight"],
};

const VERSION = "0.13.0";

/* ================ Component versions ================
 *
 * 단일 진실 원천 — 컴포넌트별 메타데이터.
 * - addedIn: 첫 출현 release 버전 (불변)
 * - updatedIn: 의미 있는 변경의 마지막 버전 (있을 때만)
 *
 * 정책: docs/VERSIONING.md
 * 변경 기준: Props 추가/제거, default 변경, 시각 톤 변경. 단순 리팩터는 X.
 *
 * CHANGELOG.md 항목 추가/갱신 시 여기도 함께 갱신.
 */
const COMPONENT_VERSIONS: Record<string, { addedIn: string; updatedIn?: string }> = {
  // 0.0.1 — 시드
  eyebrow: { addedIn: "0.0.1" },
  "section-frame": { addedIn: "0.0.1" },
  "list-row": { addedIn: "0.0.1" },

  // 0.1.0 — P0 freeive 골격
  container: { addedIn: "0.1.0" },
  hairline: { addedIn: "0.1.0" },
  "hero-heading": { addedIn: "0.1.0", updatedIn: "0.9.1" }, // size prop (0.1.1) + display token down (0.9.1)
  "section-heading": { addedIn: "0.1.0" },
  lead: { addedIn: "0.1.0" },
  "link-row": { addedIn: "0.1.0", updatedIn: "0.10.0" }, // lucide ArrowRight/ArrowUpRight
  header: { addedIn: "0.1.0" },
  footer: { addedIn: "0.1.0" },

  // 0.2.0 — P1 블로그/콘텐츠
  quote: { addedIn: "0.2.0" },
  highlight: { addedIn: "0.2.0" },
  image: { addedIn: "0.2.0" },
  video: { addedIn: "0.2.0" },
  "definition-list": { addedIn: "0.2.0" },
  "stat-list": { addedIn: "0.2.0" },
  timeline: { addedIn: "0.2.0" },
  pill: { addedIn: "0.2.0", updatedIn: "0.10.0" }, // lucide ArrowUpRight on external

  // 0.3.0 — P2 페이지 패턴 + 액션
  "hero-pattern": { addedIn: "0.3.0" },
  "sectors-pattern": { addedIn: "0.3.0" },
  "talk-pattern": { addedIn: "0.3.0" },
  "empty-error": { addedIn: "0.3.0" },
  "cta-section": { addedIn: "0.3.0" },
  banner: { addedIn: "0.3.0" },
  "button-primary": { addedIn: "0.3.0" },
  "button-secondary": { addedIn: "0.3.0" },
  "feature-row": { addedIn: "0.3.0" },

  // 0.4.0 — P3 신뢰·증거
  "client-logos": { addedIn: "0.4.0" },
  testimonial: { addedIn: "0.4.0", updatedIn: "0.9.0" }, // size large 22~32 → 18~22
  "stat-block": { addedIn: "0.4.0" },
  "case-study": { addedIn: "0.4.0" },

  // 0.5.0 — P4 인터랙션
  "wave-card": { addedIn: "0.5.0" },
  "fade-in": { addedIn: "0.5.0" },
  "hover-accent": { addedIn: "0.5.0" },
  "scroll-progress": { addedIn: "0.5.0" },
  marquee: { addedIn: "0.5.0" },

  // 0.6.0 — P5 콘텐츠 블록 + 비교
  callout: { addedIn: "0.6.0" },
  faq: { addedIn: "0.6.0", updatedIn: "0.10.0" }, // lucide Plus (group-open rotate)
  "pricing-table": { addedIn: "0.6.0" },
  "pricing-pattern": { addedIn: "0.6.0" },
  steps: { addedIn: "0.6.0" },
  "compare-table": { addedIn: "0.6.0" },

  // 0.8.0 — P6+P7 폼 + 갤러리
  "grid-columns": { addedIn: "0.8.0" }, // Grid wrapper
  input: { addedIn: "0.8.0" },
  textarea: { addedIn: "0.8.0" },
  select: { addedIn: "0.8.0", updatedIn: "0.9.0" }, // dark mode option bg fix
  "checkbox-radio": { addedIn: "0.8.0", updatedIn: "0.9.0" }, // accent-color CSS fix
  gallery: { addedIn: "0.8.0" },

  // 0.9.0 — Grid System
  "grid-system": { addedIn: "0.9.0" },

  // 0.11.0 — 내비게이션
  tabs: { addedIn: "0.11.0" },
  breadcrumb: { addedIn: "0.11.0" },
  pagination: { addedIn: "0.11.0" },

  // 0.11.0 — 오버레이
  dialog: { addedIn: "0.11.0", updatedIn: "0.12.0" }, // 커스텀 오버레이 + focus trap + aria-labelledby
  drawer: { addedIn: "0.11.0", updatedIn: "0.12.0" }, // focus trap + aria-labelledby
  popover: { addedIn: "0.11.0", updatedIn: "0.12.0" }, // trigger cloneElement (키보드 동작)
  tooltip: { addedIn: "0.11.0" },
  toast: { addedIn: "0.11.0" },
  dropdown: { addedIn: "0.11.0", updatedIn: "0.12.0" }, // trigger cloneElement

  // 0.12.0 — 폼·데이터·미디어
  carousel: { addedIn: "0.12.0" },
  "form-field": { addedIn: "0.12.0" },
  "data-table": { addedIn: "0.12.0" },
  "date-picker": { addedIn: "0.12.0" },
  combobox: { addedIn: "0.12.0" },
  "text-list": { addedIn: "0.12.0" },

  // 0.12.0 — 카피·톤 정리 + 모션 보강
  banner: { addedIn: "0.3.0", updatedIn: "0.12.0" }, // role="alert" 분기 + slide-down 모션
  callout: { addedIn: "0.6.0", updatedIn: "0.12.0" }, // 아이콘 vertical center
  "wave-card": { addedIn: "0.5.0", updatedIn: "0.12.0" }, // orientation prop
  "talk-pattern": { addedIn: "0.3.0", updatedIn: "0.14.0" }, // acceptLabel/declineLabel/channelsLabel i18n
  header: { addedIn: "0.1.0", updatedIn: "0.12.0" }, // border-current/40 fix

  // 0.14.0 — 다국어 / 분해 사용 봉합 + DataTable variants
  "hero-pattern": { addedIn: "0.3.0", updatedIn: "0.14.0" }, // width prop (HeroHeading.width 노출)
  "data-table": { addedIn: "0.12.0", updatedIn: "0.14.0" }, // selection prop (선택 컬럼 + 일괄 액션)
  "selectable-table": { addedIn: "0.14.0" }, // SelectableTable wrapper
};

const CHANGELOG_URL = "https://github.com/kimminchul/anticard/blob/main/CHANGELOG.md";

/** CHANGELOG anchor 변환 — "0.10.0" → "#0100--2026-05-08" 형식.
 *  GitHub은 ## [0.10.0] — 2026-05-08 같은 헤딩을 lowercased dash-separated로 anchor화.
 *  단순화 — 모든 anchor가 정확하지 않으니 fallback으로 그냥 CHANGELOG 페이지로 이동. */
function changelogUrl(_version: string): string {
  // GitHub의 정확한 anchor 규칙은 헤딩 텍스트에 따라 변동 — 그냥 페이지 top으로.
  // 사용자는 거기서 Ctrl+F 0.x.x 검색하면 됨.
  return CHANGELOG_URL;
}

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
  /** 한 줄 요약 — 카탈로그 사이드바 / 페이지 상단 */
  desc: string;
  /**
   * 비개발자도 이해할 수 있는 풍부한 설명 (2~4문장).
   * "이게 무엇이고 왜 쓰는지" — 코드 용어 최소화.
   * 미정 시 desc만 노출 (점진적 채움 가능).
   */
  intro?: string;
  /**
   * 주 사용처 — 실제 페이지/맥락 기준 짧은 문장 4~6개.
   * "어디에 쓰나"를 비개발자 시각으로.
   */
  useCases?: string[];
  examples: Example[];
  props: Array<{ name: string; type: string; default?: string; desc: string }>;
}

/* ================ App ================ */

const READY_SECTIONS: Record<string, () => JSX.Element> = {
  intro: Intro,
  "typography-tokens": TypographyTokens,
  "motion-tokens": MotionTokens,
  icons: Icons,
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
  "button-ghost": () => <ComponentPage def={BUTTON_GHOST_DEF} />,
  "button-plain": () => <ComponentPage def={BUTTON_PLAIN_DEF} />,
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
  "grid-columns": () => <ComponentPage def={GRID_DEF} />,
  "grid-system": () => <ComponentPage def={GRID_SYSTEM_DEF} />,
  input: () => <ComponentPage def={INPUT_DEF} />,
  textarea: () => <ComponentPage def={TEXTAREA_DEF} />,
  select: () => <ComponentPage def={SELECT_DEF} />,
  "checkbox-radio": () => <ComponentPage def={CHECKBOX_RADIO_DEF} />,
  gallery: () => <ComponentPage def={GALLERY_DEF} />,
  carousel: () => <ComponentPage def={CAROUSEL_DEF} />,
  // 내비게이션
  tabs: () => <ComponentPage def={TABS_DEF} />,
  breadcrumb: () => <ComponentPage def={BREADCRUMB_DEF} />,
  pagination: () => <ComponentPage def={PAGINATION_DEF} />,
  // 오버레이
  dialog: () => <ComponentPage def={DIALOG_DEF} />,
  drawer: () => <ComponentPage def={DRAWER_DEF} />,
  popover: () => <ComponentPage def={POPOVER_DEF} />,
  tooltip: () => <ComponentPage def={TOOLTIP_DEF} />,
  toast: () => <ComponentPage def={TOAST_DEF} />,
  dropdown: () => <ComponentPage def={DROPDOWN_DEF} />,
  // 폼·데이터 (0.11.0~)
  "form-field": () => <ComponentPage def={FORM_FIELD_DEF} />,
  "data-table": () => <ComponentPage def={DATA_TABLE_DEF} />,
  "selectable-table": () => <ComponentPage def={SELECTABLE_TABLE_DEF} />,
  "date-picker": () => <ComponentPage def={DATE_PICKER_DEF} />,
  combobox: () => <ComponentPage def={COMBOBOX_DEF} />,
  // 리스트 / 텍스트
  "text-list": () => <ComponentPage def={TEXT_LIST_DEF} />,
};

const DEFAULT_ID = "intro";

export default function App() {
  const [filter, setFilter] = useState<"all" | "ready">("all");
  const [activeId, setActiveId] = useState<string>(DEFAULT_ID);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace("#", "") || DEFAULT_ID;
      if (READY_SECTIONS[id]) {
        setActiveId(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // 모바일 사이드바 자동 close (컴포넌트 클릭 시 본문 즉시 보이도록)
        const det = document.querySelector(
          "details[data-mobile-sidebar]"
        ) as HTMLDetailsElement | null;
        if (det && det.open) det.open = false;
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const ActiveSection = READY_SECTIONS[activeId] ?? Intro;

  return (
    <ToastProvider position="bottom-right" limit={5}>
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <Header query={query} onQueryChange={setQuery} />

      {/* Mobile sidebar — collapsible details */}
      <details
        data-mobile-sidebar
        className="mt-5 border-y border-zinc-200/60 dark:border-white/[0.06] md:hidden"
      >
        <summary className="group flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
          <span className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">
            메뉴 / Components
          </span>
          <ChevronDown
            aria-hidden
            className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="pb-4 pt-2">
          <Sidebar filter={filter} onFilterChange={setFilter} activeId={activeId} />
        </div>
      </details>

      {/* Layout: desktop grid + mobile single column */}
      <div className="mt-6 md:mt-10 md:grid md:grid-cols-[280px_1fr] md:gap-12">
        <aside className="hidden md:block">
          <Sidebar filter={filter} onFilterChange={setFilter} activeId={activeId} />
        </aside>
        <main className="min-w-0">
          <ActiveSection />
          <div className="mt-16 border-t border-zinc-200 pt-8 md:mt-24 dark:border-white/[0.08]">
            <Footer />
          </div>
        </main>
      </div>
    </div>
    </ToastProvider>
  );
}

/* ================ Layout ================ */

interface HeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
}

interface SearchBoxProps {
  query: string;
  onQueryChange: (q: string) => void;
}

/**
 * 버전 검색 prefix — `v0.14.0` / `v:0.14.0` / `version:0.14.0` / `latest` / `최신`.
 * 일반 텍스트 검색과 별개 모드로 분기. 해당 버전의 addedIn 또는 updatedIn이
 * 매치하는 컴포넌트만 노출 (이번 라운드에 변경된 것만 빠르게 보기).
 */
const VERSION_PREFIX_RE = /^(?:v(?:ersion)?\s*:?\s*)?(\d+\.\d+\.\d+)$/i;
function parseVersionQuery(q: string): string | null {
  const lower = q.trim().toLowerCase();
  if (!lower) return null;
  if (lower === "latest" || lower === "최신") return VERSION;
  const m = lower.match(VERSION_PREFIX_RE);
  return m ? m[1] : null;
}

interface VersionMatch extends NavItem {
  group: string;
  kind: "added" | "updated";
}

function SearchBox({ query, onQueryChange }: SearchBoxProps) {
  const [focused, setFocused] = useState(false);
  const q = query.trim().toLowerCase();
  const showDropdown = focused && q.length > 0;

  // 버전 검색 모드 — 'v0.14.0' / 'latest' / '최신' 등 패턴
  const targetVersion = parseVersionQuery(query);

  // NAV id로 NavItem 찾기 helper
  const findNavItem = (id: string): (NavItem & { group: string }) | null => {
    for (const g of NAV) {
      const it = g.items.find((i) => i.id === id && i.status === "ready");
      if (it) return { ...it, group: g.group };
    }
    return null;
  };

  // 버전 매치 (해당 버전 addedIn 또는 updatedIn) — added/updated 구분 유지
  const versionMatches: VersionMatch[] = targetVersion
    ? (Object.entries(COMPONENT_VERSIONS) as [string, { addedIn: string; updatedIn?: string }][])
        .flatMap(([id, v]) => {
          const item = findNavItem(id);
          if (!item) return [];
          const out: VersionMatch[] = [];
          if (v.updatedIn === targetVersion) out.push({ ...item, kind: "updated" });
          else if (v.addedIn === targetVersion) out.push({ ...item, kind: "added" });
          return out;
        })
        // updated 먼저 (이번 라운드 변경분 강조), 그 다음 added
        .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "updated" ? -1 : 1))
    : [];

  // 일반 텍스트 매칭 (ready 상태만 — 그 외는 클릭 불가)
  const textMatches = !targetVersion && q
    ? NAV.flatMap((g) =>
        g.items
          .filter(
            (it) =>
              it.status === "ready" &&
              (it.ko.toLowerCase().includes(q) ||
                it.en.toLowerCase().includes(q) ||
                it.id.toLowerCase().includes(q) ||
                g.group.toLowerCase().includes(q))
          )
          .map((it) => ({ ...it, group: g.group }))
      ).slice(0, 12)
    : [];

  const matches: (NavItem & { group: string; kind?: "added" | "updated" })[] = targetVersion
    ? versionMatches
    : textMatches;

  const handleSelect = (id: string) => {
    onQueryChange("");
    setFocused(false);
    window.location.hash = `#${id}`;
  };

  return (
    <div
      className="relative"
      onBlur={(e) => {
        // 드롭다운 안의 요소로 focus 옮길 때는 닫지 않음
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setTimeout(() => setFocused(false), 150);
        }
      }}
    >
      <Search aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="컴포넌트 / 카테고리 / 버전 (예: v0.14.0, latest)"
        aria-label="컴포넌트 검색"
        className="w-full rounded-md border border-zinc-200 bg-white py-1.5 pl-8 pr-7 text-[12.5px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/[0.08] dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15"
      />
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          aria-label="검색 지우기"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* 드롭다운 결과 */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-[60vh] overflow-y-auto rounded-md border border-zinc-200 bg-white shadow-lg dark:border-white/[0.08] dark:bg-zinc-950">
          {targetVersion && (
            <div className="border-b border-zinc-100 px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
              버전 v{targetVersion}에 변경된 컴포넌트
              {matches.length > 0 && (
                <span className="ml-2 text-zinc-400 dark:text-zinc-500">
                  · {matches.length}개
                </span>
              )}
            </div>
          )}
          {matches.length === 0 ? (
            <p className="px-4 py-3 text-[12.5px] text-zinc-500 dark:text-zinc-400">
              {targetVersion
                ? `v${targetVersion} 버전에 추가·변경된 컴포넌트가 없습니다.`
                : `"${query}"에 해당하는 컴포넌트 없음`}
            </p>
          ) : (
            <ul className="py-1">
              {matches.map((m) => {
                const v = COMPONENT_VERSIONS[m.id];
                const isUpdated = m.kind === "updated";
                const isAdded = m.kind === "added";
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault() /* blur 회피 */}
                      onClick={() => handleSelect(m.id)}
                      className="group flex w-full items-baseline justify-between gap-3 px-4 py-2 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]"
                    >
                      <span className="flex items-baseline gap-2">
                        <span className="text-[13px] text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                          {m.ko}
                        </span>
                        <code className="text-[11px] text-zinc-500">&lt;{m.en}&gt;</code>
                        {isUpdated && (
                          <span className="rounded-sm bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-emerald-600 dark:text-emerald-400">
                            updated
                          </span>
                        )}
                        {isAdded && (
                          <span className="rounded-sm bg-zinc-500/10 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-zinc-600 dark:text-zinc-300">
                            added
                          </span>
                        )}
                      </span>
                      <span className="flex items-baseline gap-2 text-[10.5px]">
                        <span className="uppercase tracking-[0.06em] text-zinc-400">{m.group}</span>
                        {v && (
                          <span className="font-mono tabular-nums text-zinc-400">
                            v{v.updatedIn ?? v.addedIn}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-zinc-200/60 pb-4 md:pb-5 dark:border-white/[0.06]">
      <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl dark:text-zinc-50">
          anti-card
        </h1>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-600 dark:border-white/15 dark:text-zinc-300">
          v{VERSION}
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          playground
        </span>
      </div>

      {/* 검색바 — 중앙 (md 이상). 결과는 dropdown으로 (모바일·데스크톱 모두) */}
      <div className="order-3 w-full md:order-2 md:max-w-sm md:flex-1">
        <SearchBox query={query} onQueryChange={onQueryChange} />
      </div>

      <nav className="order-2 flex items-center gap-3 text-[12.5px] text-zinc-500 sm:gap-4 md:order-3 dark:text-zinc-400">
        <ThemeToggle />
        <a
          href="https://github.com/kimminchul/anticard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <span>Github</span>
          <ArrowUpRight aria-hidden className="h-3 w-3 opacity-60" />
        </a>
        <a
          href="https://freeive.com/anti-card"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 transition-colors hover:text-zinc-900 sm:inline-flex dark:hover:text-zinc-100"
        >
          <span>freeive.com/anti-card</span>
          <ArrowUpRight aria-hidden className="h-3 w-3 opacity-60" />
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
      {theme === "dark" ? (
        <Moon aria-hidden className="h-3 w-3" />
      ) : (
        <Sun aria-hidden className="h-3 w-3" />
      )}
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
  // 사이드바는 query 영향 받지 않음 — 검색은 Header dropdown으로 분리.
  const readyCount = NAV.flatMap((g) => g.items).filter((i) => i.status === "ready").length;
  const totalCount = NAV.flatMap((g) => g.items).length;

  // filter (전체/준비됨) 만 적용
  const filteredGroups = NAV.map((group) => {
    const items = filter === "ready" ? group.items.filter((i) => i.status === "ready") : group.items;
    return { group, items };
  }).filter((g) => g.items.length > 0);

  return (
    <aside className="thin-scroll self-start md:sticky md:top-10 md:max-h-[calc(100vh-5rem)] md:overflow-y-auto md:pr-6">
      {/* Docs — 개요 단독 */}
      <div className="mb-6">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">Docs</p>
        <ul className="mt-3 space-y-1.5 border-l border-zinc-200 pl-3.5 text-[15px] dark:border-white/[0.08]">
          <li>
            <a
              href="#intro"
              className={`-ml-3.5 flex items-baseline gap-2 rounded-r-md py-1 pl-3.5 pr-2 transition-colors ${
                activeId === "intro"
                  ? "border-l-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400"
                  : "border-l-2 border-transparent text-zinc-700 hover:border-zinc-300 hover:text-emerald-700 dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-emerald-400"
              }`}
            >
              개요
            </a>
          </li>
        </ul>
      </div>

      {/* Filter (전체 / 준비됨) */}
      <div className="flex items-center gap-1 rounded-md border border-zinc-200 p-0.5 dark:border-white/[0.08]">
        <button type="button" onClick={() => onFilterChange("all")} className={`flex-1 rounded px-2 py-1.5 text-[13px] transition-colors ${filter === "all" ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.08] dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
          전체 {totalCount}
        </button>
        <button type="button" onClick={() => onFilterChange("ready")} className={`flex-1 rounded px-2 py-1.5 text-[13px] transition-colors ${filter === "ready" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
          준비됨 {readyCount}
        </button>
      </div>

      <div className="mt-7 space-y-2">
        {filteredGroups.map(({ group, items }) => {
          if (items.length === 0) return null;
          // 자동 펼침 조건: 활성 컴포넌트가 이 그룹에 속함
          const containsActive = items.some((it) => it.id === activeId);
          const autoOpen = containsActive;
          return (
            <details
              key={group.group}
              open={autoOpen}
              className="group/cat [&>summary]:list-none [&>summary]:cursor-pointer"
            >
              <summary className="flex items-baseline justify-between gap-2 rounded-md px-1.5 py-2 hover:bg-zinc-100/50 dark:hover:bg-white/[0.03]">
                <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
                  {group.group}
                </span>
                <span aria-hidden className="flex items-baseline gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                  <span className="font-mono tabular-nums">{items.length}</span>
                  <span className="transition-transform duration-200 group-open/cat:rotate-90">▶</span>
                </span>
              </summary>
              {group.desc && (
                <p className="mt-1 px-1.5 text-[12.5px] leading-snug text-zinc-500">{group.desc}</p>
              )}
              <ul className="mt-2 space-y-1.5 border-l border-zinc-200 pl-3.5 text-[15px] dark:border-white/[0.08]">
                {items.map((item) => {
                  const meta = STATUS_META[item.status];
                  const isClickable = item.status === "ready";
                  const isActive = activeId === item.id;
                  const v = COMPONENT_VERSIONS[item.id];
                  const isUpdatedNow = v?.updatedIn === VERSION;
                  // ready: 버전 표시 (v0.x.x), 그 외: status 라벨 (soon/planned)
                  const trailingLabel =
                    item.status === "ready" && v ? `v${v.addedIn}` : meta.label;
                  const trailingCls =
                    item.status === "ready"
                      ? isActive
                        ? "font-mono tabular-nums text-emerald-600 dark:text-emerald-400"
                        : "font-mono tabular-nums text-zinc-400 dark:text-zinc-500"
                      : meta.cls;
                  return (
                    <li key={item.id}>
                      {isClickable ? (
                        <a
                          href={`#${item.id}`}
                          className={`-ml-3.5 flex items-baseline justify-between gap-2 rounded-r-md py-1 pl-3.5 pr-2 transition-colors ${isActive ? "border-l-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400" : "border-l-2 border-transparent text-zinc-700 hover:border-zinc-300 hover:text-emerald-700 dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-emerald-400"}`}
                        >
                          <span className="flex items-baseline gap-1.5">
                            <span>{item.ko}</span>
                            {isUpdatedNow && (
                              <span
                                title={`v${VERSION}에서 업데이트됨`}
                                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                              />
                            )}
                          </span>
                          <span className={`text-[10.5px] ${trailingCls}`}>{trailingLabel}</span>
                        </a>
                      ) : (
                        <span className="flex items-baseline justify-between gap-2 py-1 text-zinc-400 dark:text-zinc-500">
                          <span>{item.ko}</span>
                          <span className={`text-[10.5px] ${meta.cls}`}>{meta.label}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
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
        AI 시대의 UI 라이브러리는 방식이 바뀌어야 합니다. 안티 카드는{" "}
        <strong className="text-zinc-900 dark:text-zinc-200">가장 순수한 HTML/CSS</strong>를 제공하고, AI가 이 디자인과
        구조를 참고합니다. 각 Example마다{" "}
        <strong className="text-zinc-900 dark:text-zinc-200">디자인 / 프롬프트 / HTML / CSS / JS / React</strong> 탭을 제공합니다.
      </p>

      {/* freeive 역링크 — 정체성·철학·5원칙은 freeive에 */}
      <div className="mt-7 border-y border-zinc-200/60 py-4 dark:border-white/[0.06]">
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          공식 사이트
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          이 Playground는 컴포넌트 카탈로그입니다. <strong className="text-zinc-900 dark:text-zinc-100">정체성·철학·5원칙·dogfooding 사례</strong>는 공식 사이트에서:
        </p>
        <a
          href="https://freeive.com/anti-card"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2 text-[15px] font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          <span className="border-b border-current/30 group-hover:border-current">
            freeive.com/anti-card
          </span>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* 시작하기 — 간단 install + 1.0.0 정책 안내 */}
      <div className="mt-12 border-t border-zinc-200 pt-10 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">시작하기</p>
        <p className="mt-1.5 max-w-[58ch] text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          현재 v{VERSION} — <strong>GitHub-only release</strong>. npm publish는 1.0.0부터 (정책: <code>docs/VERSIONING.md</code> §7).
          그 전까지는 tarball 방식으로 설치합니다.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 0.x.x 설치 — tarball */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">현재 (0.x.x)</p>
            <pre className="mt-2 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 text-[11.5px] leading-relaxed dark:border-white/[0.08] dark:bg-white/[0.02]">
              <code>{`# 1) repo clone + 빌드
git clone https://github.com/kimminchul/anticard.git
cd anticard
npm install --legacy-peer-deps
npm run build

# 2) tarball 생성
npm pack
# → freeive-anti-card-${VERSION}.tgz

# 3) 자기 프로젝트에서 설치
cd ../my-project
npm install ../anticard/freeive-anti-card-${VERSION}.tgz`}</code>
            </pre>
          </div>

          {/* 1.0.0+ 설치 — npm */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">1.0.0 이후 (예정)</p>
            <pre className="mt-2 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 text-[11.5px] leading-relaxed dark:border-white/[0.08] dark:bg-white/[0.02]">
              <code>{`npm install @freeive/anti-card`}</code>
            </pre>
            <p className="mt-3 text-[11.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
              1.0.0 release 전까지: API 동결 / Tailwind config 가이드 / AI Skill install 명령 정식화 작업 진행 중.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[11.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          전체 가이드:{" "}
          <a
            href="https://github.com/kimminchul/anticard/blob/main/docs/getting-started.mdx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            docs/getting-started.mdx
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/kimminchul/anticard/blob/main/docs/VERSIONING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            docs/VERSIONING.md
          </a>
        </p>
      </div>

      {/* 빠른 미리보기 — 시드 컴포넌트 3개 */}
      <div className="mt-12 border-t border-zinc-200 pt-10 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">시드 컴포넌트</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500">처음 만들어진 3개. 좌측 사이드바에서 전체 탐색.</p>
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
    sample: "서비스 운영자의 무기를 만드는 랩.",
  },
  {
    token: "display",
    label: 'HeroHeading default · 페이지 타이틀 · 30~48px',
    sample: "큰 프로젝트들의 깊이를 랩으로 옮긴다.",
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

/* ================ Motion tokens reference ================ */

/** 모션 시연용 — 클릭 시 토글되는 작은 박스. 각 duration / easing 비교. */
function MotionDemoBox({
  duration,
  easing = "ease-in-out",
  label,
}: {
  duration: string;
  easing?: string;
  label: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[12px] text-zinc-700 transition-colors hover:border-zinc-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300"
      >
        {on ? "OFF" : "ON"}
      </button>
      <div className="relative h-8 flex-1 overflow-hidden rounded-md border border-dashed border-zinc-300 bg-zinc-50/60 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div
          className="absolute top-0 bottom-0 left-0 bg-emerald-500/30 dark:bg-emerald-400/30"
          style={{
            width: on ? "100%" : "0%",
            transitionProperty: "width",
            transitionDuration: duration,
            transitionTimingFunction: easing,
          }}
        />
        <span className="relative flex h-full items-center px-2 text-[11.5px] text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      </div>
    </div>
  );
}

function MotionTokens() {
  const durationRows: Array<{ token: string; value: string; usage: string }> = [
    { token: "instant", value: motion.duration.instant, usage: "focus ring · micro 반응" },
    { token: "fast", value: motion.duration.fast, usage: "호버 · color 전환 (가장 자주)" },
    { token: "DEFAULT", value: motion.duration.DEFAULT, usage: "일반 상태 변경" },
    { token: "slow", value: motion.duration.slow, usage: "모달 fade · sliding panel" },
    { token: "slower", value: motion.duration.slower, usage: "페이지 in-view · 누적 stagger" },
  ];

  const easingRows: Array<{ token: string; value: string; tw: string; usage: string }> = [
    { token: "standard", value: motion.easing.standard, tw: "ease-in-out", usage: "양방향 상태 전환 (default)" },
    { token: "decelerate", value: motion.easing.decelerate, tw: "ease-out", usage: "UI 진입 (in) — 부드럽게 멈춤" },
    { token: "accelerate", value: motion.easing.accelerate, tw: "ease-in", usage: "UI 퇴장 (out) — 빠르게 사라짐" },
  ];

  const matrix: Array<{ situation: string; duration: string; easing: string }> = [
    { situation: "Hover (color/border)", duration: "fast (150ms)", easing: "ease-in-out" },
    { situation: "Button press / state", duration: "DEFAULT (200ms)", easing: "ease-in-out" },
    { situation: "Modal/Drawer enter", duration: "slow (300ms)", easing: "ease-out" },
    { situation: "Modal/Drawer exit", duration: "fast (150ms)", easing: "ease-in" },
    { situation: "페이지 in-view fade", duration: "slower (500ms)", easing: "ease-out" },
    { situation: "Tooltip 등장", duration: "fast (150ms)", easing: "ease-out" },
  ];

  return (
    <section>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">Resource</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">모션 토큰</h2>
      <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        anti-card는 절제된 모션을 추구합니다. bounce·rotate·dramatic zoom 거부, 빠른 hover (150ms) + 단조로운 transform.
        <strong>5 duration + 3 easing</strong> 토큰으로 통일합니다.
      </p>

      {/* 5원칙 */}
      <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">5원칙</p>
        <ol className="mt-4 grid grid-cols-1 gap-2 text-[14px] text-zinc-700 dark:text-zinc-300 md:grid-cols-2">
          <li className="flex items-baseline gap-2"><span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">01</span><span><strong>절제</strong> — bounce / rotate / shake 거부</span></li>
          <li className="flex items-baseline gap-2"><span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">02</span><span><strong>빠름</strong> — 150ms hover · 200ms 상태 변경 기본</span></li>
          <li className="flex items-baseline gap-2"><span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">03</span><span><strong>단방향</strong> — opacity + 작은 transform (1~4px)</span></li>
          <li className="flex items-baseline gap-2"><span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">04</span><span><strong>존중</strong> — prefers-reduced-motion 자동 인식</span></li>
          <li className="flex items-baseline gap-2"><span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">05</span><span><strong>CSS first</strong> — JS는 in-view 등 필요할 때만</span></li>
        </ol>
      </div>

      {/* Duration */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">Duration (5)</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">
          ON 버튼 클릭으로 각 duration의 차이 확인. ease-in-out 동일.
        </p>
        <ul className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {durationRows.map((row) => (
            <li key={row.token} className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[120px_80px_1fr_240px] md:items-center md:gap-6">
              <code className="font-mono text-[12.5px] text-emerald-700 dark:text-emerald-400">{row.token}</code>
              <span className="font-mono text-[12.5px] tabular-nums text-zinc-500 dark:text-zinc-500">{row.value}</span>
              <MotionDemoBox duration={row.value} label={row.value} />
              <span className="text-[12.5px] text-zinc-500 dark:text-zinc-500">{row.usage}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11.5px] text-zinc-500 dark:text-zinc-500">
          Tailwind 클래스: <code>duration-instant</code> · <code>duration-fast</code> · <code>duration-200</code> · <code>duration-slow</code> · <code>duration-slower</code>
        </p>
      </div>

      {/* Easing */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">Easing (3)</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">
          Tailwind 기본 ease-* 와 동일 베지어. 모두 duration: 500ms.
        </p>
        <ul className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {easingRows.map((row) => (
            <li key={row.token} className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[120px_180px_1fr_220px] md:items-center md:gap-6">
              <code className="font-mono text-[12.5px] text-emerald-700 dark:text-emerald-400">{row.token}</code>
              <code className="text-[11px] text-zinc-500 dark:text-zinc-500">{row.tw}</code>
              <MotionDemoBox duration="500ms" easing={row.value} label={row.value} />
              <span className="text-[12.5px] text-zinc-500 dark:text-zinc-500">{row.usage}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 권장 매트릭스 */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">권장 매트릭스</p>
        <ul className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {matrix.map((row) => (
            <li key={row.situation} className="grid grid-cols-1 gap-2 py-3 md:grid-cols-[1fr_180px_140px] md:items-baseline md:gap-6">
              <span className="text-[14px] text-zinc-900 dark:text-zinc-100">{row.situation}</span>
              <code className="text-[12px] text-emerald-700 dark:text-emerald-400">{row.duration}</code>
              <code className="text-[12px] text-zinc-500 dark:text-zinc-400">{row.easing}</code>
            </li>
          ))}
        </ul>
      </div>

      {/* Reduced motion */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">접근성 — prefers-reduced-motion</p>
        <p className="mt-1.5 max-w-[58ch] text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          OS의 "모션 줄이기"가 활성화된 사용자에게 transition·animation을 거의 즉각으로 단축. 앱 root CSS에 1번 추가:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 text-[12px] dark:border-white/[0.08] dark:bg-white/[0.02]">
          <code>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</code>
        </pre>
        <p className="mt-3 text-[11.5px] text-zinc-500 dark:text-zinc-500">
          이 playground는 이미 적용됨 (<code>playground/styles.css</code>).
        </p>
      </div>

      {/* JS 사용 */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">JS 토큰 사용</p>
        <p className="mt-1.5 max-w-[58ch] text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          대부분 Tailwind 클래스로 충분. 동적 값 / non-Tailwind 환경에서는 직접 import:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 text-[12px] dark:border-white/[0.08] dark:bg-white/[0.02]">
          <code>{`import { motion } from "@freeive/anti-card";

<div style={{
  transitionDuration: motion.duration.fast,
  transitionTimingFunction: motion.easing.standard,
}}>...</div>`}</code>
        </pre>
      </div>
    </section>
  );
}

/* ================ Icons resource page ================ */

/** Icons resource page — 안티 카드의 lucide 사용 정책 + 사용·검토 컴포넌트 */
function Icons() {
  // 0.10.0 부터 라이브러리 내부에서 자동 사용 중인 아이콘
  const inUse: Array<{ component: string; id: string; icons: Array<{ name: string; el: ReactNode }>; note: string }> = [
    {
      component: "LinkRow",
      id: "link-row",
      icons: [
        { name: "ArrowRight", el: <ArrowRight className="h-4 w-4" /> },
        { name: "ArrowUpRight", el: <ArrowUpRight className="h-4 w-4" /> },
      ],
      note: "내부 링크 → ArrowRight / external prop → ArrowUpRight 자동",
    },
    {
      component: "FAQ",
      id: "faq",
      icons: [{ name: "Plus", el: <Plus className="h-4 w-4" /> }],
      note: "details 닫힘 → +, 열림 → group-open으로 45도 회전 → ×",
    },
    {
      component: "Pill",
      id: "pill",
      icons: [{ name: "ArrowUpRight", el: <ArrowUpRight className="h-3 w-3 opacity-60" /> }],
      note: "as=\"a\" + external=true 일 때 자동 (h-3 w-3, opacity-60)",
    },
  ];

  // 아이콘 prop 추가 검토 중인 컴포넌트들 (1.0.0 전까지 결정)
  const candidates: Array<{ component: string; id?: string; where: string; suggestion: ReactNode }> = [
    {
      component: "Input",
      id: "input",
      where: "leading / trailing",
      suggestion: (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <Search className="h-3.5 w-3.5" /> <Mail className="h-3.5 w-3.5" /> <Lock className="h-3.5 w-3.5" /> 검색·이메일·잠금 등
        </span>
      ),
    },
    {
      component: "Button",
      id: "button-primary",
      where: "leading (children 앞)",
      suggestion: <span>이미 children: ReactNode — `&lt;Plus className="h-4 w-4" /&gt;` 형태 자유 삽입 가능. 표준 패턴 docs 정리 필요.</span>,
    },
    {
      component: "Banner",
      id: "banner",
      where: "tone별 자동",
      suggestion: (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <Info className="h-3.5 w-3.5" />info / <Sparkles className="h-3.5 w-3.5" />accent / <AlertTriangle className="h-3.5 w-3.5" />warning / <AlertOctagon className="h-3.5 w-3.5" />danger
        </span>
      ),
    },
    {
      component: "Callout",
      id: "callout",
      where: "tone별 자동",
      suggestion: <span>Banner와 동일 톤 (info/accent/warning/danger)</span>,
    },
    {
      component: "Steps",
      id: "steps",
      where: "step별 사용자 지정",
      suggestion: <span>각 step.icon 옵션 — 없으면 번호 (현재 동작) 유지</span>,
    },
    {
      component: "Select",
      id: "select",
      where: "trailing (현재 SVG)",
      suggestion: (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <ChevronDown className="h-3.5 w-3.5" /> ChevronDown으로 통일 — 현재 inline SVG → lucide
        </span>
      ),
    },
    {
      component: "Checkbox / Radio",
      id: "checkbox-radio",
      where: "체크 표시 (native accent-color 사용 중)",
      suggestion: (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <Check className="h-3.5 w-3.5" /> 커스텀 표시 옵션 (현재 native ✓ 사용 — 유지 권장)
        </span>
      ),
    },
    {
      component: "Footer",
      id: "footer",
      where: "소셜 / 외부 링크 옆",
      suggestion: (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <ExternalLink className="h-3.5 w-3.5" /> 외부 링크 표시 — brand icons는 lucide 미수록(GitHub 등) → simple-icons 별도 검토
        </span>
      ),
    },
    {
      component: "ListRow",
      id: "list-row",
      where: "meta 옆 또는 trailing",
      suggestion: <span>meta가 카테고리/날짜이므로 leading icon은 어울림. external indicator도 자동 가능.</span>,
    },
  ];

  return (
    <section>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">Resource</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">아이콘 (lucide-react)</h2>
      <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        안티 카드는 v0.10.0부터 <strong>lucide-react</strong> 를 base 아이콘 라이브러리로 사용합니다.
        <strong className="ml-1">1px stroke 미니멀 톤</strong>이 헤어라인 정체성과 일치하기 때문입니다.
      </p>

      {/* 정책 */}
      <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">정책</p>
        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-zinc-700 dark:text-zinc-300 md:grid-cols-2">
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>표준 라이브러리</strong>: lucide-react (ISC License) — 1500+ 아이콘</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>크기 표준</strong>: <code>h-3 w-3</code> (12px tiny) / <code>h-3.5 w-3.5</code> (14px) / <code>h-4 w-4</code> (16px default) / <code>h-5 w-5</code> (20px large)</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>tree-shaking</strong>: 사용 아이콘만 번들 (ESM 빌드 → 자동)</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>다른 라이브러리도 자유</strong>: anti-card 컴포넌트의 <code>icon</code> prop은 모두 <code>ReactNode</code></span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>color 톤</strong>: 기본 <code>text-current</code> 상속, hover 시 <code>text-emerald-*</code> (accent), opacity로 secondary 톤</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">·</span>
            <span><strong>aria</strong>: 장식적 아이콘은 <code>aria-hidden</code>, 의미 있는 경우 <code>aria-label</code></span>
          </li>
        </ul>
        <p className="mt-5 text-[12.5px] text-zinc-500 dark:text-zinc-400">
          외부:{" "}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
            lucide.dev
          </a>{" "}
          (전체 카탈로그) ·{" "}
          <a href="https://lucide.dev/guide/packages/lucide-react" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
            React 가이드
          </a>
        </p>
      </div>

      {/* 사용 중 (라이브러리 내부) */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">사용 중 — 라이브러리 내부 ({inUse.length})</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">v0.10.0 부터 자동 적용. 사용자가 추가 import 불필요.</p>
        <ul className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {inUse.map((row) => (
            <li key={row.component} className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[140px_160px_1fr] md:items-start md:gap-8">
              <a href={`#${row.id}`} className="text-[14px] font-medium text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 md:pt-1">
                &lt;{row.component}&gt;
              </a>
              <div className="flex flex-col items-start gap-2 text-zinc-700 dark:text-zinc-300">
                {row.icons.map((ic) => (
                  <span key={ic.name} title={ic.name} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center">{ic.el}</span>
                    <code className="text-[11px] text-zinc-500">{ic.name}</code>
                  </span>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 md:pt-1">{row.note}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 검토 중 (1.0.0 전까지) */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">검토 중 — 아이콘 prop 추가 후보 ({candidates.length})</p>
        <p className="mt-1.5 text-[12.5px] text-zinc-500 dark:text-zinc-500">1.0.0 API 동결 전까지 결정. 추가 시 호환 깨지지 않게 optional prop으로 도입.</p>
        <ul className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {candidates.map((row) => (
            <li key={row.component} className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[160px_140px_1fr] md:items-baseline md:gap-6">
              {row.id ? (
                <a href={`#${row.id}`} className="text-[14px] font-medium text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400">
                  &lt;{row.component}&gt;
                </a>
              ) : (
                <span className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">&lt;{row.component}&gt;</span>
              )}
              <span className="text-[12px] uppercase tracking-[0.06em] text-zinc-500 dark:text-zinc-400">{row.where}</span>
              <span className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{row.suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 사용 가이드 */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-300">사용 가이드 (사용자 코드)</p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 text-[12.5px] dark:border-white/[0.08] dark:bg-white/[0.02]">
          <code>{`import { Plus, ArrowRight } from "lucide-react";
import { LinkRow, Pill } from "@freeive/anti-card";

// 1) 컴포넌트가 자동 사용 — 사용자는 코드 작성 X
<LinkRow href="/heritage">전체 보기</LinkRow>            {/* → ArrowRight 자동 */}
<LinkRow href="https://github.com" external>GitHub</LinkRow>  {/* → ArrowUpRight */}

// 2) 직접 합치기 (Button children 등)
<Button>
  <Plus className="h-4 w-4" />
  새 항목
</Button>

// 3) Pill external indicator (자동)
<Pill as="a" href="https://..." external>외부 링크</Pill>  {/* → ArrowUpRight 자동 */}`}</code>
        </pre>
      </div>
    </section>
  );
}

/* ================ Component page ================ */

function ComponentPage({ def }: { def: ComponentDef }) {
  const version = COMPONENT_VERSIONS[def.id];
  const lucideIcons = USES_LUCIDE[def.id];

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

        {/* 메타 뱃지 — anti-card Pill 컴포넌트 dogfooding (badge 어휘 = Pill) */}
        {(version || lucideIcons) && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {version && (
              <Pill
                as="a"
                href={changelogUrl(version.addedIn)}
                external
                tone="default"
                title="첫 출현 버전 — CHANGELOG로 이동"
              >
                added v{version.addedIn}
              </Pill>
            )}
            {version?.updatedIn && version.updatedIn !== version.addedIn && (
              <Pill
                as="a"
                href={changelogUrl(version.updatedIn)}
                external
                tone="accent"
                title="마지막 의미 있는 변경 버전 — CHANGELOG로 이동"
              >
                updated v{version.updatedIn}
              </Pill>
            )}
            {lucideIcons && (
              <Pill
                as="a"
                href="#icons"
                tone="muted"
                title={`내부 lucide 아이콘 사용: ${lucideIcons.join(", ")}`}
              >
                icons · lucide {lucideIcons.length}
              </Pill>
            )}
          </div>
        )}

        {/* 본문 설명 — intro가 있으면 풍부한 설명, 없으면 desc fallback.
            카탈로그 사이드바·NAV는 desc(짧은 줄)를 그대로 사용. */}
        <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {def.intro ?? def.desc}
        </p>

        {/* 주로 어디에 쓰나요 — 단독 영역. 데이터 없으면 자동 숨김.
            안티 카드 5원칙 일관성 — border-t만 (박스 거부, 아래는 공간으로 분리). */}
        {def.useCases && def.useCases.length > 0 && (
          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-white/[0.06] md:pt-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              주로 어디에 쓰나요
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-12">
              {def.useCases.map((u, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-2 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <span aria-hidden className="shrink-0 text-emerald-500/80 dark:text-emerald-400/80">
                    ·
                  </span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
    <div className="rounded-lg border border-dashed border-zinc-300 dark:border-white/[0.12]">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-lg border-b border-dashed border-zinc-300 bg-zinc-50/60 px-5 py-3 dark:border-white/[0.12] dark:bg-white/[0.02]">
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
          <div className="canvas-surface relative min-h-[200px] p-8 md:p-12">
            <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-emerald-500/30 dark:border-emerald-400/30" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-emerald-500/30 dark:border-emerald-400/30" />
            {example.preview}
          </div>
        )}
        {tab === "prompt" && <PromptInline prompt={example.prompt} />}
        {tab === "html" && (
          example.html ? (
            <CodeInline code={example.html} language="HTML (Tailwind)" />
          ) : (
            <NoteInline
              title="React 컴포넌트가 본질"
              body="이 컴포넌트는 props·variant 처리가 많아 React 사용을 권장합니다. 단순 HTML 변환은 가능하지만 모든 variant를 직접 구현해야 합니다 — 우측 React 탭의 코드를 우선 참고하세요."
            />
          )
        )}
        {tab === "css" && (
          example.css ? (
            <>
              <CodeInline code={example.css} language="CSS (vanilla)" />
              {example.cssHtml && <CodeInline code={example.cssHtml} language="HTML (vanilla CSS와 함께)" />}
            </>
          ) : (
            <NoteInline title="Tailwind만으로 충분" body="이 example은 별도 vanilla CSS 없이도 Tailwind 클래스만으로 동작합니다. 위 HTML 탭의 코드(있는 경우) 또는 React 탭의 className을 그대로 사용하세요." />
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
    <footer className="grid grid-cols-1 gap-y-6 text-[12.5px] text-zinc-500 md:grid-cols-[1.5fr_3fr] md:gap-x-12 dark:text-zinc-400">
      {/* Brand */}
      <div>
        <p className="text-[14px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          @freeive/anti-card
        </p>
        <p className="mt-2 max-w-[36ch] text-[12.5px] leading-relaxed">
          AI 시대 사이트 동질화에 답하는 UI 라이브러리.
        </p>
        <p className="mt-3 text-[11.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-500">
          v{VERSION}
        </p>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            공식
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="https://freeive.com/anti-card"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                freeive.com/anti-card
              </a>
            </li>
            <li>
              <a
                href="https://freeive.com/blog/solo-lab-and-anti-card"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                블로그 첫 글
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Open
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="https://github.com/kimminchul/anticard"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <span className="text-zinc-400 dark:text-zinc-600">
                NPM · 1.0.0 발행 예정
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Talk
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="mailto:ive@freeive.com"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                ive@freeive.com
              </a>
            </li>
            <li>
              <a
                href="https://freeive.com/talk"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                의뢰·문의
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright — 전체 너비 */}
      <div className="border-t border-zinc-200/60 pt-4 text-[11px] uppercase tracking-[0.08em] text-zinc-500 md:col-span-2 dark:border-white/[0.06] dark:text-zinc-500">
        © 2026 Freeive · MIT License · Kim Min Chul
      </div>
    </footer>
  );
}

/* ================ Component definitions ================ */

const EYEBROW_DEF: ComponentDef = {
  id: "eyebrow",
  ko: "아이브로우 라벨",
  en: "Eyebrow",
  desc: "섹션의 카테고리를 작은 라벨로 분리하는 smallcaps 컴포넌트. 카드 박스 없이 영역을 구분하는 가장 가벼운 신호.",
  intro:
    "본문이나 큰 제목 위에 살짝 들어가는 11~12px 짜리 작은 글씨 라벨입니다. 영문 대문자 + 자간을 약간 벌려 \"이 영역의 분류는 이거예요\"라고 부드럽게 알려 줍니다. 카드나 박스로 가두지 않고 글자 한 줄만으로 섹션의 시작을 표시합니다.",
  useCases: [
    "섹션 큰 제목 바로 위의 카테고리 라벨 (예: \"Heritage · 2016 — Now\")",
    "블로그 글의 카테고리·연재 표시",
    "Talk·About 같은 페이지의 \"What·Why·How\" 미니 헤딩",
    "Hero 위에 들어가는 영역 식별자 (예: \"Solo lab · 실험 중인 것들\")",
  ],
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
  intro:
    "한 영역(섹션)을 통째로 만들어 주는 큰 묶음 컴포넌트입니다. 위에 작은 라벨, 그 아래 큰 제목, 보조 한 줄, 본문 — 이 네 가지가 일관된 간격으로 자동 배치됩니다. 박스나 그림자로 영역을 가두지 않고, 위/아래 1픽셀 선과 충분한 여백만으로 \"여기서부터 새 영역\"을 알립니다.",
  useCases: [
    "랜딩 페이지의 \"3가지 축\" 같은 큰 영역 묶음",
    "Heritage·About에서 카테고리별 큰 영역 정리",
    "FAQ·Pricing 같이 헤더가 필요한 콘텐츠 영역",
    "한 페이지 안에 여러 영역이 있을 때 위계를 자동으로 통일",
  ],
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
  intro:
    "카드 박스를 격자로 늘어놓는 대신, 한 줄짜리 행을 위에서 아래로 쌓아 정보를 보여주는 패턴입니다. 행과 행 사이에는 1픽셀 선만 있고, 좌측에는 작은 메타(연도·카테고리 등), 우측에는 보조 정보를 둘 수 있어 한 화면에 더 많은 항목이 자연스럽게 펼쳐집니다. 안티 카드 톤에서 가장 자주 쓰이는 기본 단위입니다.",
  useCases: [
    "Heritage의 섹터별 프로젝트 목록 (연도 + 제목 + 클라이언트)",
    "블로그 글 목록의 단정한 행 (날짜 + 제목 + 카테고리)",
    "FAQ 같은 단순 목록 + 우측 화살표",
    "Pricing 페이지의 플랜 비교 행",
    "안티 카드 프레임워크의 \"5원칙\" 같은 번호 + 제목 + 설명 패턴",
  ],
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
  intro:
    "본문이 너무 넓게 퍼지지 않도록 가운데로 모아 주는 보이지 않는 틀입니다. 박스나 테두리는 없고, 좌우 여백만으로 영역을 정해 본문이 읽기 좋은 너비에서 멈추게 만듭니다. 모바일에서는 좌우 패딩이 자동으로 줄어 답답하지 않습니다.",
  useCases: [
    "랜딩·Heritage·Lab 같은 일반 페이지 본문 (1200px 표준)",
    "블로그 본문처럼 글자가 메인일 때는 좁은 너비(640~720px)로 가독성 우선",
    "히어로·갤러리처럼 풍부한 시각이 필요한 화면은 넓은 너비(1440px+)",
    "약관·정책 페이지의 긴 텍스트를 한 호흡으로 읽히게",
  ],
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
  intro:
    "본문 사이에 들어가는 가장 가벼운 구분선입니다. 박스로 묶거나 큰 빈 공간을 만들지 않고, 1픽셀 짜리 한 줄만으로 \"여기까지 한 영역, 여기부터 다른 영역\"이라고 부드럽게 알려 줍니다.",
  useCases: [
    "긴 페이지에서 섹션과 섹션 사이의 자연스러운 분리",
    "블로그 본문 안에서 화제가 바뀌는 지점 표시",
    "Footer 위처럼 본문이 끝났음을 알리는 마무리 선",
    "한 줄짜리 메뉴 아래 가벼운 underline 대안",
  ],
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
  intro:
    "페이지에 들어가자마자 가장 먼저 눈에 띄는 큰 제목입니다. 사이트 메인 첫 화면(hero)에서는 더 크게, 그 외 페이지(Lab / Heritage / Blog)에서는 살짝 작은 사이즈로 자동 조절됩니다. 화면이 좁아지면 글자 크기가 부드럽게 줄어 모바일에서도 답답하지 않습니다.",
  useCases: [
    "사이트 메인 첫 화면의 가장 큰 한 줄 (한 사이트당 1번만)",
    "Lab·Heritage·Blog·Talk 같은 영역 페이지의 첫 화면 제목",
    "특정 캠페인/이벤트 랜딩의 메인 메시지",
    "어디서 어떤 페이지에 들어왔는지 한눈에 알리는 위계의 시작",
  ],
  examples: [
    {
      index: "01",
      badge: "default · page",
      title: "기본 — 일반 페이지 타이틀 (30~48px)",
      description: "Lab / Heritage / Blog 등 일반 페이지의 첫 화면. typography.display 토큰.",
      preview: (
        <HeroHeading>큰 프로젝트들의 깊이를 랩으로 옮긴다.</HeroHeading>
      ),
      prompt: `일반 페이지(Lab / Heritage / Blog)의 첫 화면 큰 제목이 필요해. 사이트 메인이 아닌 페이지 단위 hero.

용도: 페이지의 정체성을 한 줄로 알리는 큰 제목. 카드 박스 없이 큰 타입과 공간 자체가 영역 시그널.

스타일 (typography.display 토큰):
- 크기: clamp(1.875rem, 4vw, 3rem) — 30~48px
- font-semibold tracking-[-0.02em] (자간 살짝 negative)
- 색: text-zinc-900 dark:text-zinc-50
- 너비: max-w-[20ch] — 자연스러운 줄바꿈
- 줄간격: leading-[1.1]
- 차분 톤 — shadcn식 거대 hero(64~80px+) 거부.

사이트 메인의 최상위 hero가 필요하면 size="hero" (다음 example 참조).`,
      html: `<h1 class="font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] max-w-[20ch]">
  큰 프로젝트들의 깊이를 랩으로 옮긴다.
</h1>`,
      react: `<HeroHeading>큰 프로젝트들의 깊이를 랩으로 옮긴다.</HeroHeading>`,
    },
    {
      index: "02",
      badge: "size · hero",
      title: "size='hero' — 사이트 메인 (40~64px)",
      description: "사이트 최상위 hero. typography.displayLg 토큰. 사이트당 1번만.",
      preview: (
        <HeroHeading size="hero">서비스 운영자의 무기를 만드는 랩.</HeroHeading>
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

이게 안티 카드 사이트의 표준 위계 — 메인 1번 강조 + 나머지는 차분.`,
      html: `<h1 class="font-semibold tracking-[-0.025em] text-zinc-900 dark:text-zinc-50 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] max-w-[20ch]">
  서비스 운영자의 무기를 만드는 랩.
</h1>`,
      react: `<HeroHeading size="hero">
  서비스 운영자의 무기를 만드는 랩.
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
  intro:
    "페이지 안에서 영역(섹션)이 바뀔 때 다시 시작을 알리는 중간 크기의 제목입니다. 페이지 첫 화면의 큰 제목보다는 작고, 본문 글자보다는 큰 — 위계의 두 번째 단계라고 보면 됩니다. 한 페이지에 여러 번 등장할 수 있습니다.",
  useCases: [
    "랜딩 페이지의 \"3가지 축\" 같은 영역 제목",
    "Heritage의 \"진행 중\" / \"섹터별\" 같은 큰 그룹 제목",
    "블로그 글 안에서 큰 단원의 시작",
    "FAQ·Pricing 같은 콘텐츠 영역의 머리말",
  ],
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
  intro:
    "큰 제목 바로 아래에 들어가는 부연 한두 문장입니다. 본문 글자보다 살짝 크고 색은 살짝 흐려서, \"이 제목을 한 번 더 풀어 설명하는 도움말\"이라는 느낌을 자연스럽게 줍니다. 사용자가 페이지에 들어왔을 때 \"여기서 무엇을 보게 되는지\"를 빠르게 잡아 줍니다.",
  useCases: [
    "사이트 메인 첫 화면 큰 제목 아래 한두 문장",
    "Lab·Heritage·Blog 같은 영역 페이지의 인트로 문장",
    "Talk 페이지의 \"왜 이런 의뢰만 받는지\" 같은 부연",
    "블로그 카테고리·태그 페이지의 짧은 안내",
  ],
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
          랩의 실험 기록. 작게, 자주, 솔직하게.
        </Lead>
      ),
      prompt: `사이드 영역 / 푸터 description처럼 좁은 너비의 보조 카피. max-w-[44ch].`,
      html: `<p class="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-[44ch]">
  랩의 실험 기록. 작게, 자주, 솔직하게.
</p>`,
      react: `<Lead width="narrow">랩의 실험 기록. 작게, 자주, 솔직하게.</Lead>`,
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
  intro:
    "버튼처럼 둥근 박스 안에 가두지 않고, 텍스트 옆에 화살표만 달아 \"여기를 누르면 이동합니다\"라고 알려 주는 가벼운 링크입니다. 마우스를 올리면 글자색이 살짝 강조되어 클릭 가능한 영역임이 자연스럽게 드러납니다. 큰 버튼이 부담스러운 자리에서 단정한 강조로 자주 씁니다.",
  useCases: [
    "본문 끝에서 \"자세히 보기\" 같은 다음 페이지로의 안내",
    "히어로 아래 메인 CTA를 박스 없이 가볍게 두고 싶을 때",
    "리스트 항목 안의 \"보기·열기\" 같은 행 단위 액션",
    "Footer / 하단 CTA 영역의 부담 없는 행동 유도",
  ],
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
  intro:
    "모든 페이지의 가장 위에 들어가는 띠입니다. 사이트 이름 / 메뉴 / 가장 중요한 단 하나의 액션(예: 의뢰)을 한 줄에 정리해 줍니다. 박스나 그림자로 영역을 가두지 않고, 아래쪽 1px 선만 그어 가볍게 본문과 분리합니다.",
  useCases: [
    "사이트 모든 페이지 최상단 (메인·블로그·Heritage·Talk 등 공통)",
    "메뉴를 4~6개로 압축해 한 줄에 보여줄 때",
    "가장 중요한 액션 하나(의뢰·구독·시작하기)를 우측에 강조할 때",
    "모바일에서 햄버거 메뉴로 자동 접혀야 할 때",
  ],
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
  intro:
    "모든 페이지의 가장 아래에 들어가는 영역입니다. 사이트 이름과 한 줄 설명, 그리고 분류된 링크들(Pillars / Talk / Open / Legal 등)을 컬럼으로 정돈해 보여줍니다. 위쪽 1px 선으로 본문과 구분하고, 아래에는 충분한 여백으로 페이지를 자연스럽게 마무리합니다.",
  useCases: [
    "모든 페이지 최하단 (공통 마무리)",
    "회사·서비스 한 줄 소개 + 설립 연도 노출",
    "주요 링크들을 카테고리별 컬럼으로 정리할 때 (메뉴/연락/오픈소스/약관)",
    "약관·개인정보·쿠키 정책 같은 법적 링크 묶음",
    "저작권 표기 라인",
  ],
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
            description="안티 카드 톤으로 만든 사이트와 라이브러리."
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
  description="안티 카드 톤 사이트."
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
            description="안티 카드 톤 사이트."
            copyright="© 2026 Freeive"
          />
        </div>
      ),
      prompt: `1페이지 랜딩이나 단순한 사이트의 미니멀 푸터.
columns 생략하고 brand + description + copyright만. 동일한 헤어라인 + 공간 톤은 유지.`,
      react: `<Footer brand="Freeive" description="안티 카드 톤 사이트." copyright="© 2026 Freeive" />`,
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
  intro:
    "본문 흐름 안에서 \"이건 누군가의 말이거나 다른 글에서 가져온 문장입니다\"라고 알려 주는 인용 영역입니다. 큰 박스로 가두지 않고, 왼쪽에 1픽셀 짜리 짧은 선만 그어 본문보다 살짝 흐린 글자색으로 구분합니다.",
  useCases: [
    "블로그 글에서 책·외부 글의 한 문장을 인용할 때",
    "사용자 후기·인터뷰에서 한 줄을 강조할 때",
    "안티 카드 매니페스토 같은 신념을 짧게 강조",
    "FAQ나 사례에서 \"고객이 이런 말을 했다\"는 직접 인용",
  ],
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
  intro:
    "본문 흐름 안에서 한 단어나 짧은 구절만 살짝 진하게 만들어 \"여기 핵심\"이라고 알려 주는 인라인 강조입니다. 형광펜처럼 큰 면적을 칠하지 않고, 굵기나 색만 살짝 바꿔 글의 흐름을 깨지 않는 방식입니다.",
  useCases: [
    "블로그·아티클 본문에서 한 줄을 잠깐 강조",
    "약관·정책 페이지에서 핵심 문구를 단정하게 강조",
    "Lab/Heritage 설명에서 핵심 키워드(브랜드·기간 등) 강조",
    "긴 문단 안에서 시각적 호흡을 만들 때",
  ],
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
          랩의 가장 강력한 자산은 살아있는 사이트다.
        </ACHighlight>
      ),
      prompt: `섹션 안에서 가장 강한 한 줄 메시지. tone="accent" + size="large" 조합.

용도: 매니페스토 인용, 핵심 원칙, 섹션 결론.
페이지당 1~2번만.`,
      react: `<Highlight tone="accent" size="large">
  랩의 가장 강력한 자산은 살아있는 사이트다.
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
  intro:
    "본문 흐름 안에 들어가는 단일 이미지입니다. 모서리만 살짝 둥글고, 아래쪽에 12.5px 짜리 작은 설명(caption)을 붙일 수 있습니다. 이미지 옆에 큰 박스나 테두리를 두지 않고, 본문과 자연스럽게 어우러지게 합니다.",
  useCases: [
    "블로그 글 본문 안의 스크린샷·삽화",
    "Lab 페이지에서 데모·실험 이미지 한 장",
    "Heritage 사례의 대표 이미지 + 짧은 설명",
    "About·Story 페이지의 분위기 이미지",
  ],
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
  intro:
    "본문 안에 영상 한 편을 자연스럽게 끼워 넣는 컴포넌트입니다. 화면 비율(16:9, 4:3 등)을 강제해 깨지지 않게 하고, 표준 컨트롤(재생·일시정지·음소거)이 자동으로 붙습니다. 영상 아래에는 짧은 caption을 달아 맥락을 보충합니다.",
  useCases: [
    "Lab 데모 영상 (손가락 그리기, 카메라 인터랙션 등)",
    "블로그 튜토리얼 영상 (예: \"이렇게 동작해요\")",
    "사례·후기에 들어가는 짧은 비디오",
    "사용 가이드·온보딩의 핵심 동작 시연",
  ],
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
  intro:
    "용어와 그 설명을 짝지어 보여 주는 리스트입니다. 왼쪽에 짧은 용어, 오른쪽에 풀이 — 이런 식으로 행마다 1px 선으로 구분되어 한 화면에 많은 페어를 정리할 수 있습니다. 본문보다 형식적이지만 표만큼 무겁지 않은 \"개념 정리\" 톤입니다.",
  useCases: [
    "블로그 글 끝의 \"용어 정리\" 영역",
    "Pricing·FAQ에서 핵심 정의 빠르게 설명",
    "About·서비스 페이지의 메타 정보 (창립 / 위치 / 라이선스 등)",
    "Talk 페이지의 응답 시간·연락 채널 같은 한 줄 정보 묶음",
  ],
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
  intro:
    "큰 숫자 몇 개를 한 줄로 늘어놓아 \"우리는 이만큼 했어요\"를 한눈에 보여 주는 컴포넌트입니다. 카드 박스로 가두지 않고 숫자 자체의 크기와 작은 라벨만으로 자랑하는 톤이 부담스럽지 않게 정돈됩니다.",
  useCases: [
    "About·Heritage의 핵심 카운터 (예: 10년차 / 30곳+ / 150건+)",
    "랜딩 페이지의 사용자·매출·다운로드 수 강조",
    "회사 소개 페이지의 직원 수·국가 수·연혁 등",
    "투자·IR 관련 페이지의 핵심 지표 요약",
  ],
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
  intro:
    "왼쪽에 시점(연도·날짜), 오른쪽에 그 시점의 사건을 순서대로 쌓는 시간 흐름 리스트입니다. ListRow와 비슷하지만 \"언제\" 영역이 항상 왼쪽에 고정되어, 사용자가 시간 흐름을 한 눈에 따라갈 수 있게 합니다.",
  useCases: [
    "Heritage·About의 회사 연혁",
    "Lab 실험의 진행 일지 / 마일스톤",
    "릴리즈 노트·CHANGELOG의 시간 순 정리",
    "프로젝트 단계별 진척도 (시작 → 발표 → 정식 출시 등)",
  ],
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
  ko: "필 · 태그 · 뱃지",
  en: "Pill / Tag / Badge",
  desc: "작은 라벨·태그·필터 칩·상태 뱃지 통일 어휘. shape='rounded' (rounded-md, 태그 톤) / shape='pill' (rounded-full, badge 톤).",
  intro:
    "작은 라벨·태그·상태 뱃지를 모두 같은 모양으로 통일해 주는 컴포넌트입니다. 둥근 사각(태그 느낌) / 완전 둥근(뱃지 느낌) 두 가지 형태로 글자나 숫자를 살짝 감싸서 \"이건 분류·상태·카운트 정보\"라고 한눈에 알려 줍니다. 색은 살짝만 칠해 본문 흐름을 깨지 않습니다.",
  useCases: [
    "블로그 글의 카테고리·태그 표시 (학습 일지, AI 워크플로우 등)",
    "Heritage·Talk 페이지의 섹터·필터 칩",
    "NEW · BETA · Live 같은 상태 뱃지",
    "받은 메시지 수, 알림 수 같은 카운트 뱃지",
    "버전(v0.10.0) 같은 메타 정보를 본문 옆에 살짝 붙일 때",
  ],
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
    {
      index: "04",
      badge: "shape · pill (badge)",
      title: "둥근 형태 — Badge 톤",
      description: "shape='pill' = rounded-full. 상태 뱃지(NEW / BETA / Live), 카운트(3, 99+), 작은 status indicator.",
      preview: (
        <div className="flex flex-wrap items-center gap-2">
          <Pill shape="pill" tone="accent">NEW</Pill>
          <Pill shape="pill" tone="muted">BETA</Pill>
          <Pill shape="pill" tone="default">v0.10.0</Pill>
          <Pill shape="pill" tone="accent" active>Live</Pill>
          <Pill shape="pill" tone="muted" className="px-2 py-0.5 text-[11px]">3</Pill>
          <Pill shape="pill" tone="accent" className="px-2 py-0.5 text-[11px]">99+</Pill>
        </div>
      ),
      prompt: `shape="pill" — rounded-full로 양 끝이 완전 둥근 badge 톤.
사용처:
- 상태 라벨 (NEW / BETA / DEPRECATED / Live)
- 카운트 뱃지 (알림 수, 메시지 수 — 작은 숫자)
- version 뱃지 (v0.10.0)
- 인디케이터

차이:
- shape="rounded" (기본): rounded-md, 태그·필터 (블로그 카테고리)
- shape="pill"          : rounded-full, badge·status (강조 라벨)

작은 카운트는 className으로 px-2 py-0.5 text-[11px] 더 줄이기 권장.`,
      react: `<Pill shape="pill" tone="accent">NEW</Pill>
<Pill shape="pill" tone="muted">BETA</Pill>
<Pill shape="pill" tone="default">v0.10.0</Pill>
<Pill shape="pill" tone="accent" active>Live</Pill>

{/* count badge — 더 작게 */}
<Pill shape="pill" tone="accent" className="px-2 py-0.5 text-[11px]">
  99+
</Pill>`,
    },
    {
      index: "05",
      badge: "icon",
      title: "아이콘 포함 — 라벨 강조",
      description: "좌측 lucide 아이콘. 카테고리·상태 시각화. children으로 넣으면 gap-1.5가 자동 정렬.",
      preview: (
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            AI Skill
          </Pill>
          <Pill>
            <Check className="h-3 w-3" strokeWidth={1.5} />
            검수 완료
          </Pill>
          <Pill tone="muted">
            <Info className="h-3 w-3" strokeWidth={1.5} />
            안내
          </Pill>
          <Pill shape="pill" tone="accent" active>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            Live
          </Pill>
          <Pill shape="pill">
            <AlertTriangle className="h-3 w-3" strokeWidth={1.5} />
            BETA
          </Pill>
          <Pill shape="pill" tone="accent">
            <Mail className="h-3 w-3" strokeWidth={1.5} />
            12
          </Pill>
          <Pill as="a" href="#" tone="accent">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            새 글 보기
          </Pill>
        </div>
      ),
      prompt: `Pill 안에 lucide 아이콘 + 텍스트.
스타일:
- 아이콘 크기: h-3 w-3 (Pill 12.5px 텍스트와 시각 균형)
- strokeWidth={1.5} — anti-card 가는 stroke 톤
- gap-1.5는 Pill 컴포넌트가 자동 (children에 그대로 넣으면 됨)

사용처:
- 카테고리 라벨 (Sparkles + AI Skill / Check + 완료 / Info + 안내)
- Live indicator (작은 emerald dot + animate-pulse)
- 카운트 + 의미 아이콘 (Mail + 12 = 새 메일 12개)
- 강조 CTA pill (as="a" + 화살표 또는 leading 아이콘)

dot indicator는 <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />로 단순.
색상 자동 상속(bg-current).`,
      react: `<Pill tone="accent">
  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
  AI Skill
</Pill>

<Pill>
  <Check className="h-3 w-3" strokeWidth={1.5} />
  검수 완료
</Pill>

{/* Live with pulse dot */}
<Pill shape="pill" tone="accent" active>
  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
  Live
</Pill>

{/* count + meaning icon */}
<Pill shape="pill" tone="accent">
  <Mail className="h-3 w-3" strokeWidth={1.5} />
  12
</Pill>`,
    },
  ],
  props: [
    { name: "as", type: '"span" | "a"', default: '"span"', desc: "시맨틱 태그" },
    { name: "href", type: "string", desc: "as='a'일 때 링크" },
    { name: "external", type: "boolean", desc: "외부 링크" },
    { name: "tone", type: '"default" | "accent" | "muted"', default: '"default"', desc: "색 톤" },
    { name: "active", type: "boolean", default: "false", desc: "활성 상태 (필터 선택)" },
    { name: "shape", type: '"rounded" | "pill"', default: '"rounded"', desc: "rounded-md (태그) / rounded-full (badge)" },
  ],
};

const HERO_PATTERN_DEF: ComponentDef = {
  id: "hero-pattern",
  ko: "히어로 (메인 첫 화면)",
  en: "HeroPattern",
  desc: "Eyebrow + HeroHeading + Lead + LinkRow×N 조합 패턴. 페이지 첫 화면을 한 번에.",
  intro:
    "페이지에 들어왔을 때 가장 먼저 보이는 \"첫 화면 영역\"을 한 번에 만들어 주는 큰 묶음입니다. 작은 라벨 → 큰 제목 → 보조 한 줄 설명 → 1~2개의 행동 버튼이 일관된 간격으로 자동 배치되어, 메인·서브 페이지 어디든 균일한 첫인상을 만듭니다.",
  useCases: [
    "사이트 메인의 첫 화면 (가장 큰 hero 사이즈)",
    "Lab·Heritage·Blog 같은 영역 페이지의 진입 화면",
    "캠페인/이벤트 랜딩 페이지의 메인 메시지 영역",
    "About·Story 페이지의 인트로",
  ],
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
              서비스 운영자의<br />
              <span className="text-zinc-400 dark:text-zinc-400">무기를 만드는 랩.</span>
            </>
          }
          lead="외주 에이전시가 아닙니다. 자체 UI 라이브러리와 카메라 기반 공간 UI 연구."
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
  title="서비스 운영자의 무기를 만드는 랩."
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
          title="큰 프로젝트들의 깊이를 랩으로 옮긴다."
          lead="텔레콤·금융·교육·기업시스템·미디어의 큰 싸움을 거친 깊이."
        />
      ),
      prompt: `일반 페이지(Lab/Heritage/Blog) 첫 화면. size 생략(default 'page'). HeroHeading 30~48px.
ctas 생략하면 hero 영역에 CTA 없이 제목 + 본문만.`,
      react: `<HeroPattern
  eyebrow="Heritage · 2016 — Now"
  title="큰 프로젝트들의 깊이를 랩으로 옮긴다."
  lead="..."
/>`,
    },
    {
      index: "03",
      badge: "width · wide",
      title: "긴 문장 — width='wide' (32ch)",
      description:
        "일본어·영어 긴 제목이 기본 max-width(20ch)에 갇혀 부자연스럽게 줄바꿈하는 문제를 width='wide'로 해소.",
      preview: (
        <HeroPattern
          size="hero"
          eyebrow="Freeive — Solo lab, est. 2016"
          width="wide"
          title={
            <>
              AIを使う非エンジニアの方へ、<br />
              <span className="text-zinc-400 dark:text-zinc-400">
                ランディングのためのUIライブラリ。
              </span>
            </>
          }
          lead="AIが作った感の払拭。非エンジニアにUI/UXを自然に習得させるプロジェクト。"
          ctas={[
            { label: "Anti Card Lab", href: "#", tone: "accent" },
            { label: "Playground", href: "#" },
          ]}
        />
      ),
      prompt: `긴 일본어/영어 제목을 hero에서 자연스럽게 노출. width="wide"로 max-width를 20ch → 32ch로 완화. 한국어 기본 톤(짧고 강한 제목)을 깨지 않으면서 다국어 사이트에 대응.

- width="default" (기본): 20ch — 짧고 강한 한국어 카피
- width="wide": 32ch — 일본어/영어 긴 문장
- width="full": 제한 없음 — 광고성 카피`,
      react: `<HeroPattern
  size="hero"
  width="wide"
  eyebrow="..."
  title="긴 일본어/영어 제목"
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
    {
      name: "width",
      type: '"default" | "wide" | "full"',
      default: '"default"',
      desc: "HeroHeading 너비. default 20ch / wide 32ch (긴 일·영문) / full 제한 없음",
    },
  ],
};

const SECTORS_PATTERN_DEF: ComponentDef = {
  id: "sectors-pattern",
  ko: "섹터 리스트 페이지",
  en: "SectorsPattern",
  desc: "Heritage 표준 — 좌측 섹터(smallcaps) + 우측 ListRow 행. 카드 그리드 거부.",
  intro:
    "분류(섹터·카테고리)와 그 안의 항목들을 좌·우 2열로 정리해 보여 주는 페이지 단위 패턴입니다. 왼쪽엔 작은 카테고리 라벨, 오른쪽엔 그 안의 행 목록이 길게 이어져, 한 페이지에 여러 분류와 다수 항목을 동시에 볼 수 있게 합니다.",
  useCases: [
    "Heritage 페이지의 섹터(통신·금융·교육 등)별 프로젝트 정리",
    "회사 사업부·서비스별 포트폴리오 정렬",
    "도서관·아카이브의 카테고리별 자료 목록",
    "Pricing의 플랜 카테고리별 기능 비교",
  ],
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
  intro:
    "의뢰·문의를 받기 전에 \"어떤 일이 잘 맞고, 어떤 일은 다른 분께 더 잘 맞는지\"를 명시하는 페이지 단위 패턴입니다. 첫 화면 + 받는 의뢰 / 다른 분께 더 잘 맞는 의뢰(선택) + 연락 채널이 한 번에 만들어집니다. 일반 폼 페이지를 거부하고, 서로 시간을 아끼는 안내 페이지를 만드는 데 적합합니다.",
  useCases: [
    "에이전시·랩·프리랜서의 의뢰 안내 페이지",
    "컨설팅·코칭의 신청 가이드 (대상·기간 명시)",
    "오픈소스 메인테이너의 협업 가이드 (받는 PR / 안 받는 PR)",
    "스피커·강연 요청 페이지 (수락 기준 안내)",
  ],
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
          lead="외주 에이전시가 아닙니다. 단 깊이가 필요한 일에만."
          acceptList={[
            "B2B 의뢰 (계약·법인 사업)",
            "공동 프로젝트 / 협업",
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

안티 카드 정체성 — "이기는 싸움만"을 의사결정자에게 직접 알리는 페이지.`,
      react: `<TalkPattern
  title="이기는 싸움만 받습니다."
  acceptList={["B2B 의뢰", "공동 프로젝트"]}
  declineList={["가격 경쟁", "양산형 사이트"]}
  channels={[{ label: "Email", value: "ive@...", href: "mailto:..." }]}
/>`,
    },
    {
      index: "02",
      badge: "i18n",
      title: "영문 — 라벨 prop 주입",
      description:
        "acceptLabel / declineLabel / channelsLabel로 한국어 hardcoded 라벨 교체. 영문·일문 사이트 대응.",
      preview: (
        <TalkPattern
          eyebrow="Talk · before we work together"
          title="Open for inquiries."
          lead="Not an outsourcing agency. Only deep, focused work."
          acceptLabel="Accepting"
          declineLabel="Not accepting"
          channelsLabel="Channels"
          acceptList={[
            "B2B engagements (contracts)",
            "Joint projects / collaborations",
            "AI UI / anti-card consulting",
          ]}
          declineList={["Lowest-bid competitions", "Template-grade sites"]}
          channels={[
            {
              label: "Email",
              value: "ive@freeive.com",
              href: "mailto:ive@freeive.com",
            },
          ]}
        />
      ),
      prompt: `TalkPattern을 영문/일문 사이트에 쓸 때, 내부 hardcoded "받음"/"안 받음"/"Channels" 라벨을 acceptLabel/declineLabel/channelsLabel prop으로 외부 주입합니다.

- ko: "받음" / "안 받음" / "Channels" (default)
- en: "Accepting" / "Not accepting" / "Channels"
- ja: "受け付け中" / "受け付けない" / "Channels"`,
      react: `<TalkPattern
  title="Open for inquiries."
  acceptLabel="Accepting"
  declineLabel="Not accepting"
  channelsLabel="Channels"
  acceptList={["B2B engagements", "Joint projects"]}
  declineList={["Lowest-bid", "Template sites"]}
  channels={[{ label: "Email", value: "ive@...", href: "mailto:..." }]}
/>`,
    },
  ],
  props: [
    { name: "eyebrow / title / lead", type: "ReactNode", desc: "Hero 영역 (HeroPattern 내장)" },
    { name: "acceptList", type: "ReactNode[]", desc: "받는 일 (✓ emerald)" },
    { name: "declineList", type: "ReactNode[]", desc: "안 받는 일 (✕ zinc)" },
    { name: "channels", type: "[{label, value, href?, external?}]", desc: "연락 채널 DefList" },
    {
      name: "acceptLabel",
      type: "ReactNode",
      desc: "받음 섹션 라벨. default `\"받음\"`. 영문/일문 사이트는 명시 권장.",
    },
    {
      name: "declineLabel",
      type: "ReactNode",
      desc: "안 받음 섹션 라벨. default `\"안 받음\"`.",
    },
    {
      name: "channelsLabel",
      type: "ReactNode",
      desc: "채널 섹션 라벨. default `\"Channels\"` (영문 그대로 권장).",
    },
  ],
};

const EMPTY_STATE_DEF: ComponentDef = {
  id: "empty-error",
  ko: "빈 상태 / 404",
  en: "EmptyState",
  desc: "빈 상태·404·error 페이지. 큰 code(숫자) + 짧은 메시지 + LinkRow 액션.",
  intro:
    "사용자가 비어 있는 화면이나 잘못된 경로를 마주했을 때 보여 주는 \"막다른 페이지\"입니다. 큰 숫자(404 / 500) 또는 큰 메시지 + 짧은 설명 + 다음으로 갈 수 있는 작은 링크 한두 개로, 사용자를 자연스럽게 다른 곳으로 안내합니다.",
  useCases: [
    "404 페이지 (없는 주소로 들어왔을 때)",
    "500 / 에러 페이지 (서버에 문제가 생겼을 때)",
    "데이터가 아직 없을 때의 \"비어 있어요\" 안내",
    "검색 결과 0개·필터로 거른 결과가 없을 때의 안내",
  ],
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
  intro:
    "페이지를 다 본 사용자에게 \"다음 행동\"을 자연스럽게 권하는 마무리 영역입니다. 위쪽 1픽셀 선 → 짧은 한 줄 제목 → 보조 한 줄 → 1~2개 링크 — 이 흐름으로 본문이 끝났음을 알리고 동시에 \"의뢰\"·\"가입\" 같은 다음 단계로 부드럽게 연결합니다.",
  useCases: [
    "랜딩 페이지 마지막의 \"의뢰하기 / 둘러보기\" 영역",
    "블로그 글 끝의 \"다음 글 / 구독\" 안내",
    "소개 페이지 마지막의 \"문의하기 / 자료 받기\"",
    "Footer 직전의 자연스러운 행동 유도",
  ],
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
          lead="간단한 의뢰 메모로 충분합니다. 운영자가 직접 응답합니다."
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
  intro:
    "사용자에게 짧게 알리고 싶은 한 줄을 가로 띠 모양으로 보여 주는 알림 컴포넌트입니다. 큰 박스로 화면을 가리지 않고, 위·아래 1픽셀 선과 살짝 칠한 색상만으로 \"이건 일시적 안내\"라는 느낌을 줍니다. 닫기 버튼이나 액션 링크를 우측에 추가할 수 있습니다.",
  useCases: [
    "사이트 전체 공지 (예: 새 버전 출시, 점검 안내)",
    "블로그 글 위쪽의 \"이 글은 학습 일지입니다\" 같은 짧은 컨텍스트",
    "Talk 페이지의 \"현재 신규 의뢰 받는 중\" 상태 표시",
    "에러·경고·성공 같은 가벼운 피드백 (form 제출 후 등)",
  ],
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
  intro:
    "사용자가 가장 먼저 누르길 기대하는 \"진짜 버튼\"입니다. 색이 채워진 단단한 박스 형태로, 한 화면에 보통 한 개만 두어 \"가장 중요한 다음 행동\"을 명확히 알려 줍니다. 폼 제출, 결제, 다이얼로그 확정 등 결과가 분명한 자리에 씁니다.",
  useCases: [
    "회원가입·로그인·문의 폼의 제출 버튼",
    "삭제 확인·결제 진행 같은 다이얼로그의 확정 버튼",
    "히어로의 가장 중요한 단 하나의 액션 (예: \"의뢰하기\")",
    "긴 폼 마지막의 \"저장\" 같은 명확한 종료 행동",
  ],
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
    {
      index: "03",
      badge: "with icon",
      title: "leading / trailing 아이콘",
      description: "leadingIcon / trailingIcon 으로 lucide 아이콘. anti-card 표준 h-4 w-4.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Button leadingIcon={<Plus className="h-4 w-4" />}>새로 만들기</Button>
          <Button tone="accent" leadingIcon={<Check className="h-4 w-4" />}>완료</Button>
          <Button trailingIcon={<ArrowRight className="h-4 w-4" />}>다음</Button>
        </div>
      ),
      prompt: `Button + 아이콘. anti-card는 lucide-react 표준 (자세히는 #icons).
- leadingIcon: 텍스트 앞 (가장 흔한 패턴)
- trailingIcon: 텍스트 뒤 (다음 단계 등)
- 크기 표준: h-4 w-4 (16px) — Button default size에 맞춤
- aria-hidden 자동 (장식 아이콘)`,
      react: `import { Plus, ArrowRight, Check } from "lucide-react";

<Button leadingIcon={<Plus className="h-4 w-4" />}>새로 만들기</Button>
<Button tone="accent" leadingIcon={<Check className="h-4 w-4" />}>완료</Button>
<Button trailingIcon={<ArrowRight className="h-4 w-4" />}>다음</Button>`,
    },
    {
      index: "04",
      badge: "iconOnly",
      title: "아이콘만 (정사각형 패딩)",
      description: "iconOnly=true. 텍스트 없이 아이콘만 — aria-label 필수.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Button iconOnly aria-label="검색" size="small"><Search className="h-3.5 w-3.5" /></Button>
          <Button iconOnly aria-label="새로 만들기"><Plus className="h-4 w-4" /></Button>
          <Button iconOnly aria-label="확인" tone="accent" size="large"><Check className="h-5 w-5" /></Button>
        </div>
      ),
      prompt: `iconOnly=true: 정사각형 패딩 (size에 따라 p-1.5 / p-2 / p-2.5).
필수: aria-label (스크린 리더 텍스트 대체).
사용처: 툴바, 액션 그리드, 작은 액션 (검색·즐겨찾기·삭제 등).`,
      react: `<Button iconOnly aria-label="검색" size="small">
  <Search className="h-3.5 w-3.5" />
</Button>
<Button iconOnly aria-label="새로 만들기">
  <Plus className="h-4 w-4" />
</Button>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "plain"', default: '"primary"', desc: "박스 강도 — primary > secondary > ghost > plain" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈 (iconOnly는 정사각형 패딩)" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "neutral / emerald" },
    { name: "leadingIcon / trailingIcon", type: "ReactNode", desc: "아이콘 (선택). h-4 w-4 권장." },
    { name: "iconOnly", type: "boolean", default: "false", desc: "아이콘만 — 정사각형 패딩 + aria-label 필수" },
    { name: "...rest", type: "ButtonHTMLAttributes<HTMLButtonElement>", desc: "type / onClick / disabled 등 표준" },
  ],
};

const BUTTON_SECONDARY_DEF: ComponentDef = {
  id: "button-secondary",
  ko: "보조 버튼",
  en: "Button (Secondary)",
  desc: "헤어라인 only 버튼. 채움 X, border만. variant='secondary'.",
  intro:
    "기본 버튼 옆에 두는 \"두 번째 선택지\" 버튼입니다. 색을 채우지 않고 1픽셀 테두리만 있어, 시선을 빼앗지 않으면서도 클릭 가능한 영역임을 알려 줍니다. 다이얼로그의 \"취소\"처럼 결과가 덜 중요한 행동에 적합합니다.",
  useCases: [
    "다이얼로그·모달의 \"취소\" 버튼 (확정 버튼 옆)",
    "폼 페이지의 \"임시 저장\" 또는 \"이전\" 버튼",
    "Pricing의 \"무료 플랜\" 같은 부수 액션",
    "히어로의 \"자세히 보기\" 같은 보조 행동",
  ],
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
    {
      index: "03",
      badge: "with icon",
      title: "leading / trailing 아이콘",
      description: "secondary + 아이콘 — '취소(X)' / '다음(→)' 같은 표준 액션.",
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" leadingIcon={<X className="h-4 w-4" />}>취소</Button>
          <Button variant="secondary" leadingIcon={<Plus className="h-4 w-4" />}>새로 만들기</Button>
          <Button variant="secondary" trailingIcon={<ArrowRight className="h-4 w-4" />}>다음</Button>
        </div>
      ),
      prompt: `secondary + 아이콘. 채움 X (border만)이라 아이콘이 더 또렷하게 보임.
사용처: 폼 풋터의 cancel(X), 리스트의 새 항목 만들기(+), 단계 이동(→).
크기 표준: h-4 w-4 (default size).`,
      react: `import { X, Plus, ArrowRight } from "lucide-react";

<Button variant="secondary" leadingIcon={<X className="h-4 w-4" />}>취소</Button>
<Button variant="secondary" leadingIcon={<Plus className="h-4 w-4" />}>새로 만들기</Button>
<Button variant="secondary" trailingIcon={<ArrowRight className="h-4 w-4" />}>다음</Button>`,
    },
    {
      index: "04",
      badge: "iconOnly",
      title: "아이콘만 (헤어라인 박스)",
      description: "툴바의 보조 액션 — 헤어라인 정사각형. ghost보다 명시적, primary보다 약함.",
      preview: (
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" iconOnly aria-label="검색"><Search className="h-4 w-4" /></Button>
          <Button variant="secondary" iconOnly aria-label="새로 만들기"><Plus className="h-4 w-4" /></Button>
          <Button variant="secondary" iconOnly aria-label="설정" size="small"><ChevronDown className="h-3.5 w-3.5" /></Button>
        </div>
      ),
      prompt: `secondary + iconOnly: 헤어라인 박스 정사각형 아이콘 액션.
ghost iconOnly와 차이: secondary는 항상 border 보임 (눈에 더 띔), ghost는 hover 시에만 배경.
사용처: 툴바의 명시적 액션, 디자인 도구의 작은 컨트롤.`,
      react: `<Button variant="secondary" iconOnly aria-label="검색">
  <Search className="h-4 w-4" />
</Button>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "plain"', default: '"primary"', desc: "박스 강도 — primary > secondary > ghost > plain" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "neutral / emerald" },
    { name: "leadingIcon / trailingIcon", type: "ReactNode", desc: "아이콘 (선택)" },
    { name: "iconOnly", type: "boolean", default: "false", desc: "아이콘만 — 정사각형 패딩 + aria-label" },
    { name: "...rest", type: "ButtonHTMLAttributes<HTMLButtonElement>", desc: "표준" },
  ],
};

const BUTTON_GHOST_DEF: ComponentDef = {
  id: "button-ghost",
  ko: "고스트 버튼",
  en: "Button (Ghost)",
  desc: "박스 X, hover 시에만 배경. 인라인 액션·툴바·드롭다운 trigger 등 가벼운 액션. variant='ghost'.",
  intro:
    "평소엔 박스가 보이지 않다가, 마우스를 올렸을 때만 살짝 배경이 깔리는 가벼운 버튼입니다. 본문 옆이나 도구막대처럼 \"여기에 버튼이 잔뜩 있어요\" 느낌을 주고 싶지 않을 때 적합합니다.",
  useCases: [
    "도구막대(툴바)의 자잘한 액션 버튼들",
    "드롭다운·팝오버의 트리거 버튼",
    "테이블 행의 \"수정 / 삭제\" 같은 인라인 액션",
    "헤더의 다크/라이트 토글 같은 가벼운 컨트롤",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 배경 없음",
      description: "hover 시에만 zinc-100 배경. 박스 거부 정신 유지.",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost">메뉴</Button>
          <Button variant="ghost" size="small">필터</Button>
          <Button variant="ghost" size="large">자세히</Button>
        </div>
      ),
      prompt: `ghost 액션 — 배경·border 없음, 호버 시에만 살짝 배경.
스타일:
- variant="ghost": bg-transparent + hover:bg-zinc-100 dark:hover:bg-white/[0.06]
- text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50
사용처: 툴바, 드롭다운 trigger, 인라인 보조 액션.
primary/secondary와 한 페이지에 섞어 위계 만들기 (primary=강 / ghost=약).`,
      react: `<Button variant="ghost">메뉴</Button>
<Button variant="ghost" size="small">필터</Button>`,
    },
    {
      index: "02",
      badge: "tone · accent",
      title: "accent — emerald 텍스트",
      description: "강조하되 박스 안 보이는 액션. 채움 X, 텍스트만 emerald.",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" tone="accent">자세히 보기</Button>
          <Button variant="ghost" tone="accent" leadingIcon={<Sparkles className="h-4 w-4" />}>새 기능</Button>
        </div>
      ),
      prompt: `ghost + tone="accent" — 텍스트는 emerald, 호버 시 배경 살짝.
사용처: "자세히 보기" / 새 기능 알림 / 강조하되 너무 튀지 않게.`,
      react: `<Button variant="ghost" tone="accent">자세히 보기</Button>`,
    },
    {
      index: "03",
      badge: "iconOnly + ghost",
      title: "툴바 아이콘 액션",
      description: "ghost + iconOnly = 가장 미니멀한 클릭 가능 영역. 툴바·헤더 우측 등.",
      preview: (
        <div className="flex flex-wrap items-center gap-1">
          <Button variant="ghost" iconOnly aria-label="검색"><Search className="h-4 w-4" /></Button>
          <Button variant="ghost" iconOnly aria-label="알림"><Info className="h-4 w-4" /></Button>
          <Button variant="ghost" iconOnly aria-label="설정"><ChevronDown className="h-4 w-4" /></Button>
        </div>
      ),
      prompt: `툴바·헤더의 작은 액션. ghost + iconOnly로 시각 무게 최소화.
gap-1로 가깝게 배치 — 그룹화된 컨트롤 인상.`,
      react: `<Button variant="ghost" iconOnly aria-label="검색">
  <Search className="h-4 w-4" />
</Button>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "plain"', default: '"primary"', desc: "이 페이지는 ghost 변형 시연" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "텍스트 톤 (ghost는 채움 없음)" },
    { name: "leadingIcon / trailingIcon", type: "ReactNode", desc: "아이콘 (선택)" },
    { name: "iconOnly", type: "boolean", default: "false", desc: "아이콘만 (툴바 패턴)" },
  ],
};

const BUTTON_PLAIN_DEF: ComponentDef = {
  id: "button-plain",
  ko: "플레인 버튼",
  en: "Button (Plain)",
  desc: "텍스트만 — 박스 거부 가장 강함. 인라인 토글·edit·미니 액션. hover 시 underline. variant='plain'.",
  intro:
    "박스도 배경도 없이 글자만으로 동작하는 가장 가벼운 버튼입니다. 마우스를 올리면 밑줄이 살짝 그어져 클릭 가능한 영역임을 알려 줍니다. 본문 흐름을 거의 깨지 않으면서 짧은 행동을 거는 자리에 씁니다.",
  useCases: [
    "본문 옆의 \"편집·되돌리기\" 같은 미니 액션",
    "긴 글에서 \"전체 보기 / 접기\" 토글",
    "댓글의 \"답글·신고\" 같은 인라인 행동",
    "Footer의 가벼운 텍스트 링크",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "텍스트 + hover underline",
      description: "padding 최소, hover 시 텍스트 색·underline. 인라인 본문에 자연스럽게 섞임.",
      preview: (
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="plain">편집</Button>
          <Button variant="plain" size="small">취소</Button>
          <Button variant="plain" size="large">자세히</Button>
        </div>
      ),
      prompt: `plain 액션 — 텍스트만, padding 최소.
스타일:
- variant="plain": bg-transparent, padding px-1 py-0.5 (인라인 텍스트 느낌)
- hover:underline + text 색 강해짐
사용처: 인라인 토글 (편집/저장), 작은 보조 액션, 본문 안에 박는 클릭 가능 텍스트.
LinkRow와 차이: plain Button은 form 안에서 사용 (button 태그), LinkRow는 페이지 내비게이션.`,
      react: `<Button variant="plain">편집</Button>
<Button variant="plain" size="small">취소</Button>`,
    },
    {
      index: "02",
      badge: "tone · accent",
      title: "accent 강조",
      description: "텍스트 emerald + hover underline. 인라인 강조 액션.",
      preview: (
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="plain" tone="accent">자세히 보기</Button>
          <Button variant="plain" tone="accent" trailingIcon={<ArrowRight className="h-3.5 w-3.5" />}>다음 단계로</Button>
        </div>
      ),
      prompt: `plain + tone="accent" — 텍스트만 emerald.
LinkRow의 inline 버전. 본문 안에 박혀 있어야 자연스러운 액션.`,
      react: `<Button variant="plain" tone="accent">자세히 보기</Button>
<Button
  variant="plain"
  tone="accent"
  trailingIcon={<ArrowRight className="h-3.5 w-3.5" />}
>
  다음 단계로
</Button>`,
    },
    {
      index: "03",
      badge: "inline 패턴",
      title: "본문 안 인라인 사용",
      description: "본문 텍스트 흐름에 plain Button 박기 — 클릭 가능 단어 느낌.",
      preview: (
        <p className="max-w-[40ch] text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300">
          이 글은 자동 저장됩니다. 수동 저장은{" "}
          <Button variant="plain" tone="accent" size="small">여기를 클릭</Button>{" "}
          — 또는{" "}
          <Button variant="plain" size="small">취소</Button>{" "}
          으로 마지막 저장 상태로 되돌리기.
        </p>
      ),
      prompt: `본문 텍스트 안에 plain Button을 박는 패턴.
button이지만 텍스트 흐름과 자연스럽게 섞임 — 작은 인라인 액션.
size="small" + tone="accent"가 inline에 가장 잘 맞음.`,
      react: `<p>
  이 글은 자동 저장됩니다. 수동 저장은{" "}
  <Button variant="plain" tone="accent" size="small">여기를 클릭</Button>
  {" "}또는{" "}
  <Button variant="plain" size="small">취소</Button>.
</p>`,
    },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "plain"', default: '"primary"', desc: "이 페이지는 plain 변형 시연" },
    { name: "size", type: '"small" | "default" | "large"', default: '"default"', desc: "사이즈" },
    { name: "tone", type: '"default" | "accent"', default: '"default"', desc: "neutral / emerald" },
    { name: "leadingIcon / trailingIcon", type: "ReactNode", desc: "아이콘 (선택)" },
  ],
};

const FEATURE_ROW_DEF: ComponentDef = {
  id: "feature-row",
  ko: "특징 나열 행",
  en: "FeatureRow",
  desc: "특징·장점 나열. 카드 그리드 거부, 좌측 라벨/번호 + 우측 본문.",
  intro:
    "서비스의 특징·장점을 카드 그리드 대신 행으로 풀어 보여 주는 컴포넌트입니다. 왼쪽엔 작은 라벨이나 번호, 오른쪽엔 제목 + 짧은 설명이 행마다 1픽셀 선으로 구분되어, 한 화면에 더 많은 항목을 자연스럽게 펼칩니다.",
  useCases: [
    "랜딩 페이지의 \"3가지 핵심 특징\" 영역",
    "About·Story 페이지의 가치·원칙 정리",
    "제품 소개의 기능 하이라이트 (4~6개)",
    "튜토리얼의 \"이 글에서 배울 것\" 미리보기",
  ],
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
              title: "랩의 속도",
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
              description: "AI 동질화 거부. 자체 UI 라이브러리로 시각 정체성.",
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
  { label: "Speed", title: "랩의 속도", description: "..." },
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
            { title: "정체성 정리", description: "Freeive / 안티 카드 / Lab / Heritage 4축." },
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
  intro:
    "함께 일했던 클라이언트·파트너의 로고를 한 줄(또는 두 줄)로 깔끔하게 늘어놓는 컴포넌트입니다. 평소엔 흑백으로 차분하게 보이다가 마우스를 올리면 원래 색이 살짝 들어와 \"이 로고들이 실제 우리 클라이언트\"라는 신뢰를 자연스럽게 만듭니다. 로고 이미지가 없으면 회사명 텍스트로도 대체됩니다.",
  useCases: [
    "Heritage·About의 \"함께한 클라이언트\" 영역",
    "랜딩 페이지의 \"이 회사들이 우리를 신뢰합니다\" 신뢰 시그널",
    "제품 페이지의 \"사용 중인 회사들\" 띠",
    "포트폴리오·에이전시의 클라이언트 로고 갤러리",
  ],
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
  intro:
    "사용자나 클라이언트의 후기를 인용 + 작성자 정보로 묶어 보여 주는 컴포넌트입니다. 단순 인용보다 풍부해서 \"누가 / 어느 회사·역할에서 한 말인지\"가 함께 들어가, 후기의 신뢰감이 자연스럽게 올라갑니다.",
  useCases: [
    "랜딩 페이지의 핵심 사용자 후기 1~3개",
    "Heritage·About의 클라이언트 인용",
    "사례 연구(Case Study) 안의 의사결정자 한 마디",
    "Pricing 페이지의 \"이 플랜을 쓰는 사람들\" 코멘트",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — lead 톤 + 작성자",
      description: "본문 인용 + 작성자 정보 (avatar / name / title·company).",
      preview: (
        <Testimonial author={{ name: "김OO", title: "PM", company: "EBS" }}>
          운영자가 대형 에이전시 PM보다 빠르게 결정해서 놀랐습니다.
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
  운영자가 대형 에이전시 PM보다 빠르게 결정해서 놀랐습니다.
</Testimonial>`,
    },
    {
      index: "02",
      badge: "large",
      title: "large — 강조 후기",
      description: "랜딩 핵심 후기 (18~22px). default(15px)에서 한 단계만. 글당 1~2회.",
      preview: (
        <Testimonial
          size="large"
          author={{ name: "박OO", title: "디자인 리드", company: "라이나생명" }}
        >
          “안티 카드 톤이 우리 브랜드의 톤을 대체했습니다.
          이젠 다른 사이트로 못 돌아가요.”
        </Testimonial>
      ),
      prompt: `랜딩 페이지 핵심 후기. size="large".

크기는 18~22px — default(15px)에서 한 단계만 키운 차분 톤.
heading(24+)으로 가지 않음 — 본문 인용은 본문 영역 안에 머물러야 함.
굵기는 font-medium. heavy bold 거부.`,
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
  intro:
    "한 영역 전체를 거대한 숫자 하나로 채우는 강조 컴포넌트입니다. 여러 카운터를 행으로 늘어놓는 StatList와 달리, \"이 한 숫자가 핵심\"이라고 단언할 때 씁니다.",
  useCases: [
    "Heritage 첫 화면의 핵심 한 숫자 (예: 150건+)",
    "회사 IR 페이지의 가장 중요한 지표 강조",
    "사례 연구의 \"매출 200% 증가\" 결과 강조",
    "캠페인 결과 페이지의 임팩트 한 줄",
  ],
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
          description="2016 Preive 첫 외주 → 2026 안티 카드 정체성 정리. 10년의 큰 싸움."
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
  intro:
    "한 프로젝트의 사례를 \"문제 → 해결 → 결과\" 3단 구조로 정리해 주는 컴포넌트입니다. 어떤 문제가 있었고 어떻게 풀었으며 그래서 어떤 결과가 났는지를 같은 시각 위계로 보여 줘서, 읽는 사람이 사례의 흐름을 자연스럽게 따라가게 합니다.",
  useCases: [
    "Heritage·Portfolio의 단일 프로젝트 상세 페이지",
    "회사 \"성공 사례\" 영역 (B2B 마케팅 자산)",
    "에이전시·스튜디오의 작업물 소개",
    "오픈소스 프로젝트의 \"Why & What\" 정리",
  ],
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
  intro:
    "진행 중인 프로젝트의 진척도를 물결이 차오르는 비주얼로 보여 주는 카드입니다. 일반 진행 막대보다 살아있는 느낌이라 \"이게 지금 만들어지고 있다\"를 강하게 전합니다. 가로형(위→아래로 채움) / 세로형(좌→우로 채움) 두 방향을 지원합니다.",
  useCases: [
    "Heritage·About의 \"지금 만들고 있는 것들\" 영역",
    "출시 예정 페이지의 마일스톤 진행도",
    "프로젝트 대시보드의 단계별 진척",
    "캠페인 카운트다운·진행률 시각화",
  ],
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
          summary="외주 에이전시 → 안티 카드 정체성으로 교체."
          progress={78}
          waveColor="#7cf2c4"
          year="2026"
        />
      ),
      prompt: `기존 freeive Heritage 페이지의 In progress 카드 톤. variant="card".
박스 정체성 강하지만 단일 컴포넌트로서 특수 시각이라 인정.`,
      react: `<WaveCard variant="card" title="..." progress={78} waveColor="#7cf2c4" />`,
    },
    {
      index: "03",
      badge: "orientation · vertical",
      title: "세로형 물결 — 좌→우 진행",
      description: "wave path 90° 회전. 가로 진행 게이지로 동작 — 우측 가장자리에서 출렁이며 좌측이 채워짐.",
      preview: (
        <WaveCard
          orientation="vertical"
          title="0.12.0 릴리즈 진행"
          client="anti-card"
          summary="FormField / DataTable / DatePicker / Combobox 4개 마일스톤. 시각 검증 단계."
          progress={45}
          waveColor="#34d399"
          year="2026"
        />
      ),
      prompt: `세로형 wave — orientation="vertical".
기존 가로형(위→아래 채움)을 90° 회전한 형태. 좌→우로 진행.

차이:
- horizontal (default): 물 채워지는 게이지. 위 wave 출렁 + 아래 채움 (수직 진행).
- vertical: 가로 진행 바. 우측 wave 출렁 + 좌측 채움 (수평 진행).

사용처:
- 릴리즈 / 작업 단계 등 "단계의 진행률"을 가로로 강조하고 싶을 때
- 카드가 가로로 길 때 (시각적으로 가로 wave가 더 시원함)
- 0~90% 권장 (90+는 거의 끝이라 wave 출렁임이 어색)`,
      react: `<WaveCard
  orientation="vertical"
  title="0.12.0 릴리즈 진행"
  client="anti-card"
  summary="..."
  progress={45}
  waveColor="#34d399"
  year="2026"
/>`,
    },
  ],
  props: [
    { name: "title", type: "ReactNode", desc: "제목 (필수)" },
    { name: "client / summary / year", type: "ReactNode", desc: "메타·요약" },
    { name: "progress", type: "number", desc: "0~90 권장" },
    { name: "waveColor", type: "string (hex)", default: '"#34d399"', desc: "wave 색" },
    { name: "variant", type: '"card" | "frame"', default: '"frame"', desc: "card=rounded box / frame=헤어라인" },
    { name: "label", type: "ReactNode", default: '"In progress"', desc: "좌측 상단 smallcaps" },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', desc: "wave 진행 방향 (수직 채움 / 수평 채움)" },
  ],
};

const FADE_IN_DEF: ComponentDef = {
  id: "fade-in",
  ko: "부드러운 등장",
  en: "FadeIn",
  desc: "스크롤 시 in-view 감지 → opacity + translate 등장. prefers-reduced-motion 자동 반응.",
  intro:
    "페이지를 스크롤하다가 해당 영역이 화면에 들어오는 순간, 자식 콘텐츠가 살짝 아래에서 올라오며 부드럽게 등장하는 효과를 줍니다. 화려하지 않고 짧게 한 번만 — \"여기 새로 등장했어요\" 정도의 절제된 모션입니다. 시스템 설정에서 \"애니메이션 줄이기\"를 켠 사용자는 자동으로 비활성됩니다.",
  useCases: [
    "랜딩 페이지의 섹션이 자연스럽게 등장하길 원할 때",
    "긴 사례 페이지에서 영역마다 시선이 자연스럽게 머무르도록",
    "stagger(시간차)로 리스트 항목이 줄지어 등장",
    "About·Story의 단계별 콘텐츠 부드러운 진입",
  ],
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
  intro:
    "마우스를 올렸을 때 자식 콘텐츠(텍스트·아이콘 등)에 색 변화·밑줄·살짝 이동 같은 강조 효과를 주는 wrapper입니다. \"이 영역 전체가 클릭 가능하다\"는 느낌을 자연스럽게 전합니다.",
  useCases: [
    "리스트 행에 마우스 올렸을 때 전체 행 강조",
    "카드 없는 링크 영역의 미세한 시각 피드백",
    "포트폴리오 프로젝트 행이 호버 시 살짝 우측으로 이동",
    "Footer 링크 묶음의 호버 강조",
  ],
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
  intro:
    "사용자가 페이지의 어디까지 스크롤했는지를 화면 위(또는 아래) 가장자리에 1~3픽셀 짜리 가는 띠로 보여 줍니다. 긴 글이나 긴 페이지에서 \"얼마나 남았는지\" 직관적인 진행감을 줘서 끝까지 읽도록 유도합니다.",
  useCases: [
    "긴 블로그 글·매뉴얼의 읽기 진행도",
    "Heritage·About 같은 깊이 있는 페이지의 위치 감지",
    "튜토리얼·가이드 문서의 단계 진행 표시",
    "랜딩 페이지의 \"끝까지 보세요\" 시각 신호",
  ],
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
  intro:
    "왼쪽에서 오른쪽으로 끊김 없이 흘러가는 가로 띠 컴포넌트입니다. 안에 넣은 콘텐츠가 자동으로 복제되어 무한 반복되며, 마우스를 올리면 일시정지됩니다. \"여기 많은 것이 있다\"는 풍성한 느낌을 한 줄로 만들어 줍니다.",
  useCases: [
    "클라이언트 로고가 끊임없이 흐르는 신뢰 시그널",
    "공지·새 글 알림의 가로 흐름 띠",
    "기능 키워드·태그가 흘러가는 개념 강조",
    "이벤트·프로모션의 \"~중\" 안내 띠",
  ],
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
  intro:
    "본문 글 흐름 한가운데에 짧게 들어가는 \"여기 잠깐 주목\" 영역입니다. 큰 박스로 가두는 대신 왼쪽 1px 선과 살짝 톤만 있는 배경으로, \"참고\"·\"성공\"·\"주의\"·\"위험\" 4가지 톤을 색으로 구분합니다. 글을 읽다 자연스럽게 마주치되 흐름은 끊기지 않습니다.",
  useCases: [
    "블로그·문서에서 \"참고\" 박스 (info 톤)",
    "튜토리얼 끝의 \"잘했어요\" 같은 성공 안내 (accent 톤)",
    "약관·환불 정책의 주의 사항 (warning 톤)",
    "결제 실패·계정 위험 같은 위험 알림 (danger 톤)",
    "FAQ에서 한 항목의 핵심 답을 본문 중간에 강조",
  ],
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
  intro:
    "자주 묻는 질문(FAQ)을 \"질문 클릭 → 답이 펼쳐짐\" 방식의 아코디언으로 정리해 줍니다. 카드 박스로 가두지 않고 행마다 1픽셀 선만 두어, 글의 흐름을 유지하면서 사용자가 궁금한 항목만 펼쳐 보게 합니다.",
  useCases: [
    "Pricing·서비스 페이지의 FAQ 영역",
    "About·정책 페이지의 자주 묻는 질문",
    "튜토리얼 끝의 \"문제가 생겼다면\" 섹션",
    "제품 페이지의 기능별 짧은 Q&A",
  ],
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
              answer: "랜딩 페이지·콘텐츠 사이트·블로그·작은 랩 사이트 등 end-user UI 영역. shadcn(admin 강함)과 정반대 영역을 채웁니다.",
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
  intro:
    "가격 플랜 2~4개를 나란히 비교해 보여 주는 표입니다. 큰 카드 박스 없이 1픽셀 gap grid로 분리되고, 추천 플랜 하나만 살짝 강조되어 \"이 플랜을 보세요\"가 자연스럽게 시선이 갑니다.",
  useCases: [
    "Pricing 페이지의 핵심 플랜 비교 (Free / Pro / Team)",
    "B2B 서비스의 라이선스·구독 비교",
    "에이전시·컨설팅의 패키지 옵션",
    "이벤트·티켓의 등급별 가격 안내",
  ],
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
              tagline: "작은 팀·프리랜서.",
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
  intro:
    "가격 페이지 전체를 한 번에 만들어 주는 큰 묶음 패턴입니다. 중앙 정렬 첫 화면 + 플랜 비교 표 + 자주 묻는 질문 + 마무리 CTA가 일관된 톤으로 자동 배치되어, \"가격 페이지 하나가 통째로\" 들어옵니다.",
  useCases: [
    "SaaS 제품의 Pricing 페이지 전체",
    "구독·라이선스 모델의 비교 페이지",
    "에이전시·컨설팅의 패키지 안내",
    "이벤트·강연 티켓 등급 페이지",
  ],
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
  intro:
    "절차를 \"1단계 → 2단계 → 3단계\"로 정리해 보여 주는 컴포넌트입니다. 번호가 자동으로 매겨지고 각 단계마다 제목 + 짧은 설명이 동일한 형식으로 들어가, 사용자가 따라가야 하는 흐름을 한눈에 잡게 합니다. 세로(긴 단계) / 가로(짧은 단계) 레이아웃을 선택할 수 있습니다.",
  useCases: [
    "온보딩·튜토리얼의 \"가입 → 설정 → 시작\" 단계",
    "서비스 이용 절차 안내 (\"신청 → 검토 → 응답\")",
    "How it works / Process 페이지",
    "프로젝트 단계별 진행 흐름 시각화",
  ],
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
  intro:
    "여러 옵션·플랜·제품을 나란히 두고 \"이건 되고 저건 안 됩니다\"를 한눈에 보여 주는 비교 표입니다. 박스 없이 1픽셀 헤어라인으로만 행을 나누며, 가능/불가능 같은 단순 값은 ✓/− 기호로 자동 변환됩니다.",
  useCases: [
    "Pricing의 플랜별 기능 비교 표",
    "제품 A vs B vs C 비교 (제품 상세)",
    "라이브러리·도구의 기능 매트릭스",
    "정책·약관의 \"이전 버전 vs 새 버전\" 변경점 비교",
  ],
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

const GRID_DEF: ComponentDef = {
  id: "grid-columns",
  ko: "그리드·컬럼",
  en: "Grid",
  desc: "균등 grid wrapper (1~6 columns). 자유 layout(좌측 3, 우측 9 등)은 GridSystem 사용.",
  intro:
    "여러 항목을 같은 너비의 칸들로 나란히 배치할 때 쓰는 가장 단순한 격자입니다. 1~6 컬럼을 prop으로 정하면 자식 항목이 균등하게 들어가고, 모바일에서는 자동으로 1열로 접힙니다. 칸마다 너비를 다르게 주려면 GridSystem이 더 적합합니다.",
  useCases: [
    "이미지 그리드(Gallery 외 자유 자식)",
    "팀·멤버 카드 등 같은 형식의 항목 나열",
    "Pricing 플랜처럼 같은 너비 카드 비교",
    "랜딩 페이지의 균등한 특징 그리드",
  ],
  examples: [
    {
      index: "01",
      badge: "3 cols · default",
      title: "기본 — 3열 + default gap",
      description: "모바일 1열 → md:3열 자동.",
      preview: (
        <Grid columns={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="border-y border-zinc-200/60 py-6 text-center text-[14px] dark:border-white/[0.06]"
            >
              항목 {n}
            </div>
          ))}
        </Grid>
      ),
      prompt: `균등 grid wrapper. 모바일 1열 → 데스크톱 columns 자동.

스타일:
- grid grid-cols-1 md:grid-cols-{columns}
- gap: tight(12) / default(24~32) / loose(40~56)

Image 배열·작은 카드·통계 등 균등 정렬에 사용.
자유 layout(좌측 3 + 우측 9 같은)은 GridSystem.`,
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
  <div>...</div>
</div>`,
      react: `<Grid columns={3}>
  <div>...</div>
</Grid>`,
    },
    {
      index: "02",
      badge: "2 cols · loose",
      title: "2열 — 좌우 분할",
      description: "Problem/Solution 같은 대비. loose gap으로 충분한 여백.",
      preview: (
        <Grid columns={2} gap="loose">
          <div className="border-l-2 border-zinc-300 pl-5 dark:border-white/[0.12]">
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Problem
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              기존 흐름이 모바일에서 단절. 진척도 동기화 안 됨.
            </p>
          </div>
          <div className="border-l-2 border-emerald-500/50 pl-5 dark:border-emerald-400/40">
            <p className="text-[12px] uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
              Solution
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              단일 SPA + 진척도 동기화. PWA 패턴.
            </p>
          </div>
        </Grid>
      ),
      prompt: `좌우 비교 / Before-After. columns=2 + gap="loose"(40~56px).
CaseStudy 컴포넌트가 이 패턴 사용.`,
      react: `<Grid columns={2} gap="loose">
  <section>Problem</section>
  <section>Solution</section>
</Grid>`,
    },
    {
      index: "03",
      badge: "4 cols · tight",
      title: "4열 — 작은 항목 다수",
      description: "로고·아이콘처럼 항목이 많을 때. tight gap.",
      preview: (
        <Grid columns={4} gap="tight">
          {["EBS", "라이나", "롯데", "SKT", "KT", "LG U+", "EBS+", "freeive"].map((name) => (
            <div
              key={name}
              className="border border-zinc-200 py-4 text-center text-[12.5px] uppercase tracking-[0.08em] text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400"
            >
              {name}
            </div>
          ))}
        </Grid>
      ),
      prompt: `로고·아이콘·썸네일 다수. columns=4 + gap="tight"(12px).
모바일도 답답하면 mobileColumns=2.`,
      react: `<Grid columns={4} gap="tight" mobileColumns={2}>
  {logos.map((l) => <img src={l.src} />)}
</Grid>`,
    },
    {
      index: "04",
      badge: "mobileColumns=2",
      title: "모바일 2열",
      description: "모바일 1열도 답답할 때 (StatList 등).",
      preview: (
        <Grid columns={3} mobileColumns={2} gap="default">
          {[
            { v: "10+", l: "Years" },
            { v: "30+", l: "Clients" },
            { v: "150+", l: "Projects" },
          ].map((s) => (
            <div key={s.l} className="border-y border-zinc-200 py-6 dark:border-white/[0.06]">
              <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
                {s.v}
              </p>
              <p className="mt-2 text-[11.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {s.l}
              </p>
            </div>
          ))}
        </Grid>
      ),
      prompt: `모바일 1열이 답답한 영역. mobileColumns=2 → 모바일 2열 / 데스크톱 columns 그대로.
StatList의 모바일 패턴.`,
      react: `<Grid columns={3} mobileColumns={2}>
  <Stat ... />
</Grid>`,
    },
  ],
  props: [
    { name: "columns", type: "1 | 2 | 3 | 4 | 5 | 6", default: "3", desc: "데스크톱 컬럼 수 (균등)" },
    { name: "mobileColumns", type: "1 | 2", default: "1", desc: "모바일(sm 이하) 컬럼" },
    { name: "gap", type: '"tight" | "default" | "loose"', default: '"default"', desc: "간격 (12 / 24~32 / 40~56)" },
    { name: "as", type: '"div" | "ul" | "section"', default: '"div"', desc: "시맨틱" },
  ],
};

const GRID_SYSTEM_DEF: ComponentDef = {
  id: "grid-system",
  ko: "그리드 시스템 (12 col)",
  en: "GridSystem / GridCol",
  desc: "12 column grid system. Bootstrap·Material 표준 — 자식이 자유롭게 col-span 지정.",
  intro:
    "한 페이지를 12개의 가는 컬럼으로 나누고, 자식 영역마다 \"몇 칸 차지할지\"를 자유롭게 정할 수 있는 큰 그리드입니다. 4 + 8, 3 + 6 + 3 같은 비대칭 레이아웃을 만들 수 있어, 좀 더 \"디자인된\" 화면을 짤 때 적합합니다.",
  useCases: [
    "About·서비스 페이지의 좌측 좁은 메뉴 + 우측 넓은 본문",
    "랜딩 페이지의 비대칭 영역 (텍스트 4 + 이미지 8 등)",
    "복잡한 대시보드의 다중 영역 레이아웃",
    "포트폴리오 상세의 자유로운 콘텐츠 배치",
  ],
  examples: [
    {
      index: "01",
      badge: "3+9",
      title: "사이드바 + 본문 — 3/9",
      description: "Heritage 페이지 sectors 패턴. 좌측 라벨 + 우측 본문.",
      preview: (
        <GridSystem>
          <GridCol span={3} className="border-y border-zinc-200 py-4 dark:border-white/[0.06]">
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Telecom
            </p>
            <p className="mt-2 text-[12.5px] text-zinc-500 dark:text-zinc-500">
              3 projects
            </p>
          </GridCol>
          <GridCol span={9} className="border-y border-zinc-200 py-4 dark:border-white/[0.06]">
            <p className="text-[15.5px] font-medium text-zinc-900 dark:text-zinc-100">
              라이나생명 디지털채널 재구축
            </p>
            <p className="mt-1.5 text-[13.5px] text-zinc-600 dark:text-zinc-400">
              본문 영역에 ListRow 또는 자유 마크업.
            </p>
          </GridCol>
        </GridSystem>
      ),
      prompt: `좌측 라벨(3) + 우측 본문(9) 분할. Heritage 섹터별 프로젝트 리스트가 이 패턴.

스타일:
- GridSystem: grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8
- GridCol span={3}: md:col-span-3
- GridCol span={9}: md:col-span-9

모바일은 자동 1열 stack (좌측 위 → 우측 아래).`,
      html: `<div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
  <div class="md:col-span-3">좌측 라벨</div>
  <div class="md:col-span-9">본문</div>
</div>`,
      react: `<GridSystem>
  <GridCol span={3}>좌측 라벨</GridCol>
  <GridCol span={9}>본문</GridCol>
</GridSystem>`,
    },
    {
      index: "02",
      badge: "4+4+4",
      title: "균등 — 4/4/4",
      description: "Grid columns=3과 시각 동일. 12 system 안에서 명시.",
      preview: (
        <GridSystem>
          {["A", "B", "C"].map((label) => (
            <GridCol
              key={label}
              span={4}
              className="border-y border-zinc-200/60 py-6 text-center text-[14px] dark:border-white/[0.06]"
            >
              span={4} · {label}
            </GridCol>
          ))}
        </GridSystem>
      ),
      prompt: `균등 3열을 12 system 안에서. Grid={3}과 시각 동일하지만 GridSystem은 자유 layout 의도 표현.

원칙:
- 균등이면 Grid (단순)
- 자유(3+9 / 8+4 등)면 GridSystem`,
      react: `<GridSystem>
  <GridCol span={4}>A</GridCol>
  <GridCol span={4}>B</GridCol>
  <GridCol span={4}>C</GridCol>
</GridSystem>`,
    },
    {
      index: "03",
      badge: "asymmetric",
      title: "비대칭 — 8+4 (article + aside)",
      description: "블로그 글 페이지: 본문 8 + 사이드바 4.",
      preview: (
        <GridSystem gap="loose">
          <GridCol
            span={8}
            className="border-l-2 border-zinc-300 pl-5 dark:border-white/[0.12]"
            as="article"
          >
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Article (span 8)
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              블로그 본문이 더 넓어야 하는 페이지. 우측에는 메타·태그.
            </p>
          </GridCol>
          <GridCol
            span={4}
            className="border-l-2 border-zinc-200 pl-5 dark:border-white/[0.06]"
            as="aside"
          >
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Aside (span 4)
            </p>
            <ul className="mt-3 space-y-2 text-[13px] text-zinc-600 dark:text-zinc-400">
              <li>관련 글</li>
              <li>태그</li>
              <li>저자 메타</li>
            </ul>
          </GridCol>
        </GridSystem>
      ),
      prompt: `블로그 / 문서 페이지: 본문(8) + 사이드(4) 비대칭.
GridCol as="article" / as="aside" — 시맨틱 명시.`,
      react: `<GridSystem gap="loose">
  <GridCol span={8} as="article">본문</GridCol>
  <GridCol span={4} as="aside">사이드</GridCol>
</GridSystem>`,
    },
    {
      index: "04",
      badge: "start (offset)",
      title: "오프셋 — 가운데 정렬",
      description: "span={6} start={4} → 4번 컬럼부터 6칸 (가운데 영역).",
      preview: (
        <GridSystem>
          <GridCol
            span={6}
            start={4}
            className="border-y border-zinc-200 py-6 text-center dark:border-white/[0.06]"
          >
            <p className="text-[13px] text-zinc-700 dark:text-zinc-300">
              span={6} start={4} — 4번 컬럼부터 6칸 (4~9 위치, 가운데 1/2)
            </p>
          </GridCol>
        </GridSystem>
      ),
      prompt: `오프셋 — col-start로 시작 위치 강제. 가운데 정렬 영역에.
span=6, start=4 → 4번 컬럼부터 6칸 (= 4,5,6,7,8,9). 12 컬럼의 가운데 1/2.`,
      react: `<GridSystem>
  <GridCol span={6} start={4}>가운데 영역</GridCol>
</GridSystem>`,
    },
  ],
  props: [
    { name: "GridSystem.columns", type: "6 | 8 | 12 | 16 | 24", default: "12", desc: "전체 컬럼 수" },
    { name: "GridSystem.gap", type: '"tight" | "default" | "loose"', default: '"default"', desc: "간격" },
    { name: "GridSystem.as", type: '"div" | "section"', default: '"div"', desc: "시맨틱" },
    { name: "GridCol.span", type: "1~12", default: "12", desc: "데스크톱 col-span" },
    { name: "GridCol.start", type: "1~12", desc: "시작 컬럼 (offset)" },
    { name: "GridCol.as", type: '"div" | "section" | "article" | "aside"', default: '"div"', desc: "시맨틱" },
  ],
};

const INPUT_DEF: ComponentDef = {
  id: "input",
  ko: "입력 필드",
  en: "Input",
  desc: "텍스트 입력. label/hint/error 자동, focus시 emerald 헤어라인.",
  intro:
    "사용자가 한 줄짜리 텍스트(이름·이메일·전화번호 등)를 입력하는 칸입니다. 평소엔 1픽셀 헤어라인 박스이고, 칸을 클릭해 입력 중일 땐 emerald 색으로 살짝 강조되어 \"여기 입력 중\"임이 명확해집니다.",
  useCases: [
    "Talk·Contact 페이지의 이름·이메일 입력",
    "Admin 글 작성·수정 페이지의 제목 입력",
    "검색창",
    "회원가입·로그인 폼의 단일 줄 필드",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — label + hint",
      description: "둥근 모서리 살짝, shadow X.",
      preview: (
        <div className="max-w-md">
          <Input
            label="이메일"
            type="email"
            placeholder="ive@freeive.com"
            hint="답장이 필요한 주소"
          />
        </div>
      ),
      prompt: `폼 입력 필드. shadcn Input과 비슷하지만 둥근 모서리 약함, shadow 거부.
focus시 border-emerald-500 + ring 2px/20%. forwardRef로 react-hook-form 호환.`,
      react: `<Input label="이메일" type="email" hint="답장이 필요한 주소" />`,
    },
    {
      index: "02",
      badge: "error",
      title: "error 상태",
      description: "border + ring rose, hint 자리에 error.",
      preview: (
        <div className="max-w-md">
          <Input label="이름" error="이름은 필수입니다." placeholder="이름" />
        </div>
      ),
      prompt: `error prop만 주면 자동: border-rose-500 + aria-invalid + rose hint 텍스트.`,
      react: `<Input label="이름" error="이름은 필수입니다." />`,
    },
  ],
  props: [
    { name: "label", type: "ReactNode", desc: "위 라벨" },
    { name: "error", type: "ReactNode", desc: "에러 (border rose)" },
    { name: "hint", type: "ReactNode", desc: "보조 설명" },
    { name: "...rest", type: "InputHTMLAttributes<HTMLInputElement>", desc: "표준" },
  ],
};

const TEXTAREA_DEF: ComponentDef = {
  id: "textarea",
  ko: "여러 줄 입력",
  en: "Textarea",
  desc: "여러 줄 입력. Input과 동일 톤 + resize-y.",
  intro:
    "여러 줄 텍스트(메시지·메모·본문)를 입력하는 큰 칸입니다. 기본 입력 칸과 같은 톤이지만, 사용자가 모서리를 끌어 세로 크기를 조절할 수 있게 되어 있어 긴 글을 쓰기 편합니다.",
  useCases: [
    "Talk·Contact의 의뢰 내용 입력",
    "Admin 블로그 글의 본문(MDX)·요약 입력",
    "사용자 후기·문의 메시지",
    "긴 코멘트·메모 작성",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 4줄",
      description: "Input과 동일 톤. resize-y로 사용자가 늘림.",
      preview: (
        <div className="max-w-md">
          <Textarea
            label="프로젝트 설명"
            placeholder="어떤 프로젝트인가요? 의사결정자 본인 여부와 목적을 함께 적어주시면 빠릅니다."
            rows={4}
          />
        </div>
      ),
      prompt: `여러 줄 입력. Input과 거의 동일. rows 기본 4. resize-y (세로만 늘림).`,
      react: `<Textarea label="설명" rows={5} placeholder="..." />`,
    },
  ],
  props: [
    { name: "label / error / hint", type: "ReactNode", desc: "Input과 동일" },
    { name: "rows", type: "number", default: "4", desc: "기본 줄 수" },
    { name: "...rest", type: "TextareaHTMLAttributes<HTMLTextAreaElement>", desc: "표준" },
  ],
};

const SELECT_DEF: ComponentDef = {
  id: "select",
  ko: "드롭다운",
  en: "Select",
  desc: "native select. 커스텀 dropdown 거부 — 접근성·모바일 OS 통합.",
  intro:
    "옵션 목록 중 하나를 고르는 드롭다운입니다. 화려한 커스텀 메뉴 대신 브라우저·운영체제가 제공하는 표준 select를 그대로 활용해, 모바일에서도 익숙한 시스템 메뉴로 열립니다.",
  useCases: [
    "Talk·Contact의 \"의뢰 종류\" 선택",
    "Admin 글 작성의 카테고리·상태 선택",
    "프로필·설정의 언어·국가 선택",
    "정렬 기준 선택(최신순·인기순 등)",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — placeholder + options",
      description: "options 배열 또는 children으로.",
      preview: (
        <div className="max-w-md">
          <Select
            label="카테고리"
            placeholder="선택하세요"
            defaultValue=""
            options={[
              { value: "learning", label: "학습 일지" },
              { value: "ai", label: "AI 워크플로우" },
              { value: "review", label: "회고" },
            ]}
          />
        </div>
      ),
      prompt: `native select. shadcn custom dropdown 거부 — native가 접근성·모바일 OS·키보드 모두 지원.
appearance-none + 커스텀 SVG 화살표.`,
      react: `<Select label="카테고리" placeholder="선택" options={[
  { value: "ai", label: "AI 워크플로우" },
]} />`,
    },
  ],
  props: [
    { name: "label / error / hint", type: "ReactNode", desc: "Input과 동일" },
    { name: "options", type: "SelectOption[]", desc: "{value, label, disabled?}[]" },
    { name: "placeholder", type: "string", desc: "빈 값 옵션" },
  ],
};

const CHECKBOX_RADIO_DEF: ComponentDef = {
  id: "checkbox-radio",
  ko: "체크박스·라디오",
  en: "Checkbox / Radio",
  desc: "체크박스 + 라디오. label + description 묶음, checked시 emerald.",
  intro:
    "여러 항목 중 \"여러 개를 선택\"(체크박스)하거나 \"하나만 선택\"(라디오)하게 해 주는 입력 컴포넌트입니다. 라벨 옆에 짧은 부연 설명도 같이 묶을 수 있어, 옵션마다 의미를 분명히 전할 수 있습니다.",
  useCases: [
    "Pricing 플랜 선택 (라디오: Free / Pro / Team)",
    "Talk 폼의 \"아래 항목 동의\" 체크박스",
    "Admin 설정의 \"알림 받을 이벤트\" 다중 선택",
    "필터 패널의 카테고리 다중 선택",
  ],
  examples: [
    {
      index: "01",
      badge: "checkbox",
      title: "Checkbox — 약관 동의",
      description: "라벨 + description 작은 글씨.",
      preview: (
        <div className="max-w-md space-y-3">
          <Checkbox
            name="terms"
            label="이용약관에 동의합니다."
            description="14세 이상 사용자만 가입 가능합니다."
          />
          <Checkbox
            name="marketing"
            label="마케팅 정보 수신에 동의합니다."
            description="선택 사항."
          />
        </div>
      ),
      prompt: `약관 동의·필터·옵션 다중 선택. label + description 자동.
checked시 bg-emerald + ✓ SVG (data URL).`,
      react: `<Checkbox name="terms" label="이용약관" description="14세 이상" required />`,
    },
    {
      index: "02",
      badge: "radio",
      title: "Radio — 단일 선택",
      description: "name이 같은 라디오들 중 하나만.",
      preview: (
        <fieldset className="max-w-md space-y-3">
          <Radio name="plan" value="free" label="Free" description="개인용." defaultChecked />
          <Radio name="plan" value="pro" label="Pro" description="작은 팀." />
          <Radio name="plan" value="team" label="Team" description="팀·기업." />
        </fieldset>
      ),
      prompt: `단일 선택 그룹. <fieldset> + 같은 name의 Radio들. checked시 border 5px emerald + 내부 점.`,
      react: `<fieldset>
  <Radio name="plan" value="free" label="Free" />
  <Radio name="plan" value="pro" label="Pro" />
</fieldset>`,
    },
  ],
  props: [
    { name: "label", type: "ReactNode", desc: "라벨 (필수)" },
    { name: "description", type: "ReactNode", desc: "보조 설명" },
    { name: "...rest", type: "InputHTMLAttributes (type 제외)", desc: "name/value/checked 등" },
  ],
};

const GALLERY_DEF: ComponentDef = {
  id: "gallery",
  ko: "갤러리",
  en: "Gallery",
  desc: "이미지 그리드. Image 패턴 + 균등 grid + caption 자동.",
  intro:
    "여러 장의 이미지를 같은 비율의 격자로 한 번에 보여 주는 갤러리입니다. 각 이미지마다 짧은 caption을 달 수 있고, 클릭 시 상세 페이지로 이동하는 링크도 옵션입니다. 모바일은 1열, 데스크톱은 2~4열로 자동 조절됩니다.",
  useCases: [
    "Lab 데모 이미지 미리보기 갤러리",
    "Heritage 프로젝트의 작업물 이미지 모음",
    "포트폴리오·갤러리 페이지",
    "블로그·매거진의 사진 모음",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 3열 4:3",
      description: "균등 그리드 + 모서리 살짝 + caption.",
      preview: (
        <Gallery
          columns={3}
          ratio="4/3"
          items={[
            {
              src: "https://placehold.co/600x450/0a0a0a/64748b?text=Demo+1",
              alt: "데모 1",
              caption: "손가락 그림 그리기",
            },
            {
              src: "https://placehold.co/600x450/0a0a0a/64748b?text=Demo+2",
              alt: "데모 2",
              caption: "손짓 공 잡기",
              href: "#",
            },
            {
              src: "https://placehold.co/600x450/0a0a0a/64748b?text=Demo+3",
              alt: "데모 3",
              caption: "한글 자음 매칭",
            },
          ]}
        />
      ),
      prompt: `이미지 그리드. Lab 데모 미리보기 / 블로그 갤러리 등.
모바일 1열, md:3열 (또는 2/4). rounded-md, native/강제 ratio. caption 자동.
href시 살짝 scale + opacity-90.`,
      react: `<Gallery columns={3} ratio="4/3" items={[
  { src: "/1.jpg", alt: "...", caption: "..." },
  { src: "/2.jpg", alt: "...", href: "/lab/demo-2" },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "GalleryItem[]", desc: "{src, alt, caption?, href?}[]" },
    { name: "columns", type: "2 | 3 | 4", default: "3", desc: "데스크톱 컬럼" },
    { name: "ratio", type: '"native" | "16/9" | "4/3" | "1/1"', default: '"4/3"', desc: "종횡비" },
    { name: "gap", type: '"tight" | "default" | "loose"', default: '"default"', desc: "간격" },
  ],
};

const CAROUSEL_DEF: ComponentDef = {
  id: "carousel",
  ko: "캐러셀·슬라이드",
  en: "Carousel",
  desc: "한 장씩 큰 슬라이드 — 좌우 화살표 + emerald dot. fade(default) / slide 트랜지션, autoPlay·loop·키보드 ←/→.",
  intro:
    "한 번에 한 장씩 큰 화면으로 보여 주는 슬라이드 컴포넌트입니다. 좌우 화살표·하단 점·키보드 ←/→·모바일 스와이프 모두 지원하며, 자동 재생 옵션도 있습니다. 마우스를 올리면 자동 재생이 일시정지되어 사용자 시선을 존중합니다.",
  useCases: [
    "히어로 영역의 메인 비주얼 슬라이드",
    "포트폴리오 상세의 스크린샷 모음",
    "이벤트·캠페인의 주요 이미지 회전",
    "About·Story의 장면 전환 (스토리 슬라이드)",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "이미지 캐러셀 — fade 트랜지션 + autoPlay",
      description: "3장 16:9 + 호버 시 자동재생 일시정지. dots 누르면 즉시 이동.",
      preview: (
        <Carousel
          autoPlay
          interval={4000}
          slides={[
            {
              id: "s1",
              content: (
                <img
                  src="https://placehold.co/1280x720/0a0a0a/34d399?text=Slide+1"
                  alt="슬라이드 1"
                  className="h-full w-full object-cover"
                />
              ),
            },
            {
              id: "s2",
              content: (
                <img
                  src="https://placehold.co/1280x720/0a0a0a/64748b?text=Slide+2"
                  alt="슬라이드 2"
                  className="h-full w-full object-cover"
                />
              ),
            },
            {
              id: "s3",
              content: (
                <img
                  src="https://placehold.co/1280x720/0a0a0a/a3a3a3?text=Slide+3"
                  alt="슬라이드 3"
                  className="h-full w-full object-cover"
                />
              ),
            },
          ]}
        />
      ),
      prompt: `캐러셀 / 슬라이드. 한 장씩 큰 콘텐츠 (이미지·문구).
스타일: shadow X, 1px 헤어라인 border, rounded-md, overflow-hidden.
화살표: 좌우 가장자리 ghost 버튼 (white/80 + backdrop-blur, hover 진하게).
dots: 하단 중앙, 비활성 작은 zinc-400 1px 동그라미, active emerald 채움 + 가로 늘어남(w-5).
모션: fade(default, opacity 500ms) / slide(translateX 500ms).
인터랙션: 호버 시 autoPlay 일시정지, 키보드 ←/→ 지원, 모바일 좌우 스와이프(40px threshold, 세로 스크롤 우세 시 양보), role=region aria-roledescription="carousel".`,
      react: `<Carousel
  autoPlay
  interval={4000}
  slides={[
    { id: "s1", content: <img src="/1.jpg" className="h-full w-full object-cover" /> },
    { id: "s2", content: <img src="/2.jpg" className="h-full w-full object-cover" /> },
    { id: "s3", content: <img src="/3.jpg" className="h-full w-full object-cover" /> },
  ]}
/>`,
    },
    {
      index: "02",
      badge: "transition",
      title: "slide 트랜지션 + 비율 4:3",
      description: "translateX 슬라이드. autoPlay 끄고 화살표·dots만으로 제어.",
      preview: (
        <Carousel
          transition="slide"
          aspect="4/3"
          slides={[
            {
              id: "a",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-emerald-500/10 px-8 text-center">
                  <p className="text-[18px] font-medium text-emerald-700 dark:text-emerald-300">
                    안티 카드 정체성
                  </p>
                </div>
              ),
            },
            {
              id: "b",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 px-8 text-center dark:bg-white/[0.04]">
                  <p className="text-[18px] font-medium text-zinc-700 dark:text-zinc-200">
                    AI 동질화 거부
                  </p>
                </div>
              ),
            },
            {
              id: "c",
              content: (
                <div className="flex h-full w-full items-center justify-center bg-yellow-500/10 px-8 text-center">
                  <p className="text-[18px] font-medium text-yellow-800 dark:text-yellow-200">
                    헤어라인의 미감
                  </p>
                </div>
              ),
            },
          ]}
        />
      ),
      prompt: `slide 트랜지션 — translateX 기반 옆으로 미는 모션.
fade와 차이: 슬라이드 사이 직접적 연결감 (앨범 페이지 넘기듯).
autoPlay 없이 사용자 능동 조작 위주 (히어로보단 스토리 슬라이드 적합).`,
      react: `<Carousel
  transition="slide"
  aspect="4/3"
  slides={[
    { id: "a", content: <div className="flex h-full items-center justify-center">안티 카드 정체성</div> },
    { id: "b", content: <div className="flex h-full items-center justify-center">AI 동질화 거부</div> },
    { id: "c", content: <div className="flex h-full items-center justify-center">헤어라인의 미감</div> },
  ]}
/>`,
    },
  ],
  props: [
    { name: "slides", type: "CarouselSlide[]", desc: "{id, content, label?}[]" },
    { name: "defaultIndex", type: "number", default: "0", desc: "시작 슬라이드" },
    { name: "autoPlay", type: "boolean", default: "false", desc: "자동재생 (호버 시 일시정지)" },
    { name: "interval", type: "number", default: "5000", desc: "자동재생 간격(ms)" },
    { name: "showArrows", type: "boolean", default: "true", desc: "좌우 화살표" },
    { name: "showDots", type: "boolean", default: "true", desc: "하단 dots" },
    { name: "loop", type: "boolean", default: "true", desc: "마지막→처음 순환" },
    { name: "aspect", type: '"16/9" | "4/3" | "1/1" | "21/9"', default: '"16/9"', desc: "비율" },
    { name: "transition", type: '"fade" | "slide"', default: '"fade"', desc: "전환 모션" },
    { name: "onIndexChange", type: "(i: number) => void", desc: "인덱스 변경 콜백" },
  ],
};

/* ================================================================
 * 내비게이션 (Breadcrumb / Pagination / Tabs)
 * ================================================================ */

const BREADCRUMB_DEF: ComponentDef = {
  id: "breadcrumb",
  ko: "브레드크럼",
  en: "Breadcrumb",
  desc: "사용자 위치 표시. 12.5px, 마지막 항목은 진한 색 + aria-current. ChevronRight 자동.",
  intro:
    "사용자가 사이트 안에서 \"지금 어디에 있는지\"를 한 줄로 알려 주는 경로 표시입니다. \"홈 > 카테고리 > 현재 페이지\" 식으로 작은 글씨로 펼쳐지며, 마지막 항목은 진하게 강조되어 현재 위치임을 분명히 합니다.",
  useCases: [
    "블로그 글의 \"홈 > 학습 일지 > 글 제목\" 경로",
    "문서·매뉴얼의 페이지 위치 안내",
    "Admin 화면의 다단계 페이지 경로",
    "이커머스의 카테고리 깊은 페이지 경로",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "기본 — 3단계",
      description: "Home / Lab / 안티 카드. 마지막은 자동 진한 색.",
      preview: (
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "Lab", href: "#" },
            { label: "안티 카드" },
          ]}
        />
      ),
      prompt: `사이트 위치 표시 — 사용자가 어디에 있는지.
스타일: 12.5px, zinc-500 (현재 페이지만 진한 색).
구분 기호: ChevronRight (lucide) — 화살표 X.
마지막 항목: href 없음 + aria-current="page" 자동.`,
      react: `<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Lab", href: "/lab" },
  { label: "안티 카드" }, // 현재 페이지 (href 없음)
]} />`,
    },
  ],
  props: [
    { name: "items", type: "BreadcrumbItem[]", desc: "{label, href?}[]" },
    { name: "separator", type: "ReactNode", desc: "구분 기호 (default: ChevronRight)" },
  ],
};

function PaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className="space-y-4">
      <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
      <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400">
        현재 페이지: <span className="font-mono text-zinc-700 dark:text-zinc-300">{page}</span> / 20
      </p>
    </div>
  );
}

const PAGINATION_DEF: ComponentDef = {
  id: "pagination",
  ko: "페이지네이션",
  en: "Pagination",
  desc: "페이지 이동. 헤어라인 박스 + 활성만 emerald 배경. 1 ... siblings ... last 패턴.",
  intro:
    "긴 목록을 여러 페이지로 나누어 보여 줄 때 \"이전 / 1 2 3 / 다음\" 식으로 페이지를 이동하게 해 주는 컴포넌트입니다. 현재 페이지만 emerald 색으로 살짝 강조되고, 페이지가 많을 땐 자동으로 \"...\"으로 줄여 보여 줍니다.",
  useCases: [
    "블로그 목록 페이지 (글 N개씩)",
    "검색 결과 페이지",
    "Admin 데이터 테이블의 페이지 이동",
    "이커머스의 상품 목록 페이지",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "기본 — 20 페이지 중 5",
      description: "이전·다음 + 1 / 4·5·6 / 20 패턴. siblings=1.",
      preview: <PaginationDemo />,
      prompt: `페이지네이션 — 페이지 수 적으면 모두, 많으면 1...현재±siblings...last 패턴.
스타일: rounded-md border + 활성만 emerald-500/10 배경.
shadcn 채움 거부 — 헤어라인만.
이전/다음은 ChevronLeft/ChevronRight (lucide).`,
      react: `const [page, setPage] = useState(5);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  siblings={1}
/>`,
    },
  ],
  props: [
    { name: "currentPage", type: "number", desc: "현재 페이지 (1-indexed)" },
    { name: "totalPages", type: "number", desc: "전체 페이지 수" },
    { name: "onPageChange", type: "(page: number) => void", desc: "페이지 변경 콜백" },
    { name: "siblings", type: "number", default: "1", desc: "현재 양 옆 노출 개수" },
  ],
};

const TABS_DEF: ComponentDef = {
  id: "tabs",
  ko: "탭 메뉴",
  en: "Tabs",
  desc: "탭 패널 전환. variant=line(헤어라인+emerald 언더라인) / pills(Pill 톤).",
  intro:
    "한 영역에서 여러 화면을 \"탭으로 전환\"해 가며 보여 주는 컴포넌트입니다. 활성 탭에는 emerald 색 짧은 밑줄이 그어지고, 클릭 시 해당 콘텐츠로 부드럽게 전환됩니다. 두 가지 톤(헤어라인 라인 / Pill 형태)을 선택할 수 있습니다.",
  useCases: [
    "제품 상세의 \"개요·스펙·리뷰·FAQ\" 탭",
    "Admin 대시보드의 \"통계·로그·설정\" 화면 전환",
    "포트폴리오 사례의 \"문제·해결·결과\" 탭",
    "Settings 페이지의 카테고리 분리",
  ],
  examples: [
    {
      index: "01",
      badge: "variant · line",
      title: "기본 — 헤어라인 톤",
      description: "하단 1px border + 활성 탭 emerald 1px 언더라인.",
      preview: (
        <Tabs
          items={[
            { id: "overview", label: "개요", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">개요 패널 — 컴포넌트의 큰 그림.</p> },
            { id: "spec", label: "스펙", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">props, default, type 정보.</p> },
            { id: "usage", label: "사용", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">실제 사용 예시 코드.</p> },
          ]}
        />
      ),
      prompt: `탭 메뉴 line variant — 안티 카드 톤.
하단 헤어라인 (border-b zinc-200) + 활성 탭은 emerald 텍스트 + 1px emerald 언더라인.
shadcn pill-style 거부, 박스도 거부 — 가장 가벼운 헤어라인.
접근성: role=tablist/tab/tabpanel + aria-selected/aria-controls 자동.`,
      react: `<Tabs items={[
  { id: "overview", label: "개요", panel: <Overview /> },
  { id: "spec",     label: "스펙", panel: <Spec /> },
  { id: "usage",    label: "사용", panel: <Usage /> },
]} />`,
    },
    {
      index: "02",
      badge: "variant · pills",
      title: "Pill 톤",
      description: "Pill 컴포넌트와 동일 톤 (rounded-md + emerald 배경).",
      preview: (
        <Tabs
          variant="pills"
          items={[
            { id: "all", label: "전체", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">전체 항목.</p> },
            { id: "ready", label: "준비됨", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">준비된 항목만.</p> },
            { id: "soon", label: "예정", panel: <p className="text-[14px] text-zinc-700 dark:text-zinc-300">곧 추가될 항목.</p> },
          ]}
        />
      ),
      prompt: `pills variant — Pill 컴포넌트와 시각 일관.
필터 토글 같은 짧은 라벨 그룹에 적합. flex flex-wrap gap-1.5.`,
      react: `<Tabs variant="pills" items={[
  { id: "all", label: "전체", panel: ... },
  { id: "ready", label: "준비됨", panel: ... },
]} />`,
    },
  ],
  props: [
    { name: "items", type: "TabItem[]", desc: "{id, label, panel, disabled?}[]" },
    { name: "defaultActiveId", type: "string", desc: "시작 활성 탭 (default: 첫 항목)" },
    { name: "variant", type: '"line" | "pills"', default: '"line"', desc: "시각 톤" },
  ],
};

/* ================================================================
 * 오버레이 (Dialog / Drawer / Popover / Tooltip / Toast / Dropdown)
 * ================================================================ */

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="삭제 확인"
        description="이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button tone="accent" onClick={() => { alert("삭제됨"); setOpen(false); }}>삭제</Button>
          </>
        }
      />
    </>
  );
}

const DIALOG_DEF: ComponentDef = {
  id: "dialog",
  ko: "다이얼로그·모달",
  en: "Dialog",
  desc: "native <dialog> 사용 — focus trap·ESC·backdrop 자동. shadow X, 헤어라인. footer slot.",
  intro:
    "본문 위에 떠서 사용자에게 \"확인이 필요한 한 가지\"에 집중하게 하는 모달 창입니다. 뒤 배경은 살짝 어두워져 다른 곳을 클릭할 수 없게 되고, ESC 키나 배경 클릭으로 자연스럽게 닫힙니다. 키보드 포커스도 모달 안에서만 움직이도록 자동 제어됩니다.",
  useCases: [
    "삭제·결제처럼 중요한 행동의 확인 다이얼로그",
    "짧은 폼 (예: 빠른 로그인·이메일 구독)",
    "이미지·동영상 라이트박스",
    "단계별 설명·안내 모달 (튜토리얼)",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "삭제 확인 패턴",
      description: "title + description + secondary/primary 푸터. ESC·backdrop·X 버튼으로 닫힘.",
      preview: <DialogDemo />,
      prompt: `다이얼로그 — 모달 confirm·짧은 폼.
native <dialog> + showModal() 사용. focus trap / ESC / backdrop 자동.
스타일: shadow X, rounded-md border, 큰 padding (24~32px), backdrop:bg-zinc-900/40.
사용처: confirm/cancel, 짧은 폼. 큰 폼은 Drawer 권장.

footer 패턴: <>secondary 취소 + primary 확인</> (justify-end gap-3).`,
      react: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>

<Dialog
  open={open}
  onOpenChange={setOpen}
  title="삭제 확인"
  description="되돌릴 수 없습니다."
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
      <Button tone="accent" onClick={handleDelete}>삭제</Button>
    </>
  }
/>`,
    },
  ],
  props: [
    { name: "open", type: "boolean", desc: "열림 상태" },
    { name: "onOpenChange", type: "(open: boolean) => void", desc: "상태 변경 콜백" },
    { name: "title", type: "ReactNode", desc: "헤더 제목" },
    { name: "description", type: "ReactNode", desc: "헤더 설명" },
    { name: "children", type: "ReactNode", desc: "본문 (폼·콘텐츠)" },
    { name: "footer", type: "ReactNode", desc: "푸터 액션" },
    { name: "size", type: '"narrow" | "default" | "wide"', default: '"default"', desc: "너비" },
    { name: "showClose", type: "boolean", default: "true", desc: "X 닫기 버튼" },
  ],
};

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">필터 열기</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side="right"
        title="필터"
        footer={
          <>
            <Button variant="plain" onClick={() => setOpen(false)}>초기화</Button>
            <Button tone="accent" onClick={() => setOpen(false)}>적용</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[14px] text-zinc-700 dark:text-zinc-300">필터 폼이 여기 들어갑니다.</p>
          <Input label="검색어" placeholder="검색..." />
          <Checkbox label="준비됨만" />
          <Checkbox label="새 항목 우선" />
        </div>
      </Drawer>
    </>
  );
}

const DRAWER_DEF: ComponentDef = {
  id: "drawer",
  ko: "서랍·사이드 패널",
  en: "Drawer",
  desc: "옆에서 슬라이드 패널. side=left/right. Dialog보다 긴 콘텐츠·폼에 적합.",
  intro:
    "화면의 옆(왼쪽 또는 오른쪽)에서 미끄러져 들어오는 큰 패널입니다. 다이얼로그보다 세로로 길게 사용할 수 있어 긴 폼이나 상세 콘텐츠를 띄우기에 적합합니다. ESC·배경 클릭으로 자연스럽게 닫힙니다.",
  useCases: [
    "모바일·태블릿의 메뉴(햄버거 → 사이드 메뉴)",
    "쇼핑몰의 장바구니·주문 요약 패널",
    "Admin의 빠른 편집 폼 (목록은 그대로 두고 옆에서 편집)",
    "필터 패널 (긴 카테고리·다중 옵션)",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive · right",
      title: "필터 패널",
      description: "우측 슬라이드. ESC + backdrop 클릭으로 닫힘. body scroll lock 자동.",
      preview: <DrawerDemo />,
      prompt: `Drawer — 옆에서 슬라이드되는 패널.
side="left" or "right". 긴 콘텐츠·폼·필터 패널에 적합.
ESC + backdrop 클릭으로 닫힘. body overflow:hidden 자동 (배경 스크롤 잠금).
스타일: shadow X, 헤어라인 1px (border-l/r).
header (border-b 1px) + 본문 (overflow-y-auto) + footer (border-t 1px) 3단.`,
      react: `<Drawer
  open={open}
  onOpenChange={setOpen}
  side="right"
  title="필터"
  footer={<Button tone="accent">적용</Button>}
>
  <FilterForm />
</Drawer>`,
    },
  ],
  props: [
    { name: "open", type: "boolean", desc: "열림 상태" },
    { name: "onOpenChange", type: "(open: boolean) => void", desc: "상태 변경 콜백" },
    { name: "side", type: '"left" | "right"', default: '"right"', desc: "슬라이드 방향" },
    { name: "title", type: "ReactNode", desc: "헤더 제목" },
    { name: "children", type: "ReactNode", desc: "본문" },
    { name: "footer", type: "ReactNode", desc: "푸터 액션" },
    { name: "size", type: '"narrow" | "default" | "wide"', default: '"default"', desc: "너비" },
    { name: "showClose", type: "boolean", default: "true", desc: "X 닫기 버튼" },
  ],
};

const POPOVER_DEF: ComponentDef = {
  id: "popover",
  ko: "팝오버",
  en: "Popover",
  desc: "트리거 옆 floating 패널. 클릭으로 열고 닫음. 인터랙티브 콘텐츠 OK (Tooltip과 차이).",
  intro:
    "어떤 버튼·아이콘 옆에 붙어 떠 있는 작은 패널입니다. 호버가 아니라 클릭으로 열고 닫으며, 그 안에 폼·메뉴·설정 같은 인터랙티브 콘텐츠도 둘 수 있습니다. 외부 클릭이나 ESC로 자연스럽게 닫힙니다.",
  useCases: [
    "헤더의 사용자 메뉴(프로필·로그아웃)",
    "필터·정렬 옵션이 들어가는 작은 설정 패널",
    "표 헤더의 \"이 컬럼 옵션\" 미니 메뉴",
    "공유 버튼의 \"링크 복사·SNS\" 패널",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "설정 폼 팝오버",
      description: "트리거 클릭 → 작은 패널. 외부 클릭 + ESC로 자동 닫힘.",
      preview: (
        <Popover
          trigger={<Button variant="secondary" leadingIcon={<Settings className="h-4 w-4" />}>설정</Button>}
          content={
            <div className="space-y-3">
              <p className="text-[12.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">디스플레이</p>
              <Checkbox label="다크 모드" defaultChecked />
              <Checkbox label="컴팩트 뷰" />
              <Checkbox label="알림 활성" defaultChecked />
            </div>
          }
          side="bottom"
          align="start"
        />
      ),
      prompt: `Popover — 트리거 옆에 떠있는 작은 패널.
클릭으로 열고 닫음 (호버 X). 폼·필터·작은 메뉴 적합.
스타일: shadow X, 헤어라인 1px, p-4. min-w-[220px].
side: top/bottom/left/right. align (top/bottom): start/center/end.
외부 클릭 + ESC 자동 닫힘.`,
      react: `<Popover
  trigger={<Button variant="ghost">설정</Button>}
  content={
    <div className="space-y-3">
      <Checkbox label="다크 모드" />
      <Checkbox label="컴팩트 뷰" />
    </div>
  }
  side="bottom"
  align="start"
/>`,
    },
  ],
  props: [
    { name: "trigger", type: "ReactNode", desc: "클릭 가능한 트리거 요소" },
    { name: "content", type: "ReactNode", desc: "팝오버 본문" },
    { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', desc: "위치" },
    { name: "align", type: '"start" | "center" | "end"', default: '"start"', desc: "가로 정렬 (top/bottom)" },
    { name: "closeOnOutside", type: "boolean", default: "true", desc: "외부 클릭 시 닫기" },
  ],
};

const TOOLTIP_DEF: ComponentDef = {
  id: "tooltip",
  ko: "툴팁",
  en: "Tooltip",
  desc: "호버 시 작은 정보. CSS group-hover로 작동, JS 불필요. focus 시에도 노출 (a11y).",
  intro:
    "마우스를 올리거나 키보드 포커스를 받았을 때 살짝 떠오르는 작은 정보 띠입니다. 본문 흐름을 거의 깨지 않으면서 \"이 아이콘은 무엇인지\", \"이 단어의 의미는 무엇인지\" 같은 짧은 보충 설명을 줍니다.",
  useCases: [
    "도구 모음 아이콘 버튼의 이름 안내",
    "표 헤더 옆의 \"이 지표가 무엇인지\" 정의",
    "약어·전문 용어의 풀이",
    "비활성 버튼의 비활성 이유 안내",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "버튼 위 툴팁",
      description: "호버 시 위로 작은 라벨. side=top/bottom/left/right.",
      preview: (
        <div className="flex flex-wrap items-center gap-6 py-2">
          <Tooltip content="자동 저장됩니다" side="top">
            <Button variant="ghost" iconOnly aria-label="저장"><Check className="h-4 w-4" /></Button>
          </Tooltip>
          <Tooltip content="삭제" side="top">
            <Button variant="ghost" iconOnly aria-label="삭제"><Trash2 className="h-4 w-4" /></Button>
          </Tooltip>
          <Tooltip content="더 보기" side="bottom">
            <Button variant="ghost" iconOnly aria-label="더 보기"><MoreHorizontal className="h-4 w-4" /></Button>
          </Tooltip>
        </div>
      ),
      prompt: `Tooltip — 호버 시 작은 라벨.
CSS group-hover/tt 사용 — JS 없음. focus-within에도 노출.
스타일: shadow X, 헤어라인 1px, 11.5px, px-2 py-1. whitespace-nowrap.
side: top/bottom/left/right.
사용처: iconOnly 버튼, 짧은 도움말, 숨겨진 키보드 단축키 표시.`,
      react: `<Tooltip content="자동 저장됩니다" side="top">
  <Button variant="ghost" iconOnly aria-label="저장">
    <Check className="h-4 w-4" />
  </Button>
</Tooltip>`,
    },
  ],
  props: [
    { name: "content", type: "ReactNode", desc: "툴팁 본문" },
    { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"', desc: "위치" },
    { name: "children", type: "ReactNode", desc: "트리거 (inline 요소 권장)" },
  ],
};

function ToastDemo() {
  const { toast, clear } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() => toast({ tone: "success", title: "저장됨", description: "변경사항이 저장되었습니다." })}
      >
        성공
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ tone: "warning", title: "확인 필요", description: "일부 항목이 비어있습니다." })}
      >
        경고
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ tone: "danger", title: "실패", description: "네트워크 오류가 발생했습니다." })}
      >
        위험
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: "기본 알림", description: "추가 정보 없이 간단한 메시지." })}
      >
        기본
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          // 빠르게 5개 누적 — stack 시연
          const tones: Array<"default" | "success" | "warning" | "danger"> = ["success", "warning", "danger", "default", "success"];
          tones.forEach((t, i) => {
            setTimeout(() => {
              toast({ tone: t, title: `알림 #${i + 1}`, description: `누적된 알림 (${t}).` });
            }, i * 200);
          });
        }}
      >
        5개 연속 (stack 시연)
      </Button>
      <Button variant="plain" tone="accent" onClick={clear}>전부 닫기</Button>
    </div>
  );
}

const TOAST_DEF: ComponentDef = {
  id: "toast",
  ko: "토스트 알림",
  en: "Toast",
  desc: "ToastProvider + useToast로 누적(stack) 알림. 4 tones × 6 positions. 자동 닫힘 + aria-live.",
  intro:
    "사용자의 행동에 대한 결과(성공·경고·오류 등)를 화면 한쪽 구석에 잠깐 떠올랐다 사라지는 작은 카드로 알립니다. 여러 알림이 짧은 시간에 쌓이면 자동으로 stack 되어 자연스럽게 표시됩니다. 본문 흐름을 끊지 않으면서 \"방금 무슨 일이 있었어요\"를 부드럽게 전합니다.",
  useCases: [
    "글 저장·삭제·복사 같은 단순 행동 후 결과 알림",
    "폼 제출 성공/실패 피드백",
    "백그라운드 작업(업로드·내보내기) 진행 알림",
    "에러 알림 (네트워크 실패·권한 부족 등)",
  ],
  examples: [
    {
      index: "01",
      badge: "useToast · stacking",
      title: "누적되는 알림 (Provider 패턴)",
      description: "useToast() 훅. 여러 알림이 우하단에 쌓임. 5개 연속 클릭으로 stack 시연.",
      preview: <ToastDemo />,
      prompt: `Toast 시스템 — Provider + 훅 패턴.
1) 앱 root를 <ToastProvider position="..." limit={5}> 로 감쌈
2) 자식 컴포넌트에서 const { toast } = useToast()
3) toast({ tone, title, description, duration? })

스타일 (각 toast):
- shadow X, tone별 헤어라인 (emerald/amber/red/zinc)
- 12.5~13.5px, p-4
- 자동 아이콘 (Info/Check/AlertTriangle/AlertOctagon)

Stack:
- top-* : 새 항목이 아래에 추가 (위로 push)
- bottom-* : 새 항목이 위에 추가 (아래로 push, 최신이 위)
- limit 초과 시 가장 오래된 것 자동 제거 (FIFO)

aria-live="polite" 자동 (스크린리더 비차단 알림).`,
      react: `// app root
<ToastProvider position="bottom-right" limit={5}>
  <App />
</ToastProvider>

// 사용처
function MyComponent() {
  const { toast, dismiss, clear } = useToast();
  return (
    <Button onClick={() => toast({
      tone: "success",
      title: "저장됨",
      description: "변경사항이 저장되었습니다.",
    })}>
      저장
    </Button>
  );
}

// 영구 (자동 안 닫힘)
toast({ title: "확인 필요", duration: 0 });

// 모두 닫기
clear();`,
    },
    {
      index: "02",
      badge: "단일 (저수준)",
      title: "Toast 컴포넌트 단독",
      description: "Provider 없이 단일 알림 — open/onOpenChange 제어. 단순 케이스용.",
      preview: <SingleToastDemo />,
      prompt: `Provider 없이 Toast 컴포넌트 단독 사용 — open / onOpenChange 직접 제어.
한 번에 하나의 알림만 필요하거나 이미 자체 상태 관리가 있을 때.

대부분의 경우 ToastProvider + useToast 권장 (누적 / 글로벌 호출 가능).`,
      react: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>저장</Button>

<Toast
  open={open}
  onOpenChange={setOpen}
  tone="success"
  title="저장됨"
/>`,
    },
  ],
  props: [
    { name: "<ToastProvider>", type: "—", desc: "앱 root에 한 번 설치 (children + position + limit + defaultDuration)" },
    { name: "useToast()", type: "() => { toast, dismiss, clear, toasts }", desc: "Provider 안에서 호출하는 훅" },
    { name: "toast(input)", type: "(input: ToastInput) => string", desc: "{tone?, title?, description?, duration?}. id 반환" },
    { name: "dismiss(id)", type: "(id: string) => void", desc: "특정 알림 닫기" },
    { name: "clear()", type: "() => void", desc: "모든 알림 닫기" },
    { name: "<Toast> (저수준)", type: "—", desc: "Provider 없이 단일 사용. open / onOpenChange 직접 제어" },
  ],
};

function SingleToastDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>단일 Toast 열기</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        tone="success"
        title="저장됨"
        description="단일 Toast 컴포넌트 — Provider 없이 사용."
        position="bottom-right"
      />
    </>
  );
}

const DROPDOWN_DEF: ComponentDef = {
  id: "dropdown",
  ko: "드롭다운 메뉴",
  en: "Dropdown Menu",
  desc: "트리거 클릭 → 메뉴 리스트. 외부 클릭 + ESC로 자동 닫힘. icon / separator / danger 지원.",
  intro:
    "어떤 버튼을 클릭하면 그 아래 짧은 액션 목록이 펼쳐지는 메뉴입니다. 각 항목엔 작은 아이콘을 붙이거나 위험한 액션(예: 삭제)을 빨간 톤으로 강조할 수 있고, 외부를 클릭하면 자연스럽게 닫힙니다.",
  useCases: [
    "리스트 행 우측의 \"⋯\" 더 보기 메뉴 (편집·공유·삭제)",
    "헤더의 사용자 프로필 메뉴 (설정·로그아웃)",
    "글·게시물의 액션 메뉴",
    "Admin 테이블의 행 단위 액션",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "액션 메뉴",
      description: "편집/공유/삭제 패턴. 위험 액션은 separator 후 빨간색.",
      preview: (
        <Dropdown
          trigger={<Button variant="ghost" iconOnly aria-label="더 보기"><MoreHorizontal className="h-4 w-4" /></Button>}
          align="end"
          items={[
            { label: "편집", icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => alert("편집") },
            { label: "공유하기", icon: <ExternalLink className="h-3.5 w-3.5" />, onClick: () => alert("공유") },
            { label: "설정", icon: <Settings className="h-3.5 w-3.5" />, onClick: () => alert("설정") },
            { label: "삭제", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => alert("삭제"), danger: true, separator: true },
          ]}
        />
      ),
      prompt: `Dropdown — 트리거 클릭 → 메뉴 리스트.
스타일: shadow X, 헤어라인 1px, py-1, min-w-[180px], 13.5px.
each item: px-3 py-1.5, hover bg-zinc-50.
- icon: 좌측 작은 아이콘 (h-3.5 w-3.5, zinc-500)
- separator: 위에 1px 구분선
- danger: 빨간 텍스트 + hover red bg
- href / onClick 둘 중 하나
- disabled: opacity-50

외부 클릭 + ESC 자동 닫힘.`,
      react: `<Dropdown
  trigger={<Button variant="ghost" iconOnly aria-label="더 보기">
    <MoreHorizontal className="h-4 w-4" />
  </Button>}
  align="end"
  items={[
    { label: "편집", icon: <Pencil className="h-3.5 w-3.5" />, onClick: edit },
    { label: "공유하기", href: "/share" },
    { label: "삭제", onClick: del, danger: true, separator: true },
  ]}
/>`,
    },
  ],
  props: [
    { name: "trigger", type: "ReactNode", desc: "클릭 트리거 (button 권장)" },
    { name: "items", type: "DropdownItem[]", desc: "{label, onClick?, href?, icon?, separator?, danger?, disabled?}[]" },
    { name: "align", type: '"start" | "end"', default: '"start"', desc: "트리거 기준 정렬" },
  ],
};

/* ================================================================
 * 폼·데이터 (0.11.0~)
 * FormField / DataTable / DatePicker / Combobox
 * ================================================================ */

function FormFieldDemo() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched && email.length > 0 && !email.includes("@") ? "이메일 형식이 올바르지 않습니다." : undefined;
  return (
    <div className="space-y-5 max-w-md">
      <FormField label="이름" htmlFor="ff-name" required hint="실명 또는 닉네임">
        <Input id="ff-name" placeholder="홍길동" />
      </FormField>
      <FormField label="이메일" htmlFor="ff-email" required error={error} hint="회신 받을 주소">
        <Input
          id="ff-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
          className={error ? "border-rose-500/60 dark:border-rose-400/40" : undefined}
        />
      </FormField>
      <FormField label="메모" htmlFor="ff-memo" hint="간단히 적어주세요. 1~3줄.">
        <Textarea id="ff-memo" rows={3} placeholder="..." />
      </FormField>
    </div>
  );
}

const FORM_FIELD_DEF: ComponentDef = {
  id: "form-field",
  ko: "폼 필드 (라벨·검증)",
  en: "Form Field",
  desc: "label / control / hint / error wrapper. 11px smallcaps 라벨, error 시 rose 톤. label-top / label-left 두 레이아웃.",
  intro:
    "입력 칸 하나 위·아래에 들어가는 \"라벨·도움말·에러 메시지\"를 한꺼번에 묶어 주는 wrapper입니다. 어떤 입력 칸이든(텍스트 / 여러 줄 / 드롭다운 / 날짜) 그 안에 자식으로 넣으면, 라벨과 에러가 동일한 톤으로 자동 정렬됩니다. 에러가 있을 땐 라벨도 rose 색으로 살짝 강조됩니다.",
  useCases: [
    "Talk·Contact 폼의 모든 입력 칸",
    "Admin 글 작성·설정 폼의 라벨링",
    "회원가입·로그인의 일관된 폼 톤",
    "긴 폼에서 \"이 칸이 잘못됐어요\"를 친절하게 알릴 때",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "기본 — 이메일 검증",
      description: "이메일에 @가 없으면 blur 시 error 표시. label·hint가 rose로 자동 전환.",
      preview: <FormFieldDemo />,
      prompt: `FormField — label / control / hint / error wrapper.
스타일: 박스 X. label = 11px uppercase smallcaps zinc-500.
- required: label 옆 emerald 점
- error: hint 자리에 rose-600 메시지 + label도 rose
- 자식 input의 border 색은 직접 className으로 (FormField는 wrapper만)
- layout="label-top" (default) / "label-left" (md:140px 라벨 좌측)

검증 패턴: onBlur로 touched 추적 → 에러 메시지 표시. controlled state.`,
      react: `<FormField label="이메일" htmlFor="email" required hint="회신 받을 주소" error={errors.email}>
  <Input id="email" type="email" value={email} onChange={...} />
</FormField>`,
    },
  ],
  props: [
    { name: "label", type: "ReactNode", desc: "라벨 (smallcaps)" },
    { name: "htmlFor", type: "string", desc: "자식 control id 매핑" },
    { name: "hint", type: "ReactNode", desc: "보조 설명" },
    { name: "error", type: "ReactNode", desc: "에러 메시지 (있으면 hint 대신 표시)" },
    { name: "required", type: "boolean", desc: "필수 표시 (emerald 점)" },
    { name: "layout", type: '"label-top" | "label-left"', default: '"label-top"', desc: "레이아웃" },
  ],
};

interface DataTableProject {
  name: string;
  year: number;
  sector: string;
  hits: number;
}

const DT_DATA: DataTableProject[] = [
  { name: "Preive 정수기 캠페인", year: 2018, sector: "F&B", hits: 320 },
  { name: "휴대폰 보조금 안내", year: 2017, sector: "통신", hits: 180 },
  { name: "마트 1+1 할인", year: 2019, sector: "유통", hits: 540 },
  { name: "택배 픽업 알림", year: 2020, sector: "물류", hits: 240 },
  { name: "스마트팜 모니터링", year: 2022, sector: "농업", hits: 95 },
  { name: "어린이 손짓 학습", year: 2026, sector: "교육", hits: 12 },
];

function DataTableDemo() {
  return (
    <DataTable
      data={DT_DATA}
      rowKey={(r) => r.name}
      columns={[
        { key: "name", header: "이름", sortable: true },
        { key: "sector", header: "섹터", sortable: true, width: "w-[100px]" },
        { key: "year", header: "연도", sortable: true, align: "right", width: "w-[80px]" },
        { key: "hits", header: "조회", sortable: true, align: "right", width: "w-[80px]" },
      ]}
      caption="Heritage 대표 사례 6개"
    />
  );
}

const DATA_TABLE_DEF: ComponentDef = {
  id: "data-table",
  ko: "데이터 테이블",
  en: "Data Table",
  desc: "정렬 가능한 표. 박스 X, 행 사이 1px 헤어라인. 헤더 smallcaps zinc-500. generic 타입.",
  intro:
    "데이터를 행과 열로 정리해서 보여 주고, 컬럼 헤더를 클릭하면 정렬되는 인터랙티브 표입니다. 박스로 둘러싸지 않고 행 사이에 1픽셀 선만 있어 안티 카드 톤과 잘 맞으며, 한 행을 클릭해 상세로 이동하는 것도 가능합니다.",
  useCases: [
    "Admin의 글·미디어·사용자 목록",
    "Heritage 사례를 정렬·필터해서 보는 표",
    "데이터 분석·대시보드의 결과 행",
    "긴 정보(스펙·로그·이력)의 정렬 가능한 정리",
  ],
  examples: [
    {
      index: "01",
      badge: "default",
      title: "정렬 가능 컬럼",
      description: "헤더 클릭 → asc/desc/none 순환. lucide ChevronUp/Down 자동 표시.",
      preview: <DataTableDemo />,
      prompt: `DataTable — 인터랙티브 표.
스타일:
- 헤더: 11.5px uppercase smallcaps zinc-500, bottom 1px 헤어라인
- 행: 1px 헤어라인 (zinc-200/70 — 더 옅게)
- shadow 없음 / 줄무늬 없음 — 안티 카드 행 미감
- 셀 13.5px, density tight/default/loose

정렬: column.sortable=true, key 기반 자동 비교 (number / string).
column.compare 커스텀 비교도 가능. row.onClick으로 인터랙티브 행.`,
      react: `<DataTable
  data={projects}
  columns={[
    { key: "name", header: "이름", sortable: true },
    { key: "year", header: "연도", sortable: true, align: "right" },
  ]}
  rowKey={(r) => r.name}
/>`,
    },
  ],
  props: [
    { name: "data", type: "T[]", desc: "행 데이터 (generic)" },
    { name: "columns", type: "DataTableColumn<T>[]", desc: "{key, header, cell?, sortable?, sortKey?, compare?, width?, align?}" },
    { name: "rowKey", type: "(row, i) => string", desc: "행 unique key (default: index)" },
    { name: "onRowClick", type: "(row) => void", desc: "행 클릭 (인터랙티브 행)" },
    { name: "empty", type: "ReactNode", default: '"데이터 없음"', desc: "빈 상태 메시지" },
    { name: "density", type: '"tight" | "default" | "loose"', default: '"default"', desc: "셀 패딩" },
    { name: "caption", type: "ReactNode", desc: "표 위 caption" },
    {
      name: "selection",
      type: "DataTableSelection<T>",
      desc: "{selectedKeys, onSelectionChange, selectKey?, bulkActions?, showCount?} — 지정 시 체크박스 컬럼 + 일괄 액션 영역 자동. SelectableTable wrapper 사용 권장.",
    },
  ],
};

interface SelectablePost {
  id: number;
  title: string;
  status: "published" | "draft" | "scheduled";
  views: number;
}
const SELECTABLE_POSTS: SelectablePost[] = [
  { id: 1, title: "안티 카드 v0.13 — 카드 안에 카드를 쌓지 않는다", status: "published", views: 1024 },
  { id: 2, title: "Heritage — 운영자의 깊이를 1인 랩으로", status: "published", views: 612 },
  { id: 3, title: "MVP는 카드가 아니라 행이다", status: "draft", views: 0 },
  { id: 4, title: "Talk 페이지를 다시 쓴 이유", status: "scheduled", views: 0 },
  { id: 5, title: "Pretendard 폰트와 안티 카드 톤", status: "published", views: 348 },
];
function SelectableTableDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <SelectableTable<SelectablePost>
        data={SELECTABLE_POSTS}
        selectKey={(p) => String(p.id)}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        columns={[
          { key: "title", header: "제목", sortable: true },
          { key: "status", header: "상태", sortable: true, width: "w-[100px]" },
          { key: "views", header: "조회", sortable: true, align: "right", width: "w-[80px]" },
        ]}
        bulkActions={(keys) => (
          <>
            <button
              type="button"
              className="rounded-md border border-emerald-500/40 px-2.5 py-1 text-[11.5px] text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-400"
              onClick={() => alert(`발행: ${keys.join(", ")}`)}
            >
              일괄 발행
            </button>
            <button
              type="button"
              className="rounded-md border border-zinc-300 px-2.5 py-1 text-[11.5px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
              onClick={() => setSelected([])}
            >
              선택 해제
            </button>
          </>
        )}
      />
      <p className="text-[12px] text-zinc-500">
        선택된 키: {selected.length > 0 ? selected.join(", ") : "(없음)"}
      </p>
    </div>
  );
}

const SELECTABLE_TABLE_DEF: ComponentDef = {
  id: "selectable-table",
  ko: "선택 가능 테이블",
  en: "SelectableTable",
  desc: "DataTable + 행 선택 (체크박스 + 일괄 액션 영역). admin 리스트의 일괄 처리에 적합.",
  intro:
    "여러 행을 한꺼번에 선택해 한 번의 액션으로 처리할 수 있게 해 주는 표입니다. 첫 컬럼에 체크박스가 자동으로 생기고, 행을 하나라도 고르면 표 위에 'N개 선택됨' 영역과 일괄 액션 버튼들이 나타납니다. admin의 글·미디어·사용자 일괄 처리에 가장 자연스러운 패턴입니다.",
  useCases: [
    "Admin 블로그 글 일괄 발행 / 휴지통 / 카테고리 변경",
    "미디어 라이브러리에서 여러 파일 일괄 삭제",
    "사용자 목록에서 일괄 권한 변경 / 일괄 비활성",
    "데이터 행을 골라 export·이메일 발송",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "체크박스 + 일괄 액션 영역",
      description:
        "row 선택 → 헤더 위 '일괄 발행 / 선택 해제' 등 액션 노출. 헤더 체크박스는 전체/일부/없음(mixed) 3-state.",
      preview: <SelectableTableDemo />,
      prompt: `SelectableTable — admin의 일괄 처리 표.

- 첫 컬럼: 체크박스 (h-4 w-4, border-zinc-300, 선택 시 bg-emerald-500 + Check 아이콘)
- 헤더 체크박스: 전체 선택. 일부만 선택된 상태는 mixed (Minus 아이콘)
- 선택된 행: bg-emerald-50/40 (light) / bg-emerald-500/[0.04] (dark) — 헤어라인 톤 유지
- 일괄 액션 영역: 헤더 위 border-b 헤어라인 박스, 'N개 선택됨' + 액션 버튼 슬롯
- 행 onClick과 체크박스 onClick은 stopPropagation으로 분리

uncontrolled (defaultSelectedKeys) / controlled (selectedKeys + onSelectionChange) 둘 다 지원.
selectKey는 안정적 unique key (DB id 권장 — 정렬·필터 시 선택 일관성).`,
      react: `const [keys, setKeys] = useState<string[]>([]);
<SelectableTable<Post>
  data={posts}
  selectKey={(p) => String(p.id)}
  selectedKeys={keys}
  onSelectionChange={setKeys}
  columns={[
    { key: "title", header: "제목", sortable: true },
    { key: "status", header: "상태", sortable: true },
  ]}
  bulkActions={(keys) => (
    <>
      <button onClick={() => publish(keys)}>일괄 발행</button>
      <button onClick={() => trash(keys)}>휴지통</button>
    </>
  )}
/>`,
    },
  ],
  props: [
    { name: "data / columns / rowKey / density / caption", type: "...", desc: "DataTable과 동일" },
    { name: "selectKey", type: "(row, i) => string", desc: "행 선택 unique key (default: rowKey > index)" },
    { name: "defaultSelectedKeys", type: "string[]", desc: "uncontrolled 초기 선택" },
    { name: "selectedKeys", type: "string[]", desc: "controlled 선택 키 (onSelectionChange 필수)" },
    { name: "onSelectionChange", type: "(keys: string[]) => void", desc: "선택 변경 콜백" },
    {
      name: "bulkActions",
      type: "ReactNode | (keys) => ReactNode",
      desc: "선택된 row 있을 때 헤더 위 액션 영역. 함수 형태면 현재 선택 키 받음.",
    },
    { name: "showCount", type: "boolean", default: "true", desc: "'N개 선택됨' 카운트 표시" },
  ],
};

function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="space-y-3">
      <DatePicker value={date} onChange={setDate} />
      <p className="text-[12.5px] text-zinc-500">
        선택값: {date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "(없음)"}
      </p>
    </div>
  );
}

const DATE_PICKER_DEF: ComponentDef = {
  id: "date-picker",
  ko: "날짜 선택",
  en: "Date Picker",
  desc: "Popover + 캘린더 grid. 1px 헤어라인 셀, smallcaps 요일, emerald 선택 / emerald-outline 오늘.",
  intro:
    "날짜를 직접 타이핑하지 않고, 트리거 버튼을 클릭해 펼쳐지는 미니 달력에서 한 날짜를 고르게 해 주는 컴포넌트입니다. 오늘 날짜는 살짝 강조되고 선택한 날짜는 emerald 색으로 표시되어 직관적입니다.",
  useCases: [
    "Talk 폼의 \"희망 시작일\" 입력",
    "Admin 글·미디어의 \"발행일\" 선택",
    "예약·일정 신청 폼",
    "데이터 필터의 시작/종료 날짜",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "기본 — 한글",
      description: "트리거 클릭 → popover. 요일 smallcaps, ←/→로 달 이동, 오늘·지우기 푸터.",
      preview: <DatePickerDemo />,
      prompt: `DatePicker — Popover 위 캘린더.
스타일: shadow X, 1px 헤어라인 popover. p-3, w-[280px].
- 요일 헤더: 10.5px uppercase smallcaps zinc-400
- 셀: h-7, 12.5px
- 선택일: bg-emerald-500 + text-white
- 오늘: border emerald-500/40 + text-emerald-700
- 푸터: 오늘 / 지우기 (1px 헤어라인 위)

locale="ko"|"en". disabledDate(date)=>boolean으로 비활성 날짜.`,
      react: `const [date, setDate] = useState<Date | null>(null);
<DatePicker value={date} onChange={setDate} />`,
    },
  ],
  props: [
    { name: "value", type: "Date | null", desc: "선택 날짜 (controlled)" },
    { name: "onChange", type: "(date: Date | null) => void", desc: "변경 콜백" },
    { name: "defaultViewDate", type: "Date", desc: "처음 열렸을 때 보이는 달" },
    { name: "disabledDate", type: "(date) => boolean", desc: "비활성 판정 함수" },
    { name: "placeholder", type: "string", default: '"날짜 선택"', desc: "트리거 placeholder" },
    { name: "width", type: "string", default: '"w-[160px]"', desc: "트리거 너비 (Tailwind)" },
    { name: "locale", type: '"ko" | "en"', default: '"ko"', desc: "요일·월 라벨" },
    { name: "disabled", type: "boolean", desc: "트리거 비활성" },
  ],
};

function ComboboxDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <Combobox
        value={value}
        onChange={setValue}
        placeholder="섹터 선택"
        options={[
          { value: "fnb", label: "F&B" },
          { value: "telecom", label: "통신·이동통신" },
          { value: "retail", label: "유통·마트" },
          { value: "logistics", label: "물류·택배" },
          { value: "agri", label: "농업·스마트팜" },
          { value: "edu", label: "교육·어린이" },
          { value: "fashion", label: "패션", disabled: true },
          { value: "auto", label: "자동차" },
          { value: "med", label: "의료" },
        ]}
      />
      <p className="text-[12.5px] text-zinc-500">선택값: {value ?? "(없음)"}</p>
    </div>
  );
}

const COMBOBOX_DEF: ComponentDef = {
  id: "combobox",
  ko: "콤보박스 (검색 select)",
  en: "Combobox",
  desc: "Input + Dropdown 결합. 검색 가능 select. ↑↓ 키보드, Enter 선택, ESC 닫기.",
  intro:
    "옵션이 많아 단순 드롭다운으로는 찾기 어려울 때, 입력 칸과 목록을 결합해 \"검색하면서 고르는\" 선택 컴포넌트입니다. 글자를 타이핑하면 일치 항목만 좁혀지고, 키보드 ↑↓·Enter로도 빠르게 고를 수 있습니다.",
  useCases: [
    "사이트 내 검색·자동완성 입력",
    "Heritage 섹터·태그 같이 옵션이 많은 필터",
    "회사·도시·국가처럼 항목이 수십 개인 선택",
    "Admin의 글 카테고리·태그 선택",
  ],
  examples: [
    {
      index: "01",
      badge: "interactive",
      title: "기본 — 검색 가능 옵션",
      description: "트리거 클릭 → 검색 input + 옵션 listbox. 선택 시 우측 emerald check.",
      preview: <ComboboxDemo />,
      prompt: `Combobox — 검색 가능 select.
스타일:
- 트리거: rounded-md 1px 헤어라인, 우측 ChevronDown(open 시 rotate-180), 클리어 X
- popover: 1px 헤어라인, 검색 input top + listbox bottom
- 옵션 활성(↑↓): bg-zinc-100, hover: bg-zinc-50, 선택: 우측 emerald Check

키보드: ↑↓ 이동 / Enter 선택 / ESC 닫기.
options에 disabled / searchText (label이 ReactNode일 때).`,
      react: `<Combobox
  value={brand}
  onChange={setBrand}
  options={[
    { value: "preive", label: "Preive (2016~2022)" },
    { value: "freeive", label: "Freeive (2023~)" },
  ]}
  placeholder="브랜드 선택"
/>`,
    },
  ],
  props: [
    { name: "options", type: "ComboboxOption[]", desc: "{value, label, searchText?, disabled?}" },
    { name: "value", type: "string | null", desc: "선택값 (controlled)" },
    { name: "onChange", type: "(value: string | null) => void", desc: "변경 콜백" },
    { name: "placeholder", type: "string", default: '"선택"', desc: "트리거 placeholder" },
    { name: "searchPlaceholder", type: "string", default: '"검색…"', desc: "검색 input placeholder" },
    { name: "empty", type: "ReactNode", default: '"결과 없음"', desc: "결과 없을 때" },
    { name: "width", type: "string", default: '"w-[220px]"', desc: "전체 너비" },
    { name: "clearable", type: "boolean", default: "true", desc: "X 버튼 표시" },
    { name: "disabled", type: "boolean", desc: "비활성화" },
  ],
};

const TEXT_LIST_DEF: ComponentDef = {
  id: "text-list",
  ko: "텍스트 리스트 (블릿·하이픈·번호)",
  en: "TextList",
  desc: "본문 안의 ul/ol 리스트. 6 variant — bullet · hyphen · number · number-padded · check · dot-accent.",
  intro:
    "본문 흐름 안에 들어가는 일반 글머리 리스트입니다. 카드나 행 박스가 아닌 단순한 ul/ol — 점·하이픈·번호·체크 같은 마커를 골라 쓸 수 있습니다. 블로그·About·약관 같은 텍스트 위주 페이지에서 가장 자주 쓰입니다.",
  useCases: [
    "블로그 본문의 \"세 가지 이유\" 같은 짧은 글머리 리스트",
    "About·정책 페이지의 항목 나열",
    "튜토리얼의 단계 (number / number-padded)",
    "Pricing의 플랜 포함 사항 (check)",
    "FAQ 답변 안의 작은 부연 리스트",
  ],
  examples: [
    {
      index: "01",
      badge: "bullet",
      title: "기본 — 점 (•) 글머리",
      description: "가장 일반적인 ul. 회색 점, 본문 글자색.",
      preview: (
        <TextList
          items={[
            "안티 카드 톤은 박스보다 공간으로 위계를 만든다.",
            "한 화면에 더 많은 정보를 자연스럽게 펼친다.",
            "본문 흐름을 끊지 않는 가벼운 마커가 핵심.",
          ]}
        />
      ),
      prompt: `본문 안에서 가장 자주 쓰는 글머리 리스트.
스타일:
- ul 시맨틱
- 회색 점(•) + 본문 글자색
- text-[14.5px] leading-relaxed
- space-y-1.5 (default density)`,
      react: `<TextList items={[
  "첫 번째 항목",
  "두 번째 항목",
  "세 번째 항목",
]} />`,
    },
    {
      index: "02",
      badge: "hyphen",
      title: "하이픈 (—) 마커",
      description: "분류·인용 톤의 가벼운 ul. lucide Minus 아이콘.",
      preview: (
        <TextList
          variant="hyphen"
          items={[
            "박스보다 공간",
            "장식보다 위계",
            "동질화보다 정체성",
          ]}
        />
      ),
      prompt: `bullet보다 가벼운 톤의 글머리. 분류·키워드 나열에 적합.
- variant="hyphen"
- lucide Minus h-3 w-3 strokeWidth=1.5`,
      react: `<TextList variant="hyphen" items={[
  "박스보다 공간",
  "장식보다 위계",
]} />`,
    },
    {
      index: "03",
      badge: "number",
      title: "번호 (1. 2. 3.) — 순서 있는 ol",
      description: "절차나 순서가 의미 있을 때. ol 시맨틱.",
      preview: (
        <TextList
          variant="number"
          items={[
            "사용자 인터뷰로 문제 정의",
            "최소 단위로 시안 제작",
            "한 화면에서 검증",
            "결과 기반으로 다시 짠다",
          ]}
        />
      ),
      prompt: `순서가 의미 있는 절차·단계.
- variant="number" → ol 자동
- "1. 2. 3." 자동 표시 (tabular-nums)`,
      react: `<TextList variant="number" items={[
  "문제 정의",
  "시안",
  "검증",
]} />`,
    },
    {
      index: "04",
      badge: "number-padded",
      title: "번호 (01 02 03) — 차분한 mono 톤",
      description: "원칙·매니페스토·연혁 같은 차분한 ol. 0 패딩 + font-mono.",
      preview: (
        <TextList
          variant="number-padded"
          items={[
            "박스 거부",
            "헤어라인",
            "smallcaps 라벨",
            "공간 (여백)",
            "행 레이아웃",
          ]}
        />
      ),
      prompt: `차분한 톤의 번호 — \"5원칙\" \"5단계\" 같은 매니페스토용.
- variant="number-padded"
- font-mono + tabular-nums + 12.5px
- 01 02 03 형태 (0 패딩)`,
      react: `<TextList variant="number-padded" items={[
  "박스 거부",
  "헤어라인",
  "smallcaps 라벨",
  "공간 (여백)",
  "행 레이아웃",
]} />`,
    },
    {
      index: "05",
      badge: "check",
      title: "체크 (✓) — emerald lucide",
      description: "긍정 강조 ul. 받는 의뢰·플랜 포함 사항 등.",
      preview: (
        <TextList
          variant="check"
          items={[
            "MVP 컨설팅 및 제작",
            "연구된 서비스의 기술 서포트",
            "공동 프로젝트 / 협업",
          ]}
        />
      ),
      prompt: `긍정·포함 강조.
- variant="check"
- lucide Check h-3.5 w-3.5 strokeWidth=1.5
- emerald-600 / dark emerald-400`,
      react: `<TextList variant="check" items={[
  "MVP 컨설팅 및 제작",
  "연구된 서비스의 기술 서포트",
]} />`,
    },
    {
      index: "06",
      badge: "dot-accent",
      title: "강조 점 (•) — emerald",
      description: "기본 점과 같지만 emerald 색. 강조된 글머리.",
      preview: (
        <TextList
          variant="dot-accent"
          items={[
            "anti-card v0.10.0 출시",
            "DataTable / FormField 추가",
            "TextList 6종 variant",
          ]}
        />
      ),
      prompt: `bullet과 같지만 emerald 색.
강조된 글머리 — 핵심 항목 나열, 릴리즈 노트 등.`,
      react: `<TextList variant="dot-accent" items={[
  "릴리즈 1",
  "릴리즈 2",
]} />`,
    },
  ],
  props: [
    { name: "items", type: "ReactNode[]", desc: "리스트 항목" },
    { name: "variant", type: '"bullet" | "hyphen" | "number" | "number-padded" | "check" | "dot-accent"', default: '"bullet"', desc: "마커 종류" },
    { name: "density", type: '"tight" | "default" | "loose"', default: '"default"', desc: "행 간격" },
  ],
};
