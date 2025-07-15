"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Users, Crown, UserPlus, Mail, ArrowRight, Shield, Star } from 'lucide-react';

interface CommunityTypeSelectionProps {
  onRoleSelected: (role: 'admin' | 'member', data?: any) => void;
}

export default function CommunityTypeSelection({ onRoleSelected }: CommunityTypeSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'member' | null>(null);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [adminData, setAdminData] = useState({
    communityName: '',
    communityType: 'GDG',
    description: '',
    college: ''
  });
  const [memberData, setMemberData] = useState({
    inviteCode: '',
    email: ''
  });

  const communityTypes = [
    { id: 'GDG', name: 'Google Developer Groups', color: 'from-blue-500 to-green-500' },
    { id: 'IEEE', name: 'IEEE Student Branch', color: 'from-blue-600 to-blue-800' },
    { id: 'ACM', name: 'ACM Student Chapter', color: 'from-green-600 to-blue-600' },
    { id: 'Other', name: 'Other Tech Community', color: 'from-purple-500 to-pink-500' }
  ];

  const handleRoleSelect = (role: 'admin' | 'member') => {
    setSelectedRole(role);
    if (role === 'admin') {
      setShowAdminForm(true);
      setShowMemberForm(false);
    } else {
      setShowMemberForm(true);
      setShowAdminForm(false);
    }
  };

  const handleAdminSubmit = () => {
    if (adminData.communityName && adminData.college) {
      onRoleSelected('admin', adminData);
    }
  };

  const handleMemberSubmit = () => {
    if (memberData.inviteCode) {
      onRoleSelected('member', memberData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Tech Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Are you starting a new community or joining an existing one?
          </p>
        </div>

        {!selectedRole && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Admin Option */}
            <Card className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Crown className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Create Community
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Start as an admin and build your tech community
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 text-blue-500 mr-2" />
                    Full admin privileges
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 text-blue-500 mr-2" />
                    Invite team members
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Star className="h-4 w-4 text-blue-500 mr-2" />
                    Manage events & activities
                  </div>
                </div>
                <Button 
                  onClick={() => handleRoleSelect('admin')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Start as Admin
                  <Crown className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Member Option */}
            <Card className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <UserPlus className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Join Community
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Join an existing community with invite code
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 text-green-500 mr-2" />
                    Use invite code from admin
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 text-green-500 mr-2" />
                    Collaborate with team
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Star className="h-4 w-4 text-green-500 mr-2" />
                    Contribute to events
                  </div>
                </div>
                <Button 
                  onClick={() => handleRoleSelect('member')}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Join as Member
                  <UserPlus className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Form */}
        {showAdminForm && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-6 w-6 mr-2 text-blue-600" />
                Create Your Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Community Name
                </label>
                <Input
                  placeholder="e.g., GDG IIIT Delhi, IEEE BITS Pilani"
                  value={adminData.communityName}
                  onChange={(e) => setAdminData(prev => ({ ...prev, communityName: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Community Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {communityTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAdminData(prev => ({ ...prev, communityType: type.id }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        adminData.communityType === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${type.color}`}></div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  College/University
                </label>
                <Input
                  placeholder="e.g., IIIT Delhi, BITS Pilani"
                  value={adminData.college}
                  onChange={(e) => setAdminData(prev => ({ ...prev, college: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Brief description of your community goals and activities"
                  value={adminData.description}
                  onChange={(e) => setAdminData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleAdminSubmit}
                  disabled={!adminData.communityName || !adminData.college}
                  className="flex-1"
                >
                  Create Community
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRole(null)}
                >
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Member Form */}
        {showMemberForm && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="h-6 w-6 mr-2 text-green-600" />
                Join Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Invite Code
                </label>
                <Input
                  placeholder="Enter invite code from your admin"
                  value={memberData.inviteCode}
                  onChange={(e) => setMemberData(prev => ({ ...prev, inviteCode: e.target.value }))}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Ask your community admin for the invite code
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email (Optional)
                </label>
                <Input
                  type="email"
                  placeholder="your.email@college.edu"
                  value={memberData.email}
                  onChange={(e) => setMemberData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleMemberSubmit}
                  disabled={!memberData.inviteCode}
                  className="flex-1"
                >
                  Join Community
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRole(null)}
                >
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}