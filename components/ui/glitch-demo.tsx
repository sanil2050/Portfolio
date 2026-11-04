import React from "react";
import GlitchText from "./GlitchText";

export function GlitchDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center bg-black p-8">
      <GlitchText
        mode="slices"
        trigger="always"
        speed={1}
        intensity={0.5}
        burstDuration={0.6}
        offset={10}
        skew={0}
        flicker={false}
        fontWeight={900}
        enableShadows
        shadowColors={["#ff0000", "#00ffff"]}
        className="font-mono text-3xl tracking-tight text-[#b388ff]"
      >
        Enterprise RAG Architect
      </GlitchText>
    </div>
  );
}

export default GlitchDemo;

