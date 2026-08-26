/** DreamDesk mood system: palette and light intent remain data-driven and independent from scene setup. */
import type { DreamMood } from "@/lib/dreamdesk-data";

export type MoodPalette = {
  sky: string;
  overlay: string;
  overlayAlpha: number;
  ambient: string;
  ambientIntensity: number;
  daylightIntensity: number;
  lamp: string;
  lampIntensity: number;
  exposure: number;
  glowIntensity: number;
  accent: string;
  glow: string;
};

export const moodPalettes: Record<DreamMood, MoodPalette> = {
  morning: { sky: "#C9D6E4", overlay: "#FFE3B7", overlayAlpha: 0.12, ambient: "#FFF0D8", ambientIntensity: 0.40, daylightIntensity: 0.22, lamp: "#FFD398", lampIntensity: 2.5, exposure: 0.56, glowIntensity: 0.09, accent: "#8797E8", glow: "#FFF0C7" },
  sunset: { sky: "#655679", overlay: "#C87891", overlayAlpha: 0.20, ambient: "#E8D5EF", ambientIntensity: 0.38, daylightIntensity: 0.12, lamp: "#FFAF68", lampIntensity: 3.8, exposure: 0.54, glowIntensity: 0.11, accent: "#A790DF", glow: "#FFD1A6" },
  night: { sky: "#101A35", overlay: "#243965", overlayAlpha: 0.42, ambient: "#8698D4", ambientIntensity: 0.22, daylightIntensity: 0.045, lamp: "#FFAD62", lampIntensity: 7.8, exposure: 0.56, glowIntensity: 0.15, accent: "#9EA9FF", glow: "#FFD29A" },
  rain: { sky: "#2C3A55", overlay: "#485A73", overlayAlpha: 0.40, ambient: "#A1BED0", ambientIntensity: 0.28, daylightIntensity: 0.05, lamp: "#F0BE7C", lampIntensity: 4.4, exposure: 0.50, glowIntensity: 0.10, accent: "#91B8CA", glow: "#B6D3E0" },
  cozy: { sky: "#432B42", overlay: "#8D4A49", overlayAlpha: 0.28, ambient: "#FFD7A9", ambientIntensity: 0.30, daylightIntensity: 0.05, lamp: "#FF963F", lampIntensity: 6.8, exposure: 0.53, glowIntensity: 0.15, accent: "#D9835B", glow: "#FFC785" },
};
