import Image from "next/image";
import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import ContactForm from "@/components/ContactForm";

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

const testimonials = [
  {
    quote:
      "Freya has guided me through a Pilates Reformer program, utilizing a gentle yet effective strength-training approach. This program has been instrumental in resolving years of sciatica pain, as well as addressing new issues related to a complete Achilles rupture. After consulting with orthopedic surgeons and pain specialists, I chose to pursue a less invasive path, and the results with Freya have been excellent.",
    author: "Laura K.",
  },
  {
    quote:
      "I started Pilates after a back injury. I had tried Pilates many times but never made a connection, and then I met Freya. Pilates helped me to connect with my body — stand taller, move easier, all without discomfort. Freya helped me become stronger, more flexible, and love my workouts. I feel challenged every time I step into the studio.",
    author: "Terry G.",
  },
  {
    quote:
      "Freya has been my instructor for about seven years. She is a fantastic instructor, blending different and challenging moves with more simple and classical moves in each workout. She is a solid judge of my current ability and also what I can build up to. I highly recommend practicing Pilates with Freya.",
    author: "Allison F.",
  },
  {
    quote:
      "I have been taking Pilates classes and private lessons with Freya for nearly four years and her wealth of knowledge is astounding. She has a nearly infinite repertoire of exercises, a comprehensive understanding of anatomy and kinesiology, and the patience of a saint.",
    author: "Claudia L.",
  },
];

export default function HomePage() {
  return (
    <>
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
      <section className="bg-cream py-24">
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
          <div className="text-center mt-12">
            <p className="text-sm text-charcoal-light italic font-serif">
              Online scheduling with MindBody — coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Image Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 h-[400px]">
        <div className="relative overflow-hidden">
          <Image
            src="/fav3.jpg"
            alt="Pilates reformer"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/fave5.jpg"
            alt="Pilates movement"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/fav4.jpg"
            alt="Pilates instruction"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">
            Client Stories
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal">
            Transformations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} quote={t.quote} author={t.author} />
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
