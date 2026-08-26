/** DreamDesk scene entry: creates a fresh room world for the lifecycle-owned Babylon engine. */
import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import type { DreamDeskTarget, DreamMood } from "@/lib/dreamdesk-data";
import { DreamDeskWorld, type DreamDeskEvents } from "./DreamDeskWorld";

export type GameHandle = {
  scene: Scene;
  focus: (key: DreamDeskTarget) => void;
  setMood: (mood: DreamMood) => void;
  setProgress: (completedCount: number) => void;
  dispose: () => void;
};

export async function createGameScene(engine: Engine, canvas: HTMLCanvasElement, events: DreamDeskEvents): Promise<GameHandle> {
  const scene = new Scene(engine);
  const world = new DreamDeskWorld(scene, canvas, events);
  return { scene, focus: (key) => world.focus(key), setMood: (mood) => world.setMood(mood), setProgress: (completedCount) => world.setProgress(completedCount), dispose: () => world.dispose() };
}
