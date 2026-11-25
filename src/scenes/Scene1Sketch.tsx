import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, interpolate } from "remotion";
import { promoConfig } from "../data/promoData";
import { fontFamilyCairo, fontFamilyTajawal } from "../styles/fonts";

export const Scene1Sketch: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#001226",
        overflow: "hidden",
      }}
    >
      {/* 1. Rich Omani Royal Gradient Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(175deg, #002B54 0%, #004D26 30%, #001A33 70%, #002B54 100%)",
        }}
      />

      {/* Subtle Ambient Radial Glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 122, 61, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 75, 147, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Traditional Omani Geometric Pattern Inset */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="sketchBgPattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50,0 L62,38 L100,50 L62,62 L50,100 L38,62 L0,50 L38,38 Z"
              fill="none"
              stroke="#FFE28A"
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sketchBgPattern)" />
      </svg>

      {/* Decorative Gold Inset Borders */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: "2px solid rgba(255, 183, 3, 0.25)",
          borderRadius: 40,
          pointerEvents: "none",
        }}
      />

      {/* 2. Top Branded Header Section */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          direction: "rtl",
          zIndex: 20,
          padding: "0 40px",
        }}
      >
        {/* Brand Badge */}
        <div
          style={{
            backgroundColor: "rgba(0, 77, 38, 0.9)",
            border: "2.5px solid #FFB703",
            borderRadius: 32,
            padding: "12px 40px",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 183, 3, 0.2)",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 26 }}>🌟</span>
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 30,
              fontWeight: 800,
              color: "#FFE28A",
              letterSpacing: 0.5,
            }}
          >
            {promoConfig.brand.name}
          </span>
          <span style={{ fontSize: 26 }}>🌟</span>
        </div>

        {/* Promo Title */}
        <h2
          style={{
            margin: 0,
            fontFamily: fontFamilyCairo,
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.25,
            textShadow: "0 6px 22px rgba(0, 0, 0, 0.7)",
          }}
        >
          {promoConfig.brand.headline}
        </h2>

        {/* Gold Glow Line */}
        <div
          style={{
            marginTop: 20,
            width: 280,
            height: 4,
            borderRadius: 2,
            background: "linear-gradient(90deg, transparent, #FFB703, transparent)",
            boxShadow: "0 0 14px #FFB703",
          }}
        />
      </div>

      {/* 3. Main Crisp Video: Perfectly Smooth Offthread Decoding (No Jitter, No Tearing) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: 1080,
          height: 608,
          transform: "translateY(-50%)",
          zIndex: 10,
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 75, 147, 0.4), 0 0 0 3px #FFB703",
          backgroundColor: "#000000",
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile("humaidhi-sketch.mp4")}
          volume={1.0}
          style={{
            width: 1080,
            height: 608,
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* 4. Bottom Branded Footer Section */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          direction: "rtl",
          zIndex: 20,
          padding: "0 40px",
        }}
      >
        {/* Branch Location Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(0, 43, 84, 0.92)",
            border: "2.5px solid #FFB703",
            borderRadius: 36,
            padding: "16px 52px",
            boxShadow: "0 14px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 75, 147, 0.3)",
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
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          {promoConfig.brand.footerDisclaimer}
        </span>
      </div>
    </div>
  );
};
