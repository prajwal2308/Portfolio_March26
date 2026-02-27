"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { GraduationCap, MapPin, Award, Users, Clock, TrendingUp } from "lucide-react"
import { useRef } from "react"

const stats = [
  { icon: Clock, value: "2.5+", label: "Years Exp", color: "text-primary" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime", color: "text-primary" },
  { icon: Users, value: "1K+", label: "Users Served", color: "text-primary" },
  { icon: Award, value: "3.65", label: "GPA @ Rutgers", color: "text-primary" },
]

const techStack = [
  "AWS", "GCP", "Docker", "Kubernetes", "Next.js", "React",
  "Node.js", "Python", "Go", "TypeScript", "MongoDB", "Redis",
  "LangChain", "OpenAI", "Cloudflare", "PostgreSQL"
]

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section id="about" className="relative py-20 overflow-hidden" ref={sectionRef}>
      {/* Parallax grid background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">01 / About</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Who I Am</h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary" /> New Brunswick, NJ
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
              <GraduationCap size={12} className="text-primary" /> MS CS, Rutgers 2026
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Bio - takes up 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                I&apos;m a Full-Stack Cloud Developer and the{" "}
                <span className="font-semibold text-primary">Co-Founder & CTO of Beunec Technologies</span>,
                where I architect end-to-end AI ecosystems leveraging AWS, GCP, MongoDB, and Cloudflare
                to deliver products serving 1K+ users with 99.9% uptime. My expertise spans designing
                privacy-first AI engines with proprietary GenAI technology to engineering containerized
                microservice architectures with Kubernetes.
              </p>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Currently pursuing my Master&apos;s at{" "}
                <span className="font-medium text-foreground">Rutgers University (3.65 GPA)</span>,
                I thrive at the intersection of cloud infrastructure, artificial intelligence,
                and product engineering. Previously built enterprise software at CSG International
                and led cloud-native development at Universal Selfcare.
              </p>

              {/* Inline tech marquee */}
              <div className="relative overflow-hidden rounded-xl border border-border/50 bg-secondary/20 py-3">
                <div className="flex animate-[scroll_20s_linear_infinite] gap-4 whitespace-nowrap">
                  {[...techStack, ...techStack].map((tech, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary/60" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats grid - 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 p-5 text-center backdrop-blur-sm transition-colors hover:border-primary/30"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <stat.icon size={16} className="relative z-10 mb-2 text-primary/60" />
                <span className="relative z-10 text-2xl font-bold text-primary sm:text-3xl">{stat.value}</span>
                <span className="relative z-10 mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education row - tight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card/30 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Rutgers University - New Brunswick</p>
              <p className="text-xs text-muted-foreground">Master&apos;s in Computer Science | GPA: 3.65/4.0 | 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card/30 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">MVJ College of Engineering</p>
              <p className="text-xs text-muted-foreground">Bachelors in Computer Science | GPA: 9.1/10 | 2023</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
