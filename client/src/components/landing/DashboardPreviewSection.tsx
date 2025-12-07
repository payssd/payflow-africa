import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, UserCircle, TrendingUp, Clock, FileText, DollarSign, Calendar } from "lucide-react";

const dashboards = [
  {
    id: "company",
    title: "Company Dashboard",
    icon: Building2,
    description: "Overview of all departments, payroll analytics, and financial insights.",
    stats: [
      { label: "Total Employees", value: "1,247", icon: Users, trend: "+12%" },
      { label: "Monthly Payroll", value: "$485,200", icon: DollarSign, trend: "+8%" },
      { label: "Departments", value: "12", icon: Building2 },
      { label: "Pending Approvals", value: "23", icon: Clock },
    ],
  },
  {
    id: "hr",
    title: "HR Dashboard",
    icon: Users,
    description: "Manage employee records, leave requests, and performance tracking.",
    stats: [
      { label: "Active Staff", value: "1,189", icon: Users, trend: "+5%" },
      { label: "On Leave", value: "58", icon: Calendar },
      { label: "New Hires", value: "15", icon: UserCircle },
      { label: "Reviews Due", value: "8", icon: FileText },
    ],
  },
  {
    id: "employee",
    title: "Employee Dashboard",
    icon: UserCircle,
    description: "Personal payslips, leave balance, and profile management.",
    stats: [
      { label: "Net Salary", value: "$4,850", icon: DollarSign },
      { label: "Leave Balance", value: "18 days", icon: Calendar },
      { label: "Payslips", value: "12", icon: FileText },
      { label: "YTD Earnings", value: "$52,400", icon: TrendingUp },
    ],
  },
];

export default function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState("company");

  const activeDashboard = dashboards.find((d) => d.id === activeTab) || dashboards[0];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Role-Based{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboards
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each role gets a tailored experience with the metrics and tools they need most.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => setActiveTab(dashboard.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === dashboard.id
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "bg-card/50 text-muted-foreground border border-border/50"
              }`}
              data-testid={`tab-dashboard-${dashboard.id}`}
            >
              <dashboard.icon className="w-4 h-4" />
              {dashboard.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl" />

          <div className="relative rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <activeDashboard.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{activeDashboard.title}</h3>
                  <p className="text-sm text-muted-foreground">{activeDashboard.description}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeDashboard.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-background/50 border border-border/30"
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-muted-foreground" />
                      {stat.trend && (
                        <span className="text-xs font-medium text-green-400">{stat.trend}</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 h-48 rounded-xl bg-background/30 border border-border/30 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-purple-400/50 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Analytics Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
