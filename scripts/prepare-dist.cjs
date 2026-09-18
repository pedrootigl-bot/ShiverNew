const fs = require("fs");
const path = require("path");

const BASE_PATH = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

/**
 * Next static export às vezes grava segmentos RSC aninhados
 * (`__next.$d$locale/__PAGE__.txt`). Flatten → nomes flat que o client pede.
 */
function flattenRscSegmentDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      flattenNestedNextDir(full, dir, [entry.name]);
      fs.rmSync(full, { recursive: true, force: true });
      continue;
    }

    flattenRscSegmentDirs(full);
  }
}

function flattenNestedNextDir(currentDir, outputDir, nameParts) {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      flattenNestedNextDir(full, outputDir, [...nameParts, entry.name]);
      continue;
    }
    const flatName = [...nameParts, entry.name].join(".");
    fs.copyFileSync(full, path.join(outputDir, flatName));
  }
}

/** next/image às vezes não prefixa public/ com basePath no HTML exportado */
function rewritePublicAssetPaths(filePath) {
  if (!BASE_PATH) return;
  let content = fs.readFileSync(filePath, "utf8");
  const before = content;
  content = content.replace(
    /(src|href)=(["'])\/(?![^/"']*\/)(media|icon\.png|og\.png)/g,
    `$1=$2${BASE_PATH}/$3`,
  );
  content = content.replace(
    /url\((["']?)\/(?![^/"')]*\/)(media)\//g,
    `url($1${BASE_PATH}/$2/`,
  );
  content = content.replace(
    /"\/(media)\//g,
    `"${BASE_PATH}/$1/`,
  );
  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
  }
}

function walkFiles(dir, exts, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, exts, onFile);
      continue;
    }
    if (exts.some((ext) => entry.name.endsWith(ext))) onFile(full);
  }
}

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");
const previewRoot = path.join(root, ".preview-static");

if (!fs.existsSync(outDir)) {
  console.error("Pasta out/ não encontrada. Rode `next build` antes.");
  process.exit(1);
}

fs.rmSync(distDir, { recursive: true, force: true });
copyDir(outDir, distDir);
flattenRscSegmentDirs(distDir);

if (BASE_PATH) {
  walkFiles(distDir, [".html", ".txt", ".js", ".css"], rewritePublicAssetPaths);
}

const required = ["index.html", ".htaccess", "_next", "media"];
for (const rel of required) {
  if (!fs.existsSync(path.join(distDir, rel))) {
    console.error(`Arquivo/pasta obrigatória ausente em dist/: ${rel}`);
    process.exit(1);
  }
}

fs.rmSync(previewRoot, { recursive: true, force: true });
if (BASE_PATH) {
  const previewTarget = path.join(previewRoot, BASE_PATH.replace(/^\//, ""));
  fs.mkdirSync(previewTarget, { recursive: true });
  copyDir(distDir, previewTarget);
} else {
  copyDir(distDir, previewRoot);
}

const sample = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const nextPrefix = BASE_PATH ? `${BASE_PATH}/_next/` : "/_next/";
if (!sample.includes(nextPrefix) && !sample.includes("/_next/")) {
  console.warn(`AVISO: HTML sem referência a _next/ — confira o build.`);
}

const uploadHint = BASE_PATH
  ? `public_html${BASE_PATH}/`
  : "public_html/";

console.log("Deploy estático pronto em dist/");
console.log(`Hostinger: envie o CONTEÚDO de dist/ para ${uploadHint}`);
console.log(
  BASE_PATH
    ? `Preview: npm run preview:static → http://localhost:4173${BASE_PATH}/`
    : "Preview: npm run preview:static → http://localhost:4173/",
);
