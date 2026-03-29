"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Props = {
  postId: string;
  slug: string;
  status: "draft" | "published";
};

export default function AdminPostActions({ postId, slug, status }: Props) {
  const router = useRouter();

  async function toggleStatus() {
    const supabase = createClient();
    const newStatus = status === "published" ? "draft" : "published";
    await supabase
      .from("blog_posts")
      .update({ status: newStatus })
      .eq("id", postId);
    router.refresh();
  }

  async function deletePost() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", postId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 shrink-0">
      {status === "published" && (
        <Link
          href={`/blog/${slug}`}
          target="_blank"
          className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-olive transition-colors font-sans"
        >
          View
        </Link>
      )}
      <Link
        href={`/admin/edit/${postId}`}
        className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-olive transition-colors font-sans"
      >
        Edit
      </Link>
      <button
        onClick={toggleStatus}
        className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-olive transition-colors font-sans cursor-pointer"
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={deletePost}
        className="text-[10px] tracking-[0.2em] uppercase text-red-400 hover:text-red-600 transition-colors font-sans cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
