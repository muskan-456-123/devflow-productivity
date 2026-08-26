# Assets

**Art direction:** DreamDesk is a premium cozy developer study rendered as a compact isometric diorama. The room is warm cream, lavender, blush pink, twilight blue, and amber. It features a desk before a panoramic sky window, tidy book and plant details, a soft chair, translucent glass panels, and carefully limited magical glow. The room must remain legible as a productivity application: every interactive object has a small hovering symbol, a color halo on hover, and a clear dashboard purpose.

## Visual Targets

| Name | Description | Size | Image | Runtime role |
| --- | --- | --- | --- | --- |
| DreamDesk visual target | Generated reference frame showing the full buildable room, composition, palette, interactive desk objects, and floating navigation | 16:9, design reference | `/manus-storage/dreamdesk-visual-target_6b858708.png` | Visual QA target only; the room itself is procedural. |

## Procedural Room Asset Map

| Asset | Description | Size | Runtime role |
| --- | --- | --- | --- |
| Desk + laptop | Cream wood desk with a dark lavender laptop screen | 4.8m wide | `computer` opens Tasks & Projects. |
| Desk calendar | Standing page calendar with a blush header | 0.55m wide | `calendar` opens Calendar. |
| Pomodoro clock | Rounded lavender clock with amber ring | 0.5m wide | `pomodoro` opens Focus Timer. |
| Bookshelf | Low warm-wood shelf with individually colored books | 2.3m tall | `bookshelf` opens Notes. |
| Plant | Tapered cream planter and leaf cluster | 0.85m tall | `plant` opens Habits. |
| Coffee cup | Ceramic mug with animated steam discs | 0.3m wide | `coffee` opens Break Mode. |
| Panoramic window | Back wall frame with layered clouds and mountain cards | 5.5m wide | `window` opens room mood controls. |
| Wall progress board | Glass board with stamped stat glyphs | 1.1m wide | Visible productivity statistics and streaks. |
| Glass HUD | Floating translucent panel system using HTML/CSS | responsive viewport overlay | Navigation, tooltip, stats, and productivity drawers. |
