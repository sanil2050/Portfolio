"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"

export function BookmarkProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const defaultAccents = [
    "rgb(0, 123, 255)",  // Electric Blue
    "rgb(255, 73, 25)",  // Flame Orange
    "rgb(190, 55, 241)", // Neon Purple
    "rgb(16, 185, 129)", // Emerald Green
  ]

  const accent = project.accentColor || defaultAccents[index % defaultAccents.length]
  const brand = project.brand || `— ${project.title}®`
  const h1 = project.h1 || project.title
  const caption = project.caption || project.description
  const step = project.step || ((index % 3) + 1)
  const image = project.image || "/images/bookmark-wave-blue.jpg"

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className="relative w-full max-w-[350px] mx-auto select-none group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={project.liveUrl || project.githubUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full aspect-[340/480] overflow-hidden"
      >
        {/* ─── SVG Silhouette Background (Pitch Black + Seamless Curves matching Page UI) ─── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 340 480"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Card Body matching site theme #0f0f0f */}
          <path
            d="M 32 44 H 116 v -4 h 6.745 a 32 32 0 0 0 22.628 -9.373 l 21.254 -21.254 A 32 32 0 0 1 189.255 0 H 308 c 17.673 0 32 14.335 32 32.008 V 404 c 0 17.673 -14.335 32 -32 32 H 154 v 4 h -6.745 a 32 32 0 0 0 -22.628 9.373 l -21.254 21.254 A 32 32 0 0 1 80.745 480 H 32 C 14.327 480 0 465.665 0 447.992 V 76.008 C 0 58.335 14.327 44 32 44 Z"
            fill="#0f0f0f"
          />

          {/* Internal Border Stroke (Framer Motion color transition on Hover) */}
          <motion.path
            d="M 32 44 H 116 v -4 h 6.745 a 32 32 0 0 0 22.628 -9.373 l 21.254 -21.254 A 32 32 0 0 1 189.255 0 H 308 c 17.673 0 32 14.335 32 32.008 V 404 c 0 17.673 -14.335 32 -32 32 H 154 v 4 h -6.745 a 32 32 0 0 0 -22.628 9.373 l -21.254 21.254 A 32 32 0 0 1 80.745 480 H 32 C 14.327 480 0 465.665 0 447.992 V 76.008 C 0 58.335 14.327 44 32 44 Z"
            animate={{
              stroke: isHovered ? accent : "rgba(255, 255, 255, 0.08)",
              strokeWidth: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>

        {/* ─── Internal Radial Hover Wash (Strictly inside card boundaries) ─── */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% 25%, ${accent}22 0%, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* ─── FG Top: Brand Label (Top-Right Tab) ─── */}
        <div className="absolute top-[12px] right-[24px] z-20 pointer-events-none">
          <motion.p
            animate={{ color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.75)" }}
            transition={{ duration: 0.25 }}
            className="text-[13px] font-medium tracking-[-0.04em] select-none truncate max-w-[170px]"
          >
            {brand}
          </motion.p>
        </div>

        {/* ─── Inner Content Container ─── */}
        <div className="relative z-10 w-full h-full pt-[54px] px-[16px] pb-[44px] flex flex-col justify-between box-border">
          {/* Pic Box: Actual Project Screenshot + Caption */}
          <div className="relative w-full h-[220px] rounded-[16px] overflow-hidden bg-black shrink-0 border border-white/[0.08] group-hover:border-white/20 transition-colors duration-300">
            {/* Internal hover color wash inside the picture container */}
            <motion.div
              animate={{ opacity: isHovered ? 0.25 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ backgroundColor: accent }}
            />

            {/* Actual Project Screenshot with Framer Motion zoom */}
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={image}
                alt={project.title || "Project image"}
                fill
                className="object-cover opacity-95 group-hover:opacity-85 transition-opacity duration-500 z-10"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </motion.div>

            {/* Dark vignette gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-20 pointer-events-none" />

            {/* Caption Text (bottom-left of Pic) */}
            <div className="absolute bottom-[14px] left-[14px] right-[14px] z-30 pointer-events-none">
              <p className="text-[18px] md:text-[19px] font-semibold tracking-[-0.04em] text-white leading-[1.2] whitespace-pre-line drop-shadow-sm">
                {caption}
              </p>
            </div>
          </div>

          {/* H1 Headline at bottom of card */}
          <div className="mt-auto mb-[8px] pl-[6px] z-20">
            <motion.h2
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[38px] md:text-[44px] font-light tracking-[-0.06em] text-white/90 group-hover:text-white font-sans leading-tight transition-colors duration-300 truncate"
            >
              {h1}
            </motion.h2>
          </div>
        </div>

        {/* ─── FG Bottom: 3 Indicator Pills (Bottom-Left Tab) ─── */}
        <div className="absolute bottom-[14px] left-[20px] z-20 flex items-center gap-[6px] pointer-events-none">
          <motion.div
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.25 }}
            className="w-[22px] h-[6px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: step >= 1 ? accent : "rgb(28, 28, 28)",
              boxShadow: isHovered && step >= 1 ? `0 0 6px ${accent}` : "none",
            }}
          />
          <motion.div
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.25 }}
            className="w-[22px] h-[6px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: step >= 2 ? accent : "rgb(28, 28, 28)",
              boxShadow: isHovered && step >= 2 ? `0 0 6px ${accent}` : "none",
            }}
          />
          <motion.div
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.25 }}
            className="w-[22px] h-[6px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: step >= 3 ? accent : "rgb(28, 28, 28)",
              boxShadow: isHovered && step >= 3 ? `0 0 6px ${accent}` : "none",
            }}
          />
        </div>
      </a>
    </motion.div>
  )
}
