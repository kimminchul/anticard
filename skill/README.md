# anti-card skill files

이 디렉토리는 AI 코딩 도구가 안티 카드 톤으로 화면을 만들도록
디자인 결정 기준을 주입하는 system prompt 파일들입니다.

## 사용법

### Claude Code

`CLAUDE.md` 파일을 사용 중인 프로젝트 루트의 `CLAUDE.md` 에 복사 또는 붙여넣기.
또는 한 섹션으로 추가.

### Cursor

`cursorrules` 파일을 사용 중인 프로젝트 루트의 `.cursorrules` 에 복사 또는 붙여넣기.

### 다른 AI 도구

`CLAUDE.md` 또는 `cursorrules` 의 내용을 system prompt 영역에 붙여넣기.

## 파일

- `CLAUDE.md` — Claude Code용 (한국어 + 코드 예시)
- `cursorrules` — Cursor용 (영문 system prompt)

## NPM 패키지에 포함됨

`npm install @freeive/anti-card` 시 `node_modules/@freeive/anti-card/skill/`
경로에서 직접 읽을 수 있습니다.

```bash
# 예시
cat node_modules/@freeive/anti-card/skill/CLAUDE.md > CLAUDE.md
cat node_modules/@freeive/anti-card/skill/cursorrules > .cursorrules
```

0.1.0 이후엔 `claude skill install @freeive/anti-card` 같은 정식 install 명령
지원 검토 (TBD).

## 자세히

- 정체성: [Manifesto](https://freeive.com/anti-card/manifesto)
- AI Skill 작동 원리: [AI Skill](https://freeive.com/anti-card/ai-skill)
