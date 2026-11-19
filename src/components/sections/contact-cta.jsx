"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { site } from "@/lib/site"

export function ContactCTA() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-col md:items-start md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Contact</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: "'LED', sans-serif" }}>
              {site.contact.heading}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button asChild size="lg" className="text-base md:text-lg py-6 md:py-5 font-semibold rounded-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>

        <div className="space-y-4 md:space-y-5">
          {[
            { label: 'Mail', value: site.email },
            { label: 'Phone', value: site.phone },
            { label: 'Website', value: site.websiteLabel },
            { label: 'LinkedIn', value: `@${site.social.linkedinHandle}` },
            { label: 'GitHub', value: `@${site.social.githubHandle}` },
          ].map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              key={item.label}
              className="flex flex-col md:flex-row md:justify-between md:items-center py-4 md:py-5 border-b border-border px-3 -mx-3 rounded-lg"
            >
              <span className="text-sm md:text-base text-muted-foreground font-medium mb-2 md:mb-0">{item.label}</span>
              <span className="text-sm md:text-base font-semibold text-foreground">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
