"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { 
  Calendar, 
  Users, 
  Trophy, 
  MessageSquare, 
  Bell,
  Target,
  Star,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  User,
  ArrowLeft
} from 'lucide-react';

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design event poster for AI Summit",
      event: "AI & Machine Learning Summit",
      deadline: "March 10, 2025",
      status: "in-progress",
      assignedBy: "Sarah Kim",
      description: "Create promotional poster with event details and speaker information"
    },
    {
      id: 2,
      title: "Write blog post about event experience",
      event: "Web Development Workshop",
      deadline: "March 15, 2025",
      status: "pending",
      assignedBy: "Alex Chen",
      description: "Document the workshop experience and key learnings"
    },
    {
      id: 3,
      title: "Contact potential speakers",
      event: "AI & Machine Learning Summit",
      deadline: "March 8, 2025",
      status: "completed",
      assignedBy: "Mike Johnson",
      description: "Reach out to industry professionals for speaking opportunities"
    }
  ]);

  const memberStats = [
    {
      title: "Tasks Assigned",
      value: "8",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Tasks Completed",
      value: "5",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Events Joined",
      value: "3",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Contributions",
      value: "12",
      icon: Trophy,
      color: "text-orange-600"
    }
  ];

  const semesterEvent = {
    title: "AI & Machine Learning Summit",
    description: "Join the design team to create visual materials for our biggest event this semester",
    role: "Design Team",
    timeRemaining: "6 weeks remaining"
  };

  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Summit",
      date: "March 15-16, 2025",
      role: "Design Team Member",
      status: "active",
      progress: 65
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "February 28, 2025",
      role: "Content Team Member",
      status: "completed",
      progress: 100
    },
    {
      id: 3,
      title: "Career Fair Preparation",
      date: "April 5, 2025",
      role: "Outreach Team Member",
      status: "upcoming",
      progress: 0
    }
  ];

  const contributions = [
    {
      id: 1,
      title: "Designed poster for React Workshop",
      date: "March 1, 2025",
      status: "approved",
      points: 25,
      event: "React Workshop"
    },
    {
      id: 2,
      title: "Wrote blog post on Flutter basics",
      date: "February 28, 2025",
      status: "published",
      points: 30,
      event: "Flutter Workshop"
    },
    {
      id: 3,
      title: "Helped with event registration",
      date: "February 25, 2025",
      status: "completed",
      points: 15,
      event: "Web Dev Workshop"
    },
    {
      id: 4,
      title: "Created social media graphics",
      date: "February 20, 2025",
      status: "approved",
      points: 20,
      event: "AI Summit"
    }
  ];

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'published':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
      case 'active':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Semester Impact Event */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <CardTitle>This Semester's Impact Event</CardTitle>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get involved in our major community initiative</p>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{semesterEvent.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{semesterEvent.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 font-medium">Your Role: {semesterEvent.role}</span>
                <span className="text-green-600 font-medium">{semesterEvent.timeRemaining}</span>
              </div>
              <Button>
                View Tasks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memberStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            My Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.filter(task => task.status !== 'completed').map((task) => (
              <div key={task.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <span>Event: {task.event}</span>
                      <span>Due: {task.deadline}</span>
                      <span>Assigned by: {task.assignedBy}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {task.status === 'pending' && (
                    <Button size="sm" onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                      Start Task
                    </Button>
                  )}
                  {task.status === 'in-progress' && (
                    <Button size="sm" onClick={() => updateTaskStatus(task.id, 'completed')}>
                      Mark Complete
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Events</h2>
      
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Role: {event.role}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              {event.status === 'active' && (
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{event.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${event.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContributions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Contributions</h2>
      
      <div className="space-y-4">
        {contributions.map((contribution) => (
          <Card key={contribution.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(contribution.status)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{contribution.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Event: {contribution.event}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{contribution.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                    {contribution.status}
                  </span>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                    +{contribution.points} pts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, Alex!</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">GDG Community Member</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
              Design Team
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
              Event Planner ⭐
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'My Dashboard' },
            { id: 'events', label: 'Events' },
            { id: 'contributions', label: 'My Contributions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'contributions' && renderContributions()}
      </div>
    </div>
  );
}