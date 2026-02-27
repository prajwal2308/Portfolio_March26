"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Mail, Linkedin, Github, ArrowUpRight, Phone, Send } from "lucide-react"

const links = [
  { icon: Mail, label: "Email", value: "prajwal.srinivas238@gmail.com", href: "mailto:prajwal.srinivas238@gmail.com" },
  { icon: Phone, label: "Phone", value: "848-230-1591", href: "tel:848-230-1591" },
  { icon: Linkedin, label: "LinkedIn", value: "prajwalsrinivas238", href: "https://www.linkedin.com/in/prajwalsrinivas238" },
  { icon: Github, label: "GitHub", value: "prajwal2308", href: "https://github.com/prajwal2308" },
]

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">05 / Contact</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Let&apos;s Connect</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left column: Links grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_0_25px_rgba(77,217,217,0.05)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <link.icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70">{link.label}</p>
                  <p className="truncate text-sm font-medium text-foreground">{link.value}</p>
                </div>
                <ArrowUpRight size={14} className="shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2 flex"
          >
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-primary/15 bg-card/30 p-8 text-center backdrop-blur-sm">
              {/* Glow orbs */}
              <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-primary/10 blur-[50px]" />
              <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-primary/10 blur-[50px]" />

              <div className="relative z-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Send size={22} className="text-primary" />
                </div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">Available for</p>
                <h3 className="mb-2 text-2xl font-bold text-foreground">Full-Time Roles</h3>
                <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
                  Cloud Engineering, Full-Stack Dev,<br />AI/ML Engineering, DevOps
                </p>
                <a
                  href="mailto:prajwal.srinivas238@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(77,217,217,0.3)]"
                >
                  Send Message <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
