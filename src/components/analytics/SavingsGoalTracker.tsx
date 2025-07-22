import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, TrendingUp, Calendar } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type SavingsGoal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  milestones: {
    amount: number;
    achieved: boolean;
  }[];
};

const SavingsGoalTracker: React.FC = () => {
  const goals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      target: 5000,
      current: 3500,
      deadline: '2024-12-31',
      category: 'Safety Net',
      milestones: [
        { amount: 1000, achieved: true },
        { amount: 2500, achieved: true },
        { amount: 3750, achieved: false },
        { amount: 5000, achieved: false },
      ],
    },
    {
      id: '2',
      name: 'Business Expansion',
      target: 10000,
      current: 4000,
      deadline: '2025-06-30',
      category: 'Business',
      milestones: [
        { amount: 2500, achieved: true },
        { amount: 5000, achieved: false },
        { amount: 7500, achieved: false },
        { amount: 10000, achieved: false },
      ],
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Savings Goals</h3>
        <Button variant="outline" size="sm">Add New Goal</Button>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const nextMilestone = goal.milestones.find(m => !m.achieved);

          return (
            <div key={goal.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{goal.name}</h4>
                  <span className="text-sm text-gray-600">{goal.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${goal.current}</div>
                  <span className="text-sm text-gray-600">of ${goal.target}</span>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                      {progress.toFixed(0)}% Complete
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      <Calendar className="w-4 h-4 inline-block mr-1" />
                      Due {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    className="bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {nextMilestone && (
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-primary mr-2" />
                    <span className="font-medium">Next Milestone:</span>
                    <span className="ml-2">${nextMilestone.amount}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    ${nextMilestone.amount - goal.current} more to reach this milestone
                  </div>
                </div>
              )}

              {goal.milestones.some(m => m.achieved) && (
                <div className="flex space-x-2">
                  {goal.milestones.map((milestone, index) => (
                    milestone.achieved && (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-accent/10 text-accent px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        <Award className="w-4 h-4 mr-1" />
                        ${milestone.amount}
                      </motion.div>
                    )
                  ))}
                </div>
              )}

              <div className="border-b border-gray-200"></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SavingsGoalTracker;