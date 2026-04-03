"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  charDelay?: number
  splitBy?: "chars" | "words"
}

export function AnimatedText({ text, className, delay = 0, charDelay = 0.03, splitBy = "chars" }: AnimatedTextProps) {
  const elements = splitBy === "chars" ? text.split("") : text.split(" ")
  
  return (
    <span className="inline-flex flex-wrap">
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + i * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {splitBy === "words" && el !== " " ? el + "\u00A0" : el}
        </motion.span>
      ))}
    </span>
  )
}

interface CursorFollowerProps {
  children: React.ReactNode
  className?: string
}

export function CursorFollower({ children, className }: CursorFollowerProps) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const smoothX = useSpring(cursorX, { stiffness: 100, damping: 25 })
  const smoothY = useSpring(cursorY, { stiffness: 100, damping: 25 })
  const scale = useMotionValue(1)
  const opacity = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      opacity.set(1)
    }

    const handleMouseLeave = () => {
      opacity.set(0)
    }

    const handleMouseDown = () => scale.set(0.8)
    const handleMouseUp = () => scale.set(1)

    window.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY, scale, opacity])

  return (
    <div className="relative">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale,
          opacity,
        }}
        className="pointer-events-none fixed z-50 mix-blend-difference"
      >
        <div className={className}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

interface VelocityTextProps {
  text: string
  className?: string
  velocity: MotionValue<number>
}

export function VelocityText({ text, className, velocity }: VelocityTextProps) {
  const opacity = useTransform(velocity, [-2, 0, 2], [0.3, 1, 0.3])
  const x = useTransform(velocity, [-2, 0, 2], [-10, 0, 10])
  
  return (
    <motion.span style={{ opacity, x }} className="inline-block">
      {text}
    </motion.span>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  distance?: number
}

export function ScrollReveal({ children, className, direction = "up", delay = 0, distance = 30 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
  }, [])

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction], filter: "blur(8px)" }}
      animate={isVisible ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface MorphingShapeProps {
  className?: string
  color?: string
}

export function MorphingShape({ className, color = "bg-primary/20" }: MorphingShapeProps) {
  return (
    <motion.div
      animate={{
        borderRadius: ["40% 60% 60% 40% / 60% 30% 70% 40%", "30% 70% 30% 70% / 70% 60% 40% 30%", "50% 50% 50% 50% / 50% 50% 50% 50%", "60% 40% 60% 40% / 30% 60% 30% 60%"],
      }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      className={`absolute inset-0 ${color} ${className}`}
    />
  )
}

interface AnimatedCounterProps {
  value: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ value, className, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

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
    const duration = 2000
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, value])

  return (
    <div ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </div>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerChildren({ children, className, staggerDelay = 0.1, delayChildren = 0.2 }: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
