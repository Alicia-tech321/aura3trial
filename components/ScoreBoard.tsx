'use client';

import { useStore } from '@/store/useStore';

export default function ScoreBoard() {
  const { 
    balanceScore, 
    productivityScore, 
    wellnessScore, 
    consistencyScore,
    schedule,
    energyLevel 
  } = useStore();

  const completedTasks = schedule.filter(t => t.completed).length;
  const totalTasks = schedule.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate work time (completed tasks)
  const workTime = schedule
    .filter(t => t.completed)
    .reduce((acc, task) => {
      const [startHour, startMin] = task.startTime.split(':').map(Number);
      const [endHour, endMin] = task.endTime.split(':').map(Number);
      const minutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      return acc + minutes;
    }, 0);
  const workHours = Math.floor(workTime / 60);
  const workMinutes = workTime % 60;

  const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-emerald-brand mb-6">Balance Score</h2>

      {/* Circular Score Display */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - balanceScore / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e699" />
                <stop offset="100%" stopColor="#00b377" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-emerald-brand">{balanceScore}</span>
          </div>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="mb-6">
        <ScoreBar label="Productivity" value={productivityScore} color="bg-blue-500" />
        <ScoreBar label="Wellness" value={wellnessScore} color="bg-pink-500" />
        <ScoreBar label="Consistency" value={consistencyScore} color="bg-green-500" />
      </div>

      {/* Today's Stats */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Completed:</span>
            <span className="font-bold text-gray-800">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Progress:</span>
            <span className="font-bold text-gray-800">{progress}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Work Time:</span>
            <span className="font-bold text-gray-800">
              {workHours}h {workMinutes > 0 && `${workMinutes}m`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Energy Level:</span>
            <span className="font-bold text-gray-800">{energyLevel}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
