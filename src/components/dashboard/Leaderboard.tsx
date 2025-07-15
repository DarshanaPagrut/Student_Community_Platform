"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Target, Zap } from 'lucide-react';

export default function Leaderboard() {
  const [selectedCriteria, setSelectedCriteria] = useState('overall');

  const leaderboardData = [
    { 
      rank: 1, 
      name: "Alex Chen", 
      score: 2450, 
      solved: 189, 
      streak: 45, 
      contestRank: 1250,
      weeklyPoints: 180,
      change: "+2"
    },
    { 
      rank: 2, 
      name: "Sarah Kim", 
      score: 2380, 
      solved: 175, 
      streak: 32, 
      contestRank: 1180,
      weeklyPoints: 165,
      change: "0"
    },
    { 
      rank: 3, 
      name: "Mike Johnson", 
      score: 2290, 
      solved: 168, 
      streak: 28, 
      contestRank: 1420,
      weeklyPoints: 142,
      change: "+1"
    },
    { 
      rank: 4, 
      name: "Emma Davis", 
      score: 2180, 
      solved: 156, 
      streak: 21, 
      contestRank: 1650,
      weeklyPoints: 128,
      change: "-1"
    },
    { 
      rank: 5, 
      name: "David Wilson", 
      score: 2120, 
      solved: 148, 
      streak: 19, 
      contestRank: 1580,
      weeklyPoints: 115,
      change: "+3"
    },
    { 
      rank: 6, 
      name: "Lisa Zhang", 
      score: 2050, 
      solved: 142, 
      streak: 15, 
      contestRank: 1720,
      weeklyPoints: 98,
      change: "-2"
    },
    { 
      rank: 7, 
      name: "Tom Brown", 
      score: 1980, 
      solved: 138, 
      streak: 12, 
      contestRank: 1890,
      weeklyPoints: 87,
      change: "0"
    },
    { 
      rank: 8, 
      name: "You", 
      score: 1890, 
      solved: 127, 
      streak: 15, 
      contestRank: 2150,
      weeklyPoints: 75,
      change: "+1"
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-yellow-600" />;
      default:
        return <span className="text-gray-500 font-bold text-lg">#{rank}</span>;
    }
  };

  const getChangeIndicator = (change: string) => {
    if (change === "0") return <span className="text-gray-500">—</span>;
    if (change.startsWith("+")) {
      return <span className="text-green-600 flex items-center">↗ {change}</span>;
    }
    return <span className="text-red-600 flex items-center">↘ {change}</span>;
  };

  const criteriaOptions = [
    { id: 'overall', label: 'Overall Score', icon: Trophy },
    { id: 'streak', label: 'Current Streak', icon: Zap },
    { id: 'solved', label: 'Problems Solved', icon: Target },
    { id: 'contest', label: 'Contest Rank', icon: Award }
  ];

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (selectedCriteria) {
      case 'streak':
        return b.streak - a.streak;
      case 'solved':
        return b.solved - a.solved;
      case 'contest':
        return a.contestRank - b.contestRank; // Lower rank is better
      default:
        return b.score - a.score;
    }
  }).map((user, index) => ({ ...user, rank: index + 1 }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          See how you rank among your group members
        </p>
      </div>

      {/* Ranking Criteria Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>How Points Are Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300">Problems Solved</h4>
              <p className="text-blue-700 dark:text-blue-400">Easy: 1pt, Medium: 3pts, Hard: 5pts</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-300">Daily Streak</h4>
              <p className="text-green-700 dark:text-green-400">2 points per day maintained</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-900 dark:text-purple-300">Contest Performance</h4>
              <p className="text-purple-700 dark:text-purple-400">Based on ranking and participation</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-semibold text-orange-900 dark:text-orange-300">Weekly Goals</h4>
              <p className="text-orange-700 dark:text-orange-400">Bonus points for goal completion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Criteria Selector */}
      <div className="flex flex-wrap gap-2">
        {criteriaOptions.map((criteria) => {
          const Icon = criteria.icon;
          return (
            <Button
              key={criteria.id}
              variant={selectedCriteria === criteria.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCriteria(criteria.id)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {criteria.label}
            </Button>
          );
        })}
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            DSA Masters - Java Group
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              (Sorted by {criteriaOptions.find(c => c.id === selectedCriteria)?.label})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedData.map((user) => (
              <div 
                key={user.name}
                className={`flex items-center p-4 rounded-lg transition-all duration-200 ${
                  user.name === 'You' 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-md' 
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  {/* Rank */}
                  <div className="w-12 flex justify-center">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    user.name === 'You' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <span className={`font-medium text-sm ${
                      user.name === 'You' 
                        ? 'text-white' 
                        : 'text-blue-600 dark:text-blue-300'
                    }`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className={`font-semibold ${
                        user.name === 'You' 
                          ? 'text-blue-900 dark:text-blue-100' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {user.name}
                      </p>
                      {user.name === 'You' && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">You</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{user.solved} solved</span>
                      <span>{user.streak} day streak</span>
                      <span>Contest #{user.contestRank}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {selectedCriteria === 'contest' ? `#${user.contestRank}` : 
                           selectedCriteria === 'streak' ? user.streak :
                           selectedCriteria === 'solved' ? user.solved :
                           user.score.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {selectedCriteria === 'contest' ? 'Contest Rank' :
                           selectedCriteria === 'streak' ? 'Days' :
                           selectedCriteria === 'solved' ? 'Problems' :
                           'Points'}
                        </p>
                      </div>
                      <div className="w-8 flex justify-center">
                        {getChangeIndicator(user.change)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">8th</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your Rank</p>
            <p className="text-xs text-green-600 mt-1">↗ +1 this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,890</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your Score</p>
            <p className="text-xs text-green-600 mt-1">+75 this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">560</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Points to Next Rank</p>
            <p className="text-xs text-gray-500 mt-1">~8 problems needed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">15</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
            <p className="text-xs text-purple-600 mt-1">Keep it up! 🔥</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Hall of Fame</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedData.slice(0, 3).map((user, index) => (
              <div key={user.name} className="text-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg">
                <div className="mb-3">
                  {index === 0 && <Crown className="h-12 w-12 text-yellow-500 mx-auto" />}
                  {index === 1 && <Trophy className="h-12 w-12 text-gray-400 mx-auto" />}
                  {index === 2 && <Medal className="h-12 w-12 text-yellow-600 mx-auto" />}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.score.toLocaleString()} points</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{user.solved} problems • {user.streak} day streak</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}