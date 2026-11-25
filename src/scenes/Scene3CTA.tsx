import React from "react";
import {
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { promoConfig } from "../data/promoData";
import { fontFamilyCairo, fontFamilyTajawal } from "../styles/fonts";

export const Scene3CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth Ken Burns zoom-in (1.0 to 1.05)
  const kenBurnsScale = interpolate(frame, [0, 60], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.4, 1),
  });

  // Staggered Springs for bottom panel contents
  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const headlineSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const brandSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const locationSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const footerSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Bottom panel translateY entrance
  const panelTranslateY = interpolate(panelSpring, [0, 1], [300, 0]);

  // Subtle pulsing glow for the headline
  const headlinePulse = interpolate(
    Math.sin((frame / 15) * Math.PI),
    [-1, 1],
    [0.98, 1.02]
  );

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#001529",
        overflow: "hidden",
      }}
    >
      {/* Upper/Center Ken Burns Fateen Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1420,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${kenBurnsScale})`,
            transformOrigin: "center 38%",
          }}
        >
          <Img
            src={staticFile("fateen-cta.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 18%",
            }}
          />
        </div>

        {/* Gradient shadow transitioning cleanly into bottom overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 380,
            background: "linear-gradient(to bottom, rgba(0, 21, 41, 0) 0%, rgba(0, 21, 41, 0.95) 85%, #001529 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Sleek Branded Bottom Overlay Panel */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 650,
          background: "linear-gradient(180deg, rgba(0, 77, 38, 0.97) 0%, rgba(0, 43, 84, 0.98) 55%, #001529 100%)",
          backdropFilter: "blur(20px)",
          borderTop: "4px solid #FFB703",
          boxShadow: "0 -20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 183, 3, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "52px 60px 48px 60px",
          boxSizing: "border-box",
          direction: "rtl",
          transform: `translateY(${panelTranslateY}px)`,
          zIndex: 30,
        }}
      >
        {/* Top Gold Ambient Glow Bar */}
        <div
          style={{
            position: "absolute",
            top: -2,
            left: "15%",
            width: "70%",
            height: 4,
            background: "linear-gradient(90deg, transparent, #FFE28A, #FFB703, transparent)",
            boxShadow: "0 0 20px #FFB703",
          }}
        />

        {/* 1. Staggered Headline (Large Bold) */}
        <div
          style={{
            opacity: headlineSpring,
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [35, 0])}px) scale(${headlinePulse})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 44 }}>⚡</span>
          <h2
            style={{
              margin: 0,
              fontFamily: fontFamilyCairo,
              fontSize: 72,
              fontWeight: 900,
              color: "#FFD166",
              textAlign: "center",
              lineHeight: 1.1,
              textShadow: "0 6px 24px rgba(0, 0, 0, 0.65)",
              letterSpacing: -0.5,
            }}
          >
            {promoConfig.cta.headline}
          </h2>
          <span style={{ fontSize: 44 }}>⚡</span>
        </div>

        {/* 2. Brand Name */}
        <div
          style={{
            opacity: brandSpring,
            transform: `translateY(${interpolate(brandSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 54,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.15,
              textShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            {promoConfig.brand.name}
          </div>
          <div
            style={{
              fontFamily: fontFamilyTajawal,
              fontSize: 24,
              fontWeight: 700,
              color: "#FFE28A",
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            {promoConfig.brand.englishName}
          </div>
        </div>

        {/* 3. Location Badge */}
        <div
          style={{
            opacity: locationSpring,
            transform: `translateY(${interpolate(locationSpring, [0, 1], [25, 0])}px)`,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            border: "2.5px solid rgba(255, 210, 102, 0.6)",
            borderRadius: 36,
            padding: "14px 48px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.35)",
          }}
        >
          <span style={{ fontSize: 32 }}>📍</span>
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 34,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 0.5,
            }}
          >
            {promoConfig.brand.locations}
          </span>
        </div>

        {/* 4. Footer Note */}
        <div
          style={{
            opacity: footerSpring,
            transform: `translateY(${interpolate(footerSpring, [0, 1], [15, 0])}px)`,
            fontFamily: fontFamilyTajawal,
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.85)",
            textAlign: "center",
          }}
        >
          {promoConfig.brand.footerDisclaimer}
        </div>
      </div>
    </div>
  );
};
