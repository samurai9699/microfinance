import React from 'react';
import Card from '../common/Card';
import { CircleDollarSign, TrendingUp, Info } from 'lucide-react';

type FinancialHealthProps = {
  score: number;
  previousScore?: number;
  className?: string;
};

const FinancialHealthWidget: React.FC<FinancialHealthProps> = ({
  score,
  previousScore,
  className
}) => {
  // Calculate the percentage for the circular progress
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 40; // 40 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Calculate score change
  const scoreChange = previousScore ? score - previousScore : 0;
  const showChange = previousScore !== undefined;
  
  // Determine status color based on score
  let statusColor = 'text-yellow-500';
  let statusBg = 'bg-yellow-100';
  let statusText = 'Moderate';
  
  if (score >= 80) {
    statusColor = 'text-green-500';
    statusBg = 'bg-green-100';
    statusText = 'Excellent';
  } else if (score >= 60) {
    statusColor = 'text-blue-500';
    statusBg = 'bg-blue-100';
    statusText = 'Good';
  } else if (score < 40) {
    statusColor = 'text-red-500';
    statusBg = 'bg-red-100';
    statusText = 'Needs Attention';
  }

  return (
    <Card 
      glassEffect 
      className={`p-6 h-full transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Financial Health Score</h3>
        
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          {/* SVG Circle Progress */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e6e6e6"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2D5830" />
                <stop offset="100%" stopColor="#F4A261" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score display */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{score}</span>
            <span className="text-xs text-gray-500">out of 100</span>
          </div>
        </div>
        
        <div className={`${statusBg} ${statusColor} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
          {statusText}
        </div>
        
        {showChange && (
          <div className="flex items-center mb-4">
            {scoreChange > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+{scoreChange} pts since last month</span>
              </>
            ) : scoreChange < 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-red-500 mr-1 rotate-180" />
                <span className="text-red-500">{scoreChange} pts since last month</span>
              </>
            ) : (
              <span className="text-gray-500">No change since last month</span>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Savings</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">24%</p>
            <p className="text-xs text-gray-500">of monthly income</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Debt Ratio</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">18%</p>
            <p className="text-xs text-gray-500">decreasing</p>
          </div>
        </div>
        
        <button className="mt-4 flex items-center text-primary hover:text-primary/80 text-sm font-medium">
          <Info className="w-4 h-4 mr-1" />
          How to improve your score
        </button>
      </div>
    </Card>
  );
};

export default FinancialHealthWidget;