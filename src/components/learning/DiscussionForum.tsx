import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Flag, Search } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  title: string;
  content: string;
  topic: string;
  likes: number;
  replies: number;
  timeAgo: string;
  hasLiked?: boolean;
};

const DiscussionForum: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    'All Topics',
    'Budgeting',
    'Savings',
    'Investment',
    'Business',
    'Credit',
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Sarah M.',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        level: 'Financial Coach',
      },
      title: 'Tips for building an emergency fund',
      content: 'I wanted to share some strategies that helped me build my emergency fund...',
      topic: 'Savings',
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
      content: 'Looking for advice on negotiating loan terms with local banks...',
      topic: 'Credit',
      likes: 15,
      replies: 8,
      timeAgo: '5 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="primary">Start Discussion</Button>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === topic.toLowerCase()
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter(topic.toLowerCase())}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-900">
                    {post.author.name}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.timeAgo}</span>
                </div>
                <span className="inline-block bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full mb-2">
                  {post.author.level}
                </span>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    className={`flex items-center space-x-1 ${
                      post.hasLiked ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.replies}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 ml-auto">
                    <Flag className="w-5 h-5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;