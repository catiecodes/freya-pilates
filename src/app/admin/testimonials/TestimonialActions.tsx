"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function TestimonialActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-[10px] tracking-[0.2em] uppercase text-red-400 hover:text-red-600 transition-colors font-sans cursor-pointer"
    >
      Delete
    </button>
  );
}
