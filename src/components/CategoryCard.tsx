
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 overflow-hidden">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${category.color} h-24 flex items-center justify-center`}>
          <span className="text-4xl">{category.emoji}</span>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>
          <Button 
            onClick={onClick}
            className="w-full gradient-primary text-white border-0 hover:opacity-90 transition-opacity"
          >
            Start Workout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
