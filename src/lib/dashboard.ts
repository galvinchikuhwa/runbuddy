import {
  Activity,
  Bot,
  CalendarRange,
  Flame,
  Gauge,
  Route,
  Trophy,
} from "lucide-react";

export const dashboardNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Log Run", href: "/run-log", icon: Route },
  { label: "AI Coach", href: "#phase-6", icon: Bot },
  { label: "Progress", href: "#phase-7", icon: Activity },
];

export const dashboardStats = [
  {
    title: "This Week",
    value: "42.6 km",
    change: "+12% vs last week",
    icon: Route,
  },
  {
    title: "Avg Pace",
    value: "5:04 /km",
    change: "Steady across 6 sessions",
    icon: Gauge,
  },
  {
    title: "Consistency",
    value: "18 days",
    change: "Current running streak",
    icon: Flame,
  },
  {
    title: "Goal Progress",
    value: "84%",
    change: "Toward sub-45 10K target",
    icon: Trophy,
  },
];

export const weeklyTrendData = [
  { day: "Mon", distance: 6.2, fatigue: 3 },
  { day: "Tue", distance: 8.5, fatigue: 5 },
  { day: "Wed", distance: 0, fatigue: 2 },
  { day: "Thu", distance: 10.1, fatigue: 6 },
  { day: "Fri", distance: 5.4, fatigue: 4 },
  { day: "Sat", distance: 12.8, fatigue: 7 },
  { day: "Sun", distance: 0, fatigue: 2 },
];

export const recentRuns = [
  {
    id: 1,
    date: "2025-06-14",
    workout: "Long Run",
    distance: "12.8 km",
    pace: "5:18 /km",
    fatigue: "7/10",
  },
  {
    id: 2,
    date: "2025-06-13",
    workout: "Recovery",
    distance: "5.4 km",
    pace: "5:42 /km",
    fatigue: "4/10",
  },
  {
    id: 3,
    date: "2025-06-12",
    workout: "Tempo",
    distance: "10.1 km",
    pace: "4:48 /km",
    fatigue: "6/10",
  },
  {
    id: 4,
    date: "2025-06-10",
    workout: "Intervals",
    distance: "8.5 km",
    pace: "4:36 /km",
    fatigue: "5/10",
  },
];

export const weeklySummary = [
  { label: "Runs completed", value: "6" },
  { label: "Time on feet", value: "3h 37m" },
  { label: "Best workout", value: "10.1 km tempo" },
  { label: "Recovery score", value: "Good" },
];

export const lifetimeSummary = [
  { label: "Total distance", value: "1,284 km" },
  { label: "Logged runs", value: "163" },
  { label: "Fastest 5K", value: "21:48" },
  { label: "Longest run", value: "24.2 km" },
];

export const coachSuggestion = {
  title: "Daily AI Suggestion",
  body: "Keep tomorrow easy. Your fatigue trend rose after the long run, so a 30-minute recovery jog plus mobility will support adaptation without compromising consistency.",
  focus: "Recommended focus: recovery + cadence drills",
};

export const overviewHighlights = [
  {
    label: "Training block",
    value: "10K Build",
    icon: CalendarRange,
  },
  {
    label: "Next key session",
    value: "6 x 800m @ 10K pace",
    icon: Activity,
  },
];
