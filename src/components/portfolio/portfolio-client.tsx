"use client"

import { Navigation } from "./navigation"
import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-section"
import { ExperienceSection } from "./experience-section"
import { SkillsSection } from "./skills-section"
import { ProjectsSection } from "./projects-section"
import { GitHubSection } from "./github-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"
import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-6 py-2">
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="mx-auto h-px bg-gradient-to-r from-transparent via-[#4dd9d9]/20 to-transparent"
      />
    </div>
  )
}

export function PortfolioClient() {
  return (
    <div className="relative">
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
        <GitHubSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
