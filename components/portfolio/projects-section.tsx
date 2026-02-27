"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ExternalLink, Github, Brain, Radio, Cloud, Sparkles } from "lucide-react"
import { useRef } from "react"

const projects = [
  {
    title: "Beunec Cloud",
    subtitle: "AI Productivity Ecosystem",
    description:
      "End-to-end AI productivity ecosystem with global load balancing, failover architecture, and real-time behavioral analytics serving 1K+ users at 99.9% uptime.",
    tech: ["Next.js", "Node.js", "AWS", "Cloudflare", "MongoDB", "Redis"],
    icon: Cloud,
    link: "https://beunec.com",
    featured: true,
    metric: "1K+ Users",
  },
  {
    title: "Aselius AI",
    subtitle: "Proprietary GenAI Engine",
    description:
      "Privacy-first generative AI engine with ground-search capability, end-to-end encryption, and secure vector storage for GDPR-compliant data handling.",
    tech: ["Python", "OpenAI API", "LangChain", "Vector DB", "Cloudflare"],
    icon: Sparkles,
    featured: true,
    metric: "GDPR-Ready",
  },
  {
    title: "Proactive Retrieval Thinker-Curator",
    subtitle: "Multi-Agent AI System",
    description:
      "Multi-agent AI system enhancing LLM long-term memory using proactive retrieval, reducing hallucination rates by 15% across large-scale datasets.",
    tech: ["Python", "LangChain", "LLM", "Vector Embeddings", "RAG"],
    icon: Brain,
    github: "https://github.com/prajwalsrinivas238",
    featured: false,
    metric: "-15% Hallucination",
  },
  {
    title: "LoRaWAN Mesh IoT Simulator",
    subtitle: "Containerized Network Simulator",
    description:
      "Lightweight IoT mesh network simulator using containerized UDP nodes with multi-hop routing and failure injection to mimic real-world LoRaWAN behavior.",
    tech: ["Docker", "Kubernetes", "UDP", "IoT", "Mesh"],
    icon: Radio,
    github: "https://github.com/prajwalsrinivas238",
    featured: false,
    metric: "Multi-hop Routing",
  },
]

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
      {/* Glare effect */}
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
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">04 / Projects</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Featured Work</h2>
        </motion.div>

        {/* Bento grid: 2 featured large + 2 smaller side by side */}
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.filter((p) => p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="group h-full" featured>
                <div className="relative h-full overflow-hidden rounded-2xl border border-primary/15 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_50px_rgba(77,217,217,0.06)] sm:p-7">
                  {/* Top glow orb */}
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Top row: icon, metric, links */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                          <project.icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-primary/50">{project.subtitle}</p>
                          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary">{project.metric}</span>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                            aria-label={`${project.title} GitHub`}>
                            <Github size={14} />
                          </a>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                            aria-label={`${project.title} Live`}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-md border border-border/50 bg-secondary/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Secondary projects row */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {projects.filter((p) => !p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="group h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card/50">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/40">
                        <project.icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-primary/50">{project.subtitle}</p>
                        <h3 className="text-base font-bold text-foreground">{project.title}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary/70">{project.metric}</span>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary" aria-label={`${project.title} GitHub`}>
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-md bg-secondary/30 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
