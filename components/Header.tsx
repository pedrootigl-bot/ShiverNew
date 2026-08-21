"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { posts } from "@/lib/blog";
import { canPrefetch } from "@/lib/network";
import { scrollToId } from "@/lib/scroll";
import { NAV, SITE } from "@/lib/site";
import { CtaButton } from "@/components/CtaButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const blogRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef(0);
  const articles = posts;
  const compactNav = "(max-width: 1100px)";

  function prefetchBlog() {
    if (!canPrefetch()) return;
    router.prefetch("/blog");
  }

  function closeMenus() {
    setOpen(false);
    setBlogOpen(false);
  }

  function scrollToHash(hash: string) {
    const id = hash.replace(/^#/, "");
    if (id === "inicio") {
      scrollToId("inicio");
      return true;
    }
    if (!document.getElementById(id)) return false;
    scrollToId(id);
    return true;
  }

  function onHashClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    closeMenus();
    if (!href.startsWith("/#")) return;
    if (pathname !== "/") return;
    const hash = href.slice(1);
    if (!scrollToHash(hash)) return;
    event.preventDefault();
    window.history.pushState(null, "", href);
  }

  function openBlogSoon() {
    if (window.matchMedia(compactNav).matches) return;
    prefetchBlog();
    window.clearTimeout(hoverTimer.current);
    setBlogOpen(true);
  }

  function closeBlogSoon() {
    if (window.matchMedia(compactNav).matches) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setBlogOpen(false), 80);
  }

  useEffect(() => {
    if (!blogOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!blogRef.current?.contains(event.target as Node)) setBlogOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBlogOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [blogOpen]);

  useEffect(() => {
    closeMenus();
    window.clearTimeout(hoverTimer.current);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!canPrefetch()) return;
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(() => router.prefetch("/blog"), { timeout: 2500 });
      return () => window.cancelIdleCallback?.(id);
    }
    return undefined;
  }, [router]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      scrollToId(hash);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <header className="header">
      {open ? (
        <button className="nav-backdrop" type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} />
      ) : null}
      <div className="header-pill">
        <Link href="/#inicio" className="logo" aria-label="Shiver Broker" onClick={(event) => onHashClick(event, "/#inicio")}>
          <img src="/media/R6Lgnh9bXoiPlyDe7JyGXOz604.png" alt="Shiver Broker" width={34} height={34} decoding="async" />
          <div>
            <span>Shiver</span>
            <small>BROKER</small>
          </div>
        </Link>
        <nav
          className={`nav${open ? " open" : ""}`}
          aria-label="Principal"
          {...(open ? { "data-lenis-prevent": "" } : {})}
        >
          {NAV.map((item) =>
            item.href === "/blog" ? (
              <div
                key={item.href}
                className={`nav-drop${blogOpen ? " open" : ""}`}
                ref={blogRef}
                onPointerEnter={openBlogSoon}
                onPointerLeave={closeBlogSoon}
                onFocus={() => {
                  if (!window.matchMedia(compactNav).matches) {
                    prefetchBlog();
                    setBlogOpen(true);
                  }
                }}
                onBlur={(event) => {
                  if (event.currentTarget.contains(event.relatedTarget as Node)) return;
                  if (!window.matchMedia(compactNav).matches) setBlogOpen(false);
                }}
              >
                  <Link
                    href="/blog"
                    className={`nav-drop-btn${pathname.startsWith("/blog") ? " current" : ""}`}
                    prefetch={false}
                  aria-expanded={blogOpen}
                  aria-haspopup="menu"
                  aria-controls="blog-menu"
                  data-nav-toggle={open || undefined}
                  onClick={(event) => {
                    if (!open) {
                      closeMenus();
                      return;
                    }
                    event.preventDefault();
                    prefetchBlog();
                    setBlogOpen((value) => !value);
                  }}
                >
                  {item.label}
                  <span className={`nav-caret${blogOpen ? " up" : ""}`} aria-hidden>
                    ▾
                  </span>
                </Link>
                <div className="nav-menu" id="blog-menu" role="menu">
                  {articles.map((post) => {
                    const href = `/blog/${post.slug}`;
                    const current = pathname === href;
                    return (
                      <Link
                        key={post.slug}
                        href={href}
                        prefetch={false}
                        role="menuitem"
                        aria-current={current ? "page" : undefined}
                        className={current ? "current" : undefined}
                        onPointerDown={() => {
                          if (canPrefetch()) router.prefetch(href);
                        }}
                        onClick={closeMenus}
                      >
                        <strong>{post.navTitle}</strong>
                        <small>{post.teaser}</small>
                      </Link>
                    );
                  })}
                  <Link
                    href="/blog"
                    prefetch={false}
                    role="menuitem"
                    className={pathname === "/blog" ? "current nav-menu-all" : "nav-menu-all"}
                    aria-current={pathname === "/blog" ? "page" : undefined}
                    onPointerDown={() => {
                      if (canPrefetch()) router.prefetch("/blog");
                    }}
                    onClick={closeMenus}
                  >
                    <strong>Ver todos os artigos</strong>
                    <small>O que quem opera quer ler agora</small>
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={(event) => onHashClick(event, item.href)}>
                {item.label}
              </Link>
            ),
          )}
          <div className="nav-mobile-account">
            <CtaButton href={SITE.trade.login} size="sm" onClick={closeMenus}>
              Entrar
            </CtaButton>
          </div>
        </nav>
        <div className="header-cta">
          <CtaButton href={SITE.trade.login} size="sm" className="header-login">
            Entrar
          </CtaButton>
          <CtaButton href={SITE.trade.register} size="sm">
            Abrir conta
          </CtaButton>
          <button
            className="menu-btn"
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => {
              prefetchBlog();
              setOpen((value) => !value);
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
