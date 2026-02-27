"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.querySelector(navLinks[i].href)
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <motion.a
            href="#hero"
            className="text-lg font-bold tracking-tight text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary">P</span>S<span className="text-primary">.</span>
          </motion.a>

          {/* Desktop */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeSection === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
            <a
              href="mailto:prajwal.srinivas238@gmail.com"
              className="ml-3 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(77,217,217,0.2)]"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-5"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-xl font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="mailto:prajwal.srinivas238@gmail.com"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
