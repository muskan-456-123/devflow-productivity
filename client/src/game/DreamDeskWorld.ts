/**
 * DreamDeskWorld owns Babylon nodes, interaction intent, camera focus, mood updates, and procedural prop motion.
 */
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import type { DreamDeskTarget, DreamMood } from "@/lib/dreamdesk-data";
import { moodPalettes } from "./moodSystem";
import { createDreamRoom, type RoomBuild } from "./roomFactory";

export type DreamDeskEvents = {
  onSelect: (key: DreamDeskTarget) => void;
  onHover: (key: DreamDeskTarget | null) => void;
};

type Interactable = { target: Vector3; halo: Mesh };

export class DreamDeskWorld {
  private readonly camera: ArcRotateCamera;
  private readonly ambient: HemisphericLight;
  private readonly daylight: DirectionalLight;
  private readonly lamp: PointLight;
  private readonly glow: GlowLayer;
  private readonly objects = new Map<DreamDeskTarget, Interactable>();
  private room!: RoomBuild;
  private desiredTarget = new Vector3(0.2, 1.8, 1.55);
  private activeKey: DreamDeskTarget = "room";
  private mood: DreamMood = "sunset";
  private elapsed = 0;

  constructor(private readonly scene: Scene, private readonly canvas: HTMLCanvasElement, private readonly events: DreamDeskEvents) {
    scene.clearColor = new Color4(0.23, 0.19, 0.37, 1);
    scene.imageProcessingConfiguration.exposure = 0.72;
    scene.imageProcessingConfiguration.contrast = 1.08;
    this.camera = new ArcRotateCamera("dreamDeskCamera", -Math.PI / 2 + 0.12, 1.0, 10.8, this.desiredTarget.clone(), scene);
    this.camera.lowerRadiusLimit = 9;
    this.camera.upperRadiusLimit = 12.2;
    this.camera.lowerBetaLimit = 0.82;
    this.camera.upperBetaLimit = 1.24;
    this.camera.panningSensibility = 0;
    this.camera.wheelDeltaPercentage = 0.006;
    this.camera.attachControl(canvas, true);

    this.ambient = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
    this.ambient.intensity = 0.74;
    this.daylight = new DirectionalLight("daylight", new Vector3(-0.35, -1, 0.15), scene);
    this.daylight.position = new Vector3(0, 7, -4);
    this.daylight.intensity = 0.28;
    this.lamp = new PointLight("deskLamp", new Vector3(-2.65, 2.65, 1.2), scene);
    this.lamp.intensity = 7;
    this.lamp.range = 6;
    this.glow = new GlowLayer("softGlow", scene);
    this.glow.intensity = 0.18;

    this.room = createDreamRoom(scene, this.registerObject);
    this.setMood("sunset");
    scene.onBeforeRenderObservable.add(() => this.update());
  }

  private registerObject = (key: DreamDeskTarget, mesh: Mesh, target: Vector3, halo: Mesh) => {
    this.objects.set(key, { target, halo });
    mesh.actionManager = new ActionManager(this.scene);
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
      this.canvas.style.cursor = "pointer";
      this.setHover(key);
    }));
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
      this.canvas.style.cursor = "grab";
      this.setHover(null);
    }));
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => this.focus(key)));
  };

  focus(key: DreamDeskTarget) {
    const object = this.objects.get(key);
    this.activeKey = key;
    this.desiredTarget = object?.target.clone() ?? new Vector3(0.2, 1.8, 1.55);
    this.objects.forEach((item, candidate) => {
      item.halo.isVisible = candidate === key;
    });
    this.events.onSelect(key);
  }

  setMood(mood: DreamMood) {
    this.mood = mood;
    const palette = moodPalettes[mood];
    const sky = Color3.FromHexString(palette.sky);
    this.scene.clearColor = new Color4(sky.r * 0.7, sky.g * 0.7, sky.b * 0.7, 1);
    this.room.windowOverlay.diffuseColor = Color3.FromHexString(palette.overlay);
    this.room.windowOverlay.alpha = palette.overlayAlpha;
    this.ambient.diffuse = Color3.FromHexString(palette.ambient).scale(0.72);
    this.daylight.diffuse = Color3.FromHexString(palette.ambient).scale(0.56);
    this.lamp.diffuse = Color3.FromHexString(palette.lamp);
    this.room.accentMaterials.forEach((mat, index) => {
      const tint = Color3.FromHexString(index % 2 === 0 ? palette.accent : palette.glow);
      mat.emissiveColor = tint.scale(index === 0 ? 0.13 : 0.06);
    });
  }

  private setHover(key: DreamDeskTarget | null) {
    this.objects.forEach((item, candidate) => {
      item.halo.isVisible = candidate === key || candidate === this.activeKey && this.activeKey !== "room";
    });
    this.events.onHover(key);
  }

  private update() {
    const delta = this.scene.getEngine().getDeltaTime() / 1000;
    this.elapsed += delta;
    this.camera.setTarget(Vector3.Lerp(this.camera.target, this.desiredTarget, Math.min(1, delta * 3.4)));
    this.room.animated.forEach(({ mesh, base, phase, range }) => {
      mesh.position.y = base.y + Math.sin(this.elapsed * 1.5 + phase) * range;
      mesh.position.x = base.x + Math.cos(this.elapsed * 0.8 + phase) * range * 0.35;
      mesh.scaling.y = 1 + Math.sin(this.elapsed * 1.4 + phase) * 0.08;
    });
    this.lamp.intensity = 6.7 + Math.sin(this.elapsed * 1.3) * 0.45;
  }

  dispose() {
    this.camera.detachControl();
    this.canvas.style.cursor = "default";
    this.glow.dispose();
    this.scene.dispose();
  }
}
