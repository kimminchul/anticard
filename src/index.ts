"use client";
// @freeive/anti-card
//
// 카드 안에 카드를 쌓지 않는 UI 시드.
// 자세한 원칙·로드맵: https://freeive.com/anti-card
//
// "use client" directive는 단일 entry에 createContext/useState 등 client-only 코드가
// 섞여 있어 Next.js Server Component에서 import 시 깨지는 문제를 해소합니다.
// children은 사용자가 자유롭게 server component로 유지할 수 있습니다.

export { Eyebrow } from "./components/eyebrow";
export type { EyebrowProps } from "./components/eyebrow";

export { SectionFrame } from "./components/section-frame";
export type { SectionFrameProps } from "./components/section-frame";

export { ListRow } from "./components/list-row";
export type { ListRowProps } from "./components/list-row";

export { Container } from "./components/container";
export type { ContainerProps } from "./components/container";

export { Hairline } from "./components/hairline";
export type { HairlineProps } from "./components/hairline";

export { HeroHeading } from "./components/hero-heading";
export type { HeroHeadingProps } from "./components/hero-heading";

export { SectionHeading } from "./components/section-heading";
export type { SectionHeadingProps } from "./components/section-heading";

export { Lead } from "./components/lead";
export type { LeadProps } from "./components/lead";

export { LinkRow } from "./components/link-row";
export type { LinkRowProps } from "./components/link-row";

export { Header } from "./components/header";
export type { HeaderProps, HeaderLink } from "./components/header";

export { Footer } from "./components/footer";
export type { FooterProps, FooterColumn } from "./components/footer";

export { Quote } from "./components/quote";
export type { QuoteProps } from "./components/quote";

export { Highlight } from "./components/highlight";
export type { HighlightProps } from "./components/highlight";

export { Image } from "./components/image";
export type { ImageProps } from "./components/image";

export { Video } from "./components/video";
export type { VideoProps } from "./components/video";

export { DefList } from "./components/definition-list";
export type { DefListProps, DefListItem } from "./components/definition-list";

export { StatList } from "./components/stat-list";
export type { StatListProps, StatItem } from "./components/stat-list";

export { Timeline } from "./components/timeline";
export type { TimelineProps, TimelineItem } from "./components/timeline";

export { Pill } from "./components/pill";
export type { PillProps } from "./components/pill";

export { HeroPattern } from "./components/hero-pattern";
export type { HeroPatternProps, HeroPatternCTA } from "./components/hero-pattern";

export { SectorsPattern } from "./components/sectors-pattern";
export type {
  SectorsPatternProps,
  SectorsPatternSector,
  SectorsPatternProject,
} from "./components/sectors-pattern";

export { TalkPattern } from "./components/talk-pattern";
export type { TalkPatternProps } from "./components/talk-pattern";

export { EmptyState } from "./components/empty-state";
export type { EmptyStateProps } from "./components/empty-state";

export { CTASection } from "./components/cta-section";
export type { CTASectionProps, CTASectionAction } from "./components/cta-section";

export { Banner } from "./components/banner";
export type { BannerProps } from "./components/banner";

export { Button } from "./components/button";
export type { ButtonProps } from "./components/button";

export { FeatureRow } from "./components/feature-row";
export type { FeatureRowProps, FeatureRowItem } from "./components/feature-row";

export { ClientLogos } from "./components/client-logos";
export type { ClientLogosProps, ClientLogoItem } from "./components/client-logos";

export { Testimonial } from "./components/testimonial";
export type { TestimonialProps, TestimonialAuthor } from "./components/testimonial";

export { StatBlock } from "./components/stat-block";
export type { StatBlockProps } from "./components/stat-block";

export { CaseStudy } from "./components/case-study";
export type {
  CaseStudyProps,
  CaseStudyMeta,
  CaseStudyOutcome,
} from "./components/case-study";

export { WaveCard } from "./components/wave-card";
export type { WaveCardProps } from "./components/wave-card";

export { FadeIn } from "./components/fade-in";
export type { FadeInProps } from "./components/fade-in";

export { HoverAccent } from "./components/hover-accent";
export type { HoverAccentProps } from "./components/hover-accent";

export { ScrollProgress } from "./components/scroll-progress";
export type { ScrollProgressProps } from "./components/scroll-progress";

export { Marquee } from "./components/marquee";
export type { MarqueeProps } from "./components/marquee";

export { Callout } from "./components/callout";
export type { CalloutProps } from "./components/callout";

export { FAQ } from "./components/faq";
export type { FAQProps, FAQItem } from "./components/faq";

export { PricingTable } from "./components/pricing-table";
export type { PricingTableProps, PricingPlan } from "./components/pricing-table";

export { PricingPattern } from "./components/pricing-pattern";
export type { PricingPatternProps } from "./components/pricing-pattern";

export { Steps } from "./components/steps";
export type { StepsProps, StepItem } from "./components/steps";

export { CompareTable } from "./components/compare-table";
export type {
  CompareTableProps,
  CompareColumn,
  CompareRow,
} from "./components/compare-table";

export { Grid } from "./components/grid";
export type { GridProps } from "./components/grid";

export { GridSystem, GridCol } from "./components/grid-system";
export type { GridSystemProps, GridColProps } from "./components/grid-system";

export { Input } from "./components/input";
export type { InputProps } from "./components/input";

export { Textarea } from "./components/textarea";
export type { TextareaProps } from "./components/textarea";

export { Select } from "./components/select";
export type { SelectProps, SelectOption } from "./components/select";

export { Checkbox, Radio } from "./components/checkbox-radio";
export type { CheckboxProps, RadioProps } from "./components/checkbox-radio";

export { Gallery } from "./components/gallery";
export type { GalleryProps, GalleryItem } from "./components/gallery";

export { Carousel } from "./components/carousel";
export type { CarouselProps, CarouselSlide } from "./components/carousel";

// 내비게이션
export { Breadcrumb } from "./components/breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./components/breadcrumb";

export { Pagination } from "./components/pagination";
export type { PaginationProps } from "./components/pagination";

export { Tabs } from "./components/tabs";
export type { TabsProps, TabItem } from "./components/tabs";

// 오버레이
export { Tooltip } from "./components/tooltip";
export type { TooltipProps } from "./components/tooltip";

export { Popover } from "./components/popover";
export type { PopoverProps } from "./components/popover";

export { Dialog } from "./components/dialog";
export type { DialogProps } from "./components/dialog";

export { Drawer } from "./components/drawer";
export type { DrawerProps } from "./components/drawer";

export { Dropdown } from "./components/dropdown";
export type { DropdownProps, DropdownItem } from "./components/dropdown";

export { Toast, ToastProvider, useToast } from "./components/toast";
export type {
  ToastProps,
  ToastTone,
  ToastPosition,
  ToastInput,
  ToastProviderProps,
} from "./components/toast";

// 폼 + 데이터 (0.11.0~)
export { FormField } from "./components/form-field";
export type { FormFieldProps } from "./components/form-field";

export { DataTable } from "./components/data-table";
export type {
  DataTableProps,
  DataTableColumn,
  DataTableSelection,
  DataTableExpansion,
} from "./components/data-table";
export { SelectableTable } from "./components/selectable-table";
export type { SelectableTableProps } from "./components/selectable-table";
export { ExpandableTable } from "./components/expandable-table";
export type { ExpandableTableProps } from "./components/expandable-table";
export { EditableTable } from "./components/editable-table";
export type {
  EditableTableProps,
  EditableTableColumn,
} from "./components/editable-table";
export { GroupedTable } from "./components/grouped-table";
export type { GroupedTableProps } from "./components/grouped-table";

export { TextList } from "./components/text-list";
export type { TextListProps, TextListVariant } from "./components/text-list";

export { DatePicker } from "./components/date-picker";
export type { DatePickerProps } from "./components/date-picker";

export { Combobox } from "./components/combobox";
export type { ComboboxProps, ComboboxOption } from "./components/combobox";

export { cn } from "./utils/cn";

export { typography } from "./tokens/typography";
export type { TypographyToken } from "./tokens/typography";

export { motion } from "./tokens/motion";
export type { MotionDuration, MotionEasing } from "./tokens/motion";
