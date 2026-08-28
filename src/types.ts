export type TabType = 'home' | 'tasks' | 'health' | 'goals' | 'more' | 'habits';

export type PriorityType = 'high' | 'medium' | 'low';

export type TaskCategory = 'Project' | 'Study' | 'Personal' | 'Work' | 'Fitness';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  dueDate: 'Today' | 'Tomorrow' | 'Upcoming' | string;
  priority: PriorityType;
  completed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  subtitle: string;
  streakDays: number;
  completedToday: boolean;
  history: boolean[]; // last 7 days
}

export interface Goal {
  id: string;
  title: string;
  targetDescription: string;
  currentProgress: number; // percentage e.g. 78
  iconName: string;
  category: 'fitness' | 'learning' | 'finance' | 'personal';
  startValue?: string;
  targetValue?: string;
}

export interface NutritionData {
  currentCalories: number;
  targetCalories: number;
  proteinCurrent: number;
  proteinTarget: number;
  carbsCurrent: number;
  carbsTarget: number;
  fatCurrent: number;
  fatTarget: number;
}

export interface HealthStats {
  hydrationCurrentLiters: number;
  hydrationTargetLiters: number;
  weightKg: number;
  stepsToday: number;
  sleepAvgString: string;
  sleepDays: { day: string; hours: number; isToday?: boolean }[];
  workouts: { id: string; title: string; day: string; duration: string; exercises?: string[] }[];
}

export interface UserProfile {
  name: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  targetXp: number;
  streakDays: number;
  focusHours: number;
  tasksCompleted: number;
  dayScore: number;
  memberStatus: string;
  avatarUrl: string;
}

export type ActiveToolType = 'study' | 'journal' | 'finance' | 'coach' | 'analytics' | 'settings' | null;
