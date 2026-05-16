"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FLOORS = [
  {
    id: "basement",
    label: "Basement",
    y: 370,
    height: 60,
    color: "#4A90D9",
    services: ["Waterproofing", "Block Works", "Curbstone", "Interlock"],
    pipes: false,
  },
  {
    id: "floor1",
    label: "Ground Floor",
    y: 300,
    height: 70,
    color: "#4A90D9",
    services: ["Shell & Core", "Column Jacketing", "Carbon Wrapping", "Reinstatement"],
    pipes: false,
  },
  {
    id: "floor2",
    label: "1st Floor — MEP",
    y: 225,
    height: 75,
    color: "#4ACDDD",
    services: ["MEP Works", "HVAC", "Electrical", "Plumbing"],
    pipes: true,
  },
  {
    id: "floor3",
    label: "2nd Floor — Fit-Out",
    y: 155,
    height: 70,
    color: "#4A90D9",
    services: ["Fit-Out", "Dry Wall", "Partitions", "False Ceilings", "Carpentry"],
    pipes: false,
  },
  {
    id: "floor4",
    label: "3rd Floor — Finishing",
    y: 85,
    height: 70,
    color: "#4A90D9",
    services: ["Plastering", "Painting", "Wall & Floor Tiling", "Epoxy Floor"],
    pipes: false,
  },
  {
    id: "roof",
    label: "Roof",
    y: 20,
    height: 65,
    color: "#6B8CBA",
    services: ["Cladding", "Landscaping", "Insulation", "Refurbishment", "Renovation"],
    pipes: false,
  },
];

export default function XRayBuilding() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeFloor, setActiveFloor] = useState(-1);
  const [drawnFloors, setDrawnFloors] = useState<number[]>([]);
  const pathRefs = useRef<(SVGRectElement | null)[]>([]);
  const pipeRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      FLOORS.forEach((floor, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${i * (window.innerHeight * 0.8)} top`,
          end: `top+=${(i + 1) * (window.innerHeight * 0.8)} top`,
          onEnter: () => {
            setActiveFloor(i);
            setDrawnFloors((prev) => (prev.includes(i) ? prev : [...prev, i]));

            // Animate the floor rect drawing
            const rect = pathRefs.current[i];
            if (rect) {
              gsap.fromTo(
                rect,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 0.9, ease: "power3.out" }
              );
            }

            // Draw pipes for MEP floor
            const pipe = pipeRefs.current[i];
            if (pipe) {
              const lines = pipe.querySelectorAll("line, path");
              gsap.fromTo(
                lines,
                { strokeDashoffset: 200 },
                {
                  strokeDashoffset: 0,
                  duration: 1.2,
                  stagger: 0.1,
                  ease: "power2.inOut",
                }
              );
            }
          },
          onEnterBack: () => {
            setActiveFloor(i);
          },
          onLeave: () => {
            if (i < FLOORS.length - 1) setActiveFloor(i + 1);
          },
          onLeaveBack: () => {
            setActiveFloor(i - 1);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="xray"
      ref={sectionRef}
      style={{ height: `${(FLOORS.length + 1) * 80}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden blueprint-bg"
      >
        {/* Title */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20">
          <span className="text-blue-300/60 text-xs tracking-[0.4em] uppercase">
            X-Ray Building Section
          </span>
          <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-[#FAFAFA] mt-1">
            Our <span className="text-[#C9943A]">Services</span>
          </h2>
        </div>

        {/* Blueprint SVG Building */}
        <div className="flex gap-8 items-start w-full max-w-5xl mx-auto px-8">
          {/* Building SVG */}
          <div className="flex-1 flex justify-center">
            <svg
              viewBox="0 0 300 450"
              className="w-full max-w-sm"
              style={{ filter: "drop-shadow(0 0 20px rgba(74,144,217,0.3))" }}
            >
              {/* Exterior walls */}
              <rect
                x="10" y="10" width="280" height="420"
                fill="none"
                stroke="rgba(74,144,217,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Underground */}
              <line
                x1="10" y1="430" x2="290" y2="430"
                stroke="rgba(74,144,217,0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {FLOORS.map((floor, i) => {
                const isActive = activeFloor === i;
                const isDrawn = drawnFloors.includes(i);

                return (
                  <g key={floor.id}>
                    {/* Floor slab */}
                    <line
                      x1="10"
                      y1={floor.y + floor.height}
                      x2="290"
                      y2={floor.y + floor.height}
                      stroke={isActive ? "#C9943A" : "rgba(74,144,217,0.3)"}
                      strokeWidth={isActive ? 1.5 : 0.8}
                    />

                    {/* Floor fill */}
                    <rect
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      x="10"
                      y={floor.y}
                      width="280"
                      height={floor.height}
                      fill={
                        isActive
                          ? "rgba(201,148,58,0.08)"
                          : isDrawn
                          ? "rgba(74,144,217,0.04)"
                          : "transparent"
                      }
                      stroke={isActive ? "#C9943A" : floor.color}
                      strokeWidth={isActive ? 1.5 : 0.5}
                      style={{
                        transition: "fill 0.3s ease, stroke 0.3s ease",
                      }}
                    />

                    {/* MEP Pipes */}
                    {floor.pipes && isDrawn && (
                      <g
                        ref={(el) => {
                          pipeRefs.current[i] = el;
                        }}
                      >
                        {/* HVAC duct */}
                        <line
                          x1="30" y1={floor.y + 20}
                          x2="200" y2={floor.y + 20}
                          stroke="#4ACDDD"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                        />
                        {/* Electrical */}
                        <line
                          x1="30" y1={floor.y + 35}
                          x2="240" y2={floor.y + 35}
                          stroke="#F5C842"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                        />
                        {/* Plumbing */}
                        <line
                          x1="30" y1={floor.y + 50}
                          x2="170" y2={floor.y + 50}
                          stroke="#4AD97A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                        />
                        {/* Vertical drops */}
                        <line
                          x1="80" y1={floor.y + 20}
                          x2="80" y2={floor.y + 50}
                          stroke="#4ACDDD"
                          strokeWidth="1.5"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                        />
                        <line
                          x1="160" y1={floor.y + 20}
                          x2="160" y2={floor.y + 50}
                          stroke="#4ACDDD"
                          strokeWidth="1.5"
                          strokeDasharray="200"
                          strokeDashoffset="200"
                        />
                      </g>
                    )}

                    {/* Columns */}
                    <rect x="10" y={floor.y} width="12" height={floor.height}
                      fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.15)"}
                      stroke={isActive ? "#C9943A" : floor.color}
                      strokeWidth="0.5"
                    />
                    <rect x="278" y={floor.y} width="12" height={floor.height}
                      fill={isActive ? "rgba(201,148,58,0.2)" : "rgba(74,144,217,0.15)"}
                      stroke={isActive ? "#C9943A" : floor.color}
                      strokeWidth="0.5"
                    />

                    {/* Floor label */}
                    {isActive && (
                      <text
                        x="155"
                        y={floor.y + floor.height / 2 + 4}
                        textAnchor="middle"
                        fill="#C9943A"
                        fontSize="7"
                        fontFamily="monospace"
                        letterSpacing="1"
                      >
                        {floor.label.toUpperCase()}
                      </text>
                    )}

                    {/* Glow for active */}
                    {isActive && (
                      <rect
                        x="10" y={floor.y}
                        width="280" height={floor.height}
                        fill="none"
                        stroke="#C9943A"
                        strokeWidth="1"
                        opacity="0.4"
                        style={{ filter: "drop-shadow(0 0 4px #C9943A)" }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Roof triangle */}
              <polygon
                points="150,5 10,20 290,20"
                fill="rgba(74,144,217,0.1)"
                stroke={activeFloor === 5 ? "#C9943A" : "rgba(74,144,217,0.5)"}
                strokeWidth="1"
              />

              {/* Dimension lines */}
              <line x1="3" y1="20" x2="3" y2="430"
                stroke="rgba(74,144,217,0.25)" strokeWidth="0.5" />
              <line x1="1" y1="20" x2="5" y2="20"
                stroke="rgba(74,144,217,0.25)" strokeWidth="0.5" />
              <line x1="1" y1="430" x2="5" y2="430"
                stroke="rgba(74,144,217,0.25)" strokeWidth="0.5" />

              {/* Blueprint cross marks */}
              <circle cx="150" cy="10" r="2" fill="none"
                stroke="rgba(74,144,217,0.4)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Service panel */}
          <div className="flex-1 max-w-xs">
            {activeFloor >= 0 ? (
              <div className="border border-[#C9943A]/30 bg-black/50 backdrop-blur-sm p-6 rounded-sm">
                <div className="text-[#C9943A] text-xs tracking-[0.3em] uppercase mb-2 font-mono">
                  Active Floor
                </div>
                <h3 className="font-heading text-2xl text-[#FAFAFA] mb-4">
                  {FLOORS[activeFloor]?.label}
                </h3>
                <div className="w-8 h-px bg-[#C9943A] mb-4" />
                <ul className="space-y-2">
                  {FLOORS[activeFloor]?.services.map((svc, i) => (
                    <li
                      key={svc}
                      className="flex items-center gap-3 text-[#D4C4A8] text-sm"
                      style={{
                        animation: `fadeSlide 0.3s ease ${i * 0.06}s both`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9943A] flex-shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>

                {/* MEP legend */}
                {FLOORS[activeFloor]?.pipes && (
                  <div className="mt-6 pt-4 border-t border-blue-800/30 space-y-2">
                    <p className="text-xs text-blue-300/60 uppercase tracking-wider mb-2">
                      MEP Legend
                    </p>
                    {[
                      { color: "#4ACDDD", label: "HVAC Ductwork" },
                      { color: "#F5C842", label: "Electrical" },
                      { color: "#4AD97A", label: "Plumbing" },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div
                          className="w-6 h-0.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-[#D4C4A8]/70">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-blue-800/20 bg-black/30 p-6 rounded-sm text-center">
                <p className="text-blue-300/40 text-sm font-mono">
                  Scroll to reveal floors
                </p>
                <div className="mt-4 w-px h-8 bg-gradient-to-b from-blue-400/30 to-transparent mx-auto" />
              </div>
            )}

            {/* Floor progress dots */}
            <div className="mt-6 flex justify-center gap-2">
              {FLOORS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === activeFloor
                        ? "#C9943A"
                        : drawnFloors.includes(i)
                        ? "rgba(201,148,58,0.3)"
                        : "rgba(74,144,217,0.2)",
                    transform: i === activeFloor ? "scale(1.5)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Corner blueprint marks */}
        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-6 h-6 border-[#4A90D9]/30`}
            style={{
              borderWidth: "1px 0 0 1px",
              ...(pos.includes("right") && !pos.includes("left")
                ? { borderWidth: "1px 1px 0 0" }
                : {}),
              ...(pos.includes("bottom") && !pos.includes("top")
                ? { borderWidth: "0 0 1px 1px" }
                : {}),
              ...(pos.includes("bottom") && pos.includes("right")
                ? { borderWidth: "0 1px 1px 0" }
                : {}),
            }}
          />
        ))}

        <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateX(-8px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
