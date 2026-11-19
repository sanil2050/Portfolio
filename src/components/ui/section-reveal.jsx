"use client"

import { motion, useReducedMotion } from "framer-motion"

const CUBIC_EASE = [0.22, 1, 0.36, 1]

/**
 * SectionReveal: Wraps a section or section container with an elegant,
 * cinematic scroll-triggered reveal effect featuring smooth vertical translation,
 * blur dissipation, and opacity fade.
 */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.85,
  yOffset = 36,
  xOffset = 0,
  blur = 6,
  scale = 1,
  direction = "up",
  viewportMargin = "-70px",
  viewportAmount = 0.15,
  as = "div",
  staggerChildren = 0,
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  let initialX = 0
  let initialY = 0

  if (!shouldReduceMotion) {
    if (direction === "up") initialY = yOffset
    else if (direction === "down") initialY = -yOffset
    else if (direction === "left") initialX = yOffset
    else if (direction === "right") initialX = -yOffset
    else if (direction === "custom") {
      initialX = xOffset
      initialY = yOffset
    }
  }

  const MotionComponent =
    as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : as === "main"
      ? motion.main
      : motion.div

  const variants = {
    hidden: {
      opacity: 0,
      y: initialY,
      x: initialX,
      scale: shouldReduceMotion ? 1 : scale < 1 ? scale : 1,
      filter: shouldReduceMotion || blur === 0 ? "none" : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: CUBIC_EASE,
        when: staggerChildren ? "beforeChildren" : undefined,
        staggerChildren: staggerChildren || undefined,
      },
    },
  }

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin, amount: viewportAmount }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * RevealItem: Used for staggering child elements inside a section (e.g. badges, titles, cards)
 */
export function RevealItem({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  yOffset = 20,
  blur = 4,
  as = "div",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionComponent =
    as === "span"
      ? motion.span
      : as === "h2"
      ? motion.h2
      : as === "h3"
      ? motion.h3
      : as === "p"
      ? motion.p
      : motion.div

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
      filter: shouldReduceMotion || blur === 0 ? "none" : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: CUBIC_EASE,
      },
    },
  }

  return (
    <MotionComponent
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

