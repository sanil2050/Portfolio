"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Mail, Phone, MapPin, Calendar, ArrowRight, CheckCircle2 } from "lucide-react"
import { site } from "@/lib/site"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CustomSelect } from "@/components/shared/custom-select"
import { Turnstile } from "@marsidev/react-turnstile"

const EASE = [0.22, 1, 0.36, 1]
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [status, setStatus] = useState({ type: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (turnstileSiteKey && !turnstileToken) {
      setStatus({ type: "error", message: "Security verification pending. Please wait a moment and try again." })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: "", message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: "", email: "", projectType: "", budget: "", message: "" })
      } else if (data?.fallbackMailto) {
        const subject = encodeURIComponent(
          `Portfolio Inquiry from ${formData.name}${formData.projectType ? ` (${formData.projectType})` : ""}`
        )
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType || "Not specified"}\nEngagement / Scope: ${formData.budget || "Not specified"}\n\n${formData.message}`
        )
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
        setStatus({
          type: "success",
          message: `Opening your email client to send this inquiry directly to ${site.email}.`,
        })
        setFormData({ name: "", email: "", projectType: "", budget: "", message: "" })
      } else {
        setStatus({ type: "error", message: data?.message || "Failed to send message. Please try again." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            className="mb-16 max-w-2xl"
          >
            <span className="text-xs font-semibold text-secondary tracking-[0.2em] uppercase">Get In Touch</span>
            <h1 className="font-light text-primary mt-4 leading-tight text-4xl md:text-5xl lg:text-6xl font-serif">
              Let's build something<br />impactful together.
            </h1>
            <p className="mt-6 text-secondary font-light text-lg leading-relaxed">
              Looking for an AI Engineer, Data Analyst, or ML collaborator? Drop me a message below or reach out directly via email or phone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Details */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="lg:col-span-4 space-y-8"
            >
              <a href={`mailto:${site.email}`} className="block group border-t border-outline-variant pt-6">
                <div className="flex items-center gap-4 mb-2">
                  <Mail className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-medium text-primary">Email</h3>
                </div>
                <p className="text-secondary font-light pl-9 group-hover:text-primary transition-colors">{site.email}</p>
              </a>

              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="block group border-t border-outline-variant pt-6">
                <div className="flex items-center gap-4 mb-2">
                  <Phone className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-medium text-primary">Phone</h3>
                </div>
                <p className="text-secondary font-light pl-9 group-hover:text-primary transition-colors">{site.phone}</p>
              </a>

              <div className="group border-t border-outline-variant pt-6">
                <div className="flex items-center gap-4 mb-2">
                  <Calendar className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-medium text-primary">Availability</h3>
                </div>
                <p className="text-secondary font-light pl-9 group-hover:text-primary transition-colors">{site.availability}</p>
              </div>

              <div className="group border-t border-outline-variant pt-6">
                <div className="flex items-center gap-4 mb-2">
                  <MapPin className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-medium text-primary">Location</h3>
                </div>
                <p className="text-secondary font-light pl-9 group-hover:text-primary transition-colors">{site.location} (Remote Worldwide)</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="lg:col-span-8 relative"
            >
              <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant/50 shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {status.type === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8"
                      >
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 leading-tight">
                        Message Sent<br/>Successfully!
                      </h2>
                      <p className="text-secondary font-light text-lg mb-10 max-w-md">
                        {status.message}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStatus({ type: "", message: "" })}
                        className="border border-outline-variant text-primary px-4 md:px-8 py-3 rounded-full hover:border-primary transition-colors font-medium text-sm"
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                    >
                      {status.type === "error" && status.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl text-sm font-medium border bg-error-container text-on-error-container border-error/20"
                        >
                          {status.message}
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs uppercase tracking-wider text-secondary font-semibold">Name *</label>
                          <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            disabled={isSubmitting}
                            className="w-full bg-transparent border-b border-outline-variant focus:border-primary px-0 py-3 text-primary placeholder-secondary/50 focus:outline-none transition-colors font-light text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs uppercase tracking-wider text-secondary font-semibold">Email *</label>
                          <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isSubmitting}
                            className="w-full bg-transparent border-b border-outline-variant focus:border-primary px-0 py-3 text-primary placeholder-secondary/50 focus:outline-none transition-colors font-light text-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider text-secondary font-semibold">Project Type</label>
                          <CustomSelect
                            value={formData.projectType}
                            onChange={(val) => setFormData({ ...formData, projectType: val })}
                            disabled={isSubmitting}
                            placeholder="Select an option"
                            options={[
                              { value: "agentic-ai", label: "Agentic AI / Multi-Agent System" },
                              { value: "rag", label: "Enterprise / Hybrid RAG" },
                              { value: "ml-cv", label: "Machine Learning & Computer Vision" },
                              { value: "data-analytics", label: "Data Analysis & BI Dashboard" },
                              { value: "backend-api", label: "Backend API (FastAPI / Django)" },
                              { value: "full-time", label: "Full-Time Role / Collaboration" },
                            ]}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider text-secondary font-semibold">Engagement / Scope</label>
                          <CustomSelect
                            value={formData.budget}
                            onChange={(val) => setFormData({ ...formData, budget: val })}
                            disabled={isSubmitting}
                            placeholder="Select engagement scope"
                            options={[
                              { value: "full-time", label: "Full-Time Opportunity" },
                              { value: "rapid-mvp", label: "Rapid MVP / Prototype" },
                              { value: "production-ai", label: "Production AI System" },
                              { value: "consulting", label: "Consulting / Advisory" },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs uppercase tracking-wider text-secondary font-semibold">Message *</label>
                        <textarea
                          id="message"
                          placeholder="Tell me about your AI workflow, project, timeline, or role..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          disabled={isSubmitting}
                          className="w-full bg-transparent border-b border-outline-variant focus:border-primary px-0 py-3 text-primary placeholder-secondary/50 focus:outline-none transition-colors font-light text-lg resize-none"
                        />
                      </div>

                      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                        {turnstileSiteKey ? (
                          <Turnstile 
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setTurnstileToken(token)}
                            options={{ theme: "dark" }}
                          />
                        ) : (
                          <span className="text-xs text-secondary/70">Direct inquiry to {site.email}</span>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05, gap: "12px" }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
                          className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-4 md:px-8 py-4 rounded-full hover:bg-primary-container transition-all shadow-lg hover:shadow-xl duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
