import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import TestimonialForm from "./TestimonialForm";
import TestimonialActions from "./TestimonialActions";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
              Admin
            </p>
            <h1 className="font-serif text-4xl text-charcoal">Testimonials</h1>
          </div>
          <a
            href="/admin"
            className="text-[10px] tracking-[0.2em] uppercase text-charcoal-light hover:text-charcoal transition-colors font-sans"
          >
            ← Back to Admin
          </a>
        </div>

        {/* Add form */}
        <div className="bg-white p-8 mb-8">
          <h2 className="font-serif text-xl text-charcoal mb-6">Add a Review</h2>
          <TestimonialForm />
        </div>

        {/* Existing testimonials */}
        {!testimonials || testimonials.length === 0 ? (
          <p className="text-sm text-charcoal-light text-center py-12">
            No testimonials yet.
          </p>
        ) : (
          <div className="space-y-px">
            {testimonials.map((t: Testimonial) => (
              <div key={t.id} className="bg-white px-6 py-5">
                <p className="text-sm text-charcoal italic leading-relaxed mb-2">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-olive font-sans">
                    — {t.author}
                  </p>
                  <TestimonialActions id={t.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
