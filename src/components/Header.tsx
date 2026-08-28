import React from 'react';
import { TabType, UserProfile } from '../types';

interface HeaderProps {
  currentTab: TabType;
  user: UserProfile;
  onOpenCalendar: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  user,
  onOpenCalendar,
  onNavigateTab,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'home':
        return `Good morning, Alex 👋`;
      case 'tasks':
        return 'Tasks';
      case 'health':
        return 'Health';
      case 'goals':
        return 'Goals & Progress';
      case 'habits':
        return 'Habits';
      case 'more':
        return `Good morning, Alex 👋`;
      default:
        return 'LifeOS';
    }
  };

  const getSubtext = () => {
    if (currentTab === 'home') {
      return 'Friday, August 28';
    }
    return null;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf9f8]/85 backdrop-blur-md border-b border-[#e5e2e1]/60 transition-all duration-200">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3.5 max-w-[1200px] mx-auto">
        {/* Left: Avatar & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('more')}
            className="w-10 h-10 rounded-full overflow-hidden border border-[#ff6b00]/20 bg-[#e9e8e7] flex items-center justify-center shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
            title="View Profile & Tools"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#a04100] tracking-tight">
              {getTabTitle()}
            </h1>
            {getSubtext() && (
              <p className="text-xs sm:text-sm text-[#5f5e5e] font-normal">
                {getSubtext()}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions / Quick Badges */}
        <div className="flex items-center gap-3">
          {currentTab === 'home' && (
            <div className="hidden sm:flex items-center gap-3 mr-1">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-semibold text-[#5f5e5e] tracking-wider uppercase">
                  Day Score
                </span>
                <span className="text-base font-bold text-[#1a1c1c]">
                  {user.dayScore}
                  <span className="text-xs text-[#5f5e5e] font-normal">/100</span>
                </span>
              </div>
              <div className="flex items-center gap-1 bg-[#eeeeed] rounded-full px-2.5 py-1 text-[#ff6b00] font-semibold text-xs">
                <span className="material-symbols-outlined text-sm icon-fill">
                  local_fire_department
                </span>
                <span>{user.streakDays}</span>
              </div>
            </div>
          )}

          {currentTab === 'goals' && (
            <button
              onClick={() => onNavigateTab('habits')}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#a04100] bg-[#ffdbcc]/40 px-3 py-1.5 rounded-full hover:bg-[#ffdbcc]/70 transition-colors"
            >
              <span className="material-symbols-outlined text-sm icon-fill">
                local_fire_department
              </span>
              Habits View
            </button>
          )}

          <button
            onClick={onOpenCalendar}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#5f5e5e] hover:text-[#a04100] hover:bg-[#e9e8e7]/60 transition-colors cursor-pointer"
            title="Open Calendar"
            aria-label="Open Calendar"
          >
            <span className="material-symbols-outlined text-xl">
              calendar_today
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
