'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 shadow-2xl flex flex-col items-center max-w-md">
        <div className="relative w-24 h-24 mb-6">
          {/* Animated Spinner */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-teal-400 animate-spin"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-emerald-brand mb-2">
          AI is generating your perfect day…
        </h3>
        <p className="text-gray-600 text-center">
          Analyzing your tasks, energy, and availability
        </p>
      </div>
    </div>
  );
}
