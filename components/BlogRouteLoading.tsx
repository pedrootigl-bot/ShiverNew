"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogLoadingScreen } from "@/components/BlogLoadingScreen";

function sameOriginUrl(href: string) {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function isBlogPath(path: string) {
  return path === "/blog" || path.startsWith("/blog/");
}

export function BlogRouteLoading() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      if (link.hasAttribute("data-nav-toggle")) return;

      const raw = link.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;
      const url = sameOriginUrl(raw);
      if (!url || url.origin !== window.location.origin) return;

      const nextPath = url.pathname || "/";
      const here = window.location.pathname || "/";
      if (!isBlogPath(nextPath) || nextPath === here) return;
      setOpen(true);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), 12000);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  return (
    <div className="blog-load-overlay">
      <BlogLoadingScreen />
    </div>
  );
}
