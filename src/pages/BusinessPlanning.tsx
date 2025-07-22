import React from 'react';
import BusinessPlanningTools from '../components/business/BusinessPlanningTools';

const BusinessPlanning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Business Planning</h1>
          <p className="text-gray-600">
            Create your business plan with our AI-powered tools and templates
          </p>
        </div>
        
        <BusinessPlanningTools />
      </div>
    </div>
  );
};

export default BusinessPlanning;