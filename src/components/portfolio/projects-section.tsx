"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ExternalLink, Brain, Radio, Cloud, Sparkles, Zap } from "lucide-react"
import { GithubIcon } from "@/components/portfolio/social-icons"
import { useRef } from "react"
import { projects } from "@/lib/data"

const iconMap: Record<string, any> = { Brain, Radio, Cloud, Sparkles, Zap }

function TiltCard({ children, className, featured }: {
  children: React.ReactNode
  className?: string
  featured?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mx = useSpring(x, { stiffness: 350, damping: 30 })
  const my = useSpring(y, { stiffness: 350, damping: 30 })
  const rotateX = useTransform(my, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-10deg", "10deg"])
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {featured && (
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(77,217,217,0.06) 0%, transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        />
      )}
      {children}
    </motion.div>
  )
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">04 / Projects</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Featured Work</h2>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.filter((p) => p.featured).map((project, i) => {
            const Icon = iconMap[project.icon] || Cloud
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              >
                <TiltCard className="group h-full" featured>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-[#4dd9d9]/15 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/30 hover:shadow-[0_0_50px_rgba(77,217,217,0.06)] sm:p-7">
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#4dd9d9]/10 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4dd9d9]/20 bg-[#4dd9d9]/10">
                            <Icon size={20} className="text-[#4dd9d9]" />
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-[#4dd9d9]/50">{project.subtitle}</p>
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-[#4dd9d9]/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#4dd9d9]">{project.metric}</span>
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition-all hover:border-[#4dd9d9]/30 hover:text-[#4dd9d9]" aria-label={`${project.title} GitHub`}>
                              <GithubIcon size={14} />
                            </a>
                          )}
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition-all hover:border-[#4dd9d9]/30 hover:text-[#4dd9d9]" aria-label={`${project.title} Live`}>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="mb-5 text-sm leading-relaxed text-gray-400">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-gray-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {projects.filter((p) => !p.featured).map((project, i) => {
            const Icon = iconMap[project.icon] || Cloud
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: "easeOut" }}
              >
                <TiltCard className="group h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/20 hover:bg-white/10">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                          <Icon size={16} className="text-[#4dd9d9]" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[#4dd9d9]/50">{project.subtitle}</p>
                          <h3 className="text-base font-bold text-white">{project.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="rounded-full bg-[#4dd9d9]/10 px-2 py-0.5 font-mono text-[10px] text-[#4dd9d9]/70">{project.metric}</span>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 transition-colors hover:text-[#4dd9d9]" aria-label={`${project.title} GitHub`}>
                            <GithubIcon size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">{t}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
