"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#xray" },
  { label: "Safety", href: "#safety" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-[#0A0A0A] border-b border-[#C9943A]/40 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleLink("#hero"); }}
          className="flex items-center gap-3 group"
        >
          {/* SVG logo mark */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <polygon
              points="16,3 29,27 3,27"
              fill="none"
              stroke="#C9943A"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polyline
              points="16,3 16,18"
              stroke="#C9943A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="10" y1="21" x2="22" y2="21"
              stroke="#C9943A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="21" r="1.5" fill="#C9943A" />
          </svg>
          <div>
            <p className="font-heading text-lg leading-none text-[#FAFAFA] tracking-widest group-hover:text-[#C9943A] transition-colors duration-300">
              GWC
            </p>
            <p className="text-[#D4C4A8]/40 text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5">
              Golden Winner
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLink(link.href)}
              className="text-[#D4C4A8]/60 text-sm tracking-widest uppercase hover:text-[#C9943A] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleLink("#contact")}
            className="btn-shimmer text-[#0A0A0A] font-heading tracking-widest text-sm px-5 py-2.5 rounded-sm hidden sm:block"
          >
            Get a Quote
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                "block w-5 h-px bg-[#C9943A] transition-all duration-300",
                menuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={clsx(
                "block w-5 h-px bg-[#C9943A] transition-all duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "block w-5 h-px bg-[#C9943A] transition-all duration-300",
                menuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#C9943A]/20 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLink(link.href)}
              className="text-[#D4C4A8]/70 text-sm tracking-widest uppercase hover:text-[#C9943A] transition-colors duration-300 text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLink("#contact")}
            className="btn-shimmer text-[#0A0A0A] font-heading tracking-widest text-sm px-5 py-3 rounded-sm mt-2 text-center"
          >
            Get a Quote
          </button>
        </div>
      )}
    </nav>
  );
}
