import { UserProfile, FinancialData, RegionContext } from '../types';

export class ContextManager {
  private userProfile: UserProfile;
  private financialData: FinancialData;
  private regionContext: RegionContext;

  constructor(userId: string) {
    // Initialize with default values
    this.userProfile = this.loadUserProfile(userId);
    this.financialData = this.loadFinancialData(userId);
    this.regionContext = this.loadRegionContext(this.userProfile.region);
  }

  private loadUserProfile(userId: string): UserProfile {
    // In production, this would load from a database
    return {
      id: userId,
      name: 'Default User',
      monthlyIncome: 0,
      savingsGoal: 0,
      riskTolerance: 'medium',
      businessExperience: 'none',
      language: 'en',
      region: 'east-africa',
    };
  }

  private loadFinancialData(userId: string): FinancialData {
    // In production, this would load from a database
    return {
      income: { salary: 0, business: 0, other: 0 },
      expenses: { fixed: 0, variable: 0, debt: 0 },
      savings: { emergency: 0, goals: 0, investments: 0 },
      transactions: [],
    };
  }

  private loadRegionContext(region: string): RegionContext {
    // In production, this would load from a database
    return {
      region,
      currency: 'USD',
      localTerms: {},
      culturalFactors: [],
    };
  }

  public getContext() {
    return {
      userProfile: this.userProfile,
      financialData: this.financialData,
      regionContext: this.regionContext,
    };
  }

  public updateContext(updates: Partial<{
    userProfile: Partial<UserProfile>;
    financialData: Partial<FinancialData>;
    regionContext: Partial<RegionContext>;
  }>) {
    if (updates.userProfile) {
      this.userProfile = { ...this.userProfile, ...updates.userProfile };
    }
    if (updates.financialData) {
      this.financialData = { ...this.financialData, ...updates.financialData };
    }
    if (updates.regionContext) {
      this.regionContext = { ...this.regionContext, ...updates.regionContext };
    }
  }
}