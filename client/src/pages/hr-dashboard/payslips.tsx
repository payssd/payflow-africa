import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { StatusBadge } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const payslips = [
  { id: 1, employee: "Amara Okonkwo", period: "November 2024", grossSalary: "$6,500", netSalary: "$5,850", status: "Sent" },
  { id: 2, employee: "Kwame Asante", period: "November 2024", grossSalary: "$5,200", netSalary: "$4,680", status: "Sent" },
  { id: 3, employee: "Fatima Hassan", period: "November 2024", grossSalary: "$5,800", netSalary: "$5,220", status: "Sent" },
  { id: 4, employee: "Chidi Eze", period: "November 2024", grossSalary: "$6,000", netSalary: "$5,400", status: "Pending" },
  { id: 5, employee: "Naledi Molefe", period: "November 2024", grossSalary: "$4,500", netSalary: "$4,050", status: "Sent" },
];

const columns = [
  { key: "employee", label: "Employee" },
  { key: "period", label: "Period" },
  { key: "grossSalary", label: "Gross Salary" },
  { key: "netSalary", label: "Net Salary" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value === "Sent" ? "completed" : "pending"} /> },
  { key: "action", label: "Download", render: () => <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button> },
];

export default function HRPayslips() {
  return (
    <DashboardLayout title="Payslips" role="hr">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payslip Management</h2>
          <p className="text-muted-foreground">View and download employee payslips</p>
        </div>
        <DataTable columns={columns} data={payslips} searchPlaceholder="Search payslips..." />
      </div>
    </DashboardLayout>
  );
}
