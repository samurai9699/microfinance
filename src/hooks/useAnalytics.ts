import { useMemo } from 'react';
import { useUserStore } from '../store/userStore';
import { Transaction } from '../lib/types';

export function useAnalytics() {
  const financialData = useUserStore((state) => state.financialData);

  const analytics = useMemo(() => {
    if (!financialData) return null;

    const calculateTrend = (transactions: Transaction[], days: number) => {
      const now = new Date();
      const startDate = new Date(now.setDate(now.getDate() - days));
      
      return transactions
        .filter(t => new Date(t.date) >= startDate)
        .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
    };

    const monthlyTrend = calculateTrend(financialData.transactions, 30);
    const weeklyTrend = calculateTrend(financialData.transactions, 7);

    const expensesByCategory = financialData.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const totalIncome = Object.values(financialData.income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      monthlyTrend,
      weeklyTrend,
      expensesByCategory,
      totalIncome,
      totalExpenses,
      savingsRate,
    };
  }, [financialData]);

  return analytics;
}