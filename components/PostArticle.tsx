"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { PostCard } from "@/components/PostCard";
import { adjacentPosts, formatPostDate, getPost, morePosts, type PostSlug } from "@/lib/blog";
import { hasPostBody, postBodies } from "@/lib/blog-bodies";
import { canPrefetch } from "@/lib/network";
import { BLOG_AUTHOR, SITE } from "@/lib/site";
import { CtaButton } from "@/components/CtaButton";

function readingMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

export function PostArticle({ slug }: { slug: string }) {
  const router = useRouter();
  if (!hasPostBody(slug)) return null;
  const post = getPost(slug);
  if (!post) return null;
  const html = postBodies[slug as PostSlug];
  const related = morePosts(slug);
  const { prev, next } = adjacentPosts(slug);
  const minutes = readingMinutes(html);
  const authorInitials = BLOG_AUTHOR.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <RevealGroup>
      <article className={`blog-page post-page post-page--${slug}`}>
        <div className="post-shell">
          <Reveal variant="left">
            <nav className="post-crumbs" aria-label="Trilha">
              <Link href="/">Início</Link>
              <span aria-hidden>/</span>
              <Link
                href="/blog"
                prefetch={false}
                onPointerDown={() => {
                  if (canPrefetch()) router.prefetch("/blog");
                }}
              >
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{post.navTitle}</span>
            </nav>
          </Reveal>

          <header className="post-head">
            <Reveal variant="blur" delay={40}>
              <p className="post-head-meta">
                <span className="blog-card-cat">{post.category}</span>
                <small>
                  <time dateTime={post.date}>{post.displayDate}</time>
                  <span aria-hidden> · </span>
                  <span>{minutes} min de leitura</span>
                </small>
              </p>
            </Reveal>
            <Reveal variant="left" delay={80}>
              <h1>{post.title}</h1>
            </Reveal>
            <Reveal variant="left" delay={100}>
              <p className="post-deck">{post.excerpt}</p>
            </Reveal>
            <Reveal variant="left" delay={120}>
              <div className="post-author">
                <span className="post-author-avatar" aria-hidden>
                  {authorInitials}
                </span>
                <div className="post-author-meta">
                  <p className="post-author-name">
                    <Link href="/sobre">{BLOG_AUTHOR.name}</Link>
                  </p>
                  <p className="post-author-role">{BLOG_AUTHOR.role}</p>
                  <p className="post-author-dates">
                    <time dateTime={post.date}>{post.displayDate}</time>
                    {String(post.updated) !== String(post.date) ? (
                      <>
                        <span aria-hidden> · </span>
                        Atualizado <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </Reveal>
          </header>

          <Reveal variant="rise" delay={140}>
            <figure className="post-cover">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 900px) 94vw, 780px"
                quality={72}
                priority
              />
            </figure>
          </Reveal>

          <Reveal variant="rise" delay={180}>
            <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
          </Reveal>

          {(prev || next) ? (
            <Reveal variant="up" delay={80} solo>
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
            </Reveal>
          ) : null}

          <Reveal variant="scale" delay={220}>
            <div className="post-cta">
              <div className="post-cta-copy">
                <p className="post-cta-kicker">Conta demo</p>
                <p>
                  A conta demo já está pronta. $10.000 virtuais para sentir a plataforma — antes de o próximo movimento
                  passar.
                </p>
              </div>
              <CtaButton href={SITE.trade.trial}>
                Entrar na plataforma <span aria-hidden>→</span>
              </CtaButton>
            </div>
          </Reveal>
        </div>

        {related.length > 0 ? (
          <aside className="post-related wrap" aria-label="Continue lendo">
            <Reveal variant="blur" delay={80}>
              <div className="post-related-head">
                <p className="blog-kicker">Mais artigos</p>
                <h2>Continue lendo</h2>
              </div>
            </Reveal>
            <div className="post-grid">
              {related.map((item, index) => (
                <Reveal key={item.slug} variant="rise" delay={index * 140} solo>
                  <PostCard post={item} />
                </Reveal>
              ))}
            </div>
          </aside>
        ) : null}
      </article>
    </RevealGroup>
  );
}
