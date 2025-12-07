import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import AddEmployeeModal from "@/components/dashboard/AddEmployeeModal";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const employees = [
  { id: 1, name: "Amara Okonkwo", email: "amara@company.com", department: "Engineering", position: "Senior Developer", salary: "$6,500", status: "Active" },
  { id: 2, name: "Kwame Asante", email: "kwame@company.com", department: "Marketing", position: "Marketing Lead", salary: "$5,200", status: "Active" },
  { id: 3, name: "Fatima Hassan", email: "fatima@company.com", department: "Sales", position: "Sales Manager", salary: "$5,800", status: "Active" },
  { id: 4, name: "Chidi Eze", email: "chidi@company.com", department: "Engineering", position: "DevOps Engineer", salary: "$6,000", status: "Active" },
  { id: 5, name: "Naledi Molefe", email: "naledi@company.com", department: "HR", position: "HR Specialist", salary: "$4,500", status: "Active" },
  { id: 6, name: "Kofi Mensah", email: "kofi@company.com", department: "Finance", position: "Accountant", salary: "$4,800", status: "Pending" },
  { id: 7, name: "Zainab Bello", email: "zainab@company.com", department: "Engineering", position: "Frontend Developer", salary: "$5,500", status: "Active" },
  { id: 8, name: "Tendai Moyo", email: "tendai@company.com", department: "Support", position: "Support Lead", salary: "$4,200", status: "Active" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "position", label: "Position" },
  { key: "salary", label: "Salary" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
];

export default function CompanyEmployees() {
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout title="Employees" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Employee Management</h2>
            <p className="text-muted-foreground">Manage all employees in your organization</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" data-testid="button-import-csv">
              <Upload className="w-4 h-4" />
              Import CSV
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={employees}
          searchPlaceholder="Search employees..."
          onAdd={() => setShowModal(true)}
          addLabel="Add Employee"
        />

        <AddEmployeeModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </DashboardLayout>
  );
}
