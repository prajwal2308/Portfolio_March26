"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useGitHubProfile, useGitHubContributions, GitHubRepo } from "@/hooks/use-github"
import { Github, Star, GitFork, ExternalLink, Activity, Calendar } from "lucide-react"
import { useRef } from "react"

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  Jupyter: "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  HCL: "#844FBA",
}

function ContributionGraph({ weeks }: { weeks: { days: { count: number; date: string }[] }[] }) {
  const getColor = (count: number) => {
    if (count === 0) return "bg-secondary/20"
    if (count <= 2) return "bg-primary/30"
    if (count <= 5) return "bg-primary/50"
    if (count <= 10) return "bg-primary/70"
    return "bg-primary"
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.days.map((day, di) => (
              <div
                key={di}
                className={`h-3 w-3 rounded-sm ${day.date ? getColor(day.count) : "bg-transparent"}`}
                title={day.date ? `${day.date}: ${day.count} contributions` : ""}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/25 hover:bg-card/60 hover:shadow-[0_0_30px_rgba(77,217,217,0.05)]"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Github size={14} className="text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground truncate max-w-[180px]">{repo.name}</h4>
        </div>
        <ExternalLink size={12} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {repo.description && (
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-3">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColors[repo.language] || "#8b949e" }}
            />
            <span className="font-mono text-[10px] text-muted-foreground">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Star size={11} className="text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={11} className="text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">{repo.forks_count}</span>
        </div>
      </div>
    </motion.a>
  )
}

export function GitHubSection() {
  const { profile, repos, stats, loading } = useGitHubProfile()
  const contributions = useGitHubContributions()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  const pinnedRepos = repos.slice(0, 6)

  const statCards = [
    { icon: Github, label: "Repositories", value: stats?.totalRepos ?? 0, color: "text-white" },
    { icon: Star, label: "Total Stars", value: stats?.totalStars ?? 0, color: "text-yellow-400" },
    { icon: GitFork, label: "Total Forks", value: stats?.totalForks ?? 0, color: "text-blue-400" },
    { icon: Activity, label: "Contributions", value: stats?.contributions ?? 0, color: "text-green-400" },
  ]

  if (loading) {
    return (
      <section id="github" className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="relative py-20 overflow-hidden" ref={sectionRef}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.3em] text-primary">05 / GitHub</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Open Source</h2>
          </div>
          <a
            href={profile?.html_url || "https://github.com/prajwal2308"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-primary sm:flex"
          >
            <Github size={14} /> View Profile
          </a>
        </motion.div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 p-5 text-center backdrop-blur-sm transition-all hover:border-primary/30"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <stat.icon size={16} className={`relative z-10 mb-2 ${stat.color}`} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="relative z-10 text-2xl font-bold text-foreground sm:text-3xl"
              >
                {stat.value}
              </motion.span>
              <span className="relative z-10 mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        {contributions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Contribution Activity</h3>
            </div>
            <ContributionGraph weeks={contributions} />
          </motion.div>
        )}

        {/* Language breakdown */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground">Top Languages</h3>
            <div className="space-y-2">
              {Object.entries(
                repos.reduce((acc: Record<string, number>, repo) => {
                  if (repo.language) {
                    acc[repo.language] = (acc[repo.language] || 0) + 1
                  }
                  return acc
                }, {}) as Record<string, number>
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([lang, count]) => (
                  <div key={lang} className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: languageColors[lang] || "#8b949e" }}
                    />
                    <span className="w-24 text-xs text-muted-foreground">{lang}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-secondary/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${(count / repos.length) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: languageColors[lang] || "#8b949e",
                          opacity: 0.7,
                        }}
                      />
                    </div>
                    <span className="w-8 font-mono text-[10px] text-muted-foreground">{count}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Pinned repos */}
        {pinnedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground">Recent Repositories</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pinnedRepos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
