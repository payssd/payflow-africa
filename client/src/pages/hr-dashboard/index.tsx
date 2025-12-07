import { Link } from "wouter";
import { motion } from "framer-motion";
import { Users, Banknote, FileText, Upload, Clock, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Total Employees", value: "1,247", change: "+15 this month", changeType: "positive" as const, icon: Users },
  { title: "Pending Payroll", value: "1", change: "December 2024", changeType: "neutral" as const, icon: Clock },
  { title: "Payslips Generated", value: "1,235", change: "November 2024", changeType: "neutral" as const, icon: FileText },
  { title: "CSV Imports", value: "8", change: "This quarter", changeType: "neutral" as const, icon: Upload },
];

const recentEmployees = [
  { id: 1, name: "Amara Okonkwo", department: "Engineering", position: "Senior Developer", joinDate: "Nov 15, 2024", status: "Active" },
  { id: 2, name: "Kwame Asante", department: "Marketing", position: "Marketing Lead", joinDate: "Nov 12, 2024", status: "Active" },
  { id: 3, name: "Fatima Hassan", department: "Sales", position: "Sales Manager", joinDate: "Nov 10, 2024", status: "Active" },
  { id: 4, name: "Kofi Mensah", department: "Finance", position: "Accountant", joinDate: "Nov 8, 2024", status: "Pending" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "department", label: "Department" },
  { key: "position", label: "Position" },
  { key: "joinDate", label: "Join Date" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
];

export default function HRDashboard() {
  return (
    <DashboardLayout title="Dashboard" role="hr">
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
            <DataTable
              title="Recent Employees"
              columns={columns}
              data={recentEmployees}
              searchPlaceholder="Search employees..."
            />
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
                <Link href="/hr-dashboard/payroll">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-run-payroll">
                    <Banknote className="w-4 h-4" />
                    Run Payroll
                  </Button>
                </Link>
                <Link href="/hr-dashboard/csv-upload">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-upload-csv">
                    <Upload className="w-4 h-4" />
                    Upload CSV
                  </Button>
                </Link>
                <Link href="/hr-dashboard/employees">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-add-employee">
                    <Users className="w-4 h-4" />
                    Add Employee
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Department Overview</h3>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Engineering</span>
                  <span className="text-foreground font-medium">385</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sales</span>
                  <span className="text-foreground font-medium">245</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Marketing</span>
                  <span className="text-foreground font-medium">120</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Support</span>
                  <span className="text-foreground font-medium">156</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
