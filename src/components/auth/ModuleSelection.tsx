"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Code, Users, Lightbulb, ArrowRight, Star, Trophy, Calendar } from 'lucide-react';

interface ModuleSelectionProps {
  onModuleSelected: (module: string) => void;
}

export default function ModuleSelection({ onModuleSelected }: ModuleSelectionProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'coding-club',
      title: 'Coding Club',
      description: 'Join our competitive programming community',
      icon: Code,
      color: 'from-blue-500 to-indigo-600',
      features: [
        'LeetCode problem tracking',
        'Daily coding challenges',
        'Group competitions',
        'Progress leaderboards',
        'AI doubt solver'
      ],
      badge: 'Most Popular',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'gdg-community',
      title: 'GDG Community',
      description: 'Google Developer Groups chapter management',
      icon: Users,
      color: 'from-green-500 to-blue-500',
      features: [
        'Event planning & roadmap',
        'Community dashboard',
        'Contribution tracking',
        'Mentorship hub',
        'Announcement board'
      ],
      badge: 'New',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'innovation-hub',
      title: 'Innovation Hub',
      description: 'Project collaboration and innovation space',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Project showcases',
        'Team formation',
        'Idea validation',
        'Resource sharing',
        'Innovation challenges'
      ],
      badge: 'Coming Soon',
      badgeColor: 'bg-gray-500'
    }
  ];

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId === 'innovation-hub') return; // Coming soon
    setSelectedModule(moduleId);
  };

  const handleContinue = () => {
    if (selectedModule) {
      onModuleSelected(selectedModule);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the module that best fits your interests and goals. You can always switch later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {modules.map((module) => {
            const Icon = module.icon;
            const isSelected = selectedModule === module.id;
            const isComingSoon = module.id === 'innovation-hub';
            
            return (
              <Card 
                key={module.id}
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-blue-500 shadow-2xl' 
                    : isComingSoon
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-xl'
                } ${isComingSoon ? '' : 'hover:shadow-xl'}`}
                onClick={() => handleModuleSelect(module.id)}
              >
                {/* Badge */}
                <div className={`absolute -top-3 -right-3 ${module.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium z-10`}>
                  {module.badge}
                </div>

                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    {module.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {module.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {module.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isSelected && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center text-blue-700 dark:text-blue-300">
                        <Trophy className="h-5 w-5 mr-2" />
                        <span className="font-medium">Selected Module</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedModule && (
          <div className="text-center">
            <Button 
              onClick={handleContinue}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
            >
              Continue to {modules.find(m => m.id === selectedModule)?.title}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help choosing? Contact our support team for guidance.
          </p>
        </div>
      </div>
    </div>
  );
}