import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { HumaidhiPromo } from "./HumaidhiPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HumaidhiPromo"
        component={HumaidhiPromo}
        durationInFrames={1080}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
