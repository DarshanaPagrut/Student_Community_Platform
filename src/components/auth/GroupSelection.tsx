"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { predefinedGroups } from '@/src/lib/utils';
import { Search, Users, Plus } from 'lucide-react';

interface GroupSelectionProps {
  onGroupSelected: () => void;
}

export default function GroupSelection({ onGroupSelected }: GroupSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const filteredGroups = predefinedGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    console.log('Joined group:', groupId);
    onGroupSelected();
  };

  const handleCreateGroup = () => {
    console.log('Created new group:', newGroupName);
    onGroupSelected();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">
            Join or Create a Study Group
          </CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Connect with peers who share your learning interests
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search groups by language or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Groups List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {group.description}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {group.memberCount} members
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      size="sm"
                      className="ml-4"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Group */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {!showCreateForm ? (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              ) : (
                <div className="space-y-3">
                  <Input
                    placeholder="Enter group name (e.g., 'DSA in Python - Beginners')"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCreateGroup}
                      disabled={!newGroupName.trim()}
                      className="flex-1"
                    >
                      Create Group
                    </Button>
                    <Button
                      onClick={() => setShowCreateForm(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}