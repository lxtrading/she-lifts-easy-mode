
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CategoryCard } from './CategoryCard';

interface HomeScreenProps {
  onCategorySelect: (category: string) => void;
}

const motivationalQuotes = [
  "You're stronger than you think! 💪",
  "Every rep counts! Keep pushing! 🔥",
  "Strong women lift each other up! 💕",
  "Progress, not perfection! ✨",
  "Your only competition is who you were yesterday! 🌟"
];

const categories = [
  {
    id: 'core',
    name: 'Core',
    description: 'Strengthen your abs and core',
    emoji: '🔥',
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'lower-back',
    name: 'Lower Back',
    description: 'Build a strong foundation',
    emoji: '💪',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'legs',
    name: 'Legs',
    description: 'Power up your lower body',
    emoji: '🦵',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'glutes',
    name: 'Glutes',
    description: 'Sculpt and strengthen',
    emoji: '🍑',
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Get your heart pumping',
    emoji: '❤️',
    color: 'from-purple-400 to-violet-500'
  }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCategorySelect }) => {
  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
          Hey Beautiful! 💕
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Ready to crush your workout today?</p>
      </div>

      <Card className="gradient-primary text-white border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Daily Motivation</h2>
          <p className="text-white/90">{todayQuote}</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Focus</h2>
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onCategorySelect(category.id)}
            />
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800">
        <CardContent className="p-4">
          <h3 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">💡 Beginner Tip</h3>
          <p className="text-sm text-cyan-700 dark:text-cyan-300">
            Start with lighter weights and focus on proper form. It's better to do fewer reps correctly than many reps incorrectly!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
