import Link from "next/link";
import type { BlogPost } from "@/lib/types";

type BlogCardProps = {
  post: Pick<BlogPost, "title" | "slug" | "excerpt" | "created_at">;
};

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-cream-dark pb-8 hover:border-gold transition-colors duration-300"
    >
      <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-sans">
        {date}
      </p>
      <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-olive transition-colors duration-300">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-sm leading-relaxed text-charcoal-light line-clamp-3">
          {post.excerpt}
        </p>
      )}
      <span className="mt-4 inline-block text-[10px] tracking-[0.2em] uppercase text-olive group-hover:tracking-[0.3em] transition-all duration-300 font-sans">
        Read More →
      </span>
    </Link>
  );
}
