"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { BlogLoadOverlay } from "@/components/BlogLoadOverlay";
import { onIdle } from "@/lib/idle";
import { canPrefetch } from "@/lib/network";
import { scrollToId, scrollToTop } from "@/lib/scroll";
import { resizeLenis, startLenis } from "@/lib/start-lenis";

function sameOriginUrl(href: string) {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

export function PageFade() {
  const pathname = usePathname();
  const router = useRouter();
  const firstLoad = useRef(true);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    const begin = () => {
      if (cancelled) return;
      stop = startLenis();
    };
    const cancelIdle = onIdle(begin, 900);
    return () => {
      cancelled = true;
      cancelIdle();
      stop?.();
    };
  }, []);

  useEffect(() => {
    resizeLenis();
  }, [pathname]);

  useEffect(() => {
    const el = document.getElementById("page-fade");
    if (!el) return;
    el.classList.remove("page-leave");
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    scrollToTop({ immediate: true });
    el.classList.add("page-enter");
    if (pathname.startsWith("/blog")) el.classList.add("blog-enter");
    const id = window.setTimeout(() => {
      el.classList.remove("page-enter", "blog-enter");
    }, pathname.startsWith("/blog") ? 360 : 220);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!canPrefetch()) return;
    if (pathname !== "/") return;
    const prefetch = () => {
      router.prefetch("/blog");
    };
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(prefetch, 1200);
    return () => window.clearTimeout(id);
  }, [pathname, router]);

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
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;
      const url = sameOriginUrl(raw);
      if (!url || url.origin !== window.location.origin) return;

      const nextPath = url.pathname || "/";
      const here = window.location.pathname || "/";
      if (nextPath !== here || !url.hash) return;

      event.preventDefault();
      scrollToId(decodeURIComponent(url.hash.slice(1)));
      window.history.pushState(null, "", `${nextPath}${url.hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <BlogLoadOverlay />;
}
