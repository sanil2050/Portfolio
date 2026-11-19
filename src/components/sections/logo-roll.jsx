"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

export function LogoRoll() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scroll-linked marquee
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <motion.section
      ref={containerRef}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-hidden mb-16 bg-surface py-12 relative"
    >
      {/* Edge gradient reveal masks for seamless marquee fade */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div style={{ x }} className="flex w-max opacity-40 hover:opacity-75 transition-opacity duration-300">
        <div className="flex flex-shrink-0 items-center gap-12 md:gap-24 pr-12 md:pr-24">
          <div className="text-3xl md:text-5xl text-primary font-bold tracking-tight">PYTHON</div>
          <div className="text-3xl md:text-5xl text-primary tracking-widest font-light">LANGCHAIN</div>
          <div className="text-3xl md:text-5xl text-primary italic font-medium">PyTorch</div>
          <div className="text-3xl md:text-5xl text-primary uppercase font-semibold">FASTAPI</div>
          <div className="text-3xl md:text-5xl text-primary tracking-wide">PINECONE</div>
          <div className="text-3xl md:text-5xl text-primary font-light tracking-widest">PGVECTOR</div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-12 md:gap-24 pr-12 md:pr-24">
          <div className="text-3xl md:text-5xl text-primary font-bold tracking-tight">PYTHON</div>
          <div className="text-3xl md:text-5xl text-primary tracking-widest font-light">LANGCHAIN</div>
          <div className="text-3xl md:text-5xl text-primary italic font-medium">PyTorch</div>
          <div className="text-3xl md:text-5xl text-primary uppercase font-semibold">FASTAPI</div>
          <div className="text-3xl md:text-5xl text-primary tracking-wide">PINECONE</div>
          <div className="text-3xl md:text-5xl text-primary font-light tracking-widest">PGVECTOR</div>
        </div>
      </motion.div>
    </motion.section>
  )
}
