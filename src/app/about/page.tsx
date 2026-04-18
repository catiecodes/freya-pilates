import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "About Freya Morgen",
  description:
    "Meet Freya Morgen — comprehensively certified Pilates instructor based in Calistoga, California. Trained by Carrie Macy Samper. Private sessions, group classes, and curated retreats in the Napa Valley.",
  alternates: {
    canonical: "https://freyapilates.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16">
        <Image
          src="/freya-8734.jpg"
          alt="Freya Morgen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3 font-sans">
            About
          </p>
          <h1 className="font-serif text-6xl font-light">Freya Morgen</h1>
        </div>
      </section>

      {/* Bio */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-sans">
            Her Story
          </p>
          <div className="space-y-5 text-sm leading-relaxed text-charcoal-light">
            <p>
              Freya Morgen is a Pilates instructor based in Calistoga, California,
              with over nine years of teaching experience. She teaches at Solage,
              an Auberge Resort, and at Calistoga Pilates, where she supports
              clients in building strength, balance, and ease through both Pilates
              mat and equipment-based sessions.
            </p>
            <p>
              Her teaching style blends the foundations of classical Pilates with
              a modern, approachable perspective. Freya loves to create classes and
              private sessions that are both challenging and restorative,
              encouraging clients to develop strength while honoring their
              individual bodies and needs.
            </p>
            <p>
              Whether guiding a dynamic group mat class or an intimate Reformer or
              Trapeze Table session, she empowers clients to move with greater
              confidence and awareness.
            </p>
            <p>
              Freya believes that every body is a Pilates body and welcomes clients
              of all experience levels. A longtime skier and hiker, she draws
              inspiration from the outdoors and encourages her clients to carry the
              alignment, vitality, and mindful movement they cultivate in Pilates
              into everyday life.
            </p>
          </div>

          <div className="mt-10">
            <Button href="/#contact" variant="primary">
              Work with Freya
            </Button>
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/fave5.jpg"
              alt="Freya in the studio"
              fill
              className="object-cover"
            />
          </div>

          {/* Two boxes side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Certification — prominent left box */}
            <div className="bg-charcoal p-6 space-y-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans">
                Certification
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Comprehensively certified in classical Pilates. Trained and
                certified by Carrie Macy Samper, Master Trainer at Equinox New York.
              </p>
            </div>

            {/* Details — right box */}
            <div className="bg-cream p-6 space-y-5">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
                  In Studio
                </p>
                <p className="text-sm text-charcoal-light">
                  Solage, an Auberge Resort
                  <br />
                  Calistoga Pilates
                  <br />
                  Calistoga, California
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
                  Specialties
                </p>
                <p className="text-sm text-charcoal-light">
                  Reformer · Chair · Cadillac · Mat
                  <br />
                  Private & Duet Sessions
                  <br />
                  Virtual Training · Customized Retreats at Partner Properties
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 font-sans">
                  Experience
                </p>
                <p className="text-sm text-charcoal-light">
                  9+ years of teaching
                  <br />
                  All levels welcome
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-charcoal text-white py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8 font-sans">
            Philosophy
          </p>
          <blockquote className="font-serif text-3xl md:text-4xl font-light leading-relaxed text-white/90">
            &ldquo;Every body is a Pilates body. I welcome clients of all levels
            to experience the transformative benefits of the practice.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm tracking-[0.2em] uppercase text-gold/60 font-sans">
            — Freya Morgen
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-light text-charcoal mb-6">
            Ready to begin?
          </h2>
          <p className="text-sm text-charcoal-light mb-10">
            Whether you&apos;re new to Pilates or returning to the practice,
            Freya would love to hear from you.
          </p>
          <Button href="/#contact" variant="primary">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
}
