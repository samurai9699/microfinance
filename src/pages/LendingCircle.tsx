import React from 'react';
import CircleFormation from '../components/lending/CircleFormation';
import CircleMarketplace from '../components/lending/CircleMarketplace';
import ActiveCircles from '../components/lending/ActiveCircles';

const LendingCircle: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lending Circles</h1>
          <p className="text-gray-600">
            Join trusted community lending circles to achieve your financial goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CircleMarketplace />
          </div>
          <div>
            <ActiveCircles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendingCircle;