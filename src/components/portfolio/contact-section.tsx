"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Mail, MapPin, Send } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/social-icons"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">06 / Contact</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Let's Connect</h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            I'm currently open to new opportunities in Full-Stack, Cloud, and AI engineering roles.
            Whether you have a role in mind or just want to chat — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Mail, label: "Email", value: "prajwal.srinivas238@gmail.com", href: "mailto:prajwal.srinivas238@gmail.com" },
            { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/prajwalsrinivas238", href: "https://linkedin.com/in/prajwalsrinivas238" },
            { icon: GithubIcon, label: "GitHub", value: "github.com/prajwal2308", href: "https://github.com/prajwal2308" },
            { icon: MapPin, label: "Location", value: "New Brunswick, NJ", href: null },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href || undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/30 hover:bg-white/10 ${item.href ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 group-hover:border-[#4dd9d9]/30 transition-colors">
                <item.icon size={20} className="text-[#4dd9d9]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-white group-hover:text-[#4dd9d9] transition-colors">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a href="mailto:prajwal.srinivas238@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-[#4dd9d9] px-8 py-3.5 text-sm font-semibold text-[#0a0a0f] transition-all hover:shadow-[0_0_40px_rgba(77,217,217,0.3)]">
            <Send size={16} /> Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  )
}
