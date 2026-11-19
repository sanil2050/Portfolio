"use client"

import React, { useState, useEffect, useRef, useId, useCallback } from "react"

const HERO_THEME = {
  text: "#f5f4f0",
  muted: "rgba(245, 244, 240, 0.72)",
  accent: "#ea580c",
  accentSoft: "#fed7aa",
  accentGlow: "rgba(234, 88, 12, 0.42)",
  capsuleBg: "linear-gradient(145deg, #242321 0%, #10100f 100%)",
  capsuleBorder: "rgba(255, 255, 255, 0.2)",
}

const MORPH_WORDS = ["autonomous", "adaptive", "agentic"]

/* -------------------------------------------------------------------------- */
/*  Interactive Magnetic Word (zero React re-renders; ref-driven rAF physics) */
/* -------------------------------------------------------------------------- */
function MagneticWord({
  text,
  wordKey,
  baseDelay,
  color,
  registerLetter,
  specialIndex,
  renderSpecial,
}) {
  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      {text.split("").map((char, idx) => {
        if (specialIndex === idx && renderSpecial) {
          return (
            <span
              key={idx}
              className="kinetic-mask inline-flex items-baseline"
              style={{ animationDelay: `${baseDelay + idx * 24}ms` }}
            >
              {renderSpecial()}
            </span>
          )
        }

        const key = `${wordKey}-${idx}`
        return (
          <span
            key={idx}
            className="inline-block overflow-hidden align-baseline py-[0.12em] -my-[0.12em]"
          >
            <span
              className="kinetic-char inline-block"
              style={{
                animationDelay: `${baseDelay + idx * 22}ms`,
              }}
            >
              <span
                ref={(node) => registerLetter(key, node, color)}
                className="inline-block will-change-transform"
                style={{
                  color,
                  transition: "color 180ms ease",
                }}
              >
                {char}
              </span>
            </span>
          </span>
        )
      })}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sculptural Glyph 1: Levitating Plasma-Jewel "i" (in "Sanil")              */
/* -------------------------------------------------------------------------- */
function LivingLetterI({ theme, anchorRef, orbRef }) {
  const uid = useId().replace(/:/g, "")

  return (
    <span
      ref={anchorRef}
      className="relative inline-flex flex-col items-center justify-end align-baseline mx-[0.02em]"
      style={{ width: "0.3em" }}
      aria-label="i"
    >
      <span
        ref={orbRef}
        className="absolute -top-[0.04em] left-1/2 pointer-events-none will-change-transform"
        style={{
          transform: "translate3d(-50%, 0px, 0)",
        }}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-[0.27em] h-[0.27em] overflow-visible jewel-float"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`orb-${uid}`} cx="32%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="32%" stopColor={theme.accentSoft} />
              <stop offset="72%" stopColor={theme.accent} />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
            <radialGradient id={`orbglow-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.accent} stopOpacity="0.45" />
              <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="23" r="17" fill={`url(#orbglow-${uid})`} />
          <ellipse
            cx="20"
            cy="20"
            rx="17"
            ry="6.5"
            fill="none"
            stroke={theme.accent}
            strokeOpacity="0.65"
            strokeWidth="1.5"
            className="jewel-ring"
            style={{ transformOrigin: "20px 20px" }}
          />
          <circle cx="20" cy="20" r="10.5" fill={`url(#orb-${uid})`} />
          <ellipse
            cx="16"
            cy="15.5"
            rx="3.2"
            ry="2"
            transform="rotate(-28 16 15.5)"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      </span>
      <span className="inline-block leading-none">ı</span>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sculptural Glyph 2: 3D Tactile "AI Engineer" Monolith Capsule             */
/* -------------------------------------------------------------------------- */
function SculpturalAIMonolith({ theme, capsuleRef, sheenRef, hoveredRef }) {
  return (
    <span
      ref={capsuleRef}
      onMouseEnter={() => {
        hoveredRef.current = true
        if (capsuleRef.current) {
          capsuleRef.current.style.boxShadow = `0 18px 38px -10px rgba(0,0,0,0.6), 0 0 26px -4px ${theme.accentGlow}, inset 0 1px 1px rgba(255,255,255,0.28)`
        }
      }}
      onMouseLeave={() => {
        hoveredRef.current = false
        if (capsuleRef.current) {
          capsuleRef.current.style.boxShadow =
            "0 12px 26px -10px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.18)"
        }
      }}
      className="relative inline-flex items-center align-middle px-[0.34em] py-[0.09em] rounded-[0.24em] select-none cursor-pointer whitespace-nowrap will-change-transform"
      style={{
        background: theme.capsuleBg,
        border: `1px solid ${theme.capsuleBorder}`,
        color: "#fafafa",
        transform: "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(-0.04em) scale(1)",
        transition: "box-shadow 250ms ease",
        boxShadow:
          "0 12px 26px -10px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.18)",
      }}
    >
      <span
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[0.24em] opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 62%)",
        }}
      />
      <span className="relative z-10 tracking-[-0.04em] leading-none font-black">
        AI Engineer
      </span>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sculptural Glyph 3: Kinetic Slot-Morph Word ("agentic")                   */
/* -------------------------------------------------------------------------- */
function MorphingAgenticWord({ theme }) {
  const [step, setStep] = useState(0)
  const [activeWidth, setActiveWidth] = useState(undefined)
  const wordRefs = useRef([])

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((prev) => (prev + 1) % MORPH_WORDS.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const measure = () => {
      const el = wordRefs.current[step]
      if (el) {
        setActiveWidth(el.offsetWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [step])

  return (
    <button
      type="button"
      onClick={() => setStep((prev) => (prev + 1) % MORPH_WORDS.length)}
      title="Click to switch word"
      className="relative inline-flex flex-col items-start align-baseline cursor-pointer group focus:outline-none"
    >
      <span
        className="relative inline-block overflow-hidden h-[1.16em] leading-[1.12]"
        style={{
          width: activeWidth ? `${activeWidth}px` : "auto",
          transition: "width 550ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span
          className="flex flex-col items-start transition-transform duration-700 will-change-transform"
          style={{
            transform: `translate3d(0, -${step * 33.3333}%, 0)`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {MORPH_WORDS.map((word, idx) => (
            <span
              key={word}
              ref={(node) => {
                wordRefs.current[idx] = node
              }}
              className="inline-block w-max h-[1.16em] font-black tracking-[-0.04em]"
              style={{
                backgroundImage: `linear-gradient(120deg, ${theme.accent} 0%, #fb923c 50%, ${theme.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {word}
            </span>
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="block h-[0.07em] rounded-full transition-all duration-500 origin-left"
        style={{
          width: activeWidth ? `${activeWidth}px` : "100%",
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSoft})`,
          boxShadow: `0 0 12px ${theme.accentGlow}`,
          marginTop: "-0.06em",
        }}
      />
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  SanilKineticHero (Zero-rerender ref-driven rAF + cached geometry)         */
/* -------------------------------------------------------------------------- */
export function SanilKineticHero() {
  const lettersMapRef = useRef(new Map())
  const metricsDirtyRef = useRef(true)
  const letterMetricsRef = useRef([])
  const jewelAnchorRef = useRef(null)
  const jewelOrbRef = useRef(null)
  const jewelRectRef = useRef(null)
  const capsuleRef = useRef(null)
  const sheenRef = useRef(null)
  const capsuleRectRef = useRef(null)
  const capsuleHoveredRef = useRef(false)

  const targetPtrRef = useRef({ x: 0, y: 0, active: false })
  const smoothPtrRef = useRef({ x: 0, y: 0 })
  const rafIdRef = useRef(0)

  const registerLetter = useCallback((key, node, baseColor) => {
    if (node) {
      lettersMapRef.current.set(key, {
        node,
        baseColor,
        lift: 0,
        tilt: 0,
        accented: false,
      })
      metricsDirtyRef.current = true
    } else {
      lettersMapRef.current.delete(key)
    }
  }, [])

  const measureGeometry = useCallback(() => {
    const list = []
    lettersMapRef.current.forEach((entry) => {
      const r = entry.node.getBoundingClientRect()
      list.push({
        entry,
        cx: r.left + r.width / 2,
        cy: r.top + r.height / 2,
      })
    })
    letterMetricsRef.current = list

    if (jewelAnchorRef.current) {
      const r = jewelAnchorRef.current.getBoundingClientRect()
      jewelRectRef.current = {
        cx: r.left + r.width / 2,
        cy: r.top + r.height * 0.2,
      }
    }
    if (capsuleRef.current) {
      const r = capsuleRef.current.getBoundingClientRect()
      capsuleRectRef.current = {
        cx: r.left + r.width / 2,
        cy: r.top + r.height / 2,
        w: r.width,
        h: r.height,
      }
    }
    metricsDirtyRef.current = false
  }, [])

  useEffect(() => {
    const markDirty = () => {
      metricsDirtyRef.current = true
    }
    window.addEventListener("resize", markDirty, { passive: true })
    window.addEventListener("scroll", markDirty, { passive: true })
    return () => {
      window.removeEventListener("resize", markDirty)
      window.removeEventListener("scroll", markDirty)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  const runLoop = useCallback(() => {
    if (rafIdRef.current) return

    const tick = () => {
      if (metricsDirtyRef.current) {
        measureGeometry()
      }

      const target = targetPtrRef.current
      const smooth = smoothPtrRef.current
      smooth.x += (target.x - smooth.x) * 0.2
      smooth.y += (target.y - smooth.y) * 0.2

      let stillMoving = target.active
      const px = smooth.x
      const py = smooth.y
      const radius = 140

      // 1. Update magnetic letters directly in DOM
      const metrics = letterMetricsRef.current
      for (let i = 0; i < metrics.length; i++) {
        const { entry, cx, cy } = metrics[i]
        let targetLift = 0
        let targetTilt = 0
        let glowMix = 0

        if (target.active) {
          const dx = px - cx
          const dy = py - cy
          const dist = Math.hypot(dx, dy)
          if (dist < radius) {
            const strength = Math.pow(1 - dist / radius, 2)
            targetLift = -strength * 10
            targetTilt = (dx / radius) * strength * 9
            glowMix = strength
          }
        }

        entry.lift += (targetLift - entry.lift) * 0.22
        entry.tilt += (targetTilt - entry.tilt) * 0.22

        if (Math.abs(entry.lift) > 0.04 || Math.abs(entry.tilt) > 0.04) {
          entry.node.style.transform = `translate3d(0, ${entry.lift.toFixed(2)}px, 0) rotate(${entry.tilt.toFixed(2)}deg)`
          stillMoving = true
        } else if (entry.lift !== 0 || entry.tilt !== 0) {
          entry.lift = 0
          entry.tilt = 0
          entry.node.style.transform = "translate3d(0, 0px, 0) rotate(0deg)"
        }

        const shouldAccent = glowMix > 0.55
        if (shouldAccent !== entry.accented) {
          entry.accented = shouldAccent
          entry.node.style.color = shouldAccent ? HERO_THEME.accent : entry.baseColor
        }
      }

      // 2. Update LivingLetterI floating plasma jewel
      if (jewelOrbRef.current && jewelRectRef.current) {
        let ox = 0
        let oy = 0
        if (target.active) {
          const dx = px - jewelRectRef.current.cx
          const dy = py - jewelRectRef.current.cy
          const dist = Math.hypot(dx, dy)
          if (dist < 220 && dist > 0) {
            const pull = (1 - dist / 220) * 5
            ox = (dx / dist) * pull
            oy = (dy / dist) * pull
          }
        }
        jewelOrbRef.current.style.transform = `translate3d(calc(-50% + ${ox.toFixed(1)}px), ${oy.toFixed(1)}px, 0)`
      }

      // 3. Update SculpturalAIMonolith 3D tilt & sheen
      if (capsuleRef.current && capsuleRectRef.current) {
        let rotX = 0
        let rotY = 0
        let shineX = 30
        let shineY = 25
        if (target.active) {
          const r = capsuleRectRef.current
          const nx = (px - r.cx) / (r.w * 1.1)
          const ny = (py - r.cy) / (r.h * 1.4)
          const clampedX = Math.max(-1, Math.min(1, nx))
          const clampedY = Math.max(-1, Math.min(1, ny))
          rotY = clampedX * 12
          rotX = -clampedY * 12
          shineX = 50 + clampedX * 35
          shineY = 50 + clampedY * 35
        }
        const scale = capsuleHoveredRef.current ? 1.03 : 1
        capsuleRef.current.style.transform = `perspective(700px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateY(-0.04em) scale(${scale})`
        if (sheenRef.current) {
          sheenRef.current.style.background = `radial-gradient(circle at ${shineX.toFixed(1)}% ${shineY.toFixed(1)}%, rgba(255,255,255,0.22), transparent 62%)`
        }
      }

      if (
        stillMoving ||
        Math.abs(target.x - smooth.x) > 0.25 ||
        Math.abs(target.y - smooth.y) > 0.25
      ) {
        rafIdRef.current = window.requestAnimationFrame(tick)
      } else {
        rafIdRef.current = 0
      }
    }

    rafIdRef.current = window.requestAnimationFrame(tick)
  }, [measureGeometry])

  const handlePointerEnter = useCallback(
    (e) => {
      metricsDirtyRef.current = true
      smoothPtrRef.current = { x: e.clientX, y: e.clientY }
      targetPtrRef.current = { x: e.clientX, y: e.clientY, active: true }
      runLoop()
    },
    [runLoop]
  )

  const handlePointerMove = useCallback(
    (e) => {
      targetPtrRef.current = { x: e.clientX, y: e.clientY, active: true }
      runLoop()
    },
    [runLoop]
  )

  const handlePointerLeave = useCallback(() => {
    targetPtrRef.current = { ...targetPtrRef.current, active: false }
    runLoop()
  }, [runLoop])

  const theme = HERO_THEME

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[1140px] mx-auto py-4"
      style={{ color: theme.text }}
    >
      <h1
        className="font-black tracking-[-0.045em] leading-[1.12] select-none"
        style={{
          fontSize: "clamp(0.95rem, 3.5vw, 3rem)",
          textShadow: "0 4px 18px rgba(0,0,0,0.45)",
        }}
      >
        {/* Line 1: Hi, I'm Sanil Mishra */}
        <span className="flex flex-nowrap items-baseline justify-center whitespace-nowrap gap-x-[0.24em]">
          <MagneticWord
            text="Hi,"
            wordKey="hi"
            baseDelay={40}
            color={theme.text}
            registerLetter={registerLetter}
          />
          <MagneticWord
            text="I'm"
            wordKey="im"
            baseDelay={110}
            color={theme.text}
            registerLetter={registerLetter}
          />
          <MagneticWord
            text="Sanil"
            wordKey="sanil"
            baseDelay={180}
            color={theme.text}
            registerLetter={registerLetter}
            specialIndex={3}
            renderSpecial={() => (
              <LivingLetterI
                theme={theme}
                anchorRef={jewelAnchorRef}
                orbRef={jewelOrbRef}
              />
            )}
          />
          <MagneticWord
            text="Mishra"
            wordKey="mishra"
            baseDelay={280}
            color={theme.text}
            registerLetter={registerLetter}
          />
        </span>

        {/* Line 2: [AI Engineer] building agentic systems. */}
        <span className="flex flex-nowrap items-baseline justify-center whitespace-nowrap gap-x-[0.22em] mt-[0.2em]">
          <span
            className="kinetic-mask inline-flex items-center"
            style={{ animationDelay: "380ms" }}
          >
            <SculpturalAIMonolith
              theme={theme}
              capsuleRef={capsuleRef}
              sheenRef={sheenRef}
              hoveredRef={capsuleHoveredRef}
            />
          </span>

          <MagneticWord
            text="building"
            wordKey="building"
            baseDelay={620}
            color={theme.muted}
            registerLetter={registerLetter}
          />

          <span
            className="kinetic-mask inline-flex items-baseline"
            style={{ animationDelay: "720ms" }}
          >
            <MorphingAgenticWord theme={theme} />
          </span>

          <span className="inline-flex items-baseline whitespace-nowrap">
            <MagneticWord
              text="systems"
              wordKey="systems"
              baseDelay={800}
              color={theme.text}
              registerLetter={registerLetter}
            />
            <span
              className="kinetic-mask inline-flex items-center ml-[0.06em]"
              style={{ animationDelay: "920ms" }}
              aria-label="period"
            >
              <span
                className="terminal-dot inline-block rounded-full"
                style={{
                  width: "0.2em",
                  height: "0.2em",
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 16px ${theme.accentGlow}`,
                }}
              />
            </span>
          </span>
        </span>
      </h1>
    </div>
  )
}
