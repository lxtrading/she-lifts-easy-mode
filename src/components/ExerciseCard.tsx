
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, PlayCircle, Info } from 'lucide-react';

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

interface ExerciseCardProps {
  exercise: Exercise;
  isActive: boolean;
  completedSets: number;
  onStart: () => void;
  onCompleteSet: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isActive,
  completedSets,
  onStart,
  onCompleteSet,
}) => {
  const isCompleted = completedSets >= exercise.sets;

  return (
    <Card className={`transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : ''
    } ${isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{exercise.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isCompleted ? "default" : "secondary"}>
              {completedSets}/{exercise.sets} sets
            </Badge>
            {isCompleted && <CheckCircle className="text-green-500" size={20} />}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{exercise.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Exercise Illustration */}
        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={exercise.illustration}
            alt={`${exercise.name} demonstration`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop';
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Reps: </span>
            <span className="text-primary">{exercise.reps}</span>
          </div>
          <div>
            <span className="font-medium">Rest: </span>
            <span className="text-primary">{exercise.restTime}s</span>
          </div>
        </div>

        {isActive && (
          <>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1 flex items-center">
                <Info size={16} className="mr-2" />
                Form Tip
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">{exercise.tips}</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Step-by-Step Instructions</h4>
              <ol className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                {exercise.detailedInstructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium mr-2 text-purple-600 dark:text-purple-400">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        <div className="flex gap-2">
          {!isActive ? (
            <Button
              onClick={onStart}
              variant="outline"
              className="flex-1"
              disabled={isCompleted}
            >
              <PlayCircle size={16} className="mr-2" />
              {isCompleted ? 'Completed' : 'Start'}
            </Button>
          ) : (
            <Button
              onClick={onCompleteSet}
              className="flex-1 gradient-primary text-white border-0"
              disabled={isCompleted}
            >
              <CheckCircle size={16} className="mr-2" />
              Complete Set {completedSets + 1}
            </Button>
          )}
        </div>

        {isActive && completedSets > 0 && (
          <div className="flex justify-center space-x-1">
            {Array.from({ length: exercise.sets }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < completedSets
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
