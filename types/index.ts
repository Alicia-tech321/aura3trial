export type Priority = 'Low' | 'Medium' | 'High';
export type Mood = 'Energized' | 'Balanced' | 'Tired' | 'Stressed';

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  timeInMinutes: number;
}

export interface ScheduledTask {
  id: string;
  taskName: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  skipped: boolean;
}

export interface AppState {
  // Task management
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  
  // Availability
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  
  // Feeling/Mood
  mood: Mood;
  energyLevel: number;
  setMood: (mood: Mood) => void;
  setEnergyLevel: (level: number) => void;
  
  // Schedule
  schedule: ScheduledTask[];
  setSchedule: (schedule: ScheduledTask[]) => void;
  completeTask: (id: string) => void;
  skipTask: (id: string) => void;
  rescheduleTask: (id: string) => void;
  
  // Score
  balanceScore: number;
  productivityScore: number;
  wellnessScore: number;
  consistencyScore: number;
  updateScores: (productivity: number, wellness: number, consistency: number) => void;
  adjustScore: (amount: number) => void;
  
  // UI States
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  showSchedule: boolean;
  setShowSchedule: (show: boolean) => void;
  
  // Notification modal
  showNotification: boolean;
  notificationTask: string | null;
  setShowNotification: (show: boolean, taskId?: string) => void;
}
