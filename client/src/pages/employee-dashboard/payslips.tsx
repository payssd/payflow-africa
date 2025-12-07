import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download, FileText, Eye } from "lucide-react";

const payslips = [
  { id: 1, period: "November 2024", grossSalary: "$6,500", netSalary: "$5,850", date: "Nov 30, 2024" },
  { id: 2, period: "October 2024", grossSalary: "$6,500", netSalary: "$5,850", date: "Oct 31, 2024" },
  { id: 3, period: "September 2024", grossSalary: "$6,500", netSalary: "$5,850", date: "Sep 30, 2024" },
  { id: 4, period: "August 2024", grossSalary: "$6,500", netSalary: "$5,850", date: "Aug 31, 2024" },
  { id: 5, period: "July 2024", grossSalary: "$6,200", netSalary: "$5,580", date: "Jul 31, 2024" },
  { id: 6, period: "June 2024", grossSalary: "$6,200", netSalary: "$5,580", date: "Jun 30, 2024" },
];

export default function EmployeePayslips() {
  return (
    <DashboardLayout title="Payslips" role="employee">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Payslips</h2>
          <p className="text-muted-foreground">View and download your salary payslips</p>
        </div>

        <div className="space-y-4">
          {payslips.map((payslip, index) => (
            <motion.div
              key={payslip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-card/50 border border-border/50 flex flex-wrap items-center justify-between gap-4"
              data-testid={`payslip-${payslip.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{payslip.period}</p>
                  <p className="text-sm text-muted-foreground">Processed: {payslip.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Net Salary</p>
                  <p className="font-semibold text-foreground">{payslip.netSalary}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" data-testid={`button-view-${payslip.id}`}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-download-${payslip.id}`}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
