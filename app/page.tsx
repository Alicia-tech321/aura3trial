'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import TaskInput from '@/components/TaskInput';
import AvailabilityPicker from '@/components/AvailabilityPicker';
import FeelingSelector from '@/components/FeelingSelector';
import LoadingScreen from '@/components/LoadingScreen';
import Schedule from '@/components/Schedule';
import ScoreBoard from '@/components/ScoreBoard';
import NotificationModal from '@/components/NotificationModal';
import { generateSchedule } from '@/utils/scheduleGenerator';
import { loadFromLocalStorage } from '@/utils/localStorage';

export default function Home() {
  const {
    tasks,
    startTime,
    endTime,
    mood,
    energyLevel,
    isGenerating,
    setIsGenerating,
    showSchedule,
    setShowSchedule,
    setSchedule,
    updateScores,
    schedule,
  } = useStore();

  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const data = loadFromLocalStorage();
    if (data?.schedule) {
      setSchedule(data.schedule);
      setShowSchedule(true);
    }
    if (data?.scores) {
      updateScores(
        data.scores.productivity,
        data.scores.wellness,
        data.scores.consistency
      );
    }
  }, []);

  // Setup notification timers for tasks
  useEffect(() => {
    if (!showSchedule || schedule.length === 0) return;

    const checkTasks = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      schedule.forEach((task) => {
        if (!task.completed && !task.skipped && !task.taskName.includes('Break')) {
          // Calculate time 10 minutes before task ends
          const [endHour, endMin] = task.endTime.split(':').map(Number);
          const notifyTime = new Date();
          notifyTime.setHours(endHour, endMin - 10, 0, 0);

          const notifyTimeStr = `${String(notifyTime.getHours()).padStart(2, '0')}:${String(notifyTime.getMinutes()).padStart(2, '0')}`;

          // Show notification if current time matches notify time
          if (currentTime === notifyTimeStr) {
            useStore.getState().setShowNotification(true, task.id);
          }
        }
      });
    };

    // Check every minute
    const interval = setInterval(checkTasks, 60000);
    return () => clearInterval(interval);
  }, [schedule, showSchedule]);

  const handleGenerate = async () => {
    if (tasks.length === 0) {
      alert('Please add at least one task before generating your schedule!');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const result = generateSchedule(tasks, startTime, endTime, mood, energyLevel);
    setSchedule(result.schedule);
    updateScores(result.scores.productivity, result.scores.wellness, result.scores.consistency);
    setShowSchedule(true);
    setIsGenerating(false);
  };

  if (!mounted) {
    return null; // Prevent SSR mismatch
  }

  return (
    <>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-brand mb-2">
              AURA
            </h1>
            <p className="text-xl text-gray-600">Your AI Balance Agent</p>
          </header>

          {!showSchedule ? (
            /* Input Form */
            <div className="max-w-3xl mx-auto">
              <TaskInput />
              <AvailabilityPicker />
              <FeelingSelector />

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={tasks.length === 0}
                className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span className="text-2xl">✨</span>
                Generate My Perfect Day
              </button>
            </div>
          ) : (
            /* Schedule View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Schedule />
                
                {/* Reset Button */}
                <button
                  onClick={() => {
                    setShowSchedule(false);
                    setSchedule([]);
                  }}
                  className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  ← Back to Tasks
                </button>
              </div>
              
              <div className="lg:col-span-1">
                <ScoreBoard />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Screen */}
      {isGenerating && <LoadingScreen />}

      {/* Notification Modal */}
      <NotificationModal />
    </>
  );
}
