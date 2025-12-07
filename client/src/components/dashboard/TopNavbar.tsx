import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TopNavbarProps {
  title: string;
  role: "company" | "hr" | "employee";
}

export default function TopNavbar({ title, role }: TopNavbarProps) {
  const [notifications] = useState(3);

  const roleLabels = {
    company: "Company Admin",
    hr: "HR Manager",
    employee: "Employee",
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="flex items-center justify-between gap-4 px-6 h-16">
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-page-title">
              {title}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{roleLabels[role]} Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-purple-500 border-0">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b border-border">
                <p className="font-medium text-foreground">Notifications</p>
              </div>
              <div className="p-2 space-y-2">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-foreground">Payroll run completed</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-foreground">New employee added</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-foreground">Subscription renewed</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2" data-testid="button-user-menu">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {role === "company" ? "CA" : role === "hr" ? "HR" : "EM"}
                  </span>
                </div>
                <span className="hidden sm:inline text-sm">{roleLabels[role]}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b border-border">
                <p className="font-medium text-foreground">{roleLabels[role]}</p>
                <p className="text-xs text-muted-foreground">{role}@payflow.africa</p>
              </div>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4" />
                  Back to Home
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
