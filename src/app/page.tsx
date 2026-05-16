"use client";

import dynamic from "next/dynamic";

// Dynamic imports — all sections use browser APIs (GSAP, Lenis, Three.js)
const LenisProvider    = dynamic(() => import("@/components/LenisProvider"),    { ssr: false });
const Nav              = dynamic(() => import("@/components/Nav"),              { ssr: false });
const Hero             = dynamic(() => import("@/components/Hero"),             { ssr: false });
const About            = dynamic(() => import("@/components/About"),            { ssr: false });
const XRayBuilding     = dynamic(() => import("@/components/XRayBuilding"),     { ssr: false });
const Quality          = dynamic(() => import("@/components/Quality"),          { ssr: false });
const Safety           = dynamic(() => import("@/components/Safety"),           { ssr: false });
const ProjectsTimeline = dynamic(() => import("@/components/ProjectsTimeline"), { ssr: false });
const ClientsMarquee   = dynamic(() => import("@/components/ClientsMarquee"),   { ssr: false });
const Contact          = dynamic(() => import("@/components/Contact"),          { ssr: false });
const Footer           = dynamic(() => import("@/components/Footer"),           { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <XRayBuilding />
        <Quality />
        <Safety />
        <ProjectsTimeline />
        <ClientsMarquee />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}
