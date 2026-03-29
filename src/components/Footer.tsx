import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="font-serif text-2xl tracking-widest text-white uppercase block">
              Freya
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">
              Pilates
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Calistoga, California
            <br />
            Napa Valley
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
            Navigation
          </h4>
          <nav className="flex flex-col gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Journal" },
              { href: "/#contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
            In Studio
          </h4>
          <div className="text-sm leading-relaxed space-y-1">
            <p>Solage, an Auberge Resort</p>
            <p>Calistoga Pilates</p>
            <p className="mt-4">Calistoga, CA</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wide">
            © {new Date().getFullYear()} Freya Pilates. All rights reserved.
          </p>
          <Link
            href="/login"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
