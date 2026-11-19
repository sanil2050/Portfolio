"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { site } from "@/lib/site"

const projects = site.projects.slice(0, 3)

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Featured Projects</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: "'LED', sans-serif" }}>Projects</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-2"
          >
            <button
              onClick={prevProject}
              className="p-3 rounded-full border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextProject}
              className="p-3 rounded-full border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Next project"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              key={project.title}
            >
              <Link
                href={project.liveUrl || project.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <Card className="h-full overflow-hidden border-border bg-muted group-hover:border-primary/50 transition-colors duration-500">
                  <CardContent className="relative aspect-[4/3] p-0 overflow-hidden">
                    <Image
                      src={project.image || "/images/bookmark-wave-blue.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                  <CardHeader className="gap-2 relative bg-surface/10 backdrop-blur-sm -mt-2 z-10 pt-6">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors" style={{ fontFamily: "'LED', sans-serif" }}>{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex-wrap gap-2 px-6 pt-0 pb-6 relative z-10 bg-surface/10 backdrop-blur-sm">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-semibold bg-background/50 backdrop-blur-md border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
