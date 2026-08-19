"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/blog";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const router = useRouter();
  const href = `/blog/${post.slug}`;

  return (
    <Link
      className={`post-card${featured ? " featured" : ""}`}
      href={href}
      prefetch
      onPointerDown={() => router.prefetch(href)}
    >
      <p className="meta">
        {post.category} · {post.displayDate}
      </p>
      <h2>{post.title}</h2>
      <p>{featured ? post.description : post.teaser}</p>
      <strong className="post-more">Ler artigo →</strong>
    </Link>
  );
}
