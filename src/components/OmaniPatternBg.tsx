import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const OmaniPatternBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // Subtle pulsing glow
  const glowPulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 2),
    [-1, 1],
    [0.85, 1.05]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: 1080,
        height: 1920,
        background: "linear-gradient(160deg, #004D26 0%, #007A3D 35%, #004B93 75%, #002B54 100%)",
        overflow: "hidden",
      }}
    >
      {/* Radial emerald glow at top */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 200, 100, 0.28) 0%, rgba(0, 122, 61, 0) 70%)",
          filter: "blur(60px)",
          transformOrigin: "center center",
          scale: `${glowPulse}`,
        }}
      />

      {/* Radial royal blue glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 120, 255, 0.25) 0%, rgba(0, 75, 147, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Traditional Arabesque Geometric SVG Pattern Overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.08,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="omaniGeometricGrid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-Pointed Star Motif */}
            <path
              d="M60,0 L75,45 L120,60 L75,75 L60,120 L45,75 L0,60 L45,45 Z"
              fill="none"
              stroke="#FFD066"
              strokeWidth="1.5"
            />
            {/* Interlocking Octagons */}
            <rect
              x="20"
              y="20"
              width="80"
              height="80"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              transform="rotate(45 60 60)"
            />
            <circle cx="60" cy="60" r="10" fill="none" stroke="#FFD066" strokeWidth="1" />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#FFD066" strokeWidth="1" />
            <circle cx="120" cy="0" r="15" fill="none" stroke="#FFD066" strokeWidth="1" />
            <circle cx="0" cy="120" r="15" fill="none" stroke="#FFD066" strokeWidth="1" />
            <circle cx="120" cy="120" r="15" fill="none" stroke="#FFD066" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#omaniGeometricGrid)" />
      </svg>

      {/* Decorative Gold Border Inset */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: "2px solid rgba(255, 183, 3, 0.3)",
          borderRadius: 40,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 36,
          right: 36,
          bottom: 36,
          border: "1px dashed rgba(255, 210, 102, 0.2)",
          borderRadius: 34,
          pointerEvents: "none",
        }}
      />

      {children}
    </div>
  );
};
