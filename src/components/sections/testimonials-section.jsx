"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { site } from "@/lib/site"

const items = site.highlights || []

/* Smooth word-by-word text reveal variants */
const quoteContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.032,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }, [])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev])

  const active = items[current]
  if (!active) return null

  const words = active.quote ? active.quote.split(" ") : []

  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id="highlights"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 md:py-24 bg-transparent text-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase block mb-3">
            Credentials &amp; Focus
          </span>
          <h2 className="font-light text-white leading-tight text-3xl md:text-[42px] font-serif">
            Highlights &amp; Background
          </h2>
        </motion.div>

        {/* Sectional Highlights Slider Container (Matching Page UI) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.985, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="sectional-testimonial"
          role="region"
          aria-roledescription="carousel"
          aria-label="Highlights and credentials"
          style={{
            maxWidth: "100%",
            width: "100%",
            position: "relative",
            minWidth: "0px",
            boxSizing: "border-box",
            background: "#0f0f0f",
            color: "#ffffff",
            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
            fontStyle: "normal",
            fontWeight: 400,
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            ["--sectional-border"]: "rgba(255, 255, 255, 0.08)",
            ["--sectional-accent"]: "#ffffff",
            ["--sectional-font-size"]: "44px",
          }}
        >
          <div className="sectional-grid">
            {/* Column 1: Portrait */}
            <div className="sectional-portrait">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    priority
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Column 2: Details */}
            <div className="sectional-details">
              {/* Counter with subtle tech pill */}
              <div className="mb-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active.counter}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs font-mono font-medium tracking-wider text-white/70 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full inline-block"
                  >
                    {active.counter}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Name & Role */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    style={{
                      fontSize: "26px",
                      lineHeight: 1.2,
                      letterSpacing: "-0.06em",
                      marginBottom: "16px",
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    {active.name}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    {active.role}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Focus Label Section */}
              <div className="sectional-services-label">{active.label || "Focus"}</div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.services}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="sectional-services"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {active.services}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handlePrev}
                  className="formaly-review-arrow"
                  type="button"
                  aria-label="Previous highlight"
                  style={{
                    appearance: "none",
                    boxSizing: "border-box",
                    flex: "0 0 44px",
                    width: "44px",
                    height: "44px",
                    minWidth: "44px",
                    minHeight: "44px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "none",
                    cursor: "pointer",
                    padding: "0px",
                    lineHeight: 0,
                    overflow: "hidden",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    style={{ display: "block", flexShrink: 0 }}
                  >
                    <path d="M19 12H5M11 6L5 12L11 18" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleNext}
                  className="formaly-review-arrow"
                  type="button"
                  aria-label="Next highlight"
                  style={{
                    appearance: "none",
                    boxSizing: "border-box",
                    flex: "0 0 44px",
                    width: "44px",
                    height: "44px",
                    minWidth: "44px",
                    minHeight: "44px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "none",
                    cursor: "pointer",
                    padding: "0px",
                    lineHeight: 0,
                    overflow: "hidden",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    style={{ display: "block", flexShrink: 0 }}
                  >
                    <path d="M5 12H19M13 6L19 12L13 18" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Column 3: Quote */}
            <div className="sectional-quote">
              {/* Editorial Accent Mark */}
              <div
                style={{
                  fontSize: "52px",
                  lineHeight: 0.85,
                  color: "rgba(255, 255, 255, 0.2)",
                  marginBottom: "24px",
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: 600,
                  letterSpacing: "-0.06em",
                  userSelect: "none",
                }}
              >
                //
              </div>

              {/* Quote Content with Smooth Word-by-Word Text Revealing Animation */}
              <div style={{ position: "relative", minHeight: "220px", display: "flex", alignItems: "flex-start" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={active.id}
                    variants={quoteContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: "1.25em",
                      letterSpacing: "-0.05em",
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontSize: "var(--sectional-quote-size, 44px)",
                      fontStyle: "normal",
                      color: "#ffffff",
                    }}
                  >
                    {words.map((word, index) => (
                      <motion.span
                        key={`${active.id}-${index}`}
                        variants={wordVariants}
                        className="inline-block mr-[0.24em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
