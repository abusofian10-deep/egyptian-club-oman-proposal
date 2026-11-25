import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { OfferItem } from "../data/promoData";
import { fontFamilyCairo, fontFamilyTajawal } from "../styles/fonts";
import { AppleBoxGraphic, PomegranateGraphic } from "./FruitGraphics";

interface OfferCardProps {
  item: OfferItem;
  delay: number;
}

export const OfferCard: React.FC<OfferCardProps> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bouncy entrance spring with rich character
  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 11,
      stiffness: 115,
      mass: 0.85,
    },
  });

  const cardTranslateY = interpolate(cardSpring, [0, 1], [220, 0]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 0.25, 1], [0, 1, 1]);

  // Subtle floating micro-movement
  const floatY = Math.sin((frame - delay) / 14) * 3.5;

  if (frame < delay) return null;

  const isApple = item.id === "apple-box";

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardTranslateY + floatY}px) scale(${cardScale})`,
        width: 980,
        backgroundColor: "#FFFFFF",
        borderRadius: 40,
        padding: "36px 44px",
        boxShadow:
          "0 28px 70px rgba(0, 0, 0, 0.5), 0 0 0 2.5px rgba(255, 183, 3, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        direction: "rtl",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Gradient Wave */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 220,
          height: "100%",
          background: isApple
            ? "radial-gradient(circle at 80% 50%, rgba(230, 57, 70, 0.1) 0%, transparent 80%)"
            : "radial-gradient(circle at 80% 50%, rgba(193, 18, 31, 0.1) 0%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Banner Tag */}
      {item.badge && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 50,
            backgroundColor: isApple ? "#007A3D" : "#004B93",
            color: "#FFFFFF",
            fontFamily: fontFamilyCairo,
            fontSize: 20,
            fontWeight: 800,
            padding: "8px 24px 10px 24px",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
            letterSpacing: 0.5,
          }}
        >
          {item.badge}
        </div>
      )}

      {/* Right Column: Fruit Graphic & Product Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 32, flex: 1 }}>
        {/* Custom Rendered High-Res Fruit Graphic */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 32,
            background: isApple
              ? "linear-gradient(135deg, #FFF0F2 0%, #FFD6DC 100%)"
              : "linear-gradient(135deg, #FFF0F1 0%, #FDD2D6 100%)",
            border: isApple ? "3px solid #E63946" : "3px solid #C1121F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.12)",
            flexShrink: 0,
          }}
        >
          {isApple ? <AppleBoxGraphic size={120} /> : <PomegranateGraphic size={120} />}
        </div>

        {/* Text Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontFamily: fontFamilyTajawal,
              fontSize: 22,
              fontWeight: 700,
              color: "#007A3D",
              letterSpacing: 0.5,
            }}
          >
            {item.category}
          </span>
          <h3
            style={{
              margin: 0,
              fontFamily: fontFamilyCairo,
              fontSize: 48,
              fontWeight: 900,
              color: "#0B1528",
              lineHeight: 1.15,
            }}
          >
            {item.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontFamily: fontFamilyTajawal,
                fontSize: 24,
                fontWeight: 600,
                color: "#4B5563",
              }}
            >
              الكمية: <strong style={{ color: "#111827", fontWeight: 800 }}>{item.unit}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Left Column: Huge Precise 3-Decimal Price */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          minWidth: 280,
          paddingRight: 16,
        }}
      >
        {/* Main Price Box */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            direction: "ltr",
          }}
        >
          {/* Currency Symbol in bold gold */}
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 38,
              fontWeight: 900,
              color: "#D48B00",
              letterSpacing: 0,
              textShadow: "0 2px 4px rgba(212, 139, 0, 0.2)",
            }}
          >
            ر.ع
          </span>

          {/* Exact 3-Decimal Price Digits */}
          <span
            style={{
              fontFamily: fontFamilyCairo,
              fontSize: 84,
              fontWeight: 900,
              color: "#004B93",
              letterSpacing: -1.5,
              lineHeight: 1,
              textShadow: "0 3px 12px rgba(0, 75, 147, 0.2)",
            }}
          >
            {item.price}
          </span>
        </div>

        {/* Sub-label badge */}
        {item.subLabel && (
          <div
            style={{
              marginTop: 8,
              backgroundColor: isApple ? "#FFF3D6" : "#E8F4EC",
              border: isApple ? "2px solid #FFB703" : "2px solid #007A3D",
              borderRadius: 22,
              padding: "6px 20px",
              fontFamily: fontFamilyCairo,
              fontSize: 22,
              fontWeight: 800,
              color: isApple ? "#996300" : "#00552B",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
            }}
          >
            {item.subLabel}
          </div>
        )}
      </div>
    </div>
  );
};
