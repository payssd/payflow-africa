import { motion } from "framer-motion";
import { Link } from "wouter";
import { DollarSign, Calendar, FileText, Download, TrendingUp, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Net Salary", value: "$5,850", change: "November 2024", changeType: "neutral" as const, icon: DollarSign },
  { title: "Leave Balance", value: "18 days", change: "+3 accrued", changeType: "positive" as const, icon: Calendar },
  { title: "Total Payslips", value: "12", change: "This year", changeType: "neutral" as const, icon: FileText },
  { title: "YTD Earnings", value: "$68,400", change: "+8% from last year", changeType: "positive" as const, icon: TrendingUp },
];

export default function EmployeeDashboard() {
  return (
    <DashboardLayout title="Dashboard" role="employee">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Amara!</h2>
          <p className="text-muted-foreground">Here's your payroll overview for this month.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-card/50 border border-border/50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Latest Payslip</h3>
              <Badge variant="secondary">November 2024</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Gross Salary</span>
                <span className="font-medium text-foreground">$6,500.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Tax Deduction</span>
                <span className="font-medium text-red-400">-$520.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Pension</span>
                <span className="font-medium text-red-400">-$130.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold text-foreground">Net Salary</span>
                <span className="font-bold text-lg text-purple-400">$5,850.00</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button className="flex-1 gap-2" data-testid="button-download-payslip">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Link href="/employee-dashboard/payslips">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-card/50 border border-border/50 p-6"
          >
            <h3 className="font-semibold text-foreground mb-6">Employment Information</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Employee ID</span>
                <span className="font-medium text-foreground">EMP-001247</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium text-foreground">Engineering</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Position</span>
                <span className="font-medium text-foreground">Senior Developer</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Join Date</span>
                <span className="font-medium text-foreground">March 15, 2021</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Manager</span>
                <span className="font-medium text-foreground">Chidi Eze</span>
              </div>
            </div>

            <Link href="/employee-dashboard/profile">
              <Button variant="outline" className="w-full mt-6">View Full Profile</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
