"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase, ExternalLink, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { experiences } from "@/lib/data"

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  return (
    <section id="experience" className="relative py-24" ref={sectionRef}>
      <div className="mx-auto max-w-5xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">02 / Experience</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Where I've Built</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 md:left-[23px]">
            <motion.div style={{ height: lineHeight }} className="w-full bg-[#4dd9d9]/60" />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                className="relative pl-12 md:pl-14"
              >
                <div className="absolute left-0 top-5 md:left-0">
                  <div className={`relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 md:h-[46px] md:w-[46px] ${
                    exp.current
                      ? "border-[#4dd9d9] bg-[#4dd9d9]/10 shadow-[0_0_20px_rgba(77,217,217,0.2)]"
                      : "border-white/20 bg-white/5"
                  }`}>
                    <Briefcase size={16} className={exp.current ? "text-[#4dd9d9]" : "text-gray-500"} />
                    {exp.current && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4dd9d9] opacity-50" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#4dd9d9]" />
                      </span>
                    )}
                  </div>
                </div>

                <div className={`group rounded-2xl border p-5 transition-all sm:p-6 ${
                  exp.highlight
                    ? "border-[#4dd9d9]/20 bg-[#4dd9d9]/5 shadow-[0_0_30px_rgba(77,217,217,0.04)] hover:border-[#4dd9d9]/40"
                    : "border-white/10 bg-white/5 hover:border-[#4dd9d9]/15 hover:bg-white/10"
                } backdrop-blur-sm`}>
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 transition-colors hover:text-[#4dd9d9]" aria-label={`Visit ${exp.company}`}>
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {exp.current && (
                          <span className="rounded-full bg-[#4dd9d9]/10 px-2 py-0.5 text-[10px] font-medium text-[#4dd9d9]">Current</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-[#4dd9d9]/70">{exp.role}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-gray-500">{exp.period}</span>
                  </div>

                  <ul className="mb-4 space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-gray-400">
                        <ChevronRight size={14} className="mt-0.5 shrink-0 text-[#4dd9d9]/40" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-gray-500 transition-colors hover:border-[#4dd9d9]/20 hover:text-[#4dd9d9]/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
