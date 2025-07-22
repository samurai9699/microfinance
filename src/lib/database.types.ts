export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          monthly_income: number
          savings_goal: number
          risk_tolerance: string
          business_experience: string
          language: string
          region: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          monthly_income?: number
          savings_goal?: number
          risk_tolerance?: string
          business_experience?: string
          language?: string
          region?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          monthly_income?: number
          savings_goal?: number
          risk_tolerance?: string
          business_experience?: string
          language?: string
          region?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      financial_data: {
        Row: {
          id: string
          user_id: string
          income_salary: number
          income_business: number
          income_other: number
          expenses_fixed: number
          expenses_variable: number
          expenses_debt: number
          savings_emergency: number
          savings_goals: number
          savings_investments: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          income_salary?: number
          income_business?: number
          income_other?: number
          expenses_fixed?: number
          expenses_variable?: number
          expenses_debt?: number
          savings_emergency?: number
          savings_goals?: number
          savings_investments?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          income_salary?: number
          income_business?: number
          income_other?: number
          expenses_fixed?: number
          expenses_variable?: number
          expenses_debt?: number
          savings_emergency?: number
          savings_goals?: number
          savings_investments?: number
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: string
          category: string
          description: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: string
          category: string
          description?: string | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: string
          category?: string
          description?: string | null
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}