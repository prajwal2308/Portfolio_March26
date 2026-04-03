"use client"

import { useEffect, useState } from "react"

export interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  pushed_at: string
  forks: number
  open_issues: number
  watchers: number
  size: number
  homepage: string | null
}

export interface GitHubProfile {
  login: string
  name: string | null
  bio: string | null
  company: string | null
  location: string | null
  blog: string
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  twitter_username: string | null
}

export interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  contributions: number
}

function useGitHubUsername() {
  return "prajwal2308"
}

export function useGitHubProfile() {
  const username = useGitHubUsername()
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`),
        ])

        if (!profileRes.ok || !reposRes.ok) throw new Error("Failed to fetch GitHub data")

        const profileData = await profileRes.json()
        const reposData = await reposRes.json()

        setProfile(profileData)
        setRepos(reposData)

        const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0)
        const totalForks = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.forks_count, 0)

        setStats({
          totalStars,
          totalForks,
          totalRepos: profileData.public_repos,
          contributions: 0,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  return { profile, repos, stats, loading, error }
}

export function useGitHubContributions() {
  const username = useGitHubUsername()
  const [weeks, setWeeks] = useState<{ days: { count: number; date: string }[] }[]>([])

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/events?per_page=100`)
        if (!res.ok) return
        const events = await res.json()
        
        const contributionsMap = new Map<string, number>()
        const now = new Date()
        
        for (let i = 0; i < 52 * 7; i++) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split("T")[0]
          contributionsMap.set(dateStr, 0)
        }
        
        events.forEach((event: { created_at: string }) => {
          const dateStr = event.created_at.split("T")[0]
          if (contributionsMap.has(dateStr)) {
            contributionsMap.set(dateStr, (contributionsMap.get(dateStr) || 0) + 1)
          }
        })
        
        const weeksArr: { days: { count: number; date: string }[] }[] = []
        let currentWeek: { count: number; date: string }[] = []
        
        const sortedDates = Array.from(contributionsMap.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
        
        const firstDate = new Date(sortedDates[0][0])
        const startPadding = firstDate.getDay()
        for (let i = 0; i < startPadding; i++) {
          currentWeek.push({ count: 0, date: "" })
        }
        
        sortedDates.forEach(([date, count]) => {
          currentWeek.push({ count, date })
          if (currentWeek.length === 7) {
            weeksArr.push({ days: currentWeek })
            currentWeek = []
          }
        })
        
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) {
            currentWeek.push({ count: 0, date: "" })
          }
          weeksArr.push({ days: currentWeek })
        }
        
        setWeeks(weeksArr.slice(-52))
      } catch (err) {
        console.error("Failed to fetch contributions:", err)
      }
    }

    fetchContributions()
  }, [username])

  return weeks
}
