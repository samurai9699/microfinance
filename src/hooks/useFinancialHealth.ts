import { useMemo } from 'react';
import { useUserStore } from '../store/userStore';

export function useFinancialHealth() {
  const { profile, financialData } = useUserStore();

  const healthScore = useMemo(() => {
    if (!profile || !financialData) return null;

    const scores = {
      savingsRate: 0,
      debtRatio: 0,
      emergencyFund: 0,
      incomeStability: 0,
    };

    // Calculate savings rate score (max 25 points)
    const totalIncome = Object.values(financialData.income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    scores.savingsRate = Math.min(25, (savingsRate / 20) * 25);

    // Calculate debt ratio score (max 25 points)
    const debtRatio = totalIncome > 0 ? (financialData.expenses.debt / totalIncome) * 100 : 100;
    scores.debtRatio = Math.min(25, ((100 - debtRatio) / 100) * 25);

    // Calculate emergency fund score (max 25 points)
    const monthlyExpenses = totalExpenses / 12;
    const emergencyFundRatio = monthlyExpenses > 0 ? 
      financialData.savings.emergency / monthlyExpenses : 0;
    scores.emergencyFund = Math.min(25, (emergencyFundRatio / 6) * 25);

    // Calculate income stability score (max 25 points)
    const hasMultipleIncomes = Object.values(financialData.income).filter(v => v > 0).length > 1;
    const consistentIncome = true; // This would be calculated from historical data
    scores.incomeStability = (hasMultipleIncomes ? 15 : 10) + (consistentIncome ? 10 : 0);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    return {
      total: Math.round(totalScore),
      breakdown: scores,
      savingsRate,
      debtRatio,
      emergencyFundMonths: emergencyFundRatio,
    };
  }, [profile, financialData]);

  return healthScore;
}