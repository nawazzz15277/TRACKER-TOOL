/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Goal, Habit, HealthStats, NutritionData, PriorityType, TabType, Task, TaskCategory, UserProfile } from './types';
import {
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_HEALTH,
  INITIAL_NUTRITION,
  INITIAL_TASKS,
  INITIAL_USER,
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CalendarModal } from './components/CalendarModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { GoalsScreen } from './components/screens/GoalsScreen';
import { HabitsScreen } from './components/screens/HabitsScreen';
import { MoreScreen } from './components/screens/MoreScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Persistent State with Local Storage fallback
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lifeos_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('lifeos_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [nutrition, setNutrition] = useState<NutritionData>(() => {
    const saved = localStorage.getItem('lifeos_nutrition');
    return saved ? JSON.parse(saved) : INITIAL_NUTRITION;
  });

  const [health, setHealth] = useState<HealthStats>(() => {
    const saved = localStorage.getItem('lifeos_health');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('lifeos_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('lifeos_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('lifeos_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lifeos_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lifeos_nutrition', JSON.stringify(nutrition));
  }, [nutrition]);

  useEffect(() => {
    localStorage.setItem('lifeos_health', JSON.stringify(health));
  }, [health]);

  useEffect(() => {
    localStorage.setItem('lifeos_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('lifeos_habits', JSON.stringify(habits));
  }, [habits]);

  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          // Award XP and task count when completed
          if (nextCompleted) {
            setUser((u) => ({
              ...u,
              currentXp: Math.min(u.targetXp, u.currentXp + 50),
              tasksCompleted: u.tasksCompleted + 1,
              dayScore: Math.min(100, u.dayScore + 2),
            }));
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const handleAddTask = (
    title: string,
    priority: PriorityType,
    category: TaskCategory,
    dueDate: string
  ) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title,
      category,
      dueDate,
      priority,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleAddWater = (amountMl: number) => {
    const litersToAdd = amountMl / 1000;
    setHealth((prev) => ({
      ...prev,
      hydrationCurrentLiters: Math.min(
        prev.hydrationTargetLiters + 1.5,
        Number((prev.hydrationCurrentLiters + litersToAdd).toFixed(2))
      ),
    }));
    setUser((u) => ({
      ...u,
      currentXp: Math.min(u.targetXp, u.currentXp + 20),
    }));
  };

  const handleUpdateNutrition = (
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ) => {
    setNutrition({
      currentCalories: calories,
      targetCalories: 2200,
      proteinCurrent: protein,
      proteinTarget: 150,
      carbsCurrent: carbs,
      carbsTarget: 220,
      fatCurrent: fat,
      fatTarget: 65,
    });
  };

  const handleAddStepCount = (steps: number) => {
    setHealth((prev) => ({
      ...prev,
      stepsToday: prev.stepsToday + steps,
    }));
  };

  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextVal = !h.completedToday;
          if (nextVal) {
            setUser((u) => ({
              ...u,
              currentXp: Math.min(u.targetXp, u.currentXp + 75),
              dayScore: Math.min(100, u.dayScore + 3),
            }));
          }
          return {
            ...h,
            completedToday: nextVal,
            streakDays: nextVal ? h.streakDays + 1 : Math.max(1, h.streakDays - 1),
          };
        }
        return h;
      })
    );
  };

  const handleAddHabit = (habit: Habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const handleAddGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#1a1c1c] flex flex-col antialiased selection:bg-[#ff6b00] selection:text-white">
      {/* Top App Bar */}
      <Header
        currentTab={currentTab}
        user={user}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onNavigateTab={(t) => setCurrentTab(t)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeScreen
            tasks={tasks}
            nutrition={nutrition}
            health={health}
            onToggleTask={handleToggleTask}
            onNavigateTab={(t) => setCurrentTab(t)}
          />
        )}

        {currentTab === 'tasks' && (
          <TasksScreen
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentTab === 'health' && (
          <HealthScreen
            nutrition={nutrition}
            health={health}
            onAddWater={handleAddWater}
            onUpdateNutrition={handleUpdateNutrition}
            onAddStepCount={handleAddStepCount}
          />
        )}

        {currentTab === 'goals' && (
          <GoalsScreen
            goals={goals}
            user={user}
            onNavigateTab={(t) => setCurrentTab(t)}
            onAddGoal={handleAddGoal}
          />
        )}

        {currentTab === 'habits' && (
          <HabitsScreen
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onAddHabit={handleAddHabit}
          />
        )}

        {currentTab === 'more' && (
          <MoreScreen user={user} onUpdateUser={handleUpdateUser} />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={(t) => setCurrentTab(t)} />

      {/* Calendar Date Picker Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
