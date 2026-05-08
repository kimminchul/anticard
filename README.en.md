# @freeive/anti-card

> **An end-user UI library + AI Skill.**
> The market has 20 admin libraries and 0 end-user libraries. That empty space.

**Current version: 0.10.0**
🎯 **[View Playground → kimminchul.github.io/anticard](https://kimminchul.github.io/anticard/)**

> [한국어 README](./README.md)

---

## The market reality

`shadcn/ui` · `Mantine` · `MUI` · `Ant Design` · `Chakra UI` —
most popular UI libraries are **actually admin/dashboard libraries**.
Card · Sidebar · DataTable · Form-centric.

Libraries for **end-user screens** like landing, marketing, and content sites are scarce.
**Bootstrap** comes close but feels too rigid for modern sites.

→ anti-card fills that empty space.

## Admin vs End-user

| | Admin | End-user (anti-card territory) |
|---|---|---|
| Priority | Information density, efficiency | Emotion, impression, spaciousness |
| Card boxes | OK (clear container) | Suffocating — content is form |
| Heading | Small | Large, signature |
| Labels | form labels | smallcaps eyebrow |
| Rhythm | Even grid | Big breath, lists |
| Interaction | Quick clicks | Smooth transition·scroll |

Details: [Admin vs End-user](https://freeive.com/anti-card/admin-vs-end-user)

## Two layers

### Layer 1 — AI Skill (the real product)

Install as a plugin skill on AI coding tools like Claude · Cursor.
The AI references anti-card principles, patterns, and HTML when generating screens.

```bash
# 0.0.x ~ 0.9.x: manual setup
cat node_modules/@freeive/anti-card/skill/CLAUDE.md > CLAUDE.md
cat node_modules/@freeive/anti-card/skill/cursorrules > .cursorrules

# 1.0.0+ (planned): claude skill install @freeive/anti-card
```

Zero code possible. Same tone for React/Vue/Svelte/plain HTML.
**Result: AI-generated screens that don't look AI-generated.**

Details: [AI Skill](https://freeive.com/anti-card/ai-skill)

### Layer 2 — React components (51)

```bash
npm install @freeive/anti-card
```

```tsx
import {
  HeroPattern, SectionFrame, ListRow, Eyebrow, StatList, ClientLogos
} from "@freeive/anti-card";

<HeroPattern
  size="hero"
  eyebrow="Heritage · 2016 — Now"
  title="Carrying the depth of big projects into a solo lab."
  ctas={[{ label: "Talk", href: "/talk", tone: "accent" }]}
/>

<StatList items={[
  { value: "10+", label: "Years" },
  { value: "30+", label: "Clients" },
  { value: "150+", label: "Projects" },
]} />
```

#### Components by category

| Category | Components |
|---|---|
| **Layout** | Container · Hairline · Header · Footer · SectionFrame · Grid · GridSystem (12 col) |
| **Typography** | Eyebrow · HeroHeading · SectionHeading · Lead · Quote · Highlight |
| **List** | ListRow · DefList · StatList · Timeline · CompareTable |
| **Action** | LinkRow · Button (Primary/Secondary) · CTASection · Banner |
| **Content blocks** | Callout · FAQ · PricingTable · Steps · FeatureRow |
| **Trust / Evidence** | ClientLogos · Testimonial · StatBlock · CaseStudy |
| **Media** | Image · Video · Gallery |
| **Interaction** | WaveCard · FadeIn · HoverAccent · ScrollProgress · Marquee |
| **Form** | Input · Textarea · Select · Checkbox · Radio · Pill |
| **Page patterns** | HeroPattern · SectorsPattern · TalkPattern · EmptyState · PricingPattern |
| **Utils** | `cn()` · `typography` tokens |

Each component's props/usage is in the **[Playground](https://kimminchul.github.io/anticard/)** —
visual preview + 6 tabs (Design / Prompt / HTML / CSS / JS / React).

> What's missing in the market is Layer 1 (AI design guidance).
> Layer 2 component libraries themselves already over-saturated. anti-card differentiates by **tone (5 principles)**.

## The 5 anti-card principles

Five ways to create hierarchy without card boxes:

1. **Space** — 100~160px gaps between sections
2. **Contrast** — text size, weight, and color steps
3. **Hairline** — 1px lines feel lighter than boxes
4. **Smallcaps labels** — Eyebrow
5. **Rows over grids** — rows instead of card grids

Details: [Manifesto](https://freeive.com/anti-card/manifesto) · [Why not cards](https://freeive.com/anti-card/why-not-cards)

## Playground

Visual previews of components + 6 tabs (Design / Prompt / HTML / CSS / JS / React).

- **Public URL**: **[kimminchul.github.io/anticard](https://kimminchul.github.io/anticard/)** (GitHub Pages, auto-deployed on main push)
- **Local**: `npm run dev:play` → http://localhost:5174

Each component page includes an **AI prompt** — copy it into Claude/Cursor to generate code in the same tone.

GitHub Pages build (local test):

```bash
# bash / git bash
GH_PAGES=1 npm run build:play && npm run preview:play

# PowerShell
$env:GH_PAGES="1"; npm run build:play; npm run preview:play
```

## What's New

See [CHANGELOG.md](./CHANGELOG.md) for the full change history.

**Typography token system**
Semantic tokens (`displayLg / display / h2 / h3 / h4 / body / lead / leadLarge / small / eyebrow / eyebrowAccent / code`).
All components reference these tokens — adjust the entire site tone from a single source.

**5 principles consistently applied**
All components self-verify the 5 principles: box rejection + hairlines + smallcaps + space + rows.

**Dogfooding** — [freeive.com](https://freeive.com) is itself the living proof:
- Main — `HeroPattern` + `ListRow` (rejecting the card grid)
- Heritage — `StatList` + `ClientLogos` + `WaveCard` + `ListRow`
- Talk — `TalkPattern` (accept/decline checklist)

## ⚠️ Status

**0.x beta.** Visual/functional stabilization phase.
API freeze and npm publish planned at 1.0.0 — see [docs/VERSIONING.md](./docs/VERSIONING.md).

## Live cases

- **[freeive.com](https://freeive.com)** — the site itself is the first case (all 4 pages use anti-card)
- Details: `freeive.com/anti-card`

## Development (contributors)

```bash
git clone https://github.com/kimminchul/anticard.git
cd anticard
npm install --legacy-peer-deps

# Isolated dev (vite playground :5174)
npm run dev:play

# tsup watch (library auto-rebuild only)
npm run dev

# Sync to site (../new-freeive)
npm run sync
```

## Roadmap

- **v0.x (current)** — Token system + Playground on GitHub Pages, components continuously expanding
- **v1.0.0** — API freeze, npm publish, solo-lab identity content + first external use cases
- **v1.1.0+** — Tailwind preset packaged, headless mode (without Tailwind)
- **v2.0.0+** — AI Skill formal install command (`claude skill install`), Vue/Svelte ports

## Acknowledgements

- [**lucide-react**](https://lucide.dev) — ISC License · playground icons (Sun/Moon/ArrowUpRight/ChevronDown). 1px stroke aesthetic matches anti-card's hairline principle.
- [**prism-react-renderer**](https://github.com/FormidableLabs/prism-react-renderer) — MIT License · playground code syntax highlighting.
- [**Tailwind CSS**](https://tailwindcss.com) — MIT License · base for the 5 principles.

## Branch policy

- **`main`** — stable deploy branch. GitHub Actions auto-deploys to GitHub Pages on push.
- **`develop`** — work branch. New components / experiments live here, merged to main when stable.

## License

MIT — © Kim Min Chul (Freeive)
