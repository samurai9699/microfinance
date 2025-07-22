import React from 'react';
import CashFlowChart from '../components/analytics/CashFlowChart';
import ExpenseBreakdown from '../components/analytics/ExpenseBreakdown';
import SavingsGoalTracker from '../components/analytics/SavingsGoalTracker';

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600">
            Track your financial progress and make data-driven decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <CashFlowChart />
          </div>
          <div>
            <ExpenseBreakdown />
          </div>
          <div>
            <SavingsGoalTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;