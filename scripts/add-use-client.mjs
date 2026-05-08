/**
 * dist/index.js + dist/index.cjs 최상단에 "use client" directive prepend.
 *
 * tsup 8.5.x는 source의 "use client"를 dist에 보존하지 않습니다.
 * Next.js Server Component에서 라이브러리 import 시 createContext (ToastProvider 등)가
 * 깨지는 문제를 해소하기 위해 빌드 후 후처리.
 */
import fs from "node:fs/promises";
import path from "node:path";

const TARGETS = ["dist/index.js", "dist/index.cjs"];
const DIRECTIVE = '"use client";\n';

for (const rel of TARGETS) {
  const file = path.resolve(rel);
  let content;
  try {
    content = await fs.readFile(file, "utf-8");
  } catch (err) {
    console.warn(`[use-client] skip (not found): ${rel}`);
    continue;
  }
  if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
    console.log(`[use-client] already present: ${rel}`);
    continue;
  }
  await fs.writeFile(file, DIRECTIVE + content);
  console.log(`[use-client] prepended: ${rel}`);
}
