/*
  # Initial Schema Setup

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - full_name (text)
      - monthly_income (numeric)
      - savings_goal (numeric)
      - risk_tolerance (text)
      - business_experience (text)
      - language (text)
      - region (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - financial_data
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - income_salary (numeric)
      - income_business (numeric)
      - income_other (numeric)
      - expenses_fixed (numeric)
      - expenses_variable (numeric)
      - expenses_debt (numeric)
      - savings_emergency (numeric)
      - savings_goals (numeric)
      - savings_investments (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - transactions
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - amount (numeric)
      - type (text)
      - category (text)
      - description (text)
      - date (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text,
  monthly_income numeric DEFAULT 0,
  savings_goal numeric DEFAULT 0,
  risk_tolerance text DEFAULT 'medium',
  business_experience text DEFAULT 'none',
  language text DEFAULT 'en',
  region text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create financial_data table
CREATE TABLE IF NOT EXISTS financial_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  income_salary numeric DEFAULT 0,
  income_business numeric DEFAULT 0,
  income_other numeric DEFAULT 0,
  expenses_fixed numeric DEFAULT 0,
  expenses_variable numeric DEFAULT 0,
  expenses_debt numeric DEFAULT 0,
  savings_emergency numeric DEFAULT 0,
  savings_goals numeric DEFAULT 0,
  savings_investments numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL,
  category text NOT NULL,
  description text,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own financial data"
  ON financial_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own financial data"
  ON financial_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON financial_data
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();