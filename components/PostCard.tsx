"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/blog";
import { canPrefetch } from "@/lib/network";
import { BLOG_AUTHOR } from "@/lib/site";

export function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const href = `/blog/${post.slug}`;

  return (
    <Link
      className="blog-card"
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
          sizes="(max-width: 980px) 92vw, 810px"
          quality={70}
        />
      </span>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-cat">{post.category}</span>
          <small>{post.displayDate}</small>
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
