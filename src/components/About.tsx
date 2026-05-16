"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 14, suffix: "+", label: "Years of Excellence" },
  { value: 21, suffix: "", label: "Services Offered" },
  { value: 45, suffix: "+", label: "Trusted Clients" },
  { value: 40, suffix: "M+", label: "AED in Projects", prefix: "AED " },
];

function StatCounter({
  value,
  suffix,
  label,
  prefix = "",
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.fromTo(
        { val: 0 },
        { val: value },
        {
          val: value,
          duration: 2.2,
          ease: "power2.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: function () {
            if (numRef.current) {
              numRef.current.textContent = Math.floor(this.targets()[0].val).toString();
            }
          },
        }
      );
    });

    return () => ctx.revert();
  }, [value, index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center p-8 border border-[#C9943A]/20 rounded-sm bg-black/30 backdrop-blur-sm"
    >
      <div className="stat-num">
        {prefix}
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <p className="mt-2 text-[#D4C4A8] text-sm tracking-widest uppercase font-light">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers
      gsap.to(layer1Ref.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(layer2Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(layer3Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Parallax layers */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-gradient-to-r from-[#6B2D1A]/10 to-transparent"
      />
      <div
        ref={layer3Ref}
        className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-[#C9943A]/5 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="text-[#C9943A] font-heading tracking-[0.3em] text-sm uppercase">
            Who We Are
          </span>
        </div>
        <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-none text-[#FAFAFA] mb-16">
          A Legacy of
          <br />
          <span className="text-[#C9943A]">Excellence</span>
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Company description */}
        <div ref={textRef} className="max-w-3xl">
          <div className="w-16 h-0.5 bg-[#C9943A] mb-8" />
          <p className="text-[#D4C4A8] text-lg leading-relaxed font-light">
            Golden Winner Contracting LLC, established in 2011 in the UAE, is a
            multidisciplinary construction company specializing in MEP systems,
            air conditioning, electrical works, and infrastructure maintenance,
            including irrigation, firefighting networks, and street lighting.
          </p>
          <p className="mt-6 text-[#D4C4A8]/70 text-base leading-relaxed font-light">
            With over a decade of experience serving Dubai&apos;s most prestigious
            clients, we deliver end-to-end contracting solutions built on
            trust, precision, and unwavering quality standards.
          </p>
          <div className="mt-8 flex items-center gap-4 text-[#D4C4A8]/50 text-sm tracking-widest uppercase">
            <span>Dubai, UAE</span>
            <span className="w-6 h-px bg-[#C9943A]/40" />
            <span>R-25 France Cluster, International City</span>
          </div>
        </div>
      </div>
    </section>
  );
}
