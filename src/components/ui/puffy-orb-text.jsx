"use client"

import React, { useEffect, useId, useRef, useState } from "react"

export function PuffyOrbText({
  text = "Portfolio",
  letterToReplace = "o",
  colors = ["#ff1fc8", "#4d6bff", "#2ce6ff", "#8b5cf6"],
  style,
  className,
}) {
  const rawId = useId()
  const id = "puff" + rawId.replace(/[^a-zA-Z0-9]/g, "")
  const ref = useRef(null)
  const [u, setU] = useState(72)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs && Number.isFinite(fs)) {
        const clamped = Math.min(72, Math.max(36, fs))
        setU((prev) => (Math.abs(prev - clamped) > 2 ? clamped : prev))
      }
    }
    update()
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const index = text.toLowerCase().indexOf(letterToReplace.toLowerCase())
  const before = index === -1 ? text : text.slice(0, index)
  const after = index === -1 ? "" : text.slice(index + 1)
  const [c1, c2, c3, c4] = colors

  const puffyStyle = {
    filter: `url(#${id})`,
    textShadow: "0 0.055em 0.07em rgba(0, 0, 0, 0.5)",
  }

  const orbVars = {
    "--c1": c1,
    "--c2": c2,
    "--c3": c3,
    "--c4": c4,
  }

  return (
    <span
      ref={ref}
      role="text"
      aria-label={text}
      className={className ? `pbt-wrap ${className}` : "pbt-wrap"}
      style={style}
    >
      {/* Lightweight single-blur pillow heightmap for matte-clay 3D inflated lettering */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter
            id={id}
            x="-8%"
            y="-16%"
            width="116%"
            height="132%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation={u * 0.042} result="dome" />

            <feDiffuseLighting
              in="dome"
              surfaceScale={u * 0.08}
              diffuseConstant="1.1"
              lightingColor="#fffbf5"
              result="keyLight"
            >
              <feDistantLight azimuth="250" elevation="58" />
            </feDiffuseLighting>

            <feFlood floodColor="#d6cdc2" floodOpacity="0.46" result="ambientFill" />
            <feComposite
              in="keyLight"
              in2="ambientFill"
              operator="arithmetic"
              k1="0"
              k2="0.78"
              k3="0.54"
              k4="0"
              result="clayBody"
            />
            <feComposite in="clayBody" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>

      {before && (
        <span aria-hidden="true" className="pbt-letters" style={puffyStyle}>
          {before}
        </span>
      )}

      {index !== -1 && (
        <span aria-hidden="true" className="pbt-orb" style={orbVars}>
          <span className="pbt-bob">
            <span className="pbt-scale">
              <span className="pbt-sphere">
                <span
                  className="pbt-blob pbt-blob-3"
                  style={{ "--d": "11s", "--r": "0.14em", "--delay": "-2s" }}
                />
                <span
                  className="pbt-blob pbt-blob-1"
                  style={{ "--d": "7.5s", "--r": "0.18em", "--delay": "-4.2s" }}
                />
                <span
                  className="pbt-blob pbt-blob-2"
                  style={{ "--d": "9.2s", "--r": "0.19em", "--delay": "-1.1s" }}
                />
                <span
                  className="pbt-blob pbt-blob-4"
                  style={{ "--d": "13s", "--r": "0.15em", "--delay": "-6.5s" }}
                />
              </span>

              <span className="pbt-glass" />

              {/* Curved spherical studio window reflections (gradient-feathered, zero SVG blur) */}
              <svg viewBox="0 0 100 100" className="pbt-reflections" aria-hidden="true">
                <defs>
                  <linearGradient id={`${id}-toparc`} x1="15%" y1="5%" x2="72%" y2="55%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
                    <stop offset="45%" stopColor="#e8f7ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id={`${id}-botrim`} x1="25%" y1="95%" x2="88%" y2="62%">
                    <stop offset="0%" stopColor="#ffd6f6" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#d8fbff" stopOpacity="0.68" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 16 44 C 15 20, 34 8, 59 10 C 72 11, 82 19, 80 28 C 77 37, 63 36, 48 39 C 33 42, 24 53, 18 52 C 16 51, 16 48, 16 44 Z"
                  fill={`url(#${id}-toparc)`}
                />

                <path
                  d="M 22 25 A 39 39 0 0 1 73 20"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.72"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <path
                  d="M 28 87 A 42 42 0 0 0 88 58"
                  fill="none"
                  stroke={`url(#${id}-botrim)`}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </span>
      )}

      {after && (
        <span aria-hidden="true" className="pbt-letters" style={puffyStyle}>
          {after}
        </span>
      )}
    </span>
  )
}
