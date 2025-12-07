import { motion } from "framer-motion";
import { Building, Users, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Building,
    step: "01",
    title: "Create Company Account",
    description: "Sign up in minutes and configure your company profile, departments, and pay schedules.",
  },
  {
    icon: Users,
    step: "02",
    title: "Add Employees or Upload CSV",
    description: "Add employees one by one or bulk import hundreds with our smart CSV upload tool.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Run Payroll & Generate Payslips",
    description: "Click run, review, and approve. Payslips are generated and sent automatically.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From signup to running your first payroll takes just minutes, not days.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
                data-testid={`step-${index + 1}`}
              >
                <div className="relative p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
                  <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold">
                    Step {step.step}
                  </div>

                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 mt-2">
                    <step.icon className="w-8 h-8 text-purple-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 w-12 items-center justify-center -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
