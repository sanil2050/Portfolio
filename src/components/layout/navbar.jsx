"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { site } from "@/lib/site"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface/95 border-b border-outline-variant w-full sticky top-0 z-50"
    >
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-[1200px] mx-auto">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          {site.name}
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === item.href ? "text-primary" : "text-secondary hover:text-primary"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            Resume
          </a>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary text-sm font-semibold px-5 py-2 rounded-full hover:bg-primary-container transition-colors"
            >
              Let's Talk
            </motion.button>
          </Link>
        </div>
        <button
          className="md:hidden p-2 text-primary z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-outline-variant shadow-lg"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    pathname === item.href ? "text-primary" : "text-secondary"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-[1px] w-full bg-outline-variant/50 my-2"></div>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium text-secondary"
              >
                Resume
              </a>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-primary text-on-primary text-lg font-semibold py-3 rounded-full hover:bg-primary-container transition-colors mt-2">
                  Let's Talk
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
