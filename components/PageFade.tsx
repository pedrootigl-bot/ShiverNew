"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { PostPage } from "@/components/PostPage";
import { posts } from "@/lib/blog";
import { warmBlogCache } from "@/lib/blog-bodies";

function sameOriginUrl(href: string) {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function jumpTo(top: number) {
  window.scrollTo({ top, left: 0, behavior: "auto" });
}

export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("page-leave");
    if (!firstLoad.current) jumpTo(0);
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (pathname.startsWith("/blog")) return;
    el.classList.add("page-enter");
    const id = window.setTimeout(() => el.classList.remove("page-enter"), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    warmBlogCache();
    void PostPage;
    const prefetch = () => {
      router.prefetch("/legal/terms");
      router.prefetch("/legal/privacy");
      router.prefetch("/legal/terms-south-africa");
      router.prefetch("/blog");
      for (const post of posts) router.prefetch(`/blog/${post.slug}`);
    };
    prefetch();
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(prefetch, { timeout: 400 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(prefetch, 1);
    return () => window.clearTimeout(id);
  }, [router]);

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
      const id = decodeURIComponent(url.hash.slice(1));
      if (id === "inicio") jumpTo(0);
      else document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      window.history.pushState(null, "", `${nextPath}${url.hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="page-fade">
      {children}
    </div>
  );
}
