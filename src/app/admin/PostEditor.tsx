"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import type { BlogPost } from "@/lib/types";

type Props = {
  post?: BlogPost;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEditing || slug === slugify(post?.title ?? "")) {
      setSlug(slugify(value));
    }
  }

  async function handleSave(saveStatus: "draft" | "published") {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      status: saveStatus,
      updated_at: new Date().toISOString(),
    };

    let dbError;

    if (isEditing) {
      ({ error: dbError } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", post.id));
    } else {
      ({ error: dbError } = await supabase.from("blog_posts").insert({
        ...payload,
        created_at: new Date().toISOString(),
      }));
    }

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
            Admin
          </p>
          <h1 className="font-serif text-4xl text-charcoal">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
        </div>
        <Link
          href="/admin"
          className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-charcoal transition-colors font-sans"
        >
          ← All Posts
        </Link>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Title <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors font-serif text-lg"
            placeholder="Post title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            URL Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal-light focus:outline-none focus:border-olive transition-colors font-sans"
            placeholder="auto-generated-from-title"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors resize-none"
            placeholder="Short description shown on the journal listing page..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Content <span className="text-gold">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors resize-y font-sans leading-relaxed"
            placeholder="Write your post content here. Basic HTML is supported (e.g. <p>, <strong>, <em>, <h2>, <ul>, <li>)."
          />
          <p className="text-[10px] text-charcoal-light mt-1.5">
            Basic HTML supported: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;
          </p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <Button
            onClick={() => handleSave("published")}
            disabled={saving}
            variant="primary"
          >
            {saving ? "Saving..." : "Publish"}
          </Button>
          <Button
            onClick={() => handleSave("draft")}
            disabled={saving}
            variant="outline"
          >
            Save as Draft
          </Button>
          <div className="ml-auto">
            {isEditing && (
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-charcoal-light">
                Status:{" "}
                <span className={status === "published" ? "text-olive" : "text-gold"}>
                  {status}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
