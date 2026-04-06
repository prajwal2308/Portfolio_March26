"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { GraduationCap, MapPin, Award, Users, Clock, TrendingUp } from "lucide-react"
import { useRef } from "react"
import { about } from "@/lib/data"

const iconMap: Record<string, any> = { Clock, TrendingUp, Users, Award }

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={sectionRef}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">01 / About</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Who I Am</h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
              <MapPin size={12} className="text-[#4dd9d9]" /> New Brunswick, NJ
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
              <GraduationCap size={12} className="text-[#4dd9d9]" /> MS CS, Rutgers 2026
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-4 text-base leading-relaxed text-gray-400">
                I'm a <span className="font-semibold text-white">Full-Stack Cloud Developer</span> and the
                <span className="font-semibold text-[#4dd9d9]"> Co-Founder & CTO of Beunec Technologies</span>,
                where I architect end-to-end AI ecosystems leveraging AWS, GCP, MongoDB, and Cloudflare
                to deliver products serving 1K+ users with 99.9% uptime.
              </p>
              <p className="mb-6 text-base leading-relaxed text-gray-400">
                Currently pursuing my Master's at{" "}
                <span className="font-medium text-white">Rutgers University (3.65 GPA)</span>,
                I thrive at the intersection of cloud infrastructure, artificial intelligence,
                and product engineering.
              </p>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 py-3">
                <div className="flex animate-marquee gap-4 whitespace-nowrap">
                  {["AWS", "GCP", "Docker", "Kubernetes", "Next.js", "React", "Node.js", "Python", "Go", "TypeScript", "MongoDB", "Redis", "LangChain", "OpenAI", "Cloudflare", "PostgreSQL",
                    "AWS", "GCP", "Docker", "Kubernetes", "Next.js", "React", "Node.js", "Python", "Go", "TypeScript", "MongoDB", "Redis", "LangChain", "OpenAI", "Cloudflare", "PostgreSQL"].map((tech, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500">
                      <span className="h-1 w-1 rounded-full bg-[#4dd9d9]/60" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {about.stats.map((stat, i) => {
              const Icon = iconMap[stat.icon]
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-colors hover:border-[#4dd9d9]/30"
                >
                  <div className="absolute inset-0 bg-[#4dd9d9]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  {Icon && <Icon size={16} className="relative z-10 mb-2 text-[#4dd9d9]/60" />}
                  <span className="relative z-10 text-2xl font-bold text-[#4dd9d9] sm:text-3xl">{stat.value}</span>
                  <span className="relative z-10 mt-1 text-[11px] uppercase tracking-wider text-gray-500">{stat.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4dd9d9]/10">
              <GraduationCap size={18} className="text-[#4dd9d9]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{about.education.current}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4dd9d9]/10">
              <GraduationCap size={18} className="text-[#4dd9d9]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{about.education.prior}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
