import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FileText, TrendingUp, DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type Section = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
};

const BusinessPlanningTools: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'executive',
      title: 'Executive Summary',
      content: '',
      completed: false,
    },
    {
      id: 'market',
      title: 'Market Analysis',
      content: '',
      completed: false,
    },
    {
      id: 'operations',
      title: 'Operations Plan',
      content: '',
      completed: false,
    },
    {
      id: 'financial',
      title: 'Financial Projections',
      content: '',
      completed: false,
    },
  ]);

  const [financialData, setFinancialData] = useState({
    startupCosts: 5000,
    monthlyExpenses: 2000,
    projectedRevenue: 4000,
    marketSize: 100000,
  });

  const [selectedSection, setSelectedSection] = useState(sections[0]);

  const projectionData = [
    { month: 'Month 1', revenue: 4000, expenses: 3000, profit: 1000 },
    { month: 'Month 2', revenue: 5000, expenses: 3200, profit: 1800 },
    { month: 'Month 3', revenue: 6000, expenses: 3400, profit: 2600 },
    { month: 'Month 4', revenue: 7500, expenses: 3600, profit: 3900 },
    { month: 'Month 5', revenue: 9000, expenses: 3800, profit: 5200 },
    { month: 'Month 6', revenue: 11000, expenses: 4000, profit: 7000 },
  ];

  const marketData = [
    { segment: 'Segment A', size: 40000 },
    { segment: 'Segment B', size: 35000 },
    { segment: 'Segment C', size: 25000 },
  ];

  const updateSection = (content: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === selectedSection.id
          ? { ...section, content, completed: content.length > 0 }
          : section
      )
    );
  };

  const calculateProgress = () => {
    const completed = sections.filter(section => section.completed).length;
    return (completed / sections.length) * 100;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <FileText className="w-6 h-6 text-primary mr-2" />
            Business Plan Sections
          </h3>
          
          <div className="space-y-4">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedSection.id === section.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.title}</span>
                  {section.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium text-primary">
                {Math.round(calculateProgress())}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">{selectedSection.title}</h3>
          
          <div className="space-y-4">
            <textarea
              value={selectedSection.content}
              onChange={(e) => updateSection(e.target.value)}
              placeholder="Enter your content here..."
              className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            
            {selectedSection.id === 'market' && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Market Size Analysis</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="size"
                        fill="#2D5830"
                        stroke="#2D5830"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedSection.id === 'financial' && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Financial Projections</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2D5830"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#F4A261"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-primary mr-2" />
                      <span className="font-medium">Startup Costs</span>
                    </div>
                    <input
                      type="number"
                      value={financialData.startupCosts}
                      onChange={(e) =>
                        setFinancialData(prev => ({
                          ...prev,
                          startupCosts: Number(e.target.value)
                        }))
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-primary mr-2" />
                      <span className="font-medium">Monthly Expenses</span>
                    </div>
                    <input
                      type="number"
                      value={financialData.monthlyExpenses}
                      onChange={(e) =>
                        setFinancialData(prev => ({
                          ...prev,
                          monthlyExpenses: Number(e.target.value)
                        }))
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              disabled={sections.indexOf(selectedSection) === 0}
              onClick={() =>
                setSelectedSection(
                  sections[sections.indexOf(selectedSection) - 1]
                )
              }
            >
              Previous
            </Button>
            <Button
              variant="primary"
              disabled={sections.indexOf(selectedSection) === sections.length - 1}
              onClick={() =>
                setSelectedSection(
                  sections[sections.indexOf(selectedSection) + 1]
                )
              }
            >
              Next
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resource Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">Team Size</span>
              </div>
              <select className="w-full p-2 border rounded">
                <option>1-5 employees</option>
                <option>6-10 employees</option>
                <option>11-20 employees</option>
                <option>20+ employees</option>
              </select>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">Initial Investment</span>
              </div>
              <select className="w-full p-2 border rounded">
                <option>$1,000 - $5,000</option>
                <option>$5,000 - $10,000</option>
                <option>$10,000 - $25,000</option>
                <option>$25,000+</option>
              </select>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">Growth Rate</span>
              </div>
              <select className="w-full p-2 border rounded">
                <option>Conservative (10%)</option>
                <option>Moderate (25%)</option>
                <option>Aggressive (50%)</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusinessPlanningTools;