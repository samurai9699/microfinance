import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';
import Card from '../common/Card';

type Achievement = {
  icon: typeof Award | typeof TrendingUp | typeof Users;
  label: string;
  value: string | number;
  color: string;
};

const ProgressAnimation: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: Award,
      label: 'Financial Health Score',
      value: 85,
      color: '#2D5830',
    },
    {
      icon: TrendingUp,
      label: 'Savings Growth',
      value: '250%',
      color: '#F4A261',
    },
    {
      icon: Users,
      label: 'Community Impact',
      value: 120,
      color: '#2AB7CA',
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Your Progress</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.2 + 0.3,
                }}
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${achievement.color}20` }}
              >
                <achievement.icon
                  className="w-8 h-8"
                  style={{ color: achievement.color }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <div className="text-2xl font-bold" style={{ color: achievement.color }}>
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </motion.div>
            </div>

            {typeof achievement.value === 'number' && (
              <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="30"
                  stroke={achievement.color}
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: achievement.value / 100 }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className="opacity-20"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressAnimation;