import { supabase } from '../lib/supabase';
import { UserProfile, FinancialData, Transaction } from '../lib/types';

export class SupabaseService {
  // Profile operations
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, return null
          return null;
        }
        throw error;
      }

      return {
        id: data.id,
        name: data.full_name || '',
        monthlyIncome: data.monthly_income,
        savingsGoal: data.savings_goal,
        riskTolerance: data.risk_tolerance as 'low' | 'medium' | 'high',
        businessExperience: data.business_experience as 'none' | 'some' | 'experienced',
        language: data.language,
        region: data.region || '',
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  static async createProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          full_name: profile.name || '',
          monthly_income: profile.monthlyIncome || 0,
          savings_goal: profile.savingsGoal || 0,
          risk_tolerance: profile.riskTolerance || 'medium',
          business_experience: profile.businessExperience || 'none',
          language: profile.language || 'en',
          region: profile.region || '',
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.full_name || '',
        monthlyIncome: data.monthly_income,
        savingsGoal: data.savings_goal,
        riskTolerance: data.risk_tolerance as 'low' | 'medium' | 'high',
        businessExperience: data.business_experience as 'none' | 'some' | 'experienced',
        language: data.language,
        region: data.region || '',
      };
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  }

  // Financial data operations
  static async getFinancialData(userId: string): Promise<FinancialData | null> {
    try {
      const { data, error } = await supabase
        .from('financial_data')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No financial data found, return default structure
          return {
            income: { salary: 0, business: 0, other: 0 },
            expenses: { fixed: 0, variable: 0, debt: 0 },
            savings: { emergency: 0, goals: 0, investments: 0 },
            transactions: [],
          };
        }
        throw error;
      }

      // Get transactions
      const transactions = await this.getTransactions(userId);

      return {
        income: {
          salary: data.income_salary,
          business: data.income_business,
          other: data.income_other,
        },
        expenses: {
          fixed: data.expenses_fixed,
          variable: data.expenses_variable,
          debt: data.expenses_debt,
        },
        savings: {
          emergency: data.savings_emergency,
          goals: data.savings_goals,
          investments: data.savings_investments,
        },
        transactions,
      };
    } catch (error) {
      console.error('Error fetching financial data:', error);
      return null;
    }
  }

  static async createFinancialData(userId: string): Promise<FinancialData | null> {
    try {
      const { data, error } = await supabase
        .from('financial_data')
        .insert({
          user_id: userId,
          income_salary: 0,
          income_business: 0,
          income_other: 0,
          expenses_fixed: 0,
          expenses_variable: 0,
          expenses_debt: 0,
          savings_emergency: 0,
          savings_goals: 0,
          savings_investments: 0,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        income: {
          salary: data.income_salary,
          business: data.income_business,
          other: data.income_other,
        },
        expenses: {
          fixed: data.expenses_fixed,
          variable: data.expenses_variable,
          debt: data.expenses_debt,
        },
        savings: {
          emergency: data.savings_emergency,
          goals: data.savings_goals,
          investments: data.savings_investments,
        },
        transactions: [],
      };
    } catch (error) {
      console.error('Error creating financial data:', error);
      return null;
    }
  }

  // Transaction operations
  static async getTransactions(userId: string): Promise<Transaction[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;

      return data.map(transaction => ({
        id: transaction.id,
        date: transaction.date,
        amount: transaction.amount,
        type: transaction.type as 'income' | 'expense',
        category: transaction.category,
        description: transaction.description || '',
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  static async addTransaction(userId: string, transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          description: transaction.description,
          date: transaction.date,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        date: data.date,
        amount: data.amount,
        type: data.type as 'income' | 'expense',
        category: data.category,
        description: data.description || '',
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return null;
    }
  }
}