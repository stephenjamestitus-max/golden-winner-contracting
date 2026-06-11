"use client";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#xray" },
  { label: "Quality", href: "#quality" },
  { label: "Safety & ISO", href: "#safety" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

const ISO_BADGES = ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2015"];

export default function Footer() {
  const handleLink = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060606] border-t border-[#C9943A]/40 overflow-hidden">
      {/* Giant watermark wordmark */}
      <p
        aria-hidden="true"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-heading text-outline text-[clamp(4rem,13vw,12rem)] leading-none whitespace-nowrap select-none pointer-events-none opacity-50"
      >
        GOLDEN WINNER
      </p>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute top-6 right-6 w-10 h-10 border border-[#C9943A]/40 rounded-sm flex items-center justify-center text-[#C9943A] hover:bg-[#C9943A] hover:text-[#0A0A0A] transition-all duration-300 group z-10"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-y-0.5 transition-transform duration-300">
          <path d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#C9943A]/10">
          {/* Brand column */}
          <div className="md:col-span-1">
            {/* SVG Logo */}
            <div className="flex items-center gap-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-label="GWC logo">
                {/* Mountain / crane silhouette */}
                <polygon
                  points="20,4 36,34 4,34"
                  fill="none"
                  stroke="#C9943A"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Vertical mast */}
                <line
                  x1="20" y1="4" x2="20" y2="24"
                  stroke="#C9943A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Horizontal jib */}
                <line
                  x1="13" y1="14" x2="27" y2="14"
                  stroke="#C9943A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Hook cable */}
                <line
                  x1="25" y1="14" x2="25" y2="22"
                  stroke="#C9943A"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="2 1"
                />
                {/* Floor line */}
                <line
                  x1="12" y1="27" x2="28" y2="27"
                  stroke="#C9943A"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <p className="font-heading text-xl text-[#FAFAFA] tracking-widest leading-none">
                  Golden Winner
                </p>
                <p className="font-heading text-xl text-[#C9943A] tracking-widest leading-none">
                  Contracting LLC
                </p>
              </div>
            </div>

            <p className="text-[#D4C4A8]/50 text-sm leading-relaxed font-light mb-6">
              Built on Trust. Delivered with Precision.
            </p>

            {/* ISO badges */}
            <div className="flex flex-wrap gap-2">
              {ISO_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="border border-[#C9943A]/30 text-[#C9943A] text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg text-[#FAFAFA] tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLink(link.href)}
                    className="text-[#D4C4A8]/50 text-sm hover:text-[#C9943A] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-[#C9943A]/30 group-hover:w-5 group-hover:bg-[#C9943A] transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-[#FAFAFA] tracking-widest mb-5">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-[#D4C4A8]/50 font-light leading-relaxed">
              <div>
                <p className="text-[#C9943A]/70 text-[10px] tracking-widest uppercase mb-1">
                  Address
                </p>
                <p>R-25 France Cluster</p>
                <p>International City</p>
                <p>PO Box 126343, Dubai UAE</p>
              </div>
              <div>
                <p className="text-[#C9943A]/70 text-[10px] tracking-widest uppercase mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@gwcdxb.com"
                  className="hover:text-[#C9943A] transition-colors duration-300"
                >
                  info@gwcdxb.com
                </a>
              </div>
              <div>
                <p className="text-[#C9943A]/70 text-[10px] tracking-widest uppercase mb-1">
                  Phone
                </p>
                <a
                  href="tel:+97145650362"
                  className="hover:text-[#C9943A] transition-colors duration-300"
                >
                  04-5650362
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[#D4C4A8]/25 text-xs">
          <p>© 2025 Golden Winner Contracting LLC · Dubai, UAE</p>
          <p className="tracking-widest uppercase text-[10px]">Est. 2011 · Licensed & ISO Certified</p>
        </div>
      </div>
    </footer>
  );
}
