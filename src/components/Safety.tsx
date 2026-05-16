"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ISO_BADGES = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management",
    description:
      "Internationally recognized standard for quality management systems, ensuring consistent delivery of products and services.",
    color: "#C9943A",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    description:
      "Certified commitment to environmental responsibility, sustainable practices, and reduced ecological impact across all projects.",
    color: "#4AD97A",
  },
  {
    code: "ISO 45001:2015",
    title: "Occupational Health & Safety",
    description:
      "The highest standard for workplace safety management, protecting our workforce and ensuring zero-harm project sites.",
    color: "#4ACDDD",
  },
];

export default function Safety() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      badgeRefs.current.forEach((badge, i) => {
        if (!badge) return;
        gsap.from(badge, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: 0.3 + i * 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        });

        gsap.to(badge, {
          y: -6,
          duration: 2.5 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-[#070707]"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#070707]" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, #C9943A 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-6">
          <span className="text-[#C9943A] text-xs tracking-[0.4em] uppercase font-mono">
            Safety & Compliance
          </span>
          <h2 className="font-heading text-[clamp(3rem,8vw,7rem)] leading-none text-[#FAFAFA] mt-2">
            Safety <span className="text-[#C9943A]">First</span>,
            <br />
            Always
          </h2>
        </div>

        <p
          ref={textRef}
          className="text-center text-[#D4C4A8]/70 text-lg max-w-2xl mx-auto mb-20 font-light leading-relaxed"
        >
          Our Safety First culture is not just a policy — it is the foundation of
          every project. With triple ISO certification, we operate at the
          intersection of quality, environmental stewardship, and human safety.
        </p>

        {/* ISO Badge grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {ISO_BADGES.map((badge, i) => (
            <div
              key={badge.code}
              ref={(el) => {
                badgeRefs.current[i] = el;
              }}
              className="relative group"
            >
              {/* Badge card */}
              <div className="iso-badge border border-[#C9943A]/20 bg-black/60 backdrop-blur-sm p-8 rounded-sm text-center transition-all duration-500 hover:border-[#C9943A]/60 hover:bg-black/80">
                {/* Outer ring */}
                <div
                  className="w-28 h-28 rounded-full border-2 mx-auto mb-6 flex items-center justify-center relative"
                  style={{ borderColor: badge.color }}
                >
                  <div
                    className="absolute inset-2 rounded-full opacity-10"
                    style={{ backgroundColor: badge.color }}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-spin"
                    style={{
                      background: `conic-gradient(${badge.color}40 0deg, transparent 120deg, transparent 360deg)`,
                      animationDuration: `${4 + i}s`,
                    }}
                  />
                  <div className="relative z-10">
                    <p
                      className="font-heading text-lg leading-none"
                      style={{ color: badge.color }}
                    >
                      ISO
                    </p>
                    <p
                      className="font-heading text-2xl leading-none"
                      style={{ color: badge.color }}
                    >
                      {badge.code.split(" ")[1]}
                    </p>
                    <p
                      className="text-[10px] font-mono mt-0.5"
                      style={{ color: badge.color }}
                    >
                      :2015
                    </p>
                  </div>
                </div>

                <h3 className="font-heading text-xl text-[#FAFAFA] mb-3">
                  {badge.title}
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm leading-relaxed font-light">
                  {badge.description}
                </p>

                {/* Certified label */}
                <div
                  className="mt-5 inline-flex items-center gap-2 text-xs tracking-widest uppercase px-3 py-1 border rounded-full"
                  style={{ borderColor: `${badge.color}40`, color: badge.color }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: badge.color }}
                  />
                  Certified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety stats bar */}
        <div className="mt-20 grid grid-cols-3 gap-0 border border-[#C9943A]/15 rounded-sm overflow-hidden">
          {[
            { label: "Zero Harm Target", value: "100%" },
            { label: "Site Inspections / Year", value: "200+" },
            { label: "Safety Training Hours", value: "1,200+" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`py-8 text-center ${
                i < 2 ? "border-r border-[#C9943A]/15" : ""
              }`}
            >
              <p className="font-heading text-4xl text-[#C9943A]">{item.value}</p>
              <p className="text-[#D4C4A8]/50 text-xs tracking-widest uppercase mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
