import React from 'react';
import { HealthStats, NutritionData, TabType, Task } from '../../types';

interface HomeScreenProps {
  tasks: Task[];
  nutrition: NutritionData;
  health: HealthStats;
  onToggleTask: (taskId: string) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tasks,
  nutrition,
  health,
  onToggleTask,
  onNavigateTab,
}) => {
  // Top 3 tasks for today
  const top3Tasks = tasks.slice(0, 3);

  // Calculate circumference & offset for 78%
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.3
  const progressPercent = 78;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 space-y-6 py-4 pb-24 md:pb-8">
      {/* Daily Progress Section */}
      <section className="bg-white border border-[#e5e2e1] rounded-2xl p-6 sm:p-8 soft-shadow hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 mb-3">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="text-[#f4f3f2] stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              className="text-[#ff6b00] stroke-current progress-ring-path"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold text-[#1a1c1c] tracking-tight">
              {progressPercent}%
            </span>
            <span className="text-xs font-semibold text-[#5f5e5e] tracking-wider uppercase mt-0.5">
              Daily Goal
            </span>
          </div>
        </div>
        <p className="text-lg sm:text-xl font-semibold text-[#1a1c1c]">
          You're having a productive day.
        </p>
      </section>

      {/* Today's Top 3 */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-semibold text-[#5f5e5e] tracking-wider uppercase">
            Today's Top 3
          </h2>
          <button
            onClick={() => onNavigateTab('tasks')}
            className="text-xs font-semibold text-[#ff6b00] hover:text-[#a04100] transition-colors flex items-center gap-0.5"
          >
            View all tasks
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {top3Tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className="bg-white border border-[#e5e2e1] rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 soft-shadow hover:shadow-[0px_8px_24px_rgba(0,0,0,0.06)] transition-all cursor-pointer group"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                  task.completed
                    ? 'bg-[#ff6b00] border-2 border-[#ff6b00] text-white'
                    : 'border-2 border-[#e2bfb0] bg-transparent group-hover:border-[#ff6b00]'
                }`}
              >
                {task.completed && (
                  <span className="material-symbols-outlined text-base icon-fill leading-none">
                    check
                  </span>
                )}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span
                  className={`text-base font-normal transition-colors ${
                    task.completed
                      ? 'text-[#5f5e5e] line-through opacity-70'
                      : 'text-[#1a1c1c] font-medium'
                  }`}
                >
                  {task.title}
                </span>
                <span className="text-[11px] font-semibold text-[#5a4136] bg-[#f4f3f2] px-2 py-0.5 rounded-md">
                  {task.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Overview */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-semibold text-[#5f5e5e] tracking-wider uppercase">
            Health Overview
          </h2>
          <button
            onClick={() => onNavigateTab('health')}
            className="text-xs font-semibold text-[#ff6b00] hover:text-[#a04100] transition-colors flex items-center gap-0.5"
          >
            Details
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Calories */}
          <div
            onClick={() => onNavigateTab('health')}
            className="bg-white border border-[#e5e2e1] rounded-xl p-3.5 soft-shadow hover:shadow-[0px_8px_20px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between h-28 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                Calories
              </span>
              <span className="material-symbols-outlined text-[#ff6b00] text-xl icon-fill">
                local_fire_department
              </span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[#1a1c1c]">
                {nutrition.currentCalories.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#5f5e5e]">
                  / {nutrition.targetCalories.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[#f4f3f2] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#ff6b00] h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutrition.currentCalories / nutrition.targetCalories) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Water */}
          <div
            onClick={() => onNavigateTab('health')}
            className="bg-white border border-[#e5e2e1] rounded-xl p-3.5 soft-shadow hover:shadow-[0px_8px_20px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between h-28 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                Water
              </span>
              <span className="material-symbols-outlined text-blue-500 text-xl icon-fill">
                water_drop
              </span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[#1a1c1c]">
                {health.hydrationCurrentLiters}L{' '}
                <span className="text-xs font-normal text-[#5f5e5e]">
                  / {health.hydrationTargetLiters}L
                </span>
              </div>
              <div className="w-full bg-[#f4f3f2] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (health.hydrationCurrentLiters / health.hydrationTargetLiters) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sleep */}
          <div
            onClick={() => onNavigateTab('health')}
            className="bg-white border border-[#e5e2e1] rounded-xl p-3.5 soft-shadow hover:shadow-[0px_8px_20px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between h-28 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                Sleep
              </span>
              <span className="material-symbols-outlined text-indigo-500 text-xl icon-fill">
                bedtime
              </span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[#1a1c1c]">
                {health.sleepAvgString}
              </div>
              <p className="text-xs text-[#5f5e5e] mt-1">Quality: 88%</p>
            </div>
          </div>

          {/* Workout */}
          <div
            onClick={() => onNavigateTab('health')}
            className="bg-white border border-[#e5e2e1] rounded-xl p-3.5 soft-shadow hover:shadow-[0px_8px_20px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between h-28 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                Workout
              </span>
              <span className="material-symbols-outlined text-emerald-500 text-xl icon-fill">
                fitness_center
              </span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[#1a1c1c]">
                Push Day
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-1">Completed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
