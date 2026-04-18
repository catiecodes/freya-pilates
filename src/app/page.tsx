import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

export const metadata: Metadata = {
  title: "Freya Pilates | Calistoga & Napa Valley",
  description:
    "Private Pilates instruction, curated retreats at partner properties, and group classes with Freya Morgen in Calistoga and the Napa Valley. Reformer, Cadillac, Chair & Mat.",
  alternates: {
    canonical: "https://freyapilates.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Freya Pilates",
  description:
    "Private Pilates instruction, curated retreats, and group classes with Freya Morgen in Calistoga and the Napa Valley.",
  url: "https://freyapilates.com",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calistoga",
    addressRegion: "CA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.579,
    longitude: -122.579,
  },
  areaServed: [
    { "@type": "City", name: "Calistoga" },
    { "@type": "City", name: "Napa" },
    { "@type": "AdministrativeArea", name: "Napa Valley" },
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pilates Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private & Duet Sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Virtual Private Sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Group Classes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customized Pilates Retreats at Partner Properties" } },
    ],
  },
};

const services = [
  {
    title: "Private & Duet Sessions",
    description:
      "Personalized one-on-one or duet Pilates sessions tailored to your goals and needs. These in-studio sessions focus on proper alignment, strength, and mindful movement with individualized guidance utilizing all Pilates equipment.",
    icon: "◆",
  },
  {
    title: "Virtual Private Sessions",
    description:
      "Private Pilates sessions offered virtually for both equipment and mat work. Each session is customized to your body and goals, providing focused instruction and clear cueing from the comfort of your home.",
    icon: "◇",
  },
  {
    title: "Group Classes",
    description:
      "Engaging group Pilates classes available in the studio and on-site at Solage. These classes emphasize balanced movement, community, and thoughtful sequencing in an encouraging environment.",
    icon: "○",
  },
  {
    title: "Retreats & Special Events",
    description:
      "Customized Pilates sessions for retreats, bridal showers, birthdays, and special events. Each offering is thoughtfully designed for your group, location, and occasion. Inquire about customized day retreats at partner properties.",
    icon: "✦",
  },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  const testimonials: Testimonial[] = data ?? [];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <Image
          src="/banner.jpg"
          alt="Freya Pilates studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/70 mb-6 font-sans">
            Calistoga · Napa Valley
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-none mb-8">
            Move with
            <br />
            <em>intention.</em>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-md leading-relaxed mb-10">
            Private and group Pilates instruction with Freya Morgen — at
            Solage, Calistoga Pilates, and virtually.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/#contact" variant="gold">
              Work with Freya
            </Button>
            <Button href="/about" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-charcoal">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="/fav1.jpg"
            alt="Freya teaching Pilates"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 border border-gold/20" />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-sans">
            About Freya
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal leading-tight mb-6">
            Nine years of mindful movement.
          </h2>
          <p className="text-sm leading-relaxed text-charcoal-light mb-4">
            Freya Morgen is a Pilates instructor based in Calistoga, California,
            with over nine years of teaching experience. She teaches at Solage,
            an Auberge Resort, and at Calistoga Pilates.
          </p>
          <p className="text-sm leading-relaxed text-charcoal-light mb-8">
            Her teaching style blends the foundations of classical Pilates with a
            modern, approachable perspective — creating sessions that are both
            challenging and restorative.
          </p>
          <Button href="/about" variant="outline">
            Her Story
          </Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">
              Offerings
            </p>
            <h2 className="font-serif text-5xl font-light text-charcoal">
              How We Work Together
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Image Strip */}
      <section className="grid grid-cols-1 md:grid-cols-2 md:h-[400px]">
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
          <Image
            src="/fav3.jpg"
            alt="Pilates reformer"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
          <Image
            src="/group-photo.jpg"
            alt="Pilates group class"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">
            Client Stories
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal">
            Testimonials
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={
                testimonials.length % 2 !== 0 && i === testimonials.length - 1
                  ? "md:col-span-2 md:max-w-[50%] md:mx-auto w-full"
                  : ""
              }
            >
              <TestimonialCard quote={t.quote} author={t.author} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-cream py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">
              Get in Touch
            </p>
            <h2 className="font-serif text-5xl font-light text-charcoal mb-4">
              Begin Your Practice
            </h2>
            <p className="text-sm text-charcoal-light">
              Every body is a Pilates body. Reach out to discuss your goals —
              Freya will respond personally.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
