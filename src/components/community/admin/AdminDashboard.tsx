"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { 
  Calendar, 
  Users, 
  Trophy, 
  MessageSquare, 
  Settings,
  Plus,
  TrendingUp,
  Target,
  Bell,
  Crown,
  UserPlus,
  Mail,
  BarChart3,
  Lightbulb,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Edit,
  X,
  ChevronDown,
  ChevronRight,
  MapPin,
  Mic,
  FileText,
  Megaphone,
  Play,
  MessageCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: '',
    team: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    targetAudience: '',
    timeline: '',
    targetEntries: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');

  const stats = [
    {
      title: "Active Members",
      value: "24",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Planned Events",
      value: "6",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Contributions",
      value: "89",
      icon: Trophy,
      color: "text-purple-600"
    },
    {
      title: "Open Tasks",
      value: "12",
      icon: MessageSquare,
      color: "text-orange-600"
    }
  ];

  const semesterEvent = {
    title: "AI & Machine Learning Summit",
    description: "A comprehensive 2-day event featuring industry speakers, hands-on workshops, and networking opportunities",
    target: "200+ attendees",
    budget: "$5,000",
    timeline: "8 weeks",
    semester: "Spring 2024"
  };

  const eventRoadmap = [
    {
      id: 'ideation',
      phase: "Event Ideation",
      status: "completed",
      assignedTo: "Core Team",
      timeline: "Week 1",
      description: "Brainstorm event concept and define objectives",
      details: {
        eventName: "AI & ML Summit 2024",
        targetAudience: ["2nd Year", "3rd Year", "4th Year"],
        description: "Focus on practical AI applications and career opportunities",
        targets: ["Minimum 200 student entries", "5+ industry speakers", "3 hands-on workshops"]
      }
    },
    {
      id: 'permissions',
      phase: "Permissions & Venue",
      status: "active",
      assignedTo: "Admin Team",
      timeline: "Week 2",
      description: "Secure permissions and book venue",
      details: {
        permissions: { status: "pending", description: "College administration approval" },
        venue: { status: "completed", description: "Main auditorium booked for March 15-16" }
      }
    },
    {
      id: 'speakers',
      phase: "Speaker Confirmation",
      status: "pending",
      assignedTo: "Outreach Team",
      timeline: "Week 3-4",
      description: "Confirm industry speakers and resource persons",
      details: {
        speakers: [
          { name: "Dr. Sarah Johnson", role: "AI Research Lead at Google", status: "confirmed" },
          { name: "Alex Chen", role: "ML Engineer at Microsoft", status: "pending" },
          { name: "Priya Sharma", role: "Data Scientist at Meta", status: "contacted" }
        ]
      }
    },
    {
      id: 'marketing',
      phase: "Marketing Launch",
      status: "pending",
      assignedTo: "Marketing Team",
      timeline: "Week 5",
      description: "Launch promotional campaigns across platforms"
    },
    {
      id: 'registration',
      phase: "Registration Open",
      status: "pending",
      assignedTo: "Tech Team",
      timeline: "Week 6",
      description: "Open registration portal and manage entries"
    },
    {
      id: 'execution',
      phase: "Event Execution",
      status: "pending",
      assignedTo: "All Teams",
      timeline: "Week 8",
      description: "Execute the main event"
    },
    {
      id: 'feedback',
      phase: "Feedback & Impact",
      status: "pending",
      assignedTo: "Analytics Team",
      timeline: "Week 9",
      description: "Collect feedback and measure impact"
    }
  ];

  const teams = [
    {
      name: "Core Team",
      lead: "Sarah Kim",
      members: ["Alex Chen", "Mike Johnson", "Emma Davis"],
      contributions: 45
    },
    {
      name: "Marketing Team",
      lead: "Priya Sharma",
      members: ["John Doe", "Lisa Wang", "David Brown", "Anna Taylor"],
      contributions: 32
    },
    {
      name: "Content Team",
      lead: "Alex Chen",
      members: ["Maria Garcia", "Tom Wilson", "Sophie Lee"],
      contributions: 28
    },
    {
      name: "Design Team",
      lead: "Emma Davis",
      members: ["Chris Park", "Nina Patel", "Jake Miller"],
      contributions: 24
    },
    {
      name: "Tech Team",
      lead: "Mike Johnson",
      members: ["Ryan Kumar", "Zoe Chen", "Max Rodriguez"],
      contributions: 19
    }
  ];

  const recentActivity = [
    { user: "Sarah Kim", action: "completed speaker outreach template", time: "2 hours ago", type: "completed" },
    { user: "Alex Chen", action: "updated registration portal design", time: "4 hours ago", type: "updated" },
    { user: "Mike Johnson", action: "submitted poster design concepts", time: "6 hours ago", type: "submitted" },
    { user: "Emma Davis", action: "completed venue booking confirmation", time: "1 day ago", type: "completed" }
  ];

  const roles = [
    "Core Team Lead", "Marketing Lead", "Content Lead", "Design Lead", "Tech Lead",
    "Marketing Member", "Content Member", "Design Member", "Tech Member", "Outreach Member"
  ];

  const teamOptions = ["Core Team", "Marketing Team", "Content Team", "Design Team", "Tech Team"];

  const handleInviteMember = () => {
    if (inviteData.email && inviteData.role && inviteData.team) {
      console.log('Inviting member:', inviteData);
      setInviteData({ email: '', role: '', team: '' });
      setShowInviteModal(false);
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.description) {
      console.log('Creating event:', newEvent);
      setNewEvent({ title: '', description: '', targetAudience: '', timeline: '', targetEntries: '' });
      setShowEventModal(false);
    }
  };

  const handleSendUpdate = () => {
    if (updateMessage.trim()) {
      console.log('Sending update:', updateMessage);
      setUpdateMessage('');
      setShowUpdateModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Semester Impact Event */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle>Semester Impact Event</CardTitle>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                {semesterEvent.semester}
              </span>
            </div>
            <Button size="sm" onClick={() => setShowEventModal(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{semesterEvent.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{semesterEvent.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Target:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{semesterEvent.target}</span>
              </div>
              <div>
                <span className="text-green-600 font-medium">Budget:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{semesterEvent.budget}</span>
              </div>
              <div>
                <span className="text-purple-600 font-medium">Timeline:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{semesterEvent.timeline}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.type === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : activity.type === 'updated'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Updates Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
            Send Updates to Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Button onClick={() => setShowUpdateModal(true)} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Update to All Members
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Schedule Announcement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEventRoadmap = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Roadmap</h2>
        <Button onClick={() => setShowEventModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <div className="space-y-4">
        {eventRoadmap.map((phase) => (
          <Card key={phase.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {getStatusIcon(phase.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                        {phase.status}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedEvent(expandedEvent === phase.id ? null : phase.id)}
                    >
                      {expandedEvent === phase.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{phase.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>Timeline: {phase.timeline}</span>
                    <span>Assigned: {phase.assignedTo}</span>
                  </div>

                  {expandedEvent === phase.id && phase.details && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {phase.id === 'ideation' && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Event Name:</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{phase.details.eventName}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Target Audience:</h4>
                            <div className="flex space-x-2 mt-1">
                              {Array.isArray(phase.details.targetAudience) &&
                                phase.details.targetAudience.map((audience, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                                    {audience}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Targets:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {phase.details.targets?.map((target, idx) => (
                                <li key={idx}>{target}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {phase.id === 'permissions' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Permissions:</span>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {phase.details.permissions?.description}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Venue:</span>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" checked readOnly className="rounded" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {phase.details.venue?.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {phase.id === 'speakers' && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">Speaker Confirmations:</h4>
                          {Array.isArray(phase.details.speakers) && phase.details.speakers.map((speaker, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{speaker.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{speaker.role}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                speaker.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : speaker.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                              }`}>
                                {speaker.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTeamMembers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <Card key={team.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lead: {team.lead}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{team.contributions} contributions</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedTeam(expandedTeam === team.name ? null : team.name)}
                >
                  {expandedTeam === team.name ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>

              {expandedTeam === team.name && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Team Members:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {team.members.map((member, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                            {member.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GDG Community</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <Button onClick={() => setShowInviteModal(true)}>
            <Mail className="h-4 w-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'roadmap', label: 'Event Roadmap' },
            { id: 'team', label: 'Team Members' }
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
        {activeTab === 'roadmap' && renderEventRoadmap()}
        {activeTab === 'team' && renderTeamMembers()}
      </div>

      {/* Modals */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Invite Team Member</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowInviteModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="member@college.edu"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Team
                </label>
                <select
                  value={inviteData.team}
                  onChange={(e) => setInviteData(prev => ({ ...prev, team: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Team</option>
                  {teamOptions.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleInviteMember} disabled={!inviteData.email || !inviteData.role || !inviteData.team} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Invite
                </Button>
                <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send Update to Team</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUpdateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Update Message
                </label>
                <textarea
                  placeholder="Write your update message for all team members..."
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSendUpdate} disabled={!updateMessage.trim()} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Update
                </Button>
                <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}