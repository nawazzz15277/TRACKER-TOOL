import React, { useState } from 'react';
import { Goal, TabType, UserProfile } from '../../types';

interface GoalsScreenProps {
  goals: Goal[];
  user: UserProfile;
  onNavigateTab: (tab: TabType) => void;
  onAddGoal: (goal: Goal) => void;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({
  goals,
  user,
  onNavigateTab,
  onAddGoal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProgress, setNewProgress] = useState(50);
  const [newIcon, setNewIcon] = useState('directions_run');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created: Goal = {
      id: `g-${Date.now()}`,
      title: newTitle.trim(),
      targetDescription: newDesc.trim() || 'Active Milestone Target',
      currentProgress: Math.min(100, Math.max(0, newProgress)),
      iconName: newIcon,
      category: 'personal',
    };
    onAddGoal(created);
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const xpPercent = Math.min(
    100,
    Math.round((user.currentXp / user.targetXp) * 100)
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 pb-24 md:pb-8 space-y-6">
      {/* XP & Gamification Section */}
      <section className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group border border-[#e5e2e1]">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff6b00]/10 rounded-full blur-3xl group-hover:bg-[#ff6b00]/20 transition-colors duration-700 pointer-events-none"></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1c1c]">
              Level {user.level}
            </h2>
            <p className="text-xs sm:text-sm text-[#5f5e5e] font-medium mt-0.5">
              {user.levelTitle}
            </p>
          </div>
          <div className="flex gap-2">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full bg-[#f4f3f2] shadow-sm text-[#ff6b00]"
              title="7 Day Streak Achieved"
            >
              <span className="material-symbols-outlined text-xl icon-fill">
                local_fire_department
              </span>
            </div>
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full bg-[#f4f3f2] shadow-sm text-[#ff6b00]"
              title="First Workout Completed"
            >
              <span className="material-symbols-outlined text-xl icon-fill">
                fitness_center
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4">
          <div className="flex justify-between text-xs font-semibold text-[#5f5e5e] tracking-wider uppercase mb-2">
            <span>XP PROGRESS</span>
            <span>
              {user.currentXp.toLocaleString()} / {user.targetXp.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-3 bg-[#e3e2e1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff6b00] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${xpPercent}%` }}
            ></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Active Goals Column */}
        <section className="md:col-span-7 space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold text-[#1a1c1c]">Active Goals</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab('habits')}
                className="text-xs font-semibold text-[#5f5e5e] hover:text-[#a04100] transition-colors"
              >
                View Habits
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-semibold text-[#ff6b00] hover:text-[#a04100] transition-colors flex items-center cursor-pointer"
              >
                + Add Goal
                <span className="material-symbols-outlined text-sm ml-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {goals.map((goal) => {
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const offset =
                circumference - (goal.currentProgress / 100) * circumference;

              return (
                <div
                  key={goal.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e2e1] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* Circular Progress Ring */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg
                        className="w-16 h-16 transform -rotate-90 text-[#ff6b00]"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="progress-ring-bg text-[#ff6b00]"
                          cx="50"
                          cy="50"
                          fill="none"
                          r={radius}
                          strokeWidth="8"
                        />
                        <circle
                          className="progress-ring-path"
                          cx="50"
                          cy="50"
                          fill="none"
                          r={radius}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#ff6b00] text-2xl icon-fill">
                          {goal.iconName}
                        </span>
                      </div>
                    </div>

                    {/* Goal Info */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base font-semibold text-[#1a1c1c]">
                        {goal.title}
                      </h3>
                      <p className="text-xs text-[#5f5e5e] mt-0.5">
                        {goal.targetDescription}
                      </p>
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex-grow h-1.5 bg-[#e3e2e1] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ff6b00] rounded-full transition-all duration-1000"
                            style={{ width: `${goal.currentProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-[#5f5e5e]">
                          {goal.currentProgress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Weekly Review & Trend Indicators Column */}
        <section className="md:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-[#1a1c1c]">Weekly Review</h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Productivity */}
            <div className="bg-white rounded-2xl p-4 border border-[#e5e2e1] shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
              <span className="material-symbols-outlined text-[#ff6b00] text-xl mb-1 icon-fill">
                bolt
              </span>
              <p className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                PRODUCTIVITY
              </p>
              <p className="text-2xl font-bold text-[#1a1c1c] mt-1">82%</p>
            </div>

            {/* Fitness */}
            <div className="bg-white rounded-2xl p-4 border border-[#e5e2e1] shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
              <span className="material-symbols-outlined text-[#ff6b00] text-xl mb-1 icon-fill">
                fitness_center
              </span>
              <p className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                FITNESS
              </p>
              <p className="text-2xl font-bold text-[#1a1c1c] mt-1">
                4 <span className="text-xs font-normal text-[#5f5e5e]">w/o</span>
              </p>
            </div>

            {/* Study Time with Soft Data Chart */}
            <div className="col-span-2 bg-white rounded-2xl p-4 border border-[#e5e2e1] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
              <div>
                <span className="material-symbols-outlined text-[#ff6b00] text-xl mb-1 icon-fill">
                  menu_book
                </span>
                <p className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                  STUDY TIME
                </p>
                <p className="text-2xl font-bold text-[#1a1c1c] mt-1">
                  14h <span className="text-lg font-semibold">20m</span>
                </p>
              </div>

              {/* Soft Data Chart Representation */}
              <div className="w-28 h-14 flex items-end justify-between gap-1.5 px-2">
                <div className="w-3.5 bg-[#ff6b00]/20 rounded-full h-[30%]"></div>
                <div className="w-3.5 bg-[#ff6b00]/40 rounded-full h-[60%]"></div>
                <div className="w-3.5 bg-[#ff6b00]/60 rounded-full h-[40%]"></div>
                <div className="w-3.5 bg-[#ff6b00]/80 rounded-full h-[80%]"></div>
                <div className="w-3.5 bg-[#ff6b00] rounded-full h-[100%] shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Trend Indicators */}
          <div className="space-y-2.5 mt-4">
            <h3 className="text-sm font-semibold text-[#1a1c1c]">Trend Indicators</h3>

            <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-[#e5e2e1] shadow-xs">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <span className="material-symbols-outlined text-sm font-bold">
                  arrow_upward
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1a1c1c] flex-grow">
                Study time increased <span className="font-bold text-emerald-700">18%</span> this week
              </p>
            </div>

            <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-[#e5e2e1] shadow-xs">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                <span className="material-symbols-outlined text-sm font-bold">
                  arrow_downward
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1a1c1c] flex-grow">
                Sleep consistency decreased <span className="font-bold text-red-700">7%</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <h3 className="text-lg font-bold text-[#1a1c1c]">Create New Goal</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read 12 Books"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Target Subtitle / Metric
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 book per month"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Current Progress ({newProgress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="w-full accent-[#ff6b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Icon
                </label>
                <div className="flex gap-2">
                  {['directions_run', 'psychology', 'savings', 'school', 'emoji_events'].map(
                    (ic) => (
                      <button
                        type="button"
                        key={ic}
                        onClick={() => setNewIcon(ic)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                          newIcon === ic
                            ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                            : 'bg-[#faf9f8] text-[#5f5e5e] border-[#e5e2e1]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{ic}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#f4f3f2] text-[#5f5e5e] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-lg text-xs font-semibold"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
