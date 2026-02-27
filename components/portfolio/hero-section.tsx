"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"

const Hero3DScene = dynamic(
  () => import("./hero-3d-scene").then((mod) => ({ default: mod.Hero3DScene })),
  { ssr: false }
)

const titles = [
  "Full-Stack Cloud Developer",
  "Co-Founder & CTO @ Beunec",
  "Cloud Systems Architect",
  "AI Platform Engineer",
]

function MagneticButton({ children, href, className, target, rel }: {
  children: React.ReactNode
  href: string
  className?: string
  target?: string
  rel?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const textX = useTransform(smoothX, (v) => v * -0.02)
  const textY = useTransform(smoothY, (v) => v * -0.02)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    let timeout: NodeJS.Timeout
    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % titles.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentTitle.slice(0, displayText.length - 1)
              : currentTitle.slice(0, displayText.length + 1)
          )
        },
        isDeleting ? 25 : 50
      )
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3DScene />

      {/* Radial overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />

      <motion.div
        style={{ x: textX, y: textY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        {/* Status pill */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary">Open for Opportunities</span>
          </div>
        </motion.div>

        {/* Name - massive */}
        <motion.h1 variants={itemVariants} className="mb-2 text-6xl font-bold tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
          <span className="text-balance">Prajwal</span>
        </motion.h1>
        <motion.h1 variants={itemVariants} className="mb-4 text-6xl font-bold tracking-tighter sm:text-8xl lg:text-9xl">
          <span className="text-primary glow-text">Srinivas</span>
        </motion.h1>

        {/* Typing line */}
        <motion.div variants={itemVariants} className="mb-5 flex h-8 items-center justify-center">
          <span className="font-mono text-sm text-muted-foreground sm:text-base">
            {"$ "}{displayText}
            <span className="ml-0.5 inline-block h-4 w-[2px] bg-primary animate-pulse-glow" />
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Building high-availability AI platforms and secure cloud infrastructure at scale.
          MS CS @ Rutgers | 2.5+ years | 99.9% uptime across production systems.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href="#contact"
            className="group relative overflow-hidden rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(77,217,217,0.3)]"
          >
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 -translate-x-full bg-foreground/10 transition-transform group-hover:translate-x-0" />
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="rounded-xl border border-border bg-card/50 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="https://drive.google.com/file/d/1NbKYuy-saJhFK6rJykHXJVwMyTZmZsde/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-7 py-3 text-sm font-semibold text-primary backdrop-blur-sm transition-all hover:bg-primary/10"
          >
            <FileText size={14} /> Resume
          </MagneticButton>
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
          {[
            { icon: Github, href: "https://github.com/prajwal2308", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/prajwalsrinivas238", label: "LinkedIn" },
            { icon: Mail, href: "mailto:prajwal.srinivas238@gmail.com", label: "Email" },
          ].map((s) => (
            <MagneticButton
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/30 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-[0_0_20px_rgba(77,217,217,0.1)]"
            >
              <s.icon size={16} />
              <span className="sr-only">{s.label}</span>
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-1 text-muted-foreground/50 transition-colors hover:text-primary"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown size={12} />
        </motion.a>
      </motion.div>
    </section>
  )
}
