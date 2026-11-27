"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { site } from "@/lib/site"
import { SanilKineticHero } from "@/components/ui/sanil-kinetic-hero"
import { PuffyOrbText } from "@/components/ui/puffy-orb-text"

export function HeroSection() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Pause hero video decode when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current
    const vid = videoRef.current
    if (!el || !vid || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      },
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Scroll-linked transformations (GPU translate/opacity only — avoids dynamic video rescaling)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "120%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* Main Title Area */}
      <section ref={containerRef} className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-[20px] pb-[60px] px-[20px]">
        <div className="relative w-full max-w-[1200px] mx-auto rounded-[20px] overflow-hidden flex items-center justify-center min-h-[600px] pt-16 pb-20 isolate">
          <motion.div
            style={{ y: yBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform transform-gpu"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/images/hero-poster.jpg"
              aria-hidden="true"
              className="w-full h-full object-cover scale-125 object-center transform-gpu"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-black/45 pointer-events-none"></div>

          <motion.div 
            style={{ y: yText, opacity: opacityText }}
            className="relative z-10 w-full px-4 md:px-8 text-center flex flex-col items-center will-change-transform transform-gpu"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3"
            >
              <PuffyOrbText
                text="Portfolio"
                letterToReplace="o"
                style={{ fontSize: "clamp(2.8rem, 8.5vw, 6.25rem)" }}
              />
            </motion.div>
            <div className="w-full mb-7">
              <SanilKineticHero />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={site.hero.primaryCta.href}>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-primary/50 bg-black/60 text-primary text-sm font-medium px-8 py-3 rounded-full transition-all duration-300 hover:border-primary shadow-[0_0_20px_-10px_rgba(255,255,255,0.3)]"
                >
                  {site.hero.primaryCta.label}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: opacityText }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center bg-black/45 text-primary/60 will-change-transform"
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Text Section with Scroll Reveal */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="pb-12 pt-8 px-[20px]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-2/5 flex items-start pt-3"
            >
              <span id="about" className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase whitespace-nowrap">About Me</span>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={{ visible: { transition: { staggerChildren: 0.02, delayChildren: 0.1 } } }}
              className="lg:w-3/5"
            >
              <p className="text-primary leading-tight font-light tracking-tight text-2xl md:text-[36px] font-sans">
                {site.hero.subtitle.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
