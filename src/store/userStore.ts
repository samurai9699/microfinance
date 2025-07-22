import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserProfile, FinancialData } from '../lib/types';

interface UserState {
  profile: UserProfile | null;
  financialData: FinancialData | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  updateFinancialData: (data: Partial<FinancialData>) => void;
  addTransaction: (transaction: FinancialData['transactions'][0]) => void;
  updateSavingsGoal: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    profile: null,
    financialData: null,
    isLoading: false,
    error: null,
    setProfile: (profile) =>
      set((state) => {
        state.profile = profile;
      }),
    updateFinancialData: (data) =>
      set((state) => {
        if (state.financialData) {
          state.financialData = { ...state.financialData, ...data };
        }
      }),
    addTransaction: (transaction) =>
      set((state) => {
        if (state.financialData) {
          state.financialData.transactions.unshift(transaction);
          
          // Update relevant totals
          if (transaction.type === 'income') {
            state.financialData.income.other += transaction.amount;
          } else {
            state.financialData.expenses.variable += transaction.amount;
          }
        }
      }),
    updateSavingsGoal: (amount) =>
      set((state) => {
        if (state.profile) {
          state.profile.savingsGoal = amount;
        }
      }),
  }))
);