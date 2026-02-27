"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"
import { Code, Cloud, Brain, Wrench, ShieldCheck } from "lucide-react"

const skillCategories = [
  {
    name: "Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Go (Golang)", level: 80 },
      { name: "Java", level: 85 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    name: "Frameworks",
    icon: Wrench,
    skills: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 93 },
      { name: "Node.js / Express", level: 90 },
      { name: "Flask", level: 82 },
      { name: "TailwindCSS", level: 95 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 90 },
      { name: "GCP", level: 88 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 85 },
      { name: "Cloudflare", level: 88 },
      { name: "GitHub Actions", level: 85 },
    ],
  },
  {
    name: "AI & Data",
    icon: Brain,
    skills: [
      { name: "PyTorch", level: 80 },
      { name: "LangChain", level: 85 },
      { name: "OpenAI API", level: 90 },
      { name: "Redis", level: 85 },
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 85 },
    ],
  },
]

const certifications = [
  "AWS Cloud Practitioner",
  "Machine Learning A-Z (Udemy)",
  "Salesforce Developer Catalyst",
]

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">03 / Skills</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Tech Arsenal</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left - Category selectors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex flex-row gap-2 lg:flex-col lg:gap-1.5">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  className={`group flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all lg:w-full ${
                    activeCategory === i
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(77,217,217,0.08)]"
                      : "border border-transparent text-muted-foreground hover:bg-card/50 hover:text-foreground"
                  }`}
                >
                  <cat.icon size={16} className={activeCategory === i ? "text-primary" : "text-muted-foreground/60"} />
                  <span className="hidden sm:inline">{cat.name}</span>
                  <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Certifications below on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 hidden lg:block"
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-primary/60" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Certifications</h3>
              </div>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert} className="rounded-lg border border-primary/10 bg-primary/5 px-3 py-2 text-xs font-medium text-primary/80">
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Skills grid */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm transition-colors hover:border-primary/25"
                  >
                    {/* Glow bg */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                        <span className="font-mono text-[11px] text-primary/80">{skill.level}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-secondary/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(77,217,217,0.4)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Certifications - mobile only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 lg:hidden"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span key={cert} className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary/80">
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
