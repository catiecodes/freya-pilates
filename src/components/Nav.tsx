"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-widest text-charcoal uppercase">
            Freya
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-sans">
            Pilates
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-charcoal-light hover:text-olive transition-colors duration-200 font-sans"
            >
              {link.label}
            </Link>
          ))}
          {/* MindBody Placeholder */}
          <span
            title="Online booking coming soon"
            className="text-[11px] tracking-[0.2em] uppercase text-charcoal-light/40 cursor-not-allowed font-sans"
          >
            Book
          </span>
          <Link
            href="/#contact"
            className="text-[11px] tracking-[0.2em] uppercase bg-olive text-white px-5 py-2.5 hover:bg-olive-dark transition-colors duration-200 font-sans"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-cream-dark px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] tracking-[0.2em] uppercase text-charcoal-light hover:text-olive transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-[11px] tracking-[0.2em] uppercase text-charcoal-light/40 cursor-not-allowed">
            Book (Coming Soon)
          </span>
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="text-[11px] tracking-[0.2em] uppercase bg-olive text-white px-5 py-2.5 text-center hover:bg-olive-dark transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
