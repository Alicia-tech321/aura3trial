'use client';

import { ScheduledTask } from '@/types';

export const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const schedule = localStorage.getItem('aura-schedule');
    const scores = localStorage.getItem('aura-scores');
    
    return {
      schedule: schedule ? JSON.parse(schedule) : null,
      scores: scores ? JSON.parse(scores) : null,
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const clearLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('aura-schedule');
    localStorage.removeItem('aura-scores');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
