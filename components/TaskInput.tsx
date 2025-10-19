'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Priority } from '@/types';

export default function TaskInput() {
  const [taskName, setTaskName] = useState('');
  const { tasks, addTask, removeTask, updateTask } = useStore();

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask({
        id: Date.now().toString(),
        name: taskName,
        priority: 'Medium',
        timeInMinutes: 60
      });
      setTaskName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-emerald-brand mb-4">Your Tasks</h2>
      
      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Study for calc exam, finish coding project…"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-brand transition-colors"
        />
        <button
          onClick={handleAddTask}
          className="bg-teal-brand hover:bg-gradient-to-r hover:from-mint-bright hover:to-teal-brand text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <span className="text-xl">+</span>
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-4 bg-mint-lighter rounded-xl border border-gray-100"
            >
              <div className="flex-1 font-medium text-gray-800">
                {task.name}
              </div>
              
              {/* Priority Dropdown */}
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-brand bg-white cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              {/* Time Input */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={task.timeInMinutes}
                  onChange={(e) => updateTask(task.id, { timeInMinutes: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="480"
                  className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-brand text-center"
                />
                <span className="text-gray-600 text-sm">min</span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-bold"
                title="Delete task"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
