import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Budget: React.FC = () => {
  const { financialData, profile } = useUserStore();
  const healthScore = useFinancialHealth();
  const [budgetGoals, setBudgetGoals] = useState({
    housing: 50,
    food: 15,
    transportation: 10,
    entertainment: 10,
    savings: 15,
  });

  const totalIncome = financialData ? 
    Object.values(financialData.income).reduce((a, b) => a + b, 0) : 0;
  
  const totalExpenses = financialData ? 
    Object.values(financialData.expenses).reduce((a, b) => a + b, 0) : 0;

  const budgetData = [
    { category: 'Housing', budgeted: (totalIncome * budgetGoals.housing) / 100, actual: financialData?.expenses.fixed || 0 },
    { category: 'Food', budgeted: (totalIncome * budgetGoals.food) / 100, actual: financialData?.expenses.variable * 0.4 || 0 },
    { category: 'Transportation', budgeted: (totalIncome * budgetGoals.transportation) / 100, actual: financialData?.expenses.variable * 0.3 || 0 },
    { category: 'Entertainment', budgeted: (totalIncome * budgetGoals.entertainment) / 100, actual: financialData?.expenses.variable * 0.3 || 0 },
    { category: 'Savings', budgeted: (totalIncome * budgetGoals.savings) / 100, actual: totalIncome - totalExpenses },
  ];

  const pieData = budgetData.map((item, index) => ({
    name: item.category,
    value: item.budgeted,
    color: ['#2D5830', '#F4A261', '#2AB7CA', '#FE6B8B', '#10B981'][index],
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-gray-600">
            Track your spending and manage your budget effectively
          </p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">${totalIncome.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Remaining Budget</p>
                <p className="text-2xl font-bold text-gray-900">${(totalIncome - totalExpenses).toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-gray-900">{healthScore?.savingsRate.toFixed(1) || 0}%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Allocation */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Budget Allocation</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Budget vs Actual */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Budget vs Actual Spending</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="budgeted" name="Budgeted" fill="#2D5830" />
                  <Bar dataKey="actual" name="Actual" fill="#F4A261" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card className="p-6 mt-8">
          <h3 className="text-xl font-bold mb-6">Budget Categories</h3>
          <div className="space-y-6">
            {budgetData.map((category, index) => {
              const isOverBudget = category.actual > category.budgeted;
              const percentage = category.budgeted > 0 ? (category.actual / category.budgeted) * 100 : 0;
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium">{category.category}</span>
                      {isOverBudget ? (
                        <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">${category.actual.toFixed(2)}</span>
                      <span className="text-gray-600"> / ${category.budgeted.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isOverBudget ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{percentage.toFixed(1)}% used</span>
                    <span className={isOverBudget ? 'text-red-500' : 'text-green-500'}>
                      ${(category.budgeted - category.actual).toFixed(2)} {isOverBudget ? 'over' : 'remaining'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Budget;