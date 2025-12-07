import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Sign up with just your email and company name. No credit card required. You get full access to all features for 14 days. At the end of the trial, choose a plan that fits your needs.",
  },
  {
    question: "Is my employee data secure?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256) for all data at rest and in transit. Our infrastructure is hosted on secure cloud servers with regular security audits and compliance certifications.",
  },
  {
    question: "Which African countries do you support?",
    answer:
      "We currently support payroll compliance for Nigeria, Kenya, Ghana, South Africa, Rwanda, and Uganda. We're rapidly expanding to more countries across the continent.",
  },
  {
    question: "Can I import my existing employee data?",
    answer:
      "Yes! Our bulk CSV upload feature lets you import hundreds of employees in minutes. We provide a template with all required fields and smart validation to catch any errors.",
  },
  {
    question: "How does Flutterwave billing integration work?",
    answer:
      "We've integrated Flutterwave for seamless subscription payments. Pay with local bank transfers, mobile money, or cards. All transactions are secure and receipts are automatically generated.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Basic plans include email support with 24-hour response times. Growth and Enterprise plans get priority support with dedicated channels. Enterprise customers get a dedicated account manager.",
  },
  {
    question: "Can I manage multiple companies?",
    answer:
      "Yes, our Enterprise plan supports multi-company management. Switch between companies seamlessly while maintaining separate employee records, payroll settings, and compliance requirements.",
  },
  {
    question: "What happens if I exceed my employee limit?",
    answer:
      "We'll notify you when you're approaching your limit. You can upgrade your plan anytime with prorated billing, or we can help you find the right plan for your growing team.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about PayFlow Africa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl bg-card/50 border border-border/50 px-6 data-[state=open]:border-purple-500/30"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
