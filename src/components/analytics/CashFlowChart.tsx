import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type CashFlowData = {
  date: string;
  income: number;
  expenses: number;
  balance: number;
};

const CashFlowChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  const data: CashFlowData[] = [
    { date: 'Mar 1', income: 1200, expenses: 800, balance: 400 },
    { date: 'Mar 5', income: 900, expenses: 600, balance: 300 },
    { date: 'Mar 10', income: 1500, expenses: 1000, balance: 500 },
    { date: 'Mar 15', income: 800, expenses: 700, balance: 100 },
    { date: 'Mar 20', income: 2000, expenses: 1200, balance: 800 },
    { date: 'Mar 25', income: 1100, expenses: 900, balance: 200 },
    { date: 'Mar 30', income: 1300, expenses: 1000, balance: 300 },
  ];

  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netCashFlow = totalIncome - totalExpenses;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Cash Flow Analysis</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeframe === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('week')}
          >
            Week
          </Button>
          <Button
            variant={timeframe === 'month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('month')}
          >
            Month
          </Button>
          <Button
            variant={timeframe === 'year' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('year')}
          >
            Year
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Total Income</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <span className="text-2xl font-bold text-green-700">${totalIncome}</span>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">Total Expenses</span>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-2xl font-bold text-red-700">${totalExpenses}</span>
        </div>
        
        <div className={`${netCashFlow >= 0 ? 'bg-primary/10' : 'bg-red-50'} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${netCashFlow >= 0 ? 'text-primary' : 'text-red-700'}`}>
              Net Cash Flow
            </span>
            {netCashFlow >= 0 ? (
              <TrendingUp className="w-4 h-4 text-primary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </div>
          <span className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-primary' : 'text-red-700'}`}>
            ${Math.abs(netCashFlow)}
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#2D5830" />
            <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
            <Bar dataKey="balance" name="Balance" fill="#F4A261" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Last updated: Today at 14:30</span>
        </div>
        <button className="flex items-center text-primary hover:text-primary/80">
          <Filter className="w-4 h-4 mr-1" />
          Customize View
        </button>
      </div>
    </Card>
  );
};

export default CashFlowChart;