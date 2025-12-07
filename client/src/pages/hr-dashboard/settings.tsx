import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock } from "lucide-react";

export default function HRSettings() {
  return (
    <DashboardLayout title="Settings" role="hr">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Your personal details</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue="Sarah" data-testid="input-first-name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue="Johnson" data-testid="input-last-name" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="hr@payflow.africa" data-testid="input-email" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure your alerts</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payroll Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified before payroll due dates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Employee Notifications</p>
                <p className="text-sm text-muted-foreground">Alerts when employees are added</p>
              </div>
              <Switch defaultChecked />
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
