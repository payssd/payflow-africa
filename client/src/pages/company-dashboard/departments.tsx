import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Edit, Trash2, X } from "lucide-react";

const departments = [
  { id: 1, name: "Engineering", employees: 385, head: "Amara Okonkwo", budget: "$2.5M" },
  { id: 2, name: "Marketing", employees: 120, head: "Kwame Asante", budget: "$800K" },
  { id: 3, name: "Sales", employees: 245, head: "Fatima Hassan", budget: "$1.2M" },
  { id: 4, name: "Human Resources", employees: 45, head: "Naledi Molefe", budget: "$350K" },
  { id: 5, name: "Finance", employees: 78, head: "Kofi Mensah", budget: "$450K" },
  { id: 6, name: "Support", employees: 156, head: "Tendai Moyo", budget: "$600K" },
  { id: 7, name: "Operations", employees: 98, head: "Chidi Eze", budget: "$520K" },
  { id: 8, name: "Legal", employees: 32, head: "Zainab Bello", budget: "$280K" },
];

export default function CompanyDepartments() {
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout title="Departments" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Department Management</h2>
            <p className="text-muted-foreground">Organize your workforce by departments</p>
          </div>
          <Button onClick={() => setShowModal(true)} data-testid="button-add-department">
            Add Department
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              data-testid={`card-department-${dept.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" data-testid={`button-edit-${dept.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-delete-${dept.id}`}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{dept.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Head: {dept.head}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {dept.employees} employees
                </div>
                <span className="text-purple-400">{dept.budget}</span>
              </div>
            </motion.div>
          ))}
        </div>

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
                    <h2 className="text-xl font-semibold text-foreground">Add Department</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deptName">Department Name</Label>
                      <Input id="deptName" placeholder="e.g., Product" data-testid="input-dept-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deptHead">Department Head</Label>
                      <Input id="deptHead" placeholder="Select or enter name" data-testid="input-dept-head" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deptBudget">Annual Budget</Label>
                      <Input id="deptBudget" placeholder="e.g., 500000" type="number" data-testid="input-dept-budget" />
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" data-testid="button-save-department">
                        Create Department
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
