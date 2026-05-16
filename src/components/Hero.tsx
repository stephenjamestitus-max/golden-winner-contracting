"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeCrane from "./ThreeCrane";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.6,
      });

      // Parallax on scroll
      gsap.to(overlayRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Construction site background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
      </div>

      {/* Three.js crane — fixed, behind everything */}
      <ThreeCrane />

      {/* Hero content */}
      <div
        ref={overlayRef}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <p className="text-[#C9943A] font-heading tracking-[0.3em] text-lg mb-4 uppercase">
          Est. 2011 · Dubai, UAE
        </p>

        <h1
          ref={titleRef}
          className="font-heading text-[clamp(4rem,12vw,10rem)] leading-none tracking-wide text-[#FAFAFA] uppercase"
        >
          Golden Winner
          <br />
          <span className="text-[#C9943A]">Contracting</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-[clamp(1rem,2.5vw,1.5rem)] text-[#D4C4A8] font-light tracking-widest uppercase"
        >
          Built on Trust. Delivered with Precision.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#D4C4A8]/70 tracking-widest uppercase">
          <span>ISO 9001</span>
          <span className="w-1 h-1 rounded-full bg-[#C9943A]" />
          <span>ISO 14001</span>
          <span className="w-1 h-1 rounded-full bg-[#C9943A]" />
          <span>ISO 45001</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[#C9943A]/60 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-[#C9943A]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
