"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/20 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-foreground">
            <span className="text-primary">P</span>S<span className="text-primary">.</span>
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart size={10} className="text-primary" /> by Prajwal Srinivas
          </span>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com/prajwal2308", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/prajwalsrinivas238", label: "LinkedIn" },
            { icon: Mail, href: "mailto:prajwal.srinivas238@gmail.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              aria-label={s.label}
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
