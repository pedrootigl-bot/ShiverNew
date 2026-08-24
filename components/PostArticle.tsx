"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { adjacentPosts, formatPostDate, getPost, morePosts, type PostSlug } from "@/lib/blog";
import { hasPostBody, postBodies } from "@/lib/blog-bodies";
import { canPrefetch } from "@/lib/network";
import { BLOG_AUTHOR, SITE } from "@/lib/site";
import { CtaButton } from "@/components/CtaButton";

export function PostArticle({ slug }: { slug: string }) {
  const router = useRouter();
  if (!hasPostBody(slug)) return null;
  const post = getPost(slug);
  if (!post) return null;
  const html = postBodies[slug as PostSlug];
  const related = morePosts(slug);
  const { prev, next } = adjacentPosts(slug);

  return (
    <RevealGroup>
      <article className="blog-page wrap post-page">
        <Reveal variant="left">
          <nav className="post-crumbs" aria-label="Trilha">
            <Link href="/">Início</Link>
            <span aria-hidden>/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden>/</span>
            <span>{post.navTitle}</span>
          </nav>
          <p className="blog-back">
            <Link
              href="/blog"
              prefetch={false}
              onPointerDown={() => {
                if (canPrefetch()) router.prefetch("/blog");
              }}
            >
              ← Voltar ao blog
            </Link>
          </p>
        </Reveal>
        <header className="post-head">
          <Reveal variant="blur" delay={40}>
            <p className="post-head-meta">
              <span className="blog-card-cat">{post.category}</span>
              <small>
                <time dateTime={post.date}>{post.displayDate}</time>
              </small>
            </p>
          </Reveal>
          <Reveal variant="left" delay={80}>
            <h1>{post.title}</h1>
          </Reveal>
          <p className="post-byline">
            Por <Link href="/sobre">{BLOG_AUTHOR.name}</Link>
            <span className="post-byline-role">{BLOG_AUTHOR.role}</span>
            <span aria-hidden> · </span>
            Publicado em <time dateTime={post.date}>{post.displayDate}</time>
            {post.updated !== post.date ? (
              <>
                <span aria-hidden> · </span>
                Atualizado em <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </>
            ) : null}
          </p>
        </header>
        <Reveal variant="rise" delay={120}>
          <div className="post-cover">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 900px) 92vw, 820px"
              quality={70}
              priority
            />
          </div>
        </Reveal>
        <Reveal variant="rise" delay={160}>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Reveal>
        {(prev || next) ? (
          <nav className="post-pager" aria-label="Outros artigos">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} prefetch={false}>
                <small>Anterior</small>
                <strong>{prev.navTitle}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} prefetch={false} className="post-pager-next">
                <small>Próximo</small>
                <strong>{next.navTitle}</strong>
              </Link>
            ) : null}
          </nav>
        ) : null}
        <Reveal variant="scale" delay={220}>
          <div className="post-cta">
            <p>A conta demo já está pronta. $10.000 virtuais para sentir a plataforma — antes de o próximo movimento passar.</p>
            <CtaButton href={SITE.trade.trial}>
              Entrar na plataforma <span aria-hidden>→</span>
            </CtaButton>
          </div>
        </Reveal>
        {related.length > 0 ? (
          <aside className="post-related" aria-label="Continue lendo">
            <Reveal variant="blur" delay={80}>
              <h2>Continue lendo</h2>
            </Reveal>
            <div className="post-grid">
              {related.map((item, index) => {
                const href = `/blog/${item.slug}`;
                return (
                  <Reveal key={item.slug} variant="rise" delay={160 + index * 120}>
                    <Link
                      className="post-card"
                      href={href}
                      prefetch={false}
                      onPointerDown={() => {
                        if (canPrefetch()) router.prefetch(href);
                      }}
                    >
                      <span className="post-card-media">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 720px) 92vw, 260px"
                          quality={60}
                        />
                      </span>
                      <p className="meta">
                        {item.category} · {item.displayDate}
                      </p>
                      <h3>{item.title}</h3>
                      <p>{item.teaser}</p>
                      <strong className="post-more">Ler artigo →</strong>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </aside>
        ) : null}
      </article>
    </RevealGroup>
  );
}
