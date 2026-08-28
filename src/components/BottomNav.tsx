import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'tasks', label: 'Tasks', icon: 'check_circle' },
    { id: 'health', label: 'Health', icon: 'favorite' },
    { id: 'goals', label: 'Goals', icon: 'emoji_events' },
    { id: 'more', label: 'More', icon: 'more_horiz' },
  ];

  return (
    <>
      {/* Mobile Floating Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-white/90 backdrop-blur-xl border-t border-[#e5e2e1]/80 shadow-[0px_-4px_24px_rgba(0,0,0,0.04)] rounded-t-2xl">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id || (tab.id === 'goals' && currentTab === 'habits');
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#a04100] font-bold scale-100'
                  : 'text-[#5f5e5e] opacity-70 hover:opacity-100 hover:bg-[#a04100]/5'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] mb-0.5 ${
                  isActive ? 'icon-fill text-[#ff6b00]' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] tracking-wider uppercase font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Navigation Top Bar Links (Integrated in top bar or header) */}
      <div className="hidden md:flex fixed top-3 right-24 z-50 items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e5e2e1] shadow-sm">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id || (tab.id === 'goals' && currentTab === 'habits');
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ff6b00] text-white shadow-sm'
                  : 'text-[#5f5e5e] hover:text-[#a04100] hover:bg-[#f4f3f2]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
};
