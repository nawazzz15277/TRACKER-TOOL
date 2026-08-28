import React, { useState, useEffect } from 'react';
import { ActiveToolType, UserProfile } from '../../types';

interface MoreScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ user, onUpdateUser }) => {
  const [activeTool, setActiveTool] = useState<ActiveToolType>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [statusInput, setStatusInput] = useState(user.memberStatus);

  // Study Tracker State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSubject, setTimerSubject] = useState('Deep Work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onUpdateUser({ focusHours: user.focusHours + 0.5 });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, user.focusHours, onUpdateUser]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Journal State
  const [journalText, setJournalText] = useState('');
  const [journalMood, setJournalMood] = useState('🔥 Energized');
  const [journalEntries, setJournalEntries] = useState<
    { date: string; mood: string; text: string }[]
  >([
    {
      date: 'Today, 8:30 AM',
      mood: '🔥 Energized',
      text: 'Great workout session this morning. Ready to crush the AI and documentation goals.',
    },
    {
      date: 'Yesterday, 9:15 PM',
      mood: '✨ Grateful',
      text: 'Made steady progress on the PyTorch course and maintained my hydration target.',
    },
  ]);

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;
    setJournalEntries([
      { date: 'Just now', mood: journalMood, text: journalText.trim() },
      ...journalEntries,
    ]);
    setJournalText('');
  };

  // AI Coach Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { sender: 'coach' | 'user'; text: string }[]
  >([
    {
      sender: 'coach',
      text: "Hello Alex! I noticed you have a 14-day streak and your productivity is at 82%. How can I help you balance your goals today?",
    },
  ]);

  const handleSendChat = (promptText?: string) => {
    const textToSend = promptText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!promptText) setChatInput('');

    // Responsive AI Coach response
    setTimeout(() => {
      let reply = "Keep up the great momentum! Consistency is your superpower.";
      const lower = textToSend.toLowerCase();
      if (lower.includes('study') || lower.includes('focus')) {
        reply = "For deep study blocks, try the 25-minute Pomodoro method with zero notification interruptions. You've already logged 32h this month!";
      } else if (lower.includes('sleep') || lower.includes('recovery')) {
        reply = "Your sleep consistency decreased slightly by 7% this week (avg 7h 15m). Try setting a wind-down alarm at 10:30 PM to recover optimal energy.";
      } else if (lower.includes('fitter') || lower.includes('workout')) {
        reply = "Your fitness goal is at 78% progress towards 68kg! Keep prioritizing your Push and Pull day routines with adequate protein intake.";
      } else if (lower.includes('goal') || lower.includes('progress')) {
        reply = "You're 90% toward your Emergency Fund and 45% through PyTorch! Focus on one small milestone today.";
      }
      setChatMessages((prev) => [...prev, { sender: 'coach' as const, text: reply }]);
    }, 600);
  };

  // Finance State
  const [emergencyTarget, setEmergencyTarget] = useState(10000);
  const [emergencySaved, setEmergencySaved] = useState(9000);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: nameInput, memberStatus: statusInput });
    setShowEditProfile(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 pb-24 md:pb-8 space-y-6">
      {/* User Profile Summary Card */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] transition-all">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff6b00] p-0.5 shrink-0 bg-[#f4f3f2]">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1c1c] tracking-tight">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#5f5e5e] font-medium mt-0.5">
              {user.memberStatus} • Level {user.level * 2 + 6}
            </p>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="bg-[#f4f3f2] hover:bg-[#e9e8e7] text-[#1a1c1c] p-2.5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            title="Edit Profile"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="bg-[#f4f3f2] rounded-xl p-3 text-center border border-[#e2bfb0]/30">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#5f5e5e] tracking-wider block mb-1 uppercase">
              STREAK
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#ff6b00] flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm icon-fill">
                local_fire_department
              </span>{' '}
              {user.streakDays}
            </span>
          </div>

          <div className="bg-[#f4f3f2] rounded-xl p-3 text-center border border-[#e2bfb0]/30">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#5f5e5e] tracking-wider block mb-1 uppercase">
              FOCUS TIME
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#1a1c1c]">
              {user.focusHours}h
            </span>
          </div>

          <div className="bg-[#f4f3f2] rounded-xl p-3 text-center border border-[#e2bfb0]/30">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#5f5e5e] tracking-wider block mb-1 uppercase">
              TASKS
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#1a1c1c]">
              {user.tasksCompleted}
            </span>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-[#5f5e5e] tracking-wider uppercase pl-1">
          YOUR TOOLS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Study Tracker */}
          <button
            type="button"
            onClick={() => setActiveTool('study')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#ffdbcc]/40 text-[#a04100] flex items-center justify-center group-hover:bg-[#ffdbcc] transition-colors">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                school
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              Study Tracker
            </span>
          </button>

          {/* Journal */}
          <button
            type="button"
            onClick={() => setActiveTool('journal')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#ffdbcc]/40 text-[#a04100] flex items-center justify-center group-hover:bg-[#ffdbcc] transition-colors">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                book
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              Journal
            </span>
          </button>

          {/* Finance */}
          <button
            type="button"
            onClick={() => setActiveTool('finance')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#ffdbcc]/40 text-[#a04100] flex items-center justify-center group-hover:bg-[#ffdbcc] transition-colors">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                account_balance_wallet
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              Finance
            </span>
          </button>

          {/* AI Coach (Special accent styling) */}
          <button
            type="button"
            onClick={() => setActiveTool('coach')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb693]/15 to-transparent pointer-events-none"></div>
            <div className="w-13 h-13 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-2xl icon-fill">
                psychology
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              AI Coach
            </span>
          </button>

          {/* Analytics */}
          <button
            type="button"
            onClick={() => setActiveTool('analytics')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#ffdbcc]/40 text-[#a04100] flex items-center justify-center group-hover:bg-[#ffdbcc] transition-colors">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                bar_chart
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              Analytics
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => setActiveTool('settings')}
            className="bg-white rounded-2xl p-5 soft-shadow border border-[#e5e2e1] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#e9e8e7] text-[#5f5e5e] flex items-center justify-center group-hover:bg-[#e3e2e1] transition-colors">
              <span className="material-symbols-outlined text-2xl group-hover:rotate-45 transition-transform">
                settings
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#1a1c1c]">
              Settings
            </span>
          </button>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <h3 className="text-lg font-bold text-[#1a1c1c]">Edit Profile</h3>
              <button
                onClick={() => setShowEditProfile(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1 uppercase">
                  Member Status
                </label>
                <input
                  type="text"
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2e1] rounded-lg focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 bg-[#f4f3f2] text-[#5f5e5e] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-lg text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tool Modal: Study Tracker */}
      {activeTool === 'study' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#e5e2e1] shadow-2xl space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6b00]">school</span>
                <h3 className="text-lg font-bold text-[#1a1c1c]">Study Focus Timer</h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-4 bg-[#faf9f8] rounded-2xl border border-[#e5e2e1]">
              <div className="text-xs font-semibold text-[#5f5e5e] uppercase tracking-wider mb-2">
                {timerSubject}
              </div>
              <div className="text-5xl font-mono font-bold text-[#1a1c1c] tracking-tight">
                {formatTimer(timerSeconds)}
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide text-white transition-all shadow-sm ${
                    isTimerRunning ? 'bg-[#ba1a1a]' : 'bg-[#ff6b00] hover:bg-[#a04100]'
                  }`}
                >
                  {isTimerRunning ? 'Pause' : 'Start Focus'}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(25 * 60);
                  }}
                  className="px-4 py-2.5 bg-[#eeeeed] text-[#5f5e5e] rounded-full text-sm font-semibold hover:bg-[#e3e2e1]"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              {['Deep Work', 'AI PyTorch', 'Documentation', 'Reading'].map((subj) => (
                <button
                  key={subj}
                  onClick={() => setTimerSubject(subj)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    timerSubject === subj
                      ? 'bg-[#ffdbcc] text-[#a04100] border-[#ff6b00] font-semibold'
                      : 'border-[#e5e2e1] text-[#5f5e5e] hover:bg-[#f4f3f2]'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal: Journal */}
      {activeTool === 'journal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#e5e2e1] shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6b00]">book</span>
                <h3 className="text-lg font-bold text-[#1a1c1c]">Daily Reflection Journal</h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddJournal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#5f5e5e] mb-1">
                  How are you feeling today?
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {['🔥 Energized', '✨ Grateful', '🎯 Focused', '🌿 Calm', '⚡ Busy'].map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setJournalMood(m)}
                        className={`px-2.5 py-1 text-xs rounded-full border shrink-0 transition-all ${
                          journalMood === m
                            ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                            : 'bg-[#faf9f8] text-[#5f5e5e] border-[#e5e2e1]'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>

              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What went well today? What will you improve tomorrow?"
                rows={3}
                className="w-full p-3 text-sm border border-[#e5e2e1] rounded-xl focus:outline-none focus:border-[#ff6b00]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-lg text-xs font-semibold"
                >
                  Save Reflection
                </button>
              </div>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2.5 pt-2 border-t border-[#eeeeed]">
              <h4 className="text-xs font-semibold text-[#5f5e5e] uppercase tracking-wider">
                Recent Entries
              </h4>
              {journalEntries.map((ent, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf9f8] p-3 rounded-xl border border-[#e5e2e1] text-xs space-y-1"
                >
                  <div className="flex justify-between font-semibold text-[#1a1c1c]">
                    <span>{ent.date}</span>
                    <span className="text-[#a04100]">{ent.mood}</span>
                  </div>
                  <p className="text-[#5f5e5e] leading-relaxed">{ent.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal: Finance */}
      {activeTool === 'finance' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6b00]">
                  account_balance_wallet
                </span>
                <h3 className="text-lg font-bold text-[#1a1c1c]">Emergency Fund & Finance</h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="bg-[#faf9f8] p-4 rounded-xl border border-[#e5e2e1] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-[#5f5e5e] uppercase">
                  Emergency Fund Target
                </span>
                <span className="text-lg font-bold text-[#1a1c1c]">
                  ${emergencySaved.toLocaleString()} / ${emergencyTarget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[#eeeeed] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#ff6b00] h-full rounded-full transition-all duration-700"
                  style={{ width: `${(emergencySaved / emergencyTarget) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#5f5e5e]">
                90% funded • 3-6 months buffer secured
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEmergencySaved((prev) => Math.min(emergencyTarget, prev + 250))}
                className="flex-1 py-2 bg-[#ffdbcc]/50 hover:bg-[#ffdbcc] text-[#a04100] rounded-xl text-xs font-semibold transition-colors"
              >
                + $250 Deposit
              </button>
              <button
                onClick={() => setEmergencySaved((prev) => Math.min(emergencyTarget, prev + 500))}
                className="flex-1 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-xl text-xs font-semibold transition-colors"
              >
                + $500 Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal: AI Coach */}
      {activeTool === 'coach' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg border border-[#e5e2e1] shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ff6b00] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-base icon-fill">
                    psychology
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1c1c]">LifeOS AI Coach</h3>
                  <p className="text-[11px] text-[#5f5e5e]">Mindset, Habits & Productivity</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Quick prompts */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {[
                'Tips for sleep consistency',
                'How to hit my study goal',
                'Review my weekly progress',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendChat(q)}
                  className="px-3 py-1 bg-[#faf9f8] hover:bg-[#ffdbcc]/40 text-[#a04100] border border-[#e5e2e1] rounded-full whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-[#faf9f8] rounded-xl border border-[#e5e2e1] text-xs sm:text-sm">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#ff6b00] text-white rounded-br-none'
                        : 'bg-white text-[#1a1c1c] border border-[#e5e2e1] rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask advice on habits, workouts, or focus..."
                className="flex-1 px-3.5 py-2 text-sm border border-[#e5e2e1] rounded-xl focus:outline-none focus:border-[#ff6b00]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff6b00] hover:bg-[#a04100] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tool Modal: Analytics */}
      {activeTool === 'analytics' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6b00]">bar_chart</span>
                <h3 className="text-lg font-bold text-[#1a1c1c]">Analytics & Insights</h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1] flex justify-between items-center">
                <div>
                  <span className="text-[#5f5e5e] block text-[11px] uppercase font-semibold">
                    Overall Habit Completion
                  </span>
                  <span className="text-xl font-bold text-[#1a1c1c]">84.6%</span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded-md text-xs">
                  +4.2% vs last week
                </span>
              </div>

              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1] flex justify-between items-center">
                <div>
                  <span className="text-[#5f5e5e] block text-[11px] uppercase font-semibold">
                    Average Daily Focus
                  </span>
                  <span className="text-xl font-bold text-[#1a1c1c]">3.2 hrs</span>
                </div>
                <span className="text-[#ff6b00] font-bold bg-[#ffdbcc]/50 px-2 py-1 rounded-md text-xs">
                  Optimal Target
                </span>
              </div>

              <div className="bg-[#faf9f8] p-3.5 rounded-xl border border-[#e5e2e1] flex justify-between items-center">
                <div>
                  <span className="text-[#5f5e5e] block text-[11px] uppercase font-semibold">
                    Water Consistency
                  </span>
                  <span className="text-xl font-bold text-[#1a1c1c]">92%</span>
                </div>
                <span className="text-blue-700 font-bold bg-blue-100 px-2 py-1 rounded-md text-xs">
                  Consistent
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal: Settings */}
      {activeTool === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#e5e2e1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eeeeed]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5f5e5e]">settings</span>
                <h3 className="text-lg font-bold text-[#1a1c1c]">App Settings</h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5e5e] hover:bg-[#eeeeed]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-[#eeeeed]">
                <span className="font-medium text-[#1a1c1c]">Daily Reminders</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#ff6b00]"
                />
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#eeeeed]">
                <span className="font-medium text-[#1a1c1c]">Haptic / Elastic Feedback</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#ff6b00]"
                />
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#eeeeed]">
                <span className="font-medium text-[#1a1c1c]">Light Equilibrium Theme</span>
                <span className="text-xs text-[#ff6b00] font-semibold">Active</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTool(null)}
                className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
