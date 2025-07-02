
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ExerciseCard } from './ExerciseCard';
import { WorkoutTimer } from './WorkoutTimer';
import { ArrowLeft } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number;
  tips: string;
}

interface WorkoutScreenProps {
  category: string;
  onBack: () => void;
}

const exerciseData: Record<string, Exercise[]> = {
  core: [
    {
      id: 'plank',
      name: 'Plank',
      description: 'Hold your body straight like a board',
      sets: 3,
      reps: '30-60 seconds',
      restTime: 60,
      tips: 'Keep your core tight and body straight. Don\'t let your hips sag!'
    },
    {
      id: 'bicycle-crunches',
      name: 'Bicycle Crunches',
      description: 'Alternate bringing elbow to opposite knee',
      sets: 3,
      reps: '15-20 each side',
      restTime: 45,
      tips: 'Slow and controlled movements. Focus on the twist!'
    },
    {
      id: 'dead-bug',
      name: 'Dead Bug',
      description: 'Lie on back, extend opposite arm and leg',
      sets: 3,
      reps: '10-12 each side',
      restTime: 45,
      tips: 'Keep your lower back pressed to the floor throughout the movement.'
    }
  ],
  'lower-back': [
    {
      id: 'superman',
      name: 'Superman',
      description: 'Lie face down, lift chest and legs',
      sets: 3,
      reps: '12-15',
      restTime: 45,
      tips: 'Lift slowly and squeeze your glutes and lower back muscles.'
    },
    {
      id: 'bird-dog',
      name: 'Bird Dog',
      description: 'Extend opposite arm and leg from hands and knees',
      sets: 3,
      reps: '10-12 each side',
      restTime: 45,
      tips: 'Keep your hips level and core engaged throughout the movement.'
    }
  ],
  legs: [
    {
      id: 'squats',
      name: 'Bodyweight Squats',
      description: 'Sit back like sitting in a chair',
      sets: 3,
      reps: '12-15',
      restTime: 60,
      tips: 'Keep your knees behind your toes and weight in your heels.'
    },
    {
      id: 'lunges',
      name: 'Forward Lunges',
      description: 'Step forward and lower your body',
      sets: 3,
      reps: '10-12 each leg',
      restTime: 60,
      tips: 'Take a big step forward and keep your front knee over your ankle.'
    }
  ],
  glutes: [
    {
      id: 'glute-bridges',
      name: 'Glute Bridges',
      description: 'Lie on back, lift hips up',
      sets: 3,
      reps: '15-20',
      restTime: 45,
      tips: 'Squeeze your glutes at the top and keep your core tight.'
    },
    {
      id: 'clamshells',
      name: 'Clamshells',
      description: 'Lie on side, open and close top leg',
      sets: 3,
      reps: '12-15 each side',
      restTime: 45,
      tips: 'Keep your feet together and focus on using your glute muscles.'
    }
  ],
  cardio: [
    {
      id: 'jumping-jacks',
      name: 'Jumping Jacks',
      description: 'Jump feet apart while raising arms overhead',
      sets: 3,
      reps: '30-45 seconds',
      restTime: 60,
      tips: 'Land softly on the balls of your feet and keep a steady rhythm.'
    },
    {
      id: 'high-knees',
      name: 'High Knees',
      description: 'Run in place bringing knees up high',
      sets: 3,
      reps: '30 seconds',
      restTime: 60,
      tips: 'Pump your arms and try to bring your knees to hip level.'
    }
  ]
};

export const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ category, onBack }) => {
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);

  const exercises = exerciseData[category] || [];
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  const handleStartExercise = (index: number) => {
    setCurrentExercise(index);
  };

  const handleCompleteSet = (exerciseId: string) => {
    const currentSets = completedSets[exerciseId] || 0;
    const newSets = Math.min(currentSets + 1, exercises.find(e => e.id === exerciseId)?.sets || 0);
    
    setCompletedSets(prev => ({
      ...prev,
      [exerciseId]: newSets
    }));

    // Start rest timer if not the last set
    const exercise = exercises.find(e => e.id === exerciseId);
    if (exercise && newSets < exercise.sets) {
      setIsResting(true);
      setRestTime(exercise.restTime);
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    setRestTime(0);
  };

  const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const completedSetsCount = Object.values(completedSets).reduce((sum, sets) => sum + sets, 0);
  const progressPercentage = (completedSetsCount / totalSets) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="rounded-full w-10 h-10 p-0"
        >
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-2xl font-bold">{categoryName} Workout</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Progress</span>
            <span className="text-sm text-green-700 dark:text-green-300">
              {completedSetsCount}/{totalSets} sets
            </span>
          </div>
          <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {isResting && (
        <WorkoutTimer
          duration={restTime}
          onComplete={handleRestComplete}
          title="Rest Time"
        />
      )}

      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isActive={currentExercise === index}
            completedSets={completedSets[exercise.id] || 0}
            onStart={() => handleStartExercise(index)}
            onCompleteSet={() => handleCompleteSet(exercise.id)}
          />
        ))}
      </div>

      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Workout Complete! 🎉</h2>
            <p className="mb-4">Amazing job! You crushed it today!</p>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Cool Down Reminder</h3>
              <p className="text-sm">Don't forget to stretch! Hold each stretch for 15-30 seconds to help your muscles recover.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
