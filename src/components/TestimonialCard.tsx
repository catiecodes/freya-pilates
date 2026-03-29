type TestimonialCardProps = {
  quote: string;
  author: string;
};

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <div className="bg-cream p-8 flex flex-col gap-6">
      <span className="text-gold font-serif text-5xl leading-none select-none">&ldquo;</span>
      <p className="text-sm leading-relaxed text-charcoal-light italic -mt-4">
        {quote}
      </p>
      <p className="text-[10px] tracking-[0.25em] uppercase text-olive font-sans">
        — {author}
      </p>
    </div>
  );
}
