import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { OmaniPatternBg } from "../components/OmaniPatternBg";
import { OfferCard } from "../components/OfferCard";
import { InspectorBadge } from "../components/InspectorBadge";
import { promoConfig } from "../data/promoData";
import { fontFamilyCairo, fontFamilyTajawal } from "../styles/fonts";

export const Scene2Offers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for header
  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 12,
      stiffness: 110,
    },
  });

  const headerY = interpolate(headerSpring, [0, 1], [-80, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 0.4, 1], [0, 1, 1]);

  // Bottom branches badge spring
  const footerSpring = spring({
    frame: frame - 28,
    fps,
    config: {
      damping: 12,
      stiffness: 120,
    },
  });

  return (
    <OmaniPatternBg>
      <div
        style={{
          width: 1080,
          height: 1920,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "120px 50px 90px 50px",
          boxSizing: "border-box",
          direction: "rtl",
          zIndex: 10,
        }}
      >
        {/* Top Header Section */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Top Pill: Hypermarket Badge */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.16)",
              border: "2px solid rgba(255, 210, 102, 0.5)",
              backdropFilter: "blur(10px)",
              padding: "10px 36px",
              borderRadius: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span style={{ fontSize: 26 }}>🌟</span>
            <span
              style={{
                fontFamily: fontFamilyCairo,
                fontSize: 28,
                fontWeight: 800,
                color: "#FFE28A",
                letterSpacing: 0.5,
              }}
            >
              {promoConfig.brand.name}
            </span>
            <span style={{ fontSize: 26 }}>🌟</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              margin: 0,
              fontFamily: fontFamilyCairo,
              fontSize: 58,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.25,
              textShadow: "0 8px 28px rgba(0, 0, 0, 0.5)",
              letterSpacing: -0.5,
              maxWidth: 980,
            }}
          >
            {promoConfig.brand.headline}
          </h1>

          {/* Golden underline divider */}
          <div
            style={{
              marginTop: 22,
              width: 320,
              height: 4.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, transparent, #FFE28A, #FFB703, transparent)",
              boxShadow: "0 0 16px #FFB703",
            }}
          />
        </div>

        {/* Center: Offer Cards Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 34,
            width: "100%",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          {/* Card 1: Fresh Apples */}
          <OfferCard item={promoConfig.offers[0]} delay={8} />

          {/* Card 2: Yemeni Pomegranate */}
          <OfferCard item={promoConfig.offers[1]} delay={18} />
        </div>

        {/* Inspector Fateen Gold Stamp */}
        <div style={{ margin: "10px 0 25px 0" }}>
          <InspectorBadge delay={26} />
        </div>

        {/* Bottom Section: Branch Location & Urgency */}
        <div
          style={{
            opacity: footerSpring,
            transform: `translateY(${interpolate(footerSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "rgba(0, 43, 84, 0.9)",
              border: "2.5px solid #FFB703",
              borderRadius: 32,
              padding: "16px 50px",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
            }}
          >
            <span style={{ fontSize: 32 }}>📍</span>
            <span
              style={{
                fontFamily: fontFamilyCairo,
                fontSize: 32,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              {promoConfig.brand.locations}
            </span>
          </div>

          <span
            style={{
              fontFamily: fontFamilyTajawal,
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {promoConfig.brand.footerDisclaimer}
          </span>
        </div>
      </div>
    </OmaniPatternBg>
  );
};
