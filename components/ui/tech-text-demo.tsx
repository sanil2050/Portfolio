import React from "react";
import TechText from "./TechText";

export function TechTextDemo() {
  return (
    <div style={{ width: "100%", height: "480px", position: "relative", backgroundColor: "#060606" }}>
      <TechText
        text="Sanil Mishra"
        fontWeight={600}
        fontSize={150}
        reveal="letter"
        dashLength={4}
        dashGap={2}
        specks={15}
        intro="none"
        introDuration={2}
        clickKick
        guides={false}
        fontFamily=""
        letterSpacing={-0.05}
        accentColor="#b388ff"
        reach={200}
        softness={0.7}
        lineStyle="dashed"
        strokeWidth={1.5}
        speed={1}
        bounce={0.4}
        selection
        labels
        color="#ffffff"
        align="center"
        draggable
        sweep
      />
    </div>
  );
}

export default TechTextDemo;

