import React, { useState } from 'react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState(28);

  if (!isOpen) return null;

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
          <div>
            <h3 className="text-lg font-bold text-[#1a1c1c]">August 2026</h3>
            <p className="text-xs text-[#5f5e5e]">Day Score: 82 • 14 Day Streak</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#5f5e5e]">
          {weekDays.map((d, index) => (
            <div key={index} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
          {/* Offset for August 2026 (Aug 1 is Saturday -> 5 offset days) */}
          <div className="text-transparent">0</div>
          <div className="text-transparent">0</div>
          <div className="text-transparent">0</div>
          <div className="text-transparent">0</div>
          <div className="text-transparent">0</div>

          {daysInMonth.map((day) => {
            const isToday = day === 28;
            const isSelected = day === selectedDay;
            const hasCompleted = day <= 28;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-xl transition-all relative ${
                  isSelected
                    ? 'bg-[#ff6b00] text-white font-bold shadow-md'
                    : isToday
                    ? 'border-2 border-[#ff6b00] text-[#a04100] font-bold bg-[#ffdbcc]/20'
                    : 'hover:bg-[#f4f3f2] text-[#1a1c1c]'
                }`}
              >
                <span>{day}</span>
                {hasCompleted && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-[#ff6b00] absolute bottom-1"></span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-[#eeeeed] flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00]"></span>
            <span className="text-[#5f5e5e]">Active Habit Logs</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#a04100] text-white font-semibold rounded-lg hover:bg-[#853600] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
