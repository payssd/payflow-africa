import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2, Mail, Globe, Bell, Shield, Palette } from "lucide-react";

export default function CompanySettings() {
  return (
    <DashboardLayout title="Settings" role="company">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Company Settings</h2>
          <p className="text-muted-foreground">Manage your company profile and preferences</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company Information</h3>
              <p className="text-sm text-muted-foreground">Basic company details</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Acme Corporation" data-testid="input-company-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNo">Registration Number</Label>
              <Input id="registrationNo" defaultValue="RC-123456789" data-testid="input-registration" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" defaultValue="Technology" data-testid="input-industry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Company Size</Label>
              <Input id="employees" defaultValue="1000-5000 employees" data-testid="input-size" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Contact Information</h3>
              <p className="text-sm text-muted-foreground">How we can reach you</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@acme.com" data-testid="input-email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+234 800 123 4567" data-testid="input-phone" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Business District, Lagos, Nigeria" data-testid="input-address" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payroll Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified before payroll due dates</p>
              </div>
              <Switch defaultChecked data-testid="switch-payroll-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Employee Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when new employees are added</p>
              </div>
              <Switch defaultChecked data-testid="switch-employee-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Billing Notifications</p>
                <p className="text-sm text-muted-foreground">Updates about your subscription</p>
              </div>
              <Switch defaultChecked data-testid="switch-billing-notifications" />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button data-testid="button-save-settings">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
