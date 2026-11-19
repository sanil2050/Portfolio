"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Wrench, Trophy, CheckCircle2 } from "lucide-react"
import { site } from "@/lib/site"

export function StudentHighlights() {
  const skills = site.skills.slice(0, 10)
  const certifications = site.certifications || []

  return (
    <section id="highlights" className="py-20 px-4 md:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 space-y-4"
        >
          <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest">Highlights</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: "'LED', sans-serif" }}>Profile</h2>
          <p className="text-base md:text-lg text-muted-foreground/80 mt-4 max-w-2xl font-medium leading-relaxed">
            Academic foundation, applied AI engineering skills, and verified certifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-full border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold" style={{ fontFamily: "'LED', sans-serif" }}>Education</CardTitle>
                  <CardDescription className="text-base">MCA &amp; BCA</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-foreground">Galgotias University (MCA)</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2 hover:text-foreground transition-colors"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> BCA — Chandigarh University</li>
                  <li className="flex items-start gap-2 hover:text-foreground transition-colors"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> Agentic AI, RAG &amp; ML</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-full border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold" style={{ fontFamily: "'LED', sans-serif" }}>Skills</CardTitle>
                  <CardDescription className="text-base">AI &amp; engineering stack</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-full border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold" style={{ fontFamily: "'LED', sans-serif" }}>Certifications</CardTitle>
                  <CardDescription className="text-base">Verified AI &amp; data credentials</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm space-y-2">
                  {certifications.map((cert) => (
                    <li key={cert.title} className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                      <span>{cert.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
