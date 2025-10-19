'use client';

import { useStore } from '@/store/useStore';

export default function Schedule() {
  const { schedule, completeTask, skipTask, rescheduleTask } = useStore();

  const getCardColor = (index: number) => {
    const colors = [
      'bg-blue-50 border-blue-200',
      'bg-pink-50 border-pink-200',
      'bg-green-50 border-green-200',
      'bg-purple-50 border-purple-200',
      'bg-yellow-50 border-yellow-200',
      'bg-indigo-50 border-indigo-200',
    ];
    return colors[index % colors.length];
  };

  if (schedule.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-gray-400 text-lg">No schedule generated yet</p>
        <p className="text-gray-400 text-sm mt-2">Add tasks and click "Generate My Perfect Day"</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-emerald-brand">Your Perfect Day</h2>
        <p className="text-gray-600 mt-1">Crafted by AI for optimal balance and productivity</p>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Schedule</h3>

      <div className="space-y-3">
        {schedule.map((task, index) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border-2 transition-all ${getCardColor(index)} ${
              task.completed ? 'opacity-50' : task.skipped ? 'opacity-30' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg">{task.taskName}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {task.startTime} - {task.endTime}
                </p>
              </div>
              {task.completed && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Completed
                </span>
              )}
              {task.skipped && (
                <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Skipped
                </span>
              )}
            </div>

            {!task.completed && !task.skipped && (
              <div className="flex gap-2">
                <button
                  onClick={() => completeTask(task.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>✅</span>
                  Complete
                </button>
                <button
                  onClick={() => skipTask(task.id)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>⏭</span>
                  Skip
                </button>
                <button
                  onClick={() => rescheduleTask(task.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>🔁</span>
                  Reschedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
