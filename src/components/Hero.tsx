"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_STATS = [
  { value: "14+", label: "Years in the UAE" },
  { value: "45+", label: "Trusted Clients" },
  { value: "AED 40M+", label: "Projects Delivered" },
  { value: "3×", label: "ISO Certified" },
];

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked line reveal — each headline line slides up out of its clip
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.35,
      });
      gsap.from(eyebrowRef.current, {
        opacity: 0, y: 16, duration: 0.9, ease: "power3.out", delay: 0.25,
      });
      gsap.from(subtitleRef.current, {
        y: 24, opacity: 0, duration: 1.1, ease: "power3.out", delay: 1.05,
      });
      gsap.from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.25,
      });
      gsap.from(statsRef.current, {
        y: 26, opacity: 0, duration: 1, ease: "power3.out", delay: 1.45,
      });
      gsap.from(scrollRef.current, { opacity: 0, duration: 1, delay: 1.9 });

      // Video parallax — 0.4× scroll speed
      gsap.to(videoWrapRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fades as section exits
      gsap.to(contentRef.current, {
        y: "15%", opacity: 0.2, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video — scaled up so parallax travel never reveals edges */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ zIndex: 0 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        >
          <source
            src="https://videos.pexels.com/video-files/28823329/12513254_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark gradient overlay + cinematic vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/85"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Bottom bleed to site background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative text-center px-6 max-w-6xl mx-auto -mt-8 md:-mt-6"
        style={{ zIndex: 10 }}
      >
        <p
          ref={eyebrowRef}
          className="text-[#C9943A] font-heading tracking-[0.35em] text-sm md:text-base mb-5 uppercase flex items-center justify-center gap-4"
        >
          <span className="hidden sm:block w-10 h-px bg-[#C9943A]/50" />
          Est. 2011 · Dubai, UAE
          <span className="hidden sm:block w-10 h-px bg-[#C9943A]/50" />
        </p>

        <h1 className="font-heading text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-wide text-[#FAFAFA] uppercase">
          <span className="block overflow-hidden pb-1">
            <span ref={line1Ref} className="block">Golden Winner</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span ref={line2Ref} className="block text-gradient-gold">Contracting</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 text-[clamp(0.8rem,1.8vw,1.2rem)] text-[#D4C4A8] font-light tracking-[0.25em] uppercase"
        >
          Built on Trust. Delivered with Precision.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("#xray")}
            className="btn-shimmer text-[#0A0A0A] font-heading tracking-[0.2em] text-base md:text-lg px-8 py-3.5 rounded-sm"
          >
            Explore Our Services
          </button>
          <button
            onClick={() => scrollTo("#projects")}
            className="btn-ghost font-heading tracking-[0.2em] text-base md:text-lg px-8 py-3.5 rounded-sm"
          >
            View Projects
          </button>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-10 md:mt-12 mx-auto max-w-3xl border-y border-[#C9943A]/20 bg-black/25 backdrop-blur-sm grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#C9943A]/15"
        >
          {HERO_STATS.map((s) => (
            <div key={s.label} className="py-3.5 px-2 text-center">
              <p className="font-heading text-lg md:text-2xl text-[#C9943A] leading-none">
                {s.value}
              </p>
              <p className="text-[#D4C4A8]/50 text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-[#C9943A]/60 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9943A]/60 to-transparent animate-pulse" />
      </div>

      {/* Side meta — vertical labels, desktop only */}
      <div
        className="hidden lg:flex absolute left-6 bottom-24 items-center gap-3 origin-bottom-left rotate-90 text-[#D4C4A8]/30 text-[10px] tracking-[0.4em] uppercase"
        style={{ zIndex: 10 }}
      >
        <span className="w-8 h-px bg-[#C9943A]/30" />
        ISO 9001 · 14001 · 45001
      </div>
    </section>
  );
}
