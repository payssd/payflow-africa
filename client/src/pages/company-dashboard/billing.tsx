import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Calendar, AlertCircle } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 29,
    features: ["Up to 25 employees", "Basic payroll", "Email support"],
    current: false,
  },
  {
    name: "Growth",
    price: 79,
    features: ["Up to 100 employees", "HR dashboard", "Bulk CSV upload", "Priority support"],
    current: true,
  },
  {
    name: "Enterprise",
    price: 199,
    features: ["Unlimited employees", "Multi-company", "API access", "Dedicated manager"],
    current: false,
  },
];

export default function CompanyBilling() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <DashboardLayout title="Billing" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Subscription & Billing</h2>
            <p className="text-muted-foreground">Manage your plan and payment details</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-foreground">Growth Plan</h3>
                <Badge className="bg-purple-500 text-white border-0">Current</Badge>
              </div>
              <p className="text-muted-foreground mb-4">You have 14 days left in your free trial</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Trial ends: Dec 20, 2024
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  No card on file
                </div>
              </div>
            </div>
            <Button data-testid="button-add-payment">Add Payment Method</Button>
          </div>
        </motion.div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-card/50 border border-border/50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-muted-foreground"
              }`}
              data-testid="toggle-monthly"
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-muted-foreground"
              }`}
              data-testid="toggle-yearly"
            >
              Yearly (Save 17%)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                plan.current
                  ? "bg-gradient-to-b from-purple-500/10 to-cyan-500/10 border-2 border-purple-500/50"
                  : "bg-card/50 border border-border/50"
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    ${billingCycle === "yearly" ? plan.price * 10 : plan.price}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === "yearly" ? "year" : "month"}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.current ? "default" : "outline"}
                disabled={plan.current}
                data-testid={`button-select-${plan.name.toLowerCase()}`}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-card/50 border border-border/50"
        >
          <h3 className="font-semibold text-foreground mb-4">Billing History</h3>
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No billing history yet</p>
            <p className="text-sm">Invoices will appear here after your trial ends</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
