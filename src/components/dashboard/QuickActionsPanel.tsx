import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useUserStore } from '../../store/userStore';
import { SupabaseService } from '../../services/supabaseService';
import Card from '../common/Card';
import Button from '../common/Button';
import { PlusCircle, MinusCircle, BarChart2, Calendar } from 'lucide-react';

type QuickActionsProps = {
  className?: string;
};

const QuickActionsPanel: React.FC<QuickActionsProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('expense');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { addTransaction, financialData } = useUserStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.amount || !formData.category) return;

    setIsSubmitting(true);
    try {
      const transaction = {
        amount: parseFloat(formData.amount),
        type: activeTab,
        category: formData.category,
        description: formData.notes,
        date: formData.date,
      };

      const newTransaction = await SupabaseService.addTransaction(user.id, transaction);
      if (newTransaction) {
        addTransaction(newTransaction);
        // Reset form
        setFormData({
          amount: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          notes: '',
        });
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const recentTransactions = financialData?.transactions.slice(0, 2) || [];
  
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
      <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={formData.amount}
              onChange={handleInputChange}
              required
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
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Select category</option>
            {activeTab === 'income' ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Side Hustle">Side Hustle</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
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
              value={formData.date}
              onChange={handleInputChange}
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
            value={formData.notes}
            onChange={handleInputChange}
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
            disabled={isSubmitting || !formData.amount || !formData.category}
            icon={activeTab === 'income' ? <PlusCircle size={18} /> : <MinusCircle size={18} />}
          >
            {isSubmitting ? 'Adding...' : (activeTab === 'income' ? 'Add Income' : 'Add Expense')}
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
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <PlusCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <MinusCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.category}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsPanel;