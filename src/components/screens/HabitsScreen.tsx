import React, { useState } from 'react';
import { Habit } from '../../types';

interface HabitsScreenProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onAddHabit: (habit: Habit) => void;
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  onToggleHabit,
  onAddHabit,
}) => {
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [habitTitle, setHabitTitle] = useState('');
  const [habitSubtitle, setHabitSubtitle] = useState('');

  const remainingCount = habits.filter((h) => !h.completedToday).length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle.trim()) return;
    const newHabit: Habit = {
      id: `h-${Date.now()}`,
      title: habitTitle.trim(),
      subtitle: habitSubtitle.trim() || 'Daily habit',
      streakDays: 1,
      completedToday: false,
      history: [false, false, false, false, false, false, false],
    };
    onAddHabit(newHabit);
    setHabitTitle('');
    setHabitSubtitle('');
    setShowAddHabitModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 pb-24 md:pb-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Streak, Comp & Heatmap */}
        <section className="md:col-span-4 flex flex-col gap-4">
          {/* Main Streak Card */}
          <div className="bg-white border border-[#e5e2e1] rounded-2xl p-5 soft-shadow transition-all relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#ff6b00]/10 rounded-full blur-2xl pointer-events-none"></div>
            <h2 className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-2">
              CURRENT STREAK
            </h2>
            <div className="flex items-end gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-[#ff6b00] tracking-tight">
                14
              </span>
              <span className="text-xl font-bold text-[#1a1c1c] mb-1.5">days</span>
              <span className="text-3xl mb-1">🔥</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5f5e5e] mt-3 leading-relaxed">
              You're on fire! Keep it up for 7 more days to hit a new personal best.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#e5e2e1] rounded-2xl p-4 soft-shadow flex flex-col justify-between h-28">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                WEEKLY COMP.
              </span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#1a1c1c]">82%</span>
                <div className="w-full bg-[#f4f3f2] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#ff6b00] h-full rounded-full"
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e5e2e1] rounded-2xl p-4 soft-shadow flex flex-col justify-between h-28">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                BEST STREAK
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold text-[#1a1c1c]">21</span>
                <span className="material-symbols-outlined text-[#ff6b00] text-xl icon-fill">
                  emoji_events
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Heatmap */}
          <div className="bg-white border border-[#e5e2e1] rounded-2xl p-5 soft-shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                THIS WEEK
              </span>
              <span className="text-xs font-semibold text-[#ff6b00] cursor-pointer hover:underline">
                View Month
              </span>
            </div>

            <div className="flex justify-between">
              {/* Day M */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">M</span>
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/25 border border-[#ff6b00]/30"></div>
              </div>
              {/* Day T */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">T</span>
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/40 border border-[#ff6b00]/50"></div>
              </div>
              {/* Day W */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">W</span>
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00] border border-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.3)]"></div>
              </div>
              {/* Day T */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">T</span>
                <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/60 border border-[#ff6b00]/70"></div>
              </div>
              {/* Day F (Today) */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#1a1c1c]">F</span>
                <div className="w-8 h-8 rounded-lg bg-[#e3e2e1] border border-[#c8c6c5] flex items-center justify-center relative">
                  <div className="absolute w-1.5 h-1.5 bg-[#ff6b00] rounded-full bottom-1"></div>
                </div>
              </div>
              {/* Day S */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">S</span>
                <div className="w-8 h-8 rounded-lg bg-[#f4f3f2] border border-[#e5e2e1]"></div>
              </div>
              {/* Day S */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#5f5e5e]">S</span>
                <div className="w-8 h-8 rounded-lg bg-[#f4f3f2] border border-[#e5e2e1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Today's Habits */}
        <section className="md:col-span-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold text-[#1a1c1c]">Today's Habits</h2>
              <p className="text-xs text-[#5f5e5e] mt-0.5">
                {remainingCount} remaining
              </p>
            </div>
            <button
              onClick={() => setShowAddHabitModal(true)}
              className="bg-[#ff6b00] hover:bg-[#a04100] text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full elastic-pop flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              NEW HABIT
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                onClick={() => onToggleHabit(habit.id)}
                className="bg-white border border-[#e5e2e1] rounded-2xl p-4 soft-shadow hover:shadow-[0px_10px_28px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      habit.completedToday
                        ? 'bg-[#ff6b00] border-2 border-[#ff6b00] text-white'
                        : 'border-2 border-[#e2bfb0] bg-[#faf9f8] group-hover:border-[#ff6b00]'
                    }`}
                  >
                    {habit.completedToday ? (
                      <span className="material-symbols-outlined text-xl font-bold icon-fill">
                        check
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <h3
                      className={`text-base font-semibold transition-colors ${
                        habit.completedToday
                          ? 'line-through text-[#5f5e5e] opacity-70'
                          : 'text-[#1a1c1c]'
                      }`}
                    >
                      {habit.title}
                    </h3>
                    <p className="text-xs text-[#5f5e5e] mt-0.5">{habit.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                      STREAK
                    </span>
                    <span className="text-xs font-bold text-[#ff6b00]">
                      {habit.streakDays} days
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#5f5e5e] opacity-40 group-hover:opacity-100 transition-opacity">
                    more_vert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* New Habit Modal */}
      {showAddHabitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <h3 className="text-lg font-bold text-[#1a1c1c]">Create New Habit</h3>
              <button
                onClick={() => setShowAddHabitModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Habit Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Morning Meditation"
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Target / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10 minutes mindful breathing"
                  value={habitSubtitle}
                  onChange={(e) => setHabitSubtitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddHabitModal(false)}
                  className="px-4 py-2 bg-[#f4f3f2] text-[#5f5e5e] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-lg text-xs font-semibold"
                >
                  Add Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
