"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export type GlitchMode = "slices" | "rgb" | "scan" | "noise";
export type GlitchTrigger = "always" | "hover" | "click";

export interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  mode?: GlitchMode;
  trigger?: GlitchTrigger;
  speed?: number;
  intensity?: number;
  burstDuration?: number;
  offset?: number;
  skew?: number;
  flicker?: boolean;
  fontWeight?: number | string;
  enableShadows?: boolean;
  shadowColors?: [string, string];
  className?: string;
  style?: React.CSSProperties;
}

const NOISE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  mode = "slices",
  trigger = "always",
  speed = 1,
  intensity = 0.5,
  burstDuration = 0.6,
  offset = 10,
  skew = 0,
  flicker = false,
  fontWeight = 900,
  enableShadows = true,
  shadowColors = ["#ff0000", "#00ffff"],
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}) => {
  const [isActive, setIsActive] = useState(trigger === "always");
  const [displayText, setDisplayText] = useState<string>(
    typeof children === "string" ? children : ""
  );

  const rawText = typeof children === "string" ? children : String(children ?? "");

  // Update text if child changes
  useEffect(() => {
    setDisplayText(rawText);
  }, [rawText]);

  // Noise mode glyph scrambling
  useEffect(() => {
    if (mode !== "noise" || !isActive) {
      setDisplayText(rawText);
      return;
    }

    let intervalId: any = null;
    let iteration = 0;
    const maxIterations = Math.max(rawText.length * 2, 8);

    intervalId = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration / 2) return rawText[idx] || char;
            return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > maxIterations) {
        setDisplayText(rawText);
        if (trigger !== "always") {
          setIsActive(false);
          clearInterval(intervalId);
        } else {
          iteration = 0;
        }
      }
    }, (60 / speed) * (1.1 - intensity * 0.5));

    return () => clearInterval(intervalId);
  }, [mode, isActive, rawText, speed, intensity, trigger]);

  // Burst trigger handling
  const triggerBurst = useCallback(() => {
    setIsActive(true);
    const timer = setTimeout(() => {
      if (trigger !== "always") {
        setIsActive(false);
      }
    }, burstDuration * 1000);
    return () => clearTimeout(timer);
  }, [burstDuration, trigger]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (trigger === "hover") setIsActive(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (trigger === "hover") setIsActive(false);
    onMouseLeave?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (trigger === "click") triggerBurst();
    onClick?.(e);
  };

  const calculatedOffset = offset * intensity;
  const shadow1 = enableShadows ? shadowColors[0] : "transparent";
  const shadow2 = enableShadows ? shadowColors[1] : "transparent";
  const animDuration = `${Math.max(0.4, 2 / speed)}s`;

  return (
    <>
      <style>{`
        @keyframes glitch-slices-1 {
          0% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          12% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          13% { clip-path: inset(18% 0 58% 0); transform: translate(calc(var(--g-offset) * -1), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s1); }
          17% { clip-path: inset(62% 0 12% 0); transform: translate(calc(var(--g-offset) * 0.8), 0) skewX(var(--g-skew)); text-shadow: 2px 0 var(--g-s2); }
          21% { clip-path: inset(38% 0 42% 0); transform: translate(calc(var(--g-offset) * -0.5), 0) skewX(0); text-shadow: -2px 0 var(--g-s1); }
          25% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          52% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          53% { clip-path: inset(12% 0 74% 0); transform: translate(calc(var(--g-offset) * 1.1), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s1); }
          57% { clip-path: inset(78% 0 6% 0); transform: translate(calc(var(--g-offset) * -0.9), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s2); }
          61% { clip-path: inset(30% 0 38% 0); transform: translate(calc(var(--g-offset) * 0.6), 0) skewX(0); text-shadow: 2px 0 var(--g-s1); }
          66% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          82% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          83% { clip-path: inset(48% 0 24% 0); transform: translate(calc(var(--g-offset) * -1.2), 0) skewX(var(--g-skew)); text-shadow: -4px 0 var(--g-s1); }
          87% { clip-path: inset(16% 0 64% 0); transform: translate(calc(var(--g-offset) * 0.7), 0) skewX(var(--g-skew)); text-shadow: 2px 0 var(--g-s2); }
          91% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
        }

        @keyframes glitch-slices-2 {
          0% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          14% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          15% { clip-path: inset(68% 0 14% 0); transform: translate(calc(var(--g-offset) * 1), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s2); }
          19% { clip-path: inset(14% 0 68% 0); transform: translate(calc(var(--g-offset) * -0.8), 0) skewX(var(--g-skew)); text-shadow: -2px 0 var(--g-s1); }
          23% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          55% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          56% { clip-path: inset(42% 0 36% 0); transform: translate(calc(var(--g-offset) * -1.2), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s2); }
          60% { clip-path: inset(22% 0 62% 0); transform: translate(calc(var(--g-offset) * 0.9), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s1); }
          64% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          85% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          86% { clip-path: inset(82% 0 6% 0); transform: translate(calc(var(--g-offset) * 1.1), 0) skewX(var(--g-skew)); text-shadow: 4px 0 var(--g-s2); }
          90% { clip-path: inset(6% 0 78% 0); transform: translate(calc(var(--g-offset) * -0.7), 0) skewX(var(--g-skew)); text-shadow: -2px 0 var(--g-s1); }
          94% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
          100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
        }

        @keyframes glitch-flicker {
          0%, 100% { opacity: 1; }
          41% { opacity: 1; }
          42% { opacity: 0.4; }
          43% { opacity: 1; }
          78% { opacity: 1; }
          79% { opacity: 0.35; }
          80% { opacity: 1; }
        }

        @keyframes glitch-scan {
          0% { clip-path: inset(0 0 95% 0); transform: translate(calc(var(--g-offset) * -0.5), 0); }
          50% { clip-path: inset(45% 0 45% 0); transform: translate(calc(var(--g-offset) * 0.5), 0); }
          100% { clip-path: inset(95% 0 0 0); transform: translate(calc(var(--g-offset) * -0.5), 0); }
        }
      `}</style>

      <span
        className={cn(
          "relative inline-block select-none overflow-visible",
          flicker && isActive && "animate-[glitch-flicker_1.8s_infinite]",
          className
        )}
        style={
          {
            fontWeight,
            "--g-offset": `${calculatedOffset}px`,
            "--g-skew": `${skew}deg`,
            "--g-s1": shadow1,
            "--g-s2": shadow2,
            ...style,
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Base Solid Text */}
        <span className="relative z-10 inline-block">{displayText}</span>

        {/* Slice 1 Layer */}
        {isActive && (mode === "slices" || mode === "rgb") && (
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none select-none"
            style={{
              animation: `glitch-slices-1 ${animDuration} infinite ease-in-out`,
            }}
          >
            {displayText}
          </span>
        )}

        {/* Slice 2 Layer */}
        {isActive && (mode === "slices" || mode === "rgb") && (
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none select-none"
            style={{
              animation: `glitch-slices-2 ${animDuration} infinite ease-in-out`,
            }}
          >
            {displayText}
          </span>
        )}

        {/* Scan Mode Layer */}
        {isActive && mode === "scan" && (
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none select-none text-red-500 opacity-80"
            style={{
              animation: `glitch-scan ${animDuration} infinite linear`,
              textShadow: `2px 0 ${shadow1}, -2px 0 ${shadow2}`,
            }}
          >
            {displayText}
          </span>
        )}
      </span>
    </>
  );
};

export default GlitchText;

