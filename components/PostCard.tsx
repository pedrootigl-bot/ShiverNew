"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/blog";
import { canPrefetch } from "@/lib/network";
import { BLOG_AUTHOR } from "@/lib/site";

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const router = useRouter();
  const href = `/blog/${post.slug}`;

  return (
    <Link
      className={`blog-card${featured ? " featured" : ""}`}
      href={href}
      prefetch={false}
      onPointerDown={() => {
        if (canPrefetch()) router.prefetch(href);
      }}
    >
      <span className="blog-card-media">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={
            featured
              ? "(max-width: 900px) 92vw, 640px"
              : "(max-width: 900px) 92vw, 380px"
          }
          quality={70}
          priority={featured}
        />
      </span>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-cat">{post.category}</span>
          <small>
            <time dateTime={post.date}>{post.displayDate}</time>
          </small>
        </div>
        <h2>{post.title}</h2>
        <p className="blog-card-author">
          {BLOG_AUTHOR.name}
          <span aria-hidden> · </span>
          {BLOG_AUTHOR.role}
        </p>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <strong className="blog-card-more">Ler artigo →</strong>
      </div>
    </Link>
  );
}
