import React from "react";

export const AppleBoxGraphic: React.FC<{ size?: number }> = ({ size = 130 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft Glow */}
      <circle cx="50" cy="52" r="38" fill="rgba(230, 57, 70, 0.12)" />

      {/* Wooden Box / Crate Base */}
      <rect x="14" y="58" width="72" height="30" rx="4" fill="#B07D48" stroke="#845524" strokeWidth="2.5" />
      <line x1="14" y1="68" x2="86" y2="68" stroke="#845524" strokeWidth="2" />
      <line x1="14" y1="78" x2="86" y2="78" stroke="#845524" strokeWidth="2" />
      <line x1="38" y1="58" x2="38" y2="88" stroke="#845524" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="62" y1="58" x2="62" y2="88" stroke="#845524" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Fresh Red Apples Stack */}
      {/* Left Apple */}
      <circle cx="36" cy="46" r="15" fill="url(#appleGradLeft)" stroke="#9E1422" strokeWidth="1.5" />
      {/* Right Apple */}
      <circle cx="64" cy="46" r="15" fill="url(#appleGradRight)" stroke="#9E1422" strokeWidth="1.5" />
      {/* Center Apple */}
      <circle cx="50" cy="40" r="17" fill="url(#appleGradCenter)" stroke="#B31929" strokeWidth="2" />
      
      {/* Glossy Highlights */}
      <ellipse cx="45" cy="34" rx="4" ry="7" transform="rotate(-25 45 34)" fill="rgba(255, 255, 255, 0.55)" />
      
      {/* Stem & Fresh Green Leaf */}
      <path d="M50,24 C50,18 53,15 56,13" stroke="#5C3A1E" strokeWidth="3" strokeLinecap="round" />
      <path d="M53,19 C60,15 67,18 69,23 C64,26 56,24 53,19 Z" fill="#2EC4B6" stroke="#007A3D" strokeWidth="1.5" />

      <defs>
        <radialGradient id="appleGradCenter" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF4D5A" />
          <stop offset="50%" stopColor="#E61C2C" />
          <stop offset="100%" stopColor="#9E101E" />
        </radialGradient>
        <radialGradient id="appleGradLeft" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6673" />
          <stop offset="60%" stopColor="#DE1B2B" />
          <stop offset="100%" stopColor="#8C0D1A" />
        </radialGradient>
        <radialGradient id="appleGradRight" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6673" />
          <stop offset="60%" stopColor="#D91827" />
          <stop offset="100%" stopColor="#8C0D1A" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const PomegranateGraphic: React.FC<{ size?: number }> = ({ size = 130 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft Glow */}
      <circle cx="50" cy="52" r="38" fill="rgba(193, 18, 31, 0.15)" />

      {/* Pomegranate Body */}
      <circle cx="50" cy="54" r="32" fill="url(#pomGrad)" stroke="#780016" strokeWidth="2.5" />

      {/* Crown / Calyx at Top */}
      <path
        d="M38,26 L42,16 L48,22 L50,14 L52,22 L58,16 L62,26 Z"
        fill="#A61026"
        stroke="#780016"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Glossy Curved Highlight */}
      <path
        d="M32,44 C34,36 42,32 50,30"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Exposed Ruby Seeds Window */}
      <path
        d="M52,48 C66,50 74,60 72,74 C60,76 48,68 52,48 Z"
        fill="#660012"
        stroke="#FFB703"
        strokeWidth="1.5"
      />
      {/* Ruby Seed Jewels */}
      <circle cx="58" cy="58" r="3.5" fill="#E6193C" stroke="#FFE28A" strokeWidth="0.8" />
      <circle cx="65" cy="62" r="3.2" fill="#E6193C" stroke="#FFE28A" strokeWidth="0.8" />
      <circle cx="59" cy="67" r="3.6" fill="#E6193C" stroke="#FFE28A" strokeWidth="0.8" />
      <circle cx="67" cy="70" r="2.8" fill="#FF4D6D" />

      <defs>
        <radialGradient id="pomGrad" cx="35%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#E6193C" />
          <stop offset="45%" stopColor="#C1121F" />
          <stop offset="85%" stopColor="#780016" />
          <stop offset="100%" stopColor="#4A000E" />
        </radialGradient>
      </defs>
    </svg>
  );
};
