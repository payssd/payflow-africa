import { motion } from "framer-motion";
import { 
  Banknote, 
  Users, 
  UserCircle, 
  FileText, 
  Upload, 
  Building2, 
  ShieldCheck, 
  CreditCard 
} from "lucide-react";

const features = [
  {
    icon: Banknote,
    title: "Automated Payroll",
    description: "Run payroll in minutes with automated calculations, tax deductions, and direct deposits.",
  },
  {
    icon: Users,
    title: "HR Dashboard",
    description: "Comprehensive HR management with employee records, leave tracking, and performance metrics.",
  },
  {
    icon: UserCircle,
    title: "Employee Dashboard",
    description: "Self-service portal for employees to view payslips, request leave, and update profiles.",
  },
  {
    icon: FileText,
    title: "Payslip Generation",
    description: "Generate professional payslips automatically with detailed breakdowns and PDF exports.",
  },
  {
    icon: Upload,
    title: "Bulk CSV Upload",
    description: "Import hundreds of employees instantly with our smart CSV upload and validation.",
  },
  {
    icon: Building2,
    title: "Departments & Permissions",
    description: "Organize your workforce with departments and granular role-based access controls.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description: "Stay compliant with African labor laws and tax regulations with automated updates.",
  },
  {
    icon: CreditCard,
    title: "Flutterwave Billing",
    description: "Seamless subscription billing with Flutterwave integration and multiple payment options.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Manage Payroll
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From onboarding to payslips, PayFlow Africa handles your entire payroll workflow 
            with powerful automation and intuitive interfaces.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300"
              data-testid={`card-feature-${index}`}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-xl border border-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
