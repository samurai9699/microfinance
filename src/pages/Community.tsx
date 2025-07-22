import React, { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Award, Search, Filter, Plus } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  timeAgo: string;
  hasLiked?: boolean;
};

const Community: React.FC = () => {
  const { profile } = useUserStore();
  const [activeTab, setActiveTab] = useState<'feed' | 'discussions' | 'achievements'>('feed');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Sarah M.',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        level: 'Financial Coach',
      },
      title: 'Tips for building an emergency fund',
      content: 'I wanted to share some strategies that helped me build my emergency fund from $0 to $5,000 in just 8 months...',
      category: 'Savings',
      likes: 24,
      replies: 12,
      timeAgo: '2 hours ago',
      hasLiked: true,
    },
    {
      id: '2',
      author: {
        name: 'John D.',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        level: 'Community Member',
      },
      title: 'How to negotiate better loan terms?',
      content: 'Looking for advice on negotiating loan terms with local banks. Has anyone had success with this?',
      category: 'Credit',
      likes: 15,
      replies: 8,
      timeAgo: '5 hours ago',
    },
    {
      id: '3',
      author: {
        name: 'Maria K.',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        level: 'Business Owner',
      },
      title: 'Started my small business with microfinance',
      content: 'Just wanted to share my success story. With the help of this community and a small loan, I was able to start my catering business...',
      category: 'Business',
      likes: 42,
      replies: 18,
      timeAgo: '1 day ago',
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Savings Goal',
      description: 'Reached your first $100 savings milestone',
      icon: '💰',
      earned: true,
      date: '2024-03-15',
    },
    {
      id: '2',
      title: 'Budget Master',
      description: 'Successfully followed your budget for 3 months',
      icon: '📊',
      earned: true,
      date: '2024-03-10',
    },
    {
      id: '3',
      title: 'Community Helper',
      description: 'Helped 5 community members with advice',
      icon: '🤝',
      earned: false,
      progress: 60,
    },
  ];

  const communityStats = [
    { label: 'Active Members', value: '2,548', icon: Users },
    { label: 'Success Stories', value: '342', icon: Award },
    { label: 'Monthly Growth', value: '15%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600">
            Connect with others on their financial journey
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {communityStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'feed'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('feed')}
              >
                Community Feed
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'discussions'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('discussions')}
              >
                Discussions
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'achievements'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('achievements')}
              >
                Achievements
              </button>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search community..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" icon={<Filter />}>
                Filter
              </Button>
              <Button variant="primary" icon={<Plus />}>
                New Post
              </Button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-900">
                            {post.author.name}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{post.timeAgo}</span>
                          <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            {post.author.level}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.content}</p>
                        <div className="flex items-center space-x-4">
                          <button
                            className={`flex items-center space-x-1 ${
                              post.hasLiked ? 'text-primary' : 'text-gray-500'
                            }`}
                          >
                            <span>👍</span>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500">
                            <MessageSquare className="w-5 h-5" />
                            <span>{post.replies}</span>
                          </button>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${
                          achievement.earned
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="text-3xl mr-3">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <span className="text-xs text-green-600 font-medium">
                                Earned on {new Date(achievement.date!).toLocaleDateString()}
                              </span>
                            ) : (
                              <div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                  <div
                                    className="bg-primary rounded-full h-2"
                                    style={{ width: `${achievement.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600">
                                  {achievement.progress}% complete
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {profile?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="font-semibold">{profile?.name || 'User'}</h3>
                <p className="text-sm text-gray-600">Community Member</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="block text-lg font-bold text-primary">15</span>
                    <span className="text-xs text-gray-600">Posts</span>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-primary">8</span>
                    <span className="text-xs text-gray-600">Helped</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Popular Topics */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['Budgeting', 'Savings', 'Investment', 'Business', 'Credit'].map((topic) => (
                  <button
                    key={topic}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Ask a Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share Success Story
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Find Study Group
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;