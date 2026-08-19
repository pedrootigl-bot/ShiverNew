"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPost, morePosts, type PostSlug } from "@/lib/blog";
import { hasPostBody, postBodies } from "@/lib/blog-bodies";
import { SITE } from "@/lib/site";

export function PostArticle({ slug }: { slug: string }) {
  const router = useRouter();
  if (!hasPostBody(slug)) return null;
  const post = getPost(slug);
  if (!post) return null;
  const html = postBodies[slug as PostSlug];
  const related = morePosts(slug);

  return (
    <article className="blog-page wrap">
      <p className="blog-back">
        <Link href="/blog" prefetch onPointerDown={() => router.prefetch("/blog")}>
          ← Voltar ao blog
        </Link>
      </p>
      <p className="meta">
        {post.displayDate} · {post.category}
      </p>
      <h1>{post.title}</h1>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="post-cta">
        <p>A conta demo já está pronta. $10.000 virtuais para sentir a plataforma — antes de o próximo movimento passar.</p>
        <a className="btn btn-cta" href={SITE.trade.trial}>
          Entrar na plataforma <span aria-hidden>→</span>
        </a>
      </div>
      {related.length > 0 ? (
        <aside className="post-related" aria-label="Continue lendo">
          <h2>Continue lendo</h2>
          <div className="post-grid">
            {related.map((item) => {
              const href = `/blog/${item.slug}`;
              return (
                <Link
                  className="post-card"
                  key={item.slug}
                  href={href}
                  prefetch
                  onPointerDown={() => router.prefetch(href)}
                >
                  <p className="meta">
                    {item.category} · {item.displayDate}
                  </p>
                  <h3>{item.navTitle}</h3>
                  <p>{item.teaser}</p>
                  <strong className="post-more">Ler artigo →</strong>
                </Link>
              );
            })}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
