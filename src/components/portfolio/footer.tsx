"use client"

import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/social-icons"

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/20 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600">
          Designed & Built by <span className="text-[#4dd9d9]">Prajwal Srinivas</span> • {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: GithubIcon, href: "https://github.com/prajwal2308", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/prajwalsrinivas238", label: "LinkedIn" },
            { icon: Mail, href: "mailto:prajwal.srinivas238@gmail.com", label: "Email" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-[#4dd9d9]" aria-label={s.label}>
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
