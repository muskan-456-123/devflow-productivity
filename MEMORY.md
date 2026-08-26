# DreamDesk Build Memory

- The user supplied two room images as mood references: one soft pastel diorama and one warm illustrated sunset study. They are reference-only and must not be copied.
- The attached DreamDesk brief asks for a 3D productivity room rather than a conventional dashboard. The first milestone is the main interactive room and dashboard objects, not full game progression or ambient audio.
- A custom DreamDesk visual target was generated at `/manus-storage/dreamdesk-visual-target_6b858708.png`. Use it for palette, density, and isometric camera QA only.
- The safest first implementation uses procedural meshes plus a React HUD. Avoid GLB imports, physics, pointer lock, background audio, and complex camera rails in the initial milestone.
- The previous DevFlow dashboard is an earlier project direction. DreamDesk replaces the home route but retains Task 1 requirements: responsiveness, navigation, user/profile context, task/project visibility, progress, search/filter behavior, and dynamic loading/empty/error states.
