"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "Renovation",
  "Fit-Out",
  "MEP",
  "Structural",
  "Landscaping",
  "Other",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(infoRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.from(formRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background — crane at sunset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/crane-sunset.jpg"
          alt="Crane at sunset"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-[#C9943A] text-xs tracking-[0.4em] uppercase font-mono">
            Get In Touch
          </span>
          <h2 className="font-heading text-[clamp(3.5rem,9vw,8rem)] leading-none text-[#FAFAFA] mt-2">
            Let&apos;s Build
            <br />
            <span className="text-gradient-gold">Together</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl text-[#FAFAFA] mb-6">
                Golden Winner Contracting LLC
              </h3>
              <div className="w-12 h-0.5 bg-[#C9943A] mb-6" />
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C9943A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#FAFAFA] text-sm font-medium">Address</p>
                  <p className="text-[#D4C4A8]/60 text-sm leading-relaxed mt-1">
                    R-25 France Cluster,
                    <br />
                    International City,
                    <br />
                    PO Box 126343, Dubai UAE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#C9943A] flex-shrink-0" />
                <div>
                  <p className="text-[#FAFAFA] text-sm font-medium">Email</p>
                  <a
                    href="mailto:info@gwcdxb.com"
                    className="text-[#D4C4A8]/60 text-sm hover:text-[#C9943A] transition-colors duration-300"
                  >
                    info@gwcdxb.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#C9943A] flex-shrink-0" />
                <div>
                  <p className="text-[#FAFAFA] text-sm font-medium">Phone</p>
                  <a
                    href="tel:+97145650362"
                    className="text-[#D4C4A8]/60 text-sm hover:text-[#C9943A] transition-colors duration-300"
                  >
                    04-5650362
                  </a>
                </div>
              </div>
            </div>

            {/* ISO badges row */}
            <div className="pt-6 border-t border-[#C9943A]/10">
              <p className="text-[#D4C4A8]/40 text-xs tracking-widest uppercase mb-4">
                Certified
              </p>
              <div className="flex gap-3">
                {["ISO 9001", "ISO 14001", "ISO 45001"].map((cert) => (
                  <div
                    key={cert}
                    className="border border-[#C9943A]/30 px-3 py-1.5 rounded-sm"
                  >
                    <p className="text-[#C9943A] text-xs font-mono">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="border border-[#C9943A]/30 bg-black/50 p-10 rounded-sm text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#C9943A] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C9943A] text-2xl">✓</span>
                </div>
                <h3 className="font-heading text-2xl text-[#FAFAFA] mb-2">
                  Message Sent
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm">
                  Thank you for reaching out. Our team will contact you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#D4C4A8]/60 text-xs tracking-widest uppercase mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full bg-black/50 border border-[#C9943A]/20 text-[#FAFAFA] text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9943A]/60 transition-colors duration-300 placeholder:text-[#D4C4A8]/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D4C4A8]/60 text-xs tracking-widest uppercase mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, company: e.target.value }))
                      }
                      className="w-full bg-black/50 border border-[#C9943A]/20 text-[#FAFAFA] text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9943A]/60 transition-colors duration-300 placeholder:text-[#D4C4A8]/20"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#D4C4A8]/60 text-xs tracking-widest uppercase mb-2">
                    Project Type *
                  </label>
                  <select
                    required
                    value={formState.projectType}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        projectType: e.target.value,
                      }))
                    }
                    className="w-full bg-black/50 border border-[#C9943A]/20 text-[#FAFAFA] text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9943A]/60 transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0A0A0A]">
                      Select project type…
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#0A0A0A]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#D4C4A8]/60 text-xs tracking-widest uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full bg-black/50 border border-[#C9943A]/20 text-[#FAFAFA] text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9943A]/60 transition-colors duration-300 resize-none placeholder:text-[#D4C4A8]/20"
                    placeholder="Tell us about your project…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-shimmer text-[#0A0A0A] font-heading text-xl tracking-widest py-4 rounded-sm flex items-center justify-center gap-3 transition-opacity duration-300 disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-[#0A0A0A]/40 border-t-[#0A0A0A] rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
