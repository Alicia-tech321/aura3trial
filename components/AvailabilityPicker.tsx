'use client';

import { useStore } from '@/store/useStore';

export default function AvailabilityPicker() {
  const { startTime, endTime, setStartTime, setEndTime } = useStore();

  const calculateAvailableHours = () => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-emerald-brand mb-4">Your Availability</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-brand transition-colors"
          />
        </div>
        
        <div className="text-gray-400 mt-6">→</div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-brand transition-colors"
          />
        </div>
      </div>

      <div className="bg-mint-lighter rounded-xl p-4 text-center">
        <p className="text-gray-600 text-sm">Available time:</p>
        <p className="text-2xl font-bold text-emerald-brand">{calculateAvailableHours()}</p>
      </div>
    </div>
  );
}
