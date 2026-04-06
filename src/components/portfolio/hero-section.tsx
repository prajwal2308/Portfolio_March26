"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Mail, FileText } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/social-icons"
import { useEffect, useState, useRef } from "react"

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
    const rect = (ref as React.MutableRefObject<HTMLAnchorElement | null>).current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref as React.MutableRefObject<HTMLAnchorElement | null>}
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

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4dd9d9]/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-[#4dd9d9]/20 bg-[#4dd9d9]/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4dd9d9] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4dd9d9]" />
            </span>
            <span className="text-xs font-medium text-[#4dd9d9]">Open for Opportunities</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-2 text-6xl font-bold tracking-tighter text-white sm:text-8xl lg:text-9xl"
        >
          <span className="text-balance">Prajwal</span>
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-6xl font-bold tracking-tighter sm:text-8xl lg:text-9xl"
        >
          <span className="text-[#4dd9d9] glow-text">Srinivas</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-5 flex h-8 items-center justify-center"
        >
          <span className="font-mono text-sm text-gray-400 sm:text-base">
            {"$ "}{displayText}
            <span className="ml-0.5 inline-block h-4 w-[2px] bg-[#4dd9d9] animate-pulse-glow" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
        >
          Building high-availability AI platforms and secure cloud infrastructure at scale.
          MS CS @ Rutgers | 2.5+ years | 99.9% uptime across production systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href="#contact"
            className="group relative overflow-hidden rounded-xl bg-[#4dd9d9] px-7 py-3 text-sm font-semibold text-[#0a0a0f] transition-all hover:shadow-[0_0_40px_rgba(77,217,217,0.3)]"
          >
            <span className="relative z-10">Get in Touch</span>
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#4dd9d9]/30 hover:bg-white/10"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="https://drive.google.com/file/d/1NbKYuy-saJhFK6rJykHXJVwMyTZmZsde/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#4dd9d9]/20 bg-[#4dd9d9]/5 px-7 py-3 text-sm font-semibold text-[#4dd9d9] backdrop-blur-sm transition-all hover:bg-[#4dd9d9]/10"
          >
            <FileText size={14} /> Resume
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3"
        >
          <MagneticButton href="https://github.com/prajwal2308" target="_blank" rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/40 hover:text-[#4dd9d9]">
            <GithubIcon size={16} />
          </MagneticButton>
          <MagneticButton href="https://linkedin.com/in/prajwalsrinivas238" target="_blank" rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/40 hover:text-[#4dd9d9]">
            <LinkedinIcon size={16} />
          </MagneticButton>
          <MagneticButton href="mailto:prajwal.srinivas238@gmail.com"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/40 hover:text-[#4dd9d9]">
            <Mail size={16} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-1 text-gray-500 transition-colors hover:text-[#4dd9d9]"
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
