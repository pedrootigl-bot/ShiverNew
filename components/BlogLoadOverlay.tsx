"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function blogPostPath(path: string) {
  const clean = path.replace(/\/$/, "") || "/";
  return /^\/blog\/[^/]+$/.test(clean);
}

function sameOriginPath(href: string) {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url.pathname;
  } catch {
    return null;
  }
}

export function BlogLoadOverlay() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      if (link.hasAttribute("data-nav-toggle")) return;

      const raw = link.getAttribute("href");
      if (!raw) return;
      const nextPath = sameOriginPath(raw);
      if (!nextPath || !blogPostPath(nextPath)) return;
      if (nextPath.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "")) return;
      setOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), 12000);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="blog-load-overlay" role="dialog" aria-modal="true" aria-busy="true" aria-labelledby="blog-load-title">
      <div className="blog-load-card">
        <img src="/icon.png" alt="" width={40} height={40} />
        <p id="blog-load-title">Abrindo o artigo</p>
        <small>Só um instante</small>
        <span className="blog-load-spin" aria-hidden />
      </div>
    </div>,
    document.body,
  );
}
