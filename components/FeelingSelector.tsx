'use client';

import { useStore } from '@/store/useStore';
import { Mood } from '@/types';

export default function FeelingSelector() {
  const { mood, energyLevel, setMood, setEnergyLevel } = useStore();

  const moods: { label: Mood; emoji: string }[] = [
    { label: 'Energized', emoji: '⚡' },
    { label: 'Balanced', emoji: '🍃' },
    { label: 'Tired', emoji: '🌙' },
    { label: 'Stressed', emoji: '⚠️' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-emerald-brand mb-4">How Are You Feeling?</h2>
      
      {/* Mood Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m.label)}
            className={`py-4 px-3 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 ${
              mood === m.label
                ? 'bg-teal-brand text-white border-2 border-emerald-brand shadow-lg scale-105'
                : 'bg-mint-lighter text-gray-700 border-2 border-gray-200 hover:border-teal-brand'
            }`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-sm">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Energy Level Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-600">Energy Level</label>
          <span className="text-2xl font-bold text-teal-brand">{energyLevel}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-gray-300 via-teal-200 to-teal-brand rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #d1d5db 0%, #99f6e4 ${(energyLevel - 1) * 11.11}%, #00b377 ${(energyLevel - 1) * 11.11}%, #00b377 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
