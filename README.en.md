# @freeive/anti-card

> A React UI library tuned for landing pages.

**v0.12.1** · [Playground →](https://kimminchul.github.io/anticard/) · [한글 README](./README.md)

---

## Why this exists

Build a web service with AI tools and the features work fine.
The design, though, often feels off. Pages start to look alike.

Why?
Look at the popular UI libraries (shadcn/ui, Mantine, MUI, Ant Design, Chakra UI) and you'll notice they're strong at admin and dashboard work. Card, Sidebar, DataTable, Form.
Use those tools for a landing page, and you often end up with cards stacked inside cards.

So maybe a library tuned for landing pages, one that AI can read more easily, would be useful.
That's the hypothesis behind this OSS project.

## Install

```bash
npm install @freeive/anti-card
```

```tsx
import { HeroPattern, ListRow, StatList } from "@freeive/anti-card";
```

Tailwind based. Dark/light auto. 12 typography tokens. Currently 64 components.
Visual previews, props, and usage live in the [Playground](https://kimminchul.github.io/anticard/).

## Design principles

A question and five observations. Can hierarchy work without card boxes?
Longer form on the site.

[5 Principles →](https://freeive.com/anti-card)

## Playground

```bash
npm run dev:play   # http://localhost:5174
```

Each component page has six tabs: design, prompt, HTML, CSS, JS, React.
The prompt tab text is meant to be copied into Claude or Cursor to generate code in the same tone.

## Status

0.x beta. Stabilizing visuals and APIs.
1.0.0 will freeze the public API and publish to npm.
Policy: [docs/VERSIONING.md](./docs/VERSIONING.md).

## In the wild

[freeive.com](https://freeive.com) is the first dogfooding case.
All four pages (Main, Heritage, Lab, Talk) are built with anti-card.

## Development (contributors)

```bash
git clone https://github.com/kimminchul/anticard.git
cd anticard
npm install --legacy-peer-deps

npm run dev:play   # vite playground
npm run dev        # tsup watch
npm run sync       # sync to ../new-freeive
```

## Branches

- `main`: stable. GitHub Actions auto-deploys Pages on push.
- `develop`: working. Merge to main when stable.

## Acknowledgements

- [lucide-react](https://lucide.dev) (ISC): playground icons
- [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) (MIT): playground syntax highlighting
- [Tailwind CSS](https://tailwindcss.com) (MIT): base

## License

MIT © Kim Min Chul (Freeive)
