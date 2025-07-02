
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User, Target, Trophy, Heart } from 'lucide-react';

interface UserProfile {
  name: string;
  goal: string;
  level: string;
  favoriteWorkout: string;
}

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goal: '',
    level: 'beginner',
    favoriteWorkout: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const fitnessQuotes = [
    "Strong women lift each other up! 💕",
    "You are capable of amazing things! ✨",
    "Progress, not perfection! 🌟",
    "Your body can do it. It's your mind you need to convince! 💪",
    "Every workout is a step closer to your goals! 🎯"
  ];

  const todayQuote = fitnessQuotes[new Date().getDay() % fitnessQuotes.length];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold">
          {profile.name ? `Hi, ${profile.name}!` : 'Welcome to FitGirl!'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Your fitness journey starts here</p>
      </div>

      {/* Daily Motivation */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4 text-center">
          <Heart className="text-pink-500 mx-auto mb-2" size={24} />
          <p className="text-purple-800 dark:text-purple-200 font-medium">{todayQuote}</p>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            {isEditing ? (
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{profile.name || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fitness Goal</label>
            {isEditing ? (
              <Input
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                placeholder="e.g., Get stronger, lose weight, build muscle"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{profile.goal || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fitness Level</label>
            {isEditing ? (
              <select
                value={profile.level}
                onChange={(e) => setProfile({ ...profile, level: e.target.value })}
                className="w-full p-2 border rounded-md dark:bg-gray-800"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            ) : (
              <Badge variant="secondary" className="capitalize">{profile.level}</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="text-blue-500 mx-auto mb-2" size={24} />
            <h3 className="font-semibold mb-1">Weekly Goal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">3 workouts</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
            <h3 className="font-semibold mb-1">Level</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{profile.level}</p>
          </CardContent>
        </Card>
      </div>

      {/* Beginner Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">💡 Beginner Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <ul className="space-y-2 text-sm">
            <li>• Start with 2-3 workouts per week</li>
            <li>• Focus on form over weight</li>
            <li>• Listen to your body and rest when needed</li>
            <li>• Stay hydrated and get enough sleep</li>
            <li>• Celebrate small victories! 🎉</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
