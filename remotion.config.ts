import fs from "fs";
import { Config } from "@remotion/cli/config";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (fs.existsSync(chromePath)) {
  Config.setBrowserExecutable(chromePath);
}

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
