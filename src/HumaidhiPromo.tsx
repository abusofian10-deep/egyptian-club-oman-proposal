import React from "react";
import {
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Scene1Sketch } from "./scenes/Scene1Sketch";
import { Scene2Offers } from "./scenes/Scene2Offers";
import { Scene3CTA } from "./scenes/Scene3CTA";
import { fontFamilyCairo } from "./styles/fonts";

export const HumaidhiPromo: React.FC = () => {
  const frame = useCurrentFrame();

  // BGM volume automation for the price cards and CTA (frames 900 to 1080)
  // Fade in over 15 frames from 900, fade out over the last 15 frames up to 1080
  const bgmVolume = interpolate(
    frame,
    [900, 915, 1065, 1080],
    [0, 0.45, 0.45, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#000000",
        position: "relative",
        overflow: "hidden",
        fontFamily: fontFamilyCairo,
      }}
    >
      {/* Scene 1: The Sketch Video (0s - 30s | Frames 0 - 900) */}
      <Sequence from={0} durationInFrames={900} name="Scene 1: Sketch Video">
        <Scene1Sketch />
      </Sequence>

      {/* Scene 2: Dynamic Offer Cards (30s - 34s | Frames 900 - 1020) */}
      <Sequence from={900} durationInFrames={120} name="Scene 2: Dynamic Offer Cards">
        <Scene2Offers />
      </Sequence>

      {/* Scene 3: CTA End Card (34s - 36s | Frames 1020 - 1080) */}
      <Sequence from={1020} durationInFrames={60} name="Scene 3: CTA End Card">
        <Scene3CTA />
      </Sequence>

      {/* Retail Outro BGM for Scenes 2 & 3 (Frames 900 - 1080) */}
      <Sequence from={900} durationInFrames={180} name="Audio: Outro BGM">
        <Audio
          src={staticFile("bgm.mp3")}
          volume={() => bgmVolume}
        />
      </Sequence>
    </div>
  );
};
