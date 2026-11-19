"use client"

import { useEffect, useRef, useState } from "react"
import { motion, animate, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ExternalLink, RotateCcw, Terminal as TerminalIcon } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1]

const STATS = [
  { value: 8, suffix: "+", label: "AI & ML projects" },
  { value: 98, suffix: "%", label: "Peak ML accuracy" },
  { value: 4, suffix: "", label: "AI & data certifications" },
]

const TECH_STACK = [
  "Python",
  "LangChain",
  "MCP",
  "FastAPI",
  "PyTorch",
  "PostgreSQL + pgvector",
  "Pinecone",
  "Google Gemini",
  "XGBoost",
  "YOLOv8 / v11",
  "Scikit-learn",
  "Django",
  "Pandas",
  "Tableau",
  "Power BI",
  "Git",
]

/* ── Counter ─────────────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(reduceMotion ? to : 0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

/* ── Terminal with typewriter animation ──────────────── */
function Terminal() {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-60px" })
  const reduceMotion = useReducedMotion()

  const [step, setStep] = useState(reduceMotion ? 6 : 0)
  const [typed1, setTyped1] = useState(reduceMotion ? "python pipeline.py --mode hybrid-rag" : "")
  const [typed2, setTyped2] = useState(reduceMotion ? "git push origin main" : "")
  const [replay, setReplay] = useState(0)

  const cmd1 = "python pipeline.py --mode hybrid-rag"
  const cmd2 = "git push origin main"

  useEffect(() => {
    if (!inView && replay === 0) return
    if (reduceMotion) { setTyped1(cmd1); setTyped2(cmd2); setStep(6); return }

    let cancelled = false
    let timer
    setStep(1); setTyped1(""); setTyped2("")

    let i1 = 0
    const iv1 = setInterval(() => {
      if (cancelled) return
      i1++
      setTyped1(cmd1.slice(0, i1))
      if (i1 >= cmd1.length) {
        clearInterval(iv1)
        timer = setTimeout(() => {
          if (!cancelled) setStep(2)
          timer = setTimeout(() => {
            if (!cancelled) setStep(3)
            timer = setTimeout(() => {
              if (cancelled) return
              setStep(4)
              let i2 = 0
              const iv2 = setInterval(() => {
                if (cancelled) return
                i2++
                setTyped2(cmd2.slice(0, i2))
                if (i2 >= cmd2.length) {
                  clearInterval(iv2)
                  timer = setTimeout(() => {
                    if (!cancelled) setStep(5)
                    timer = setTimeout(() => { if (!cancelled) setStep(6) }, 400)
                  }, 350)
                }
              }, 38)
            }, 450)
          }, 450)
        }, 300)
      }
    }, 45)

    return () => { cancelled = true; clearInterval(iv1); clearTimeout(timer) }
  }, [inView, reduceMotion, replay])

  return (
    <div ref={containerRef} className="w-full rounded-2xl border border-white/10 bg-[#141414] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-white/30 flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3" /> enterprise-rag
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setReplay((c) => c + 1) }}
          aria-label="Replay"
          className="p-1 rounded text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-xs leading-6 space-y-1 select-none min-h-[168px]">
        <div className="flex gap-3">
          <span className="text-white/30 select-none">$</span>
          <span className="text-white/80">{typed1}</span>
          {step === 1 && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-1.5 h-3.5 bg-white/80 -ml-0.5 mt-0.5" />
          )}
        </div>

        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
            className="flex gap-3"><span className="w-[1ch] shrink-0" /><span className="text-white/40">Indexing dense + BM25 vectors (pgvector &amp; Pinecone)...</span></motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
            className="flex gap-3"><span className="w-[1ch] shrink-0" /><span className="text-emerald-400">Agent Planner ready (RRF + cross-encoder rerank)</span></motion.div>
        )}

        {step >= 4 && (
          <div className="flex gap-3 pt-1">
            <span className="text-white/30 select-none">$</span>
            <span className="text-white/80">{typed2}</span>
            {step === 4 && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-1.5 h-3.5 bg-white/80 -ml-0.5 mt-0.5" />
            )}
          </div>
        )}

        {step >= 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
            className="flex gap-3"><span className="w-[1ch] shrink-0" /><span className="text-white/40">Deploying portfolio to sanilmishra.me...</span></motion.div>
        )}

        {step >= 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className="flex gap-3 items-center">
            <span className="w-[1ch] shrink-0" />
            <span className="text-emerald-400">Live at</span>
            <a href="https://sanilmishra.me" target="_blank" rel="noopener noreferrer"
              className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors inline-flex items-center gap-1">
              sanilmishra.me <ExternalLink className="w-3 h-3 text-white/40" />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ── Step Node (the circle on the vertical line) ─────── */
function StepNode({ num, isActive }) {
  return (
    <div className="absolute left-0 top-1 z-10">
      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center font-mono text-xs font-semibold transition-all duration-500 ${
        isActive
          ? "border-white/60 bg-surface text-white"
          : "border-white/10 bg-surface text-white/30"
      }`}>
        {num}
      </div>
    </div>
  )
}

/* ── Main Export ──────────────────────────────────────── */
export function SmartInsights() {
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef(null)
  const [active, setActive] = useState("01")

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 80%"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Section Header (matches Hero / FeaturedProjects / Testimonials) ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase block mb-3">
            Capabilities &amp; Skills
          </span>
          <h2 className="font-light text-white leading-tight text-3xl md:text-[42px] font-serif">
            Everything you need to build intelligent AI systems
          </h2>
        </motion.div>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative">

          {/* Vertical track */}
          <div aria-hidden="true" className="absolute left-[19px] md:left-[21px] top-4 bottom-4 w-px bg-white/[0.08]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-[19px] md:left-[21px] top-4 bottom-4 w-px bg-white origin-top"
          />

          <div className="space-y-16 md:space-y-20">

            {/* ── Step 01 · End-to-End Engineering ───────────── */}
            <motion.div
              onViewportEnter={() => setActive("01")}
              viewport={{ amount: 0.4 }}
              className="relative pl-16 md:pl-20"
            >
              <StepNode num="01" isActive={active === "01"} />
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-white leading-tight tracking-tight mb-4">
                  End-to-end AI engineering
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-light max-w-lg">
                  I architect agentic workflows, hybrid RAG pipelines, computer vision models, and FastAPI backends — shipping working prototypes in days.
                </p>
              </motion.div>
            </motion.div>

            {/* ── Step 02 · Stats ────────────────────────────── */}
            <motion.div
              onViewportEnter={() => setActive("02")}
              viewport={{ amount: 0.4 }}
              className="relative pl-16 md:pl-20"
            >
              <StepNode num="02" isActive={active === "02"} />
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <dl className="grid grid-cols-3 gap-6 md:gap-10">
                  {STATS.map(({ value, suffix, label }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <dd className="text-3xl md:text-4xl font-light text-white">
                        <Counter to={value} suffix={suffix} />
                      </dd>
                      <dt className="text-xs text-white/40">{label}</dt>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </motion.div>

            {/* ── Step 03 · Tech Stack ───────────────────────── */}
            <motion.div
              onViewportEnter={() => setActive("03")}
              viewport={{ amount: 0.4 }}
              className="relative pl-16 md:pl-20"
            >
              <StepNode num="03" isActive={active === "03"} />
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {TECH_STACK.map((tech, idx) => (
                    <motion.li
                      key={tech}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.04, ease: EASE }}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/25 transition-colors cursor-default"
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* ── Step 04 · Terminal ─────────────────────────── */}
            <motion.div
              onViewportEnter={() => setActive("04")}
              viewport={{ amount: 0.3 }}
              className="relative pl-16 md:pl-20"
            >
              <StepNode num="04" isActive={active === "04"} />
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Terminal />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
