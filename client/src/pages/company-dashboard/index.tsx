import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Users, Banknote, Building2, CreditCard, UserPlus, TrendingUp, Calendar } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Total Employees", value: "1,247", change: "+12% from last month", changeType: "positive" as const, icon: Users },
  { title: "Payroll Runs", value: "24", change: "This year", changeType: "neutral" as const, icon: Banknote },
  { title: "Departments", value: "12", change: "+2 new", changeType: "positive" as const, icon: Building2 },
  { title: "Active Subscription", value: "Growth", change: "14 days left in trial", changeType: "neutral" as const, icon: CreditCard },
];

const recentPayroll = [
  { id: 1, period: "November 2024", amount: "$485,200", employees: 1247, status: "Completed", date: "Nov 30, 2024" },
  { id: 2, period: "October 2024", amount: "$478,500", employees: 1235, status: "Completed", date: "Oct 31, 2024" },
  { id: 3, period: "September 2024", amount: "$465,800", employees: 1220, status: "Completed", date: "Sep 30, 2024" },
  { id: 4, period: "August 2024", amount: "$460,200", employees: 1210, status: "Completed", date: "Aug 31, 2024" },
];

const columns = [
  { key: "period", label: "Period" },
  { key: "amount", label: "Total Amount" },
  { key: "employees", label: "Employees" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  { key: "date", label: "Processed Date" },
];

export default function CompanyDashboard() {
  return (
    <DashboardLayout title="Dashboard" role="company">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="font-semibold text-foreground">Monthly Payroll Cost</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Last 6 months
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border border-border/30 rounded-lg bg-background/30">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-purple-400/50 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Chart Visualization</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/company-dashboard/employees">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-add-employee">
                    <UserPlus className="w-4 h-4" />
                    Add Employee
                  </Button>
                </Link>
                <Link href="/company-dashboard/hr">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-add-hr">
                    <Users className="w-4 h-4" />
                    Add HR User
                  </Button>
                </Link>
                <Link href="/company-dashboard/payroll">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-run-payroll">
                    <Banknote className="w-4 h-4" />
                    Run Payroll
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-foreground mb-2">Upgrade Plan</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get access to unlimited employees and advanced features.
              </p>
              <Link href="/company-dashboard/billing">
                <Button size="sm" data-testid="button-upgrade">
                  View Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <DataTable
          title="Recent Payroll Activity"
          columns={columns}
          data={recentPayroll}
          searchPlaceholder="Search payroll..."
        />
      </div>
    </DashboardLayout>
  );
}
