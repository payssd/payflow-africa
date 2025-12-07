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
  { id: 6, employee: "Kofi Mensah", period: "November 2024", grossSalary: "$4,800", netSalary: "$4,320", status: "Sent" },
  { id: 7, employee: "Zainab Bello", period: "November 2024", grossSalary: "$5,500", netSalary: "$4,950", status: "Sent" },
  { id: 8, employee: "Tendai Moyo", period: "November 2024", grossSalary: "$4,200", netSalary: "$3,780", status: "Pending" },
];

const columns = [
  { key: "employee", label: "Employee" },
  { key: "period", label: "Period" },
  { key: "grossSalary", label: "Gross Salary" },
  { key: "netSalary", label: "Net Salary" },
  { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value === "Sent" ? "completed" : "pending"} /> },
  { 
    key: "action", 
    label: "Download", 
    render: () => (
      <Button variant="ghost" size="icon" data-testid="button-download-payslip">
        <Download className="w-4 h-4" />
      </Button>
    )
  },
];

export default function CompanyPayslips() {
  return (
    <DashboardLayout title="Payslips" role="company">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Payslip Management</h2>
            <p className="text-muted-foreground">View and manage employee payslips</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={payslips}
          searchPlaceholder="Search payslips..."
        />
      </div>
    </DashboardLayout>
  );
}
