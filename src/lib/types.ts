export type UserProfile = {
  id: string;
  name: string;
  monthlyIncome: number;
  savingsGoal: number;
  riskTolerance: 'low' | 'medium' | 'high';
  businessExperience: 'none' | 'some' | 'experienced';
  language: string;
  region: string;
};

export type FinancialData = {
  income: {
    salary: number;
    business: number;
    other: number;
  };
  expenses: {
    fixed: number;
    variable: number;
    debt: number;
  };
  savings: {
    emergency: number;
    goals: number;
    investments: number;
  };
  transactions: Transaction[];
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
};

export type RegionContext = {
  region: string;
  currency: string;
  localTerms: Record<string, string>;
  culturalFactors: string[];
};

export type LendingCircle = {
  id: string;
  name: string;
  members: string[];
  contribution: number;
  frequency: 'weekly' | 'monthly';
  purpose: string;
  region: string;
  trustScore: number;
};

export type BusinessTemplate = {
  id: string;
  industry: string;
  region: string;
  size: 'micro' | 'small' | 'medium';
  requirements: {
    startup: number;
    monthly: number;
    staff: number;
  };
  projections: {
    revenue: number[];
    expenses: number[];
    profit: number[];
  };
};