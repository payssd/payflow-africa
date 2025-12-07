import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "For small businesses getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 25 employees",
      "Basic payroll automation",
      "Employee self-service",
      "Payslip generation",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing teams with more needs",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "Up to 100 employees",
      "Advanced payroll features",
      "HR dashboard",
      "Bulk CSV upload",
      "Department management",
      "Priority support",
      "Custom payslip templates",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited employees",
      "All Growth features",
      "Multi-company support",
      "Advanced compliance",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required.
          </p>

          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-card/50 border border-border/50">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-muted-foreground"
              }`}
              data-testid="toggle-monthly"
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isYearly
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-muted-foreground"
              }`}
              data-testid="toggle-yearly"
            >
              Yearly
              <span className="ml-1 text-xs opacity-80">(Save 17%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-500/10 to-cyan-500/10 border-2 border-purple-500/50"
                  : "bg-card/50 border border-border/50"
              }`}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                data-testid={`button-select-${plan.name.toLowerCase()}`}
              >
                Start Free Trial
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
