import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, Menu, Search, X } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import FinancialHealthWidget from '../components/dashboard/FinancialHealthWidget';
import QuickActionsPanel from '../components/dashboard/QuickActionsPanel';
import LearningProgressBar from '../components/dashboard/LearningProgressBar';
import CommunityFeed from '../components/dashboard/CommunityFeed';
import FinancialAdvisor from '../components/chat/FinancialAdvisor';

const Dashboard: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Sample data for learning progress
  const learningProgressData = {
    progress: 45,
    totalModules: 12,
    completedModules: 5,
    currentModule: {
      title: "Building an Emergency Fund",
      progress: 60,
    },
    upcomingModules: [
      {
        id: 1,
        title: "Understanding Credit Scores",
        locked: false,
      },
      {
        id: 2,
        title: "Smart Budgeting Techniques",
        locked: false,
      },
      {
        id: 3,
        title: "Investment Basics",
        locked: true,
      },
    ],
  };
  
  // Sample data for community feed
  const communityFeedData = [
    {
      id: 1,
      type: 'post',
      user: {
        name: 'Maria S.',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        role: 'Financial Coach',
      },
      content: 'Just published a new guide on building credit with no credit history. Check it out in the Learning section!',
      likes: 24,
      comments: 5,
      timeAgo: '2 hours ago',
      hasLiked: true,
    },
    {
      id: 2,
      type: 'achievement',
      user: {
        name: 'Jerome P.',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      content: 'I finally saved up my first $1,000 emergency fund! This app helped me track every dollar.',
      likes: 42,
      comments: 12,
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      type: 'question',
      user: {
        name: 'Tasha R.',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      content: 'Has anyone here successfully negotiated a lower APR on their credit card? What approach worked for you?',
      likes: 8,
      comments: 15,
      timeAgo: '1 day ago',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75\" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">MicroFinance</span>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex">
        {/* Desktop sidebar */}
        <Sidebar />
        
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-4"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6 text-gray-500" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                
                <button className="relative">
                  <Bell className="w-6 h-6 text-gray-500" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <span className="hidden md:inline text-sm font-medium">Alex Johnson</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Welcome back, Alex! 👋</h2>
              <p className="text-gray-600">
                Your financial health is looking good today. Here's what you need to know.
              </p>
            </div>
            
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FinancialHealthWidget score={72} previousScore={65} />
              </div>
              <div>
                <QuickActionsPanel />
              </div>
              <div>
                <LearningProgressBar {...learningProgressData} />
              </div>
              <div className="lg:col-span-2">
                <CommunityFeed feedItems={communityFeedData} />
              </div>
              <div className="lg:col-span-3">
                <FinancialAdvisor />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;