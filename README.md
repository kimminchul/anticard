# @freeive/anti-card

> 랜딩에 최적화된 React UI 라이브러리.

**v0.12.1** · [Playground →](https://kimminchul.github.io/anticard/) · [English](./README.en.md)

---

## 왜 시작했나

AI로 웹 서비스를 만들어 보면 기능은 잘 돌아간다.
그런데 디자인은 어딘가 닮은 화면이 나오곤 한다.

왜일까.
인기 있는 UI 라이브러리들(shadcn/ui, Mantine, MUI, Ant Design, Chakra UI)을 살펴보면 대부분 admin·dashboard에 강점이 있다. Card, Sidebar, DataTable, Form.
이런 도구로 랜딩 화면을 만들 때 카드 안에 카드가 쌓이는 그림이 자주 보인다.

그렇다면 랜딩 화면에 좀 더 어울리는, AI가 더 잘 알아듣는 톤의 라이브러리가 따로 있어도 좋지 않을까.
그 가설로 출발한 OSS 프로젝트.

## 설치

```bash
npm install @freeive/anti-card
```

```tsx
import { HeroPattern, ListRow, StatList } from "@freeive/anti-card";
```

Tailwind 기반. dark/light 자동. 타이포 토큰 12개. 현재 컴포넌트 64개.
각 컴포넌트의 시각 미리보기·props·사용 예는 [Playground](https://kimminchul.github.io/anticard/)에 있다.

## 설계 원칙

1. 카드 박스 최소한으로 위계를 만들 수 있을까, 라는 질문에 다섯 가지 관찰을 모아 본 것.
2. 비개발자도 UI에 대한 선택이 명확해야 한다.
풀이는 사이트로.

[5 Principles →](https://freeive.com/anti-card)

## Playground

```bash
npm run dev:play   # http://localhost:5174
```

각 컴포넌트마다 디자인 / 프롬프트 / HTML / CSS / JS / React 6탭.
프롬프트 탭 텍스트는 Claude/Cursor에 복사해 같은 톤의 코드를 받아볼 수 있다.

## Status

0.x 베타. 시각과 기능을 안정화하는 단계.
1.0.0에서 API 동결과 npm publish 예정.
자세한 정책: [docs/VERSIONING.md](./docs/VERSIONING.md).

## 활용 사례

[freeive.com](https://freeive.com)이 첫 dogfooding.
메인·Heritage·Lab·Talk 4개 페이지가 모두 anti-card 컴포넌트로 만들어져 있다.

## 개발 (contributors)

```bash
git clone https://github.com/kimminchul/anticard.git
cd anticard
npm install --legacy-peer-deps

npm run dev:play   # vite playground
npm run dev        # tsup watch
npm run sync       # ../new-freeive에 sync
```

## 브랜치

- `main`: 안정. push 시 GitHub Actions가 Pages 자동 배포.
- `develop`: 작업. 안정화 후 main merge.

## Acknowledgements

- [lucide-react](https://lucide.dev) (ISC): playground 아이콘
- [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) (MIT): playground syntax highlight
- [Tailwind CSS](https://tailwindcss.com) (MIT): base

## License

MIT © Kim Min Chul (Freeive)
