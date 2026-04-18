"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function TestimonialForm() {
  const router = useRouter();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    // Get current max sort_order
    const { data: existing } = await supabase
      .from("testimonials")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 1;

    const { error: insertError } = await supabase
      .from("testimonials")
      .insert({ quote, author, sort_order: nextOrder });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setQuote("");
    setAuthor("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
          Review
        </label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
          rows={5}
          className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
          Name
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="e.g. Cindy L."
          className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="text-[11px] tracking-[0.2em] uppercase bg-olive text-white px-6 py-3 hover:bg-olive-dark transition-colors duration-200 font-sans disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Review"}
      </button>
    </form>
  );
}
