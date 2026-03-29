import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-[10px] tracking-[0.25em] uppercase text-olive hover:text-olive-dark transition-colors font-sans"
          >
            ← Journal
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mt-6 mb-4 font-sans">
            {date}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-base text-charcoal-light font-serif italic">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div
          className="prose prose-stone max-w-none
            prose-headings:font-serif prose-headings:font-light
            prose-p:text-charcoal-light prose-p:leading-relaxed
            prose-a:text-olive prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back */}
      <section className="border-t border-cream-dark py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-[10px] tracking-[0.25em] uppercase text-olive hover:text-olive-dark transition-colors font-sans"
          >
            ← Back to Journal
          </Link>
        </div>
      </section>
    </>
  );
}
