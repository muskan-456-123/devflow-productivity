/** DreamDesk mood system: palette and light intent remain data-driven and independent from scene setup. */
import type { DreamMood } from "@/lib/dreamdesk-data";

export type MoodPalette = {
  sky: string;
  overlay: string;
  overlayAlpha: number;
  ambient: string;
  lamp: string;
  accent: string;
  glow: string;
};

export const moodPalettes: Record<DreamMood, MoodPalette> = {
  morning: { sky: "#DDECF3", overlay: "#FFE9C4", overlayAlpha: 0.08, ambient: "#FFF6E1", lamp: "#FFD495", accent: "#8797E8", glow: "#FFF0C7" },
  sunset: { sky: "#776A9A", overlay: "#F6A1A7", overlayAlpha: 0.16, ambient: "#F6E5FF", lamp: "#FFBA76", accent: "#A790DF", glow: "#FFD1A6" },
  night: { sky: "#182444", overlay: "#273563", overlayAlpha: 0.34, ambient: "#B7B9F5", lamp: "#FFD399", accent: "#8C94FF", glow: "#BDBAFF" },
  rain: { sky: "#3F506B", overlay: "#657B95", overlayAlpha: 0.33, ambient: "#C6DBE7", lamp: "#F5C992", accent: "#91B8CA", glow: "#B6D3E0" },
  cozy: { sky: "#5C3851", overlay: "#A1554F", overlayAlpha: 0.22, ambient: "#FFE7C3", lamp: "#FF9B50", accent: "#D9835B", glow: "#FFC785" },
};
