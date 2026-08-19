import { cache } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function markdownToHtml(raw: string) {
  let text = raw.replace(/^---[\s\S]*?---\n/, "");
  const nav = text.search(/\n## Navigation\n/);
  if (nav !== -1) text = text.slice(0, nav);
  text = text.replace(/\[Entrar\][\s\S]*?\[Criar conta\][^\n]*/g, "");

  const lines = text.split("\n");
  const html: string[] = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    if (line.startsWith("# ")) html.push(`<h1>${inline(line.slice(2))}</h1>`);
    else if (line.startsWith("## ")) html.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.startsWith("### ")) html.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line.trim() === "") html.push("");
    else html.push(`<p>${inline(line)}</p>`);
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

function inline(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export const readLegal = cache((file: string) => {
  const path = join(process.cwd(), "content", "legal", file);
  return markdownToHtml(readFileSync(path, "utf8"));
});
