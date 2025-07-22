import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { useUserStore } from '../../store/userStore';
import { SupabaseService } from '../../services/supabaseService';
import LoadingSpinner from '../common/LoadingSpinner';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setProfile, updateFinancialData } = useUserStore();

  const initializeUserData = async (user: User) => {
    try {
      // Get or create user profile
      let profile = await SupabaseService.getProfile(user.id);
      if (!profile) {
        profile = await SupabaseService.createProfile(user.id, {
          name: user.email?.split('@')[0] || 'User',
          monthlyIncome: 0,
          savingsGoal: 1000,
          riskTolerance: 'medium',
          businessExperience: 'none',
          language: 'en',
          region: 'east-africa',
        });
      }

      if (profile) {
        setProfile(profile);
      }

      // Get or create financial data
      let financialData = await SupabaseService.getFinancialData(user.id);
      if (!financialData) {
        financialData = await SupabaseService.createFinancialData(user.id);
      }

      if (financialData) {
        updateFinancialData(financialData);
      }
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await initializeUserData(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await initializeUserData(session.user);
      } else {
        // Clear user data on logout
        setProfile(null);
        updateFinancialData({
          income: { salary: 0, business: 0, other: 0 },
          expenses: { fixed: 0, variable: 0, debt: 0 },
          savings: { emergency: 0, goals: 0, investments: 0 },
          transactions: [],
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};