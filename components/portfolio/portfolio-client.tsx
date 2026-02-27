"use client"

import { Navigation } from "./navigation"
import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-section"
import { ExperienceSection } from "./experience-section"
import { SkillsSection } from "./skills-section"
import { ProjectsSection } from "./projects-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"
import { ScrollProgress, FloatingDock } from "./scroll-progress"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const width = useTransform(scrollYProgress, [0, 0.5], ["0%", "80%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="relative mx-auto max-w-7xl px-6 py-2">
      <motion.div style={{ width, opacity }} className="mx-auto h-px bg-primary/20" />
    </div>
  )
}

export function PortfolioClient() {
  return (
    <div className="relative">
      <ScrollProgress />
      <FloatingDock />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
