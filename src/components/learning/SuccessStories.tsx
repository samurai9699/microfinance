import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';
import Card from '../common/Card';

type Story = {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  title: string;
  content: string;
  achievements: {
    icon: typeof Award | typeof TrendingUp | typeof Users;
    label: string;
    value: string;
  }[];
  image: string;
};

const SuccessStories: React.FC = () => {
  const stories: Story[] = [
    {
      id: '1',
      author: {
        name: 'Maria Kimani',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Nairobi, Kenya',
      },
      title: 'From Market Vendor to Business Owner',
      content: 'Through microfinance and financial education, I transformed my small market stall into a thriving business...',
      achievements: [
        { icon: Award, label: 'Business Growth', value: '300%' },
        { icon: TrendingUp, label: 'Monthly Revenue', value: '$2,500' },
        { icon: Users, label: 'Employees', value: '5' },
      ],
      image: 'https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      author: {
        name: 'John Ochieng',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Mombasa, Kenya',
      },
      title: 'Building a Sustainable Future',
      content: 'Learning to save and invest helped me secure my family\'s future and expand my fishing business...',
      achievements: [
        { icon: Award, label: 'Savings Growth', value: '200%' },
        { icon: TrendingUp, label: 'Investment Returns', value: '15%' },
        { icon: Users, label: 'Community Impact', value: '50+' },
      ],
      image: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <div className="space-y-8">
      {stories.map((story) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex items-center mb-4">
                  <img
                    src={story.author.avatar}
                    alt={story.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold">{story.author.name}</h3>
                    <p className="text-sm text-gray-600">{story.author.location}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
                <p className="text-gray-600 mb-6">{story.content}</p>

                <div className="grid grid-cols-3 gap-4">
                  {story.achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <achievement.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-lg">{achievement.value}</div>
                      <div className="text-sm text-gray-600">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessStories;