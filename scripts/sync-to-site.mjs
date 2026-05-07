#!/usr/bin/env node
/**
 * dev 사이클 헬퍼: 패키지 build → pack → 사이트(`../new-freeive`)에 install.
 *
 * 사용:  cd anti-card && npm run sync
 *
 * 매번 publish 없이도 사이트에 변경사항 반영. 사이트 dev 서버는 hot reload.
 *
 * Turbopack이 file:.. / npm link symlink를 못 따라가서 tarball 방식 사용.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PKG = resolve(__dirname, "..");
const SITE = resolve(PKG, "../new-freeive");

if (!existsSync(SITE)) {
  console.error(`[sync] site dir not found: ${SITE}`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(resolve(PKG, "package.json"), "utf8"));
const version = pkg.version;
const tgzName = `freeive-anti-card-${version}.tgz`;
const tgzPath = resolve(PKG, tgzName);

// 이전 tgz 청소 (다른 버전 잔여물)
for (const file of readdirSync(PKG)) {
  if (file.startsWith("freeive-anti-card-") && file.endsWith(".tgz")) {
    unlinkSync(resolve(PKG, file));
  }
}

// 1. build
console.log(`[sync] 1/3 build`);
execSync("npm run build", { cwd: PKG, stdio: "inherit" });

// 2. pack
console.log(`[sync] 2/3 pack`);
execSync("npm pack", { cwd: PKG, stdio: "inherit" });

if (!existsSync(tgzPath)) {
  console.error(`[sync] tarball not produced: ${tgzPath}`);
  process.exit(1);
}

// 3. install in site
console.log(`[sync] 3/3 install to ${SITE}`);
const installCmd =
  process.platform === "win32"
    ? `npm install "${tgzPath.replace(/\\/g, "/")}" --no-save --legacy-peer-deps`
    : `npm install "${tgzPath}" --no-save --legacy-peer-deps`;
execSync(installCmd, { cwd: SITE, stdio: "inherit" });

console.log(`[sync] done. anti-card@${version} → ${SITE}`);
