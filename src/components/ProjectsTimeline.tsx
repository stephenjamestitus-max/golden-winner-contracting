"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  value: string;
  period: string;
  client: string;
  type: string;
  photos?: { src: string; w: number; h: number }[];
  photoLabel?: string;
}

const PROJECTS: Project[] = [
  {
    name: "Al Futtaim Qusais 349 Units",
    value: "AED 8,226,423",
    period: "2021–2022",
    client: "Al Futtaim Engineering",
    type: "MEP & Plumbing",
    photoLabel: "Al Qusais Residential Complex",
    photos: [
      { src: "/projects/qusais_complex_page08_img01_222x279.png", w: 222, h: 279 },
      { src: "/projects/qusais_complex_page09_img01_230x265.png", w: 230, h: 265 },
      { src: "/projects/qusais_complex_page09_img02_220x275.png", w: 220, h: 275 },
      { src: "/projects/qusais_complex_page09_img03_222x278.png", w: 222, h: 278 },
    ],
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
    photoLabel: "Waterproofing Works",
    photos: [
      { src: "/projects/waterproofing_page14_img01_780x517.png", w: 780, h: 517 },
      { src: "/projects/waterproofing_page14_img02_701x507.png", w: 701, h: 507 },
      { src: "/projects/waterproofing_page14_img03_720x495.png", w: 720, h: 495 },
      { src: "/projects/waterproofing_page14_img04_646x546.png", w: 646, h: 546 },
    ],
  },
  {
    name: "Tecom Dubai Industrial Washroom",
    value: "AED 4,736,950",
    period: "2023–2024",
    client: "Tecom Investments FZ",
    type: "Fit-Out",
    photoLabel: "Floor Coating & Epoxy Works",
    photos: [
      { src: "/projects/floor_coating_page15_img01_780x503.png", w: 780, h: 503 },
      { src: "/projects/floor_coating_page15_img02_714x468.png", w: 714, h: 468 },
      { src: "/projects/floor_coating_page15_img03_752x527.png", w: 752, h: 527 },
      { src: "/projects/floor_coating_page15_img04_645x496.png", w: 645, h: 496 },
    ],
  },
  {
    name: "Al Futtaim Fit-Out Deira",
    value: "AED 1,828,428",
    period: "2022–2023",
    client: "Al Futtaim Engineering",
    type: "Fit-Out",
    photoLabel: "Truelase Fit-Out — Mirdif, Dubai",
    photos: [
      { src: "/projects/truelase_fitout_page11_img01_649x703.png", w: 649, h: 703 },
      { src: "/projects/truelase_fitout_page11_img02_613x623.png", w: 613, h: 623 },
      { src: "/projects/truelase_fitout_page11_img03_672x679.png", w: 672, h: 679 },
    ],
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
    photoLabel: "Carbon Wrapping Works",
    photos: [
      { src: "/projects/carbon_wrapping_page13_img01_807x544.png", w: 807, h: 544 },
      { src: "/projects/carbon_wrapping_page13_img02_640x512.png", w: 640, h: 512 },
      { src: "/projects/carbon_wrapping_page13_img03_776x536.png", w: 776, h: 536 },
      { src: "/projects/carbon_wrapping_page13_img04_636x512.png", w: 636, h: 512 },
    ],
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
    photoLabel: "Column Jacketing Works",
    photos: [
      { src: "/projects/column_jacketing_page12_img01_622x471.png", w: 622, h: 471 },
      { src: "/projects/column_jacketing_page12_img02_628x510.png", w: 628, h: 510 },
      { src: "/projects/column_jacketing_page12_img03_658x474.png", w: 658, h: 474 },
      { src: "/projects/column_jacketing_page12_img04_633x528.png", w: 633, h: 528 },
    ],
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

/** Project photo with graceful fallback — if the file is missing the cell
 *  renders as an intentional-looking blueprint tile instead of a broken image. */
function ProjectImage({
  src,
  alt,
  sizes,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  sizes: string;
  fallbackLabel: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10141d] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-[0.07] blueprint-bg" />
        <span className="relative text-[#C9943A]/50 text-[9px] font-mono tracking-[0.25em] uppercase text-center px-2">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      loading="lazy"
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function PhotoGrid({
  photos,
  label,
  project,
}: {
  photos: NonNullable<Project["photos"]>;
  label?: string;
  project: Project;
}) {
  const is3 = photos.length === 3;

  return (
    <div>
      {label && (
        <p className="text-[#C9943A]/70 text-[10px] tracking-[0.25em] uppercase font-mono mb-2">
          {label}
        </p>
      )}
      {is3 ? (
        // 3-photo: full-width top + two below
        <div className="grid grid-rows-2 gap-1.5" style={{ height: "220px" }}>
          <div className="relative overflow-hidden rounded-sm group">
            <ProjectImage
              src={photos[0].src}
              alt={label ?? "Project photo"}
              sizes="(max-width: 768px) 100vw, 400px"
              fallbackLabel={project.type}
            />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {photos.slice(1).map((p, i) => (
              <div key={i} className="relative overflow-hidden rounded-sm group">
                <ProjectImage
                  src={p.src}
                  alt={label ?? "Project photo"}
                  sizes="(max-width: 768px) 50vw, 200px"
                  fallbackLabel={project.type}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 4-photo: 2×2 grid
        <div className="grid grid-cols-2 gap-1.5" style={{ height: "220px" }}>
          {photos.map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-sm group">
              <ProjectImage
                src={p.src}
                alt={label ?? "Project photo"}
                sizes="(max-width: 768px) 50vw, 200px"
                fallbackLabel={project.type}
              />
            </div>
          ))}
        </div>
      )}

      {/* Caption row — project name · type · client */}
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <span className="text-[#D4C4A8]/50 text-[10px] tracking-[0.18em] uppercase font-light">
          {project.name}
        </span>
        <span className="text-[#C9943A]/30 text-[9px]">·</span>
        <span className="text-[#D4C4A8]/35 text-[10px] tracking-[0.18em] uppercase font-light">
          {project.type}
        </span>
        <span className="text-[#C9943A]/30 text-[9px]">·</span>
        <span className="text-[#D4C4A8]/35 text-[10px] tracking-[0.18em] uppercase font-light">
          {project.client}
        </span>
      </div>
    </div>
  );
}

function ProjectInfo({ project, align }: { project: Project; align: "left" | "right" }) {
  const isRight = align === "right";
  return (
    <div className={`text-left ${isRight ? "md:text-right" : ""}`}>
      <div
        className={`flex items-center gap-2 mb-2 justify-start ${
          isRight ? "md:justify-end" : ""
        }`}
      >
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
      <p className="font-heading text-2xl text-gradient-gold mt-1">{project.value}</p>
      <p className="text-[#D4C4A8]/40 text-xs mt-1 uppercase tracking-wider">
        {project.client}
      </p>
    </div>
  );
}

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
        const project = PROJECTS[i];
        const dir = project.photos ? 0 : i % 2 === 0 ? -50 : 50;
        gsap.from(item, {
          x: dir,
          y: project.photos ? 30 : 0,
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

  // Split into alternating text-only and featured (photo) projects
  let altIndex = 0; // tracks alternation for text-only items

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#C9943A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#C9943A] text-xs tracking-[0.4em] uppercase font-mono">
            Our Portfolio
          </span>
          <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-none text-[#FAFAFA] mt-2">
            Project <span className="text-gradient-gold">Timeline</span>
          </h2>
          <p className="mt-4 text-[#D4C4A8]/50 text-sm">
            AED 40M+ in completed projects across Dubai
          </p>
        </div>

        {/* Timeline — spine sits left on mobile, centre on md+ */}
        <div className="relative">
          <div
            ref={lineRef}
            className="timeline-line absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0"
          />

          <div className="space-y-8">
            {PROJECTS.map((project, i) => {
              if (project.photos) {
                // ── Featured card (photo project) — full width ──
                return (
                  <div
                    key={project.name}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className="relative w-full"
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full border-2 border-[#C9943A] bg-[#0A0A0A] z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9943A]" />
                    </div>

                    <div className="group mt-4 ml-10 md:ml-0 border border-[#C9943A]/25 bg-black/50 rounded-sm p-5 grid md:grid-cols-2 gap-5 hover:border-[#C9943A]/50 hover:shadow-[0_20px_60px_-25px_rgba(201,148,58,0.25)] transition-all duration-300">
                      {/* Info */}
                      <div className="flex flex-col justify-between">
                        <ProjectInfo project={project} align="left" />
                        <div className="mt-4 w-10 h-px bg-[#C9943A]/30" />
                      </div>
                      {/* Photos */}
                      <PhotoGrid photos={project.photos} label={project.photoLabel} project={project} />
                    </div>
                  </div>
                );
              }

              // ── Standard card — full-width left-aligned on mobile, alternating on md+ ──
              const isLeft = altIndex % 2 === 0;
              altIndex++;
              return (
                <div
                  key={project.name}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-6" : "md:pl-6"
                    }`}
                  >
                    <div className="group border border-[#C9943A]/15 bg-black/40 p-5 rounded-sm hover:border-[#C9943A]/40 transition-all duration-300 hover:bg-black/60 hover:-translate-y-0.5">
                      <ProjectInfo project={project} align={isLeft ? "right" : "left"} />
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#C9943A] bg-[#0A0A0A] z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9943A]" />
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Total bar */}
        <div className="mt-20 relative text-center border border-[#C9943A]/20 bg-black/30 py-12 px-6 rounded-sm overflow-hidden">
          <div className="absolute inset-x-0 top-0 hairline-gold" />
          <p className="text-[#D4C4A8]/50 text-xs tracking-[0.3em] uppercase mb-3">
            Total Portfolio Value
          </p>
          <p className="font-heading text-6xl md:text-7xl text-gradient-gold">AED 40M+</p>
          <p className="text-[#D4C4A8]/30 text-sm mt-3">
            13 landmark projects · 2021–2025
          </p>
          <div className="absolute inset-x-0 bottom-0 hairline-gold" />
        </div>
      </div>
    </section>
  );
}
