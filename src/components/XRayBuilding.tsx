"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FLOORS = [
  {
    id: "basement",
    label: "Basement",
    phase: "Groundworks",
    tagline: "Below ground — where strength begins.",
    y: 370, height: 60,
    color: "#4A90D9",
    services: ["Waterproofing", "Block Works", "Curbstone", "Interlock"],
    pipes: false,
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=70",
    alt: "Excavation and groundworks on a construction site",
  },
  {
    id: "floor1",
    label: "Ground Floor",
    phase: "Structure",
    tagline: "Concrete, steel and the discipline to hold it all.",
    y: 300, height: 70,
    color: "#4A90D9",
    services: ["Shell & Core", "Column Jacketing", "Carbon Wrapping", "Reinstatement"],
    pipes: false,
    img: "https://images.unsplash.com/photo-1541976590-713941681591?w=1400&q=70",
    alt: "Reinforced concrete structure rising under a tower crane",
  },
  {
    id: "floor2",
    label: "1st Floor — MEP",
    phase: "MEP Systems",
    tagline: "The arteries of the building, routed to the millimetre.",
    y: 225, height: 75,
    color: "#4ACDDD",
    services: ["MEP Works", "HVAC", "Electrical", "Plumbing"],
    pipes: true,
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=70",
    alt: "Industrial pipework and mechanical services",
  },
  {
    id: "floor3",
    label: "2nd Floor — Fit-Out",
    phase: "Fit-Out",
    tagline: "Raw space, shaped into rooms that work.",
    y: 155, height: 70,
    color: "#4A90D9",
    services: ["Fit-Out", "Dry Wall", "Partitions", "False Ceilings", "Carpentry"],
    pipes: false,
    img: "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?w=1400&q=70",
    alt: "Tradesman carrying out interior fit-out works",
  },
  {
    id: "floor4",
    label: "3rd Floor — Finishing",
    phase: "Finishes",
    tagline: "The last 5% that people notice 95% of the time.",
    y: 85, height: 70,
    color: "#4A90D9",
    services: ["Plastering", "Painting", "Wall & Floor Tiling", "Epoxy Floor"],
    pipes: false,
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1400&q=70",
    alt: "Painter rolling fresh paint onto an interior wall",
  },
  {
    id: "roof",
    label: "Roof Level",
    phase: "Envelope & Handover",
    tagline: "Sealed, clad, landscaped — ready for life.",
    y: 20, height: 65,
    color: "#6B8CBA",
    services: ["Cladding", "Landscaping", "Insulation", "Refurbishment", "Renovation"],
    pipes: false,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=70",
    alt: "Completed glass towers against a golden sky",
  },
];

const FLOOR_TICKS = ["B", "G", "01", "02", "03", "R"];

// Total section height — each floor gets one viewport of scroll
const SECTION_VH = (FLOORS.length + 1.5) * 100;

export default function XRayBuilding() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [activeFloor, setActiveFloor] = useState(-1);
  const [drawnFloors, setDrawnFloors] = useState<number[]>([]);

  // clipPath rects — GSAP animates their `width` attr to reveal each floor
  const clipRefs = useRef<(SVGRectElement | null)[]>([]);
  // MEP pipe groups
  const pipeRefs = useRef<(SVGGElement | null)[]>([]);
  // Track which floors have already fired their draw animation (avoids closure issues)
  const drawnSet = useRef<Set<number>>(new Set());

  // Which floor the photo panel shows (intro state previews the basement)
  const displayFloor = Math.max(activeFloor, 0);
  const floor = FLOORS[displayFloor];
  const progressPct = activeFloor < 0 ? 0 : Math.round(((activeFloor + 1) / FLOORS.length) * 100);

  const animateFloor = useCallback((i: number) => {
    // Reveal floor fill via clipPath width 0→280
    const clip = clipRefs.current[i];
    if (clip) {
      gsap.fromTo(
        clip,
        { attr: { width: 0 } },
        { attr: { width: 280 }, duration: 0.85, ease: "power3.out" }
      );
    }
    // Draw MEP pipes with strokeDashoffset
    if (FLOORS[i].pipes) {
      // Small delay so the floor reveal leads the pipes
      setTimeout(() => {
        const pipeGroup = pipeRefs.current[i];
        if (!pipeGroup) return;
        const lines = pipeGroup.querySelectorAll("line");
        gsap.fromTo(
          lines,
          { strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.inOut" }
        );
      }, 400);
    }
  }, []);

  useEffect(() => {
    // Reset on mount in case of hot-reload
    const drawn = drawnSet.current;
    drawn.clear();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.progress <= 0.01) {
            setActiveFloor(-1);
            return;
          }
          const idx = Math.min(
            Math.floor(self.progress * FLOORS.length),
            FLOORS.length - 1
          );
          setActiveFloor(idx);

          if (!drawnSet.current.has(idx)) {
            drawnSet.current.add(idx);
            setDrawnFloors((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
            animateFloor(idx);
          }
        },
      });
    });

    return () => {
      ctx.revert();
      drawn.clear();
    };
  }, [animateFloor]);

  return (
    <section
      id="xray"
      ref={sectionRef}
      style={{ height: `${SECTION_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden blueprint-bg">

        {/* ── Atmospheric photo backdrop — crossfades with the active phase ── */}
        <div className="absolute inset-0" aria-hidden="true">
          {FLOORS.map((f, i) => (
            <div
              key={f.id}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
              style={{ opacity: i === displayFloor && activeFloor >= 0 ? 0.16 : 0 }}
            >
              <Image
                src={f.img}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
          {/* Vignette to keep the blueprint legible */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(7,13,26,0.9)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a1628] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1628] to-transparent" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 w-full h-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col pt-16 md:pt-20 pb-5 md:pb-8">

          {/* Title */}
          <div className="text-center mb-3 md:mb-5 flex-shrink-0">
            <span className="text-blue-300/60 text-[10px] tracking-[0.4em] uppercase font-mono">
              X-Ray Building Section
            </span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] text-[#FAFAFA] mt-1 leading-none">
              Our <span className="text-gradient-gold">Services</span>
            </h2>
            <p className="hidden md:block text-[#D4C4A8]/45 text-xs mt-1.5 tracking-wide">
              One building. Twenty-one trades. Keep scrolling — and watch it rise.
            </p>
          </div>

          {/* Main layout — stacks on mobile, side-by-side on md+ */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-center md:items-stretch flex-1 min-h-0">

            {/* Blueprint — the building that builds itself */}
            <div className="flex items-center justify-center flex-shrink-0 w-full md:w-auto md:flex-[4] min-h-0">
              <svg
                viewBox="0 0 300 460"
                className="h-[22vh] md:h-full md:max-h-[62vh] w-auto"
                style={{ filter: "drop-shadow(0 0 18px rgba(74,144,217,0.25))" }}
              >
                {/* ClipPath defs — one per floor, GSAP animates width */}
                <defs>
                  {FLOORS.map((f, i) => (
                    <clipPath key={i} id={`floor-clip-${i}`}>
                      <rect
                        ref={(el) => { clipRefs.current[i] = el; }}
                        x="9"
                        y={f.y - 1}
                        width="0"
                        height={f.height + 2}
                      />
                    </clipPath>
                  ))}
                </defs>

                {/* Exterior shell — always visible dashed outline */}
                <rect
                  x="10" y="10" width="280" height="420"
                  fill="none"
                  stroke="rgba(74,144,217,0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="5 3"
                />

                {/* Ground line */}
                <line
                  x1="10" y1="430" x2="290" y2="430"
                  stroke="rgba(74,144,217,0.25)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />

                {/* Floors */}
                {FLOORS.map((f, i) => {
                  const isActive  = activeFloor === i;
                  const isDrawn   = drawnFloors.includes(i);

                  return (
                    <g key={f.id}>
                      {/* Slab line — always visible, glows gold when active */}
                      <line
                        x1="10" y1={f.y + f.height}
                        x2="290" y2={f.y + f.height}
                        stroke={isActive ? "#C9943A" : "rgba(74,144,217,0.3)"}
                        strokeWidth={isActive ? 1.5 : 0.7}
                      />

                      {/* Clipped floor fill group — reveals L→R via clipPath */}
                      <g clipPath={`url(#floor-clip-${i})`}>
                        {/* Floor fill */}
                        <rect
                          x="10" y={f.y} width="280" height={f.height}
                          fill={isActive ? "rgba(201,148,58,0.09)" : "rgba(74,144,217,0.04)"}
                          stroke={isActive ? "#C9943A" : f.color}
                          strokeWidth={isActive ? 1.5 : 0.5}
                          style={{ transition: "fill 0.3s, stroke 0.3s" }}
                        />

                        {/* Left column */}
                        <rect x="10" y={f.y} width="12" height={f.height}
                          fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.12)"}
                          stroke={isActive ? "#C9943A" : f.color}
                          strokeWidth="0.5"
                        />
                        {/* Right column */}
                        <rect x="278" y={f.y} width="12" height={f.height}
                          fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.12)"}
                          stroke={isActive ? "#C9943A" : f.color}
                          strokeWidth="0.5"
                        />

                        {/* Gold glow outline when active */}
                        {isActive && (
                          <rect
                            x="10" y={f.y} width="280" height={f.height}
                            fill="none"
                            stroke="#C9943A"
                            strokeWidth="1.5"
                            opacity="0.5"
                            style={{ filter: "drop-shadow(0 0 6px #C9943A)" }}
                          />
                        )}

                        {/* MEP pipes — always rendered, animated via strokeDashoffset */}
                        {f.pipes && (
                          <g ref={(el) => { pipeRefs.current[i] = el; }}
                            opacity={isDrawn ? 1 : 0}
                            style={{ transition: "opacity 0.2s" }}
                          >
                            {/* HVAC duct */}
                            <line
                              x1="30" y1={f.y + 20} x2="200" y2={f.y + 20}
                              stroke="#4ACDDD" strokeWidth="3" strokeLinecap="round"
                              strokeDasharray="300" strokeDashoffset="300"
                            />
                            {/* Electrical */}
                            <line
                              x1="30" y1={f.y + 37} x2="240" y2={f.y + 37}
                              stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round"
                              strokeDasharray="300" strokeDashoffset="300"
                            />
                            {/* Plumbing */}
                            <line
                              x1="30" y1={f.y + 52} x2="170" y2={f.y + 52}
                              stroke="#4AD97A" strokeWidth="2" strokeLinecap="round"
                              strokeDasharray="300" strokeDashoffset="300"
                            />
                            {/* Vertical drops */}
                            <line
                              x1="80" y1={f.y + 20} x2="80" y2={f.y + 52}
                              stroke="#4ACDDD" strokeWidth="1.2"
                              strokeDasharray="300" strokeDashoffset="300"
                            />
                            <line
                              x1="160" y1={f.y + 20} x2="160" y2={f.y + 52}
                              stroke="#4ACDDD" strokeWidth="1.2"
                              strokeDasharray="300" strokeDashoffset="300"
                            />
                          </g>
                        )}
                      </g>

                      {/* Floor label — rendered above clip */}
                      {isActive && (
                        <text
                          x="155" y={f.y + f.height / 2 + 4}
                          textAnchor="middle"
                          fill="#C9943A"
                          fontSize="6.5"
                          fontFamily="monospace"
                          letterSpacing="1.5"
                        >
                          {f.label.toUpperCase()}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Roof / penthouse triangle */}
                <polygon
                  points="150,5 10,20 290,20"
                  fill="rgba(74,144,217,0.08)"
                  stroke={activeFloor === 5 ? "#C9943A" : "rgba(74,144,217,0.45)"}
                  strokeWidth="1"
                />

                {/* Dimension tick marks */}
                <line x1="3" y1="20" x2="3" y2="430"
                  stroke="rgba(74,144,217,0.2)" strokeWidth="0.5" />
                <line x1="1" y1="20" x2="5" y2="20"
                  stroke="rgba(74,144,217,0.2)" strokeWidth="0.5" />
                <line x1="1" y1="430" x2="5" y2="430"
                  stroke="rgba(74,144,217,0.2)" strokeWidth="0.5" />
                <circle cx="150" cy="10" r="2" fill="none"
                  stroke="rgba(74,144,217,0.35)" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Phase panel — photo + services for the active floor */}
            <div className="flex-1 md:flex-[6] w-full max-w-xl flex flex-col justify-center min-h-0 gap-3">

              {/* Photo window */}
              <div className="relative w-full h-[27vh] md:h-auto md:aspect-[16/9] md:max-h-[46vh] overflow-hidden rounded-sm border border-[#C9943A]/25 bg-black/40 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
                {FLOORS.map((f, i) => (
                  <div
                    key={f.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{ opacity: i === displayFloor ? 1 : 0 }}
                  >
                    <Image
                      src={f.img}
                      alt={f.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className={`object-cover ${i === displayFloor ? "kenburns-active" : ""}`}
                    />
                  </div>
                ))}

                {/* Legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />

                {/* Drafting corner accents */}
                <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-[#C9943A]/70" />
                <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-[#C9943A]/70" />

                {/* Phase badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2 bg-black/55 backdrop-blur-sm border border-[#C9943A]/30 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9943A] animate-pulse" />
                  <span className="text-[#C9943A] text-[10px] tracking-[0.25em] uppercase font-mono">
                    Phase {String(displayFloor + 1).padStart(2, "0")} / 0{FLOORS.length}
                  </span>
                </div>

                {/* Floor name + tagline */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                  <p className="text-[#C9943A] text-[10px] tracking-[0.3em] uppercase font-mono mb-1">
                    {floor.phase}
                  </p>
                  <h3 className="font-heading text-2xl md:text-4xl text-[#FAFAFA] leading-none">
                    {floor.label}
                  </h3>
                  <p className="hidden md:block text-[#D4C4A8]/70 text-xs mt-1.5 font-light">
                    {floor.tagline}
                  </p>
                </div>

                {/* Intro overlay before construction starts */}
                {activeFloor === -1 && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                    <span className="text-[#C9943A] text-[11px] tracking-[0.4em] uppercase font-mono animate-pulse">
                      Scroll to break ground
                    </span>
                    <div className="w-px h-8 bg-gradient-to-b from-[#C9943A]/70 to-transparent" />
                  </div>
                )}
              </div>

              {/* Service chips — re-stagger on every floor change */}
              <div key={displayFloor} className="flex flex-wrap gap-2">
                {floor.services.map((svc, i) => (
                  <span
                    key={svc}
                    className="inline-flex items-center gap-2 border border-[#C9943A]/30 bg-[#C9943A]/[0.06] backdrop-blur-sm rounded-full px-3 py-1.5 text-[11px] md:text-xs tracking-wider uppercase text-[#D4C4A8]"
                    style={{ animation: `chipPop 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + i * 0.07}s both` }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9943A] flex-shrink-0" />
                    {svc}
                  </span>
                ))}
              </div>

              {/* MEP colour legend — only on the MEP floor */}
              {floor.pipes && activeFloor >= 0 && (
                <div className="hidden md:flex items-center gap-5">
                  {[
                    { color: "#4ACDDD", label: "HVAC Ductwork" },
                    { color: "#F5C842", label: "Electrical" },
                    { color: "#4AD97A", label: "Plumbing" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[10px] text-[#D4C4A8]/60 tracking-wider uppercase">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Build progress rail ── */}
          <div className="flex-shrink-0 w-full max-w-xl md:max-w-3xl mx-auto mt-3 md:mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono text-blue-300/50">
                Build Progress
              </span>
              <span className="text-[10px] md:text-xs font-mono text-[#C9943A]">
                {progressPct}%
              </span>
            </div>
            <div className="flex gap-1.5">
              {FLOORS.map((f, i) => (
                <div key={f.id} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full h-[3px] rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor:
                        activeFloor >= i
                          ? "#C9943A"
                          : drawnFloors.includes(i)
                          ? "rgba(201,148,58,0.35)"
                          : "rgba(74,144,217,0.18)",
                    }}
                  />
                  <span
                    className="text-[8px] md:text-[9px] font-mono tracking-widest transition-colors duration-300"
                    style={{ color: activeFloor === i ? "#C9943A" : "rgba(147,197,253,0.35)" }}
                  >
                    {FLOOR_TICKS[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blueprint corner marks */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#4A90D9]/25" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#4A90D9]/25" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#4A90D9]/25" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#4A90D9]/25" />
      </div>
    </section>
  );
}
