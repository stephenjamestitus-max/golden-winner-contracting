"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Al Futtaim Qusais 349 Units",
    value: "AED 8,226,423",
    period: "2021–2022",
    client: "Al Futtaim Engineering",
    type: "MEP & Plumbing",
  },
  {
    name: "Tecom Rahaba Residence 4 Buildings",
    value: "AED 9,999,084",
    period: "2025",
    client: "Tecom Investments FZ",
    type: "Full Renovation",
  },
  {
    name: "ADCP Sheika Roda Building Renovation",
    value: "AED 4,302,375",
    period: "2023–2024",
    client: "ADCP",
    type: "Renovation",
  },
  {
    name: "Tecom Dubai Industrial Washroom",
    value: "AED 4,736,950",
    period: "2023–2024",
    client: "Tecom Investments FZ",
    type: "Fit-Out",
  },
  {
    name: "Al Futtaim Fit-Out Deira",
    value: "AED 1,828,428",
    period: "2022–2023",
    client: "Al Futtaim Engineering",
    type: "Fit-Out",
  },
  {
    name: "HVAC Works Al Futtaim",
    value: "AED 872,386",
    period: "2021–2022",
    client: "Al Futtaim Engineering",
    type: "HVAC",
  },
  {
    name: "Idama Arabian Ranches Electrical",
    value: "AED 1,005,000",
    period: "2024–2025",
    client: "Idama",
    type: "Electrical",
  },
  {
    name: "Jumeirah Beach Resort Changing Rooms",
    value: "AED 715,350",
    period: "2025",
    client: "JBR",
    type: "Fit-Out",
  },
  {
    name: "Al Futtaim Plumbing Al Qusais",
    value: "AED 695,000",
    period: "2021–2022",
    client: "Al Futtaim Engineering",
    type: "Plumbing",
  },
  {
    name: "Tecom ACP Cladding Publishing Pavilion",
    value: "AED 647,000",
    period: "2024–2025",
    client: "Tecom Investments FZ",
    type: "Cladding",
  },
  {
    name: "Idama Crystal Lagoon Machine Room",
    value: "AED 620,000",
    period: "2024",
    client: "Idama",
    type: "MEP Works",
  },
  {
    name: "Al Ghurair Centre Washroom",
    value: "AED 432,000",
    period: "2024",
    client: "Al Ghurair",
    type: "Fit-Out",
  },
  {
    name: "Tecom Internet City Offices",
    value: "AED 304,000",
    period: "2023",
    client: "Tecom Investments FZ",
    type: "Renovation",
  },
];

export default function ProjectsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#C9943A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#C9943A] text-xs tracking-[0.4em] uppercase font-mono">
            Our Portfolio
          </span>
          <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-none text-[#FAFAFA] mt-2">
            Project <span className="text-[#C9943A]">Timeline</span>
          </h2>
          <p className="mt-4 text-[#D4C4A8]/50 text-sm">
            AED 40M+ in completed projects across Dubai
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
          />

          <div className="space-y-8">
            {PROJECTS.map((project, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={project.name}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={`relative flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`w-[calc(50%-2rem)] ${isLeft ? "pr-6 text-right" : "pl-6 text-left"}`}>
                    <div className="group border border-[#C9943A]/15 bg-black/40 p-5 rounded-sm hover:border-[#C9943A]/40 transition-all duration-300 hover:bg-black/60">
                      <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                        <span className="text-[#C9943A]/60 text-xs font-mono tracking-wider">
                          {project.period}
                        </span>
                        <span className="text-[#D4C4A8]/30 text-xs">·</span>
                        <span className="text-[#D4C4A8]/40 text-xs uppercase tracking-wider">
                          {project.type}
                        </span>
                      </div>
                      <h3 className="text-[#FAFAFA] font-medium text-sm leading-snug group-hover:text-[#C9943A] transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="font-heading text-2xl text-[#C9943A] mt-1">
                        {project.value}
                      </p>
                      <p className="text-[#D4C4A8]/40 text-xs mt-1 uppercase tracking-wider">
                        {project.client}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#C9943A] bg-[#0A0A0A] z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9943A]" />
                  </div>

                  {/* Empty side */}
                  <div className="w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="mt-20 text-center border border-[#C9943A]/20 bg-black/30 py-10 px-6 rounded-sm">
          <p className="text-[#D4C4A8]/50 text-xs tracking-[0.3em] uppercase mb-2">
            Total Portfolio Value
          </p>
          <p className="font-heading text-6xl text-[#C9943A]">AED 40M+</p>
          <p className="text-[#D4C4A8]/30 text-sm mt-2">
            13 landmark projects · 2021–2025
          </p>
        </div>
      </div>
    </section>
  );
}
