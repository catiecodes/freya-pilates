import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Thoughts on movement, wellness, and Pilates from Freya Morgen.",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">
            Journal
          </p>
          <h1 className="font-serif text-6xl font-light text-charcoal">
            Thoughts & Movement
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        {!posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-charcoal-light">
              New posts coming soon.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post: Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "created_at">) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
