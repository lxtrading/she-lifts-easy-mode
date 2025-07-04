import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User, Target, Trophy, Heart, Clock, Calendar, Camera, Upload } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { WorkoutVideoGallery } from './WorkoutVideoGallery';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  goal: string;
  level: string;
  favoriteWorkout: string;
  profilePicture?: string;
}

interface WorkoutSession {
  id: string;
  date: string;
  category: string;
  categoryName: string;
  completedSets: number;
  totalSets: number;
  duration: number;
  timestamp: string;
}

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goal: '',
    level: 'beginner',
    favoriteWorkout: '',
    profilePicture: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedHistory = localStorage.getItem('userWorkoutHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setWorkoutHistory(history.slice(-5)); // Show last 5 workouts
    }
  }, []);

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    
    try {
      const fileName = `profile-${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      const updatedProfile = { ...profile, profilePicture: publicUrl };
      setProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

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

  // Calculate total workouts this week
  const thisWeekWorkouts = workoutHistory.filter(workout => {
    const workoutDate = new Date(workout.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return workoutDate >= weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative mx-auto mb-4 w-20 h-20">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.profilePicture} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
              <User size={32} />
            </AvatarFallback>
          </Avatar>
          <label 
            htmlFor="profile-picture-upload" 
            className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Camera size={16} />
          </label>
          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
            disabled={isUploading}
          />
        </div>
        <h1 className="text-2xl font-bold">
          {profile.name ? `Hi, ${profile.name}!` : 'Welcome to FitGirl!'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Your fitness journey starts here</p>
        {isUploading && (
          <p className="text-sm text-primary mt-2">Uploading profile picture...</p>
        )}
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
            <h3 className="font-semibold mb-1">This Week</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{thisWeekWorkouts} workouts</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
            <h3 className="font-semibold mb-1">Total</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{workoutHistory.length} workouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Workout Video Gallery */}
      <WorkoutVideoGallery />

      {/* Recent Workouts */}
      {workoutHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" size={20} />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workoutHistory.slice().reverse().map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium">{workout.categoryName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {workout.completedSets}/{workout.totalSets} sets completed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{workout.date}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {workout.duration}min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
