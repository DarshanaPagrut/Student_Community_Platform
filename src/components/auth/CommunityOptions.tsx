"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Code, Users, Trophy, Calendar, Target, Star, ArrowRight } from 'lucide-react';

interface CommunityOptionsProps {
  onOptionSelected: (option: 'coding-club' | 'gdg-community') => void;
}

export default function CommunityOptions({ onOptionSelected }: CommunityOptionsProps) {
  const communityOptions = [
    {
      id: 'coding-club',
      title: 'Join Coding Club',
      description: 'Competitive programming and skill development',
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
      title: 'Join GDG Community',
      description: 'Tech community management and events',
      icon: Users,
      color: 'from-green-500 to-blue-500',
      features: [
        'Event planning & roadmap',
        'Community dashboard',
        'Contribution tracking',
        'Team collaboration',
        'Impact measurement'
      ],
      badge: 'New',
      badgeColor: 'bg-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the community that matches your interests and goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {communityOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <Card 
                key={option.id}
                className="relative cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                onClick={() => onOptionSelected(option.id as 'coding-club' | 'gdg-community')}
              >
                {/* Badge */}
                <div className={`absolute -top-3 -right-3 ${option.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium z-10`}>
                  {option.badge}
                </div>

                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    {option.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {option.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white`}>
                    Join {option.title.split(' ')[1]}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can switch between communities anytime from your profile settings
          </p>
        </div>
      </div>
    </div>
  );
}