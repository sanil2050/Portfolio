"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { site } from "@/lib/site"
import { BookmarkProjectCard } from "@/components/ui/bookmark-project-card"

const projects = site.projects
const EASE = [0.22, 1, 0.36, 1]

export default function ProjectsPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          {/* Header */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-20 max-w-2xl"
          >
            <span className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">Selected Works</span>
            <h1 className="font-light text-white mt-4 leading-tight text-4xl md:text-5xl lg:text-6xl font-serif">
              Crafted with purpose.
            </h1>
            <p className="mt-6 text-white/50 font-light text-lg leading-relaxed">
              A collection of Agentic AI systems, Enterprise &amp; Hybrid RAG platforms, computer vision benchmarks, and machine learning pipelines built for real-world reliability and rapid impact.
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center items-start"
          >
            {projects.map((project, index) => (
              <BookmarkProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-32 text-center"
          >
            <h3 className="text-2xl font-serif text-primary mb-6">Have a project in mind?</h3>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-on-primary font-semibold px-4 md:px-8 py-4 rounded-full hover:bg-primary-container transition-all shadow-lg hover:shadow-xl duration-200"
              >
                Let's discuss your idea
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
