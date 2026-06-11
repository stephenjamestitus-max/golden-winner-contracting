"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 14, suffix: "+", label: "Years of Excellence" },
  { value: 21, suffix: "", label: "Services Offered" },
  { value: 45, suffix: "+", label: "Trusted Clients" },
  { value: 40, suffix: "M+", label: "AED in Projects", prefix: "AED " },
];

const PILLARS = [
  "End-to-end delivery — from design to handover",
  "In-house MEP, civil & fit-out teams",
  "ISO 9001 · 14001 · 45001 management systems",
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
      className="group relative flex flex-col items-center px-4 py-8 md:py-10 border border-[#C9943A]/15 rounded-sm bg-black/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#C9943A]/45 hover:bg-black/50"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#C9943A]/50 group-hover:w-24 transition-all duration-500" />
      <div className="stat-num">
        {prefix}
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <p className="mt-3 text-[#D4C4A8]/70 text-[11px] md:text-sm tracking-[0.2em] uppercase font-light text-center">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgMainRef = useRef<HTMLDivElement>(null);
  const imgSmallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Collage parallax — images drift at different speeds
      gsap.to(imgMainRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(imgSmallRef.current, {
        yPercent: -22,
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

      gsap.from([imgMainRef.current, imgSmallRef.current], {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgMainRef.current,
          start: "top 80%",
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
      className="relative py-28 md:py-36 px-6 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6B2D1A]/10 to-transparent" />
      <div
        ref={orbRef}
        className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-[#C9943A]/5 blur-3xl"
      />
      {/* Watermark */}
      <span
        aria-hidden="true"
        className="absolute -top-4 right-0 font-heading text-outline text-[clamp(6rem,18vw,16rem)] leading-none select-none pointer-events-none opacity-60"
      >
        2011
      </span>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#C9943A]/60" />
          <span className="text-[#C9943A] font-heading tracking-[0.3em] text-sm uppercase">
            Who We Are
          </span>
        </div>
        <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-none text-[#FAFAFA] mb-16 md:mb-20">
          A Legacy of
          <br />
          <span className="text-gradient-gold">Excellence</span>
        </h2>

        {/* Editorial split — copy left, collage right */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center mb-20 md:mb-28">
          <div ref={textRef}>
            <div className="w-16 h-0.5 bg-[#C9943A] mb-8" />
            <p className="text-[#D4C4A8] text-lg md:text-xl leading-relaxed font-light">
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

            <ul className="mt-8 space-y-3">
              {PILLARS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[#D4C4A8]/80 text-sm font-light">
                  <span className="w-5 h-5 rounded-full border border-[#C9943A]/50 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9943A]" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 text-[#D4C4A8]/50 text-xs md:text-sm tracking-widest uppercase">
              <span>Dubai, UAE</span>
              <span className="w-6 h-px bg-[#C9943A]/40" />
              <span>R-25 France Cluster, International City</span>
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative h-[420px] md:h-[520px]">
            {/* Gold offset frame */}
            <div className="absolute top-6 left-6 right-0 bottom-0 border border-[#C9943A]/30 rounded-sm pointer-events-none" />

            <div
              ref={imgMainRef}
              className="absolute top-0 left-0 w-[78%] h-[72%] overflow-hidden rounded-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <Image
                src="/images/about/site-team.jpg"
                alt="Crews and tower cranes working on a large construction site"
                fill
                sizes="(max-width: 768px) 78vw, 540px"
                className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>

            <div
              ref={imgSmallRef}
              className="absolute bottom-2 right-2 w-[52%] h-[48%] overflow-hidden rounded-sm border border-[#C9943A]/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]"
            >
              <Image
                src="/images/about/blueprints.jpg"
                alt="Technical drawings and rolled blueprints"
                fill
                sizes="(max-width: 768px) 52vw, 360px"
                className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-3 left-3 text-[#FAFAFA]/90 font-heading tracking-[0.2em] text-sm">
                PLAN · BUILD · DELIVER
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-4 md:left-10 bg-[#0A0A0A] border border-[#C9943A]/40 rounded-sm px-5 py-3.5 shadow-xl">
              <p className="font-heading text-3xl text-gradient-gold leading-none">14+</p>
              <p className="text-[#D4C4A8]/60 text-[10px] tracking-[0.25em] uppercase mt-1">
                Years on site
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
