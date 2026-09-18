const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const previewRoot = path.join(process.cwd(), ".preview-static");
const indexAtRoot = path.join(previewRoot, "index.html");
if (!fs.existsSync(indexAtRoot)) {
  const nested = fs.existsSync(previewRoot)
    ? fs.readdirSync(previewRoot, { withFileTypes: true }).find((e) => e.isDirectory())
    : null;
  const nestedIndex = nested
    ? path.join(previewRoot, nested.name, "index.html")
    : null;
  if (!nestedIndex || !fs.existsSync(nestedIndex)) {
    console.error("Rode npm run build antes do preview.");
    process.exit(1);
  }
}

const child = spawn(
  "npx",
  ["--yes", "serve", ".preview-static", "-p", "4173"],
  { stdio: "inherit", shell: true, cwd: process.cwd() },
);

child.on("exit", (code) => process.exit(code ?? 0));
