import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const hrTeam = [
  { id: 1, name: "Naledi Molefe", email: "naledi@company.com", role: "HR Manager", employees: 450, status: "Active" },
  { id: 2, name: "Aisha Juma", email: "aisha@company.com", role: "HR Specialist", employees: 320, status: "Active" },
  { id: 3, name: "David Ochieng", email: "david@company.com", role: "HR Coordinator", employees: 280, status: "Active" },
  { id: 4, name: "Grace Mwangi", email: "grace@company.com", role: "Recruiter", employees: 197, status: "Pending" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "employees", label: "Employees Managed" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
];

export default function CompanyHR() {
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout title="HR Team" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">HR Team Management</h2>
            <p className="text-muted-foreground">Manage HR managers and their access</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={hrTeam}
          searchPlaceholder="Search HR team..."
          onAdd={() => setShowModal(true)}
          addLabel="Add HR User"
        />

        {createPortal(
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md bg-card border border-border/50 rounded-xl p-6 mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Add HR User</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">HR Manager</SelectItem>
                          <SelectItem value="specialist">HR Specialist</SelectItem>
                          <SelectItem value="coordinator">HR Coordinator</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add HR User
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </DashboardLayout>
  );
}
