import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Briefcase, MapPin, Phone, Mail, Calendar } from "lucide-react";

export default function EmployeeProfile() {
  return (
    <DashboardLayout title="Profile" role="employee">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
          <p className="text-muted-foreground">View and update your personal information</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white">
              AO
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Amara Okonkwo</h3>
              <p className="text-muted-foreground">Senior Developer</p>
              <p className="text-sm text-muted-foreground mt-1">Engineering Department</p>
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
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground">Personal Information</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue="Amara" data-testid="input-first-name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue="Okonkwo" data-testid="input-last-name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="amara@company.com" data-testid="input-email" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+234 800 123 4567" data-testid="input-phone" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Address</Label>
              <Input defaultValue="15 Victoria Island, Lagos, Nigeria" data-testid="input-address" />
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
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground">Employment Details</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <Input value="EMP-001247" disabled />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value="Engineering" disabled />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input value="Senior Developer" disabled />
            </div>
            <div className="space-y-2">
              <Label>Join Date</Label>
              <Input value="March 15, 2021" disabled />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button data-testid="button-save-profile">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
