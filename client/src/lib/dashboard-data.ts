/**
 * Kinetic Workbench data layer: deliberate, human project language and compact task metadata.
 */
export type TaskStatus = "In progress" | "Ready" | "Blocked" | "Done";

export type Task = {
  id: number;
  title: string;
  project: "Atlas" | "Pulse" | "Relay";
  status: TaskStatus;
  priority: "High" | "Medium" | "Low";
  due: string;
  estimate: string;
  assignee: string;
  initials: string;
  color: string;
  tags: string[];
};

export const navigation = [
  { label: "Today", key: "today" },
  { label: "Projects", key: "projects" },
  { label: "My tasks", key: "tasks" },
  { label: "Activity", key: "activity" },
] as const;

export const projects = [
  {
    id: "Atlas",
    label: "ATLAS",
    name: "Atlas Console",
    description: "Ship the observability layer for teams who build in motion.",
    progress: 74,
    color: "#FF6B2C",
    update: "3 tasks in motion",
  },
  {
    id: "Pulse",
    label: "PULSE",
    name: "Pulse API",
    description: "Make every health signal easier to trust and act on.",
    progress: 52,
    color: "#8CAAC0",
    update: "Release review Friday",
  },
  {
    id: "Relay",
    label: "RELAY",
    name: "Relay Mobile",
    description: "Turn field notes into a faster handoff across the product team.",
    progress: 28,
    color: "#6F9580",
    update: "Discovery in progress",
  },
];

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Add keyboard navigation to command palette",
    project: "Atlas",
    status: "In progress",
    priority: "High",
    due: "Today",
    estimate: "45m",
    assignee: "Ava Chen",
    initials: "AC",
    color: "#FF6B2C",
    tags: ["Frontend", "A11y"],
  },
  {
    id: 2,
    title: "Map API timeout states for the activity feed",
    project: "Pulse",
    status: "Ready",
    priority: "Medium",
    due: "Today",
    estimate: "1h 20m",
    assignee: "Milo Reed",
    initials: "MR",
    color: "#8CAAC0",
    tags: ["API", "Research"],
  },
  {
    id: 3,
    title: "Resolve filter persistence after page refresh",
    project: "Atlas",
    status: "Blocked",
    priority: "High",
    due: "Tomorrow",
    estimate: "30m",
    assignee: "Ava Chen",
    initials: "AC",
    color: "#FF6B2C",
    tags: ["Frontend", "Bug"],
  },
  {
    id: 4,
    title: "Prepare the mobile handoff checklist",
    project: "Relay",
    status: "Ready",
    priority: "Low",
    due: "Thu, 19 Sep",
    estimate: "25m",
    assignee: "June Park",
    initials: "JP",
    color: "#6F9580",
    tags: ["Planning"],
  },
  {
    id: 5,
    title: "Tighten empty-state language in project settings",
    project: "Relay",
    status: "Done",
    priority: "Low",
    due: "Complete",
    estimate: "20m",
    assignee: "June Park",
    initials: "JP",
    color: "#6F9580",
    tags: ["Content", "UX"],
  },
];

export const focusHours = [
  { day: "M", value: 52 },
  { day: "T", value: 76 },
  { day: "W", value: 68 },
  { day: "T", value: 94 },
  { day: "F", value: 58 },
  { day: "S", value: 31 },
  { day: "S", value: 39 },
];
