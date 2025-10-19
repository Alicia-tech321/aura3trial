import { Task, ScheduledTask, Mood } from '@/types';

export function generateSchedule(
  tasks: Task[],
  startTime: string,
  endTime: string,
  mood: Mood,
  energyLevel: number
): { schedule: ScheduledTask[]; scores: { productivity: number; wellness: number; consistency: number } } {
  
  // Sort tasks by priority and time
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityWeight = { High: 3, Medium: 2, Low: 1 };
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  // Calculate break time based on mood and energy
  const getBreakTime = (taskDuration: number): number => {
    if (mood === 'Energized' && energyLevel >= 8) return 5;
    if (mood === 'Tired' || energyLevel <= 3) return 15;
    if (mood === 'Stressed') return 10;
    return taskDuration >= 90 ? 10 : 5;
  };

  // Adjust task order based on mood and energy
  const adjustedTasks = [...sortedTasks];
  if (mood === 'Tired' || energyLevel <= 4) {
    // Start with easier/shorter tasks
    adjustedTasks.sort((a, b) => a.timeInMinutes - b.timeInMinutes);
  } else if (mood === 'Energized' && energyLevel >= 8) {
    // Start with harder/longer tasks
    adjustedTasks.sort((a, b) => b.timeInMinutes - a.timeInMinutes);
  }

  // Generate schedule
  const schedule: ScheduledTask[] = [];
  let currentTime = startTime;

  for (let i = 0; i < adjustedTasks.length; i++) {
    const task = adjustedTasks[i];
    const taskEnd = addMinutesToTime(currentTime, task.timeInMinutes);
    
    // Check if task fits within available time
    if (compareTime(taskEnd, endTime) > 0) {
      // Task doesn't fit, skip it
      continue;
    }

    schedule.push({
      id: `schedule-${Date.now()}-${i}`,
      taskName: task.name,
      startTime: currentTime,
      endTime: taskEnd,
      completed: false,
      skipped: false,
    });

    currentTime = taskEnd;

    // Add break between tasks (except after the last task)
    if (i < adjustedTasks.length - 1) {
      const breakTime = getBreakTime(task.timeInMinutes);
      const breakEnd = addMinutesToTime(currentTime, breakTime);
      
      // Only add break if it fits
      if (compareTime(breakEnd, endTime) <= 0) {
        schedule.push({
          id: `break-${Date.now()}-${i}`,
          taskName: mood === 'Stressed' ? 'Meditation Break 🧘' : 'Break 🌿',
          startTime: currentTime,
          endTime: breakEnd,
          completed: false,
          skipped: false,
        });
        currentTime = breakEnd;
      }
    }

    // Stop if we've reached the end time
    if (compareTime(currentTime, endTime) >= 0) break;
  }

  // Calculate scores based on schedule quality
  const totalScheduledMinutes = schedule.reduce((acc, task) => {
    if (!task.taskName.includes('Break')) {
      const duration = calculateDuration(task.startTime, task.endTime);
      return acc + duration;
    }
    return acc;
  }, 0);

  const availableMinutes = calculateDuration(startTime, endTime);
  const utilization = totalScheduledMinutes / availableMinutes;

  const productivity = Math.min(100, Math.round(utilization * 100 + energyLevel * 2));
  const wellness = Math.min(100, Math.round(
    (schedule.filter(t => t.taskName.includes('Break')).length / Math.max(1, schedule.length - 1)) * 50 + 
    (10 - energyLevel) * 5
  ));
  const consistency = Math.min(100, Math.round(
    (sortedTasks.length === adjustedTasks.filter((_, i) => 
      schedule.some(s => s.taskName === sortedTasks[i].name)
    ).length ? 100 : 70)
  ));

  return {
    schedule,
    scores: {
      productivity,
      wellness,
      consistency,
    },
  };
}

// Helper functions
function addMinutesToTime(time: string, minutes: number): string {
  const [hour, min] = time.split(':').map(Number);
  const totalMinutes = hour * 60 + min + minutes;
  const newHour = Math.floor(totalMinutes / 60) % 24;
  const newMin = totalMinutes % 60;
  return `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
}

function compareTime(time1: string, time2: string): number {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);
  const total1 = h1 * 60 + m1;
  const total2 = h2 * 60 + m2;
  return total1 - total2;
}

function calculateDuration(start: string, end: string): number {
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  return (endHour * 60 + endMin) - (startHour * 60 + startMin);
}
