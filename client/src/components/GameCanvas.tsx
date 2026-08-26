/**
 * DreamDesk canvas shell: React owns the frame; Babylon owns a single, lifecycle-safe room canvas.
 */
import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene, type GameHandle } from "@/game/scene";
import type { DreamDeskTarget, DreamMood } from "@/lib/dreamdesk-data";

type GameCanvasProps = {
  focusKey: DreamDeskTarget;
  mood: DreamMood;
  onSelect: (key: DreamDeskTarget) => void;
  onHover: (key: DreamDeskTarget | null) => void;
};

export default function GameCanvas({ focusKey, mood, onSelect, onHover }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const handleRef = useRef<GameHandle | null>(null);
  const focusRef = useRef(focusKey);
  const moodRef = useRef(mood);
  const callbacksRef = useRef({ onSelect, onHover });
  callbacksRef.current = { onSelect, onHover };

  useEffect(() => {
    focusRef.current = focusKey;
    handleRef.current?.focus(focusKey);
  }, [focusKey]);

  useEffect(() => {
    moodRef.current = mood;
    handleRef.current?.setMood(mood);
  }, [mood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || startedRef.current) return;
    startedRef.current = true;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, adaptToDeviceRatio: true });
    let disposed = false;
    void createGameScene(engine, canvas, {
      onSelect: (key) => callbacksRef.current.onSelect(key),
      onHover: (key) => callbacksRef.current.onHover(key),
    }).then((handle) => {
      if (disposed) { handle.dispose(); return; }
      handleRef.current = handle;
      handle.setMood(moodRef.current);
      handle.focus(focusRef.current);
      engine.runRenderLoop(() => handle.scene.render());
    });
    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      handleRef.current?.dispose();
      handleRef.current = null;
      engine.dispose();
      startedRef.current = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="dreamdesk-canvas" aria-label="Interactive DreamDesk productivity room" style={{ touchAction: "none" }} />;
}
