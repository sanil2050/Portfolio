"use client";
import React, { useRef, useEffect, useState, useId } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  className = "",
}) => {
  const svgRef = useRef(null);
  const uid = useId().replace(/:/g, "");
  const gradientId = `textGradient-${uid}`;
  const maskGradientId = `revealMask-${uid}`;
  const maskId = `textMask-${uid}`;

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const lines = String(text || "").split("\n");
  const isMultiLine = lines.length > 1;
  const viewBox = isMultiLine ? "0 0 1100 190" : "0 0 300 100";
  const strokeWidth = isMultiLine ? "1.1" : "0.3";
  const hoverStrokeWidth = isMultiLine ? "1.6" : "0.35";
  const textClass = isMultiLine
    ? "font-serif font-medium text-[50px]"
    : "font-[helvetica] text-7xl font-bold";

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      if (svgRect.width > 0 && svgRect.height > 0) {
        const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
        setMaskPosition({
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`,
        });
      }
    }
  }, [cursor]);

  const renderTextContent = () => {
    if (!isMultiLine) return text;
    const startY = 66;
    const lineHeight = 72;
    return lines.map((line, idx) => (
      <tspan key={idx} x="50%" y={startY + idx * lineHeight}>
        {line}
      </tspan>
    ));
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={maskGradientId}
          gradientUnits="userSpaceOnUse"
          r={isMultiLine ? "24%" : "20%"}
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${maskGradientId})`}
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        className={`fill-transparent stroke-white/60 ${textClass}`}
        style={{ opacity: hovered ? 0.75 : 0 }}
      >
        {renderTextContent()}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        className={`${isMultiLine ? "fill-white/[0.12] stroke-white/75" : "fill-transparent stroke-neutral-200 dark:stroke-neutral-800"} ${textClass}`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {renderTextContent()}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth={hoverStrokeWidth}
        mask={`url(#${maskId})`}
        className={`fill-transparent ${textClass}`}
      >
        {renderTextContent()}
      </text>
    </svg>
  );
};
