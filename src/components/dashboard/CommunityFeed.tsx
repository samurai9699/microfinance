import React from 'react';
import Card from '../common/Card';
import { MessageSquare, ThumbsUp, Users, Award, Share2 } from 'lucide-react';
import { cn } from '../../utils/cn';

type FeedItem = {
  id: number;
  type: 'post' | 'achievement' | 'question' | 'tip';
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  hasLiked?: boolean;
};

type CommunityFeedProps = {
  feedItems: FeedItem[];
  className?: string;
};

const CommunityFeed: React.FC<CommunityFeedProps> = ({ feedItems, className }) => {
  return (
    <Card glassEffect className={`p-6 h-full ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Community Activity</h3>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">2,548 members</span>
        </div>
      </div>
      
      <div className="space-y-5">
        {feedItems.map((item) => (
          <div key={item.id} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
            <div className="flex items-start">
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-900">{item.user.name}</span>
                  {item.user.role && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {item.user.role}
                    </span>
                  )}
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{item.timeAgo}</span>
                </div>
                
                {item.type === 'achievement' && (
                  <div className="mb-2 bg-accent/10 text-accent rounded-lg p-2 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Earned a new badge: Financial Planner</span>
                  </div>
                )}
                
                <p className="text-gray-700 mb-3">{item.content}</p>
                
                <div className="flex items-center space-x-4">
                  <button className={cn(
                    "flex items-center text-xs font-medium",
                    item.hasLiked ? "text-primary" : "text-gray-500 hover:text-gray-700"
                  )}>
                    <ThumbsUp className={cn(
                      "w-4 h-4 mr-1",
                      item.hasLiked && "fill-primary"
                    )} />
                    {item.likes}
                  </button>
                  <button className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-700">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {item.comments}
                  </button>
                  <button className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-700">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-primary font-medium text-sm hover:text-primary/80">
          View More Activity
        </button>
      </div>
    </Card>
  );
};

export default CommunityFeed;