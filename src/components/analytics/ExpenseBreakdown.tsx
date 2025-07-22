import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import Card from '../common/Card';

type ExpenseCategory = {
  name: string;
  value: number;
  color: string;
  change: number;
};

const ExpenseBreakdown: React.FC = () => {
  const analytics = useAnalytics();
  
  const colors = ['#2D5830', '#F4A261', '#2AB7CA', '#FE6B8B', '#4A90E2', '#8B5CF6', '#F59E0B'];
  
  const data: ExpenseCategory[] = analytics?.expensesByCategory 
    ? Object.entries(analytics.expensesByCategory).map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
        change: Math.floor(Math.random() * 20) - 10, // Random change for demo
      }))
    : [
        { name: 'No expenses yet', value: 1, color: '#E5E7EB', change: 0 }
      ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">${category.value}</span>
                    <span className={`ml-2 flex items-center ${
                      category.change > 0 ? 'text-green-500' : category.change < 0 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {category.change > 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : category.change < 0 ? (
                        <ArrowDown className="w-4 h-4" />
                      ) : null}
                      {Math.abs(category.change)}%
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium">
                {((category.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ExpenseBreakdown;