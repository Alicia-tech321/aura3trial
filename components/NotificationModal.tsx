'use client';

import { useStore } from '@/store/useStore';

export default function NotificationModal() {
  const { showNotification, notificationTask, setShowNotification, rescheduleTask, schedule } = useStore();

  if (!showNotification || !notificationTask) return null;

  const task = schedule.find(t => t.id === notificationTask);
  if (!task) return null;

  const handleReschedule = () => {
    rescheduleTask(notificationTask);
    setShowNotification(false);
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">⏰</div>
          <h3 className="text-2xl font-bold text-emerald-brand mb-2">
            Time Check!
          </h3>
          <p className="text-gray-600">
            There are 10 minutes left before your break. Are you done with{' '}
            <span className="font-bold text-gray-800">{task.taskName}</span>?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
          >
            Yes, I'm Done!
          </button>
          <button
            onClick={handleReschedule}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
          >
            Reschedule
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Rescheduling will move this task to the next slot (-2 points)
        </p>
      </div>
    </div>
  );
}
