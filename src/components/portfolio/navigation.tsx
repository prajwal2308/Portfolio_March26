"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { navItems } from "@/lib/data"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 50))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#hero"
            className="text-lg font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white">prajwal</span>
            <span className="text-[#4dd9d9]">.dev</span>
          </motion.a>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <a
                  href={item.href}
                  className="relative px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[#4dd9d9] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="mailto:prajwal.srinivas238@gmail.com"
              className="hidden md:flex items-center gap-2 rounded-lg bg-[#4dd9d9]/10 border border-[#4dd9d9]/20 px-4 py-1.5 text-sm text-[#4dd9d9] hover:bg-[#4dd9d9]/20 transition-colors"
            >
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 20 }}
              transition={{ delay: i * 0.05 }}
            >
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-white hover:text-[#4dd9d9] transition-colors"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
