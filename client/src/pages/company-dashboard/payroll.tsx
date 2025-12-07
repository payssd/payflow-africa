import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import PayrollSummary from "@/components/dashboard/PayrollSummary";
import PayrollTable from "@/components/dashboard/PayrollTable";
import { Button } from "@/components/ui/button";
import { Play, X, Download, FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Employee {
  id: string;
  name: string;
  email: string | null;
  department: string | null;
  position: string | null;
  baseSalary: string;
  allowances: Record<string, number>;
  deductions: Record<string, number>;
  taxRate: string;
  status: string | null;
}

interface PayrollRun {
  id: string;
  period: string;
  totalEmployees: number;
  totalGross: string;
  totalNet: string;
  status: string;
  createdAt: string;
}

const payrollHistoryColumns = [
  { key: "period", label: "Period" },
  { key: "totalGross", label: "Total Gross", render: (value: string) => `$${parseFloat(value || "0").toLocaleString()}` },
  { key: "totalNet", label: "Net Payroll", render: (value: string) => `$${parseFloat(value || "0").toLocaleString()}` },
  { key: "totalEmployees", label: "Employees" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  { key: "createdAt", label: "Date", render: (value: string) => new Date(value).toLocaleDateString() },
];

export default function CompanyPayroll() {
  const { profile } = useAuth();
  const [showRunModal, setShowRunModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"calculator" | "history">("calculator");

  const companyId = profile?.companyId;

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const fetchData = async () => {
    try {
      const [empRes, payrollRes] = await Promise.all([
        fetch(`/api/employees?companyId=${companyId}`),
        fetch(`/api/payroll?companyId=${companyId}`),
      ]);
      
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData);
      }
      
      if (payrollRes.ok) {
        const payrollData = await payrollRes.json();
        setPayrollRuns(payrollData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeEmployees = useMemo(() => 
    employees.filter(e => e.status === "active"),
    [employees]
  );

  const payrollSummary = useMemo(() => {
    let totalGross = 0;
    let totalTax = 0;
    let totalDeductions = 0;
    let totalNet = 0;

    activeEmployees.forEach(emp => {
      const base = parseFloat(emp.baseSalary || "0");
      const allowancesTotal = Object.values(emp.allowances || {}).reduce((sum, val) => sum + (val || 0), 0);
      const deductionsTotal = Object.values(emp.deductions || {}).reduce((sum, val) => sum + (val || 0), 0);
      const taxRate = parseFloat(emp.taxRate || "0") / 100;
      const gross = base + allowancesTotal;
      const tax = gross * taxRate;
      const net = gross - tax - deductionsTotal;

      totalGross += gross;
      totalTax += tax;
      totalDeductions += deductionsTotal;
      totalNet += net;
    });

    return { totalGross, totalTax, totalDeductions, totalNet };
  }, [activeEmployees]);

  const handleUpdateEmployee = async (id: string, data: Partial<Employee>) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const updated = await response.json();
        setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleRunPayroll = async () => {
    if (!companyId) return;
    
    setIsRunning(true);
    try {
      const period = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
      
      const response = await fetch("/api/payroll/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, period }),
      });
      
      if (response.ok) {
        const { payrollRun } = await response.json();
        setPayrollRuns(prev => [payrollRun, ...prev]);
        setShowRunModal(false);
      }
    } catch (error) {
      console.error("Error running payroll:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExportCSV = async () => {
    if (!companyId) return;
    
    try {
      const response = await fetch(`/api/payroll/export?companyId=${companyId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payroll-export.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Payroll" role="company">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Payroll" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Payroll Calculator</h2>
            <p className="text-muted-foreground">Calculate and run payroll for your employees</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button className="gap-2" onClick={() => setShowRunModal(true)} data-testid="button-run-payroll">
              <Play className="w-4 h-4" />
              Run Payroll
            </Button>
          </div>
        </div>

        <PayrollSummary
          totalEmployees={activeEmployees.length}
          totalGross={payrollSummary.totalGross}
          totalTax={payrollSummary.totalTax}
          totalDeductions={payrollSummary.totalDeductions}
          totalNet={payrollSummary.totalNet}
        />

        <div className="flex gap-2 border-b border-border/50">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "calculator"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Employee Breakdown
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Payroll History
          </button>
        </div>

        {activeTab === "calculator" ? (
          <PayrollTable
            employees={activeEmployees}
            onUpdateEmployee={handleUpdateEmployee}
          />
        ) : (
          <DataTable
            columns={payrollHistoryColumns}
            data={payrollRuns}
            searchPlaceholder="Search payroll runs..."
          />
        )}

        {createPortal(
          <AnimatePresence>
            {showRunModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={() => setShowRunModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-lg bg-card border border-border/50 rounded-xl p-6 mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Confirm Payroll Run</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowRunModal(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2">Payroll Period</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <p className="text-sm text-muted-foreground mb-1">Employees</p>
                        <p className="text-2xl font-bold text-foreground">{activeEmployees.length}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <p className="text-sm text-muted-foreground mb-1">Net Payroll</p>
                        <p className="text-2xl font-bold text-foreground">
                          ${payrollSummary.totalNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          This will process payroll for all active employees and generate payslips automatically.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowRunModal(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="gap-2" 
                        onClick={handleRunPayroll}
                        disabled={isRunning}
                        data-testid="button-confirm-payroll"
                      >
                        {isRunning ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Confirm & Run
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </DashboardLayout>
  );
}
