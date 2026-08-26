/**
 * DreamDesk room factory: a lightweight procedural diorama made from expressive primitives, not imported models.
 */
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { CreateCylinder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { CreatePlane } from "@babylonjs/core/Meshes/Builders/planeBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { CreateTorus } from "@babylonjs/core/Meshes/Builders/torusBuilder";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import type { DreamDeskTarget } from "@/lib/dreamdesk-data";

export type AnimatedProp = { mesh: Mesh; base: Vector3; phase: number; range: number };
export type RoomBuild = {
  windowOverlay: StandardMaterial;
  accentMaterials: StandardMaterial[];
  animated: AnimatedProp[];
};

export type RegisterInteractable = (key: DreamDeskTarget, mesh: Mesh, target: Vector3, halo: Mesh) => void;

const generatedWindowUrl = "/manus-storage/dreamdesk-window-sunset_4d19e5a8.png";

function material(scene: Scene, name: string, hex: string, alpha = 1) {
  const result = new StandardMaterial(name, scene);
  result.diffuseColor = Color3.FromHexString(hex);
  result.specularColor = new Color3(0.06, 0.06, 0.09);
  result.alpha = alpha;
  return result;
}

function box(scene: Scene, name: string, width: number, height: number, depth: number, position: Vector3, mat: StandardMaterial) {
  const mesh = CreateBox(name, { width, height, depth }, scene);
  mesh.position = position;
  mesh.material = mat;
  return mesh;
}

function cylinder(scene: Scene, name: string, diameter: number, height: number, position: Vector3, mat: StandardMaterial) {
  const mesh = CreateCylinder(name, { diameter, height, tessellation: 24 }, scene);
  mesh.position = position;
  mesh.material = mat;
  return mesh;
}

function halo(scene: Scene, name: string, position: Vector3, color: string) {
  const ring = CreateTorus(name, { diameter: 1.05, thickness: 0.045, tessellation: 32 }, scene);
  ring.position = position;
  ring.rotation.x = Math.PI / 2;
  const mat = material(scene, `${name}-material`, color, 0.78);
  mat.emissiveColor = Color3.FromHexString(color);
  ring.material = mat;
  ring.isVisible = false;
  return ring;
}

export function createDreamRoom(scene: Scene, register: RegisterInteractable): RoomBuild {
  const cream = material(scene, "cream", "#E9D8CC");
  const creamDark = material(scene, "creamDark", "#CBAF9F");
  const lavender = material(scene, "lavender", "#A68FD6");
  const lavenderDark = material(scene, "lavenderDark", "#65547E");
  const blush = material(scene, "blush", "#EAA4B5");
  const warmWood = material(scene, "warmWood", "#C99179");
  const mint = material(scene, "mint", "#89B89E");
  const charcoal = material(scene, "charcoal", "#313047");
  const amber = material(scene, "amber", "#FFB56E");
  const glass = material(scene, "glass", "#D9C5EC", 0.52);
  glass.emissiveColor = new Color3(0.11, 0.08, 0.18);
  const accents = [lavender, lavenderDark, blush, mint, amber];
  const animated: AnimatedProp[] = [];

  // Room shell and window.
  box(scene, "floor", 11.4, 0.22, 8.2, new Vector3(0, -0.11, 0.75), creamDark);
  box(scene, "backWall", 11.3, 6.5, 0.2, new Vector3(0, 3.15, 4.55), material(scene, "wall", "#D7C8D7"));
  const windowPlane = CreatePlane("skyWindow", { width: 5.65, height: 3.1 }, scene);
  windowPlane.position = new Vector3(0.7, 3.25, 4.38);
  const windowMaterial = material(scene, "skyWindowMaterial", "#FFFFFF");
  windowMaterial.diffuseTexture = new Texture(generatedWindowUrl, scene);
  windowMaterial.diffuseTexture.hasAlpha = false;
  windowMaterial.backFaceCulling = false;
  windowPlane.material = windowMaterial;
  const windowOverlayPlane = CreatePlane("windowMoodOverlay", { width: 5.68, height: 3.13 }, scene);
  windowOverlayPlane.position = new Vector3(0.7, 3.25, 4.35);
  const windowOverlay = material(scene, "windowMoodOverlayMaterial", "#F6A1A7", 0.16);
  windowOverlay.backFaceCulling = false;
  windowOverlayPlane.material = windowOverlay;
  [
    [-2.2, 3.25, 4.25, 0.12, 3.45, 0.18], [3.6, 3.25, 4.25, 0.12, 3.45, 0.18],
    [0.7, 1.68, 4.25, 5.95, 0.12, 0.18], [0.7, 4.82, 4.25, 5.95, 0.12, 0.18],
  ].forEach(([x, y, z, w, h, d], index) => box(scene, `windowFrame${index}`, w, h, d, new Vector3(x, y, z), cream));
  register("window", windowPlane, new Vector3(0.7, 3.25, 3.3), halo(scene, "windowHalo", new Vector3(0.7, 1.78, 3.2), "#B698FF"));

  // Desk, chair, and core productivity objects.
  box(scene, "deskTop", 5.7, 0.22, 2.15, new Vector3(0.35, 1.48, 1.45), warmWood);
  [-2.15, 2.85].forEach((x, index) => {
    box(scene, `deskLeg${index}`, 0.26, 1.45, 0.26, new Vector3(x, 0.72, 1.45), warmWood);
    box(scene, `deskLegBack${index}`, 0.26, 1.45, 0.26, new Vector3(x, 0.72, 2.22), warmWood);
  });
  box(scene, "chairSeat", 1.25, 0.2, 1.15, new Vector3(0.2, 0.9, -0.05), lavenderDark);
  box(scene, "chairBack", 1.22, 1.25, 0.18, new Vector3(0.2, 1.55, 0.42), lavender);
  cylinder(scene, "chairStem", 0.13, 0.78, new Vector3(0.2, 0.48, -0.05), charcoal);
  box(scene, "chairBase", 1.2, 0.08, 0.15, new Vector3(0.2, 0.1, -0.05), charcoal);
  box(scene, "chairBaseSide", 0.15, 0.08, 1.2, new Vector3(0.2, 0.1, -0.05), charcoal);

  const laptopBase = box(scene, "computer", 1.62, 0.14, 1.05, new Vector3(-0.8, 1.71, 1.28), charcoal);
  const laptopScreen = CreatePlane("laptopScreen", { width: 1.45, height: 0.92 }, scene);
  laptopScreen.position = new Vector3(-0.8, 2.2, 1.74);
  laptopScreen.rotation.x = -0.16;
  const laptopScreenMat = material(scene, "laptopScreenMat", "#7264A2");
  laptopScreenMat.emissiveColor = Color3.FromHexString("#6B5CAA");
  laptopScreen.material = laptopScreenMat;
  register("computer", laptopBase, new Vector3(-0.8, 1.85, 1.15), halo(scene, "computerHalo", new Vector3(-0.8, 1.62, 1.28), "#FFB26F"));

  const calendarBody = box(scene, "calendar", 0.64, 0.75, 0.18, new Vector3(1.45, 2.02, 1.5), cream);
  box(scene, "calendarTop", 0.68, 0.12, 0.2, new Vector3(1.45, 2.35, 1.5), blush);
  [1.78, 2.03, 2.28].forEach((y, index) => box(scene, `calendarLine${index}`, 0.42, 0.035, 0.025, new Vector3(1.45, y, 1.37), lavender));
  register("calendar", calendarBody, new Vector3(1.45, 2.05, 1.18), halo(scene, "calendarHalo", new Vector3(1.45, 1.62, 1.45), "#FF8CB1"));

  const clockBody = cylinder(scene, "pomodoro", 0.66, 0.2, new Vector3(0.55, 1.75, 1.2), lavenderDark);
  const clockFace = CreateCylinder("pomodoroFace", { diameter: 0.57, height: 0.06, tessellation: 32 }, scene);
  clockFace.position = new Vector3(0.55, 1.87, 1.2);
  clockFace.material = cream;
  const clockDot = CreateSphere("clockDot", { diameter: 0.12, segments: 16 }, scene);
  clockDot.position = new Vector3(0.55, 1.92, 1.2);
  clockDot.material = amber;
  register("pomodoro", clockBody, new Vector3(0.55, 1.88, 1.05), halo(scene, "clockHalo", new Vector3(0.55, 1.62, 1.2), "#FFD071"));

  const coffeeCup = cylinder(scene, "coffee", 0.36, 0.35, new Vector3(-2.0, 1.76, 1.18), cream);
  const coffeeTop = cylinder(scene, "coffeeTop", 0.31, 0.025, new Vector3(-2.0, 1.95, 1.18), charcoal);
  [0, 1, 2].forEach((index) => {
    const steam = CreateSphere(`steam${index}`, { diameter: 0.12, segments: 12 }, scene);
    steam.position = new Vector3(-2.0 + index * 0.07, 2.12 + index * 0.1, 1.18);
    steam.material = glass;
    animated.push({ mesh: steam, base: steam.position.clone(), phase: index * 0.8, range: 0.18 });
  });
  register("coffee", coffeeCup, new Vector3(-2.0, 1.85, 0.9), halo(scene, "coffeeHalo", new Vector3(-2.0, 1.62, 1.18), "#FFA96C"));

  // Bookshelf, habits plant, desk lamp and statistics board.
  const shelfBody = box(scene, "bookshelf", 1.85, 3.0, 0.5, new Vector3(-4.15, 1.5, 3.88), warmWood);
  [0.58, 1.35, 2.12].forEach((y, shelfIndex) => {
    box(scene, `shelf${shelfIndex}`, 1.65, 0.1, 0.58, new Vector3(-4.15, y, 3.58), creamDark);
    [-0.48, -0.12, 0.26, 0.52].forEach((offset, bookIndex) => box(scene, `book${shelfIndex}-${bookIndex}`, 0.22, 0.48, 0.34, new Vector3(-4.15 + offset, y + 0.28, 3.49), [lavender, blush, mint, cream][(shelfIndex + bookIndex) % 4]));
  });
  register("bookshelf", shelfBody, new Vector3(-3.9, 1.55, 3.0), halo(scene, "bookshelfHalo", new Vector3(-4.15, 0.16, 3.15), "#B698FF"));

  const pot = cylinder(scene, "plant", 0.46, 0.5, new Vector3(2.55, 1.75, 1.55), creamDark);
  [0, 1, 2, 3, 4].forEach((index) => {
    const leaf = CreateSphere(`plantLeaf${index}`, { diameter: 0.38, segments: 16 }, scene);
    leaf.position = new Vector3(2.55 + Math.cos(index * 1.26) * 0.28, 2.13 + (index % 2) * 0.12, 1.55 + Math.sin(index * 1.26) * 0.28);
    leaf.scaling = new Vector3(0.65, 1.5, 0.65);
    leaf.material = mint;
    animated.push({ mesh: leaf, base: leaf.position.clone(), phase: index * 0.75, range: 0.045 });
  });
  register("plant", pot, new Vector3(2.55, 2.1, 1.2), halo(scene, "plantHalo", new Vector3(2.55, 1.62, 1.55), "#8FE0AF"));

  const lampBase = cylinder(scene, "lampBase", 0.45, 0.12, new Vector3(-2.75, 1.62, 1.7), charcoal);
  const lampStem = box(scene, "lampStem", 0.09, 0.85, 0.09, new Vector3(-2.75, 2.02, 1.7), charcoal);
  const lampShade = CreateSphere("lampShade", { diameter: 0.5, segments: 16 }, scene);
  lampShade.position = new Vector3(-2.65, 2.45, 1.65);
  lampShade.material = amber;
  const board = box(scene, "statistics", 1.55, 1.2, 0.08, new Vector3(-2.95, 3.05, 4.33), glass);
  [2.75, 3.05, 3.35].forEach((y, index) => box(scene, `statLine${index}`, 0.9 - index * 0.12, 0.055, 0.04, new Vector3(-3.05, y, 4.24), [amber, lavender, blush][index]));
  register("statistics", board, new Vector3(-2.95, 3.0, 3.35), halo(scene, "boardHalo", new Vector3(-2.95, 2.35, 3.1), "#FFB26F"));

  return { windowOverlay, accentMaterials: accents, animated };
}
