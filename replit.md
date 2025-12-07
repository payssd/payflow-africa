# PayFlow Africa - Payroll Management System

## Overview
PayFlow Africa is a complete payroll management SaaS for African businesses. It features role-based access control, invitation system for team management, payroll calculations, and PDF payslip generation.

## Project Structure
```
payflow-africazip/Page-Builder/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/        # UI components
│       │   └── dashboard/     # Payroll components (PayrollTable, PayrollSummary, AnimatedCounter)
│       ├── contexts/          # AuthContext with role-based auth
│       ├── lib/               # Supabase client
│       └── pages/             # Route pages
│           ├── company-dashboard/  # Admin dashboard with payroll
│           ├── hr-dashboard/       # HR dashboard
│           ├── employee-dashboard/ # Employee dashboard
│           └── accept-invitation.tsx # Invitation acceptance page
├── server/                    # Express.js backend
│   ├── routes.ts              # API endpoints
│   └── storage.ts             # In-memory storage
├── shared/                    # Shared types
│   └── schema.ts              # Database schema types
└── supabase-schema.sql        # SQL schema for Supabase
```

## Setup Instructions

### 1. Supabase Configuration
1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 2. Running the Application
```bash
cd payflow-africazip/Page-Builder && npm run dev
```

## Features

### Authentication & Roles
- **Company Admin**: Full access to company management, payroll, invitations
- **HR**: Access to employee management and payroll
- **Employee**: View own payslips and profile

### Invitation System
- Admins/HR can invite users via email
- Invitation link format: `/accept-invitation/:token`
- Invited users create account and join company

### Payroll System
- Add/edit employees with salary, allowances, deductions
- Run payroll calculations
- Export to CSV
- Generate PDF payslips

## API Endpoints

### Employees
- `GET /api/employees?companyId=` - List employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments?companyId=` - List departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Invitations
- `POST /api/invitations` - Create invitation
- `GET /api/invitations?companyId=` - List invitations
- `GET /api/invitations/verify/:token` - Verify invitation
- `POST /api/invitations/accept/:token` - Accept invitation

### Payroll
- `POST /api/payroll/run` - Run payroll
- `GET /api/payroll?companyId=` - List payroll runs
- `GET /api/payroll/:id/payslips` - Get payslips for a run
- `GET /api/payroll/export?companyId=` - Export CSV
- `GET /api/payslip/:employeeId/pdf` - Generate PDF payslip

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Express.js, PDFKit
- **Database**: Supabase (Auth + PostgreSQL)
- **State**: React Context for auth

## Recent Changes
- Added complete database schema with RLS policies
- Implemented role-based authentication
- Built invitation system for team management
- Created payroll calculator with animated UI
- Added PDF payslip generation
