'use client';

import { create } from 'zustand';
import { AppState, Task, ScheduledTask, Mood } from '@/types';

export const useStore = create<AppState>((set, get) => ({
  // Task management
  tasks: [],
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id: string) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),
  updateTask: (id: string, updates: Partial<Task>) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  
  // Availability
  startTime: '09:00',
  endTime: '17:00',
  setStartTime: (time: string) => set({ startTime: time }),
  setEndTime: (time: string) => set({ endTime: time }),
  
  // Feeling/Mood
  mood: 'Balanced',
  energyLevel: 7,
  setMood: (mood: Mood) => set({ mood }),
  setEnergyLevel: (level: number) => set({ energyLevel: level }),
  
  // Schedule
  schedule: [],
  setSchedule: (schedule: ScheduledTask[]) => {
    set({ schedule });
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura-schedule', JSON.stringify(schedule));
    }
  },
  completeTask: (id: string) => {
    set((state) => ({
      schedule: state.schedule.map(t => t.id === id ? { ...t, completed: true } : t)
    }));
    get().adjustScore(10);
  },
  skipTask: (id: string) => {
    set((state) => ({
      schedule: state.schedule.map(t => t.id === id ? { ...t, skipped: true } : t)
    }));
    get().adjustScore(-5);
  },
  rescheduleTask: (id: string) => {
    const task = get().schedule.find(t => t.id === id);
    if (task) {
      // Move task to the next available slot
      const updatedSchedule = get().schedule.filter(t => t.id !== id);
      const lastTask = updatedSchedule[updatedSchedule.length - 1];
      if (lastTask) {
        const newStartTime = lastTask.endTime;
        const duration = calculateDuration(task.startTime, task.endTime);
        const newEndTime = addMinutesToTime(newStartTime, duration);
        updatedSchedule.push({
          ...task,
          startTime: newStartTime,
          endTime: newEndTime
        });
      }
      set({ schedule: updatedSchedule });
      get().adjustScore(-2);
    }
  },
  
  // Score
  balanceScore: 50,
  productivityScore: 50,
  wellnessScore: 50,
  consistencyScore: 50,
  updateScores: (productivity: number, wellness: number, consistency: number) => {
    const balance = Math.round((productivity + wellness + consistency) / 3);
    set({
      productivityScore: productivity,
      wellnessScore: wellness,
      consistencyScore: consistency,
      balanceScore: balance
    });
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura-scores', JSON.stringify({
        balance,
        productivity,
        wellness,
        consistency
      }));
    }
  },
  adjustScore: (amount: number) => {
    set((state) => {
      const newBalance = Math.max(0, Math.min(100, state.balanceScore + amount));
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('aura-scores', JSON.stringify({
          balance: newBalance,
          productivity: state.productivityScore,
          wellness: state.wellnessScore,
          consistency: state.consistencyScore
        }));
      }
      return { balanceScore: newBalance };
    });
  },
  
  // UI States
  isGenerating: false,
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  showSchedule: false,
  setShowSchedule: (show: boolean) => set({ showSchedule: show }),
  
  // Notification modal
  showNotification: false,
  notificationTask: null,
  setShowNotification: (show: boolean, taskId?: string) => set({ 
    showNotification: show, 
    notificationTask: taskId || null 
  }),
}));

// Helper functions
function calculateDuration(start: string, end: string): number {
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  return (endHour * 60 + endMin) - (startHour * 60 + startMin);
}

function addMinutesToTime(time: string, minutes: number): string {
  const [hour, min] = time.split(':').map(Number);
  const totalMinutes = hour * 60 + min + minutes;
  const newHour = Math.floor(totalMinutes / 60) % 24;
  const newMin = totalMinutes % 60;
  return `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
}
