"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase, ExternalLink, ChevronRight } from "lucide-react"
import { useRef } from "react"

const experiences = [
  {
    company: "Beunec Technologies",
    role: "Co-Founder & CTO, Team Lead",
    period: "May 2025 - Present",
    tech: ["Next.js", "Node.js", "Cloudflare", "MongoDB", "AWS", "GCP", "Redis"],
    bullets: [
      "Architected and scaled Beunec Cloud, an AI productivity ecosystem with failover and global load balancing supporting 1K+ users with 99.9% uptime.",
      "Engineered Aselius AI, a proprietary GenAI engine with ground-search and privacy-first infrastructure, end-to-end encryption, and GDPR-compliant handling.",
      "Optimized platform infrastructure achieving 99.9% availability with real-time behavioral analytics via Python for resource monitoring and traffic scaling.",
    ],
    link: "https://beunec.com",
    current: true,
    highlight: true,
  },
  {
    company: "Universal Selfcare",
    role: "Cloud Systems Engineer & Project Lead",
    period: "Dec 2025 - Jan 2026",
    tech: ["GCP", "Cloud Run", "Cloud Functions", "Postgres", "GKE", "Go"],
    bullets: [
      "Engineered GCP-based serverless backend using Cloud Functions, Cloud Run, and GKE, achieving 95% test coverage within a 4-week high-intensity cycle.",
      "Leveraged AI-assisted development to accelerate cloud-native module delivery, reducing development cycles by 30%.",
      "Coordinated technical delivery with 5 developers, enforcing coding standards and ensuring 100% on-time MVP delivery.",
    ],
    current: false,
    highlight: false,
  },
  {
    company: "Rutgers University",
    role: "Teaching Assistant & Grader",
    period: "Sept 2024 - Present",
    tech: ["JavaScript", "HTML", "CSS", "SQL"],
    bullets: [
      "Teaching and mentoring 150+ students in web technologies and SQL, improving assignment performance by 25%.",
      "Reducing submission errors by 30% through structured technical reviews and hands-on debugging sessions.",
    ],
    current: true,
    highlight: false,
  },
  {
    company: "CSG International",
    role: "Software Developer",
    period: "Feb 2023 - Aug 2024",
    tech: ["REST API", "Azure DevOps", "Java", "Perl", "Unit Testing"],
    bullets: [
      "Developed core features for Customer Connect agent desktop for global telecom clients.",
      "Collaborated on agile SDLC to reduce post-release defect rates by 20% while ensuring high-performance service delivery.",
    ],
    current: false,
    highlight: false,
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  return (
    <section id="experience" className="relative py-20" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">02 / Experience</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Where I&apos;ve Built</h2>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/30 md:left-[23px]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary/60"
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-12 md:pl-14"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-5 md:left-0">
                  <div className={`relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 md:h-[46px] md:w-[46px] ${
                    exp.current
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(77,217,217,0.2)]"
                      : "border-border bg-card"
                  }`}>
                    <Briefcase size={16} className={exp.current ? "text-primary" : "text-muted-foreground"} />
                    {exp.current && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                      </span>
                    )}
                  </div>
                </div>

                <div className={`group rounded-2xl border p-5 transition-all sm:p-6 ${
                  exp.highlight
                    ? "border-primary/20 bg-card/60 shadow-[0_0_30px_rgba(77,217,217,0.04)] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(77,217,217,0.08)]"
                    : "border-border bg-card/30 hover:border-primary/15 hover:bg-card/50"
                } backdrop-blur-sm`}>
                  {/* Header row */}
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary" aria-label={`Visit ${exp.company}`}>
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {exp.current && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Current</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-primary/70">{exp.role}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{exp.period}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="mb-4 space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <ChevronRight size={14} className="mt-0.5 shrink-0 text-primary/40" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/20 hover:text-primary/80">
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
