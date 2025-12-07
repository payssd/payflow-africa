import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";

import CompanyDashboard from "@/pages/company-dashboard";
import CompanyEmployees from "@/pages/company-dashboard/employees";
import CompanyHR from "@/pages/company-dashboard/hr";
import CompanyDepartments from "@/pages/company-dashboard/departments";
import CompanyPayroll from "@/pages/company-dashboard/payroll";
import CompanyPayslips from "@/pages/company-dashboard/payslips";
import CompanyBilling from "@/pages/company-dashboard/billing";
import CompanySettings from "@/pages/company-dashboard/settings";

import HRDashboard from "@/pages/hr-dashboard";
import HREmployees from "@/pages/hr-dashboard/employees";
import HRPayroll from "@/pages/hr-dashboard/payroll";
import HRPayslips from "@/pages/hr-dashboard/payslips";
import HRCSVUpload from "@/pages/hr-dashboard/csv-upload";
import HRSettings from "@/pages/hr-dashboard/settings";

import EmployeeDashboard from "@/pages/employee-dashboard";
import EmployeePayslips from "@/pages/employee-dashboard/payslips";
import EmployeeProfile from "@/pages/employee-dashboard/profile";
import EmployeeSettings from "@/pages/employee-dashboard/settings";
import AcceptInvitation from "@/pages/accept-invitation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/accept-invitation/:token" component={AcceptInvitation} />
      
      <Route path="/company-dashboard">
        <ProtectedRoute><CompanyDashboard /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/employees">
        <ProtectedRoute><CompanyEmployees /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/hr">
        <ProtectedRoute><CompanyHR /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/departments">
        <ProtectedRoute><CompanyDepartments /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/payroll">
        <ProtectedRoute><CompanyPayroll /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/payslips">
        <ProtectedRoute><CompanyPayslips /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/billing">
        <ProtectedRoute><CompanyBilling /></ProtectedRoute>
      </Route>
      <Route path="/company-dashboard/settings">
        <ProtectedRoute><CompanySettings /></ProtectedRoute>
      </Route>
      
      <Route path="/hr-dashboard">
        <ProtectedRoute><HRDashboard /></ProtectedRoute>
      </Route>
      <Route path="/hr-dashboard/employees">
        <ProtectedRoute><HREmployees /></ProtectedRoute>
      </Route>
      <Route path="/hr-dashboard/payroll">
        <ProtectedRoute><HRPayroll /></ProtectedRoute>
      </Route>
      <Route path="/hr-dashboard/payslips">
        <ProtectedRoute><HRPayslips /></ProtectedRoute>
      </Route>
      <Route path="/hr-dashboard/csv-upload">
        <ProtectedRoute><HRCSVUpload /></ProtectedRoute>
      </Route>
      <Route path="/hr-dashboard/settings">
        <ProtectedRoute><HRSettings /></ProtectedRoute>
      </Route>
      
      <Route path="/employee-dashboard">
        <ProtectedRoute><EmployeeDashboard /></ProtectedRoute>
      </Route>
      <Route path="/employee-dashboard/payslips">
        <ProtectedRoute><EmployeePayslips /></ProtectedRoute>
      </Route>
      <Route path="/employee-dashboard/profile">
        <ProtectedRoute><EmployeeProfile /></ProtectedRoute>
      </Route>
      <Route path="/employee-dashboard/settings">
        <ProtectedRoute><EmployeeSettings /></ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
