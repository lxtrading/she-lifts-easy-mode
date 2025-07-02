
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { HomeScreen } from '../components/HomeScreen';
import { WorkoutScreen } from '../components/WorkoutScreen';
import { ProgressScreen } from '../components/ProgressScreen';
import { ProfileScreen } from '../components/ProfileScreen';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentTab('workouts');
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setCurrentTab('home');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen onCategorySelect={handleCategorySelect} />;
      case 'workouts':
        return selectedCategory ? (
          <WorkoutScreen category={selectedCategory} onBack={handleBackToHome} />
        ) : (
          <HomeScreen onCategorySelect={handleCategorySelect} />
        );
      case 'progress':
        return <ProgressScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
