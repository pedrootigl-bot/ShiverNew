"use client";

import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function cleanPath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function blogPostPath(path: string) {
  return /^\/blog\/[^/]+$/.test(cleanPath(path));
}

function blogIndexPath(path: string) {
  return cleanPath(path) === "/blog";
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

function waitImage(img: HTMLImageElement) {
  const settle = async () => {
    if (typeof img.decode === "function") {
      try {
        await img.decode();
      } catch {
        /* ignore decode errors */
      }
    }
  };
  if (img.complete) return settle();
  return new Promise<void>((resolve) => {
    const done = () => {
      void settle().then(resolve);
    };
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

function waitFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function waitMs(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitSelector(selector: string, timeout = 4000) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(selector)) {
      resolve();
      return;
    }
    const started = performance.now();
    const id = window.setInterval(() => {
      if (document.querySelector(selector) || performance.now() - started > timeout) {
        window.clearInterval(id);
        resolve();
      }
    }, 40);
  });
}

function visibleContentImages() {
  const root = document.getElementById("conteudo");
  if (!root) return [];
  return [...root.querySelectorAll("img")].filter((img) => {
    const rect = img.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1 && rect.bottom > 0 && rect.top < window.innerHeight + 80;
  });
}

async function waitPageReady(path: string) {
  await waitFrame();
  await waitSelector(blogIndexPath(path) ? ".blog-feed, .blog-page" : ".post-page, .post-cover");
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }
  await Promise.race([
    Promise.all(visibleContentImages().map(waitImage)),
    waitMs(2800),
  ]);
  await waitFrame();
}

export function BlogLoadOverlay() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [listing, setListing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const pendingRef = useRef<string | null>(null);
  const openedAt = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("blog-loading", open);
    return () => html.classList.remove("blog-loading");
  }, [open]);

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
      if (!nextPath) return;
      const toIndex = blogIndexPath(nextPath);
      if (!toIndex && !blogPostPath(nextPath)) return;
      if (cleanPath(nextPath) === cleanPath(window.location.pathname)) return;
      pendingRef.current = cleanPath(nextPath);
      openedAt.current = performance.now();
      setListing(toIndex);
      setProgress(12);
      setOpen(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const tick = window.setInterval(() => {
      setProgress((value) => (value >= 82 ? value : value + (82 - value) * 0.09));
    }, 140);
    return () => window.clearInterval(tick);
  }, [open]);

  useEffect(() => {
    if (!open || !pendingRef.current) return;
    if (cleanPath(pathname) !== pendingRef.current) return;

    let cancelled = false;
    const close = () => {
      if (cancelled) return;
      pendingRef.current = null;
      setOpen(false);
      setProgress(0);
    };

    const finish = async () => {
      const remain = Math.max(0, 420 - (performance.now() - openedAt.current));
      await waitMs(remain);
      if (cancelled) return;
      await waitPageReady(pathname);
      if (cancelled) return;
      setProgress(100);
      window.setTimeout(close, 240);
    };

    void finish();
    return () => {
      cancelled = true;
    };
  }, [open, pathname]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      pendingRef.current = null;
      setOpen(false);
      setProgress(0);
    }, 12000);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!mounted || !open) return null;

  const percent = Math.max(0, Math.min(100, progress));

  return createPortal(
    <div
      className="blog-load-overlay"
      role="dialog"
      aria-modal="true"
      aria-busy="true"
      aria-labelledby="blog-load-title"
      style={{ "--blog-load-p": String(percent / 100) } as CSSProperties}
    >
      <div className="blog-load-card">
        <img src="/icon.png" alt="" width={40} height={40} />
        <p id="blog-load-title">{listing ? "Abrindo os artigos" : "Abrindo o artigo"}</p>
        <small>Só um instante</small>
        <div
          className="blog-load-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
        >
          <span />
        </div>
      </div>
    </div>,
    document.body,
  );
}
