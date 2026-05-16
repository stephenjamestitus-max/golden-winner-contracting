"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://videos.pexels.com/video-files/28823329/12513254_2560_1440_30fps.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.4,
      });
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.7,
      });

      // Video parallax — moves at 0.4× scroll speed as section exits
      gsap.to(videoWrapRef.current, {
        y: "40%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fades up slightly slower
      gsap.to(contentRef.current, {
        y: "20%",
        opacity: 0.3,
        ease: "none",
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
      {/* Video background — oversized so parallax never shows gaps */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 scale-[1.15] will-change-transform"
        style={{ zIndex: 0 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_URL}
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 1 }}
      />
      {/* Bottom fade to site bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0A0A0A]"
        style={{ zIndex: 2 }}
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative text-center px-6 max-w-6xl mx-auto"
        style={{ zIndex: 10 }}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-[#C9943A]/60 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-[#C9943A]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
