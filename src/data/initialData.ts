import { Goal, Habit, HealthStats, NutritionData, Task, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Mercer',
  level: 18,
  levelTitle: 'Consistency Machine',
  currentXp: 18450,
  targetXp: 20000,
  streakDays: 14,
  focusHours: 32,
  tasksCompleted: 128,
  dayScore: 82,
  memberStatus: 'Pro Member',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEJd1XiabMXT1YLWPuPIhRRYPm9sjua8hUNCZtawuUpNsiI8d72_N635PUnG2zaeD66GHJzMpbqOM7h5mH8nXRXyR7Iz-R7-h7eihJTJK-LgtExwt50g_bWScL2MqNtW6W6_VDWSYYinOSscK6DPnSOIxgGCUVtzU-tLEdYZKUB12Tn81avhY0XhSaqBhwKPqgKxOrW_Vo1baCgIEHyt24vOq6EfNV4f2S-usC25JwCVUfo6YgpfWD',
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Finish documentation',
    category: 'Project',
    dueDate: 'Today',
    priority: 'high',
    completed: false,
  },
  {
    id: 't-2',
    title: 'AI Study session',
    category: 'Study',
    dueDate: 'Today',
    priority: 'medium',
    completed: false,
  },
  {
    id: 't-3',
    title: 'Buy groceries',
    category: 'Personal',
    dueDate: 'Tomorrow',
    priority: 'low',
    completed: false,
  },
  {
    id: 't-4',
    title: 'Review weekly budget',
    category: 'Personal',
    dueDate: 'Upcoming',
    priority: 'medium',
    completed: false,
  },
  {
    id: 't-5',
    title: 'Complete project documentation',
    category: 'Project',
    dueDate: 'Today',
    priority: 'high',
    completed: true,
  },
];

export const INITIAL_NUTRITION: NutritionData = {
  currentCalories: 1680,
  targetCalories: 2200,
  proteinCurrent: 112,
  proteinTarget: 150,
  carbsCurrent: 180,
  carbsTarget: 220,
  fatCurrent: 48,
  fatTarget: 65,
};

export const INITIAL_HEALTH: HealthStats = {
  hydrationCurrentLiters: 1.8,
  hydrationTargetLiters: 3.0,
  weightKg: 72,
  stepsToday: 8420,
  sleepAvgString: '7h 15m',
  sleepDays: [
    { day: 'M', hours: 7.0 },
    { day: 'T', hours: 6.5 },
    { day: 'W', hours: 8.5 },
    { day: 'T', hours: 7.5, isToday: true },
    { day: 'F', hours: 6.0 },
    { day: 'S', hours: 8.0 },
    { day: 'S', hours: 7.2 },
  ],
  workouts: [
    {
      id: 'w-1',
      title: 'Push Day',
      day: 'Monday',
      duration: '45m',
      exercises: ['Bench Press 4x8', 'Incline DB Press 3x10', 'Lateral Raises 4x12', 'Tricep Pushdowns 3x15'],
    },
    {
      id: 'w-2',
      title: 'Pull Day',
      day: 'Wednesday',
      duration: '50m',
      exercises: ['Barbell Deadlift 3x5', 'Pull-ups 4x8', 'Chest Supported Row 3x10', 'Bicep Hammer Curls 3x12'],
    },
  ],
};

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'g-1',
    title: 'Get Fitter',
    targetDescription: '75kg → 68kg',
    startValue: '75kg',
    targetValue: '68kg',
    currentProgress: 78,
    iconName: 'directions_run',
    category: 'fitness',
  },
  {
    id: 'g-2',
    title: 'Learn AI',
    targetDescription: 'Complete PyTorch Course',
    currentProgress: 45,
    iconName: 'psychology',
    category: 'learning',
  },
  {
    id: 'g-3',
    title: 'Save Money',
    targetDescription: 'Emergency Fund Target',
    currentProgress: 90,
    iconName: 'savings',
    category: 'finance',
  },
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h-1',
    title: 'Workout',
    subtitle: '45 mins weights',
    streakDays: 14,
    completedToday: true,
    history: [true, true, true, true, false, false, false],
  },
  {
    id: 'h-2',
    title: 'Drink 3L Water',
    subtitle: '1.5L / 3L completed',
    streakDays: 3,
    completedToday: false,
    history: [true, true, true, true, false, false, false],
  },
  {
    id: 'h-3',
    title: 'Study 2 hours',
    subtitle: 'Focus block',
    streakDays: 5,
    completedToday: false,
    history: [true, true, true, true, false, false, false],
  },
  {
    id: 'h-4',
    title: 'Read 10 pages',
    subtitle: 'Non-fiction',
    streakDays: 12,
    completedToday: false,
    history: [true, true, true, true, false, false, false],
  },
];
