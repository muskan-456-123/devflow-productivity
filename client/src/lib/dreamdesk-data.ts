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

export const dreamTasks: Task[] = [
  { id: 1, title: "Polish keyboard navigation for command palette", project: "Atlas", status: "In progress", priority: "High", due: "Today", estimate: "45m", assignee: "Ava Chen", initials: "AC", color: "#FF8A5B", tags: ["Frontend", "A11y"] },
  { id: 2, title: "Map quiet loading states for the activity feed", project: "Pulse", status: "Ready", priority: "Medium", due: "Today", estimate: "1h 20m", assignee: "Milo Reed", initials: "MR", color: "#8D91E8", tags: ["API", "Research"] },
  { id: 3, title: "Untangle filter persistence after refresh", project: "Atlas", status: "Blocked", priority: "High", due: "Tomorrow", estimate: "30m", assignee: "Ava Chen", initials: "AC", color: "#FF8A5B", tags: ["Bug", "State"] },
  { id: 4, title: "Write the Relay mobile handoff checklist", project: "Relay", status: "Ready", priority: "Low", due: "Thu, 19 Sep", estimate: "25m", assignee: "June Park", initials: "JP", color: "#7EBAA0", tags: ["Planning"] },
  { id: 5, title: "Close the empty-state review notes", project: "Relay", status: "Done", priority: "Low", due: "Complete", estimate: "20m", assignee: "June Park", initials: "JP", color: "#7EBAA0", tags: ["UX", "Content"] },
];
