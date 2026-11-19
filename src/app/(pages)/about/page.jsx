"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Github, Linkedin, Globe, Mail, FileText, GraduationCap, Award, CheckCircle2 } from "lucide-react"
import { site } from "@/lib/site"
import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1]

const skills = site.skills
const experience = site.experience
const education = site.education || []
const certifications = site.certifications || []
const languages = site.languages || []

const socialLinks = [
  { href: site.social.github, icon: Github, label: "GitHub" },
  { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: site.website, icon: Globe, label: "Website" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
]

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          {/* Header Section */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-20 max-w-2xl"
          >
            <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Behind the Code</span>
            <h1 className="font-light text-primary mt-4 leading-tight text-4xl md:text-5xl lg:text-6xl font-serif">
              {site.about.title}
            </h1>
            <p className="mt-4 text-primary text-xl font-medium tracking-tight">{site.about.role}</p>
            <p className="mt-6 text-secondary font-light text-lg leading-relaxed">
              {site.about.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  href={link.href}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-outline-variant bg-surface hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all duration-300 text-secondary"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`Visit ${link.label}`}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-outline-variant bg-surface hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all duration-300 text-primary text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* About & What I Do */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="p-8 md:p-10 rounded-3xl bg-surface-container-low border border-outline-variant/50"
            >
              <h2 className="text-2xl font-serif text-primary mb-6">My Journey</h2>
              {site.about.journey.map((p, idx) => (
                <p key={idx} className="text-secondary font-light leading-relaxed mb-6 text-lg">
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="p-8 md:p-10 rounded-3xl bg-surface-container-low border border-outline-variant/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              <h2 className="text-2xl font-serif text-primary mb-6 relative z-10">What I Do</h2>
              <div className="space-y-6 relative z-10">
                {site.about.whatIDo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-secondary font-light text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Experience */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-24"
          >
            <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Career</span>
            <h2 className="text-4xl font-serif text-primary mt-4 mb-10">Experience</h2>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                  className="group p-8 rounded-3xl bg-transparent border border-outline-variant hover:bg-surface-container-low transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-medium text-primary mb-2">
                        {item.role}
                      </h3>
                      <p className="text-lg text-secondary">{item.company}</p>
                    </div>
                    <div className="text-sm font-mono tracking-wider text-secondary/70 bg-surface px-4 py-2 rounded-full border border-outline-variant/50">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-lg text-secondary font-light leading-relaxed mb-6 max-w-3xl">
                    {item.description}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-3 mb-8 max-w-4xl">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-secondary font-light text-base leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {item.skills.map((skill) => (
                      <span key={skill} className="text-xs font-medium tracking-wide px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          {education.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-24"
            >
              <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Academic Background</span>
              <h2 className="text-4xl font-serif text-primary mt-4 mb-10">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                    className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/50 flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-10 h-10 rounded-full border border-outline-variant bg-surface flex items-center justify-center text-primary">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono tracking-wider text-secondary/70 bg-surface px-4 py-1.5 rounded-full border border-outline-variant/50">
                        {edu.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-primary mb-1">{edu.degree}</h3>
                      <p className="text-secondary font-light text-base">{edu.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications & Languages */}
          {(certifications.length > 0 || languages.length > 0) && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-24"
            >
              <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Credentials</span>
              <h2 className="text-4xl font-serif text-primary mt-4 mb-10">Certifications &amp; Languages</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/50 space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="text-2xl font-serif text-primary">Certifications</h3>
                  </div>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.title}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface border border-outline-variant/40"
                      >
                        <div>
                          <p className="text-primary font-medium text-base">{cert.title}</p>
                          <p className="text-secondary font-light text-sm">{cert.issuer}</p>
                        </div>
                        <span className="self-start sm:self-center text-xs font-medium tracking-wide px-3.5 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/15 whitespace-nowrap">
                          {cert.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/50 flex flex-col justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-serif text-primary mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-secondary text-sm font-light"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {site.softSkills && site.softSkills.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-serif text-primary mb-4">Core Strengths</h3>
                      <div className="flex flex-wrap gap-2.5">
                        {site.softSkills.map((strength) => (
                          <span
                            key={strength}
                            className="px-3.5 py-1.5 rounded-full border border-outline-variant/60 bg-surface text-secondary text-xs font-light"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Arsenal</span>
            <h2 className="text-4xl font-serif text-primary mt-4 mb-10">Skills & Tools</h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, idx) => (
                <motion.div 
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: EASE }}
                  key={skill} 
                  className="px-6 py-3 rounded-full border border-outline-variant bg-surface hover:border-primary text-secondary hover:text-primary transition-colors cursor-default text-lg font-light"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
