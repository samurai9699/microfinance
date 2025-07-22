import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { PlusCircle, MinusCircle, BarChart2, Calendar } from 'lucide-react';

type QuickActionsProps = {
  className?: string;
};

const QuickActionsPanel: React.FC<QuickActionsProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('expense');
  
  return (
    <Card glassEffect className={`p-6 h-full ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'income'
              ? 'text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('income')}
        >
          Add Income
          {activeTab === 'income' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'expense'
              ? 'text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('expense')}
        >
          Add Expense
          {activeTab === 'expense' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>
      
      {/* Form */}
      <form className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className="pl-7 pr-12 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          >
            {activeTab === 'income' ? (
              <>
                <option>Salary</option>
                <option>Freelance</option>
                <option>Side Hustle</option>
                <option>Gift</option>
                <option>Other</option>
              </>
            ) : (
              <>
                <option>Groceries</option>
                <option>Transportation</option>
                <option>Housing</option>
                <option>Utilities</option>
                <option>Entertainment</option>
                <option>Healthcare</option>
                <option>Clothing</option>
                <option>Other</option>
              </>
            )}
          </select>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              id="date"
              className="pl-3 pr-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Add details about this transaction"
          />
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            icon={activeTab === 'income' ? <PlusCircle size={18} /> : <MinusCircle size={18} />}
          >
            {activeTab === 'income' ? 'Add Income' : 'Add Expense'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Recent Transactions</span>
          <button className="text-primary text-sm font-medium hover:text-primary/80 flex items-center">
            <BarChart2 className="w-4 h-4 mr-1" />
            View All
          </button>
        </div>
        
        <div className="mt-3 space-y-2">
          {/* Transaction Item */}
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <MinusCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Groceries</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>
            <span className="text-sm font-medium text-red-500">-$45.80</span>
          </div>
          
          {/* Transaction Item */}
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <PlusCircle className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Salary</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-500">+$920.00</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsPanel;