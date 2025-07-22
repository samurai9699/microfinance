import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Award, BookOpen, Star, Lock } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type Module = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  lessons: {
    id: string;
    title: string;
    completed: boolean;
    locked: boolean;
  }[];
  badge?: {
    name: string;
    icon: string;
  };
};

const LearningModule: React.FC<{ module: Module }> = ({ module }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{module.title}</h3>
            <p className="text-gray-600">{module.description}</p>
          </div>
          {module.badge && (
            <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
              <Award className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{module.badge.name}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
            <span className="block text-sm font-medium">{module.duration}</span>
            <span className="text-xs text-gray-500">Duration</span>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Star className="w-5 h-5 text-accent mx-auto mb-1" />
            <span className="block text-sm font-medium">{module.level}</span>
            <span className="text-xs text-gray-500">Level</span>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 mx-auto mb-1 relative">
              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#2D5830"
                  strokeWidth="3"
                  strokeDasharray={`${module.progress}, 100`}
                />
              </svg>
            </div>
            <span className="block text-sm font-medium">{module.progress}%</span>
            <span className="text-xs text-gray-500">Complete</span>
          </div>
        </div>

        <motion.div
          animate={{ height: isExpanded ? 'auto' : 0 }}
          initial={false}
          className="overflow-hidden"
        >
          <div className="space-y-3 mb-6">
            {module.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  lesson.locked ? 'bg-gray-50' : 'bg-white border'
                }`}
              >
                <div className="flex items-center">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  ) : lesson.locked ? (
                    <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  ) : (
                    <Play className="w-5 h-5 text-primary mr-3" />
                  )}
                  <span
                    className={`font-medium ${
                      lesson.locked ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {lesson.title}
                  </span>
                </div>
                {!lesson.locked && !lesson.completed && (
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show Lessons'}
        </Button>
      </div>
    </Card>
  );
};

export default LearningModule;