import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Play, X, DollarSign, Users } from "lucide-react";

const payrollRuns = [
  { id: 1, period: "December 2024", amount: "$492,500", employees: 1250, status: "Pending", date: "Dec 31, 2024" },
  { id: 2, period: "November 2024", amount: "$485,200", employees: 1247, status: "Completed", date: "Nov 30, 2024" },
  { id: 3, period: "October 2024", amount: "$478,500", employees: 1235, status: "Completed", date: "Oct 31, 2024" },
  { id: 4, period: "September 2024", amount: "$465,800", employees: 1220, status: "Completed", date: "Sep 30, 2024" },
];

const columns = [
  { key: "period", label: "Period" },
  { key: "amount", label: "Total Amount" },
  { key: "employees", label: "Employees" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  { key: "date", label: "Process Date" },
];

export default function HRPayroll() {
  const [showRunModal, setShowRunModal] = useState(false);

  return (
    <DashboardLayout title="Payroll" role="hr">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Payroll Management</h2>
            <p className="text-muted-foreground">Run and manage payroll cycles</p>
          </div>
          <Button className="gap-2" onClick={() => setShowRunModal(true)} data-testid="button-run-payroll">
            <Play className="w-4 h-4" />
            Run Payroll
          </Button>
        </div>

        <DataTable columns={columns} data={payrollRuns} searchPlaceholder="Search payroll..." />

        <AnimatePresence>
          {showRunModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={() => setShowRunModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border/50 rounded-xl p-6 z-50"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Run Payroll</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowRunModal(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">Payroll Period</p>
                    <p className="text-lg font-semibold text-foreground">December 2024</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Employees</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">1,250</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Total</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">$492,500</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowRunModal(false)}>Cancel</Button>
                    <Button className="gap-2" onClick={() => { console.log("Payroll run"); setShowRunModal(false); }}>
                      <Play className="w-4 h-4" />
                      Confirm & Run
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
