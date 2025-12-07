import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index?: number;
}

export default function StatCard({ title, value, change, changeType = "neutral", icon: Icon, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
      data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${
              changeType === "positive" ? "text-green-400" : 
              changeType === "negative" ? "text-red-400" : 
              "text-muted-foreground"
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
      </div>
    </motion.div>
  );
}
