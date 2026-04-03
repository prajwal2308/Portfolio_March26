"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { MotionValue, useMotionValue, useSpring } from "framer-motion"

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const scrolled = window.innerHeight - rect.top
    setOffset(scrolled * speed)
  }, [speed])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { ref, offset }
}

export function useSmoothCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  return { ref, count }
}

export function useScrollVelocity() {
  const scrollY = useMotionValue(0)
  const velocity = useMotionValue(0)
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 30 })
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const currentScrollY = window.scrollY
      const deltaTime = now - lastTime.current

      if (deltaTime > 0) {
        const deltaScroll = currentScrollY - lastScrollY.current
        velocity.set(deltaScroll / deltaTime)
      }

      scrollY.set(currentScrollY)
      lastScrollY.current = currentScrollY
      lastTime.current = now
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY, velocity])

  return { scrollY, velocity, smoothVelocity }
}

export function useDirectionalScroll() {
  const direction = useMotionValue(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        direction.set(1)
      } else if (currentScrollY < lastScrollY.current) {
        direction.set(-1)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [direction])

  return direction
}

export function useMouseFollower() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  return { mouseX, mouseY, smoothX, smoothY }
}

export function useInViewProgress(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          progress.set(entry.intersectionRatio)
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [progress, threshold])

  return { ref, progress }
}
