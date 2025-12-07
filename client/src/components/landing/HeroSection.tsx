import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/payflow_africa_hero_illustration.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-cyan-900/10" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Badge variant="secondary" className="w-fit">
              14-Day Free Trial
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Payroll Automation for </span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                African Businesses
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Streamline your HR operations with role-based dashboards, automated payslips, 
              compliance management, and seamless Flutterwave billing integration.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2" data-testid="button-hero-start-trial">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm" data-testid="button-hero-book-demo">
                <Play className="w-4 h-4" />
                Book Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-white">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">500+</span>
                <span className="text-muted-foreground"> African businesses trust us</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <img
                src={heroImage}
                alt="PayFlow Africa Dashboard"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
