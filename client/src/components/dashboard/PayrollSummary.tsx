import { motion } from "framer-motion";
import { DollarSign, Users, TrendingUp, TrendingDown, Percent } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface PayrollSummaryProps {
  totalEmployees: number;
  totalGross: number;
  totalTax: number;
  totalDeductions: number;
  totalNet: number;
}

export default function PayrollSummary({
  totalEmployees,
  totalGross,
  totalTax,
  totalDeductions,
  totalNet,
}: PayrollSummaryProps) {
  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      prefix: "",
      decimals: 0,
    },
    {
      label: "Gross Salary",
      value: totalGross,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      prefix: "$",
      decimals: 2,
    },
    {
      label: "Total Tax",
      value: totalTax,
      icon: Percent,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-500/10",
      prefix: "$",
      decimals: 2,
    },
    {
      label: "Total Deductions",
      value: totalDeductions,
      icon: TrendingDown,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10",
      prefix: "$",
      decimals: 2,
    },
    {
      label: "Net Payroll",
      value: totalNet,
      icon: DollarSign,
      color: "from-purple-500 to-cyan-500",
      bgColor: "bg-purple-500/10",
      prefix: "$",
      decimals: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              decimals={stat.decimals}
              duration={0.8}
            />
          </div>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
        </motion.div>
      ))}
    </div>
  );
}
