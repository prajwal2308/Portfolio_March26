"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"
import { Code, Cloud, Brain, Wrench } from "lucide-react"
import { skills, certifications } from "@/lib/data"

const iconMap: Record<string, any> = { Code, Cloud, Brain, Wrench }

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">03 / Skills</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Tech Arsenal</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex flex-row gap-2 lg:flex-col lg:gap-1.5">
              {skills.map((cat, i) => {
                const Icon = iconMap[cat.icon]
                return (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(i)}
                    className={`group flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all lg:w-full ${
                      activeCategory === i
                        ? "bg-[#4dd9d9]/10 text-[#4dd9d9] border border-[#4dd9d9]/20 shadow-[0_0_15px_rgba(77,217,217,0.08)]"
                        : "border border-transparent text-gray-500 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {Icon && <Icon size={16} className={activeCategory === i ? "text-[#4dd9d9]" : "text-gray-600"} />}
                    <span className="hidden sm:inline">{cat.category}</span>
                  </button>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 hidden lg:block"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Certifications</h3>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert} className="rounded-lg border border-[#4dd9d9]/10 bg-[#4dd9d9]/5 px-3 py-2 text-xs font-medium text-[#4dd9d9]/80">
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

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
                {skills[activeCategory].skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-[#4dd9d9]/25"
                  >
                    <div className="absolute inset-0 bg-[#4dd9d9]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative z-10 text-sm font-semibold text-white">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 lg:hidden"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span key={cert} className="rounded-lg border border-[#4dd9d9]/15 bg-[#4dd9d9]/5 px-3 py-1.5 text-xs font-medium text-[#4dd9d9]/80">
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
