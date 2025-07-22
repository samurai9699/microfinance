import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import LearningModule from '../components/learning/LearningModule';
import DiscussionForum from '../components/learning/DiscussionForum';
import SuccessStories from '../components/learning/SuccessStories';

const Learning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('modules');

  const modules = [
    {
      id: '1',
      title: 'Financial Foundations',
      description: 'Learn the basics of budgeting, saving, and managing your money',
      duration: '2 hours',
      level: 'Beginner',
      progress: 75,
      lessons: [
        { id: '1.1', title: 'Understanding Income and Expenses', completed: true, locked: false },
        { id: '1.2', title: 'Creating Your First Budget', completed: true, locked: false },
        { id: '1.3', title: 'Setting Financial Goals', completed: false, locked: false },
        { id: '1.4', title: 'Tracking Your Progress', completed: false, locked: true },
      ],
      badge: {
        name: 'Budget Master',
        icon: '🎯',
      },
    },
    {
      id: '2',
      title: 'Smart Saving Strategies',
      description: 'Discover effective ways to save money and build your emergency fund',
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 30,
      lessons: [
        { id: '2.1', title: 'Emergency Fund Basics', completed: true, locked: false },
        { id: '2.2', title: 'Saving Methods', completed: false, locked: false },
        { id: '2.3', title: 'Automating Your Savings', completed: false, locked: true },
        { id: '2.4', title: 'Growing Your Savings', completed: false, locked: true },
      ],
      badge: {
        name: 'Super Saver',
        icon: '💰',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Learning Center</h1>
          <p className="text-gray-600">
            Build your financial knowledge with interactive lessons and community discussions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="discussions">Community Discussions</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            {modules.map((module) => (
              <LearningModule key={module.id} module={module} />
            ))}
          </TabsContent>

          <TabsContent value="discussions">
            <DiscussionForum />
          </TabsContent>

          <TabsContent value="stories">
            <SuccessStories />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;