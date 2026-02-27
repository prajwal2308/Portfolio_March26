"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-primary shadow-[0_0_10px_rgba(77,217,217,0.5)]"
    />
  )
}

export function FloatingDock() {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${section.label}`}
        >
          <span className="absolute right-5 whitespace-nowrap rounded-md bg-card/90 px-2.5 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 border border-border/50">
            {section.label}
          </span>
          <div className={`h-2 w-2 rounded-full border transition-all ${
            activeSection === section.id
              ? "border-primary bg-primary scale-125 shadow-[0_0_8px_rgba(77,217,217,0.5)]"
              : "border-muted-foreground/20 bg-transparent hover:border-primary/40"
          }`} />
        </a>
      ))}
    </motion.div>
  )
}
