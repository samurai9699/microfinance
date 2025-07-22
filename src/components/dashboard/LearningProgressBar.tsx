import React from 'react';
import Card from '../common/Card';
import { BookOpen, Award, CheckCircle, Lock } from 'lucide-react';
import { cn } from '../../utils/cn';

type LearningProgressProps = {
  progress: number;
  totalModules: number;
  completedModules: number;
  currentModule: {
    title: string;
    progress: number;
  };
  upcomingModules: Array<{
    id: number;
    title: string;
    locked: boolean;
  }>;
  className?: string;
};

const LearningProgressBar: React.FC<LearningProgressProps> = ({
  progress,
  totalModules,
  completedModules,
  currentModule,
  upcomingModules,
  className
}) => {
  return (
    <Card glassEffect className={`p-6 h-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
        <div className="flex items-center space-x-1">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{completedModules}/{totalModules} Modules</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{progress}% Complete</span>
          <span className="text-xs text-gray-500">{completedModules} of {totalModules} modules</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Current Module</h4>
            <p className="text-base font-semibold">{currentModule.title}</p>
          </div>
        </div>
        <div className="ml-13 pl-6 border-l-2 border-dashed border-gray-200 mt-2 mb-2">
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">{currentModule.progress}% complete</span>
              <span className="text-xs font-medium text-primary">{Math.round(currentModule.progress/100 * 5)}/5 lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentModule.progress}%` }}
              ></div>
            </div>
          </div>
          <button className="mt-3 text-primary text-sm font-medium hover:text-primary/80 flex items-center">
            Continue Learning
          </button>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center">
          <span>Upcoming Modules</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {upcomingModules.length}
          </span>
        </h4>
        
        <div className="space-y-3">
          {upcomingModules.map((module) => (
            <div
              key={module.id}
              className={cn(
                "p-3 rounded-lg border flex justify-between items-center transition-all",
                module.locked
                  ? "border-gray-200 bg-gray-50"
                  : "border-primary/20 bg-primary/5 hover:bg-primary/10 cursor-pointer"
              )}
            >
              <div className="flex items-center">
                {module.locked ? (
                  <Lock className="w-4 h-4 text-gray-400 mr-2" />
                ) : (
                  <BookOpen className="w-4 h-4 text-primary mr-2" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    module.locked ? "text-gray-400" : "text-gray-700"
                  )}
                >
                  {module.title}
                </span>
              </div>
              {module.locked ? (
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  Locked
                </span>
              ) : (
                <button className="text-xs text-primary hover:text-primary/80">
                  Start
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 mb-2">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <p className="text-sm font-medium text-gray-700">Complete all modules to earn your Financial Literacy Certificate</p>
        </div>
      </div>
    </Card>
  );
};

export default LearningProgressBar;