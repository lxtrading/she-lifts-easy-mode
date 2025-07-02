
import React from 'react';
import { BottomNavigation } from './BottomNavigation';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 pb-20">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto px-4 pt-8">
        {children}
      </main>
      
      <BottomNavigation currentTab={currentTab} onTabChange={onTabChange} />
    </div>
  );
};
