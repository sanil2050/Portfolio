"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(window.innerWidth > 768)
    }
    checkVisibility()
    window.addEventListener("resize", checkVisibility, { passive: true })
    return () => window.removeEventListener("resize", checkVisibility)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mx = -200
    let my = -200
    let rx = -200
    let ry = -200
    let dotScale = 1
    let raf = 0
    let activeTarget = null

    const updateDotTransform = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale})`
      label.style.transform = `translate3d(${mx + 12}px, ${my}px, 0) translateY(-50%)`
    }

    const animRing = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      if (Math.abs(mx - rx) > 0.25 || Math.abs(my - ry) > 0.25) {
        raf = requestAnimationFrame(animRing)
      } else {
        rx = mx
        ry = my
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
        raf = 0
      }
    }

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      updateDotTransform()
      if (!raf) raf = requestAnimationFrame(animRing)
    }

    const states = {
      default: () => {
        dotScale = 1
        dot.style.width = "12px"
        dot.style.height = "12px"
        dot.style.background = "#ffffff"
        dot.style.borderRadius = "50%"
        ring.style.width = "36px"
        ring.style.height = "36px"
        ring.style.borderColor = "rgba(255, 255, 255, 0.4)"
        ring.style.opacity = "1"
        ring.style.borderRadius = "50%"
        label.style.opacity = "0"
        updateDotTransform()
      },
      view: (el) => {
        dotScale = 1
        dot.style.width = "8px"
        dot.style.height = "8px"
        dot.style.background = "#ffffff"
        ring.style.width = "48px"
        ring.style.height = "48px"
        ring.style.borderColor = "rgba(255, 255, 255, 0.8)"
        ring.style.opacity = "1"
        label.style.opacity = "1"
        label.textContent = el.dataset.label || "View"
        label.style.background = "#ffffff"
        label.style.color = "#000000"
        updateDotTransform()
      },
      drag: () => {
        dotScale = 1
        dot.style.width = "4px"
        dot.style.height = "28px"
        dot.style.background = "#ffffff"
        dot.style.borderRadius = "2px"
        ring.style.width = "28px"
        ring.style.height = "4px"
        ring.style.borderColor = "rgba(255, 255, 255, 0.8)"
        ring.style.borderRadius = "2px"
        label.style.opacity = "0"
        updateDotTransform()
      },
      link: (el) => {
        dotScale = 1
        dot.style.width = "10px"
        dot.style.height = "10px"
        dot.style.background = "#ffffff"
        ring.style.width = "52px"
        ring.style.height = "52px"
        ring.style.borderColor = "rgba(255, 255, 255, 0.8)"
        ring.style.opacity = "0.8"
        label.style.opacity = "1"
        label.style.background = "#ffffff"
        label.style.color = "#000000"
        label.textContent = el.dataset.label || "→"
        updateDotTransform()
      },
      delete: (el) => {
        dotScale = 1
        dot.style.width = "14px"
        dot.style.height = "14px"
        dot.style.background = "#ef4444"
        ring.style.width = "40px"
        ring.style.height = "40px"
        ring.style.borderColor = "#ef4444"
        ring.style.opacity = "1"
        label.style.opacity = "1"
        label.style.background = "#b91c1c"
        label.style.color = "#ffffff"
        label.textContent = el.dataset.label || "Delete"
        updateDotTransform()
      },
      hidden: () => {
        dot.style.width = "0"
        dot.style.height = "0"
        ring.style.opacity = "0"
        label.style.opacity = "0"
      },
    }

    // Event delegation avoids MutationObserver + querySelectorAll listener thrashing
    const onMouseOver = (e) => {
      const target = e.target?.closest?.("[data-cursor], a, button")
      if (target === activeTarget) return
      activeTarget = target
      if (!target) {
        states.default()
        return
      }
      if (target.dataset.cursor) {
        const fn = states[target.dataset.cursor] || states.default
        fn(target)
      } else {
        dotScale = 1.5
        ring.style.width = "48px"
        ring.style.height = "48px"
        ring.style.borderColor = "rgba(255, 255, 255, 0.4)"
        ring.style.opacity = "0.5"
        updateDotTransform()
      }
    }

    const handleDocMouseLeave = () => {
      activeTarget = null
      states.hidden()
    }
    const handleDocMouseEnter = () => states.default()

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseover", onMouseOver, { passive: true })
    document.addEventListener("mouseleave", handleDocMouseLeave)
    document.addEventListener("mouseenter", handleDocMouseEnter)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseleave", handleDocMouseLeave)
      document.removeEventListener("mouseenter", handleDocMouseEnter)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isVisible, pathname])

  if (!isVisible) return null

  return (
    <>
      <div
        id="cursor-dot"
        ref={dotRef}
        className="fixed top-0 left-0 w-[12px] h-[12px] bg-[#ffffff] rounded-full pointer-events-none z-[9999] transition-[width,height,background,border-radius] duration-200 origin-center will-change-transform"
        style={{ transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%) scale(1)" }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border-[1.5px] border-white/40 rounded-full pointer-events-none z-[9998] transition-[width,height,border-color,border-radius,opacity] duration-150 origin-center will-change-transform"
        style={{ transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)" }}
      />
      <div
        id="cursor-label"
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] text-[12px] font-medium text-black bg-white px-2 py-[3px] rounded-full opacity-0 transition-opacity duration-150 whitespace-nowrap will-change-transform"
        style={{ transform: "translate3d(-200px, -200px, 0) translateY(-50%)" }}
      />
    </>
  )
}
