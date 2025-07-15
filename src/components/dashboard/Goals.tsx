"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Target, Calendar, CheckCircle, Zap, X, Edit } from 'lucide-react';

export default function Goals() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    description: '',
    type: 'daily'
  });

  const goals = [
    {
      id: 1,
      title: "Complete 50 Array Problems",
      progress: 32,
      total: 50,
      deadline: "March 15, 2025",
      status: "active",
      type: "weekly",
      description: "Master array manipulation and algorithms"
    },
    {
      id: 2,
      title: "Daily LeetCode Problem",
      progress: 15,
      total: 30,
      deadline: "End of month",
      status: "active",
      type: "daily",
      description: "Solve at least one problem every day"
    },
    {
      id: 3,
      title: "Master Dynamic Programming",
      progress: 8,
      total: 20,
      deadline: "April 1, 2025",
      status: "active",
      type: "weekly",
      description: "Complete DP patterns and practice problems"
    },
    {
      id: 4,
      title: "Weekly Contest Participation",
      progress: 4,
      total: 4,
      deadline: "Completed",
      status: "completed",
      type: "weekly",
      description: "Participate in weekly coding contests"
    },
    {
      id: 5,
      title: "Study 2 Hours Daily",
      progress: 12,
      total: 15,
      deadline: "This month",
      status: "active",
      type: "daily",
      description: "Maintain consistent study schedule"
    }
  ];

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.description) {
      console.log('Creating goal:', newGoal);
      setNewGoal({ title: '', target: '', description: '', type: 'daily' });
      setShowCreateForm(false);
    }
  };

  const getGoalIcon = (type: string) => {
    return type === 'daily' ? (
      <Zap className="h-5 w-5 text-yellow-600" />
    ) : (
      <Calendar className="h-5 w-5 text-blue-600" />
    );
  };

  const getGoalTypeStyle = (type: string) => {
    return type === 'daily' 
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Goals</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your learning objectives and progress
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Goal Type Filters */}
      <div className="flex space-x-4">
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Daily Goals
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Weekly Goals
        </Button>
        <Button variant="outline" size="sm">
          All Goals
        </Button>
      </div>

      {/* Create Goal Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Create New Goal</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Goal Title
                </label>
                <Input
                  placeholder="e.g., Complete 30 Array Problems"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Number
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 30"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Goal Type
                  </label>
                  <select
                    value={newGoal.type}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="daily">⚡ Daily</option>
                    <option value="weekly">📅 Weekly</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe your goal and why it's important..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleCreateGoal}
                  disabled={!newGoal.title || !newGoal.target || !newGoal.description}
                >
                  Create Goal
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className={goal.status === 'completed' ? 'opacity-75' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {goal.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      getGoalIcon(goal.type)
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {goal.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGoalTypeStyle(goal.type)}`}>
                        {goal.type === 'daily' ? '⚡ Daily' : '📅 Weekly'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        goal.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                      }`}>
                        {goal.status === 'completed' ? 'Completed' : 'Active'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{goal.progress}/{goal.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            goal.status === 'completed' 
                              ? 'bg-green-600' 
                              : goal.type === 'daily'
                              ? 'bg-yellow-600'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min((goal.progress / goal.total) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {Math.round((goal.progress / goal.total) * 100)}% complete
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {goal.total - goal.progress} remaining
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {goal.deadline}
                      </div>
                      
                      {goal.status === 'active' && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm">
                            Update Progress
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Goals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed This Month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">73%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Completion</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}