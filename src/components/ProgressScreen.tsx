
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';

interface WorkoutLog {
  date: string;
  category: string;
  completedSets: number;
  totalSets: number;
}

export const ProgressScreen: React.FC = () => {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load workout logs from localStorage
    const savedLogs = localStorage.getItem('workoutLogs');
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setWorkoutLogs(logs);
      calculateStreak(logs);
    }
  }, []);

  const calculateStreak = (logs: WorkoutLog[]) => {
    if (logs.length === 0) {
      setStreak(0);
      return;
    }

    // Sort logs by date (most recent first)
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    let checkDate = new Date();
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      const diffDays = Math.floor((checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        currentStreak++;
        checkDate = logDate;
      } else {
        break;
      }
    }
    
    setStreak(currentStreak);
  };

  const totalWorkouts = workoutLogs.length;
  const thisWeekWorkouts = workoutLogs.filter(log => {
    const logDate = new Date(log.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  }).length;

  const categoryStats = workoutLogs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const achievements = [
    { title: 'First Workout', description: 'Completed your first workout!', earned: totalWorkouts >= 1 },
    { title: 'Consistent Week', description: 'Worked out 3 times this week', earned: thisWeekWorkouts >= 3 },
    { title: 'Streak Master', description: 'Maintained a 7-day streak', earned: streak >= 7 },
    { title: 'Variety Seeker', description: 'Tried all workout categories', earned: Object.keys(categoryStats).length >= 5 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Your Progress</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="text-primary mr-2" size={20} />
            </div>
            <div className="text-2xl font-bold text-primary">{totalWorkouts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Workouts</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="text-orange-500 mr-2" size={20} />
            </div>
            <div className="text-2xl font-bold text-orange-500">{streak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2" size={20} />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Workouts completed</span>
            <span className="font-semibold">{thisWeekWorkouts}/7</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((thisWeekWorkouts / 7) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {Object.keys(categoryStats).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Workout Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize">{category.replace('-', ' ')}</span>
                  <Badge variant="secondary">{count} workouts</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2" size={20} />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-200 bg-gray-50 dark:bg-gray-800 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center">
                      {achievement.earned && '🏆'} {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-yellow-500 text-white">Earned!</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {totalWorkouts === 0 && (
        <Card className="text-center">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Start Your Fitness Journey!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete your first workout to start tracking your progress.
            </p>
            <div className="text-4xl mb-2">💪</div>
            <p className="text-sm text-gray-500">Your future self will thank you!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
