import { notFound } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import { hasPostBody } from "@/lib/blog-bodies";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!hasPostBody(slug)) notFound();
  return <PostArticle slug={slug} />;
}
