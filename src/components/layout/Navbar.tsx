"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun, User } from 'lucide-react';

interface NavbarProps {
  onProfileClick: () => void;
}

export default function Navbar({ onProfileClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Students Platform
          </h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </Button>

          {/* Profile button */}
          <Button
            onClick={onProfileClick}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </nav>
  );
}