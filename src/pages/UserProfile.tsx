import React from 'react';
import { Award, Target, TrendingUp, Star, BookOpen, Users } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const UserProfile: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Savings Master',
      description: 'Saved 20% of income for 3 months',
      icon: Award,
      progress: 80,
    },
    {
      id: 2,
      title: 'Budget Pro',
      description: 'Created and followed a budget for 2 months',
      icon: Target,
      progress: 60,
    },
    {
      id: 3,
      title: 'Learning Champion',
      description: 'Completed 5 financial education modules',
      icon: BookOpen,
      progress: 100,
    },
  ];

  const goals = [
    {
      id: 1,
      title: 'Emergency Fund',
      target: 1000,
      current: 750,
      category: 'Savings',
    },
    {
      id: 2,
      title: 'Business Startup',
      target: 5000,
      current: 2000,
      category: 'Business',
    },
    {
      id: 3,
      title: 'Debt Reduction',
      target: 3000,
      current: 1500,
      category: 'Debt',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="md:col-span-1 p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary">AJ</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Alex Johnson</h2>
              <p className="text-gray-600 mb-4">Joined March 2024</p>
              
              <div className="w-full border-t border-gray-200 my-4"></div>
              
              <div className="w-full space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Financial Health Score</span>
                    <span className="text-sm font-bold text-primary">72/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '72%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-1" />
                    <span className="block text-sm font-medium">Level 5</span>
                    <span className="text-xs text-gray-600">Progress</span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="w-6 h-6 text-accent mx-auto mb-1" />
                    <span className="block text-sm font-medium">15</span>
                    <span className="text-xs text-gray-600">Achievements</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Goals Progress */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Target className="w-6 h-6 text-primary mr-2" />
                Financial Goals
              </h3>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <span className="text-sm text-gray-600">{goal.category}</span>
                      </div>
                      <span className="text-sm font-medium">
                        ${goal.current} / ${goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Award className="w-6 h-6 text-primary mr-2" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <achievement.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs font-medium">
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary rounded-full h-1.5 transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-6 h-6 text-primary mr-2" />
                Community Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">15</span>
                  <span className="text-sm text-gray-600">Forum Posts</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">8</span>
                  <span className="text-sm text-gray-600">Helped Others</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">4.8</span>
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;