"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1.4, ease: "power4.out", delay: 0.4,
      });
      gsap.from(subtitleRef.current, {
        y: 30, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.9,
      });
      gsap.from(scrollRef.current, { opacity: 0, duration: 1, delay: 1.7 });

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

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
        style={{ zIndex: 1 }}
      />
      {/* Bottom bleed to site background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative text-center px-6 max-w-6xl mx-auto"
        style={{ zIndex: 10 }}
      >
        <p className="text-[#C9943A] font-heading tracking-[0.3em] text-base md:text-lg mb-4 uppercase">
          Est. 2011 · Dubai, UAE
        </p>

        <h1
          ref={titleRef}
          className="font-heading text-[clamp(3rem,10vw,9rem)] leading-none tracking-wide text-[#FAFAFA] uppercase"
        >
          Golden Winner
          <br />
          <span className="text-[#C9943A]">Contracting</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-5 text-[clamp(0.85rem,2vw,1.35rem)] text-[#D4C4A8] font-light tracking-[0.2em] uppercase"
        >
          Built on Trust. Delivered with Precision.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs text-[#D4C4A8]/70 tracking-widest uppercase">
          <span>ISO 9001</span>
          <span className="w-1 h-1 rounded-full bg-[#C9943A]" />
          <span>ISO 14001</span>
          <span className="w-1 h-1 rounded-full bg-[#C9943A]" />
          <span>ISO 45001</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-[#C9943A]/60 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9943A]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
