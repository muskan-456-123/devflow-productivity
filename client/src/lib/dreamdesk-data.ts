/**
 * DreamDesk data vocabulary: room objects are productivity destinations, never anonymous decorative meshes.
 */
import type { Task } from "./dashboard-data";

export type DreamDeskTarget = "room" | "computer" | "calendar" | "pomodoro" | "bookshelf" | "plant" | "coffee" | "window" | "statistics";
export type DreamMood = "morning" | "sunset" | "night" | "rain" | "cozy";

export const dreamDeskLabels: Record<DreamDeskTarget, { title: string; subtitle: string }> = {
  room: { title: "DreamDesk", subtitle: "A quiet room above the clouds" },
  computer: { title: "Desk computer", subtitle: "Tasks & projects" },
  calendar: { title: "Paper calendar", subtitle: "Schedule & deadlines" },
  pomodoro: { title: "Focus clock", subtitle: "A protected 25-minute block" },
  bookshelf: { title: "Bookshelf", subtitle: "Notes & reference cards" },
  plant: { title: "Habit plant", subtitle: "Small actions, steady roots" },
  coffee: { title: "Coffee cup", subtitle: "Take a deliberate break" },
  window: { title: "Sky window", subtitle: "Change the room’s mood" },
  statistics: { title: "Wall board", subtitle: "Your work rhythm" },
};

export const dreamNavigation: Array<{ key: DreamDeskTarget; label: string }> = [
  { key: "room", label: "Home" },
  { key: "computer", label: "Tasks" },
  { key: "calendar", label: "Calendar" },
  { key: "bookshelf", label: "Notes" },
  { key: "plant", label: "Habits" },
  { key: "statistics", label: "Stats" },
];

export const moodLabels: Array<{ key: DreamMood; label: string; short: string }> = [
  { key: "morning", label: "Morning", short: "AM" },
  { key: "sunset", label: "Sunset", short: "PM" },
  { key: "night", label: "Night", short: "MO" },
  { key: "rain", label: "Rain", short: "RN" },
  { key: "cozy", label: "Cozy", short: "CZ" },
];

export type RoomChapter = {
  level: number;
  title: string;
  nextTitle: string | null;
  reward: string;
  summary: string;
};

export const roomChapters: RoomChapter[] = [
  { level: 0, title: "First Light", nextTitle: "Screen Bloom", reward: "A quiet room ready for the first meaningful action.", summary: "Complete one task to wake the desk." },
  { level: 1, title: "Screen Bloom", nextTitle: "Green Corner", reward: "The laptop glows warmer with a lit keyboard and desk marker.", summary: "One small loop brought the desk to life." },
  { level: 2, title: "Green Corner", nextTitle: "Better Seat", reward: "New leaves and a small book stack make the desk feel cared for.", summary: "The room is taking root with you." },
  { level: 3, title: "Better Seat", nextTitle: "Collected Desk", reward: "A soft cushion and headrest detail make the chair more supportive.", summary: "Your work now has a more comfortable place to land." },
  { level: 4, title: "Collected Desk", nextTitle: "Skyline Finish", reward: "A pencil cup, desk card, and warm detail make the space yours.", summary: "The room is gathering your good habits." },
  { level: 5, title: "Skyline Finish", nextTitle: null, reward: "Window lights and floating sky motes complete the DreamDesk.", summary: "Every available room upgrade is glowing." },
];

export function getRoomChapter(completedCount: number): RoomChapter {
  return roomChapters[Math.max(0, Math.min(roomChapters.length - 1, completedCount))];
}

export const dreamTasks: Task[] = [
  { id: 1, title: "Polish keyboard navigation for command palette", project: "Atlas", status: "In progress", priority: "High", due: "Today", estimate: "45m", assignee: "Ava Chen", initials: "AC", color: "#FF8A5B", tags: ["Frontend", "A11y"] },
  { id: 2, title: "Map quiet loading states for the activity feed", project: "Pulse", status: "Ready", priority: "Medium", due: "Today", estimate: "1h 20m", assignee: "Milo Reed", initials: "MR", color: "#8D91E8", tags: ["API", "Research"] },
  { id: 3, title: "Untangle filter persistence after refresh", project: "Atlas", status: "Blocked", priority: "High", due: "Tomorrow", estimate: "30m", assignee: "Ava Chen", initials: "AC", color: "#FF8A5B", tags: ["Bug", "State"] },
  { id: 4, title: "Write the Relay mobile handoff checklist", project: "Relay", status: "Ready", priority: "Low", due: "Thu, 19 Sep", estimate: "25m", assignee: "June Park", initials: "JP", color: "#7EBAA0", tags: ["Planning"] },
  { id: 5, title: "Close the empty-state review notes", project: "Relay", status: "Done", priority: "Low", due: "Complete", estimate: "20m", assignee: "June Park", initials: "JP", color: "#7EBAA0", tags: ["UX", "Content"] },
];
