"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/blog";
import { canPrefetch } from "@/lib/network";

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
      <div className="blog-card-row">
        <div className="blog-card-copy">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <strong className="blog-card-more">Read more &gt;</strong>
        </div>
        <div className="blog-card-meta">
          <span className="blog-card-cat">{post.category}</span>
          <small>{post.displayDate}</small>
        </div>
      </div>
      <span className="blog-card-media">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 980px) 92vw, 810px"
          quality={70}
        />
      </span>
    </Link>
  );
}
