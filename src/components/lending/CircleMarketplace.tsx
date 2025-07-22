import React, { useState } from 'react';
import { Search, Filter, Users, Calendar, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import CircleFormation from './CircleFormation';

type Circle = {
  id: string;
  name: string;
  goal: string;
  members: {
    total: number;
    joined: number;
  };
  contribution: number;
  frequency: string;
  location: string;
  trustScore: number;
  startDate: string;
};

const CircleMarketplace: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const circles: Circle[] = [
    {
      id: '1',
      name: 'Business Growth Circle',
      goal: 'Support small business expansion',
      members: { total: 12, joined: 8 },
      contribution: 200,
      frequency: 'Monthly',
      location: 'Nairobi',
      trustScore: 95,
      startDate: '2024-04-01',
    },
    {
      id: '2',
      name: 'Education Fund',
      goal: 'Save for children\'s education',
      members: { total: 6, joined: 4 },
      contribution: 100,
      frequency: 'Monthly',
      location: 'Mombasa',
      trustScore: 88,
      startDate: '2024-04-15',
    },
    {
      id: '3',
      name: 'Community Market Circle',
      goal: 'Fund local market vendors',
      members: { total: 8, joined: 6 },
      contribution: 150,
      frequency: 'Bi-weekly',
      location: 'Kisumu',
      trustScore: 92,
      startDate: '2024-04-10',
    },
  ];

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Available Circles</h3>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create New Circle
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search circles..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Circles</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="community">Community</option>
          </select>
        </div>

        <div className="space-y-4">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="border rounded-lg p-4 hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{circle.name}</h4>
                  <p className="text-gray-600 text-sm">{circle.goal}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {circle.trustScore}% Trust Score
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {circle.members.joined}/{circle.members.total} Members
                  </span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    ${circle.contribution}/{circle.frequency}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    Starts {new Date(circle.startDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Filter className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm">{circle.location}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Create New Circle</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <CircleFormation />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CircleMarketplace;