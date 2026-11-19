"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowUp } from "lucide-react"
import { site } from "@/lib/site"

const EASE_OUT = [0.16, 1, 0.3, 1]

const COLUMNS = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/", external: false },
      { label: "About", href: "/about", external: false },
      { label: "Projects", href: "/projects", external: false },
      { label: "Services", href: "/services", external: false },
      { label: "Contact", href: "/contact", external: false },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: site.social.github, external: true },
      { label: "LinkedIn", href: site.social.linkedin, external: true },
      { label: "Website", href: site.website, external: true },
      { label: "Resume", href: site.resumeUrl, external: true },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Case Studies", href: "/projects", external: false },
      { label: "Services", href: "/services", external: false },
      { label: "Hire Me", href: `mailto:${site.email}`, external: true },
      { label: "Start a Project", href: "/contact", external: false },
    ],
  },
]

/* Framer Motion variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
}

export function Footer() {
  const containerRef = useRef(null)
  const markRef = useRef(null)
  const textRef = useRef(null)

  /* Scroll-driven parallax using Framer Motion */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  })

  // Subtle parallax lift for the panel and watermark
  const panelY = useTransform(smoothProgress, [0, 1], [60, 0])
  const markParallax = useTransform(smoothProgress, [0, 1], [40, 0])
  const lightOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.6, 1])

  /* Scale the wordmark so it always spans the full footer width without horizontal overflow */
  useEffect(() => {
    const box = markRef.current
    const text = textRef.current
    if (!box || !text) return

    const fit = () => {
      text.style.fontSize = "100px"
      const natural = text.getBoundingClientRect().width
      if (!natural) return
      text.style.fontSize = `${(100 * box.clientWidth) / natural}px`
    }

    fit()
    document.fonts?.ready.then(fit)

    const ro = new ResizeObserver(fit)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={containerRef} className="footer-wrap" aria-label={`${site.name} footer`}>
      {/* ── CareMetric-style Rounded Panel with Motion ─────────────────── */}
      <motion.div
        style={{ y: panelY }}
        className="footer-panel"
        initial={{ y: 90, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      >
        {/* Subtle animated top border highlight beam */}
        <motion.div
          style={{ opacity: lightOpacity }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10"
        />

        <motion.div
          className="footer-stage"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Brand — top-left ───────────────────── */}
          <motion.div variants={itemFade} className="footer-brand">
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <span className="footer-brand__name">{site.name}</span>
              <span className="footer-brand__role">{site.role}</span>
            </motion.div>
          </motion.div>

          {/* ── Giant email CTA with magnetic hover ─────────────────────── */}
          <motion.div variants={itemFade} className="footer-cta-block">
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
              />
              <span id="contact" className="footer-cta__eyebrow !mb-0">
                Get in touch
              </span>
            </div>

            <motion.a
              href={`mailto:${site.email}`}
              className="footer-cta__email group"
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span>{site.email}</span>
              <motion.span
                className="footer-cta__arrow"
                whileHover={{ x: 3, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-full h-full" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* ── Nav columns — top-right with staggered links ─────────────── */}
          <nav className="footer-cols" aria-label="Footer navigation">
            {COLUMNS.map((col) => (
              <motion.div key={col.title} variants={itemFade} className="footer-col">
                <h2 className="footer-col__heading">{col.title}</h2>
                <ul className="footer-col__list">
                  {col.links.map((link) => (
                    <motion.li
                      key={link.label}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      {link.external ? (
                        <a
                          className="footer-col__link group"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-60 group-hover:translate-x-0 group-hover:translate-y-0 transition-all inline-block ml-0.5" />
                        </a>
                      ) : (
                        <Link className="footer-col__link" href={link.href}>
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>

          {/* ── Copyright & Back to Top — bottom-left ─────────────── */}
          <motion.div variants={itemFade} className="footer-copy flex items-center gap-6">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="hidden sm:inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors cursor-pointer text-xs"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </motion.button>
          </motion.div>

          {/* ── Giant wordmark, auto-fit to full width with Motion Parallax ─ */}
          <div className="footer-mark" aria-hidden ref={markRef}>
            <motion.span
              ref={textRef}
              style={{ y: markParallax }}
              className="footer-mark__text"
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE_OUT, delay: 0.4 }}
              whileHover={{ opacity: 0.15 }}
            >
              Sanil&nbsp;Mishra
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
