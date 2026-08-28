import React, { useState } from 'react';
import { HealthStats, NutritionData } from '../../types';

interface HealthScreenProps {
  nutrition: NutritionData;
  health: HealthStats;
  onAddWater: (amountMl: number) => void;
  onUpdateNutrition: (calories: number, protein: number, carbs: number, fat: number) => void;
  onAddStepCount: (steps: number) => void;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({
  nutrition,
  health,
  onAddWater,
  onUpdateNutrition,
  onAddStepCount,
}) => {
  const [showLogMealModal, setShowLogMealModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [mealCalories, setMealCalories] = useState(350);
  const [mealProtein, setMealProtein] = useState(25);
  const [mealCarbs, setMealCarbs] = useState(40);
  const [mealFat, setMealFat] = useState(10);

  const calorieProgressPercent = Math.min(
    100,
    Math.round((nutrition.currentCalories / nutrition.targetCalories) * 100)
  );

  const handleLogMeal = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNutrition(
      nutrition.currentCalories + mealCalories,
      nutrition.proteinCurrent + mealProtein,
      nutrition.carbsCurrent + mealCarbs,
      nutrition.fatCurrent + mealFat
    );
    setShowLogMealModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 pb-24 md:pb-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Nutrition & Water & Stats */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
          {/* Nutrition Target Card */}
          <section className="bg-white rounded-2xl p-6 border border-[#e5e2e1] soft-shadow hover-shadow transition-all duration-300">
            <div className="flex justify-between items-end mb-5">
              <div>
                <h2 className="text-xl font-bold text-[#1a1c1c] tracking-tight">
                  Nutrition Target
                </h2>
                <p className="text-xs sm:text-sm text-[#5f5e5e] mt-0.5">
                  Daily macronutrient overview
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-[#ff6b00]">
                  {nutrition.currentCalories.toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                  / {nutrition.targetCalories.toLocaleString()} CALS
                </div>
              </div>
            </div>

            {/* Main Calorie Progress Bar */}
            <div className="w-full h-3.5 bg-[#f4f3f2] rounded-full overflow-hidden mb-6 relative">
              <div
                className="h-full bg-[#ff6b00] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${calorieProgressPercent}%` }}
              ></div>
            </div>

            {/* Macros Bento Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Protein */}
              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1]">
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-1">
                  PROTEIN
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-lg font-bold text-[#1a1c1c]">
                    {nutrition.proteinCurrent}g
                  </span>
                  <span className="text-xs text-[#5f5e5e]">
                    /{nutrition.proteinTarget}g
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#eeeeed] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff6b00] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (nutrition.proteinCurrent / nutrition.proteinTarget) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Carbs */}
              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1]">
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-1">
                  CARBS
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-lg font-bold text-[#1a1c1c]">
                    {nutrition.carbsCurrent}g
                  </span>
                  <span className="text-xs text-[#5f5e5e]">
                    /{nutrition.carbsTarget}g
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#eeeeed] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff6b00] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (nutrition.carbsCurrent / nutrition.carbsTarget) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Fat */}
              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1]">
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-1">
                  FAT
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-lg font-bold text-[#1a1c1c]">
                    {nutrition.fatCurrent}g
                  </span>
                  <span className="text-xs text-[#5f5e5e]">
                    /{nutrition.fatTarget}g
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#eeeeed] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff6b00] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (nutrition.fatCurrent / nutrition.fatTarget) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowLogMealModal(true)}
                className="text-xs font-semibold text-[#a04100] bg-[#ffdbcc]/40 hover:bg-[#ffdbcc]/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">restaurant</span>
                Log Meal / Macros
              </button>
            </div>
          </section>

          {/* Water & Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Water Tracker */}
            <section className="bg-white rounded-2xl p-5 border border-[#e5e2e1] soft-shadow hover-shadow transition-all flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00]">
                    <span className="material-symbols-outlined text-xl icon-fill">
                      water_drop
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1a1c1c]">Hydration</h2>
                    <span className="text-xs text-[#5f5e5e]">Daily intake</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#ff6b00]">
                    {health.hydrationCurrentLiters.toFixed(1)}L
                  </span>
                  <span className="text-xs font-semibold text-[#5f5e5e] block uppercase">
                    / {health.hydrationTargetLiters}L
                  </span>
                </div>
              </div>

              {/* Hydration progress bar */}
              <div className="w-full bg-[#f4f3f2] h-2 rounded-full mb-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (health.hydrationCurrentLiters / health.hydrationTargetLiters) * 100
                    )}%`,
                  }}
                ></div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => onAddWater(250)}
                  className="flex-1 bg-[#f4f3f2] hover:bg-[#e9e8e7] text-[#1a1c1c] py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors cursor-pointer active:scale-95"
                >
                  +250ml
                </button>
                <button
                  onClick={() => onAddWater(500)}
                  className="flex-1 bg-[#ff6b00] hover:bg-[#a04100] text-white py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  +500ml
                </button>
              </div>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-[#e5e2e1] soft-shadow hover-shadow transition-all flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-[#5f5e5e] mb-1">
                  monitor_weight
                </span>
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-1">
                  WEIGHT
                </div>
                <div className="text-2xl font-bold text-[#1a1c1c]">
                  {health.weightKg}
                  <span className="text-sm font-normal text-[#5f5e5e] ml-1">kg</span>
                </div>
              </div>

              <div
                onClick={() => onAddStepCount(500)}
                className="bg-white rounded-2xl p-4 border border-[#e5e2e1] soft-shadow hover-shadow transition-all flex flex-col justify-center items-center text-center cursor-pointer group"
                title="Click to add +500 steps"
              >
                <span className="material-symbols-outlined text-[#5f5e5e] mb-1 group-hover:text-[#ff6b00] transition-colors">
                  directions_walk
                </span>
                <div className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase mb-1">
                  STEPS
                </div>
                <div className="text-2xl font-bold text-[#1a1c1c]">
                  {health.stepsToday.toLocaleString()}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Sleep & Workout History */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          {/* Sleep Chart Card */}
          <section className="bg-white rounded-2xl p-5 border border-[#e5e2e1] soft-shadow hover-shadow transition-all flex flex-col h-64">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-[#1a1c1c]">Sleep</h2>
              <span className="text-xs font-semibold text-[#5f5e5e] bg-[#f4f3f2] px-2 py-0.5 rounded-md">
                Avg {health.sleepAvgString}
              </span>
            </div>

            {/* Soft Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 pt-2 border-b border-[#e5e2e1] pb-2">
              {health.sleepDays.map((item, index) => {
                const heightPercent = Math.min(100, Math.round((item.hours / 10) * 100));
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-[#1a1c1c] text-white text-[10px] px-1.5 py-0.5 rounded transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {item.hours} hrs
                    </div>
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        item.isToday
                          ? 'bg-[#ff6b00] shadow-sm'
                          : 'bg-[#ff6b00]/25 group-hover:bg-[#ff6b00]/60'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[11px] text-[#5f5e5e] mt-2 font-semibold tracking-wider">
              {health.sleepDays.map((item, index) => (
                <span
                  key={index}
                  className={`w-full text-center ${
                    item.isToday ? 'text-[#ff6b00] font-bold' : ''
                  }`}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </section>

          {/* Workout History */}
          <section className="bg-white rounded-2xl p-5 border border-[#e5e2e1] soft-shadow hover-shadow transition-all flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1a1c1c]">Workout History</h2>
              <span className="text-xs text-[#ff6b00] font-semibold">This Week</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {health.workouts.map((w) => (
                <div
                  key={w.id}
                  onClick={() =>
                    setSelectedWorkout(selectedWorkout === w.id ? null : w.id)
                  }
                  className="p-3 rounded-xl border border-[#e5e2e1] hover:border-[#ff6b00]/40 hover:bg-[#faf9f8] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f4f3f2] flex items-center justify-center text-[#5f5e5e]">
                      <span className="material-symbols-outlined text-lg">
                        fitness_center
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#1a1c1c]">{w.title}</h3>
                      <p className="text-xs text-[#5f5e5e]">
                        {w.day} • {w.duration}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#5f5e5e] text-lg">
                      {selectedWorkout === w.id ? 'expand_less' : 'chevron_right'}
                    </span>
                  </div>

                  {selectedWorkout === w.id && w.exercises && (
                    <div className="mt-3 pt-2.5 border-t border-[#eeeeed] text-xs text-[#5f5e5e] space-y-1 pl-2">
                      <span className="font-semibold text-[#1a1c1c] block mb-1">
                        Completed Exercises:
                      </span>
                      {w.exercises.map((ex, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]"></span>
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Log Meal Modal */}
      {showLogMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <h3 className="text-lg font-bold text-[#1a1c1c]">Log Meal / Snack</h3>
              <button
                onClick={() => setShowLogMealModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleLogMeal} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Calories (kcal)
                </label>
                <input
                  type="number"
                  value={mealCalories}
                  onChange={(e) => setMealCalories(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5f5e5e] mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={mealProtein}
                    onChange={(e) => setMealProtein(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-[#e5e2e1] rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5f5e5e] mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={mealCarbs}
                    onChange={(e) => setMealCarbs(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-[#e5e2e1] rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5f5e5e] mb-1">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={mealFat}
                    onChange={(e) => setMealFat(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-[#e5e2e1] rounded-lg text-center"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogMealModal(false)}
                  className="px-4 py-2 bg-[#f4f3f2] text-[#5f5e5e] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-lg text-xs font-semibold"
                >
                  Add to Daily Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
