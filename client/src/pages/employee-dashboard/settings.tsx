import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Shield } from "lucide-react";

export default function EmployeeSettings() {
  return (
    <DashboardLayout title="Settings" role="employee">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
          <p className="text-muted-foreground">Manage your preferences and security</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card/50 border border-border/50 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure how you receive updates</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payslip Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when new payslips are available</p>
              </div>
              <Switch defaultChecked data-testid="switch-payslip-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Updates</p>
                <p className="text-sm text-muted-foreground">Receive important updates via email</p>
              </div>
              <Switch defaultChecked data-testid="switch-email-updates" />
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
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Change Password</h3>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" data-testid="input-current-password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" data-testid="input-new-password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="Confirm new password" data-testid="input-confirm-password" />
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
