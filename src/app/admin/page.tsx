import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/Button";
import AdminPostActions from "./AdminPostActions";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin — Journal",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
              Admin
            </p>
            <h1 className="font-serif text-4xl text-charcoal">Journal Posts</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-charcoal transition-colors font-sans"
            >
              ← View Site
            </Link>
            <Button href="/admin/testimonials" variant="outline">
              Reviews
            </Button>
            <Button href="/admin/new" variant="primary">
              New Post
            </Button>
          </div>
        </div>

        {/* Posts Table */}
        {!posts || posts.length === 0 ? (
          <div className="text-center py-16 bg-white">
            <p className="font-serif text-xl text-charcoal-light mb-6">
              No posts yet.
            </p>
            <Button href="/admin/new" variant="outline">
              Write Your First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-px">
            {posts.map((post: BlogPost) => (
              <div
                key={post.id}
                className="bg-white px-6 py-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-charcoal truncate">
                    {post.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light mt-1 font-sans">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <span
                      className={`ml-3 ${post.status === "published" ? "text-olive" : "text-gold"}`}
                    >
                      {post.status}
                    </span>
                  </p>
                </div>
                <AdminPostActions postId={post.id} slug={post.slug} status={post.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
