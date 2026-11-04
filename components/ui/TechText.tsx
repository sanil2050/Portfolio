"use client";

import React from "react";
// @ts-ignore
import TechTextJsx from "./TechText.jsx";

export interface TechTextProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  accentColor?: string;
  align?: "left" | "center" | "right";
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  strokeWidth?: number;
  lineStyle?: "dashed" | "solid";
  reveal?: "letter" | "area";
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  bounce?: number;
  sweep?: boolean;
  speed?: number;
  clickKick?: boolean;
  intro?: "none" | "type" | "assemble" | "metrics";
  introDuration?: number;
  guides?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TechText: React.FC<TechTextProps> = (props) => {
  return <TechTextJsx {...props} />;
};

export default TechText;

