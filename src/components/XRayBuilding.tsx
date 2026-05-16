"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FLOORS = [
  {
    id: "basement",
    label: "Basement",
    y: 370, height: 60,
    color: "#4A90D9",
    services: ["Waterproofing", "Block Works", "Curbstone", "Interlock"],
    pipes: false,
  },
  {
    id: "floor1",
    label: "Ground Floor",
    y: 300, height: 70,
    color: "#4A90D9",
    services: ["Shell & Core", "Column Jacketing", "Carbon Wrapping", "Reinstatement"],
    pipes: false,
  },
  {
    id: "floor2",
    label: "1st Floor — MEP",
    y: 225, height: 75,
    color: "#4ACDDD",
    services: ["MEP Works", "HVAC", "Electrical", "Plumbing"],
    pipes: true,
  },
  {
    id: "floor3",
    label: "2nd Floor — Fit-Out",
    y: 155, height: 70,
    color: "#4A90D9",
    services: ["Fit-Out", "Dry Wall", "Partitions", "False Ceilings", "Carpentry"],
    pipes: false,
  },
  {
    id: "floor4",
    label: "3rd Floor — Finishing",
    y: 85, height: 70,
    color: "#4A90D9",
    services: ["Plastering", "Painting", "Wall & Floor Tiling", "Epoxy Floor"],
    pipes: false,
  },
  {
    id: "roof",
    label: "Roof Level",
    y: 20, height: 65,
    color: "#6B8CBA",
    services: ["Cladding", "Landscaping", "Insulation", "Refurbishment", "Renovation"],
    pipes: false,
  },
];

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
    drawnSet.current.clear();

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
      drawnSet.current.clear();
    };
  }, [animateFloor]);

  return (
    <section
      id="xray"
      ref={sectionRef}
      style={{ height: `${SECTION_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden blueprint-bg">

        {/* Title */}
        <div className="text-center mb-4 md:mb-6 flex-shrink-0">
          <span className="text-blue-300/60 text-[10px] tracking-[0.4em] uppercase">
            X-Ray Building Section
          </span>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] text-[#FAFAFA] mt-1">
            Our <span className="text-[#C9943A]">Services</span>
          </h2>
        </div>

        {/* Main layout — stacks on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start w-full max-w-5xl mx-auto px-4 md:px-8 flex-1 min-h-0">

          {/* SVG building — always scales to fit via viewBox */}
          <div className="flex justify-center flex-shrink-0 w-full md:w-auto md:flex-1">
            <svg
              viewBox="0 0 300 460"
              className="w-full max-w-[220px] md:max-w-xs"
              style={{ filter: "drop-shadow(0 0 18px rgba(74,144,217,0.25))" }}
            >
              {/* ClipPath defs — one per floor, GSAP animates width */}
              <defs>
                {FLOORS.map((floor, i) => (
                  <clipPath key={i} id={`floor-clip-${i}`}>
                    <rect
                      ref={(el) => { clipRefs.current[i] = el; }}
                      x="9"
                      y={floor.y - 1}
                      width="0"
                      height={floor.height + 2}
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
              {FLOORS.map((floor, i) => {
                const isActive  = activeFloor === i;
                const isDrawn   = drawnFloors.includes(i);

                return (
                  <g key={floor.id}>
                    {/* Slab line — always visible, glows gold when active */}
                    <line
                      x1="10" y1={floor.y + floor.height}
                      x2="290" y2={floor.y + floor.height}
                      stroke={isActive ? "#C9943A" : "rgba(74,144,217,0.3)"}
                      strokeWidth={isActive ? 1.5 : 0.7}
                    />

                    {/* Clipped floor fill group — reveals L→R via clipPath */}
                    <g clipPath={`url(#floor-clip-${i})`}>
                      {/* Floor fill */}
                      <rect
                        x="10" y={floor.y} width="280" height={floor.height}
                        fill={isActive ? "rgba(201,148,58,0.09)" : "rgba(74,144,217,0.04)"}
                        stroke={isActive ? "#C9943A" : floor.color}
                        strokeWidth={isActive ? 1.5 : 0.5}
                        style={{ transition: "fill 0.3s, stroke 0.3s" }}
                      />

                      {/* Left column */}
                      <rect x="10" y={floor.y} width="12" height={floor.height}
                        fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.12)"}
                        stroke={isActive ? "#C9943A" : floor.color}
                        strokeWidth="0.5"
                      />
                      {/* Right column */}
                      <rect x="278" y={floor.y} width="12" height={floor.height}
                        fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.12)"}
                        stroke={isActive ? "#C9943A" : floor.color}
                        strokeWidth="0.5"
                      />

                      {/* Gold glow outline when active */}
                      {isActive && (
                        <rect
                          x="10" y={floor.y} width="280" height={floor.height}
                          fill="none"
                          stroke="#C9943A"
                          strokeWidth="1.5"
                          opacity="0.5"
                          style={{ filter: "drop-shadow(0 0 6px #C9943A)" }}
                        />
                      )}

                      {/* MEP pipes — always rendered, animated via strokeDashoffset */}
                      {floor.pipes && (
                        <g ref={(el) => { pipeRefs.current[i] = el; }}
                          opacity={isDrawn ? 1 : 0}
                          style={{ transition: "opacity 0.2s" }}
                        >
                          {/* HVAC duct */}
                          <line
                            x1="30" y1={floor.y + 20} x2="200" y2={floor.y + 20}
                            stroke="#4ACDDD" strokeWidth="3" strokeLinecap="round"
                            strokeDasharray="300" strokeDashoffset="300"
                          />
                          {/* Electrical */}
                          <line
                            x1="30" y1={floor.y + 37} x2="240" y2={floor.y + 37}
                            stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round"
                            strokeDasharray="300" strokeDashoffset="300"
                          />
                          {/* Plumbing */}
                          <line
                            x1="30" y1={floor.y + 52} x2="170" y2={floor.y + 52}
                            stroke="#4AD97A" strokeWidth="2" strokeLinecap="round"
                            strokeDasharray="300" strokeDashoffset="300"
                          />
                          {/* Vertical drops */}
                          <line
                            x1="80" y1={floor.y + 20} x2="80" y2={floor.y + 52}
                            stroke="#4ACDDD" strokeWidth="1.2"
                            strokeDasharray="300" strokeDashoffset="300"
                          />
                          <line
                            x1="160" y1={floor.y + 20} x2="160" y2={floor.y + 52}
                            stroke="#4ACDDD" strokeWidth="1.2"
                            strokeDasharray="300" strokeDashoffset="300"
                          />
                        </g>
                      )}
                    </g>

                    {/* Floor label — rendered above clip */}
                    {isActive && (
                      <text
                        x="155" y={floor.y + floor.height / 2 + 4}
                        textAnchor="middle"
                        fill="#C9943A"
                        fontSize="6.5"
                        fontFamily="monospace"
                        letterSpacing="1.5"
                      >
                        {floor.label.toUpperCase()}
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

          {/* Service panel */}
          <div className="flex-1 max-w-xs w-full flex flex-col gap-3">
            {activeFloor >= 0 ? (
              <div className="border border-[#C9943A]/30 bg-black/60 backdrop-blur-sm p-4 md:p-6 rounded-sm">
                <div className="text-[#C9943A] text-[10px] tracking-[0.3em] uppercase mb-1 font-mono">
                  Active Floor
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-[#FAFAFA] mb-3">
                  {FLOORS[activeFloor]?.label}
                </h3>
                <div className="w-8 h-px bg-[#C9943A] mb-3" />
                <ul className="space-y-1.5">
                  {FLOORS[activeFloor]?.services.map((svc, i) => (
                    <li
                      key={svc}
                      className="flex items-center gap-3 text-[#D4C4A8] text-sm"
                      style={{ animation: `fadeSlide 0.3s ease ${i * 0.07}s both` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9943A] flex-shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>

                {/* MEP colour legend */}
                {FLOORS[activeFloor]?.pipes && (
                  <div className="mt-4 pt-4 border-t border-blue-800/30 space-y-1.5">
                    <p className="text-[10px] text-blue-300/60 uppercase tracking-wider mb-2">
                      MEP Legend
                    </p>
                    {[
                      { color: "#4ACDDD", label: "HVAC Ductwork" },
                      { color: "#F5C842", label: "Electrical" },
                      { color: "#4AD97A", label: "Plumbing" },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs text-[#D4C4A8]/60">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-blue-800/20 bg-black/30 p-5 rounded-sm text-center">
                <p className="text-blue-300/40 text-sm font-mono">Scroll to reveal floors</p>
                <div className="mt-3 w-px h-6 bg-gradient-to-b from-blue-400/30 to-transparent mx-auto" />
              </div>
            )}

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {FLOORS.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === activeFloor ? "1.5rem" : "0.375rem",
                    height: "0.375rem",
                    backgroundColor:
                      i === activeFloor
                        ? "#C9943A"
                        : drawnFloors.includes(i)
                        ? "rgba(201,148,58,0.35)"
                        : "rgba(74,144,217,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Blueprint corner marks */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#4A90D9]/25" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#4A90D9]/25" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#4A90D9]/25" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#4A90D9]/25" />

        <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateX(-8px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
