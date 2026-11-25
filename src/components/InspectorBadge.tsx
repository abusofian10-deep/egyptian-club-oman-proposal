import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fontFamilyCairo } from "../styles/fonts";

interface InspectorBadgeProps {
  delay?: number;
}

export const InspectorBadge: React.FC<InspectorBadgeProps> = ({ delay = 25 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bouncy stamp slam entrance
  const stampSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 10,
      stiffness: 130,
      mass: 0.8,
    },
  });

  // Stamp rotation slam effect: rotates in and locks at -4 degrees
  const stampRotate = interpolate(stampSpring, [0, 1], [-22, -4]);
  const stampScale = interpolate(stampSpring, [0, 1], [2.0, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);

  // Subtle continuous gleam
  const gleamOffset = interpolate((frame - delay) % 70, [0, 70], [-120, 260]);

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: "relative",
        opacity: stampOpacity,
        transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
        transformOrigin: "center center",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      {/* Outer Golden Glow */}
      <div
        style={{
          position: "absolute",
          inset: -16,
          background: "radial-gradient(circle, rgba(255, 183, 3, 0.6) 0%, rgba(255, 183, 3, 0) 72%)",
          filter: "blur(18px)",
          borderRadius: 9999,
        }}
      />

      {/* Luxury Gold Certified Stamp Container */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #FFF3B8 0%, #FFB703 35%, #D48B00 70%, #996300 100%)",
          padding: "16px 38px 16px 30px",
          borderRadius: 70,
          border: "4px solid #FFFFFF",
          boxShadow:
            "0 20px 45px rgba(0, 0, 0, 0.55), inset 0 3px 6px rgba(255, 255, 255, 0.8), inset 0 -3px 6px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          direction: "rtl",
          overflow: "hidden",
        }}
      >
        {/* Shimmer Light Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${gleamOffset}%`,
            width: 48,
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent)",
            transform: "skewX(-25deg)",
            pointerEvents: "none",
          }}
        />

        {/* Inspector Emblem Disc */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #007A3D 0%, #004D26 100%)",
            border: "2.5px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 26, color: "#FFE899", lineHeight: 1 }}>🔍</span>
        </div>

        {/* Certified Arabic Stamp Text */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 36,
              fontWeight: 900,
              color: "#002B54",
              letterSpacing: 0,
              textShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
              whiteSpace: "nowrap",
            }}
          >
            مفحوص من المفتش فطين
          </span>
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 40,
              fontWeight: 900,
              color: "#007A3D",
              textShadow: "0 1px 2px rgba(255, 255, 255, 0.9)",
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        </div>
      </div>
    </div>
  );
};
