"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  "Al Futtaim Engineering",
  "Tecom Investments FZ",
  "ADIB",
  "ADCB",
  "Idama",
  "Al Nasser Properties",
  "Al Saqer Property Management LLC",
  "Al Nasr",
  "Dubai Autism Centre",
  "Johnson & Johnson",
  "DHL Logistics LLC",
  "CEVA Logistics FZCO",
  "Goody",
  "GM",
  "First Middle East FZE",
  "Advanced Facilities Management",
  "P&C",
  "Injazat",
  "LG Electronics",
  "Beit Al Khair Society",
  "Harbor Real Estate",
  "Dar Al Ber Society",
  "Mohammed Bin Rashid Housing Establishment",
  "Dutco Tennant LLC",
  "Zulekha Hospital",
  "Binhendi",
  "Ajman University",
  "Merex Investment",
  "Rail Bal",
  "Al Ghurair",
  "ASBIS",
  "Point Contracting",
  "DAMAC",
  "Trane",
  "Aspire Gym",
  "Oaks Hotel Group",
  "Seven Tides",
  "Shoba Group",
  "Imdaad",
  "BKA (formerly BK Gulf)",
  "Union Properties",
  "Asteco",
  "Noon",
];

const ROW1 = CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2));
const ROW2 = CLIENTS.slice(Math.ceil(CLIENTS.length / 2));

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="flex items-center gap-3 mx-4 flex-shrink-0"
          >
            <span className="text-[#D4C4A8]/50 text-sm md:text-base whitespace-nowrap font-light hover:text-[#C9943A] transition-colors duration-300 cursor-default">
              {client}
            </span>
            <span className="text-[#C9943A]/30 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#080808]"
    >
      {/* Subtle divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9943A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div ref={headingRef} className="text-center">
          <span className="text-[#C9943A] text-xs tracking-[0.4em] uppercase font-mono">
            Trusted By
          </span>
          <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-none text-[#FAFAFA] mt-2">
            45+ <span className="text-gradient-gold">Clients</span>
          </h2>
          <p className="mt-3 text-[#D4C4A8]/40 text-sm font-light">
            From multinationals to government entities — built on lasting partnerships
          </p>
        </div>
      </div>

      {/* Gradient edges — hover anywhere to pause and read */}
      <div className="relative marquee-wrap">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

        <div className="space-y-4">
          <MarqueeRow items={ROW1} direction="left" />
          <MarqueeRow items={ROW2} direction="right" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 max-w-7xl mx-auto px-6">
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {[
            { value: "45+", label: "Active Clients" },
            { value: "13", label: "Showcase Projects" },
            { value: "14+", label: "Years Trusted" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-3xl text-[#C9943A]">{value}</p>
              <p className="text-[#D4C4A8]/40 text-xs tracking-widest uppercase mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9943A]/20 to-transparent" />
    </section>
  );
}
