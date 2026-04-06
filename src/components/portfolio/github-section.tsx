"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Star, GitFork, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/portfolio/social-icons"
import { useState, useEffect } from "react"

interface Repo {
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  homepage: string | null
}

function LanguageBadge({ lang }: { lang: string | null }) {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    Go: "#00ADD8",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Rust: "#dea584",
    Java: "#b07219",
  }
  if (!lang) return null
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gray-400">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[lang] || "#888" }} />
      {lang}
    </span>
  )
}

function ContributionGraph() {
  const [weeks, setWeeks] = useState<{ count: number }[][]>([])

  useEffect(() => {
    const mockWeeks = Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => ({ count: Math.floor(Math.random() * 5) }))
    )
    setWeeks(mockWeeks)
  }, [])

  return (
    <div className="flex gap-0.5 overflow-hidden">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((day, di) => (
            <div
              key={di}
              className="h-3 w-3 rounded-sm transition-colors hover:ring-1 hover:ring-white/30"
              style={{
                backgroundColor: day.count === 0 ? "#161b22" : `rgba(77, 217, 217, ${0.2 + day.count * 0.15})`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function GitHubSection() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ stars: 0, forks: 0, repos: 0 })

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch("https://api.github.com/users/prajwal2308/repos?sort=updated&per_page=30")
        if (!res.ok) throw new Error("Failed")
        const data = await res.json()
        setRepos(data.slice(0, 12))
        setStats({
          stars: data.reduce((acc: number, r: Repo) => acc + r.stargazers_count, 0),
          forks: data.reduce((acc: number, r: Repo) => acc + r.forks_count, 0),
          repos: data.length,
        })
      } catch {
        setRepos([])
      } finally {
        setLoading(false)
      }
    }
    fetchGitHub()
  }, [])

  return (
    <section id="github" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-[#4dd9d9]">05 / GitHub</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Open Source</h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 grid grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { icon: Star, label: "Total Stars", value: stats.stars },
            { icon: GitFork, label: "Forks", value: stats.forks },
            { icon: GithubIcon, label: "Public Repos", value: stats.repos },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <stat.icon size={18} className="mb-2 text-[#4dd9d9]" />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Contribution Activity</h3>
            <a href="https://github.com/prajwal2308" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#4dd9d9] hover:underline">
              <GithubIcon size={12} /> View Profile
            </a>
          </div>
          <ContributionGraph />
        </motion.div>

        {/* Repo grid */}
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.04 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-[#4dd9d9]/30 hover:bg-white/10"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#4dd9d9] transition-colors truncate max-w-[70%]">
                    {repo.name}
                  </h4>
                  <ExternalLink size={12} className="text-gray-600 group-hover:text-[#4dd9d9] transition-colors shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
                  {repo.description || "No description provided"}
                </p>
                <div className="flex items-center justify-between">
                  <LanguageBadge lang={repo.language} />
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-[10px] text-gray-500">
                      <Star size={10} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-gray-500">
                      <GitFork size={10} /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 flex justify-center"
        >
          <a href="https://github.com/prajwal2308" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#4dd9d9]/30 hover:bg-white/10">
            <GithubIcon size={16} /> View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  )
}
