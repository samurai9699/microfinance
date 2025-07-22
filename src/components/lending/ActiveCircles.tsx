import React from 'react';
import { Calendar, DollarSign, Users, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const ActiveCircles: React.FC = () => {
  const activeCircles = [
    {
      id: '1',
      name: 'Business Growth Circle',
      nextPayment: '2024-03-25',
      amount: 200,
      position: 3,
      totalMembers: 12,
      progress: 75,
    },
    {
      id: '2',
      name: 'Education Fund',
      nextPayment: '2024-04-01',
      amount: 100,
      position: 2,
      totalMembers: 6,
      progress: 50,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Your Active Circles</h3>
      
      <div className="space-y-6">
        {activeCircles.map((circle) => (
          <div key={circle.id} className="space-y-4">
            <div>
              <h4 className="font-semibold">{circle.name}</h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Users className="w-4 h-4 mr-1" />
                <span>Position {circle.position} of {circle.totalMembers}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Progress</span>
                <span>{circle.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${circle.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Next Payment</span>
                </div>
                <span className="font-medium">
                  {new Date(circle.nextPayment).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Amount</span>
                </div>
                <span className="font-medium">${circle.amount}</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Details
            </Button>
            
            <div className="border-b border-gray-200"></div>
          </div>
        ))}
        
        {activeCircles.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">You haven't joined any circles yet</p>
            <Button variant="primary" className="mt-4">
              Browse Circles
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActiveCircles;