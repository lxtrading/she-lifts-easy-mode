import React, { useState, useEffect } from 'react';
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
  illustration: string;
  detailedInstructions: string[];
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
      tips: 'Keep your core tight and body straight. Don\'t let your hips sag!',
      illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      detailedInstructions: [
        'Start in a push-up position with forearms on the ground',
        'Keep your body in a straight line from head to heels',
        'Engage your core muscles and squeeze your glutes',
        'Hold the position while breathing normally',
        'Don\'t let your hips drop or pike up'
      ]
    },
    {
      id: 'bicycle-crunches',
      name: 'Bicycle Crunches',
      description: 'Alternate bringing elbow to opposite knee',
      sets: 3,
      reps: '15-20 each side',
      restTime: 45,
      tips: 'Slow and controlled movements. Focus on the twist!',
      illustration: 'https://images.unsplash.com/photo-1594737626795-f0d6ca2d6d51',
      detailedInstructions: [
        'Lie on your back with hands behind your head',
        'Lift your shoulder blades off the ground',
        'Bring your right elbow toward your left knee',
        'Extend your right leg while twisting',
        'Alternate sides in a pedaling motion'
      ]
    },
    {
      id: 'dead-bug',
      name: 'Dead Bug',
      description: 'Lie on back, extend opposite arm and leg',
      sets: 3,
      reps: '10-12 each side',
      restTime: 45,
      tips: 'Keep your lower back pressed to the floor throughout the movement.',
      illustration: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      detailedInstructions: [
        'Lie on your back with arms extended toward ceiling',
        'Bend knees 90 degrees, shins parallel to floor',
        'Slowly lower opposite arm and leg toward floor',
        'Keep your core engaged and back flat',
        'Return to starting position and switch sides'
      ]
    },
    {
      id: 'mountain-climbers',
      name: 'Mountain Climbers',
      description: 'Run in place in plank position',
      sets: 3,
      reps: '20-30 seconds',
      restTime: 60,
      tips: 'Keep your core engaged and bring knees to chest alternately.',
      illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      detailedInstructions: [
        'Start in a plank position with hands under shoulders',
        'Keep your core tight and body straight',
        'Quickly alternate bringing knees to chest',
        'Land softly on balls of feet',
        'Maintain steady breathing throughout'
      ]
    },
    {
      id: 'russian-twists',
      name: 'Russian Twists',
      description: 'Sit and rotate torso side to side',
      sets: 3,
      reps: '15-20 each side',
      restTime: 45,
      tips: 'Lean back slightly and lift feet for extra challenge. Keep chest up!',
      illustration: 'https://images.unsplash.com/photo-1594737626795-f0d6ca2d6d51',
      detailedInstructions: [
        'Sit with knees bent and feet flat on floor',
        'Lean back slightly, keeping chest up',
        'Lift feet off ground for advanced version',
        'Rotate torso to touch floor beside hip',
        'Alternate sides with controlled movement'
      ]
    },
    {
      id: 'leg-raises',
      name: 'Leg Raises',
      description: 'Lie on back and lift legs up',
      sets: 3,
      reps: '12-15',
      restTime: 45,
      tips: 'Keep your lower back pressed down and lift legs slowly and controlled.',
      illustration: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      detailedInstructions: [
        'Lie flat on your back with legs straight',
        'Place hands under lower back for support',
        'Keep legs straight and lift to 90 degrees',
        'Lower legs slowly without touching floor',
        'Keep lower back pressed to ground'
      ]
    },
    {
      id: 'hollow-hold',
      name: 'Hollow Hold',
      description: 'Hold body in banana shape',
      sets: 3,
      reps: '20-30 seconds',
      restTime: 60,
      tips: 'Press lower back into floor and hold the hollow position. Breathe normally!',
      illustration: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      detailedInstructions: [
        'Lie on your back with arms overhead',
        'Press lower back firmly into floor',
        'Lift shoulders and legs off ground',
        'Create a banana or hollow shape',
        'Hold position while breathing normally'
      ]
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
      tips: 'Lift slowly and squeeze your glutes and lower back muscles.',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Lie face down with arms extended forward',
        'Keep your neck in neutral position',
        'Simultaneously lift chest, arms, and legs',
        'Squeeze glutes and lower back muscles',
        'Hold for 2-3 seconds, then lower slowly'
      ]
    },
    {
      id: 'bird-dog',
      name: 'Bird Dog',
      description: 'Extend opposite arm and leg from hands and knees',
      sets: 3,
      reps: '10-12 each side',
      restTime: 45,
      tips: 'Keep your hips level and core engaged throughout the movement.',
      illustration: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      detailedInstructions: [
        'Start on hands and knees in tabletop position',
        'Keep your spine neutral and core engaged',
        'Extend opposite arm and leg simultaneously',
        'Hold for 3-5 seconds maintaining balance',
        'Return to start and switch sides'
      ]
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
      tips: 'Keep your knees behind your toes and weight in your heels.',
      illustration: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
      detailedInstructions: [
        'Stand with feet shoulder-width apart',
        'Keep your chest up and core engaged',
        'Sit back as if sitting in a chair',
        'Lower until thighs are parallel to floor',
        'Push through heels to return to standing'
      ]
    },
    {
      id: 'lunges',
      name: 'Forward Lunges',
      description: 'Step forward and lower your body',
      sets: 3,
      reps: '10-12 each leg',
      restTime: 60,
      tips: 'Take a big step forward and keep your front knee over your ankle.',
      illustration: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
      detailedInstructions: [
        'Stand tall with feet hip-width apart',
        'Step forward with one leg into lunge',
        'Lower back knee toward floor',
        'Keep front knee over ankle',
        'Push back to starting position'
      ]
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
      tips: 'Squeeze your glutes at the top and keep your core tight.',
      illustration: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      detailedInstructions: [
        'Lie on back with knees bent, feet flat',
        'Keep feet hip-width apart',
        'Squeeze glutes and lift hips up',
        'Create straight line from knees to shoulders',
        'Hold for 2 seconds, then lower slowly'
      ]
    },
    {
      id: 'clamshells',
      name: 'Clamshells',
      description: 'Lie on side, open and close top leg',
      sets: 3,
      reps: '12-15 each side',
      restTime: 45,
      tips: 'Keep your feet together and focus on using your glute muscles.',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Lie on your side with knees bent 45 degrees',
        'Keep feet and hips stacked',
        'Lift top knee while keeping feet together',
        'Focus on using glute muscles',
        'Lower with control and repeat'
      ]
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
      tips: 'Land softly on the balls of your feet and keep a steady rhythm.',
      illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      detailedInstructions: [
        'Stand with feet together, arms at sides',
        'Jump feet apart while raising arms overhead',
        'Land softly on balls of feet',
        'Jump back to starting position',
        'Maintain steady rhythm throughout'
      ]
    },
    {
      id: 'high-knees',
      name: 'High Knees',
      description: 'Run in place bringing knees up high',
      sets: 3,
      reps: '30 seconds',
      restTime: 60,
      tips: 'Pump your arms and try to bring your knees to hip level.',
      illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      detailedInstructions: [
        'Stand tall with feet hip-width apart',
        'Run in place lifting knees to hip level',
        'Pump arms naturally as you run',
        'Land on balls of feet',
        'Keep core engaged throughout'
      ]
    },
    {
      id: 'treadmill-walk',
      name: 'Treadmill Walking',
      description: 'Brisk walk with incline for fat burning',
      sets: 1,
      reps: '15-30 minutes',
      restTime: 0,
      tips: 'Start at 3-4 mph with 2-5% incline. Increase gradually as you get stronger!',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Start with 5-minute warm-up at easy pace',
        'Set speed to 3-4 mph with 2-5% incline',
        'Maintain upright posture, don\'t lean on rails',
        'Swing arms naturally at your sides',
        'Cool down with 5 minutes at slower pace'
      ]
    },
    {
      id: 'treadmill-intervals',
      name: 'Treadmill Intervals',
      description: 'Alternate between walking and jogging',
      sets: 5,
      reps: '1 min jog, 2 min walk',
      restTime: 0,
      tips: 'Start conservatively! Jog at comfortable pace, then recover with brisk walk.',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Warm up with 5 minutes of walking',
        'Jog for 1 minute at comfortable pace',
        'Recover with 2 minutes brisk walking',
        'Repeat the cycle 5 times',
        'Cool down with 5 minutes easy walking'
      ]
    },
    {
      id: 'stationary-bike',
      name: 'Stationary Bike',
      description: 'Steady cycling for cardio endurance',
      sets: 1,
      reps: '20-45 minutes',
      restTime: 0,
      tips: 'Keep moderate resistance. You should be able to hold a conversation!',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Adjust seat height so leg is slightly bent at bottom',
        'Start with 5-minute easy warm-up',
        'Maintain moderate resistance throughout',
        'Keep steady cadence of 70-90 RPM',
        'Cool down with 5 minutes easy pedaling'
      ]
    },
    {
      id: 'bike-intervals',
      name: 'Bike Intervals',
      description: 'High intensity cycling bursts',
      sets: 6,
      reps: '30 sec hard, 90 sec easy',
      restTime: 0,
      tips: 'Push hard during intervals, then recover completely. Build up gradually!',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Warm up with 10 minutes easy cycling',
        'Sprint hard for 30 seconds',
        'Recover with 90 seconds easy pedaling',
        'Repeat cycle 6 times',
        'Cool down with 10 minutes easy cycling'
      ]
    },
    {
      id: 'elliptical-steady',
      name: 'Elliptical Machine',
      description: 'Low-impact full body cardio workout',
      sets: 1,
      reps: '20-45 minutes',
      restTime: 0,
      tips: 'Use both arms and legs. Keep moderate resistance for steady-state cardio.',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Step onto pedals and grab moving handles',
        'Start with 5-minute easy warm-up',
        'Maintain moderate resistance and steady pace',
        'Use both upper and lower body',
        'Keep upright posture throughout',
        'Cool down with 5 minutes at easy pace'
      ]
    },
    {
      id: 'elliptical-intervals',
      name: 'Elliptical Intervals',
      description: 'High intensity elliptical training',
      sets: 8,
      reps: '45 sec hard, 75 sec easy',
      restTime: 0,
      tips: 'Increase resistance and speed during hard intervals. Focus on full body movement!',
      illustration: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      detailedInstructions: [
        'Warm up with 10 minutes moderate pace',
        'Increase resistance and speed for 45 seconds',
        'Push with both arms and legs during hard phase',
        'Recover with 75 seconds at easy pace',
        'Repeat cycle 8 times',
        'Cool down with 10 minutes easy pace'
      ]
    },
    {
      id: 'burpees',
      name: 'Burpees',
      description: 'Full body explosive movement',
      sets: 3,
      reps: '5-10 reps',
      restTime: 90,
      tips: 'Start with modified version (no jump) if needed. Focus on smooth transitions!',
      illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      detailedInstructions: [
        'Start standing with feet shoulder-width apart',
        'Squat down and place hands on floor',
        'Jump feet back into plank position',
        'Do a push-up (optional for beginners)',
        'Jump feet back to squat, then jump up with arms overhead'
      ]
    }
  ]
};

export const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ category, onBack }) => {
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);

  const exercises = exerciseData[category] || [];
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  // Start workout timer when first exercise begins
  useEffect(() => {
    if (currentExercise !== null && workoutStartTime === null) {
      setWorkoutStartTime(new Date());
    }
  }, [currentExercise, workoutStartTime]);

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

  const saveWorkoutSession = () => {
    if (!workoutStartTime) return;

    const workoutSession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category,
      categoryName,
      completedSets: Object.values(completedSets).reduce((sum, sets) => sum + sets, 0),
      totalSets: exercises.reduce((sum, exercise) => sum + exercise.sets, 0),
      exercises: exercises.map(exercise => ({
        name: exercise.name,
        completedSets: completedSets[exercise.id] || 0,
        totalSets: exercise.sets
      })),
      duration: Math.round((new Date().getTime() - workoutStartTime.getTime()) / 1000 / 60), // in minutes
      timestamp: new Date().toISOString()
    };

    // Save to workout logs
    const existingLogs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
    const updatedLogs = [...existingLogs, workoutSession];
    localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));

    // Save to user's workout history
    const existingHistory = JSON.parse(localStorage.getItem('userWorkoutHistory') || '[]');
    const updatedHistory = [...existingHistory, workoutSession];
    localStorage.setItem('userWorkoutHistory', JSON.stringify(updatedHistory));
  };

  const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const completedSetsCount = Object.values(completedSets).reduce((sum, sets) => sum + sets, 0);
  const progressPercentage = (completedSetsCount / totalSets) * 100;

  // Auto-save when workout is completed
  useEffect(() => {
    if (progressPercentage === 100 && workoutStartTime) {
      saveWorkoutSession();
    }
  }, [progressPercentage, workoutStartTime]);

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
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Workout Saved! ✅</h3>
              <p className="text-sm">Your progress has been automatically saved to your profile.</p>
            </div>
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
