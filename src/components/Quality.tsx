"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    number: "01",
    title: "Contractual\nPrecision",
    short: "Precision",
    description:
      "Every project is governed by rigorous contract management — clear scope, defined deliverables, and transparent milestones that protect both client and contractor at every stage.",
    icon: "◈",
  },
  {
    number: "02",
    title: "Industry Best\nPractice",
    short: "Best Practice",
    description:
      "Our teams are trained to the highest international standards, drawing from decades of collective expertise across MEP, structural, and fit-out domains.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Regulatory\nCompliance",
    short: "Compliance",
    description:
      "Full adherence to Dubai Municipality, DEWA, and UAE Federal standards. We carry every permit, certification, and approval your project demands.",
    icon: "◉",
  },
  {
    number: "04",
    title: "Stakeholder\nSatisfaction",
    short: "Satisfaction",
    description:
      "From project inception to handover, we maintain open communication, regular reporting, and post-completion support that earns lasting partnerships.",
    icon: "◎",
  },
];

export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      PANELS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${i * window.innerHeight} top`,
          end: `top+=${(i + 1) * window.innerHeight} top`,
          onEnter: () => setActivePanel(i),
          onEnterBack: () => setActivePanel(i),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quality"
      ref={sectionRef}
      style={{ height: `${PANELS.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

        {/* Giant watermark number behind everything */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`wm-${activePanel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            aria-hidden="true"
            className="absolute right-[-2%] bottom-[-4%] font-heading text-outline text-[clamp(10rem,26vw,20rem)] leading-none select-none pointer-events-none"
          >
            {PANELS[activePanel].number}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left — number + icon */}
              <div className="hidden md:flex flex-col">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-heading text-[12rem] leading-none text-[#C9943A]/10 select-none"
                >
                  {PANELS[activePanel].number}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[#C9943A] text-5xl -mt-16 ml-4"
                >
                  {PANELS[activePanel].icon}
                </motion.div>
              </div>

              {/* Right — content */}
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="h-0.5 bg-[#C9943A] mb-6 overflow-hidden"
                  style={{ minWidth: 0 }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#C9943A] text-sm tracking-[0.3em] uppercase mb-4 font-mono"
                >
                  Quality Pillar {PANELS[activePanel].number}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="font-heading text-[clamp(3rem,6vw,5rem)] leading-none text-[#FAFAFA] mb-8 whitespace-pre-line"
                >
                  {PANELS[activePanel].title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-[#D4C4A8] text-lg leading-relaxed font-light"
                >
                  {PANELS[activePanel].description}
                </motion.p>

                {/* Panel dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex gap-2 mt-10"
                >
                  {PANELS.map((_, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === activePanel ? "2rem" : "0.375rem",
                        height: "0.375rem",
                        backgroundColor:
                          i === activePanel
                            ? "#C9943A"
                            : i < activePanel
                            ? "rgba(201,148,58,0.4)"
                            : "rgba(201,148,58,0.15)",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pillar rail — desktop, left edge */}
        <div className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-7">
          {PANELS.map((p, i) => (
            <div key={p.number} className="flex items-center gap-3">
              <span
                className="font-mono text-[10px] transition-colors duration-300"
                style={{ color: i === activePanel ? "#C9943A" : "rgba(212,196,168,0.25)" }}
              >
                {p.number}
              </span>
              <span
                className="h-px transition-all duration-500"
                style={{
                  width: i === activePanel ? "2.5rem" : "1rem",
                  backgroundColor: i === activePanel ? "#C9943A" : "rgba(212,196,168,0.15)",
                }}
              />
              <span
                className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                style={{ color: i === activePanel ? "#D4C4A8" : "rgba(212,196,168,0.25)" }}
              >
                {p.short}
              </span>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <span className="text-[#C9943A]/40 text-xs tracking-[0.4em] uppercase font-mono">
            Our Quality Pillars
          </span>
        </div>

        {/* Subtle background gradient that shifts */}
        <div
          className="absolute inset-0 -z-10 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at ${
              [30, 70, 30, 70][activePanel]
            }% ${
              [30, 60, 70, 40][activePanel]
            }%, rgba(107,45,26,0.08) 0%, transparent 60%)`,
          }}
        />
      </div>
    </section>
  );
}
