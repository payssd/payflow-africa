import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Banknote, 
  FileText, 
  Building2, 
  CreditCard, 
  Settings,
  Upload,
  UserCircle,
  ChevronLeft,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "company" | "hr" | "employee";

interface SidebarProps {
  role: Role;
}

const menuItems = {
  company: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/company-dashboard" },
    { icon: Users, label: "Employees", href: "/company-dashboard/employees" },
    { icon: UserCircle, label: "HR Team", href: "/company-dashboard/hr" },
    { icon: Building2, label: "Departments", href: "/company-dashboard/departments" },
    { icon: Banknote, label: "Payroll", href: "/company-dashboard/payroll" },
    { icon: FileText, label: "Payslips", href: "/company-dashboard/payslips" },
    { icon: CreditCard, label: "Billing", href: "/company-dashboard/billing" },
    { icon: Settings, label: "Settings", href: "/company-dashboard/settings" },
  ],
  hr: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/hr-dashboard" },
    { icon: Users, label: "Employees", href: "/hr-dashboard/employees" },
    { icon: Banknote, label: "Payroll", href: "/hr-dashboard/payroll" },
    { icon: FileText, label: "Payslips", href: "/hr-dashboard/payslips" },
    { icon: Upload, label: "CSV Upload", href: "/hr-dashboard/csv-upload" },
    { icon: Settings, label: "Settings", href: "/hr-dashboard/settings" },
  ],
  employee: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/employee-dashboard" },
    { icon: FileText, label: "Payslips", href: "/employee-dashboard/payslips" },
    { icon: UserCircle, label: "Profile", href: "/employee-dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/employee-dashboard/settings" },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const items = menuItems[role];

  return (
    <>
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col h-screen bg-card/50 border-r border-border/50 backdrop-blur-xl sticky top-0"
      >
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">PF</span>
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-bold text-foreground whitespace-nowrap overflow-hidden"
                    >
                      PayFlow Africa
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="shrink-0"
              data-testid="button-collapse-sidebar"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-foreground border border-purple-500/30"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-purple-400" : ""}`} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-white">
                {role === "company" ? "CA" : role === "hr" ? "HR" : "EM"}
              </span>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {role === "company" ? "Admin User" : role === "hr" ? "HR Manager" : "Employee"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {role}@payflow.africa
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 z-50 md:hidden bg-card/80 backdrop-blur-sm border border-border/50"
        onClick={() => setCollapsed(!collapsed)}
        data-testid="button-mobile-sidebar"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
}
