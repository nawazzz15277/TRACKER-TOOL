import React, { useState } from 'react';
import { PriorityType, Task, TaskCategory } from '../../types';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, priority: PriorityType, category: TaskCategory, dueDate: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) => {
  const [viewFilter, setViewFilter] = useState<'Today' | 'Upcoming' | 'All'>('Today');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newPriority, setNewPriority] = useState<PriorityType>('medium');
  const [newCategory, setNewCategory] = useState<TaskCategory>('Project');
  const [showAdvancedAdd, setShowAdvancedAdd] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const dueDate = viewFilter === 'Upcoming' ? 'Tomorrow' : 'Today';
    onAddTask(newTaskTitle.trim(), newPriority, newCategory, dueDate);
    setNewTaskTitle('');
    setShowAdvancedAdd(false);
  };

  // Filter tasks based on view switcher
  const filteredTasks = tasks.filter((t) => {
    if (viewFilter === 'Today') return t.dueDate === 'Today';
    if (viewFilter === 'Upcoming') return t.dueDate === 'Tomorrow' || t.dueDate === 'Upcoming';
    return true; // 'All'
  });

  const highPriorityTasks = filteredTasks.filter((t) => t.priority === 'high');
  const mediumPriorityTasks = filteredTasks.filter((t) => t.priority === 'medium');
  const lowPriorityTasks = filteredTasks.filter((t) => t.priority === 'low');

  const renderTaskCard = (task: Task) => {
    const isDueToday = task.dueDate === 'Today';
    return (
      <div
        key={task.id}
        className="task-card bg-white rounded-xl border border-[#e5e2e1] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] p-4 flex items-start gap-3.5 transition-all group"
      >
        <button
          type="button"
          onClick={() => onToggleTask(task.id)}
          className={`w-6 h-6 rounded-full mt-0.5 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            task.completed
              ? 'bg-[#ff6b00] border-2 border-[#ff6b00] text-white'
              : 'border-2 border-[#8e7164]/50 hover:border-[#ff6b00] bg-transparent'
          }`}
        >
          {task.completed && (
            <span className="material-symbols-outlined text-sm font-bold icon-fill">
              check
            </span>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p
            onClick={() => onToggleTask(task.id)}
            className={`text-base leading-snug cursor-pointer transition-colors ${
              task.completed
                ? 'line-through text-[#5f5e5e] opacity-60'
                : 'text-[#1a1c1c] font-medium'
            }`}
          >
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[11px] font-semibold text-[#5a4136] bg-[#f4f3f2] px-2 py-0.5 rounded-md">
              {task.category}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isDueToday && task.priority === 'high'
                  ? 'text-[#ba1a1a] bg-[#ffdad6]/50 font-bold'
                  : 'text-[#5f5e5e] bg-[#eeeeed]'
              }`}
            >
              {task.dueDate}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 text-[#5f5e5e] hover:text-[#ba1a1a] p-1 transition-opacity"
          title="Delete task"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 space-y-6 py-4 pb-24 md:pb-8">
      {/* View Switcher */}
      <div className="flex bg-[#f4f3f2] p-1 rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#e5e2e1]">
        <button
          onClick={() => setViewFilter('Today')}
          className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
            viewFilter === 'Today'
              ? 'bg-white shadow-sm text-[#a04100] font-bold'
              : 'text-[#5f5e5e] opacity-80 hover:bg-white/50'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setViewFilter('Upcoming')}
          className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
            viewFilter === 'Upcoming'
              ? 'bg-white shadow-sm text-[#a04100] font-bold'
              : 'text-[#5f5e5e] opacity-80 hover:bg-white/50'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setViewFilter('All')}
          className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
            viewFilter === 'All'
              ? 'bg-white shadow-sm text-[#a04100] font-bold'
              : 'text-[#5f5e5e] opacity-80 hover:bg-white/50'
          }`}
        >
          All
        </button>
      </div>

      {/* Quick Add Bar */}
      <form
        onSubmit={handleAdd}
        className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-[#e5e2e1] p-2 flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#ff6b00] text-xl ml-1">
            add
          </span>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add task..."
            className="w-full border-none bg-transparent focus:outline-none focus:ring-0 text-base text-[#1a1c1c] placeholder-[#5f5e5e]/50 py-1.5"
          />
          <button
            type="button"
            onClick={() => setShowAdvancedAdd(!showAdvancedAdd)}
            className="text-xs text-[#5f5e5e] hover:text-[#a04100] px-2 py-1 rounded bg-[#f4f3f2] shrink-0"
          >
            {newPriority}
          </button>
          <button
            type="submit"
            className="bg-[#ff6b00] hover:bg-[#a04100] text-white font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-lg transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Priority & Category Dropdown Options */}
        {showAdvancedAdd && (
          <div className="flex items-center gap-3 px-3 py-2 bg-[#faf9f8] rounded-lg border-t border-[#f4f3f2] text-xs">
            <span className="text-[#5f5e5e] font-medium">Priority:</span>
            {(['high', 'medium', 'low'] as PriorityType[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setNewPriority(p)}
                className={`px-2 py-1 rounded uppercase tracking-wider text-[10px] font-bold ${
                  newPriority === p
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-[#eeeeed] text-[#5f5e5e]'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-[#5f5e5e] font-medium ml-2">Category:</span>
            {(['Project', 'Study', 'Personal', 'Fitness'] as TaskCategory[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setNewCategory(c)}
                className={`px-2 py-1 rounded text-[10px] font-semibold ${
                  newCategory === c
                    ? 'bg-[#a04100] text-white'
                    : 'bg-[#eeeeed] text-[#5f5e5e]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Task Categories: High, Medium, Low */}
      <div className="space-y-6">
        {/* High Priority */}
        {highPriorityTasks.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-semibold tracking-wider text-[#5f5e5e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] block"></span>
              High Priority
            </h2>
            <div className="space-y-2.5">
              {highPriorityTasks.map((task) => renderTaskCard(task))}
            </div>
          </section>
        )}

        {/* Medium Priority */}
        {mediumPriorityTasks.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-semibold tracking-wider text-[#5f5e5e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#facc15] block"></span>
              Medium Priority
            </h2>
            <div className="space-y-2.5">
              {mediumPriorityTasks.map((task) => renderTaskCard(task))}
            </div>
          </section>
        )}

        {/* Low Priority */}
        {lowPriorityTasks.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-semibold tracking-wider text-[#5f5e5e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] block"></span>
              Low Priority
            </h2>
            <div className="space-y-2.5">
              {lowPriorityTasks.map((task) => renderTaskCard(task))}
            </div>
          </section>
        )}

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-xl border border-[#e5e2e1] p-8 text-center text-[#5f5e5e] space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#e2bfb0]">
              task_alt
            </span>
            <p className="text-sm font-medium">No tasks found for this view.</p>
            <p className="text-xs text-[#5f5e5e]/70">Add a new task above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
