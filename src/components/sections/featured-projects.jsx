"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"
import { BookmarkProjectCard } from "@/components/ui/bookmark-project-card"

const featuredProjects = site.projects.slice(0, 3)
const EASE = [0.22, 1, 0.36, 1]

export function FeaturedProjects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id="projects"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="pt-16 md:pt-24 pb-20 md:pb-32 px-4 md:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase block mb-3">
              Featured Works
            </span>
            <h2 className="font-light text-white leading-tight text-3xl md:text-[42px] font-serif">
              Recent Projects
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-white hover:text-white/70 transition-colors font-medium text-sm"
            >
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center items-start"
        >
          {featuredProjects.map((project, index) => (
            <BookmarkProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
