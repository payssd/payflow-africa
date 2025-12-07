-- PayFlow Africa Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles with roles (references auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('company_admin', 'hr', 'employee')),
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invitations table for HR and employees
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('hr', 'employee')),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employees table (for payroll data)
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  position TEXT,
  base_salary DECIMAL(12,2) DEFAULT 0,
  allowances JSONB DEFAULT '{}',
  deductions JSONB DEFAULT '{}',
  tax_rate DECIMAL(5,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  head_name TEXT,
  budget DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll runs table
CREATE TABLE IF NOT EXISTS payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  total_employees INTEGER,
  total_gross DECIMAL(12,2),
  total_tax DECIMAL(12,2),
  total_deductions DECIMAL(12,2),
  total_net DECIMAL(12,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payslips table
CREATE TABLE IF NOT EXISTS payslips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  base_salary DECIMAL(12,2),
  allowances DECIMAL(12,2),
  deductions DECIMAL(12,2),
  tax_amount DECIMAL(12,2),
  net_salary DECIMAL(12,2),
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

-- Companies: Users can only access their own company
CREATE POLICY "Users can view their own company" ON companies
  FOR SELECT USING (
    id IN (SELECT company_id FROM user_profiles WHERE id = auth.uid())
  );

-- User profiles: Users can view profiles in their company
CREATE POLICY "Users can view profiles in their company" ON user_profiles
  FOR SELECT USING (
    company_id IN (SELECT company_id FROM user_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

-- Invitations: Company admins and HR can manage invitations
CREATE POLICY "Admins and HR can view invitations" ON invitations
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('company_admin', 'hr')
    )
  );

CREATE POLICY "Admins and HR can create invitations" ON invitations
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('company_admin', 'hr')
    )
  );

-- Employees: Company users can view employees in their company
CREATE POLICY "Users can view employees in their company" ON employees
  FOR SELECT USING (
    company_id IN (SELECT company_id FROM user_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins and HR can manage employees" ON employees
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('company_admin', 'hr')
    )
  );

-- Departments: Company users can view departments
CREATE POLICY "Users can view departments in their company" ON departments
  FOR SELECT USING (
    company_id IN (SELECT company_id FROM user_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can manage departments" ON departments
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Payroll runs: Company admins and HR can manage
CREATE POLICY "Admins and HR can view payroll runs" ON payroll_runs
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('company_admin', 'hr')
    )
  );

CREATE POLICY "Admins and HR can manage payroll runs" ON payroll_runs
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('company_admin', 'hr')
    )
  );

-- Payslips: Employees can view their own, admins and HR can view all
CREATE POLICY "Employees can view their own payslips" ON payslips
  FOR SELECT USING (
    employee_id IN (
      SELECT id FROM employees WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins and HR can view all payslips" ON payslips
  FOR SELECT USING (
    employee_id IN (
      SELECT e.id FROM employees e
      JOIN user_profiles up ON up.company_id = e.company_id
      WHERE up.id = auth.uid() AND up.role IN ('company_admin', 'hr')
    )
  );

-- Function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role)
  VALUES (new.id, 'employee');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_company ON user_profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_employees_company ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_departments_company ON departments(company_id);
CREATE INDEX IF NOT EXISTS idx_payroll_runs_company ON payroll_runs(company_id);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
