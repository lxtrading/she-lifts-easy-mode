
import { useState, useEffect } from 'react';

interface WorkoutLog {
  date: string;
  category: string;
  completedSets: number;
  totalSets: number;
}

export const useWorkoutStorage = () => {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('workoutLogs');
    if (savedLogs) {
      setWorkoutLogs(JSON.parse(savedLogs));
    }
  }, []);

  const addWorkoutLog = (category: string, completedSets: number, totalSets: number) => {
    const newLog: WorkoutLog = {
      date: new Date().toISOString().split('T')[0],
      category,
      completedSets,
      totalSets,
    };

    const updatedLogs = [...workoutLogs, newLog];
    setWorkoutLogs(updatedLogs);
    localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));
  };

  const clearAllLogs = () => {
    setWorkoutLogs([]);
    localStorage.removeItem('workoutLogs');
  };

  return {
    workoutLogs,
    addWorkoutLog,
    clearAllLogs,
  };
};
