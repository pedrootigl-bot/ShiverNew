"use client";

import { notFound, useParams } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import { hasPostBody } from "@/lib/blog-bodies";

export function PostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  if (!slug || Array.isArray(slug) || !hasPostBody(slug)) notFound();
  return <PostArticle slug={slug} />;
}
